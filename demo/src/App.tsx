import React, { useState } from 'react';
import { 
  BanglaNumberConverter, 
  BanglaNumberInput, 
  useBanglaNumberConverter,
  numberToBanglaWords,
  ConverterOptions 
} from '../src';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('12345');
  const [options, setOptions] = useState<ConverterOptions>({
    includeSpaces: true,
    supportBanglaDigits: false,
    outputBanglaDigits: false,
    separator: ' '
  });

  const { banglaText, isLoading, error } = useBanglaNumberConverter(inputValue, options);

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
        <h1>🔢 React Bangla Number Converter</h1>
        <p>
          A powerful React plugin that converts numeric values into Bangla (Bengali) words. 
          Perfect for financial applications, educational tools, and Bengali language interfaces.
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
                id="supportBanglaDigits"
                checked={options.supportBanglaDigits}
                onChange={(e) => handleOptionChange('supportBanglaDigits', e.target.checked)}
              />
              <label htmlFor="supportBanglaDigits">Support Bangla digits (০-৯)</label>
            </div>

            <div className="option-item">
              <input
                type="checkbox"
                id="outputBanglaDigits"
                checked={options.outputBanglaDigits}
                onChange={(e) => handleOptionChange('outputBanglaDigits', e.target.checked)}
              />
              <label htmlFor="outputBanglaDigits">Output Bangla digits</label>
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

          <div className="bangla-result">
            {isLoading ? (
              <span>Converting...</span>
            ) : error ? (
              <span className="error">Error: {error}</span>
            ) : (
              <span>{banglaText || 'Enter a number to see conversion'}</span>
            )}
          </div>
        </div>

        {/* Real-time Input Component */}
        <div className="card">
          <h2>⚡ Real-time Input Component</h2>
          <p>Type numbers and see instant Bangla conversion:</p>
          <BanglaNumberInput
            defaultValue="12345"
            placeholder="Type any number here..."
            options={options}
            showConvertedText={true}
          />
        </div>

        {/* Component Examples */}
        <div className="card">
          <h2>🧩 Component Examples</h2>
          <div className="examples">
            <div className="example-item">
              <h3>Basic Converter</h3>
              <BanglaNumberConverter value={12345} />
            </div>
            
            <div className="example-item">
              <h3>Without Spaces</h3>
              <BanglaNumberConverter 
                value={12345} 
                options={{ includeSpaces: false }} 
              />
            </div>
            
            <div className="example-item">
              <h3>Custom Separator</h3>
              <BanglaNumberConverter 
                value={12345} 
                options={{ separator: '-' }} 
              />
            </div>
            
            <div className="example-item">
              <h3>Decimal Number</h3>
              <BanglaNumberConverter value={123.45} />
            </div>
            
            <div className="example-item">
              <h3>Negative Number</h3>
              <BanglaNumberConverter value={-12345} />
            </div>
            
            <div className="example-item">
              <h3>Large Number</h3>
              <BanglaNumberConverter value={123456789} />
            </div>
          </div>
        </div>

        {/* Number Examples */}
        <div className="card">
          <h2>📚 Number Examples</h2>
          <p>Common numbers and their Bangla word representations:</p>
          <div className="examples">
            {exampleNumbers.map((num) => (
              <div key={num} className="example-item">
                <div className="example-number">{num.toLocaleString()}</div>
                <div className="example-bangla">
                  {numberToBanglaWords(num, options)}
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
              <div className="feature-icon">🔢</div>
              <h4>Complete Number Support</h4>
              <p>Supports numbers from 0 to billions with proper Indian numbering system (thousand, lakh, crore)</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🌐</div>
              <h4>Cross-browser Compatible</h4>
              <p>Works seamlessly across all modern browsers with proper Unicode support</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">⚙️</div>
              <h4>Highly Configurable</h4>
              <p>Customizable spacing, separators, and support for Bangla digits</p>
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
            <h3>Basic Usage:</h3>
            <pre>{`import { BanglaNumberConverter } from 'react-bangla-number-converter';

<BanglaNumberConverter value={12345} />
// Output: বারো হাজার তিন শত পঁয়তাল্লিশ`}</pre>

            <h3>With Custom Options:</h3>
            <pre>{`<BanglaNumberConverter 
  value={12345} 
  options={{ 
    includeSpaces: false,
    separator: '-' 
  }} 
/>
// Output: বারো-হাজার-তিন-শত-পঁয়তাল্লিশ`}</pre>

            <h3>Using the Hook:</h3>
            <pre>{`import { useBanglaNumberConverter } from 'react-bangla-number-converter';

const { banglaText, convert } = useBanglaNumberConverter(12345);
// banglaText: "বারো হাজার তিন শত পঁয়তাল্লিশ"`}</pre>

            <h3>Direct Function Call:</h3>
            <pre>{`import { numberToBanglaWords } from 'react-bangla-number-converter';

const result = numberToBanglaWords(12345);
// result: "বারো হাজার তিন শত পঁয়তাল্লিশ"`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
