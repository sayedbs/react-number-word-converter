// Main exports
export { numberToBanglaWords } from './numberToBanglaWords';
export { BanglaNumberConverter, BanglaNumberInput } from './BanglaNumberConverter';
export { useBanglaNumberConverter } from './useBanglaNumberConverter';

// Type exports
export type {
  ConverterOptions,
  BanglaNumberConverterProps,
  UseBanglaNumberConverterReturn,
} from './types';

// Utility functions
export { isBanglaDigitString, isEnglishDigitString } from './numberToBanglaWords';

// Default export
import { numberToBanglaWords } from './numberToBanglaWords';
import { BanglaNumberConverter, BanglaNumberInput } from './BanglaNumberConverter';
import { useBanglaNumberConverter } from './useBanglaNumberConverter';

export default {
  numberToBanglaWords,
  BanglaNumberConverter,
  BanglaNumberInput,
  useBanglaNumberConverter,
};
