# 🔢 React Number Word Converter

[npm version](https://badge.fury.io/js/react-number-word-converter)
[Build Status](https://travis-ci.com/Sayed021/react-number-word-converter)
[Coverage Status](https://coveralls.io/github/Sayed021/react-number-word-converter?branch=main)
[License: MIT](https://opensource.org/licenses/MIT)

A powerful React utility plugin that converts numeric values into number words, in any language you register. Perfect for financial applications, educational tools, and localized interfaces.

```tsx
<NumberWordConverter value={12345} />            // twelve thousand three hundred forty-five
<NumberWordConverter value={12345} lang="bn" />  // বারো হাজার তিন শত পঁয়তাল্লিশ
<NumberWordConverter value={12345} lang="ar" />  // اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون
```

## ✨ Features

- 🌍 **Multi-language**: English, Bangla and Arabic built in as JSON locale files, plus `registerLocale()` for your own
- ↔️ **Automatic RTL**: Right-to-left languages render with `dir="rtl"` on their own, with no extra props or CSS
- 🔢 **Two Numbering Systems**: Western short scale (thousand, million, billion) and the Indian system (hazar, lakh, crore)
- 🏷️ **Locale Fallback**: Region tags resolve to their base language, so `en-GB` uses `en` and `ar-SA` uses `ar`
- ⚙️ **Highly Configurable**: Customizable spacing, separators, and per-language native digits
- 🎯 **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- 🧪 **Well Tested**: 131 tests covering all three languages, the registry, components, and the hook
- 📦 **Easy Integration**: Simple React components and hooks
- 🎨 **Accessible**: Emits correct `lang` and `dir` attributes for the active language

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
import { NumberWordConverter } from 'react-number-word-converter';

function App() {
  return (
    <div>
      <NumberWordConverter value={12345} />
      {/* Output: twelve thousand three hundred forty-five */}
    </div>
  );
}
```

### Choosing a Language

```tsx
<NumberWordConverter value={12345} />              {/* twelve thousand three hundred forty-five */}
<NumberWordConverter value={12345} lang="en" />    {/* twelve thousand three hundred forty-five */}
<NumberWordConverter value={12345} lang="bn" />    {/* বারো হাজার তিন শত পঁয়তাল্লিশ */}
<NumberWordConverter value={12345} lang="ar" />    {/* اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون */}
<NumberWordConverter value={12345} lang="en-GB" /> {/* falls back to en */}
```

### Using the Hook

```tsx
import { useNumberWordConverter } from 'react-number-word-converter';

function MyComponent() {
  const { wordText, convert } = useNumberWordConverter(12345, { locale: 'bn' });
  
  return (
    <div>
      <p>Number: 12345</p>
      <p>Words: {wordText}</p>
      {/* wordText: "বারো হাজার তিন শত পঁয়তাল্লিশ" */}
    </div>
  );
}
```

### Direct Function Call

```tsx
import { numberToWords } from 'react-number-word-converter';

numberToWords(12345);                    // "twelve thousand three hundred forty-five"
numberToWords(12345, { locale: 'bn' });  // "বারো হাজার তিন শত পঁয়তাল্লিশ"
```

## 🌍 Languages

### Built-in languages


| Code | Language          | Direction | Numbering system                                                   | Native digits |
| ---- | ----------------- | --------- | ------------------------------------------------------------------ | ------------- |
| `en` | English (default) | ltr       | Western short scale: hundred, thousand, million, billion, trillion | none          |
| `bn` | Bangla            | ltr       | Indian: শত, হাজার, লাখ, কোটি                                       | ০-৯           |
| `ar` | Arabic            | **rtl**   | Western short scale: مائة, ألف, مليون, مليار, تريليون              | ٠-٩           |


### Arabic and right-to-left rendering

Arabic needs no configuration to display correctly. The locale carries its own direction, and the components emit it, so the browser handles the rest:

```tsx
<NumberWordConverter value={345} lang="ar" />
// renders: <span lang="ar" dir="rtl">ثلاثمائة وخمسة وأربعون</span>
```

`NumberWordInput` does the same, marking both the field and its container `dir="rtl"` so the input right-aligns. Digits typed into it still read left to right under Unicode bidi, so entry behaves normally.

Some Arabic output worth knowing about, since it does not follow the pattern of the other languages:

- Units are read before tens: 21 is `واحد وعشرون`, literally "one and twenty"
- Hundreds are single fused words rather than a count plus a scale: 300 is `ثلاثمائة`, not `ثلاثة مائة`
- Groups are strung together with `و`: 1234 is `ألف ومائتان وأربعة وثلاثون`
- The scale word inflects for the number in front of it, so 3,000 is `ثلاثة آلاف`, 11,000 is `أحد عشر ألفًا`, and 100,000 is `مائة ألف`
- Arabic-Indic digits `٠-٩` are accepted on input with `supportNativeDigits`, including the Arabic decimal mark `٫`

Output uses unvocalized citation forms. Case endings that change spelling are applied, such as the accusative `ألفًا` after counts of 11 to 99, but purely diacritical endings are omitted. One known simplification: a dual before a scale word keeps its final nūn, so 200,000 renders as `مائتان ألف` where strict Modern Standard Arabic writes `مائتا ألف`.

### How a language is chosen

The converter looks in this order and uses the first value it finds:

1. The `lang` prop on the component
2. The `lan` prop (a shorthand alias for `lang`)
3. `options.locale`
4. The global default, which starts as `en`

Codes are case-insensitive, and a region tag falls back to its base language. `en-GB`, `EN`, and `en` all resolve to the `en` locale, so you can pass through whatever code your app already has without special-casing it. An unrecognised base language throws a clear error rather than silently rendering the wrong language.

### Changing the global default

```tsx
import { setDefaultLocale } from 'react-number-word-converter';

setDefaultLocale('bn');

<NumberWordConverter value={12345} />  // now renders Bangla
```

`setDefaultLocale` is module-level state read at conversion time, so it will not re-render components that are already mounted. Call it once during app startup, and use the `lang` prop for anything that changes while the app is running.

### Adding your own language

~~Write a JSON file matching the~~ `LocaleDefinition` ~~shape and register it before you render:~~

```tsx
import { registerLocale } from 'react-number-word-converter';
import fr from './fr.json';

registerLocale('fr', fr);

<NumberWordConverter value={12345} lang="fr" />
```

A locale file looks like this:

```json
{
  "code": "fr",
  "name": "Français",
  "dir": "ltr",
  "digits": null,
  "negative": "moins",
  "decimal": "virgule",
  "numbers": { "0": "zéro", "1": "un", "2": "deux", "16": "seize" },
  "tens": { "20": "vingt", "30": "trente", "90": "quatre-vingt-dix" },
  "tensJoiner": "-",
  "scales": [
    { "value": 100, "name": "cent" },
    { "value": 1000, "name": "mille" },
    { "value": 1000000, "name": "million" }
  ]
}
```


| Field                 | Required | Purpose                                                                         |
| --------------------- | -------- | ------------------------------------------------------------------------------- |
| `code`, `name`        | yes      | Identity; `code` is emitted as the rendered element's `lang` attribute          |
| `dir`                 | yes      | `"ltr"` or `"rtl"`, emitted as the element's `dir` attribute                    |
| `digits`              | yes      | Ten native digit glyphs, or `null` for languages that use ASCII digits          |
| `negative`, `decimal` | yes      | Words placed before a negative number and between the integer and decimal parts |
| `numbers`             | yes      | Exact number-to-word entries. Must include `"0"`                                |
| `tens`, `tensJoiner`  | yes      | Used to compose a value when `numbers` has no exact entry                       |
| `scales`              | yes      | Place values, which is what defines the numbering system                        |
| `unitsBeforeTens`     | no       | Reads the ones word before the tens word, for Arabic and German                 |
| `groupSeparator`      | no       | Joins whole scale groups. Defaults to a space; Arabic uses `" و"`               |
| `decimalMark`         | no       | Native decimal character accepted on input, such as Arabic `٫`                  |
| `nameByCount`         | no       | Per-scale alternative names chosen by how many of that scale there are          |


Values under 100 are resolved by looking in `numbers` first and composing from `tens` only as a fallback. That is what lets one engine serve Bangla, which lists all 99 values because they are irregular, and English, which lists 0-19 and composes the rest.

`numbers` is also consulted for a whole scale group before the group is composed, which is how Arabic gets fused hundreds. An entry for `"300"` means 345 renders as `ثلاثمائة وخمسة وأربعون` rather than composing "three" and "hundred" separately.

`nameByCount` handles languages where a scale word changes shape according to its count:

```json
{
  "value": 1000,
  "name": "ألف",
  "nameByCount": [
    { "from": 3, "to": 10, "name": "آلاف" },
    { "from": 11, "to": 99, "name": "ألفًا" }
  ]
}
```

Ranges are matched against the *trailing* part of the count, not the whole of it, because that is what governs the inflection in the languages that need this. A count of 123 ends in 23 and so takes the 11-99 form, while a round 300 has no trailing part and falls through to the default `name`. Slavic plural bands work the same way.

Registration validates the file and throws on common mistakes, such as a missing `"0"`, an empty `scales` array, a `digits` array that is not exactly ten glyphs, a backwards `nameByCount` range, or `unitsBeforeTens` set on a locale with no `tens` table.

**What the schema cannot express.** The three built-in languages cover two numbering systems, two ways of forming 0-99, both text directions, and count-dependent scale words, which is a wide net. What remains out of reach is agreement between a number and a noun the caller supplies: Arabic's `ثلاث بنات` versus `ثلاثة أولاد` depends on the thing being counted, and this library names numbers rather than declining them.

### Registry API

```tsx
import {
  registerLocale,      // (code, localeDefinition) => void
  getLocale,           // (code?) => LocaleDefinition, throws if unregistered
  hasLocale,           // (code) => boolean, never throws
  getRegisteredLocales,// () => string[]
  setDefaultLocale,    // (code) => void
  getDefaultLocale,    // () => string
} from 'react-number-word-converter';
```

## 📚 API Reference

### `numberToWords(value, options?)`

Converts a number to its word representation.

**Parameters:**

- `value` (number | string): The number to convert
- `options` (ConverterOptions, optional): Configuration options

**Returns:** string - The word representation

**Example:**

```tsx
numberToWords(12345);
// Returns: "twelve thousand three hundred forty-five"

numberToWords(12345, { locale: 'bn' });
// Returns: "বারো হাজার তিন শত পঁয়তাল্লিশ"
```

### `NumberWordConverter`

A React component that displays converted word text. The rendered `<span>` carries the resolved language's `lang` and `dir` attributes.

**Props:**

```tsx
interface NumberWordConverterProps {
  value: number | string;           // The number to convert
  lang?: string;                    // Language code, e.g. 'en', 'bn', 'en-GB'
  lan?: string;                     // Shorthand alias for lang
  options?: ConverterOptions;       // Configuration options
  className?: string;               // Custom CSS class
  style?: React.CSSProperties;      // Custom inline styles
  onConvert?: (result: string) => void; // Callback when conversion completes
}
```

**Example:**

```tsx
<NumberWordConverter 
  value={12345}
  lang="bn"
  options={{ includeSpaces: true }}
  className="my-number-word-text"
  onConvert={(result) => console.log(result)}
/>
```

### `NumberWordInput`

A React component with an input field that shows real-time word conversion.

**Props:**

```tsx
interface NumberWordInputProps {
  defaultValue?: number | string;   // Initial value
  placeholder?: string;             // Placeholder text
  lang?: string;                    // Language code, e.g. 'en', 'bn', 'en-GB'
  lan?: string;                     // Shorthand alias for lang
  options?: ConverterOptions;       // Configuration options
  className?: string;               // Custom CSS class
  style?: React.CSSProperties;      // Custom inline styles
  onChange?: (value: string, wordText: string) => void; // Change callback
  showConvertedText?: boolean;      // Whether to show converted text
  disabled?: boolean;               // Whether input is disabled
}
```

**Example:**

```tsx
<NumberWordInput
  defaultValue={12345}
  placeholder="Enter a number..."
  showConvertedText={true}
  onChange={(value, wordText) => {
    console.log('Input:', value);
    console.log('Words:', wordText);
  }}
/>
```

### `useNumberWordConverter`

A custom React hook for number conversion.

**Parameters:**

- `initialValue` (number | string, optional): Initial number to convert
- `options` (ConverterOptions, optional): Configuration options

**Returns:**

```tsx
interface UseNumberWordConverterReturn {
  wordText: string;               // The converted word text
  isLoading: boolean;               // Whether conversion is in progress
  error: string | null;             // Any error that occurred
  convert: (value: number | string) => void; // Function to trigger conversion
}
```

**Example:**

```tsx
const { wordText, isLoading, error, convert } = useNumberWordConverter(12345);

// Convert a new number
convert(67890);
```

## ⚙️ Configuration Options

### `ConverterOptions`

```tsx
interface ConverterOptions {
  includeSpaces?: boolean;          // Include spaces between word groups (default: true)
  supportNativeDigits?: boolean;    // Accept the language's native digits in input (default: false)
  outputNativeDigits?: boolean;     // Emit the language's native digits (default: false)
  separator?: string;               // Custom separator between word groups (default: ' ')
  locale?: string;                  // Language code (default: the global default, 'en')
}
```

**Examples:**

```tsx
// Custom separator
numberToWords(123, { separator: '-' });
// Returns: "one hundred-twenty-three"

// Without spaces
numberToWords(123, { includeSpaces: false });
// Returns: "one hundredtwenty-three"

// Native digits in input, for a language that has them
numberToWords('১২৩৪৫', { locale: 'bn', supportNativeDigits: true });
// Returns: "বারো হাজার তিন শত পঁয়তাল্লিশ"
```

`supportNativeDigits` and `outputNativeDigits` read the active language's `digits` array. English has none, so both options do nothing when the locale is `en`.

## 📖 Number Examples


| Number      | English (`en`)                                                                             | Bangla (`bn`)                                        |
| ----------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| 0           | zero                                                                                       | শূন্য                                                |
| 1           | one                                                                                        | এক                                                   |
| 10          | ten                                                                                        | দশ                                                   |
| 25          | twenty-five                                                                                | পঁচিশ                                                |
| 100         | one hundred                                                                                | এক শত                                                |
| 123         | one hundred twenty-three                                                                   | এক শত তেইশ                                           |
| 1,000       | one thousand                                                                               | এক হাজার                                             |
| 12,345      | twelve thousand three hundred forty-five                                                   | বারো হাজার তিন শত পঁয়তাল্লিশ                        |
| 100,000     | one hundred thousand                                                                       | এক লাখ                                               |
| 1,000,000   | one million                                                                                | দশ লাখ                                               |
| 10,000,000  | ten million                                                                                | এক কোটি                                              |
| 123,456,789 | one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine | বারো কোটি চৌত্রিশ লাখ ছাপ্পান্ন হাজার সাত শত ঊননব্বই |


The two columns diverge above 99,999 because the languages group digits differently: English breaks at every three digits, Bangla at every two after the thousand.

Arabic is listed separately rather than as a third column, because right-to-left text sitting between table delimiters is difficult to read in the Markdown source:

- **0** — صفر
- **1** — واحد
- **10** — عشرة
- **25** — خمسة وعشرون
- **100** — مائة
- **123** — مائة وثلاثة وعشرون
- **1,000** — ألف
- **12,345** — اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون
- **100,000** — مائة ألف
- **1,000,000** — مليون
- **10,000,000** — عشرة ملايين
- **123,456,789** — مائة وثلاثة وعشرون مليونًا وأربعمائة وستة وخمسون ألفًا وسبعمائة وتسعة وثمانون

## 🎯 Advanced Examples

### Financial Application

```tsx
import { NumberWordConverter } from 'react-number-word-converter';

function InvoiceAmount({ amount, lang }: { amount: number; lang: string }) {
  return (
    <div className="invoice-amount">
      <h3>Amount: {amount.toLocaleString()}</h3>
      <p className="number-word-amount">
        <NumberWordConverter value={amount} lang={lang} />
      </p>
    </div>
  );
}

// Usage
<InvoiceAmount amount={1234567} lang="bn" />
// Displays: Amount: 1,234,567
//           বারো লাখ চৌত্রিশ হাজার পাঁচ শত সাতষট্টি
```

### Educational Tool

```tsx
import { NumberWordInput } from 'react-number-word-converter';

function NumberLearningApp() {
  return (
    <div className="learning-app">
      <h2>Learn Number Words</h2>
      <NumberWordInput
        placeholder="Type any number to learn its word form..."
        showConvertedText={true}
        options={{ includeSpaces: true }}
      />
    </div>
  );
}
```

### Custom Styling

```tsx
import { NumberWordConverter } from 'react-number-word-converter';

function StyledConverter({ value }: { value: number }) {
  return (
    <NumberWordConverter
      value={value}
      className="custom-number-word-text"
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
import { NumberWordInput } from 'react-number-word-converter';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [wordAmount, setWordAmount] = useState('');

  const handleAmountChange = (value: string, wordText: string) => {
    setAmount(value);
    setWordAmount(wordText);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="amount">Payment Amount</label>
        <NumberWordInput
          id="amount"
          defaultValue={amount}
          placeholder="Enter amount..."
          onChange={handleAmountChange}
          showConvertedText={true}
        />
      </div>
      
      {wordAmount && (
        <div className="number-word-display">
          <strong>Amount in Words:</strong> {wordAmount}
        </div>
      )}
    </form>
  );
}
```

### Language Switcher

```tsx
import { useState } from 'react';
import { NumberWordConverter, getRegisteredLocales, getLocale } from 'react-number-word-converter';

function AmountInEveryLanguage({ amount }: { amount: number }) {
  const [lang, setLang] = useState('en');

  return (
    <div>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {getRegisteredLocales().map((code) => (
          <option key={code} value={code}>
            {getLocale(code).name}
          </option>
        ))}
      </select>

      <NumberWordConverter value={amount} lang={lang} />
    </div>
  );
}
```

### Wiring Into an Existing i18n Setup

Because region tags fall back to their base language, you can pass your app's current locale straight through without mapping it first:

```tsx
import { useTranslation } from 'react-i18next';
import { NumberWordConverter } from 'react-number-word-converter';

function Amount({ value }: { value: number }) {
  const { i18n } = useTranslation();

  // i18n.language may be 'en-GB', 'en-US', 'bn-BD' or 'ar-SA'; all resolve
  // correctly, and the rendered direction follows the resolved language
  return <NumberWordConverter value={value} lang={i18n.language} />;
}
```

## 🧪 Testing

The library ships 131 tests across six suites, covering each built-in language, the locale registry and its validation, both components, and the hook. To run them:

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
.number-word-converter {
  font-size: 18px;
  color: #2d3748;
  line-height: 1.6;
}

/* The rendered element carries the active language, so you can
   target scripts individually */
.number-word-converter:lang(bn) {
  font-family: 'Noto Sans Bengali', 'Arial Unicode MS', sans-serif;
}

.number-word-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
}

.number-word-conversion-result {
  margin-top: 8px;
  padding: 12px;
  background-color: #f7fafc;
  border-radius: 6px;
}

.number-word-error {
  color: #e53e3e;
}
```

## 🔧 Troubleshooting

### Common Issues

1. `Locale "xx" is not registered`
  - Only `en`, `bn` and `ar` ship with the package. Register anything else with `registerLocale()` before rendering
  - The error lists the currently registered codes, which is usually enough to spot a typo
  - Use `hasLocale(code)` if you need to check without throwing
2. **Output is in English when you expected another language**
  - Check the precedence order: `lang` beats `lan`, which beats `options.locale`, which beats the global default
  - `setDefaultLocale()` does not re-render mounted components; call it at startup or use the `lang` prop
3. **Numbers not displaying correctly**
  - Ensure you have a font covering the language's script, for example a Bengali font for `bn` or an Arabic font for `ar`
  - Check that the number is valid (not NaN)
4. **Arabic renders left-to-right**
  - The component sets `dir="rtl"` itself, so check that a parent stylesheet is not forcing `direction: ltr` over it
  - If you render the string yourself instead of using the component, read `getLocale('ar').dir` and apply it to your own element
5. `supportNativeDigits` **seems to do nothing**
  - It reads the active language's `digits` array, and English has none. Pass `locale: 'bn'` to parse ০-৯ or `locale: 'ar'` to parse ٠-٩
6. **Arabic groups run together with no separator**
  - `includeSpaces: false` strips the `و` that joins Arabic groups, leaving the words fused. Leave it on for Arabic
7. **TypeScript errors**
  - Make sure you have the latest version of the package
  - Check that your TypeScript version is 4.0+

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

- The Bengali language community for linguistic guidance on the `bn` locale
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

- [x] Schema support for units-before-tens ordering, count-dependent scale words, and right-to-left languages
- [ ] More built-in languages
- [ ] Construct-state forms, so Arabic 200,000 reads `مائتا ألف` rather than `مائتان ألف`
- [ ] Agreement with a caller-supplied noun, for gendered counting
- [ ] Currency formatting
- [ ] Ordinal numbers
- [ ] Values beyond `Number.MAX_SAFE_INTEGER`

---

Made with ❤️ by [Sayed021](https://github.com/Sayed021)