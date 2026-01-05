/**
 * Core type definitions for the Carl Jung Typing Game
 */

export type QuoteCategory =
  | 'archetypes'
  | 'shadow'
  | 'consciousness'
  | 'dreams'
  | 'individuation'
  | 'psyche'
  | 'collective-unconscious'
  | 'anima-animus'
  | 'self'
  | 'general';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type LanguageStyle =
  | 'cognitive'    // Abstract, theoretical, rational language
  | 'imaginal'     // Image, symbol, vision-based language
  | 'somatic'      // Body, sensation, feeling-based language
  | 'relational';  // Interpersonal, encounter-based language

export type PassageLength = 'short' | 'medium' | 'long';

export interface Quote {
  id: string;
  text: string;
  source: string; // e.g., "Collected Works Vol. 9, Part 1"
  category: QuoteCategory;
  difficulty: DifficultyLevel;
  volume?: number;
  page?: number;
  year?: number;
  languageStyle?: LanguageStyle; // Type of language used
  passageLength?: PassageLength; // Short (50-100), Medium (100-200), Long (200-300)
  imageRichness?: number; // 0-10 score for metaphor/imagery density
  volumeSection?: 'beginning' | 'middle' | 'end'; // Position in volume
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textCorrect: string;
    textIncorrect: string;
    textUntyped: string;
    caret: string;
    accent: string;
  };
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'gradient' | 'particles';
}


export type CharacterState = 'untyped' | 'correct' | 'incorrect';

export interface CharacterData {
  char: string;
  state: CharacterState;
  index: number;
}

export interface TypingState {
  currentQuote: Quote | null;
  userInput: string;
  currentIndex: number;
  characters: CharacterData[];
  isTyping: boolean;
  startTime: number | null;
  errors: number;
  completed: boolean;
}

