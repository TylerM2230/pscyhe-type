import type { Theme } from '../types';

/**
 * Carefully crafted theme presets inspired by Jungian concepts
 * Each theme is designed for optimal readability and aesthetic appeal
 */

export const themes: Theme[] = [
  // Light themes
  {
    id: 'analytical',
    name: 'Analytical Mind',
    description: 'Clean Solarized light - precision and clarity',
    colors: {
      primary: '#268bd2',
      secondary: '#2aa198',
      background: '#fdf6e3',
      text: '#586e75',
      textCorrect: '#859900',
      textIncorrect: '#dc322f',
      textUntyped: '#93a1a1',
      caret: '#268bd2',
      accent: '#cb4b16',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'anima',
    name: 'Anima',
    description: 'Catppuccin Latte - soft feminine warmth',
    colors: {
      primary: '#ea76cb',
      secondary: '#8839ef',
      background: '#eff1f5',
      text: '#4c4f69',
      textCorrect: '#40a02b',
      textIncorrect: '#d20f39',
      textUntyped: '#7c7f93',
      caret: '#ea76cb',
      accent: '#fe640b',
    },
    backgroundPattern: 'none',
  },

  // Dark themes
  {
    id: 'shadow',
    name: 'The Shadow',
    description: 'Dracula - vibrant darkness within',
    colors: {
      primary: '#bd93f9',
      secondary: '#ff79c6',
      background: '#282a36',
      text: '#f8f8f2',
      textCorrect: '#50fa7b',
      textIncorrect: '#ff5555',
      textUntyped: '#6272a4',
      caret: '#bd93f9',
      accent: '#ffb86c',
    },
    backgroundPattern: 'dots',
  },
  {
    id: 'collective-unconscious',
    name: 'Collective Unconscious',
    description: 'Nord - arctic depths of shared psyche',
    colors: {
      primary: '#88c0d0',
      secondary: '#81a1c1',
      background: '#2e3440',
      text: '#eceff4',
      textCorrect: '#a3be8c',
      textIncorrect: '#bf616a',
      textUntyped: '#4c566a',
      caret: '#88c0d0',
      accent: '#d08770',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'alchemical',
    name: 'Alchemical Gold',
    description: 'Gruvbox - warm transformation',
    colors: {
      primary: '#d79921',
      secondary: '#fabd2f',
      background: '#282828',
      text: '#ebdbb2',
      textCorrect: '#b8bb26',
      textIncorrect: '#fb4934',
      textUntyped: '#7c6f64',
      caret: '#fe8019',
      accent: '#fe8019',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'dream-state',
    name: 'Dream State',
    description: 'Tokyo Night - ethereal urban twilight',
    colors: {
      primary: '#7aa2f7',
      secondary: '#bb9af7',
      background: '#1a1b26',
      text: '#c0caf5',
      textCorrect: '#9ece6a',
      textIncorrect: '#f7768e',
      textUntyped: '#565f89',
      caret: '#7aa2f7',
      accent: '#ff9e64',
    },
    backgroundPattern: 'gradient',
  },
  {
    id: 'individuation',
    name: 'Individuation',
    description: 'Catppuccin Mocha - cozy journey to self',
    colors: {
      primary: '#89b4fa',
      secondary: '#94e2d5',
      background: '#1e1e2e',
      text: '#cdd6f4',
      textCorrect: '#a6e3a1',
      textIncorrect: '#f38ba8',
      textUntyped: '#585b70',
      caret: '#89b4fa',
      accent: '#f9e2af',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'animus',
    name: 'Animus',
    description: 'Catppuccin Macchiato - gentle masculine strength',
    colors: {
      primary: '#8aadf4',
      secondary: '#7dc4e4',
      background: '#24273a',
      text: '#cad3f5',
      textCorrect: '#a6da95',
      textIncorrect: '#ed8796',
      textUntyped: '#5b6078',
      caret: '#8aadf4',
      accent: '#eed49f',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'mandala',
    name: 'Sacred Mandala',
    description: 'Catppuccin Frappé - balanced center',
    colors: {
      primary: '#8caaee',
      secondary: '#81c8be',
      background: '#303446',
      text: '#c6d0f5',
      textCorrect: '#a6d189',
      textIncorrect: '#e78284',
      textUntyped: '#626880',
      caret: '#8caaee',
      accent: '#ef9f76',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'red-book',
    name: 'The Red Book',
    description: 'Custom dark red - illuminated manuscript',
    colors: {
      primary: '#dc322f',
      secondary: '#cb4b16',
      background: '#1a0000',
      text: '#f4d8c4',
      textCorrect: '#a3be5c',
      textIncorrect: '#ff6b6b',
      textUntyped: '#8a7968',
      caret: '#dc322f',
      accent: '#d4af37',
    },
    backgroundPattern: 'dots',
  },
  {
    id: 'self',
    name: 'The Self',
    description: 'Solarized Dark - unified wholeness',
    colors: {
      primary: '#b58900',
      secondary: '#cb4b16',
      background: '#002b36',
      text: '#839496',
      textCorrect: '#859900',
      textIncorrect: '#dc322f',
      textUntyped: '#586e75',
      caret: '#b58900',
      accent: '#2aa198',
    },
    backgroundPattern: 'none',
  },
  {
    id: 'synchronicity',
    name: 'Synchronicity',
    description: 'Nord Aurora - meaningful connections',
    colors: {
      primary: '#8fbcbb',
      secondary: '#88c0d0',
      background: '#2e3440',
      text: '#d8dee9',
      textCorrect: '#a3be8c',
      textIncorrect: '#bf616a',
      textUntyped: '#4c566a',
      caret: '#8fbcbb',
      accent: '#ebcb8b',
    },
    backgroundPattern: 'particles',
  },
];

export const defaultTheme = themes[0];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};

/**
 * Convert hex color to RGB values
 */
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

/**
 * Apply theme to CSS variables
 */
export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-correct', theme.colors.textCorrect);
  root.style.setProperty('--color-text-incorrect', theme.colors.textIncorrect);
  root.style.setProperty('--color-text-untyped', theme.colors.textUntyped);
  root.style.setProperty('--color-caret', theme.colors.caret);
  root.style.setProperty('--color-accent', theme.colors.accent);

  // Set RGB values for colors that need transparency
  root.style.setProperty('--color-primary-rgb', hexToRgb(theme.colors.primary));
  root.style.setProperty('--color-text-rgb', hexToRgb(theme.colors.text));
};
