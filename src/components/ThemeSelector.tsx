import React from 'react';
import { Palette } from 'lucide-react';
import { ThemeColor } from '../types';

interface Props {
  color: ThemeColor;
  onChange: (color: ThemeColor) => void;
}

export function ThemeSelector({ color, onChange }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const colors: { value: ThemeColor; class: string }[] = [
    { value: 'blue', class: 'bg-blue-500' },
    { value: 'purple', class: 'bg-purple-500' },
    { value: 'green', class: 'bg-green-500' },
    { value: 'rose', class: 'bg-rose-500' },
    { value: 'amber', class: 'bg-amber-500' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Select theme color"
      >
        <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  onChange(c.value);
                  setIsOpen(false);
                }}
                className={`w-6 h-6 rounded-full ${c.class} ${
                  color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                aria-label={`Set theme color to ${c.value}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}