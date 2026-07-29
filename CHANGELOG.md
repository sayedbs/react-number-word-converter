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
- Multi-language support driven by JSON locale files, with English (`en`), Bangla (`bn`) and Arabic (`ar`) built in
- Automatic right-to-left rendering: rendered elements carry the resolved language's `lang` and `dir`, and `NumberWordInput` marks its field and container `rtl` so Arabic needs no extra props or CSS
- `lang` prop (and `lan` shorthand) on both components, plus a `locale` converter option
- Locale registry API: `registerLocale`, `getLocale`, `hasLocale`, `getRegisteredLocales`, `setDefaultLocale`, `getDefaultLocale`
- Region-tag fallback so codes such as `en-GB` and `ar-SA` resolve to their base language
- Support for both the Western short scale (thousand, million, billion) and the Indian system (hazar, lakh, crore)
- Locale schema options for languages that need more than a word list: `unitsBeforeTens` for units-first ordering, `groupSeparator` for a language-specific group joiner, `decimalMark` for a native decimal character, and per-scale `nameByCount` for scale words that inflect with their count
- Whole scale groups may be named outright in `numbers`, which is how Arabic renders fused hundreds such as `ثلاثمائة` and duals such as `ألفان`
- Locale validation that reports missing zero words, empty scale tables, malformed digit sets, backwards `nameByCount` ranges, multi-character decimal marks, and `unitsBeforeTens` without a `tens` table
- Full TypeScript support with type definitions, including the exported `LocaleDefinition`, `LocaleScale` and `LocaleScaleCountForm` types
- Configuration options for spacing, separators, and per-language native digits
- Support for negative numbers and decimals
- Digit string utilities (`isNativeDigitString`, `isEnglishDigitString`)
- Test suite of 131 tests covering all three languages, the registry and its validation, components, and the hook
- In-package demo application with a language switcher
- Rollup builds (UMD, ESM, minified) and TypeScript declarations

### Known limitations
- Arabic output uses unvocalized citation forms. Case endings that change spelling are applied, such as the accusative `ألفًا` after counts of 11 to 99, but a dual before a scale word keeps its final nūn, so 200,000 renders as `مائتان ألف` rather than the strict `مائتا ألف`
- Numbers cannot agree in gender with a noun supplied by the caller; the library names numbers rather than declining them
- All built-in locales are registered as an import side effect, so they ship whether or not an application uses them
