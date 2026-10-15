import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check, BookOpen } from 'lucide-react';
import { SupportedLanguage } from '../../i18n';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, languages, currentMeta, simplifiedMode, setSimplifiedMode } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {/* Glassmorphic Language Selector Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card hover:glass-card-hover text-xs font-semibold text-[#34343B] transition-all shadow-xs"
          aria-label="Select Interface Language"
          aria-expanded={isOpen}
        >
          <Globe className="w-3.5 h-3.5 text-[#4D396E]" />
          <span className="tracking-wide">{currentMeta.nativeName}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#6F6D76] transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* Glass Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 p-2 glass-card-opaque rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/80"
            role="menu"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#6F6D76] uppercase tracking-wider border-b border-[#EADBCE]/60 mb-1">
              Select Language / மொழியைத் தேர்வுசெய்க
            </div>
            <div className="max-h-64 overflow-y-auto space-y-0.5">
              {languages.map(lang => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                      isSelected
                        ? 'bg-[#E7DFF3]/80 text-[#34343B] font-bold'
                        : 'text-[#6F6D76] hover:text-[#34343B] hover:bg-white/70'
                    }`}
                    role="menuitem"
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-serif text-sm font-semibold text-[#34343B]">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-[#6F6D76]">
                        {lang.name}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#4D396E] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Easy Read / Simplified Mode Toggle */}
      {!compact && (
        <button
          type="button"
          onClick={() => setSimplifiedMode(!simplifiedMode)}
          title={simplifiedMode ? 'Easy Read mode active' : 'Turn on Easy Read mode for simpler wording'}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
            simplifiedMode
              ? 'bg-[#DCE8DC] text-[#2D5A27] border border-[#BCD4BC]'
              : 'glass-card text-[#6F6D76] hover:text-[#34343B]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Easy Read</span>
        </button>
      )}
    </div>
  );
};
