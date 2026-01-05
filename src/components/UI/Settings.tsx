import { useState } from 'react';
import { Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import { useStatsStore } from '../../store/useStatsStore';
import type { QuoteCategory } from '../../types';

/**
 * Settings panel for customizing the typing experience
 */
const Settings: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { settings, updateSettings, totalQuotesCompleted, bestWpm, bestAccuracy } =
    useStatsStore();
  const [isOpen, setIsOpen] = useState(false);

  const categories: { value: QuoteCategory; label: string }[] = [
    { value: 'archetypes', label: 'Archetypes' },
    { value: 'shadow', label: 'Shadow' },
    { value: 'consciousness', label: 'Consciousness' },
    { value: 'dreams', label: 'Dreams' },
    { value: 'individuation', label: 'Individuation' },
    { value: 'psyche', label: 'Psyche' },
    { value: 'collective-unconscious', label: 'Collective Unconscious' },
    { value: 'anima-animus', label: 'Anima/Animus' },
    { value: 'self', label: 'The Self' },
    { value: 'general', label: 'General Wisdom' },
  ];

  const toggleCategory = (category: QuoteCategory) => {
    const newCategories = settings.preferredCategories.includes(category)
      ? settings.preferredCategories.filter((c) => c !== category)
      : [...settings.preferredCategories, category];

    updateSettings({ preferredCategories: newCategories });
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 rounded-xl bg-accent bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 font-medium text-left flex items-center justify-between group"
        aria-label="Settings"
        style={{ color: 'var(--color-text)' }}
      >
        <span className="flex items-center gap-3">
          <SettingsIcon className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
          <span>Settings</span>
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          {/* Settings panel */}
          <div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto border rounded-2xl shadow-2xl z-50 p-6 animate-scale-in" style={{ backgroundColor: 'var(--color-background)', borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)' }}>
            <h3 className="text-xl font-bold mb-4 text-text">Settings & Stats</h3>

            {/* Stats Summary */}
            <div className="mb-6 p-4 bg-primary bg-opacity-5 rounded-2xl">
              <h4 className="font-semibold mb-2 text-text">Your Progress</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-text-untyped">Quotes Completed:</span>{' '}
                  <span className="font-semibold text-primary">{totalQuotesCompleted}</span>
                </div>
                <div>
                  <span className="text-text-untyped">Best WPM:</span>{' '}
                  <span className="font-semibold text-primary">{bestWpm}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-text-untyped">Best Accuracy:</span>{' '}
                  <span className="font-semibold text-primary">{bestAccuracy.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-text">
                Difficulty Level
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateSettings({ difficulty: level as any })}
                    className={`flex-1 py-2 rounded-2xl transition-all duration-200 ${
                      settings.difficulty === level
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-primary bg-opacity-10 text-primary hover:bg-opacity-20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-text">
                Preferred Categories
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <label
                    key={cat.value}
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary hover:bg-opacity-5 p-2 rounded-xl transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={settings.preferredCategories.includes(cat.value)}
                      onChange={() => toggleCategory(cat.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text">{cat.label}</span>
                  </label>
                ))}
              </div>
              {settings.preferredCategories.length === 0 && (
                <p className="text-xs text-text-untyped mt-2">
                  No categories selected - all quotes will be shown
                </p>
              )}
            </div>

            {/* Sound Toggle */}
            <div className="mb-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-semibold text-text">Sound Effects</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
