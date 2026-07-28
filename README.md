# 🔢 React Number Word Converter

[![npm version](https://badge.fury.io/js/react-number-word-converter.svg)](https://badge.fury.io/js/react-number-word-converter)
[![Build Status](https://travis-ci.com/Sayed021/react-number-word-converter.svg?branch=main)](https://travis-ci.com/Sayed021/react-number-word-converter)
[![Coverage Status](https://coveralls.io/repos/github/Sayed021/react-number-word-converter/badge.svg?branch=main)](https://coveralls.io/github/Sayed021/react-number-word-converter?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful React utility plugin that converts numeric values into Bangla (Bengali) words. Perfect for financial applications, educational tools, and Bengali language interfaces.

## ✨ Features

- 🔢 **Complete Number Support**: Handles numbers from 0 to billions
- 🌐 **Cross-browser Compatible**: Works seamlessly across all modern browsers
- ⚙️ **Highly Configurable**: Customizable spacing, separators, and digit support
- 🎯 **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- 🧪 **Well Tested**: Comprehensive test suite with 100% coverage
- 📦 **Easy Integration**: Simple React components and hooks
- 🚀 **Performance Optimized**: Lightweight and fast conversion
- 🎨 **Accessible**: Built with accessibility in mind

## 📦 Installation

```bash
npm install react-number-word-converter
```

```bash
yarn add react-number-word-converter
```

```bash
pnpm add react-number-word-converter
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { BanglaNumberConverter } from 'react-number-word-converter';

function App() {
  return (
    <div>
      <BanglaNumberConverter value={12345} />
      {/* Output: বারো হাজার তিন শত পঁয়তাল্লিশ */}
    </div>
  );
}
```

### Using the Hook

```tsx
import { useBanglaNumberConverter } from 'react-number-word-converter';

function MyComponent() {
  const { banglaText, convert } = useBanglaNumberConverter(12345);
  
  return (
    <div>
      <p>Number: 12345</p>
      <p>Bangla: {banglaText}</p>
      {/* banglaText: "বারো হাজার তিন শত পঁয়তাল্লিশ" */}
    </div>
  );
}
```

### Direct Function Call

```tsx
import { numberToBanglaWords } from 'react-number-word-converter';

const result = numberToBanglaWords(12345);
console.log(result); // "বারো হাজার তিন শত পঁয়তাল্লিশ"
```

## 📚 API Reference

### `numberToBanglaWords(value, options?)`

Converts a number to its Bangla word representation.

**Parameters:**
- `value` (number | string): The number to convert
- `options` (ConverterOptions, optional): Configuration options

**Returns:** string - The Bangla word representation

**Example:**
```tsx
numberToBanglaWords(12345);
// Returns: "বারো হাজার তিন শত পঁয়তাল্লিশ"

numberToBanglaWords(12345, { includeSpaces: false });
// Returns: "বারোহাজারতিনশতপঁয়তাল্লিশ"
```

### `BanglaNumberConverter`

A React component that displays converted Bangla text.

**Props:**
```tsx
interface BanglaNumberConverterProps {
  value: number | string;           // The number to convert
  options?: ConverterOptions;       // Configuration options
  className?: string;               // Custom CSS class
  style?: React.CSSProperties;      // Custom inline styles
  onConvert?: (result: string) => void; // Callback when conversion completes
}
```

**Example:**
```tsx
<BanglaNumberConverter 
  value={12345}
  options={{ includeSpaces: true }}
  className="my-bangla-text"
  onConvert={(result) => console.log(result)}
/>
```

### `BanglaNumberInput`

A React component with an input field that shows real-time Bangla conversion.

**Props:**
```tsx
interface BanglaNumberInputProps {
  defaultValue?: number | string;   // Initial value
  placeholder?: string;             // Placeholder text
  options?: ConverterOptions;       // Configuration options
  className?: string;               // Custom CSS class
  style?: React.CSSProperties;      // Custom inline styles
  onChange?: (value: string, banglaText: string) => void; // Change callback
  showConvertedText?: boolean;      // Whether to show converted text
  disabled?: boolean;               // Whether input is disabled
}
```

**Example:**
```tsx
<BanglaNumberInput
  defaultValue={12345}
  placeholder="Enter a number..."
  showConvertedText={true}
  onChange={(value, banglaText) => {
    console.log('Input:', value);
    console.log('Bangla:', banglaText);
  }}
/>
```

### `useBanglaNumberConverter`

A custom React hook for number conversion.

**Parameters:**
- `initialValue` (number | string, optional): Initial number to convert
- `options` (ConverterOptions, optional): Configuration options

**Returns:**
```tsx
interface UseBanglaNumberConverterReturn {
  banglaText: string;               // The converted Bangla text
  isLoading: boolean;               // Whether conversion is in progress
  error: string | null;             // Any error that occurred
  convert: (value: number | string) => void; // Function to trigger conversion
}
```

**Example:**
```tsx
const { banglaText, isLoading, error, convert } = useBanglaNumberConverter(12345);

// Convert a new number
convert(67890);
```

## ⚙️ Configuration Options

### `ConverterOptions`

```tsx
interface ConverterOptions {
  includeSpaces?: boolean;          // Include spaces between words (default: true)
  supportBanglaDigits?: boolean;    // Support Bangla digits (০-৯) in input (default: false)
  outputBanglaDigits?: boolean;     // Output Bangla digits instead of words (default: false)
  separator?: string;               // Custom separator between words (default: ' ')
}
```

**Examples:**

```tsx
// Without spaces
numberToBanglaWords(12345, { includeSpaces: false });
// Returns: "বারোহাজারতিনশতপঁয়তাল্লিশ"

// Custom separator
numberToBanglaWords(12345, { separator: '-' });
// Returns: "বারো-হাজার-তিন-শত-পঁয়তাল্লিশ"

// Support Bangla digits in input
numberToBanglaWords('১২৩৪৫', { supportBanglaDigits: true });
// Returns: "বারো হাজার তিন শত পঁয়তাল্লিশ"
```

## 📖 Number Examples

| Number | Bangla Words |
|--------|-------------|
| 0 | শূন্য |
| 1 | এক |
| 10 | দশ |
| 25 | পঁচিশ |
| 100 | এক শত |
| 123 | এক শত তেইশ |
| 1,000 | এক হাজার |
| 12,345 | বারো হাজার তিন শত পঁয়তাল্লিশ |
| 1,00,000 | এক লাখ |
| 12,34,567 | বারো লাখ চৌত্রিশ হাজার পাঁচ শত সাতষট্টি |
| 1,00,00,000 | এক কোটি |
| 12,34,56,789 | বারো কোটি চৌত্রিশ লাখ ছাপ্পান্ন হাজার সাত শত নিরানব্বই |

## 🎯 Advanced Examples

### Financial Application

```tsx
import { BanglaNumberConverter } from 'react-number-word-converter';

function InvoiceAmount({ amount }: { amount: number }) {
  return (
    <div className="invoice-amount">
      <h3>Amount: ₹{amount.toLocaleString()}</h3>
      <p className="bangla-amount">
        <BanglaNumberConverter value={amount} />
      </p>
    </div>
  );
}

// Usage
<InvoiceAmount amount={1234567} />
// Displays: Amount: ₹12,34,567
//           বারো লাখ চৌত্রিশ হাজার পাঁচ শত সাতষট্টি
```

### Educational Tool

```tsx
import { BanglaNumberInput } from 'react-number-word-converter';

function NumberLearningApp() {
  return (
    <div className="learning-app">
      <h2>Learn Numbers in Bangla</h2>
      <BanglaNumberInput
        placeholder="Type any number to learn its Bangla name..."
        showConvertedText={true}
        options={{ includeSpaces: true }}
      />
    </div>
  );
}
```

### Custom Styling

```tsx
import { BanglaNumberConverter } from 'react-number-word-converter';

function StyledConverter({ value }: { value: number }) {
  return (
    <BanglaNumberConverter
      value={value}
      className="custom-bangla-text"
      style={{
        fontSize: '24px',
        color: '#2d3748',
        fontFamily: 'Noto Sans Bengali, Arial Unicode MS, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}
    />
  );
}
```

### Form Integration

```tsx
import { useState } from 'react';
import { BanglaNumberInput } from 'react-number-word-converter';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [banglaAmount, setBanglaAmount] = useState('');

  const handleAmountChange = (value: string, banglaText: string) => {
    setAmount(value);
    setBanglaAmount(banglaText);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="amount">Payment Amount</label>
        <BanglaNumberInput
          id="amount"
          defaultValue={amount}
          placeholder="Enter amount..."
          onChange={handleAmountChange}
          showConvertedText={true}
        />
      </div>
      
      {banglaAmount && (
        <div className="bangla-display">
          <strong>Amount in Bangla:</strong> {banglaAmount}
        </div>
      )}
    </form>
  );
}
```

### Multiple Language Support

```tsx
import { BanglaNumberConverter } from 'react-number-word-converter';

function MultiLanguageInvoice({ amount, language }: { amount: number; language: string }) {
  return (
    <div className="invoice">
      <h3>Invoice Amount</h3>
      <p className="amount-numeric">₹{amount.toLocaleString()}</p>
      
      {language === 'bn' && (
        <p className="amount-bangla">
          <BanglaNumberConverter value={amount} />
        </p>
      )}
    </div>
  );
}
```

## 🧪 Testing

The library includes comprehensive tests. To run tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## 🏗️ Building

To build the library:

```bash
npm run build
```

This creates:
- `dist/index.js` - UMD build for browsers
- `dist/index.esm.js` - ES module build
- `dist/index.min.js` - Minified UMD build
- `dist/index.d.ts` - TypeScript definitions

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11+ (with polyfills)

## 📋 Requirements

- React 16.8.0 or higher
- Modern browser with ES6 support

## 🎨 Styling

The components come with minimal default styling. You can customize the appearance using CSS:

```css
.bangla-number-converter {
  font-family: 'Noto Sans Bengali', 'Arial Unicode MS', sans-serif;
  font-size: 18px;
  color: #2d3748;
  line-height: 1.6;
}

.bangla-number-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
}

.bangla-conversion-result {
  margin-top: 8px;
  padding: 12px;
  background-color: #f7fafc;
  border-radius: 6px;
  font-family: 'Noto Sans Bengali', 'Arial Unicode MS', sans-serif;
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Numbers not displaying correctly**
   - Ensure you have Bengali fonts installed
   - Check that the number is valid (not NaN)

2. **TypeScript errors**
   - Make sure you have the latest version of the package
   - Check that your TypeScript version is 4.0+

3. **Styling issues**
   - Add proper CSS for Bengali fonts
   - Ensure proper text direction (ltr for numbers)

### Getting Help

If you encounter any issues:

1. Check the [documentation](#-api-reference)
2. Look at the [examples](#-advanced-examples)
3. Open an [issue](https://github.com/Sayed021/react-number-word-converter/issues)
4. Contact the maintainer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Sayed021/react-number-word-converter.git

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Build the project
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT © 2025 Sayed021**

## 🙏 Acknowledgments

- Bengali language community for linguistic guidance
- React team for the amazing framework
- Contributors and testers
- Open source community

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-reference)
2. Look at the [examples](#-advanced-examples)
3. Open an [issue](https://github.com/Sayed021/react-number-word-converter/issues)
4. Contact the maintainer

## 📈 Roadmap

- [ ] Support for more regional languages
- [ ] Currency formatting
- [ ] Date and time conversion
- [ ] Voice synthesis integration
- [ ] More customization options

---

Made with ❤️ for the Bengali language community by [Sayed021](https://github.com/Sayed021)