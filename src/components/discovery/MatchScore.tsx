import React from 'react';
import { motion } from 'framer-motion';

interface MatchScoreProps {
  score: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg';
}

export const MatchScore: React.FC<MatchScoreProps> = ({ score, size = 'md' }) => {
  // SVG circular dimensions
  const dimensions = {
    sm: { size: 40, strokeWidth: 3.5, text: 'text-xs', labelText: 'text-[9px]' },
    md: { size: 54, strokeWidth: 4.5, text: 'text-sm font-bold', labelText: 'text-[10px]' },
    lg: { size: 72, strokeWidth: 6, text: 'text-lg font-bold', labelText: 'text-xs' }
  }[size];

  const radius = (dimensions.size - dimensions.strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Soft pastel stroke color based on match
  const strokeColor = score >= 85 ? '#4B8344' : score >= 65 ? '#8C4A1E' : '#6F6D76';
  const trackColor = '#EADBCE';

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center" style={{ width: dimensions.size, height: dimensions.size }}>
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
            className="opacity-50"
          />
          {/* Animated score arc */}
          <motion.circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute inset-0 flex items-center justify-center font-serif text-[#34343B]">
          <span className={dimensions.text}>{score}%</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-bold tracking-wider text-[#6F6D76] uppercase font-sans">
          Preference Match
        </span>
        <span className="text-xs text-[#34343B] font-medium">
          {score >= 90 ? 'High alignment' : score >= 75 ? 'Strong match' : 'General relevance'}
        </span>
      </div>
    </div>
  );
};
