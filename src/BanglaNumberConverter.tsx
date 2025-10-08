import React, { useMemo } from 'react';
import { numberToBanglaWords } from './numberToBanglaWords';
import { BanglaNumberConverterProps } from './types';

/**
 * React component for displaying Bangla number conversion
 * 
 * @example
 * ```tsx
 * <BanglaNumberConverter 
 *   value={12345} 
 *   options={{ includeSpaces: true }}
 *   className="bangla-text"
 * />
 * ```
 */
export const BanglaNumberConverter: React.FC<BanglaNumberConverterProps> = ({
  value,
  options = {},
  className = '',
  style = {},
  onConvert,
}) => {
  const { banglaText, error } = useMemo(() => {
    try {
      const result = numberToBanglaWords(value, options);
      onConvert?.(result);
      return { banglaText: result, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      return { banglaText: '', error: errorMessage };
    }
  }, [value, options, onConvert]);

  if (error) {
    return (
      <span 
        className={`bangla-number-error ${className}`}
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
      className={`bangla-number-converter ${className}`}
      style={style}
      lang="bn"
      dir="ltr"
    >
      {banglaText}
    </span>
  );
};

/**
 * Input component that converts numbers to Bangla words in real-time
 */
export interface BanglaNumberInputProps {
  /** Initial value */
  defaultValue?: number | string;
  /** Placeholder text */
  placeholder?: string;
  /** Configuration options */
  options?: BanglaNumberConverterProps['options'];
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Callback when value changes */
  onChange?: (value: string, banglaText: string) => void;
  /** Whether to show the converted text below the input */
  showConvertedText?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
}

export const BanglaNumberInput: React.FC<BanglaNumberInputProps> = ({
  defaultValue = '',
  placeholder = 'Enter a number...',
  options = {},
  className = '',
  style = {},
  onChange,
  showConvertedText = true,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = React.useState<string>(String(defaultValue));
  const [banglaText, setBanglaText] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    try {
      if (newValue.trim() === '') {
        setBanglaText('');
        setError(null);
        onChange?.(newValue, '');
        return;
      }

      const result = numberToBanglaWords(newValue, options);
      setBanglaText(result);
      setError(null);
      onChange?.(newValue, result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid input';
      setError(errorMessage);
      setBanglaText('');
      onChange?.(newValue, '');
    }
  };

  return (
    <div className={`bangla-number-input-container ${className}`} style={style}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className="bangla-number-input"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'inherit',
        }}
        aria-describedby={showConvertedText ? 'bangla-conversion' : undefined}
      />
      
      {showConvertedText && (
        <div
          id="bangla-conversion"
          className="bangla-conversion-result"
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
            <span lang="bn" dir="ltr">
              {banglaText || 'Enter a number to see Bangla conversion'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
