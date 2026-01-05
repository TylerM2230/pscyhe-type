import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../types';
import { themes, defaultTheme, applyTheme } from '../data/themes';

interface ThemeState {
  currentTheme: Theme;
  customTheme: Theme | null;
  setTheme: (themeId: string) => void;
  setCustomTheme: (theme: Theme) => void;
  updateThemeColors: (colors: Partial<Theme['colors']>) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: defaultTheme,
      customTheme: null,

      setTheme: (themeId: string) => {
        const theme = themes.find((t) => t.id === themeId) || defaultTheme;
        applyTheme(theme);
        set({ currentTheme: theme });
      },

      setCustomTheme: (theme: Theme) => {
        applyTheme(theme);
        set({ customTheme: theme, currentTheme: theme });
      },

      updateThemeColors: (colors: Partial<Theme['colors']>) => {
        const { currentTheme } = get();
        const updatedTheme: Theme = {
          ...currentTheme,
          colors: { ...currentTheme.colors, ...colors },
        };
        applyTheme(updatedTheme);
        set({ currentTheme: updatedTheme, customTheme: updatedTheme });
      },
    }),
    {
      name: 'jung-typing-theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme on app load
        if (state) {
          applyTheme(state.currentTheme);
        }
      },
    }
  )
);
