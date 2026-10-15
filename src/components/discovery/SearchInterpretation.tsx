import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PreferenceExtraction } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  CheckCircle2,
  Tag,
  MapPin,
  Clock,
  Languages,
  BadgePercent,
  Sparkles,
  Info
} from 'lucide-react';

interface SearchInterpretationProps {
  extraction: PreferenceExtraction;
  matchedCount: number;
  onClear?: () => void;
}

export const SearchInterpretation: React.FC<SearchInterpretationProps> = ({
  extraction,
  matchedCount,
  onClear
}) => {
  const { t } = useLanguage();

  if (extraction.tokens.length === 0) return null;

  // Custom pastel styling for each extracted preference type
  const pillStyle = (type: string) => {
    switch (type) {
      case 'category':
        return 'bg-[#DDECF4] text-[#25526C] border-[#BBD7E6]';
      case 'cost':
        return 'bg-[#E7DFF3] text-[#4D396E] border-[#D4C3EC]';
      case 'language':
        return 'bg-[#DCE8DC] text-[#2D5A27] border-[#BCD4BC]';
      case 'location':
        return 'bg-[#F4DDE2] text-[#8E283E] border-[#E2BDC5]';
      case 'availability':
        return 'bg-[#F6E2D2] text-[#8C4A1E] border-[#E8C4AB]';
      default:
        return 'bg-white text-[#34343B] border-[#EADBCE]';
    }
  };

  const getPillIcon = (type: string) => {
    switch (type) {
      case 'category':
        return <Tag className="w-3 h-3" />;
      case 'cost':
        return <BadgePercent className="w-3 h-3" />;
      case 'language':
        return <Languages className="w-3 h-3" />;
      case 'location':
        return <MapPin className="w-3 h-3" />;
      case 'availability':
        return <Clock className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="p-4 sm:p-5 bg-white/95 border-2 border-[#EADBCE] rounded-3xl shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EADBCE]/70">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4B8344] animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
            {t('search.understood')}:
          </span>
        </div>

        {/* Matched Count Announcement */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE8DC]/80 text-[#2D5A27] border border-[#BCD4BC]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{matchedCount} {t('search.results_found')}</span>
          </span>

          {onClear && (
            <button
              onClick={onClear}
              className="text-[11px] text-[#6F6D76] hover:text-[#34343B] underline underline-offset-2 ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Extracted Preference Pills */}
      <div className="flex items-center gap-2 flex-wrap pt-3">
        <AnimatePresence mode="popLayout">
          {extraction.tokens.map((token, index) => (
            <motion.span
              key={`${token.type}-${token.value}-${index}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shadow-2xs ${pillStyle(
                token.type
              )}`}
            >
              {getPillIcon(token.type)}
              <span className="font-semibold">{token.label}</span>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Safety Notice Banner */}
      <div className="mt-3 pt-2.5 flex items-center gap-1.5 text-[11px] text-[#6F6D76]">
        <Info className="w-3.5 h-3.5 text-[#4D396E] shrink-0" />
        <span>
          Preference extraction only — matches based on availability, location, and language criteria, not medical assessment.
        </span>
      </div>
    </motion.div>
  );
};
