import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSelector from '../UI/ThemeSelector';
import Settings from '../UI/Settings';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main application layout with header and controls
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b" style={{ borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.08)' }}>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
            Psyche Type
          </h1>
          <span className="text-xs md:text-sm font-medium hidden sm:inline opacity-60" style={{ color: 'var(--color-text)' }}>
            Type Through Jung's Insights
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl hover:bg-opacity-10 transition-all duration-200"
            style={{ backgroundColor: menuOpen ? 'var(--color-primary)' : 'transparent', opacity: menuOpen ? 0.1 : 1 }}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6 transition-transform duration-200" style={{ color: 'var(--color-text)', transform: 'rotate(90deg)' }} />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" style={{ color: 'var(--color-text)' }} />
            )}
          </button>
        </div>
      </header>

      {/* Collapsible Menu Dropdown */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 right-4 md:right-6 z-50 w-80 animate-scale-in">
            <div
              className="rounded-2xl shadow-2xl p-4 border"
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.15)'
              }}
            >
              <div className="flex flex-col gap-2">
                <Settings onClose={() => setMenuOpen(false)} />
                <ThemeSelector onClose={() => setMenuOpen(false)} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header */}

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-5 text-center text-sm border-t" style={{ color: 'var(--color-text)', opacity: 0.5, borderColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.08)' }}>
        <p className="font-medium tracking-wide">
          Passages from Carl Jung's Collected Works
        </p>
        <p className="text-xs mt-2 opacity-60">
          Press{' '}
          <kbd className="px-2 py-1 text-xs font-mono rounded-md inline-block mx-1" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)', opacity: 0.8 }}>Tab</kbd>{' '}
          for new passage · <kbd className="px-2 py-1 text-xs font-mono rounded-md inline-block mx-1" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)', opacity: 0.8 }}>Esc</kbd>{' '}
          to reset
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
