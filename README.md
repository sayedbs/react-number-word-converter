# 🔢 React Number Word Converter

**One plugin all language**

[![npm version](https://img.shields.io/npm/v/react-number-word-converter.svg)](https://www.npmjs.com/package/react-number-word-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-sayedbs%2Freact--number--word--converter-blue?logo=github)](https://github.com/sayedbs/react-number-word-converter)
[![Author](https://img.shields.io/badge/author-sayed021-informational)](https://github.com/sayedbs)

**React number to words** converter by **sayed021** — turn any number into English, Bangla (Bengali), Arabic, or your own language with one React plugin. Built for i18n, finance UIs, education tools, and multilingual apps. Supports RTL, TypeScript, hooks, and custom locales via `registerLocale()`.

- **npm:** [`react-number-word-converter`](https://www.npmjs.com/package/react-number-word-converter)
- **GitHub:** [github.com/sayedbs/react-number-word-converter](https://github.com/sayedbs/react-number-word-converter)
- **Release:** [v1.0.0](https://github.com/sayedbs/react-number-word-converter/releases/tag/1.0.0)
- **Author:** [sayed021](https://github.com/sayedbs)

```tsx
<NumberWordConverter value={12345} />            // twelve thousand three hundred forty-five
<NumberWordConverter value={12345} lang="bn" />  // বারো হাজার তিন শত পঁয়তাল্লিশ
<NumberWordConverter value={12345} lang="ar" />  // اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون
```

Ideal when you need a **React number-to-words plugin**, **multilingual number converter**, or **Bangla / Arabic / English amount-in-words** display in forms, invoices, and education apps.

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
numberToWords(12345, { locale: 'ar' });  // "اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون"
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

Any language can be added at runtime. You write a JSON locale file that matches the `LocaleDefinition` shape, register it once at app startup, then use it through the same `lang` / `locale` APIs as the built-ins.

#### 1. Create a locale file

Start from this template and fill in the words for your language:

```json
{
  "code": "fr",
  "name": "Français",
  "dir": "ltr",
  "digits": null,
  "negative": "moins",
  "decimal": "virgule",
  "numbers": {
    "0": "zéro",
    "1": "un",
    "2": "deux",
    "3": "trois",
    "4": "quatre",
    "5": "cinq",
    "6": "six",
    "7": "sept",
    "8": "huit",
    "9": "neuf",
    "10": "dix",
    "11": "onze",
    "12": "douze",
    "13": "treize",
    "14": "quatorze",
    "15": "quinze",
    "16": "seize",
    "17": "dix-sept",
    "18": "dix-huit",
    "19": "dix-neuf"
  },
  "tens": {
    "20": "vingt",
    "30": "trente",
    "40": "quarante",
    "50": "cinquante",
    "60": "soixante",
    "70": "soixante-dix",
    "80": "quatre-vingt",
    "90": "quatre-vingt-dix"
  },
  "tensJoiner": "-",
  "scales": [
    { "value": 100, "name": "cent" },
    { "value": 1000, "name": "mille" },
    { "value": 1000000, "name": "million" },
    { "value": 1000000000, "name": "milliard" }
  ]
}
```

#### 2. Register it before you render

```tsx
import { registerLocale, NumberWordConverter, setDefaultLocale } from 'react-number-word-converter';
import fr from './locales/fr.json';

// Call once at app startup, before any conversion runs
registerLocale('fr', fr);

// Optional: make it the default instead of English
setDefaultLocale('fr');

function App() {
  return <NumberWordConverter value={12345} lang="fr" />;
  // Output: douze mille trois cent quarante-cinq
}
```

If your bundler does not import JSON as a module, pass a plain object instead:

```tsx
registerLocale('fr', {
  code: 'fr',
  name: 'Français',
  dir: 'ltr',
  digits: null,
  negative: 'moins',
  decimal: 'virgule',
  numbers: { '0': 'zéro', '1': 'un' /* … */ },
  tens: { '20': 'vingt' /* … */ },
  tensJoiner: '-',
  scales: [
    { value: 100, name: 'cent' },
    { value: 1000, name: 'mille' },
  ],
});
```

Region tags fall back to the base code automatically, so registering `fr` also covers `fr-FR`, `fr-CA`, and `FR` with no extra work.

#### 3. Field reference

| Field | Required | Type | Purpose |
| --- | --- | --- | --- |
| `code` | yes | string | Locale identity. Emitted as the rendered element's `lang` attribute. Prefer a BCP-47 language subtag such as `fr` or `de`. |
| `name` | yes | string | Human-readable label for UI switchers. |
| `dir` | yes | `"ltr"` \| `"rtl"` | Text direction. Emitted as the element's `dir` attribute. Use `"rtl"` for Arabic, Hebrew, Urdu, and similar. |
| `digits` | yes | `string[10]` \| `null` | Native digit glyphs for 0–9, or `null` when the language uses ASCII `0-9`. Required length is exactly 10 when set. |
| `negative` | yes | string | Word placed before a negative number, for example `"minus"`, `"ঋণাত্মক"`, `"سالب"`. |
| `decimal` | yes | string | Word between the integer and fractional parts, for example `"point"`, `"virgule"`, `"فاصلة"`. |
| `numbers` | yes | object | Exact number-to-word map. **Must include `"0"`.** See the strategies below. |
| `tens` | yes | object | Multiples of ten used when composing a value that has no exact `numbers` entry. May be `{}` when every value under 100 is listed in `numbers`. |
| `tensJoiner` | yes | string | Joiner between a tens word and a ones word, for example `"-"` or `" و"`. |
| `scales` | yes | array | Place-value steps. Defines the numbering system. The smallest scale must be **100 or less**. |
| `unitsBeforeTens` | no | boolean | When `true`, reads ones before tens (`واحد وعشرون`, German `einundzwanzig`). Default `false`. |
| `groupSeparator` | no | string | Joiner between whole scale groups. Default `" "`. Arabic uses `" و"`. An explicit `separator` option overrides it. |
| `decimalMark` | no | string | Single native decimal character accepted on input, for example Arabic `"٫"`. Normalised to `"."` before parsing. |

Each entry in `scales` looks like:

```ts
{
  value: number;   // place value, e.g. 1000 or 100000
  name: string;    // default word for this scale
  nameByCount?: Array<{ from: number; to: number; name: string }>;
}
```

#### 4. Choose a strategy for 0–99

The engine always checks `numbers` first. If there is no exact entry, it composes from `tens` + `tensJoiner` + the ones digit.

**Strategy A — compositional (English, French, Arabic, German)**

List exact words for 0–19 (or 0–9 if teens are regular), put the tens words in `tens`, and let the engine compose the rest:

```json
"numbers": { "0": "zero", "1": "one", /* … */ "19": "nineteen" },
"tens": { "20": "twenty", "30": "thirty", /* … */ "90": "ninety" },
"tensJoiner": "-"
```

21 becomes `twenty` + `-` + `one` → `twenty-one`.

For languages that put the ones digit first, also set `"unitsBeforeTens": true` and choose a suitable joiner:

```json
"tensJoiner": " و",
"unitsBeforeTens": true
```

21 then becomes `واحد` + ` و` + `عشرون` → `واحد وعشرون`.

**Strategy B — full lookup table (Bangla)**

When every value from 0–99 is irregular, list them all in `numbers` and leave `tens` empty:

```json
"numbers": { "0": "শূন্য", "1": "এক", /* … */ "99": "নিরানব্বই" },
"tens": {},
"tensJoiner": " "
```

Exact entries always win, so you can also mix the two: list irregular teens in `numbers` and compose everything else.

#### 5. Define the numbering system with `scales`

`scales` is what makes English say *million* while Bangla says *lakh* and *crore*. List every place value you need, ascending by `value`. The engine walks them from largest to smallest and recurses on each group's count.

**Western short scale** (English, Arabic, most European languages):

```json
"scales": [
  { "value": 100, "name": "hundred" },
  { "value": 1000, "name": "thousand" },
  { "value": 1000000, "name": "million" },
  { "value": 1000000000, "name": "billion" },
  { "value": 1000000000000, "name": "trillion" }
]
```

**Indian system** (Bangla, Hindi, and related):

```json
"scales": [
  { "value": 100, "name": "শত" },
  { "value": 1000, "name": "হাজার" },
  { "value": 100000, "name": "লাখ" },
  { "value": 10000000, "name": "কোটি" }
]
```

Rules:

- The smallest scale must be **100 or less**. Registration rejects a gap above 99 (for example a table that starts at 1000), because values such as 150 would then be unreachable.
- Scale values must be numbers `>= 10`.
- Values larger than your biggest scale still work: the engine recurses, so `1_000_000_000` with only a crore scale becomes *one hundred crore*.

#### 6. Optional grammar features

Use these only when your language needs them. English and Bangla leave them all unset.

**Fused or irregular groups.** Before composing a group, the engine checks `numbers[count * scale.value]`. Put exact entries there for fused hundreds, duals, or any other irregular group word:

```json
"numbers": {
  "100": "مائة",
  "200": "مائتان",
  "300": "ثلاثمائة",
  "1000": "ألف",
  "2000": "ألفان"
}
```

345 then uses `ثلاثمائة` rather than composing "three" + "hundred".

**Count-dependent scale words.** When a scale word changes shape with its count (Arabic plurals, Slavic noun forms), add `nameByCount` ranges on that scale:

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

Ranges are matched against the **trailing** part of the count (`count % 100`), not the whole count. That is the rule languages like Arabic and the Slavic family actually use: 123,000 ends in 23 and takes the 11–99 form, while a round 300,000 has no trailing part and keeps the default `name`. Counts of 1 and 2 usually never reach this path, because the singular and dual are exact `numbers` entries.

**Group joiner.** Set `groupSeparator` when groups are not separated by a plain space:

```json
"groupSeparator": " و"
```

1234 then becomes `ألف ومائتان وأربعة وثلاثون`. Decimal digits never use this joiner; they stay space-separated.

**Native digits and decimal mark.** When the language has its own digit glyphs:

```json
"digits": ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
"decimalMark": "٫"
```

Callers then parse native input with `{ supportNativeDigits: true }`. `decimalMark` must be a single character and is rewritten to `.` before parsing. The thousands separator (`,` or `٬`) stays unsupported, matching ASCII `1,000`.

#### 7. Worked example: German (units before tens)

German is a good custom-locale exercise because it needs `unitsBeforeTens` but nothing else special:

```json
{
  "code": "de",
  "name": "Deutsch",
  "dir": "ltr",
  "digits": null,
  "negative": "minus",
  "decimal": "Komma",
  "numbers": {
    "0": "null",
    "1": "eins",
    "2": "zwei",
    "3": "drei",
    "4": "vier",
    "5": "fünf",
    "6": "sechs",
    "7": "sieben",
    "8": "acht",
    "9": "neun",
    "10": "zehn",
    "11": "elf",
    "12": "zwölf",
    "13": "dreizehn",
    "14": "vierzehn",
    "15": "fünfzehn",
    "16": "sechzehn",
    "17": "siebzehn",
    "18": "achtzehn",
    "19": "neunzehn"
  },
  "tens": {
    "20": "zwanzig",
    "30": "dreißig",
    "40": "vierzig",
    "50": "fünfzig",
    "60": "sechzig",
    "70": "siebzig",
    "80": "achtzig",
    "90": "neunzig"
  },
  "tensJoiner": "und",
  "unitsBeforeTens": true,
  "scales": [
    { "value": 100, "name": "hundert" },
    { "value": 1000, "name": "tausend" },
    { "value": 1000000, "name": "Million" },
    { "value": 1000000000, "name": "Milliarde" }
  ]
}
```

```tsx
registerLocale('de', de);

numberToWords(21, { locale: 'de' });   // "einsundzwanzig"
numberToWords(345, { locale: 'de' });  // "drei hundert fünfundvierzig"
```

Note: German has further orthographic rules (spacing around *hundert*, special forms of *eins*, and plural *Millionen*) that this minimal file does not cover. Treat it as a starting point, then refine with exact `numbers` entries and `nameByCount` as needed.

#### 8. Validate and test your locale

Registration validates the file and throws immediately on common mistakes:

- missing `numbers["0"]`
- empty or missing `scales`
- smallest scale greater than 100
- `digits` set but not exactly 10 glyphs
- `decimalMark` longer than one character
- `nameByCount` range that runs backwards or uses a non-integer bound
- `unitsBeforeTens: true` with an empty `tens` table

Check a few known values after registering. The asserts below match what the **minimal template above** produces; real French needs extra exact entries for forms like `cent` (not `un cent`) and `vingt et un`:

```tsx
import { registerLocale, numberToWords, hasLocale } from 'react-number-word-converter';
import fr from './locales/fr.json';

registerLocale('fr', fr);

console.assert(hasLocale('fr'));
console.assert(numberToWords(0, { locale: 'fr' }) === 'zéro');
console.assert(numberToWords(16, { locale: 'fr' }) === 'seize');
console.assert(numberToWords(21, { locale: 'fr' }) === 'vingt-un');
console.assert(numberToWords(100, { locale: 'fr' }) === 'un cent');
console.assert(numberToWords(-5, { locale: 'fr' }) === 'moins cinq');
console.assert(numberToWords(10.5, { locale: 'fr' }) === 'dix virgule cinq');
```

To make those outputs idiomatic, add exact `numbers` entries such as `"21": "vingt et un"`, `"100": "cent"`, and `"1000": "mille"`, then re-check. Pin the bands that matter for your language: teens, a composed tens value, each scale boundary, a negative, and a decimal.

#### 9. Checklist before shipping

- [ ] `numbers` includes `"0"`
- [ ] Every value from 0–99 is either listed in `numbers` or composable from `tens` + ones
- [ ] `scales` includes 100 (or something smaller) and every higher place value you need
- [ ] `dir` is `"rtl"` if the script is right-to-left
- [ ] `digits` is either `null` or exactly ten glyphs in order 0–9
- [ ] Negatives and decimals use the correct `negative` / `decimal` words
- [ ] Optional fields (`unitsBeforeTens`, `groupSeparator`, `nameByCount`, fused `numbers` entries) are set only where the grammar needs them
- [ ] `registerLocale` is called once at startup, before any conversion
- [ ] Spot-checked against a native speaker for the tricky bands (teens, hundreds, large scales)

#### 10. What the schema cannot express

These need engine changes, not just JSON:

- **Agreement with a caller-supplied noun** — Arabic `ثلاث بنات` versus `ثلاثة أولاد` depends on the thing being counted. This library names numbers; it does not decline them.
- **Construct-state forms** — Arabic 200,000 should strictly be `مائتا ألف`, but the current design yields `مائتان ألف`.
- **Currency and ordinal phrases** — out of scope for this package today.

If your language only needs the features above, you can ship it as a custom locale without waiting for a new library release.

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

numberToWords(12345, { locale: 'ar' });
// Returns: "اثنا عشر ألفًا وثلاثمائة وخمسة وأربعون"
```

### `NumberWordConverter`

A React component that displays converted word text. The rendered `<span>` carries the resolved language's `lang` and `dir` attributes.

**Props:**

```tsx
interface NumberWordConverterProps {
  value: number | string;           // The number to convert
  lang?: string;                    // Language code, e.g. 'en', 'bn', 'ar', 'en-GB'
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

A React component with an input field that shows real-time word conversion. For right-to-left languages the field and its container are marked `dir="rtl"` automatically.

**Props:**

```tsx
interface NumberWordInputProps {
  defaultValue?: number | string;   // Initial value
  placeholder?: string;             // Placeholder text
  lang?: string;                    // Language code, e.g. 'en', 'bn', 'ar', 'en-GB'
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
  isLoading: boolean;             // Always false today; reserved for future async work
  error: string | null;           // Any error that occurred
  convert: (value: number | string) => void; // Function to trigger conversion
}
```

**Example:**

```tsx
const { wordText, error, convert } = useNumberWordConverter(12345, { locale: 'ar' });

// Convert a new number
convert(67890);
```

## ⚙️ Configuration Options

### `ConverterOptions`

```tsx
interface ConverterOptions {
  includeSpaces?: boolean;          // Include spaces between word groups (default: true)
  supportNativeDigits?: boolean;    // Accept the language's native digits in input (default: false)
  outputNativeDigits?: boolean;     // Rewrite ASCII digits in the result string (default: false)
  separator?: string;               // Overrides the locale group joiner and the decimal-digit joiner
  locale?: string;                  // Language code (default: the global default, 'en')
}
```

**Examples:**

```tsx
// Custom separator (overrides the locale's groupSeparator too)
numberToWords(123, { separator: '-' });
// Returns: "one hundred-twenty-three"

// Without spaces
numberToWords(123, { includeSpaces: false });
// Returns: "one hundredtwenty-three"

// Native digits in input, for a language that has them
numberToWords('১২৩৪৫', { locale: 'bn', supportNativeDigits: true });
// Returns: "বারো হাজার তিন শত পঁয়তাল্লিশ"

numberToWords('١٠٫٥', { locale: 'ar', supportNativeDigits: true });
// Returns: "عشرة فاصلة خمسة"
```

`supportNativeDigits` and `outputNativeDigits` read the active language's `digits` array. English has none, so both options do nothing when the locale is `en`. When `separator` is omitted, groups use `locale.groupSeparator ?? ' '` and decimal digits use a plain space.

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
        <label>Payment Amount</label>
        <NumberWordInput
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

.number-word-converter:lang(ar) {
  font-family: 'Noto Naskh Arabic', 'Arial Unicode MS', sans-serif;
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
3. Open an [issue](https://github.com/sayedbs/react-number-word-converter/issues)
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
git clone https://github.com/sayedbs/react-number-word-converter.git

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

**MIT © 2026 [sayed021](https://github.com/sayedbs)**

## 🙏 Acknowledgments

- The Bengali and Arabic language communities for linguistic guidance on the built-in locales
- React team for the amazing framework
- Contributors and testers
- Open source community

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-reference)
2. Look at the [examples](#-advanced-examples)
3. Open an [issue](https://github.com/sayedbs/react-number-word-converter/issues)
4. Contact the maintainer

## 📈 Roadmap

- [x] Schema support for units-before-tens ordering, count-dependent scale words, and right-to-left languages
- [ ] More built-in languages
- [ ] Construct-state forms, so Arabic 200,000 reads `مائتا ألف` rather than `مائتان ألف`
- [ ] Agreement with a caller-supplied noun, for gendered counting
- [ ] Currency formatting
- [ ] Ordinal numbers
- [ ] Values beyond `Number.MAX_SAFE_INTEGER`

## 🔗 Links & topics

Suggested GitHub repository topics for discovery:

`react` · `typescript` · `i18n` · `number-to-words` · `localization` · `bangla` · `bengali` · `arabic` · `rtl` · `react-hooks` · `sayed021`

- Repository: https://github.com/sayedbs/react-number-word-converter
- Release v1.0.0: https://github.com/sayedbs/react-number-word-converter/releases/tag/1.0.0
- npm: https://www.npmjs.com/package/react-number-word-converter
- Issues: https://github.com/sayedbs/react-number-word-converter/issues
- Author: [sayed021](https://github.com/sayedbs)

---

Made with ❤️ by [sayed021](https://github.com/sayedbs) · [GitHub repo](https://github.com/sayedbs/react-number-word-converter)