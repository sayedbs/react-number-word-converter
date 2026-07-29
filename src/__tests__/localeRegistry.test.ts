import {
  registerLocale,
  getLocale,
  hasLocale,
  getRegisteredLocales,
  setDefaultLocale,
  getDefaultLocale,
} from '../localeRegistry';
import { numberToWords } from '../numberToWords';
import { LocaleDefinition } from '../locales/schema';

/**
 * A small invented language used to prove that a consumer-supplied locale
 * behaves exactly like a built-in one. Kept inline so the package ships no
 * placeholder locale files.
 */
const testLocale: LocaleDefinition = {
  code: 'tt',
  name: 'Test Locale',
  dir: 'rtl',
  digits: null,
  negative: 'neg',
  decimal: 'dot',
  numbers: {
    '0': 'nul',
    '1': 'un',
    '2': 'du',
    '3': 'tri',
    '4': 'kvar',
    '5': 'kvin',
    '6': 'ses',
    '7': 'sep',
    '8': 'ok',
    '9': 'nau',
  },
  tens: {
    '10': 'dek',
    '20': 'dudek',
    '30': 'tridek',
    '40': 'kvardek',
    '50': 'kvindek',
    '60': 'sesdek',
    '70': 'sepdek',
    '80': 'okdek',
    '90': 'naudek',
  },
  tensJoiner: '-',
  scales: [
    { value: 100, name: 'cent' },
    { value: 1000, name: 'mil' },
  ],
};

describe('locale registry', () => {
  afterEach(() => {
    setDefaultLocale('en');
  });

  describe('built-in locales', () => {
    test('should register en, bn and ar on import', () => {
      expect(getRegisteredLocales()).toEqual(expect.arrayContaining(['en', 'bn', 'ar']));
      expect(getLocale('en').name).toBe('English');
      expect(getLocale('bn').name).toBe('Bangla');
      expect(getLocale('ar').name).toBe('Arabic');
    });

    test('should carry text direction so callers never configure rtl by hand', () => {
      expect(getLocale('en').dir).toBe('ltr');
      expect(getLocale('bn').dir).toBe('ltr');
      expect(getLocale('ar').dir).toBe('rtl');
    });

    test('should default to en', () => {
      expect(getDefaultLocale()).toBe('en');
      expect(getLocale().code).toBe('en');
    });
  });

  describe('code resolution', () => {
    test('should fall back from a region tag to its base language', () => {
      expect(getLocale('en-GB').code).toBe('en');
      expect(numberToWords(123, { locale: 'en-GB' })).toBe('one hundred twenty-three');
    });

    test('should be case and whitespace insensitive', () => {
      expect(getLocale('EN').code).toBe('en');
      expect(getLocale(' Bn ').code).toBe('bn');
    });

    test('should report availability without throwing', () => {
      expect(hasLocale('bn')).toBe(true);
      expect(hasLocale('en-GB')).toBe(true);
      expect(hasLocale('nope')).toBe(false);
    });

    test('should throw an actionable error for an unregistered locale', () => {
      expect(() => getLocale('nope')).toThrow('Locale "nope" is not registered');
      expect(() => getLocale('nope')).toThrow('registerLocale("nope", yourLocaleJson)');
    });

    test('should not rewrap the locale error as a conversion failure', () => {
      expect(() => numberToWords(1, { locale: 'nope' })).toThrow(/^Locale "nope" is not registered/);
    });
  });

  describe('registerLocale', () => {
    test('should convert using a consumer-supplied locale', () => {
      registerLocale('tt', testLocale);

      expect(hasLocale('tt')).toBe(true);
      expect(numberToWords(21, { locale: 'tt' })).toBe('dudek-un');
      expect(numberToWords(345, { locale: 'tt' })).toBe('tri cent kvardek-kvin');
      expect(numberToWords(-5, { locale: 'tt' })).toBe('neg kvin');
      expect(numberToWords(1.5, { locale: 'tt' })).toBe('un dot kvin');
    });

    test('should expose text direction from the locale', () => {
      registerLocale('tt', testLocale);
      expect(getLocale('tt').dir).toBe('rtl');
    });

    test('should reject an empty code', () => {
      expect(() => registerLocale('', testLocale)).toThrow('non-empty locale code');
    });

    test('should reject a locale with no word for zero', () => {
      const broken = { ...testLocale, numbers: { '1': 'un' } };
      expect(() => registerLocale('bad', broken)).toThrow('numbers must include an entry for "0"');
    });

    test('should reject a locale with no scales', () => {
      const broken = { ...testLocale, scales: [] };
      expect(() => registerLocale('bad', broken)).toThrow('scales must be a non-empty array');
    });

    test('should reject a wrong-length digit set', () => {
      const broken = { ...testLocale, digits: ['0', '1'] };
      expect(() => registerLocale('bad', broken)).toThrow('exactly 10 glyphs');
    });

    test('should reject a locale whose smallest scale leaves a gap above 99', () => {
      // numbers and tens stop at 99, so a scale table starting at 1000 leaves
      // values such as 150 with nothing able to consume them.
      const gapped = { ...testLocale, scales: [{ value: 1000, name: 'mil' }] };
      expect(() => registerLocale('gap', gapped)).toThrow(
        'the smallest scale is 1000, which leaves values below it unreachable'
      );
    });

    test('should still convert when the smallest scale is exactly 100', () => {
      registerLocale('edge', { ...testLocale, scales: [{ value: 100, name: 'cent' }] });
      expect(numberToWords(150, { locale: 'edge' })).toBe('un cent kvindek');
    });

    test('should reject a nameByCount range that runs backwards', () => {
      const broken = {
        ...testLocale,
        scales: [
          { value: 100, name: 'cent' },
          { value: 1000, name: 'mil', nameByCount: [{ from: 10, to: 3, name: 'miloj' }] },
        ],
      };
      expect(() => registerLocale('bad', broken)).toThrow('has from 10 above to 3');
    });

    test('should reject a nameByCount range with a fractional or zero bound', () => {
      const fractional = {
        ...testLocale,
        scales: [
          { value: 100, name: 'cent' },
          { value: 1000, name: 'mil', nameByCount: [{ from: 1.5, to: 10, name: 'miloj' }] },
        ],
      };
      expect(() => registerLocale('bad', fractional)).toThrow('whole counts starting at 1');
    });

    test('should reject a multi-character decimalMark', () => {
      const broken = { ...testLocale, digits: null, decimalMark: '..' };
      expect(() => registerLocale('bad', broken)).toThrow('decimalMark must be a single character');
    });

    test('should reject unitsBeforeTens without a tens table', () => {
      const broken = { ...testLocale, tens: {}, unitsBeforeTens: true };
      expect(() => registerLocale('bad', broken)).toThrow('no effect without a tens table');
    });
  });

  describe('count-dependent scale names', () => {
    test('should apply a range to a consumer-supplied locale', () => {
      registerLocale('cnt', {
        ...testLocale,
        scales: [
          { value: 100, name: 'cent' },
          { value: 1000, name: 'mil', nameByCount: [{ from: 3, to: 10, name: 'miloj' }] },
        ],
      });

      expect(numberToWords(2000, { locale: 'cnt' })).toBe('du mil');
      expect(numberToWords(3000, { locale: 'cnt' })).toBe('tri miloj');
      expect(numberToWords(11000, { locale: 'cnt' })).toBe('dek-un mil');
    });

    test('should match the range against the trailing part of a compound count', () => {
      registerLocale('cnt', {
        ...testLocale,
        scales: [
          { value: 100, name: 'cent' },
          { value: 1000, name: 'mil', nameByCount: [{ from: 3, to: 10, name: 'miloj' }] },
        ],
      });

      // 105 ends in 5, so it takes the same form as a bare count of 5, while
      // a round 300 has no trailing part and keeps the default name.
      expect(numberToWords(105000, { locale: 'cnt' })).toBe('un cent kvin miloj');
      expect(numberToWords(300000, { locale: 'cnt' })).toBe('tri cent mil');
    });
  });

  describe('setDefaultLocale', () => {
    test('should change the locale used when none is given', () => {
      setDefaultLocale('bn');
      expect(getDefaultLocale()).toBe('bn');
      expect(numberToWords(123)).toBe('এক শত তেইশ');
    });

    test('should reject an unregistered locale', () => {
      expect(() => setDefaultLocale('nope')).toThrow('is not registered');
      expect(getDefaultLocale()).toBe('en');
    });
  });
});
