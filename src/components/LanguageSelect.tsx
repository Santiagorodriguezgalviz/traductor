import React from 'react';
import Select from 'react-select';
import type { Language } from '../types';

const countryCodeMap: { [key: string]: string } = {
  en: 'US',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  it: 'IT',
  pt: 'PT',
  ru: 'RU',
  ja: 'JP',
  ko: 'KR',
  zh: 'CN'
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Language[];
  themeColor: string;
  isDark: boolean;
}

export function LanguageSelect({ value, onChange, options, themeColor, isDark }: Props) {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: isDark ? '#1F2937' : 'white',
      borderColor: state.isFocused 
        ? `var(--${themeColor}-500)` 
        : isDark ? '#374151' : '#E5E7EB',
      borderWidth: '2px',
      borderRadius: '1rem',
      boxShadow: state.isFocused 
        ? `0 0 0 2px var(--${themeColor}-200)` 
        : 'none',
      padding: '2px',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: `var(--${themeColor}-400)`,
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? '#374151'
          : `var(--${themeColor}-50)`
        : isDark
        ? '#1F2937'
        : 'white',
      color: isDark ? 'white' : '#1F2937',
      padding: '10px 12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: isDark ? '#4B5563' : `var(--${themeColor}-100)`,
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1F2937' : 'white',
      borderRadius: '1rem',
      padding: '0.5rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      border: isDark ? '2px solid #374151' : '2px solid #E5E7EB',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: '0.5rem',
      '::-webkit-scrollbar': {
        width: '6px',
        height: '0px',
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: isDark ? '#4B5563' : '#CBD5E1',
        borderRadius: '3px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: isDark ? '#6B7280' : '#94A3B8',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1F2937',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1F2937',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDark ? '#9CA3AF' : '#6B7280',
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: isDark ? '#9CA3AF' : '#6B7280',
      '&:hover': {
        color: isDark ? '#D1D5DB' : '#4B5563',
      },
    }),
  };

  return (
    <Select
      value={options.find(opt => opt.code === value)}
      onChange={(newValue: any) => onChange(newValue.code)}
      options={options}
      styles={customStyles}
      formatOptionLabel={({ code, name, nativeName }: Language) => (
        <div className="flex items-center space-x-3 py-1">
          <img
            src={`https://flagcdn.com/w20/${countryCodeMap[code].toLowerCase()}.png`}
            alt={name}
            className="w-6 h-4 object-cover rounded-sm shadow-sm"
          />
          <span className="font-medium">{nativeName || name}</span>
        </div>
      )}
      className="w-56"
      isSearchable={false}
    />
  );
}