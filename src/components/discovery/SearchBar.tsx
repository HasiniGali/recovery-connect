import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder
}) => {
  const { t } = useLanguage();
  const defaultPlaceholder = t('search.placeholder');

  const demoSuggestions = [
    'I need free Tamil counselling near Vellore that is open today.',
    'Crisis helplines 24/7 in Tamil and English',
    'Campus student support groups near Katpadi',
    'Medical psychiatric OPD in Vellore'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleFormSubmit} className="relative w-full">
        <div className="relative flex items-center bg-white border-2 border-[#EADBCE] focus-within:border-[#BBD7E6] focus-within:ring-4 focus-within:ring-[#DDECF4]/50 rounded-full shadow-sm hover:shadow-md transition-all p-1.5 sm:p-2">
          <div className="pl-3.5 pr-2 text-[#6F6D76]">
            <Search className="w-5 h-5 text-[#4D396E]" />
          </div>

          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder || defaultPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base text-[#34343B] placeholder:text-[#6F6D76]/70 focus:outline-hidden pr-2 font-normal"
            aria-label="Natural language search for recovery support"
          />

          <button
            type="submit"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34343B] hover:bg-black text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-md active:scale-98"
          >
            <span>{t('search.button')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Quick Clickable Query Prompts */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-[#6F6D76]">
        <span className="inline-flex items-center gap-1 font-medium text-[#34343B] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#4D396E]" />
          Try asking:
        </span>
        {demoSuggestions.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              onChange(prompt);
              onSubmit(prompt);
            }}
            className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[#6F6D76] hover:text-[#34343B] border border-[#EADBCE] text-[11px] transition-all hover:border-[#BBD7E6] hover:shadow-2xs text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
