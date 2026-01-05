import { useEffect, useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import TypingEngine from './components/TypingEngine/TypingEngine';
import QuoteDisplay from './components/UI/QuoteDisplay';
import { useTypingStore } from './store/useTypingStore';
import { useThemeStore } from './store/useThemeStore';
import { useKeyPress } from './hooks/useKeyPress';
import { getFilteredQuote } from './data/quotes';
import { applyTheme } from './data/themes';

/**
 * Main application component
 * Orchestrates the typing game experience
 */
function App() {
  const { currentQuote, completed, startTyping, reset } = useTypingStore();
  const { currentTheme } = useThemeStore();
  const [zenMode, setZenMode] = useState(false);

  // Apply theme on mount and when it changes
  useEffect(() => {
    // Apply theme to ensure CSS variables are set
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Auto-load next quote in zen mode when quote is completed
  useEffect(() => {
    if (zenMode && completed) {
      const timer = setTimeout(async () => {
        const newQuote = await getFilteredQuote();
        startTyping(newQuote);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [zenMode, completed, startTyping]);

  // Keyboard shortcuts
  useKeyPress('Escape', () => {
    if (currentQuote) {
      reset();
    }
  });

  useKeyPress('Tab', async () => {
    const newQuote = await getFilteredQuote();
    startTyping(newQuote);
  });

  return (
    <MainLayout>
      {/* Zen Mode Toggle */}
      {!zenMode && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setZenMode(!zenMode)}
            className="px-6 py-3 rounded-lg font-mono text-sm hover:scale-105 transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)', opacity: 0.95 }}
          >
            Zen Mode
          </button>
        </div>
      )}

      {/* Zen Mode Exit Button */}
      {zenMode && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setZenMode(false)}
            className="px-4 py-2 rounded-md font-mono text-xs hover:scale-105 transition-all shadow-sm hover:shadow-md"
            style={{ backgroundColor: 'var(--color-text-untyped)', color: 'var(--color-background)', opacity: 0.9 }}
          >
            Exit Zen
          </button>
        </div>
      )}

      {/* Main typing area */}
      <div className="max-w-6xl mx-auto">
        <div className={zenMode ? 'mt-24 mb-12' : 'mt-12 mb-12'}>
          {!completed && currentQuote && <TypingEngine />}
          <QuoteDisplay />
        </div>

        {/* Keyboard shortcuts hint - Hidden in Zen Mode */}
        {currentQuote && !completed && !zenMode && (
          <div className="text-center mt-8 text-sm font-mono text-text-untyped">
            <p>Press <kbd className="px-2 py-1 bg-primary bg-opacity-10 rounded">Esc</kbd> to reset</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
