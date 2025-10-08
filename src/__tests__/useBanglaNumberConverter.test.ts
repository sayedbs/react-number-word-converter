import { renderHook, act } from '@testing-library/react';
import { useBanglaNumberConverter } from '../useBanglaNumberConverter';

describe('useBanglaNumberConverter', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    expect(result.current.banglaText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.convert).toBe('function');
  });

  test('should initialize with provided value', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter(123));
    
    // Wait for async conversion
    
    expect(result.current.banglaText).toBe('এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should convert number correctly', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.banglaText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle string input', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert('789');
    });
    
    expect(result.current.banglaText).toBe('সাত শত ঊননব্বই');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle zero', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert(0);
    });
    
    expect(result.current.banglaText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle negative numbers', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert(-123);
    });
    
    
    expect(result.current.banglaText).toBe('ঋণাত্মক এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle decimal numbers', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert(10.5);
    });
    
    
    expect(result.current.banglaText).toBe('দশ দশমিক পাঁচ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle conversion options', async () => {
    const options = { includeSpaces: false };
    const { result } = renderHook(() => useBanglaNumberConverter(0, options));
    
    act(() => {
      result.current.convert(123);
    });
    
    
    expect(result.current.banglaText).toBe('এক শততেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle invalid input', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert('invalid');
    });
    
    
    expect(result.current.banglaText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid number input');
  });

  test('should handle empty string', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert('');
    });
    
    
    expect(result.current.banglaText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid number input');
  });

  test('should handle NaN input', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    act(() => {
      result.current.convert(NaN);
    });
    
    
    expect(result.current.banglaText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid number input');
  });

  test('should update when options change', async () => {
    const { result, rerender } = renderHook(
      ({ options }) => useBanglaNumberConverter(123, options),
      { initialProps: { options: { includeSpaces: true } } }
    );
    
    
    expect(result.current.banglaText).toBe('এক শত তেইশ');
    
    // Change options
    rerender({ options: { includeSpaces: false } });
    
    
    expect(result.current.banglaText).toBe('এক শততেইশ');
  });

  test('should handle multiple conversions', async () => {
    const { result } = renderHook(() => useBanglaNumberConverter());
    
    // First conversion
    act(() => {
      result.current.convert(123);
    });
    
    
    expect(result.current.banglaText).toBe('এক শত তেইশ');
    
    // Second conversion
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.isLoading).toBe(true);
    
    
    expect(result.current.banglaText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
  });
});
