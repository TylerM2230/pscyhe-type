import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuoteCategory, DifficultyLevel } from '../types';

export interface UserSettings {
  difficulty: DifficultyLevel;
  preferredCategories: QuoteCategory[];
  soundEnabled: boolean;
}

export interface QuoteStats {
  wpm: number;
  accuracy: number;
  timestamp: number;
  quoteId: string;
}

interface StatsState {
  settings: UserSettings;
  totalQuotesCompleted: number;
  bestWpm: number;
  bestAccuracy: number;
  recentStats: QuoteStats[];
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  recordQuoteCompletion: (stats: QuoteStats) => void;
  resetStats: () => void;
}

const defaultSettings: UserSettings = {
  difficulty: 3,
  preferredCategories: [],
  soundEnabled: true,
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      totalQuotesCompleted: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      recentStats: [],

      updateSettings: (newSettings: Partial<UserSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      recordQuoteCompletion: (stats: QuoteStats) => {
        set((state) => ({
          totalQuotesCompleted: state.totalQuotesCompleted + 1,
          bestWpm: Math.max(state.bestWpm, stats.wpm),
          bestAccuracy: Math.max(state.bestAccuracy, stats.accuracy),
          recentStats: [stats, ...state.recentStats].slice(0, 50), // Keep last 50
        }));
      },

      resetStats: () => {
        set({
          totalQuotesCompleted: 0,
          bestWpm: 0,
          bestAccuracy: 0,
          recentStats: [],
        });
      },
    }),
    {
      name: 'jung-typing-stats',
    }
  )
);
