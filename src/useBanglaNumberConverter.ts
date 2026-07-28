import { useState, useCallback, useEffect } from 'react';
import { numberToBanglaWords } from './numberToBanglaWords';
import { ConverterOptions, UseBanglaNumberConverterReturn } from './types';

const DEFAULT_OPTIONS: ConverterOptions = {};

/**
 * Custom hook for converting numbers to Bangla words
 * @param initialValue - Initial number to convert
 * @param options - Configuration options
 * @returns Object with conversion result and utilities
 */
export const useBanglaNumberConverter = (
  initialValue: number | string = 0,
  options: ConverterOptions = DEFAULT_OPTIONS
): UseBanglaNumberConverterReturn => {
  const [banglaText, setBanglaText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Convert a number to Bangla words
   */
  const convert = useCallback((value: number | string) => {
    setError(null);

    try {
      const result = numberToBanglaWords(value, options);
      setBanglaText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setBanglaText('');
    }
  }, [options]);

  // Convert initial value on mount
  useEffect(() => {
    convert(initialValue);
  }, [convert, initialValue]);

  return {
    banglaText,
    isLoading,
    error,
    convert,
  };
};