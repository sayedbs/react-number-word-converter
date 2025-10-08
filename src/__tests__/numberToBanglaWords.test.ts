import { numberToBanglaWords, isBanglaDigitString, isEnglishDigitString } from '../numberToBanglaWords';

describe('numberToBanglaWords', () => {
  describe('Basic number conversions', () => {
    test('should convert single digits', () => {
      expect(numberToBanglaWords(0)).toBe('শূন্য');
      expect(numberToBanglaWords(1)).toBe('এক');
      expect(numberToBanglaWords(5)).toBe('পাঁচ');
      expect(numberToBanglaWords(9)).toBe('নয়');
    });

    test('should convert teens', () => {
      expect(numberToBanglaWords(10)).toBe('দশ');
      expect(numberToBanglaWords(11)).toBe('এগারো');
      expect(numberToBanglaWords(15)).toBe('পনেরো');
      expect(numberToBanglaWords(19)).toBe('উনিশ');
    });

    test('should convert tens', () => {
      expect(numberToBanglaWords(20)).toBe('বিশ');
      expect(numberToBanglaWords(25)).toBe('পঁচিশ');
      expect(numberToBanglaWords(30)).toBe('ত্রিশ');
      expect(numberToBanglaWords(50)).toBe('পঞ্চাশ');
      expect(numberToBanglaWords(99)).toBe('নিরানব্বই');
    });

    test('should convert hundreds', () => {
      expect(numberToBanglaWords(100)).toBe('এক শত');
      expect(numberToBanglaWords(101)).toBe('এক শত এক');
      expect(numberToBanglaWords(150)).toBe('এক শত পঞ্চাশ');
      expect(numberToBanglaWords(200)).toBe('দুই শত');
      expect(numberToBanglaWords(999)).toBe('নয় শত নিরানব্বই');
    });

    test('should convert thousands', () => {
      expect(numberToBanglaWords(1000)).toBe('এক হাজার');
      expect(numberToBanglaWords(1001)).toBe('এক হাজার এক');
      expect(numberToBanglaWords(1234)).toBe('এক হাজার দুই শত চৌত্রিশ');
      expect(numberToBanglaWords(10000)).toBe('দশ হাজার');
      expect(numberToBanglaWords(10005)).toBe('দশ হাজার পাঁচ');
      expect(numberToBanglaWords(99999)).toBe('নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert lakhs', () => {
      expect(numberToBanglaWords(100000)).toBe('এক লাখ');
      expect(numberToBanglaWords(100001)).toBe('এক লাখ এক');
      expect(numberToBanglaWords(123456)).toBe('এক লাখ তেইশ হাজার চার শত ছাপ্পান্ন');
      expect(numberToBanglaWords(1000000)).toBe('দশ লাখ');
      expect(numberToBanglaWords(9999999)).toBe('নিরানব্বই লাখ নিরানব্বই হাজার নয় শত নিরানব্বই');
    });

    test('should convert crores', () => {
      expect(numberToBanglaWords(10000000)).toBe('এক কোটি');
      expect(numberToBanglaWords(10000001)).toBe('এক কোটি এক');
      expect(numberToBanglaWords(123456789)).toBe('বারো কোটি চৌত্রিশ লাখ ছাপ্পান্ন হাজার সাত শত ঊননব্বই');
      expect(numberToBanglaWords(100000000)).toBe('দশ কোটি');
    });
  });

  describe('Edge cases', () => {
    test('should handle zero', () => {
      expect(numberToBanglaWords(0)).toBe('শূন্য');
    });

    test('should handle negative numbers', () => {
      expect(numberToBanglaWords(-1)).toBe('ঋণাত্মক এক');
      expect(numberToBanglaWords(-123)).toBe('ঋণাত্মক এক শত তেইশ');
    });

    test('should handle decimal numbers', () => {
      expect(numberToBanglaWords(10.5)).toBe('দশ দশমিক পাঁচ');
      expect(numberToBanglaWords(123.45)).toBe('এক শত তেইশ দশমিক চার পাঁচ');
      expect(numberToBanglaWords(0.123)).toBe('শূন্য দশমিক এক দুই তিন');
    });

    test('should handle very large numbers', () => {
      expect(numberToBanglaWords(1000000000)).toBe('এক শত কোটি');
      expect(numberToBanglaWords(10000000000)).toBe('এক হাজার কোটি');
    });
  });

  describe('String input', () => {
    test('should handle string numbers', () => {
      expect(numberToBanglaWords('123')).toBe('এক শত তেইশ');
      expect(numberToBanglaWords('0')).toBe('শূন্য');
      expect(numberToBanglaWords('10.5')).toBe('দশ দশমিক পাঁচ');
    });

    test('should handle Bangla digits when supportBanglaDigits is true', () => {
      const options = { supportBanglaDigits: true };
      expect(numberToBanglaWords('১২৩', options)).toBe('এক শত তেইশ');
      expect(numberToBanglaWords('০', options)).toBe('শূন্য');
      expect(numberToBanglaWords('১০.৫', options)).toBe('দশ দশমিক পাঁচ');
    });
  });

  describe('Options', () => {
    test('should handle includeSpaces option', () => {
      expect(numberToBanglaWords(123, { includeSpaces: true })).toBe('এক শত তেইশ');
      expect(numberToBanglaWords(123, { includeSpaces: false })).toBe('এক শততেইশ');
    });

    test('should handle custom separator', () => {
      expect(numberToBanglaWords(123, { separator: '-' })).toBe('এক শত-তেইশ');
      expect(numberToBanglaWords(123, { separator: '' })).toBe('এক শততেইশ');
    });

    test('should handle outputBanglaDigits option', () => {
      expect(numberToBanglaWords(123, { outputBanglaDigits: true })).toBe('এক শত তেইশ');
      // Note: This would output Bangla digits if we had that functionality
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid input', () => {
      expect(() => numberToBanglaWords('abc')).toThrow('Invalid number input');
      expect(() => numberToBanglaWords('')).toThrow('Invalid number input');
      expect(() => numberToBanglaWords(NaN)).toThrow('Invalid number input');
    });

    test('should throw error for invalid Bangla digits when supportBanglaDigits is true', () => {
      const options = { supportBanglaDigits: true };
      expect(() => numberToBanglaWords('১২৩abc', options)).toThrow('Invalid number input');
    });
  });
});

describe('Utility functions', () => {
  describe('isBanglaDigitString', () => {
    test('should return true for Bangla digit strings', () => {
      expect(isBanglaDigitString('১২৩')).toBe(true);
      expect(isBanglaDigitString('০১২৩৪৫৬৭৮৯')).toBe(true);
      expect(isBanglaDigitString('১২৩ ৪৫৬')).toBe(true);
    });

    test('should return false for non-Bangla digit strings', () => {
      expect(isBanglaDigitString('123')).toBe(false);
      expect(isBanglaDigitString('abc')).toBe(false);
      expect(isBanglaDigitString('১২৩abc')).toBe(false);
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
