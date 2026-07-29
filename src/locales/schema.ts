/**
 * A single scale (place value) step in a locale's numbering system.
 */
export interface LocaleScale {
  /** Numeric value of the scale, e.g. 1000 or 10000000 */
  value: number;
  /** Word used for this scale, e.g. "thousand" or "কোটি" */
  name: string;
}

/**
 * Describes everything the converter needs to render numbers in one language.
 *
 * The schema supports two different ways of forming 0-99 so that both
 * lookup-table languages (Bangla, which has 99 irregular words) and
 * compositional languages (English, "twenty" + "-" + "one") share one engine:
 * `numbers` is consulted first, and `tens` + `tensJoiner` is the fallback.
 */
export interface LocaleDefinition {
  /** Locale code, e.g. "en" or "bn" */
  code: string;
  /** Human readable name, e.g. "English" */
  name: string;
  /** Text direction, used for the rendered element's dir attribute */
  dir: 'ltr' | 'rtl';
  /** Native digit glyphs 0-9, or null when the locale uses ASCII digits */
  digits: string[] | null;
  /** Word placed before a negative number */
  negative: string;
  /** Word separating the integer part from the decimal digits */
  decimal: string;
  /** Exact number-to-word entries; must include "0" */
  numbers: Record<string, string>;
  /** Multiples of ten used when composing values with no exact entry */
  tens: Record<string, string>;
  /** Joiner placed between a tens word and a ones word */
  tensJoiner: string;
  /** Scale steps, ordered ascending by value */
  scales: LocaleScale[];
}

/**
 * Validates a locale definition well enough to give a useful error at
 * registration time instead of a confusing failure mid-conversion.
 */
export const validateLocale = (code: string, locale: LocaleDefinition): void => {
  const fail = (reason: string): never => {
    throw new Error(`Invalid locale "${code}": ${reason}`);
  };

  if (!locale || typeof locale !== 'object') {
    fail('expected a locale definition object');
  }
  if (!locale.numbers || typeof locale.numbers['0'] !== 'string') {
    fail('numbers must include an entry for "0"');
  }
  if (!Array.isArray(locale.scales) || locale.scales.length === 0) {
    fail('scales must be a non-empty array');
  }
  locale.scales.forEach((scale) => {
    if (typeof scale.value !== 'number' || scale.value < 10) {
      fail(`scale value ${String(scale.value)} must be a number >= 10`);
    }
    if (typeof scale.name !== 'string' || scale.name.length === 0) {
      fail(`scale ${scale.value} is missing a name`);
    }
  });

  // numbers and tens cover 0-99, so the scales must pick up at 100 or below.
  // A gap between them leaves values like 150 with nothing able to consume
  // them, which would recurse until the stack overflows.
  const smallestScale = Math.min(...locale.scales.map((scale) => scale.value));
  if (smallestScale > 100) {
    fail(`the smallest scale is ${smallestScale}, which leaves values below it unreachable; add a scale of 100 or less`);
  }
  if (locale.digits !== null && locale.digits !== undefined && locale.digits.length !== 10) {
    fail('digits must be null or an array of exactly 10 glyphs');
  }
};
