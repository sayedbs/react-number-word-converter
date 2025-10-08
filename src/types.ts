/**
 * Configuration options for the Bangla number converter
 */
export interface ConverterOptions {
  /** Whether to include spaces between words (default: true) */
  includeSpaces?: boolean;
  /** Whether to support Bangla digits (০-৯) in input (default: false) */
  supportBanglaDigits?: boolean;
  /** Whether to output Bangla digits instead of words (default: false) */
  outputBanglaDigits?: boolean;
  /** Custom separator between words (default: ' ') */
  separator?: string;
}

/**
 * Props for the BanglaNumberConverter React component
 */
export interface BanglaNumberConverterProps {
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
 * Hook return type for useBanglaNumberConverter
 */
export interface UseBanglaNumberConverterReturn {
  /** The converted Bangla text */
  banglaText: string;
  /** Whether the conversion is in progress */
  isLoading: boolean;
  /** Any error that occurred during conversion */
  error: string | null;
  /** Function to manually trigger conversion */
  convert: (value: number | string) => void;
}
