import { ConverterOptions } from './types';
import { LocaleDefinition } from './locales/schema';
import { getLocale, getRegisteredLocales } from './localeRegistry';

// Registers the built-in en and bn locales as a side effect of importing
// the converter, so callers never have to register them by hand.
import './locales';

/**
 * Escapes characters that are meaningful inside a regular expression
 * character class, so arbitrary digit glyphs can be matched safely.
 */
const escapeForCharClass = (value: string): string => value.replace(/[\\\]^-]/g, '\\$&');

/** Rewrites a locale's native digits into ASCII digits. */
const fromNativeDigits = (text: string, locale: LocaleDefinition): string => {
  if (!locale.digits) {
    return text;
  }
  return text
    .split('')
    .map((char) => {
      const index = locale.digits ? locale.digits.indexOf(char) : -1;
      return index === -1 ? char : String(index);
    })
    .join('');
};

/** Rewrites ASCII digits into a locale's native digits. */
const toNativeDigits = (text: string, locale: LocaleDefinition): string => {
  if (!locale.digits) {
    return text;
  }
  return text.replace(/[0-9]/g, (digit) => {
    const glyphs = locale.digits as string[];
    return glyphs[Number(digit)] ?? digit;
  });
};

/**
 * Renders a value below one hundred.
 *
 * Locales with an exact entry win outright, which covers Bangla's 99
 * irregular words. Everything else is composed from a tens word and a ones
 * word, which covers English.
 */
const convertBelowHundred = (num: number, locale: LocaleDefinition): string => {
  const exact = locale.numbers[String(num)];
  if (exact !== undefined) {
    return exact;
  }

  const tensKey = String(Math.floor(num / 10) * 10);
  const tensWord = locale.tens[tensKey];
  if (tensWord === undefined) {
    throw new Error(`Locale "${locale.code}" has no word for ${num}`);
  }

  const onesDigit = num % 10;
  if (onesDigit === 0) {
    return tensWord;
  }

  const onesWord = locale.numbers[String(onesDigit)];
  if (onesWord === undefined) {
    throw new Error(`Locale "${locale.code}" has no word for ${onesDigit}`);
  }

  return `${tensWord}${locale.tensJoiner}${onesWord}`;
};

/**
 * Renders a non-negative integer by walking the locale's scales from
 * largest to smallest.
 *
 * Recursing on each scale's count is what lets one loop serve both the
 * Indian system (crore, lakh, thousand, hundred) and the Western short
 * scale, and it also handles values larger than the biggest declared scale.
 */
const convertInteger = (
  num: number,
  locale: LocaleDefinition,
  groupSeparator: string
): string => {
  const exact = locale.numbers[String(num)];
  if (exact !== undefined) {
    return exact;
  }

  if (num < 100) {
    return convertBelowHundred(num, locale);
  }

  const scalesDescending = [...locale.scales].sort((a, b) => b.value - a.value);
  const groups: string[] = [];
  let remainder = num;

  scalesDescending.forEach((scale) => {
    if (remainder >= scale.value) {
      const count = Math.floor(remainder / scale.value);
      // The space between a count and its scale name is intentionally
      // literal; groupSeparator only joins whole groups.
      groups.push(`${convertInteger(count, locale, groupSeparator)} ${scale.name}`);
      remainder %= scale.value;
    }
  });

  // Registration rejects locales that could reach here, but a locale object
  // mutated after registration still could, and recursing on an unchanged
  // remainder would overflow the stack.
  if (remainder === num) {
    throw new Error(`Locale "${locale.code}" has no scale able to express ${num}`);
  }

  if (remainder > 0) {
    groups.push(convertInteger(remainder, locale, groupSeparator));
  }

  return groups.join(groupSeparator);
};

/**
 * Converts a number to its word representation in the selected language.
 *
 * @param num - The number to convert
 * @param options - Configuration options, including the locale code
 * @returns Word representation of the number
 *
 * @example
 * ```ts
 * numberToWords(12345);                     // "twelve thousand three hundred forty-five"
 * numberToWords(12345, { locale: 'bn' });   // "বারো হাজার তিন শত পঁয়তাল্লিশ"
 * ```
 */
export const numberToWords = (num: number | string, options: ConverterOptions = {}): string => {
  const {
    includeSpaces = true,
    supportNativeDigits = false,
    outputNativeDigits = false,
    separator = ' ',
    locale: localeCode,
  } = options;

  // Resolved before the try block so an unregistered locale surfaces its own
  // message instead of being rewrapped as a conversion failure.
  const locale = getLocale(localeCode);

  try {
    let inputNumber: number;

    if (typeof num === 'string') {
      if (supportNativeDigits && locale.digits) {
        const digitClass = locale.digits.map(escapeForCharClass).join('');
        const nativePattern = new RegExp(`^[${digitClass}\\s.\\-]+$`);
        if (!nativePattern.test(num)) {
          throw new Error('Invalid number input');
        }
        inputNumber = parseFloat(fromNativeDigits(num, locale));
      } else {
        inputNumber = parseFloat(num);
      }
    } else {
      inputNumber = num;
    }

    if (isNaN(inputNumber)) {
      throw new Error('Invalid number input');
    }

    if (inputNumber === 0) {
      const result = locale.numbers['0'];
      return outputNativeDigits ? toNativeDigits(result, locale) : result;
    }

    if (inputNumber < 0) {
      const positiveResult = numberToWords(Math.abs(inputNumber), options);
      return `${locale.negative} ${positiveResult}`;
    }

    if (inputNumber % 1 !== 0) {
      const text = inputNumber.toString();

      // Very small magnitudes stringify as "1e-7", which has no decimal part
      // to read digit by digit.
      if (text.includes('e') || text.includes('E')) {
        throw new Error(`Exponential notation (${text}) is not supported`);
      }

      const integerPart = Math.floor(inputNumber);
      const decimalPart = text.split('.')[1];

      const integerWords = numberToWords(integerPart, options);
      const decimalWords = decimalPart
        .split('')
        .map((digit) => {
          const word = locale.numbers[digit];
          if (word === undefined) {
            throw new Error(`Locale "${locale.code}" has no word for the digit "${digit}"`);
          }
          return word;
        })
        .join(includeSpaces ? separator : '');

      const result = `${integerWords} ${locale.decimal} ${decimalWords}`;
      return outputNativeDigits ? toNativeDigits(result, locale) : result;
    }

    const groupSeparator = includeSpaces ? separator : '';
    const result = convertInteger(Math.floor(inputNumber), locale, groupSeparator);
    return outputNativeDigits ? toNativeDigits(result, locale) : result;
  } catch (error) {
    throw new Error(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Checks whether a string contains only native digits.
 *
 * With no locale given, the string is matched against the digits of every
 * registered locale, which keeps it useful as a general detector.
 */
export const isNativeDigitString = (str: string, localeCode?: string): boolean => {
  const matchesLocale = (locale: LocaleDefinition): boolean => {
    if (!locale.digits) {
      return false;
    }
    const digitClass = locale.digits.map(escapeForCharClass).join('');
    return new RegExp(`^[${digitClass}\\s]+$`).test(str);
  };

  if (localeCode) {
    return matchesLocale(getLocale(localeCode));
  }

  return getRegisteredLocales().some((code) => matchesLocale(getLocale(code)));
};

/**
 * Checks whether a string contains only ASCII digits
 */
export const isEnglishDigitString = (str: string): boolean => {
  return /^[0-9\s]+$/.test(str);
};
