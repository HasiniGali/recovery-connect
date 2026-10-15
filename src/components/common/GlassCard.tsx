import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tint?: 'none' | 'blue' | 'lavender' | 'blush' | 'sage' | 'peach';
  interactive?: boolean;
  opaque?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  tint = 'none',
  interactive = false,
  opaque = false,
  onClick
}) => {
  const tintClass = {
    none: '',
    blue: 'glass-tint-blue',
    lavender: 'glass-tint-lavender',
    blush: 'glass-tint-blush',
    sage: 'glass-tint-sage',
    peach: 'glass-tint-peach'
  }[tint];

  const baseClass = opaque ? 'glass-card-opaque' : 'glass-card';
  const hoverClass = interactive ? 'glass-card-hover cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClass} ${tintClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};
