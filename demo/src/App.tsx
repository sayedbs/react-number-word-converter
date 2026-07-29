import React, { useMemo, useState } from 'react';
import { 
  NumberWordConverter, 
  NumberWordInput, 
  useNumberWordConverter,
  numberToWords,
  getRegisteredLocales,
  getLocale,
  ConverterOptions 
} from 'react-number-word-converter';

const LANGUAGE_CHOICES = [
  { code: 'en', label: 'English (en)' },
  { code: 'bn', label: 'Bangla (bn)' },
  { code: 'en-GB', label: 'British English (en-GB, falls back to en)' },
];

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('12345');
  const [lang, setLang] = useState<string>('en');
  const [options, setOptions] = useState<ConverterOptions>({
    includeSpaces: true,
    supportNativeDigits: false,
    outputNativeDigits: false,
    separator: ' '
  });

  // Memoized so the hook does not see a new options object on every render.
  const activeOptions = useMemo<ConverterOptions>(
    () => ({ ...options, locale: lang }),
    [options, lang]
  );

  const { wordText, isLoading, error } = useNumberWordConverter(inputValue, activeOptions);

  const resolvedLocale = getLocale(lang);
  const registeredLocales = getRegisteredLocales();

  const exampleNumbers = [
    0, 1, 10, 25, 100, 123, 1000, 1234, 10000, 10005, 
    100000, 123456, 1000000, 10000000, 123456789
  ];

  const handleOptionChange = (key: keyof ConverterOptions, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🔢 React Number Word Converter</h1>
        <p>
          A powerful React plugin that converts numeric values into number words
          in any registered language. Perfect for financial applications,
          educational tools, and localized interfaces.
        </p>
      </header>

      <div className="container">
        {/* Interactive Converter */}
        <div className="card">
          <h2>🎯 Interactive Converter</h2>
          <div className="input-group">
            <label htmlFor="number-input">Enter a number:</label>
            <input
              id="number-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number (e.g., 12345)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="language-select">Language:</label>
            <select
              id="language-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {LANGUAGE_CHOICES.map((choice) => (
                <option key={choice.code} value={choice.code}>
                  {choice.label}
                </option>
              ))}
            </select>
            <small>
              Requested "{lang}", resolved to "{resolvedLocale.code}" ({resolvedLocale.name}).
              Registered: {registeredLocales.join(', ')}.
            </small>
          </div>

          <div className="options-grid">
            <div className="option-item">
              <input
                type="checkbox"
                id="includeSpaces"
                checked={options.includeSpaces}
                onChange={(e) => handleOptionChange('includeSpaces', e.target.checked)}
              />
              <label htmlFor="includeSpaces">Include spaces</label>
            </div>

            <div className="option-item">
              <input
                type="checkbox"
                id="supportNativeDigits"
                checked={options.supportNativeDigits}
                onChange={(e) => handleOptionChange('supportNativeDigits', e.target.checked)}
              />
              <label htmlFor="supportNativeDigits">
                Support native digits{resolvedLocale.digits ? ` (${resolvedLocale.digits.join('')})` : ' (none in this language)'}
              </label>
            </div>

            <div className="option-item">
              <input
                type="checkbox"
                id="outputNativeDigits"
                checked={options.outputNativeDigits}
                onChange={(e) => handleOptionChange('outputNativeDigits', e.target.checked)}
              />
              <label htmlFor="outputNativeDigits">
                Output native digits{resolvedLocale.digits ? ` (${resolvedLocale.digits.join('')})` : ' (none in this language)'}
              </label>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="separator">Custom separator:</label>
            <input
              id="separator"
              type="text"
              value={options.separator}
              onChange={(e) => handleOptionChange('separator', e.target.value)}
              placeholder="Separator between words"
            />
          </div>

          <div className="word-result">
            {isLoading ? (
              <span>Converting...</span>
            ) : error ? (
              <span className="error">Error: {error}</span>
            ) : (
              <span>{wordText || 'Enter a number to see conversion'}</span>
            )}
          </div>
        </div>

        {/* Real-time Input Component */}
        <div className="card">
          <h2>⚡ Real-time Input Component</h2>
          <p>Type numbers and see instant word conversion:</p>
          <NumberWordInput
            defaultValue="12345"
            placeholder="Type any number here..."
            lang={lang}
            options={options}
            showConvertedText={true}
          />
        </div>

        {/* Side-by-side languages */}
        <div className="card">
          <h2>🌍 One Number, Every Language</h2>
          <p>
            The same value rendered in each registered language. English uses the
            Western short scale, Bangla uses the Indian system.
          </p>
          <div className="examples">
            {registeredLocales.map((code) => (
              <div key={code} className="example-item">
                <h3>{getLocale(code).name} ({code})</h3>
                <NumberWordConverter value={12345} lang={code} />
              </div>
            ))}
          </div>
        </div>

        {/* Component Examples */}
        <div className="card">
          <h2>🧩 Component Examples</h2>
          <div className="examples">
            <div className="example-item">
              <h3>Basic Converter</h3>
              <NumberWordConverter value={12345} lang={lang} />
            </div>
            
            <div className="example-item">
              <h3>Without Spaces</h3>
              <NumberWordConverter 
                value={12345} 
                lang={lang}
                options={{ includeSpaces: false }} 
              />
            </div>
            
            <div className="example-item">
              <h3>Custom Separator</h3>
              <NumberWordConverter 
                value={12345} 
                lang={lang}
                options={{ separator: '-' }} 
              />
            </div>
            
            <div className="example-item">
              <h3>Decimal Number</h3>
              <NumberWordConverter value={123.45} lang={lang} />
            </div>
            
            <div className="example-item">
              <h3>Negative Number</h3>
              <NumberWordConverter value={-12345} lang={lang} />
            </div>
            
            <div className="example-item">
              <h3>Large Number</h3>
              <NumberWordConverter value={123456789} lang={lang} />
            </div>
          </div>
        </div>

        {/* Number Examples */}
        <div className="card">
          <h2>📚 Number Examples</h2>
          <p>Common numbers and their word representations:</p>
          <div className="examples">
            {exampleNumbers.map((num) => (
              <div key={num} className="example-item">
                <div className="example-number">{num.toLocaleString()}</div>
                <div className="example-words">
                  {numberToWords(num, activeOptions)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="card">
          <h2>✨ Features</h2>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">🌍</div>
              <h4>Multi-language</h4>
              <p>English and Bangla built in as JSON locale files, with registerLocale() for your own</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🔢</div>
              <h4>Two Numbering Systems</h4>
              <p>Western short scale (thousand, million, billion) and Indian system (hazar, lakh, crore)</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">⚙️</div>
              <h4>Highly Configurable</h4>
              <p>Customizable spacing, separators, and per-language native digit support</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h4>TypeScript Ready</h4>
              <p>Full TypeScript support with comprehensive type definitions</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🧪</div>
              <h4>Well Tested</h4>
              <p>Comprehensive test suite with 100% coverage of edge cases</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">📦</div>
              <h4>Easy Integration</h4>
              <p>Simple React components and hooks for easy integration into any project</p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="card">
          <h2>💻 Usage Examples</h2>
          <div style={{ backgroundColor: '#f7fafc', padding: '20px', borderRadius: '8px', fontFamily: 'monospace' }}>
            <h3>Basic Usage (English is the default):</h3>
            <pre>{`import { NumberWordConverter } from 'react-number-word-converter';

<NumberWordConverter value={12345} />
// Output: twelve thousand three hundred forty-five`}</pre>

            <h3>Choosing a Language:</h3>
            <pre>{`<NumberWordConverter value={12345} lang="bn" />
// Output: বারো হাজার তিন শত পঁয়তাল্লিশ

<NumberWordConverter value={12345} lang="en-GB" />
// Region tags fall back to their base language, so this uses "en"`}</pre>

            <h3>With Custom Options:</h3>
            <pre>{`<NumberWordConverter 
  value={12345} 
  lang="bn"
  options={{ separator: '-' }} 
/>
// Output: বারো হাজার-তিন শত-পঁয়তাল্লিশ`}</pre>

            <h3>Using the Hook:</h3>
            <pre>{`import { useNumberWordConverter } from 'react-number-word-converter';

const { wordText } = useNumberWordConverter(12345, { locale: 'bn' });
// wordText: "বারো হাজার তিন শত পঁয়তাল্লিশ"`}</pre>

            <h3>Adding Your Own Language:</h3>
            <pre>{`import { registerLocale, setDefaultLocale } from 'react-number-word-converter';
import fr from './fr.json';

registerLocale('fr', fr);
setDefaultLocale('fr'); // optional, call once at startup

<NumberWordConverter value={12345} lang="fr" />`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
