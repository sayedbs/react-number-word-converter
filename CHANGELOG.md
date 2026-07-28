# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-28

### Added
- Initial release of `react-number-word-converter`
- Core `numberToBanglaWords` function with comprehensive number support
- `BanglaNumberConverter` React component for displaying converted text
- `BanglaNumberInput` React component with real-time conversion
- `useBanglaNumberConverter` custom React hook
- Full TypeScript support with type definitions
- Support for numbers from 0 to billions (Indian numbering system)
- Configuration options for spacing, separators, and Bangla digits
- Support for negative numbers and decimals
- Digit string utilities (`isBanglaDigitString`, `isEnglishDigitString`)
- Comprehensive test suite
- In-package demo application
- Rollup builds (UMD, ESM, minified) and TypeScript declarations
