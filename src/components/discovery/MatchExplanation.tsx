import React, { useState } from 'react';
import { ChevronDown, Check, X, HelpCircle } from 'lucide-react';
import { PreferenceMatchResult } from '../../types';

interface MatchExplanationProps {
  matchResult: PreferenceMatchResult;
  defaultExpanded?: boolean;
}

export const MatchExplanation: React.FC<MatchExplanationProps> = ({
  matchResult,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mt-3 border-t border-[#EADBCE]/80 pt-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-xs font-medium text-[#4D396E] hover:text-[#34343B] transition-colors py-1 group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#4D396E] group-hover:scale-110 transition-transform" />
          <span className="font-semibold underline underline-offset-4 decoration-[#D4C3EC]">
            Why this resource?
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#6F6D76]">
          <span>{matchResult.factors.filter(f => f.matches).length} of {matchResult.factors.length} criteria fit</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expandable Explanation Panel */}
      {isExpanded && (
        <div className="mt-2.5 p-3.5 bg-[#FFF9F3]/90 border border-[#EADBCE] rounded-2xl space-y-2.5 text-xs animate-in fade-in duration-200">
          <p className="text-[#34343B] font-medium leading-relaxed">
            {matchResult.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {matchResult.factors.map(factor => (
              <div
                key={factor.id}
                className="flex items-start gap-2 p-2 rounded-xl bg-white/80 border border-[#EADBCE]/60"
              >
                <div
                  className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                    factor.matches
                      ? 'bg-[#DCE8DC] text-[#2D5A27]'
                      : 'bg-[#F4DDE2] text-[#8E283E]'
                  }`}
                >
                  {factor.matches ? (
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  ) : (
                    <X className="w-2.5 h-2.5 stroke-[2.5]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#34343B] text-[11px]">
                      {factor.title}
                    </span>
                    <span className="text-[10px] text-[#6F6D76]">
                      {factor.matches ? 'Match' : 'Partial'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6F6D76] leading-tight mt-0.5 truncate">
                    {factor.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#6F6D76] italic pt-1">
            Preference score reflects filter compatibility only; zero clinical risk calculations.
          </p>
        </div>
      )}
    </div>
  );
};
