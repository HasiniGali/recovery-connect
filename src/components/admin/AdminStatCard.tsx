import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminStatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  icon: LucideIcon;
  variant?: 'blue' | 'sage' | 'peach' | 'blush' | 'lavender';
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  label,
  value,
  sublabel,
  icon: Icon,
  variant = 'blue'
}) => {
  const variantStyles = {
    blue: {
      bg: 'bg-[#DDECF4]/50',
      border: 'border-[#BBD7E6]',
      text: 'text-[#25526C]',
      badge: 'bg-[#DDECF4] text-[#25526C]'
    },
    sage: {
      bg: 'bg-[#DCE8DC]/50',
      border: 'border-[#BCD4BC]',
      text: 'text-[#2D5A27]',
      badge: 'bg-[#DCE8DC] text-[#2D5A27]'
    },
    peach: {
      bg: 'bg-[#F6E2D2]/50',
      border: 'border-[#E8C4AB]',
      text: 'text-[#8C4A1E]',
      badge: 'bg-[#F6E2D2] text-[#8C4A1E]'
    },
    blush: {
      bg: 'bg-[#F4DDE2]/50',
      border: 'border-[#E2BDC5]',
      text: 'text-[#8E283E]',
      badge: 'bg-[#F4DDE2] text-[#8E283E]'
    },
    lavender: {
      bg: 'bg-[#E7DFF3]/50',
      border: 'border-[#D4C3EC]',
      text: 'text-[#4D396E]',
      badge: 'bg-[#E7DFF3] text-[#4D396E]'
    }
  }[variant];

  return (
    <div className={`p-5 rounded-3xl border bg-white shadow-xs ${variantStyles.border} transition-all hover:shadow-sm`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#6F6D76] uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2 rounded-xl ${variantStyles.badge}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-3xl font-bold text-[#34343B]">
          {value}
        </span>
        <span className="text-[10px] font-bold text-[#6F6D76] tracking-wider uppercase">
          DEMO
        </span>
      </div>

      {sublabel && (
        <p className="text-xs text-[#6F6D76] mt-1 font-medium">
          {sublabel}
        </p>
      )}
    </div>
  );
};
