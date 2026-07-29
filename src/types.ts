/**
 * Configuration options for the number-word converter
 */
export interface ConverterOptions {
  /** Whether to include spaces between words (default: true) */
  includeSpaces?: boolean;
  /** Whether to support native digits (০-৯) in input (default: false) */
  supportNativeDigits?: boolean;
  /** Whether to output native digits (০-৯) instead of words (default: false) */
  outputNativeDigits?: boolean;
  /** Custom separator between words (default: ' ') */
  separator?: string;
}

/**
 * Props for the NumberWordConverter React component
 */
export interface NumberWordConverterProps {
  /** The number to convert */
  value: number | string;
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
