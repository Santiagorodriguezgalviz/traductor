import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeToggle({ theme, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
}