import { numberToWords } from '../numberToWords';
import { ConverterOptions } from '../types';

const AR: ConverterOptions = { locale: 'ar' };
const ar = (value: number | string, extra: ConverterOptions = {}): string =>
  numberToWords(value, { ...AR, ...extra });

describe('numberToWords (ar)', () => {
  describe('Units before tens', () => {
    test('should read the ones word first, joined with waw', () => {
      expect(ar(21)).toBe('واحد وعشرون');
      expect(ar(45)).toBe('خمسة وأربعون');
      expect(ar(99)).toBe('تسعة وتسعون');
    });

    test('should return a bare tens word when the ones digit is zero', () => {
      expect(ar(20)).toBe('عشرون');
      expect(ar(90)).toBe('تسعون');
    });

    test('should use the exact entries for 0-19', () => {
      expect(ar(0)).toBe('صفر');
      expect(ar(1)).toBe('واحد');
      expect(ar(10)).toBe('عشرة');
      expect(ar(11)).toBe('أحد عشر');
      expect(ar(12)).toBe('اثنا عشر');
      expect(ar(19)).toBe('تسعة عشر');
    });
  });

  describe('Fused hundreds', () => {
    test('should name each hundred as a single word rather than composing it', () => {
      expect(ar(100)).toBe('مائة');
      expect(ar(200)).toBe('مائتان');
      expect(ar(300)).toBe('ثلاثمائة');
      expect(ar(800)).toBe('ثمانمائة');
      expect(ar(900)).toBe('تسعمائة');
    });

    test('should keep the fused form when the hundred is part of a larger number', () => {
      expect(ar(101)).toBe('مائة وواحد');
      expect(ar(345)).toBe('ثلاثمائة وخمسة وأربعون');
      expect(ar(999)).toBe('تسعمائة وتسعة وتسعون');
    });
  });

  describe('Count-dependent scale forms', () => {
    test('should use the singular and dual entries for counts of one and two', () => {
      expect(ar(1000)).toBe('ألف');
      expect(ar(2000)).toBe('ألفان');
      expect(ar(1000000)).toBe('مليون');
      expect(ar(2000000)).toBe('مليونان');
      expect(ar(1000000000)).toBe('مليار');
      expect(ar(2000000000)).toBe('ملياران');
    });

    test('should use the genitive plural for counts of three to ten', () => {
      expect(ar(3000)).toBe('ثلاثة آلاف');
      expect(ar(10000)).toBe('عشرة آلاف');
      expect(ar(3000000)).toBe('ثلاثة ملايين');
      expect(ar(5000000000)).toBe('خمسة مليارات');
    });

    test('should use the accusative singular for counts of eleven to ninety-nine', () => {
      expect(ar(11000)).toBe('أحد عشر ألفًا');
      expect(ar(25000)).toBe('خمسة وعشرون ألفًا');
      expect(ar(99000)).toBe('تسعة وتسعون ألفًا');
      expect(ar(11000000)).toBe('أحد عشر مليونًا');
    });

    test('should revert to the plain singular for counts of one hundred and above', () => {
      expect(ar(100000)).toBe('مائة ألف');
      expect(ar(300000)).toBe('ثلاثمائة ألف');
      expect(ar(900000)).toBe('تسعمائة ألف');
    });
  });

  describe('Joining groups with waw', () => {
    test('should join every scale group with waw', () => {
      expect(ar(1234)).toBe('ألف ومائتان وأربعة وثلاثون');
      expect(ar(12345)).toBe('اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون');
      expect(ar(1001000)).toBe('مليون وألف');
    });

    test('should handle a number spanning several scales', () => {
      expect(ar(123456789)).toBe(
        'مائة وثلاثة وعشرون مليونًا وأربعمائة وستة وخمسون ألفًا وسبعمائة وتسعة وثمانون'
      );
    });
  });

  describe('Edge cases', () => {
    test('should handle negative numbers', () => {
      expect(ar(-5)).toBe('سالب خمسة');
      expect(ar(-123)).toBe('سالب مائة وثلاثة وعشرون');
    });

    test('should read decimal digits one at a time, separated by spaces not waw', () => {
      expect(ar(10.5)).toBe('عشرة فاصلة خمسة');
      expect(ar(123.45)).toBe('مائة وثلاثة وعشرون فاصلة أربعة خمسة');
    });

    test('should handle string input', () => {
      expect(ar('345')).toBe('ثلاثمائة وخمسة وأربعون');
    });
  });

  describe('Native Arabic-Indic digits', () => {
    test('should accept native digits when supportNativeDigits is true', () => {
      const options: ConverterOptions = { supportNativeDigits: true };
      expect(ar('٣٤٥', options)).toBe('ثلاثمائة وخمسة وأربعون');
      expect(ar('١٢٣٤', options)).toBe('ألف ومائتان وأربعة وثلاثون');
    });

    test('should accept the Arabic decimal mark U+066B', () => {
      expect(ar('١٠٫٥', { supportNativeDigits: true })).toBe('عشرة فاصلة خمسة');
    });

    test('should reject characters outside the native digit set', () => {
      expect(() => ar('١٢٣abc', { supportNativeDigits: true })).toThrow('Invalid number input');
    });
  });

  describe('Options', () => {
    test('should let an explicit separator override the locale group joiner', () => {
      expect(ar(1234, { separator: ' ' })).toBe('ألف مائتان أربعة وثلاثون');
    });
  });
});
