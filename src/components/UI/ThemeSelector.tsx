import React, { useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { themes } from '../../data/themes';

/**
 * Theme selector with beautiful visual previews
 */
const ThemeSelector: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { currentTheme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
    onClose?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 rounded-xl bg-primary bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 font-medium text-left flex items-center justify-between group"
        aria-label="Change theme"
        style={{ color: 'var(--color-text)' }}
      >
        <span className="flex items-center gap-3">
          <Palette className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
          <span>Theme: {currentTheme.name}</span>
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          />

          {/* Theme grid */}
          <div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto border rounded-2xl shadow-2xl z-50 p-4 animate-scale-in" style={{ backgroundColor: 'var(--color-background)', borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)' }}>
            <h3 className="text-lg font-semibold mb-4 text-text">Select Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-2xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                    currentTheme.id === theme.id
                      ? 'border-accent shadow-lg'
                      : 'border-transparent hover:border-primary hover:border-opacity-30 shadow-sm'
                  }`}
                  style={{
                    backgroundColor: theme.colors.background,
                  }}
                >
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {theme.name}
                  </div>
                  <div
                    className="text-xs opacity-75"
                    style={{ color: theme.colors.text }}
                  >
                    {theme.description}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.textCorrect }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
