/**
 * An alternative scale word used when the count falls inside a range.
 */
export interface LocaleScaleCountForm {
  /** Lowest count this form applies to, inclusive */
  from: number;
  /** Highest count this form applies to, inclusive */
  to: number;
  /** Word to use instead of the scale's default name */
  name: string;
}

/**
 * A single scale (place value) step in a locale's numbering system.
 */
export interface LocaleScale {
  /** Numeric value of the scale, e.g. 1000 or 10000000 */
  value: number;
  /** Word used for this scale, e.g. "thousand" or "কোটি" */
  name: string;
  /**
   * Count-dependent alternatives to `name`, searched in order.
   *
   * Languages that inflect a scale word for the number in front of it need
   * this. Arabic uses the genitive plural "آلاف" for counts 3-10 and the
   * accusative singular "ألفًا" for counts 11-99, and Slavic languages have
   * comparable bands.
   */
  nameByCount?: LocaleScaleCountForm[];
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
  /**
   * Native decimal character accepted on input, e.g. Arabic "٫".
   * Normalised to "." before parsing. Omit when the locale uses ".".
   */
  decimalMark?: string;
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
  /**
   * Puts the ones word before the tens word when composing 21-99, as Arabic
   * ("واحد وعشرون") and German ("einundzwanzig") do. Defaults to false.
   */
  unitsBeforeTens?: boolean;
  /**
   * Joiner placed between whole scale groups, e.g. Arabic " و" which yields
   * "ألف ومائتان". Defaults to a single space. An explicit `separator`
   * option overrides it.
   */
  groupSeparator?: string;
  /** Scale steps, ordered ascending by value */
  scales: LocaleScale[];
}

/**
 * Resolves the word for a scale given how many of it there are.
 *
 * The range is matched against the trailing part of the count rather than
 * the whole of it, because that is what governs the inflection: Arabic reads
 * 123000 as a compound ending in 23, so it takes the same accusative
 * "ألفًا" as 23000 does, while a round 300000 has no trailing part and keeps
 * the plain "ألف". Slavic plural bands key off the count the same way.
 */
export const resolveScaleName = (scale: LocaleScale, count: number): string => {
  if (!scale.nameByCount) {
    return scale.name;
  }

  const trailing = count % 100;
  const effectiveCount = trailing === 0 ? count : trailing;
  const form = scale.nameByCount.find(
    (range) => effectiveCount >= range.from && effectiveCount <= range.to
  );
  return form ? form.name : scale.name;
};

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
    if (scale.nameByCount !== undefined) {
      if (!Array.isArray(scale.nameByCount)) {
        fail(`scale ${scale.value} has a nameByCount that is not an array`);
      }
      scale.nameByCount.forEach((range) => {
        if (typeof range.name !== 'string' || range.name.length === 0) {
          fail(`scale ${scale.value} has a nameByCount range with no name`);
        }
        if (!Number.isInteger(range.from) || !Number.isInteger(range.to) || range.from < 1) {
          fail(`scale ${scale.value} range "${range.name}" must use whole counts starting at 1`);
        }
        if (range.from > range.to) {
          fail(`scale ${scale.value} range "${range.name}" has from ${range.from} above to ${range.to}`);
        }
      });
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
  if (locale.decimalMark !== undefined && locale.decimalMark.length !== 1) {
    fail('decimalMark must be a single character');
  }
  if (locale.unitsBeforeTens && Object.keys(locale.tens).length === 0) {
    fail('unitsBeforeTens has no effect without a tens table');
  }
};
