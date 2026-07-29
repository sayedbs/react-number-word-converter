# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-29

### Added
- Initial release of `react-number-word-converter`
- Core `numberToWords` function with comprehensive number support
- `NumberWordConverter` React component for displaying converted text
- `NumberWordInput` React component with real-time conversion
- `useNumberWordConverter` custom React hook
- Multi-language support driven by JSON locale files, with English (`en`) and Bangla (`bn`) built in
- `lang` prop (and `lan` shorthand) on both components, plus a `locale` converter option
- Locale registry API: `registerLocale`, `getLocale`, `hasLocale`, `getRegisteredLocales`, `setDefaultLocale`, `getDefaultLocale`
- Region-tag fallback so codes such as `en-GB` resolve to their base language
- Locale validation that reports missing zero words, empty scale tables, and malformed digit sets
- Support for both the Western short scale (thousand, million, billion) and the Indian system (hazar, lakh, crore)
- Rendered elements carry the resolved language's `lang` and `dir` attributes
- Full TypeScript support with type definitions, including the exported `LocaleDefinition` type
- Configuration options for spacing, separators, and per-language native digits
- Support for negative numbers and decimals
- Digit string utilities (`isNativeDigitString`, `isEnglishDigitString`)
- Test suite of 100 tests covering both languages, the registry, components, and the hook
- In-package demo application with a language switcher
- Rollup builds (UMD, ESM, minified) and TypeScript declarations
