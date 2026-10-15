import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'default';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base tracking-wider',
    md: 'text-lg tracking-widest',
    lg: 'text-2xl tracking-widest'
  };

  return (
    <Link to="/" className={`group flex items-center gap-3 no-underline select-none ${className}`}>
      {/* Brand Motif: Interconnected Nodes & Botanical Petal */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Circular soft halo */}
          <circle cx="24" cy="24" r="22" fill="#FFF9F3" stroke="#DCE8DC" strokeWidth="1.5" />
          
          {/* Gentle connecting paths (Resource -> Connection -> Support) */}
          <path
            d="M13 30 C 18 18, 22 16, 26 24 C 29 29, 33 27, 35 18"
            stroke="#6F6D76"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M17 34 C 22 30, 26 33, 29 25 C 32 20, 35 15, 37 15"
            stroke="#DDECF4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Organic botanical leaf motif */}
          <path
            d="M26 13 C 23 8, 30 6, 32 10 C 33 12, 30 15, 26 13 Z"
            fill="#DCE8DC"
            stroke="#34343B"
            strokeWidth="1.2"
          />

          {/* Connection Nodes */}
          {/* Node 1: Resource (Pastel Blue) */}
          <circle cx="13" cy="30" r="4.5" fill="#DDECF4" stroke="#34343B" strokeWidth="1.8" />
          {/* Node 2: Connection (Pastel Lavender) */}
          <circle cx="26" cy="24" r="4.8" fill="#E7DFF3" stroke="#34343B" strokeWidth="1.8" />
          {/* Node 3: Support (Blush) */}
          <circle cx="35" cy="18" r="4.5" fill="#F4DDE2" stroke="#34343B" strokeWidth="1.8" />

          {/* Center heart of connection */}
          <circle cx="26" cy="24" r="1.6" fill="#34343B" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className={`font-serif font-bold text-[#34343B] ${textSizes[size]} transition-colors group-hover:text-black`}>
          RECOVERY CONNECT
        </span>
        {showTagline && (
          <span className="text-[11px] font-sans text-[#6F6D76] font-medium tracking-tight -mt-0.5">
            Finding the right support, when you need it.
          </span>
        )}
      </div>
    </Link>
  );
};
