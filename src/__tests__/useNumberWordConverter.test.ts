import { renderHook, act } from '@testing-library/react';
import { useNumberWordConverter } from '../useNumberWordConverter';
import { ConverterOptions } from '../types';

/** Hoisted so the options object keeps a stable identity across renders. */
const BN: ConverterOptions = { locale: 'bn' };
const BN_NO_SPACES: ConverterOptions = { locale: 'bn', includeSpaces: false };

describe('useNumberWordConverter', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    expect(result.current.wordText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.convert).toBe('function');
  });

  test('should initialize with provided value', async () => {
    const { result } = renderHook(() => useNumberWordConverter(123, BN));
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should convert number correctly', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.wordText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle string input', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert('789');
    });
    
    expect(result.current.wordText).toBe('সাত শত ঊননব্বই');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle zero', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(0);
    });
    
    expect(result.current.wordText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle negative numbers', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(-123);
    });
    
    expect(result.current.wordText).toBe('ঋণাত্মক এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle decimal numbers', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(10.5);
    });
    
    expect(result.current.wordText).toBe('দশ দশমিক পাঁচ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle conversion options', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN_NO_SPACES));
    
    act(() => {
      result.current.convert(123);
    });
    
    expect(result.current.wordText).toBe('এক শততেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle invalid input', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert('invalid');
    });
    
    expect(result.current.wordText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Conversion failed: Invalid number input');
  });

  test('should handle empty string', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert('');
    });
    
    expect(result.current.wordText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Conversion failed: Invalid number input');
  });

  test('should handle NaN input', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(NaN);
    });
    
    expect(result.current.wordText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Conversion failed: Invalid number input');
  });

  test('should update when options change', async () => {
    const { result, rerender } = renderHook(
      ({ options }) => useNumberWordConverter(123, options),
      { initialProps: { options: { locale: 'bn', includeSpaces: true } } }
    );
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    
    rerender({ options: { locale: 'bn', includeSpaces: false } });
    
    expect(result.current.wordText).toBe('এক শততেইশ');
  });

  test('should handle multiple conversions', async () => {
    const { result } = renderHook(() => useNumberWordConverter(0, BN));
    
    act(() => {
      result.current.convert(123);
    });
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.wordText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
  });
});

describe('useNumberWordConverter language selection', () => {
  test('should default to English', () => {
    const { result } = renderHook(() => useNumberWordConverter(12345));
    expect(result.current.wordText).toBe('twelve thousand three hundred forty-five');
  });

  test('should switch language when the locale option changes', () => {
    const { result, rerender } = renderHook(
      ({ options }) => useNumberWordConverter(123, options),
      { initialProps: { options: { locale: 'en' } } }
    );

    expect(result.current.wordText).toBe('one hundred twenty-three');

    rerender({ options: { locale: 'bn' } });

    expect(result.current.wordText).toBe('এক শত তেইশ');
  });

  test('should report an unregistered locale as an error', () => {
    const { result } = renderHook(() => useNumberWordConverter(123, { locale: 'nope' }));
    expect(result.current.wordText).toBe('');
    expect(result.current.error).toMatch(/is not registered/);
  });
});
