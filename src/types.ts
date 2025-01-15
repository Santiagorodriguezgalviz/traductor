export type Theme = 'light' | 'dark';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'rose' | 'amber';

export interface Language {
  code: string;
  name: string;
  nativeName?: string;
}

export interface TranslationHistory {
  id: string;
  from: string;
  to: string;
  original: string;
  translated: string;
  timestamp: number;
}