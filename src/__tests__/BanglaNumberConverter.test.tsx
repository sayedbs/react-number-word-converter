import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BanglaNumberConverter, BanglaNumberInput } from '../BanglaNumberConverter';

describe('BanglaNumberConverter', () => {
  test('should render converted number correctly', () => {
    render(<BanglaNumberConverter value={123} />);
    expect(screen.getByText('এক শত তেইশ')).toBeInTheDocument();
  });

  test('should handle zero', () => {
    render(<BanglaNumberConverter value={0} />);
    expect(screen.getByText('শূন্য')).toBeInTheDocument();
  });

  test('should handle negative numbers', () => {
    render(<BanglaNumberConverter value={-123} />);
    expect(screen.getByText('ঋণাত্মক এক শত তেইশ')).toBeInTheDocument();
  });

  test('should handle decimal numbers', () => {
    render(<BanglaNumberConverter value={10.5} />);
    expect(screen.getByText('দশ দশমিক পাঁচ')).toBeInTheDocument();
  });

  test('should handle string input', () => {
    render(<BanglaNumberConverter value="123" />);
    expect(screen.getByText('এক শত তেইশ')).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<BanglaNumberConverter value={123} className="custom-class" />);
    const element = screen.getByText('এক শত তেইশ');
    expect(element).toHaveClass('custom-class');
  });

  test('should apply custom styles', () => {
    const customStyle = { color: 'red', fontSize: '20px' };
    render(<BanglaNumberConverter value={123} style={customStyle} />);
    const element = screen.getByText('এক শত তেইশ');
    expect(element).toHaveStyle('color: red; font-size: 20px');
  });

  test('should call onConvert callback', () => {
    const onConvert = jest.fn();
    render(<BanglaNumberConverter value={123} onConvert={onConvert} />);
    expect(onConvert).toHaveBeenCalledWith('এক শত তেইশ');
  });

  test('should handle conversion options', () => {
    const options = { includeSpaces: false };
    render(<BanglaNumberConverter value={123} options={options} />);
    expect(screen.getByText('এক শততেইশ')).toBeInTheDocument();
  });

  test('should display error for invalid input', () => {
    render(<BanglaNumberConverter value="invalid" />);
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  test('should have proper accessibility attributes', () => {
    render(<BanglaNumberConverter value={123} />);
    const element = screen.getByText('এক শত তেইশ');
    expect(element).toHaveAttribute('lang', 'bn');
    expect(element).toHaveAttribute('dir', 'ltr');
  });
});

describe('BanglaNumberInput', () => {
  test('should render input field', () => {
    render(<BanglaNumberInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('should show placeholder text', () => {
    render(<BanglaNumberInput placeholder="Enter number" />);
    expect(screen.getByPlaceholderText('Enter number')).toBeInTheDocument();
  });

  test('should convert input in real-time', async () => {
    render(<BanglaNumberInput />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    
    await waitFor(() => {
      expect(screen.getByText('এক শত তেইশ')).toBeInTheDocument();
    });
  });

  test('should show error for invalid input', async () => {
    render(<BanglaNumberInput />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'abc' } });
    
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  test('should handle empty input', async () => {
    render(<BanglaNumberInput />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '' } });
    
    await waitFor(() => {
      expect(screen.getByText('Enter a number to see Bangla conversion')).toBeInTheDocument();
    });
  });

  test('should call onChange callback', async () => {
    const onChange = jest.fn();
    render(<BanglaNumberInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('123', 'এক শত তেইশ');
    });
  });

  test('should handle disabled state', () => {
    render(<BanglaNumberInput disabled={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('should hide converted text when showConvertedText is false', () => {
    render(<BanglaNumberInput showConvertedText={false} />);
    expect(screen.queryByText('Enter a number to see Bangla conversion')).not.toBeInTheDocument();
  });

  test('should apply custom className and styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <BanglaNumberInput 
        className="custom-input" 
        style={customStyle} 
      />
    );
    const container = screen.getByRole('textbox').closest('div');
    expect(container).toHaveClass('custom-input');
    expect(container).toHaveStyle('background-color: red');
  });

  test('should handle defaultValue', () => {
    render(<BanglaNumberInput defaultValue={123} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123');
  });

  test('should handle conversion options', async () => {
    const options = { includeSpaces: false };
    render(<BanglaNumberInput options={options} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    
    await waitFor(() => {
      expect(screen.getByText('এক শততেইশ')).toBeInTheDocument();
    });
  });
});
