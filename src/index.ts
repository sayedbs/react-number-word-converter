// Main exports
export { numberToWords } from './numberToWords';
export { NumberWordConverter, NumberWordInput } from './NumberWordConverter';
export { useNumberWordConverter } from './useNumberWordConverter';

// Type exports
export type {
  ConverterOptions,
  NumberWordConverterProps,
  UseNumberWordConverterReturn,
} from './types';

// Utility functions
export { isNativeDigitString, isEnglishDigitString } from './numberToWords';

// Default export
import { numberToWords } from './numberToWords';
import { NumberWordConverter, NumberWordInput } from './NumberWordConverter';
import { useNumberWordConverter } from './useNumberWordConverter';

export default {
  numberToWords,
  NumberWordConverter,
  NumberWordInput,
  useNumberWordConverter,
};
