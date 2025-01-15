import React, { useState, useEffect } from 'react';
import { Globe, Copy, RotateCw, ArrowRight, History, X, Zap, Volume2 } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeSelector } from './components/ThemeSelector';
import { LanguageSelect } from './components/LanguageSelect';
import type { Theme, ThemeColor, TranslationHistory, Language } from './types';

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' }
];

async function translateText(text: string, from: string, to: string): Promise<string> {
  if (!text.trim()) return '';
  
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );

    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const data = await response.json();
    if (data.responseStatus === 200 && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }

    throw new Error('Invalid translation response');
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation service is temporarily unavailable. Please try again later.';
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [themeColor, setThemeColor] = useState<ThemeColor>('blue');
  const [sourceLanguage, setSourceLanguage] = useState('es');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Efecto para traducción automática
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (sourceText.trim()) {
        setIsTranslating(true);
        const translated = await translateText(sourceText, sourceLanguage, targetLanguage);
        setTranslatedText(translated);
        setIsTranslating(false);

        // Guardar en el historial solo si la traducción fue exitosa
        if (translated && !translated.includes('error') && !translated.includes('unavailable')) {
          const newHistory: TranslationHistory = {
            id: Date.now().toString(),
            from: sourceLanguage,
            to: targetLanguage,
            original: sourceText,
            translated,
            timestamp: Date.now()
          };
          setHistory(prev => [newHistory, ...prev].slice(0, 10));
        }
      } else {
        setTranslatedText('');
      }
    }, 500); // Esperar 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [sourceText, sourceLanguage, targetLanguage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Globe className={`h-6 w-6 text-${themeColor}-500`} />
            <h1 className={`text-2xl font-bold text-${themeColor}-500 dark:text-${themeColor}-400`}>
              Traductor Automático
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector color={themeColor} onChange={setThemeColor} />
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <LanguageSelect
                value={sourceLanguage}
                onChange={setSourceLanguage}
                options={LANGUAGES}
                themeColor={themeColor}
                isDark={theme === 'dark'}
              />
              <button
                onClick={handleSwapLanguages}
                className={`p-2 rounded-full hover:bg-${themeColor}-100 dark:hover:bg-gray-800 transition-colors`}
                aria-label="Intercambiar idiomas"
              >
                <RotateCw className={`h-5 w-5 text-${themeColor}-500`} />
              </button>
              <LanguageSelect
                value={targetLanguage}
                onChange={setTargetLanguage}
                options={LANGUAGES}
                themeColor={themeColor}
                isDark={theme === 'dark'}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className={`w-full h-48 p-4 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 dark:bg-gray-800 dark:text-white dark:border-gray-700`}
              placeholder="Escribe texto para traducir..."
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => handleCopy(sourceText)}
                className={`p-2 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors`}
                aria-label="Copiar texto original"
              >
                <Copy className={`h-4 w-4 text-${themeColor}-500 dark:text-${themeColor}-400`} />
              </button>
              <button
                onClick={() => setSourceText('')}
                className={`p-2 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors`}
                aria-label="Limpiar texto"
              >
                <X className={`h-4 w-4 text-${themeColor}-500 dark:text-${themeColor}-400`} />
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              className={`w-full h-48 p-4 rounded-lg border-2 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                isTranslating ? 'animate-pulse' : ''
              }`}
              placeholder="La traducción aparecerá aquí automáticamente..."
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => handleCopy(translatedText)}
                className={`p-2 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors`}
                aria-label="Copiar traducción"
              >
                <Copy className={`h-4 w-4 text-${themeColor}-500 dark:text-${themeColor}-400`} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-${themeColor}-100 text-${themeColor}-500 hover:bg-${themeColor}-200 dark:bg-gray-800 dark:text-${themeColor}-400 dark:hover:bg-gray-700 transition-colors`}
          >
            <History className="h-4 w-4" />
            Historial
          </button>
        </div>

        {showHistory && history.length > 0 && (
          <div className={`mt-8 p-4 rounded-lg bg-white dark:bg-gray-800 border border-${themeColor}-200 dark:border-gray-700`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Historial de Traducciones</h2>
              <button
                onClick={handleClearHistory}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Limpiar Historial
              </button>
            </div>
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.from} → {item.to}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.translated)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{item.original}</p>
                  <p className={`mt-2 text-${themeColor}-600 dark:text-${themeColor}-400`}>
                    {item.translated}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;