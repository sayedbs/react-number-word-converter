import { LocaleDefinition, validateLocale } from './locales/schema';

const registry = new Map<string, LocaleDefinition>();

let defaultLocaleCode = 'en';

/** Normalizes a locale code for lookup, e.g. " en-GB " becomes "en-gb". */
const normalize = (code: string): string => code.trim().toLowerCase();

/** Returns the base language of a code, e.g. "en-gb" becomes "en". */
const baseOf = (code: string): string => code.split('-')[0];

/**
 * Registers a locale so it can be selected by code.
 *
 * Built-in locales use this same path, so a custom language behaves
 * identically to a bundled one.
 *
 * @example
 * ```ts
 * registerLocale('fr', frJson);
 * ```
 */
export const registerLocale = (code: string, locale: LocaleDefinition): void => {
  if (typeof code !== 'string' || code.trim() === '') {
    throw new Error('registerLocale requires a non-empty locale code');
  }
  validateLocale(code, locale);
  registry.set(normalize(code), locale);
};

/** Returns the codes of every registered locale. */
export const getRegisteredLocales = (): string[] => Array.from(registry.keys());

/** Reports whether a code resolves to a registered locale. */
export const hasLocale = (code: string): boolean => {
  const normalized = normalize(code);
  return registry.has(normalized) || registry.has(baseOf(normalized));
};

/**
 * Resolves a locale code to its definition.
 *
 * Region-tagged codes fall back to their base language, so "en-GB" resolves
 * to "en" unless an explicit "en-GB" locale has been registered.
 *
 * @throws when neither the full code nor its base language is registered
 */
export const getLocale = (code?: string): LocaleDefinition => {
  const requested = normalize(code || defaultLocaleCode);

  const exact = registry.get(requested);
  if (exact) {
    return exact;
  }

  const base = registry.get(baseOf(requested));
  if (base) {
    return base;
  }

  throw new Error(
    `Locale "${code}" is not registered. ` +
      `Available: ${getRegisteredLocales().join(', ') || 'none'}. ` +
      `Add it with registerLocale("${baseOf(requested)}", yourLocaleJson).`
  );
};

/**
 * Sets the locale used when no code is supplied.
 *
 * This is module-level state read at conversion time, so it will not
 * re-render components that are already mounted. Call it during app startup
 * and use the lang prop for anything that changes at runtime.
 */
export const setDefaultLocale = (code: string): void => {
  getLocale(code);
  defaultLocaleCode = normalize(code);
};

/** Returns the locale code used when no code is supplied. */
export const getDefaultLocale = (): string => defaultLocaleCode;
