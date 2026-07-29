import { numberToWords } from '../numberToWords';

describe('numberToWords (en, the default locale)', () => {
  describe('Basic number conversions', () => {
    test('should convert single digits', () => {
      expect(numberToWords(0)).toBe('zero');
      expect(numberToWords(1)).toBe('one');
      expect(numberToWords(9)).toBe('nine');
    });

    test('should convert teens', () => {
      expect(numberToWords(10)).toBe('ten');
      expect(numberToWords(13)).toBe('thirteen');
      expect(numberToWords(19)).toBe('nineteen');
    });

    test('should compose tens from a tens word and a ones word', () => {
      expect(numberToWords(20)).toBe('twenty');
      expect(numberToWords(21)).toBe('twenty-one');
      expect(numberToWords(45)).toBe('forty-five');
      expect(numberToWords(90)).toBe('ninety');
      expect(numberToWords(99)).toBe('ninety-nine');
    });

    test('should convert hundreds', () => {
      expect(numberToWords(100)).toBe('one hundred');
      expect(numberToWords(101)).toBe('one hundred one');
      expect(numberToWords(123)).toBe('one hundred twenty-three');
      expect(numberToWords(999)).toBe('nine hundred ninety-nine');
    });

    test('should convert thousands', () => {
      expect(numberToWords(1000)).toBe('one thousand');
      expect(numberToWords(1100)).toBe('one thousand one hundred');
      expect(numberToWords(1234)).toBe('one thousand two hundred thirty-four');
      expect(numberToWords(12345)).toBe('twelve thousand three hundred forty-five');
    });

    test('should use the Western short scale above thousand', () => {
      expect(numberToWords(1000000)).toBe('one million');
      expect(numberToWords(1000000000)).toBe('one billion');
      expect(numberToWords(1000000000000)).toBe('one trillion');
      expect(numberToWords(123456789)).toBe(
        'one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine'
      );
    });
  });

  describe('Edge cases', () => {
    test('should handle negative numbers', () => {
      expect(numberToWords(-1)).toBe('minus one');
      expect(numberToWords(-123)).toBe('minus one hundred twenty-three');
    });

    test('should handle decimal numbers', () => {
      expect(numberToWords(10.5)).toBe('ten point five');
      expect(numberToWords(123.45)).toBe('one hundred twenty-three point four five');
      expect(numberToWords(0.123)).toBe('zero point one two three');
    });

    test('should handle string input', () => {
      expect(numberToWords('123')).toBe('one hundred twenty-three');
      expect(numberToWords('10.5')).toBe('ten point five');
    });

    test('should ignore supportNativeDigits when the locale has no native digits', () => {
      expect(numberToWords('123', { supportNativeDigits: true })).toBe('one hundred twenty-three');
      expect(numberToWords(123, { outputNativeDigits: true })).toBe('one hundred twenty-three');
    });
  });

  describe('Options', () => {
    test('should handle includeSpaces option', () => {
      expect(numberToWords(123, { includeSpaces: true })).toBe('one hundred twenty-three');
      expect(numberToWords(123, { includeSpaces: false })).toBe('one hundredtwenty-three');
    });

    test('should handle custom separator', () => {
      expect(numberToWords(123, { separator: '-' })).toBe('one hundred-twenty-three');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid input', () => {
      expect(() => numberToWords('abc')).toThrow('Invalid number input');
      expect(() => numberToWords('')).toThrow('Invalid number input');
      expect(() => numberToWords(NaN)).toThrow('Invalid number input');
    });

    test('should reject magnitudes that stringify to exponential notation', () => {
      // 1e-7 has no readable decimal part, and 1.5e-8 would otherwise be
      // mangled into words for the characters "e" and "-".
      expect(() => numberToWords(1e-7)).toThrow('Exponential notation (1e-7) is not supported');
      expect(() => numberToWords(1.5e-8)).toThrow('Exponential notation');
    });

    test('should still handle the smallest non-exponential decimals', () => {
      expect(numberToWords(0.000001)).toBe(
        'zero point zero zero zero zero zero one'
      );
    });
  });
});
