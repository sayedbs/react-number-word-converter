import React, { useMemo } from 'react';
import { numberToWords } from './numberToWords';
import { getLocale } from './localeRegistry';
import { ConverterOptions, NumberWordConverterProps } from './types';

/**
 * Picks the locale code to use, preferring the explicit prop over the
 * shorthand alias and finally the value inside options.
 */
const pickLocaleCode = (
  lang: string | undefined,
  lan: string | undefined,
  options: ConverterOptions
): string | undefined => lang ?? lan ?? options.locale;

/**
 * React component for displaying number-to-word conversion
 * 
 * @example
 * ```tsx
 * <NumberWordConverter value={12345} />
 * <NumberWordConverter value={12345} lang="bn" />
 * ```
 */
export const NumberWordConverter: React.FC<NumberWordConverterProps> = ({
  value,
  lang,
  lan,
  options = {},
  className = '',
  style = {},
  onConvert,
}) => {
  const { wordText, error, localeCode, direction } = useMemo(() => {
    try {
      const code = pickLocaleCode(lang, lan, options);
      const locale = getLocale(code);
      const result = numberToWords(value, { ...options, locale: code });
      onConvert?.(result);
      return {
        wordText: result,
        error: null as string | null,
        localeCode: locale.code,
        direction: locale.dir,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      return {
        wordText: '',
        error: errorMessage,
        localeCode: undefined,
        direction: undefined,
      };
    }
  }, [value, lang, lan, options, onConvert]);

  if (error) {
    return (
      <span 
        className={`number-word-error ${className}`}
        style={{ color: 'red', ...style }}
        role="alert"
        aria-live="polite"
      >
        Error: {error}
      </span>
    );
  }

  return (
    <span 
      className={`number-word-converter ${className}`}
      style={style}
      lang={localeCode}
      dir={direction}
    >
      {wordText}
    </span>
  );
};

/**
 * Input component that converts numbers to number words in real-time
 */
export interface NumberWordInputProps {
  /** Initial value */
  defaultValue?: number | string;
  /** Placeholder text */
  placeholder?: string;
  /** Locale code such as 'en', 'bn' or 'en-GB'. Takes precedence over options.locale */
  lang?: string;
  /** Shorthand alias for lang, used when lang is not supplied */
  lan?: string;
  /** Configuration options */
  options?: NumberWordConverterProps['options'];
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Callback when value changes */
  onChange?: (value: string, wordText: string) => void;
  /** Whether to show the converted text below the input */
  showConvertedText?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
}

export const NumberWordInput: React.FC<NumberWordInputProps> = ({
  defaultValue = '',
  placeholder = 'Enter a number...',
  lang,
  lan,
  options = {},
  className = '',
  style = {},
  onChange,
  showConvertedText = true,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = React.useState<string>(String(defaultValue));
  const [wordText, setWordText] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const localeCode = pickLocaleCode(lang, lan, options);
  let direction: 'ltr' | 'rtl' = 'ltr';
  let resolvedCode: string | undefined;
  try {
    const locale = getLocale(localeCode);
    direction = locale.dir;
    resolvedCode = locale.code;
  } catch {
    // An unregistered locale surfaces through the conversion error below.
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    try {
      if (newValue.trim() === '') {
        setWordText('');
        setError(null);
        onChange?.(newValue, '');
        return;
      }

      const result = numberToWords(newValue, { ...options, locale: localeCode });
      setWordText(result);
      setError(null);
      onChange?.(newValue, result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid input';
      setError(errorMessage);
      setWordText('');
      onChange?.(newValue, '');
    }
  };

  return (
    <div className={`number-word-input-container ${className}`} style={style}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className="number-word-input"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'inherit',
        }}
        aria-describedby={showConvertedText ? 'number-word-conversion' : undefined}
      />
      
      {showConvertedText && (
        <div
          id="number-word-conversion"
          className="number-word-conversion-result"
          style={{
            marginTop: '8px',
            padding: '8px',
            backgroundColor: error ? '#ffe6e6' : '#f0f8ff',
            border: `1px solid ${error ? '#ff9999' : '#b3d9ff'}`,
            borderRadius: '4px',
            fontSize: '14px',
            minHeight: '20px',
          }}
        >
          {error ? (
            <span style={{ color: 'red' }} role="alert">
              Error: {error}
            </span>
          ) : (
            <span lang={resolvedCode} dir={direction}>
              {wordText || 'Enter a number to see number conversion'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
