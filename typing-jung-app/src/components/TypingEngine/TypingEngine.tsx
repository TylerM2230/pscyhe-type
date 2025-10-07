import React, { useEffect, useCallback, useRef } from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import Character from './Character';

/**
 * Ultra-responsive typing engine with <16ms input latency
 * Uses direct event listeners and optimized rendering
 */
const TypingEngine: React.FC = () => {
  const {
    characters,
    currentIndex,
    typeCharacter,
    handleBackspace,
    currentQuote,
    completed,
  } = useTypingStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent default for typing keys
      if (
        e.key.length === 1 ||
        e.key === 'Backspace' ||
        e.key === 'Enter' ||
        e.key === 'Tab'
      ) {
        e.preventDefault();
      }

      // Handle backspace
      if (e.key === 'Backspace') {
        handleBackspace();
        return;
      }

      // Only process single character inputs
      if (e.key.length !== 1) {
        return;
      }

      // Ignore keyboard shortcuts
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      typeCharacter(e.key);
    },
    [typeCharacter, handleBackspace]
  );

  useEffect(() => {
    // Attach keyboard listener directly to window for lowest latency
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Focus management
  useEffect(() => {
    if (containerRef.current && currentQuote) {
      containerRef.current.focus();
    }
  }, [currentQuote]);

  if (!currentQuote) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="typing-engine focus:outline-none"
      tabIndex={0}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Elegant typing area with subtle background */}
        <div
          className="relative p-8 md:p-12 rounded-3xl transition-all duration-300"
          style={{
            backgroundColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.05)'
          }}
        >
          <div
            className="text-xl md:text-2xl leading-loose no-select text-left"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 'var(--font-size, 24px)',
              lineHeight: 'var(--line-height, 2.2)',
              letterSpacing: '0.03em',
              color: 'var(--color-text)'
            }}
          >
            {characters.map((charData, index) => (
              <Character
                key={`${charData.index}-${charData.char}`}
                data={charData}
                isCurrent={index === currentIndex}
                isCompleted={completed}
              />
            ))}
          </div>
        </div>

        {/* Quote metadata - refined */}
        <div className="mt-8 text-sm opacity-60 text-center space-y-2" style={{ color: 'var(--color-text)' }}>
          <p className="italic font-serif text-base">— {currentQuote.source}</p>
          <div className="flex items-center justify-center gap-4 text-xs tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {currentQuote.category.replace('-', ' ')}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill={i < currentQuote.difficulty ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingEngine;
