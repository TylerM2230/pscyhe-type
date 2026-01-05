import { memo } from 'react';
import type { CharacterData } from '../../types';

interface CharacterProps {
  data: CharacterData;
  isCurrent: boolean;
  isCompleted?: boolean;
}

/**
 * Memoized character component for optimal performance
 * Only re-renders when its state changes
 */
const Character: React.FC<CharacterProps> = memo(({ data, isCurrent, isCompleted = false }) => {
  const getCharacterStyle = () => {
    if (isCurrent) {
      return {
        color: 'var(--color-text)',
        fontWeight: '500'
      };
    }

    switch (data.state) {
      case 'correct':
        return {
          color: 'var(--color-text-correct)',
          opacity: 1
        };
      case 'incorrect':
        return {
          color: 'var(--color-text-incorrect)',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          textDecoration: 'underline',
          textDecorationColor: 'var(--color-text-incorrect)',
          fontWeight: '600',
          borderRadius: '2px'
        };
      case 'untyped':
      default:
        return {
          color: isCompleted ? 'var(--color-text-correct)' : 'var(--color-text-untyped)',
          opacity: isCompleted ? 1 : 0.5
        };
    }
  };

  const getCharacterClass = () => {
    const baseClass = 'inline-block transition-colors duration-75';

    if (isCurrent) {
      return `${baseClass} relative`;
    }

    return baseClass;
  };

  return (
    <span className={getCharacterClass()} style={getCharacterStyle()}>
      {data.char === ' ' ? '\u00A0' : data.char}
      {isCurrent && (
        <span
          className="absolute left-0 top-0 bottom-0 animate-pulse"
          style={{
            backgroundColor: 'var(--color-caret)',
            width: '2px',
            opacity: 0.8
          }}
        />
      )}
    </span>
  );
});

Character.displayName = 'Character';

export default Character;
