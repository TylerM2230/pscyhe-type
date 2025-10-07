import { useEffect } from 'react';

/**
 * Custom hook for global keyboard shortcuts
 */
export const useKeyPress = (
  key: string,
  callback: () => void,
  modifiers?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
  }
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifiersMatch =
        (!modifiers?.ctrl || event.ctrlKey) &&
        (!modifiers?.shift || event.shiftKey) &&
        (!modifiers?.alt || event.altKey) &&
        (!modifiers?.meta || event.metaKey);

      if (event.key === key && modifiersMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, modifiers]);
};
