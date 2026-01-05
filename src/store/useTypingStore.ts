import { create } from 'zustand';
import type { Quote, CharacterData } from '../types';

interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
}

interface TypingState {
  currentQuote: Quote | null;
  userInput: string;
  currentIndex: number;
  characters: CharacterData[];
  isTyping: boolean;
  startTime: number | null;
  completed: boolean;
  stats: TypingStats;

  // Actions
  startTyping: (quote: Quote) => void;
  typeCharacter: (char: string) => void;
  handleBackspace: () => void;
  completeQuote: () => void;
  reset: () => void;
}

const calculateStats = (state: TypingState): TypingStats => {
  const { characters, startTime } = state;

  if (!startTime) {
    return { wpm: 0, accuracy: 0, timeElapsed: 0 };
  }

  const timeElapsed = Date.now() - startTime;
  const minutes = timeElapsed / 60000;

  const correctChars = characters.filter(c => c.state === 'correct').length;
  const totalTyped = characters.filter(c => c.state !== 'untyped').length;

  const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
  const accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 100;

  return { wpm, accuracy, timeElapsed };
};

export const useTypingStore = create<TypingState>((set, get) => ({
  currentQuote: null,
  userInput: '',
  currentIndex: 0,
  characters: [],
  isTyping: false,
  startTime: null,
  completed: false,
  stats: { wpm: 0, accuracy: 0, timeElapsed: 0 },

  startTyping: (quote: Quote) => {
    const characters: CharacterData[] = quote.text.split('').map((char, index) => ({
      char,
      state: 'untyped' as const,
      index,
    }));

    set({
      currentQuote: quote,
      characters,
      userInput: '',
      currentIndex: 0,
      isTyping: false,
      startTime: null,
      completed: false,
      stats: { wpm: 0, accuracy: 0, timeElapsed: 0 },
    });
  },

  typeCharacter: (char: string) => {
    const state = get();

    // Start timer on first keystroke
    if (!state.isTyping) {
      set({ isTyping: true, startTime: Date.now() });
    }

    const { currentQuote, currentIndex, characters } = state;
    if (!currentQuote || currentIndex >= currentQuote.text.length) return;

    const expectedChar = currentQuote.text[currentIndex];
    const isCorrect = char === expectedChar;

    // Update character state
    const updatedCharacters = [...characters];
    updatedCharacters[currentIndex] = {
      ...updatedCharacters[currentIndex],
      state: isCorrect ? 'correct' : 'incorrect',
    };

    const newInput = state.userInput + char;
    const newIndex = currentIndex + 1;

    // Check if quote is completed
    if (newIndex === currentQuote.text.length) {
      const newState = {
        characters: updatedCharacters,
        userInput: newInput,
        currentIndex: newIndex,
        completed: true,
      };
      set({
        ...newState,
        stats: calculateStats({ ...state, ...newState }),
      });
    } else {
      set({
        characters: updatedCharacters,
        userInput: newInput,
        currentIndex: newIndex,
      });
    }
  },

  handleBackspace: () => {
    const state = get();
    if (state.currentIndex === 0) return;

    const newIndex = state.currentIndex - 1;
    const updatedCharacters = [...state.characters];
    updatedCharacters[newIndex] = {
      ...updatedCharacters[newIndex],
      state: 'untyped',
    };

    set({
      characters: updatedCharacters,
      userInput: state.userInput.slice(0, -1),
      currentIndex: newIndex,
    });
  },

  completeQuote: () => {
    set({ completed: true });
  },

  reset: () => {
    set({
      currentQuote: null,
      userInput: '',
      currentIndex: 0,
      characters: [],
      isTyping: false,
      startTime: null,
      completed: false,
      stats: { wpm: 0, accuracy: 0, timeElapsed: 0 },
    });
  },
}));
