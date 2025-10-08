import { ConverterOptions } from './types';

/**
 * Bangla number words mapping
 */
const BANGLA_NUMBERS = {
  0: 'শূন্য',
  1: 'এক',
  2: 'দুই',
  3: 'তিন',
  4: 'চার',
  5: 'পাঁচ',
  6: 'ছয়',
  7: 'সাত',
  8: 'আট',
  9: 'নয়',
  10: 'দশ',
  11: 'এগারো',
  12: 'বারো',
  13: 'তেরো',
  14: 'চৌদ্দ',
  15: 'পনেরো',
  16: 'ষোল',
  17: 'সতেরো',
  18: 'আঠারো',
  19: 'উনিশ',
  20: 'বিশ',
  21: 'একুশ',
  22: 'বাইশ',
  23: 'তেইশ',
  24: 'চব্বিশ',
  25: 'পঁচিশ',
  26: 'ছাব্বিশ',
  27: 'সাতাশ',
  28: 'আঠাশ',
  29: 'ঊনত্রিশ',
  30: 'ত্রিশ',
  31: 'একত্রিশ',
  32: 'বত্রিশ',
  33: 'তেত্রিশ',
  34: 'চৌত্রিশ',
  35: 'পঁয়ত্রিশ',
  36: 'ছত্রিশ',
  37: 'সাঁইত্রিশ',
  38: 'আটত্রিশ',
  39: 'ঊনচল্লিশ',
  40: 'চল্লিশ',
  41: 'একচল্লিশ',
  42: 'বিয়াল্লিশ',
  43: 'তেতাল্লিশ',
  44: 'চুয়াল্লিশ',
  45: 'পঁয়তাল্লিশ',
  46: 'ছেচল্লিশ',
  47: 'সাতচল্লিশ',
  48: 'আটচল্লিশ',
  49: 'ঊনপঞ্চাশ',
  50: 'পঞ্চাশ',
  51: 'একান্ন',
  52: 'বায়ান্ন',
  53: 'তিপ্পান্ন',
  54: 'চুয়ান্ন',
  55: 'পঞ্চান্ন',
  56: 'ছাপ্পান্ন',
  57: 'সাতান্ন',
  58: 'আটান্ন',
  59: 'ঊনষাট',
  60: 'ষাট',
  61: 'একষট্টি',
  62: 'বাষট্টি',
  63: 'তেষট্টি',
  64: 'চৌষট্টি',
  65: 'পঁয়ষট্টি',
  66: 'ছেষট্টি',
  67: 'সাতষট্টি',
  68: 'আটষট্টি',
  69: 'ঊনসত্তর',
  70: 'সত্তর',
  71: 'একাত্তর',
  72: 'বাহাত্তর',
  73: 'তিয়াত্তর',
  74: 'চুয়াত্তর',
  75: 'পঁচাত্তর',
  76: 'ছিয়াত্তর',
  77: 'সাতাত্তর',
  78: 'আটাত্তর',
  79: 'ঊনআশি',
  80: 'আশি',
  81: 'একাশি',
  82: 'বিরাশি',
  83: 'তিরাশি',
  84: 'চুরাশি',
  85: 'পঁচাশি',
  86: 'ছিয়াশি',
  87: 'সাতাশি',
  88: 'আটাশি',
  89: 'ঊননব্বই',
  90: 'নব্বই',
  91: 'একানব্বই',
  92: 'বিরানব্বই',
  93: 'তিরানব্বই',
  94: 'চুরানব্বই',
  95: 'পঁচানব্বই',
  96: 'ছিয়ানব্বই',
  97: 'সাতানব্বই',
  98: 'আটানব্বই',
  99: 'নিরানব্বই',
  100: 'এক শত',
};

/**
 * Bangla place value names following Indian numbering system
 */
const PLACE_VALUES = {
  1: '', // ones
  10: '', // tens
  100: 'শত',
  1000: 'হাজার',
  100000: 'লাখ',
  10000000: 'কোটি',
};

/**
 * Bangla digits mapping (০-৯)
 */
const BANGLA_DIGITS = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English digits to Bangla digits
 */
const convertToBanglaDigits = (text: string): string => {
  return text.replace(/[0-9]/g, (digit) => {
    const banglaDigitMap: { [key: string]: string } = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    return banglaDigitMap[digit] || digit;
  });
};

/**
 * Converts Bangla digits to English digits
 */
const convertFromBanglaDigits = (text: string): string => {
  return text.replace(/[০-৯]/g, (digit) => BANGLA_DIGITS[digit as keyof typeof BANGLA_DIGITS] || digit);
};

/**
 * Converts a number to its Bangla word representation
 * @param num - The number to convert
 * @param options - Configuration options
 * @returns Bangla word representation of the number
 */
export const numberToBanglaWords = (num: number | string, options: ConverterOptions = {}): string => {
  const {
    includeSpaces = true,
    supportBanglaDigits = false,
    outputBanglaDigits = false,
    separator = ' '
  } = options;

  try {
    // Handle string input
    let inputNumber: number;
    if (typeof num === 'string') {
      if (supportBanglaDigits) {
        // Check if string contains only Bangla digits and valid characters
        if (!/^[০-৯\s\.\-]+$/.test(num)) {
          throw new Error('Invalid number input');
        }
        const englishString = convertFromBanglaDigits(num);
        inputNumber = parseFloat(englishString);
      } else {
        inputNumber = parseFloat(num);
      }
    } else {
      inputNumber = num;
    }

    // Validate input after conversion
    if (isNaN(inputNumber)) {
      throw new Error('Invalid number input');
    }

    // Handle zero
    if (inputNumber === 0) {
      const result = BANGLA_NUMBERS[0];
      return outputBanglaDigits ? convertToBanglaDigits(result) : result;
    }

    // Handle negative numbers
    if (inputNumber < 0) {
      const positiveResult = numberToBanglaWords(Math.abs(inputNumber), options);
      return `ঋণাত্মক ${positiveResult}`;
    }

    // Handle decimal numbers
    if (inputNumber % 1 !== 0) {
      const integerPart = Math.floor(inputNumber);
      const decimalPart = inputNumber.toString().split('.')[1];
      
      const integerWords = numberToBanglaWords(integerPart, options);
      const decimalWords = decimalPart
        .split('')
        .map(digit => BANGLA_NUMBERS[parseInt(digit) as keyof typeof BANGLA_NUMBERS])
        .join(includeSpaces ? separator : '');
      
      const result = `${integerWords} দশমিক ${decimalWords}`;
      return outputBanglaDigits ? convertToBanglaDigits(result) : result;
    }

    // Convert to integer
    const integerNumber = Math.floor(inputNumber);
    
    // Handle very large numbers (beyond crore)
    if (integerNumber >= 100000000) {
      const crorePart = Math.floor(integerNumber / 10000000);
      const remainder = integerNumber % 10000000;
      
      const croreWords = numberToBanglaWords(crorePart, options);
      const remainderWords = remainder > 0 ? numberToBanglaWords(remainder, options) : '';
      
      const result = remainderWords 
        ? `${croreWords} কোটি ${remainderWords}`
        : `${croreWords} কোটি`;
      
      return outputBanglaDigits ? convertToBanglaDigits(result) : result;
    }

    // Main conversion logic
    const result = convertNumberToWords(integerNumber, includeSpaces, separator);
    return outputBanglaDigits ? convertToBanglaDigits(result) : result;

  } catch (error) {
    throw new Error(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Core conversion logic for numbers
 */
const convertNumberToWords = (num: number, includeSpaces: boolean, separator: string): string => {
  if (num === 0) return BANGLA_NUMBERS[0];
  
  const words: string[] = [];
  const separatorStr = includeSpaces ? separator : '';
  
  // Crore (1,00,00,000)
  if (num >= 10000000) {
    const crore = Math.floor(num / 10000000);
    if (crore === 1) {
      words.push('এক কোটি');
    } else {
      words.push(convertHundreds(crore) + ' কোটি');
    }
    num %= 10000000;
  }
  
  // Lakh (1,00,000)
  if (num >= 100000) {
    const lakh = Math.floor(num / 100000);
    if (lakh === 1) {
      words.push('এক লাখ');
    } else {
      words.push(convertHundreds(lakh) + ' লাখ');
    }
    num %= 100000;
  }
  
  // Thousand (1,000)
  if (num >= 1000) {
    const thousand = Math.floor(num / 1000);
    if (thousand === 1) {
      words.push('এক হাজার');
    } else {
      words.push(convertHundreds(thousand) + ' হাজার');
    }
    num %= 1000;
  }
  
  // Hundred (100)
  if (num >= 100) {
    const hundred = Math.floor(num / 100);
    if (hundred === 1) {
      words.push('এক শত');
    } else {
      words.push(convertHundreds(hundred) + ' শত');
    }
    num %= 100;
  }
  
  // Tens and ones
  if (num > 0) {
    words.push(convertHundreds(num));
  }
  
  return words.join(separatorStr);
};

/**
 * Converts numbers 1-99 to Bangla words
 */
const convertHundreds = (num: number): string => {
  if (num === 0) return '';
  if (num <= 99) return BANGLA_NUMBERS[num as keyof typeof BANGLA_NUMBERS] || '';
  
  // For numbers 100-999, this function shouldn't be called directly
  // as it's handled in the main conversion logic
  return '';
};

/**
 * Utility function to validate if a string contains only Bangla digits
 */
export const isBanglaDigitString = (str: string): boolean => {
  return /^[০-৯\s]+$/.test(str);
};

/**
 * Utility function to validate if a string contains only English digits
 */
export const isEnglishDigitString = (str: string): boolean => {
  return /^[0-9\s]+$/.test(str);
};
