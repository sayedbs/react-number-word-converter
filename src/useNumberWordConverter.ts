import { useState, useCallback, useEffect } from 'react';
import { numberToWords } from './numberToWords';
import { ConverterOptions, UseNumberWordConverterReturn } from './types';

const DEFAULT_OPTIONS: ConverterOptions = {};

/**
 * Custom hook for converting numbers to number words
 * @param initialValue - Initial number to convert
 * @param options - Configuration options
 * @returns Object with conversion result and utilities
 */
export const useNumberWordConverter = (
  initialValue: number | string = 0,
  options: ConverterOptions = DEFAULT_OPTIONS
): UseNumberWordConverterReturn => {
  const [wordText, setWordText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Convert a number to number words
   */
  const convert = useCallback((value: number | string) => {
    setError(null);

    try {
      const result = numberToWords(value, options);
      setWordText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setWordText('');
    }
  }, [options]);

  // Convert initial value on mount
  useEffect(() => {
    convert(initialValue);
  }, [convert, initialValue]);

  return {
    wordText,
    isLoading,
    error,
    convert,
  };
};