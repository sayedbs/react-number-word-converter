import { numberToWords, isNativeDigitString, isEnglishDigitString } from '../numberToWords';
import { ConverterOptions } from '../types';

/** Converts using the Bangla locale, since the default locale is English. */
const bn = (value: number | string, options: ConverterOptions = {}): string =>
  numberToWords(value, { locale: 'bn', ...options });

describe('numberToWords (bn)', () => {
  describe('Basic number conversions', () => {
    test('should convert single digits', () => {
      expect(bn(0)).toBe('শূন্য');
      expect(bn(1)).toBe('এক');
      expect(bn(5)).toBe('পাঁচ');
      expect(bn(9)).toBe('নয়');
    });

    test('should convert teens', () => {
      expect(bn(10)).toBe('দশ');
      expect(bn(11)).toBe('এগারো');
      expect(bn(15)).toBe('পনেরো');
      expect(bn(19)).toBe('উনিশ');
    });

    test('should convert tens', () => {
      expect(bn(20)).toBe('বিশ');
      expect(bn(25)).toBe('পঁচিশ');
      expect(bn(30)).toBe('ত্রিশ');
      expect(bn(50)).toBe('পঞ্চাশ');
      expect(bn(99)).toBe('নিরানব্বই');
    });

    test('should convert hundreds', () => {
      expect(bn(100)).toBe('এক শত');
      expect(bn(101)).toBe('এক শত এক');
      expect(bn(150)).toBe('এক শত পঞ্চাশ');
      expect(bn(200)).toBe('দুই শত');
      expect(bn(999)).toBe('নয় শত নিরানব্বই');
    });

    test('should convert thousands', () => {
      expect(bn(1000)).toBe('এক হাজার');
      expect(bn(1001)).toBe('এক হাজার এক');
      expect(bn(1234)).toBe('এক হাজার দুই শত চৌত্রিশ');
      expect(bn(10000)).toBe('দশ হাজার');
      expect(bn(10005)).toBe('দশ হাজার পাঁচ');
      expect(bn(99999)).toBe('নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert lakhs', () => {
      expect(bn(100000)).toBe('এক লাখ');
      expect(bn(100001)).toBe('এক লাখ এক');
      expect(bn(123456)).toBe('এক লাখ তেইশ হাজার চার শত ছাপ্পান্ন');
      expect(bn(1000000)).toBe('দশ লাখ');
      expect(bn(9999999)).toBe('নিরানব্বই লাখ নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert crores', () => {
      expect(bn(10000000)).toBe('এক কোটি');
      expect(bn(10000001)).toBe('এক কোটি এক');
      expect(bn(123456789)).toBe('বারো কোটি চৌত্রিশ লাখ ছাপ্পান্ন হাজার সাত শত ঊননব্বই');
      expect(bn(100000000)).toBe('দশ কোটি');
    });
  });

  describe('Edge cases', () => {
    test('should handle zero', () => {
      expect(bn(0)).toBe('শূন্য');
    });

    test('should handle negative numbers', () => {
      expect(bn(-1)).toBe('ঋণাত্মক এক');
      expect(bn(-123)).toBe('ঋণাত্মক এক শত তেইশ');
    });

    test('should handle decimal numbers', () => {
      expect(bn(10.5)).toBe('দশ দশমিক পাঁচ');
      expect(bn(123.45)).toBe('এক শত তেইশ দশমিক চার পাঁচ');
      expect(bn(0.123)).toBe('শূন্য দশমিক এক দুই তিন');
    });

    test('should handle very large numbers', () => {
      expect(bn(1000000000)).toBe('এক শত কোটি');
      expect(bn(10000000000)).toBe('এক হাজার কোটি');
    });
  });

  describe('String input', () => {
    test('should handle string numbers', () => {
      expect(bn('123')).toBe('এক শত তেইশ');
      expect(bn('0')).toBe('শূন্য');
      expect(bn('10.5')).toBe('দশ দশমিক পাঁচ');
    });

    test('should handle native digits (০-৯) when supportNativeDigits is true', () => {
      const options = { supportNativeDigits: true };
      expect(bn('১২৩', options)).toBe('এক শত তেইশ');
      expect(bn('০', options)).toBe('শূন্য');
      expect(bn('১০.৫', options)).toBe('দশ দশমিক পাঁচ');
    });
  });

  describe('Options', () => {
    test('should handle includeSpaces option', () => {
      expect(bn(123, { includeSpaces: true })).toBe('এক শত তেইশ');
      expect(bn(123, { includeSpaces: false })).toBe('এক শততেইশ');
    });

    test('should handle custom separator', () => {
      expect(bn(123, { separator: '-' })).toBe('এক শত-তেইশ');
      expect(bn(123, { separator: '' })).toBe('এক শততেইশ');
    });

    test('should handle outputNativeDigits option', () => {
      expect(bn(123, { outputNativeDigits: true })).toBe('এক শত তেইশ');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid input', () => {
      expect(() => bn('abc')).toThrow('Invalid number input');
      expect(() => bn('')).toThrow('Invalid number input');
      expect(() => bn(NaN)).toThrow('Invalid number input');
    });

    test('should throw error for invalid native digits (০-৯) when supportNativeDigits is true', () => {
      const options = { supportNativeDigits: true };
      expect(() => bn('১২৩abc', options)).toThrow('Invalid number input');
    });
  });
});

describe('Utility functions', () => {
  describe('isNativeDigitString', () => {
    test('should return true for number digit strings', () => {
      expect(isNativeDigitString('১২৩')).toBe(true);
      expect(isNativeDigitString('০১২৩৪৫৬৭৮৯')).toBe(true);
      expect(isNativeDigitString('১২৩ ৪৫৬')).toBe(true);
    });

    test('should return false for non-number digit strings', () => {
      expect(isNativeDigitString('123')).toBe(false);
      expect(isNativeDigitString('abc')).toBe(false);
      expect(isNativeDigitString('১২৩abc')).toBe(false);
    });

    test('should scope the check when a locale is given', () => {
      expect(isNativeDigitString('১২৩', 'bn')).toBe(true);
      expect(isNativeDigitString('১২৩', 'en')).toBe(false);
    });
  });

  describe('isEnglishDigitString', () => {
    test('should return true for English digit strings', () => {
      expect(isEnglishDigitString('123')).toBe(true);
      expect(isEnglishDigitString('0123456789')).toBe(true);
      expect(isEnglishDigitString('123 456')).toBe(true);
    });

    test('should return false for non-English digit strings', () => {
      expect(isEnglishDigitString('১২৩')).toBe(false);
      expect(isEnglishDigitString('abc')).toBe(false);
      expect(isEnglishDigitString('123abc')).toBe(false);
    });
  });
});
