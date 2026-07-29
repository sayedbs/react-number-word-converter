// Main exports
export { numberToWords } from './numberToWords';
export { NumberWordConverter, NumberWordInput } from './NumberWordConverter';
export { useNumberWordConverter } from './useNumberWordConverter';

// Locale registry
export {
  registerLocale,
  getLocale,
  hasLocale,
  getRegisteredLocales,
  setDefaultLocale,
  getDefaultLocale,
} from './localeRegistry';

// Built-in locales
export { en, bn, ar } from './locales';

// Type exports
export type {
  ConverterOptions,
  NumberWordConverterProps,
  UseNumberWordConverterReturn,
} from './types';
export type { NumberWordInputProps } from './NumberWordConverter';
export type { LocaleDefinition, LocaleScale, LocaleScaleCountForm } from './locales/schema';

// Utility functions
export { isNativeDigitString, isEnglishDigitString } from './numberToWords';

// Default export
import { numberToWords } from './numberToWords';
import { NumberWordConverter, NumberWordInput } from './NumberWordConverter';
import { useNumberWordConverter } from './useNumberWordConverter';
import {
  registerLocale,
  getLocale,
  hasLocale,
  getRegisteredLocales,
  setDefaultLocale,
  getDefaultLocale,
} from './localeRegistry';

export default {
  numberToWords,
  NumberWordConverter,
  NumberWordInput,
  useNumberWordConverter,
  registerLocale,
  getLocale,
  hasLocale,
  getRegisteredLocales,
  setDefaultLocale,
  getDefaultLocale,
};
