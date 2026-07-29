import { numberToWords, isNativeDigitString, isEnglishDigitString } from '../numberToWords';

describe('numberToWords', () => {
  describe('Basic number conversions', () => {
    test('should convert single digits', () => {
      expect(numberToWords(0)).toBe('শূন্য');
      expect(numberToWords(1)).toBe('এক');
      expect(numberToWords(5)).toBe('পাঁচ');
      expect(numberToWords(9)).toBe('নয়');
    });

    test('should convert teens', () => {
      expect(numberToWords(10)).toBe('দশ');
      expect(numberToWords(11)).toBe('এগারো');
      expect(numberToWords(15)).toBe('পনেরো');
      expect(numberToWords(19)).toBe('উনিশ');
    });

    test('should convert tens', () => {
      expect(numberToWords(20)).toBe('বিশ');
      expect(numberToWords(25)).toBe('পঁচিশ');
      expect(numberToWords(30)).toBe('ত্রিশ');
      expect(numberToWords(50)).toBe('পঞ্চাশ');
      expect(numberToWords(99)).toBe('নিরানব্বই');
    });

    test('should convert hundreds', () => {
      expect(numberToWords(100)).toBe('এক শত');
      expect(numberToWords(101)).toBe('এক শত এক');
      expect(numberToWords(150)).toBe('এক শত পঞ্চাশ');
      expect(numberToWords(200)).toBe('দুই শত');
      expect(numberToWords(999)).toBe('নয় শত নিরানব্বই');
    });

    test('should convert thousands', () => {
      expect(numberToWords(1000)).toBe('এক হাজার');
      expect(numberToWords(1001)).toBe('এক হাজার এক');
      expect(numberToWords(1234)).toBe('এক হাজার দুই শত চৌত্রিশ');
      expect(numberToWords(10000)).toBe('দশ হাজার');
      expect(numberToWords(10005)).toBe('দশ হাজার পাঁচ');
      expect(numberToWords(99999)).toBe('নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert lakhs', () => {
      expect(numberToWords(100000)).toBe('এক লাখ');
      expect(numberToWords(100001)).toBe('এক লাখ এক');
      expect(numberToWords(123456)).toBe('এক লাখ তেইশ হাজার চার শত ছাপ্পান্ন');
      expect(numberToWords(1000000)).toBe('দশ লাখ');
      expect(numberToWords(9999999)).toBe('নিরানব্বই লাখ নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert crores', () => {
      expect(numberToWords(10000000)).toBe('এক কোটি');
      expect(numberToWords(10000001)).toBe('এক কোটি এক');
      expect(numberToWords(123456789)).toBe('বারো কোটি চৌত্রিশ লাখ ছাপ্পান্ন হাজার সাত শত ঊননব্বই');
      expect(numberToWords(100000000)).toBe('দশ কোটি');
    });
  });

  describe('Edge cases', () => {
    test('should handle zero', () => {
      expect(numberToWords(0)).toBe('শূন্য');
    });

    test('should handle negative numbers', () => {
      expect(numberToWords(-1)).toBe('ঋণাত্মক এক');
      expect(numberToWords(-123)).toBe('ঋণাত্মক এক শত তেইশ');
    });

    test('should handle decimal numbers', () => {
      expect(numberToWords(10.5)).toBe('দশ দশমিক পাঁচ');
      expect(numberToWords(123.45)).toBe('এক শত তেইশ দশমিক চার পাঁচ');
      expect(numberToWords(0.123)).toBe('শূন্য দশমিক এক দুই তিন');
    });

    test('should handle very large numbers', () => {
      expect(numberToWords(1000000000)).toBe('এক শত কোটি');
      expect(numberToWords(10000000000)).toBe('এক হাজার কোটি');
    });
  });

  describe('String input', () => {
    test('should handle string numbers', () => {
      expect(numberToWords('123')).toBe('এক শত তেইশ');
      expect(numberToWords('0')).toBe('শূন্য');
      expect(numberToWords('10.5')).toBe('দশ দশমিক পাঁচ');
    });

    test('should handle native digits (০-৯) when supportNativeDigits is true', () => {
      const options = { supportNativeDigits: true };
      expect(numberToWords('১২৩', options)).toBe('এক শত তেইশ');
      expect(numberToWords('০', options)).toBe('শূন্য');
      expect(numberToWords('১০.৫', options)).toBe('দশ দশমিক পাঁচ');
    });
  });

  describe('Options', () => {
    test('should handle includeSpaces option', () => {
      expect(numberToWords(123, { includeSpaces: true })).toBe('এক শত তেইশ');
      expect(numberToWords(123, { includeSpaces: false })).toBe('এক শততেইশ');
    });

    test('should handle custom separator', () => {
      expect(numberToWords(123, { separator: '-' })).toBe('এক শত-তেইশ');
      expect(numberToWords(123, { separator: '' })).toBe('এক শততেইশ');
    });

    test('should handle outputNativeDigits option', () => {
      expect(numberToWords(123, { outputNativeDigits: true })).toBe('এক শত তেইশ');
      // Note: This would output native digits (০-৯) if we had that functionality
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid input', () => {
      expect(() => numberToWords('abc')).toThrow('Invalid number input');
      expect(() => numberToWords('')).toThrow('Invalid number input');
      expect(() => numberToWords(NaN)).toThrow('Invalid number input');
    });

    test('should throw error for invalid native digits (০-৯) when supportNativeDigits is true', () => {
      const options = { supportNativeDigits: true };
      expect(() => numberToWords('১২৩abc', options)).toThrow('Invalid number input');
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
