/**
 * Configuration options for the number-word converter
 */
export interface ConverterOptions {
  /** Whether to include spaces between words (default: true) */
  includeSpaces?: boolean;
  /** Whether to support the locale's native digits in input (default: false) */
  supportNativeDigits?: boolean;
  /** Whether to output the locale's native digits instead of ASCII (default: false) */
  outputNativeDigits?: boolean;
  /** Custom separator between words (default: ' ') */
  separator?: string;
  /**
   * Locale code such as 'en' or 'bn'. Region-tagged codes fall back to their
   * base language, so 'en-GB' resolves to 'en'. Defaults to the locale set
   * by setDefaultLocale, which is 'en'.
   */
  locale?: string;
}

/**
 * Props for the NumberWordConverter React component
 */
export interface NumberWordConverterProps {
  /** The number to convert */
  value: number | string;
  /** Locale code such as 'en', 'bn' or 'en-GB'. Takes precedence over options.locale */
  lang?: string;
  /** Shorthand alias for lang, used when lang is not supplied */
  lan?: string;
  /** Configuration options */
  options?: ConverterOptions;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Callback function when conversion completes */
  onConvert?: (result: string) => void;
}

/**
 * Hook return type for useNumberWordConverter
 */
export interface UseNumberWordConverterReturn {
  /** The converted word text */
  wordText: string;
  /** Whether the conversion is in progress */
  isLoading: boolean;
  /** Any error that occurred during conversion */
  error: string | null;
  /** Function to manually trigger conversion */
  convert: (value: number | string) => void;
}
