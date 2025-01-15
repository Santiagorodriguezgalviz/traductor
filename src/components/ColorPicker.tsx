import React from 'react';
import { ThemeColor } from '../types';

const colors: { value: ThemeColor; class: string }[] = [
  { value: 'blue', class: 'bg-blue-500' },
  { value: 'purple', class: 'bg-purple-500' },
  { value: 'green', class: 'bg-green-500' },
  { value: 'rose', class: 'bg-rose-500' },
  { value: 'amber', class: 'bg-amber-500' },
];

interface Props {
  color: ThemeColor;
  onChange: (color: ThemeColor) => void;
}

export function ColorPicker({ color, onChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {colors.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className={`w-6 h-6 rounded-full ${c.class} ${
            color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          }`}
          aria-label={`Set theme color to ${c.value}`}
        />
      ))}
    </div>
  );
}