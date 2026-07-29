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
    test('should register en and bn on import', () => {
      expect(getRegisteredLocales()).toEqual(expect.arrayContaining(['en', 'bn']));
      expect(getLocale('en').name).toBe('English');
      expect(getLocale('bn').name).toBe('Bangla');
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
