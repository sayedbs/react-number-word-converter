import { renderHook, act } from '@testing-library/react';
import { useNumberWordConverter } from '../useNumberWordConverter';

describe('useNumberWordConverter', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    expect(result.current.wordText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.convert).toBe('function');
  });

  test('should initialize with provided value', async () => {
    const { result } = renderHook(() => useNumberWordConverter(123));
    
    // Wait for async conversion
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should convert number correctly', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.wordText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle string input', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert('789');
    });
    
    expect(result.current.wordText).toBe('সাত শত ঊননব্বই');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle zero', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert(0);
    });
    
    expect(result.current.wordText).toBe('শূন্য');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle negative numbers', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert(-123);
    });
    
    
    expect(result.current.wordText).toBe('ঋণাত্মক এক শত তেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle decimal numbers', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert(10.5);
    });
    
    
    expect(result.current.wordText).toBe('দশ দশমিক পাঁচ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle conversion options', async () => {
    const options = { includeSpaces: false };
    const { result } = renderHook(() => useNumberWordConverter(0, options));
    
    act(() => {
      result.current.convert(123);
    });
    
    
    expect(result.current.wordText).toBe('এক শততেইশ');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should handle invalid input', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert('invalid');
    });
    
    
    expect(result.current.wordText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Conversion failed: Invalid number input');
  });

  test('should handle empty string', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    act(() => {
      result.current.convert('');
    });
    
    
    expect(result.current.wordText).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Conversion failed: Invalid number input');
  });

  test('should handle NaN input', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
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
      { initialProps: { options: { includeSpaces: true } } }
    );
    
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    
    // Change options
    rerender({ options: { includeSpaces: false } });
    
    
    expect(result.current.wordText).toBe('এক শততেইশ');
  });

  test('should handle multiple conversions', async () => {
    const { result } = renderHook(() => useNumberWordConverter());
    
    // First conversion
    act(() => {
      result.current.convert(123);
    });
    
    
    expect(result.current.wordText).toBe('এক শত তেইশ');
    
    // Second conversion
    act(() => {
      result.current.convert(456);
    });
    
    expect(result.current.wordText).toBe('চার শত ছাপ্পান্ন');
    expect(result.current.isLoading).toBe(false);
  });
});
