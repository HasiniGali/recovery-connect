import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageMeta, LANGUAGES, TRANSLATIONS } from '../i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  simplifiedMode: boolean;
  setSimplifiedMode: (enabled: boolean) => void;
  languages: LanguageMeta[];
  currentMeta: LanguageMeta;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const stored = localStorage.getItem('recovery_connect_lang') as SupportedLanguage;
    if (stored && TRANSLATIONS[stored]) {
      return stored;
    }
    return 'en';
  });

  const [simplifiedMode, setSimplifiedModeState] = useState<boolean>(() => {
    return localStorage.getItem('recovery_connect_simplified') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (simplifiedMode) {
      root.classList.add('easy-read-mode');
    } else {
      root.classList.remove('easy-read-mode');
    }
  }, [simplifiedMode]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('recovery_connect_lang', lang);
  };

  const setSimplifiedMode = (enabled: boolean) => {
    setSimplifiedModeState(enabled);
    localStorage.setItem('recovery_connect_simplified', enabled ? 'true' : 'false');
  };

  const currentMeta = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const t = (key: string): string => {
    const currentDict = TRANSLATIONS[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        simplifiedMode,
        setSimplifiedMode,
        languages: LANGUAGES,
        currentMeta,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
