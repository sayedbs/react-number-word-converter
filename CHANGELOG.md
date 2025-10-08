# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added
- Initial release of React Bangla Number Converter
- Core `numberToBanglaWords` function with comprehensive number support
- `BanglaNumberConverter` React component for displaying converted text
- `BanglaNumberInput` React component with real-time conversion
- `useBanglaNumberConverter` custom React hook
- Full TypeScript support with comprehensive type definitions
- Support for numbers from 0 to billions (Indian numbering system)
- Configuration options for spacing, separators, and Bangla digits
- Comprehensive test suite with 100% coverage
- Cross-browser compatibility
- Demo React application
- Complete documentation and examples

### Features
- ✅ Converts numbers to Bangla words following Indian numbering system
- ✅ Supports thousand, lakh, crore place values
- ✅ Handles decimal numbers (e.g., 10.5 → "দশ দশমিক পাঁচ")
- ✅ Handles negative numbers (e.g., -123 → "ঋণাত্মক এক শত তেইশ")
- ✅ Configurable spacing and custom separators
- ✅ Support for Bangla digits (০-৯) in input
- ✅ Real-time conversion in input components
- ✅ Error handling for invalid inputs
- ✅ Accessibility features (ARIA labels, proper language attributes)
- ✅ Performance optimized with memoization
- ✅ Lightweight bundle size
- ✅ No external dependencies (except React)

### Technical Details
- Built with TypeScript for type safety
- Uses Rollup for optimized bundling
- Jest for comprehensive testing
- ESLint and Prettier for code quality
- Babel for cross-browser compatibility
- UMD, ES module, and minified builds
- Full npm package ready for publishing
