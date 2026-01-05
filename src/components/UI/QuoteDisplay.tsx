import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTypingStore } from '../../store/useTypingStore';
import { useStatsStore } from '../../store/useStatsStore';
import { getFilteredQuote } from '../../data/quotes';

/**
 * Quote completion screen and new quote button
 */
const QuoteDisplay: React.FC = () => {
  const {
    completed,
    stats,
    currentQuote,
    startTyping,
    reset,
  } = useTypingStore();
  const {
    recordQuoteCompletion,
    settings,
    bestWpm,
    bestAccuracy,
  } = useStatsStore();

  const handleNextQuote = async () => {
    // Save session if completed
    if (completed && currentQuote) {
      recordQuoteCompletion({
        quoteId: currentQuote.id,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timestamp: Date.now(),
      });
    }

    // Load new quote (async - lazy loads extracted quotes)
    const newQuote = await getFilteredQuote(
      settings.preferredCategories.length > 0 ? settings.preferredCategories : undefined,
      settings.difficulty
    );

    startTyping(newQuote);
  };

  const handleStartOver = () => {
    if (currentQuote) {
      reset();
      startTyping(currentQuote);
    }
  };

  if (completed) {
    const isNewBestWpm = stats.wpm > bestWpm;
    const isNewBestAccuracy = stats.accuracy > bestAccuracy;

    return (
      <div className="text-center animate-scale-in">
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CheckCircle className="h-10 w-10 animate-fade-in" style={{ color: 'var(--color-accent)' }} />
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>
              Passage Complete
            </h2>
          </div>

          <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-3xl shadow-lg border transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.03)', borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)' }}>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-4 rounded-2xl transition-all duration-200" style={{ backgroundColor: isNewBestWpm ? 'rgba(var(--color-primary-rgb), 0.15)' : 'rgba(var(--color-primary-rgb), 0.08)' }}>
                <div className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                  {isNewBestWpm ? 'New Best WPM!' : 'Your WPM'}
                </div>
                <div className={`text-4xl font-bold mb-1`} style={{ color: isNewBestWpm ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                  {stats.wpm}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--color-text)', opacity: 0.5 }}>words per minute</div>
              </div>
              <div className="text-center p-4 rounded-2xl transition-all duration-200" style={{ backgroundColor: isNewBestAccuracy ? 'rgba(var(--color-primary-rgb), 0.15)' : 'rgba(var(--color-primary-rgb), 0.08)' }}>
                <div className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                  {isNewBestAccuracy ? 'New Best Accuracy!' : 'Accuracy'}
                </div>
                <div className={`text-4xl font-bold mb-1`} style={{ color: isNewBestAccuracy ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                  {stats.accuracy.toFixed(1)}%
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--color-text)', opacity: 0.5 }}>precision</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4" style={{ borderColor: 'rgba(var(--color-text-rgb, 30, 41, 59), 0.1)' }}>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--color-accent)' }}>Personal Best WPM</div>
                <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{Math.max(stats.wpm, bestWpm)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--color-accent)' }}>Personal Best Accuracy</div>
                <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {Math.max(stats.accuracy, bestAccuracy).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleNextQuote}
            className="px-10 py-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 text-base"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
          >
            <span>Continue Journey</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={handleStartOver}
            className="px-8 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md text-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-background)', opacity: 0.9 }}
          >
            Retry Passage
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuote) {
    return (
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-primary)' }}>
            Psyche Type
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full mb-6" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
        </div>

        <button
          onClick={handleNextQuote}
          className="group px-12 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3 mx-auto"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
        >
          <span>Begin Typing</span>
          <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div className="mt-12 pt-8 border-t max-w-md mx-auto" style={{ borderColor: 'rgba(var(--color-text-rgb, 30, 41, 59), 0.1)' }}>
          <p className="text-xs uppercase tracking-wider opacity-50 mb-3" style={{ color: 'var(--color-text)' }}>Quick Start</p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <kbd className="px-3 py-2 rounded-lg font-mono" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)', opacity: 0.8 }}>Tab</kbd>
            <span className="opacity-50" style={{ color: 'var(--color-text)' }}>New passage</span>
            <span className="opacity-30">•</span>
            <kbd className="px-3 py-2 rounded-lg font-mono" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)', opacity: 0.8 }}>Esc</kbd>
            <span className="opacity-50" style={{ color: 'var(--color-text)' }}>Reset</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuoteDisplay;
