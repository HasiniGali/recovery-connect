import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { VerificationStatus } from '../../types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  isSynthetic?: boolean;
  size?: 'sm' | 'md';
  showSyntheticTag?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  isSynthetic = false,
  size = 'md',
  showSyntheticTag = true
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  const statusConfig = {
    verified: {
      label: 'VERIFIED',
      icon: CheckCircle2,
      bg: 'bg-[#DCE8DC]/80 text-[#2D5A27] border-[#BCD4BC]',
      dot: 'bg-[#4B8344]'
    },
    needs_review: {
      label: 'NEEDS REVIEW',
      icon: AlertTriangle,
      bg: 'bg-[#F6E2D2]/80 text-[#8C4A1E] border-[#E8C4AB]',
      dot: 'bg-[#C26B33]'
    },
    reported: {
      label: 'REPORTED',
      icon: AlertCircle,
      bg: 'bg-[#F4DDE2]/80 text-[#8E283E] border-[#E2B7C1]',
      dot: 'bg-[#B83E58]'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      {/* Primary Verification Badge */}
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold border shadow-xs tracking-wide ${config.bg} ${sizeClasses}`}
      >
        <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{config.label}</span>
      </span>

      {/* Safety Notice Badge: Synthetic vs Real */}
      {showSyntheticTag && (
        isSynthetic ? (
          <span
            title="Synthetic demo resource — not for real-world use."
            className={`inline-flex items-center gap-1 rounded-full font-medium border bg-[#E7DFF3]/60 text-[#4D396E] border-[#D4C3EC] tracking-wider uppercase ${sizeClasses}`}
          >
            <Sparkles className="w-2.5 h-2.5 opacity-80" />
            <span>SYNTHETIC DEMO</span>
          </span>
        ) : (
          <span
            title="Verified against official public records"
            className={`inline-flex items-center gap-1 rounded-full font-medium border bg-[#DDECF4]/60 text-[#25526C] border-[#BFDCEB] tracking-wider uppercase ${sizeClasses}`}
          >
            <span>OFFICIAL SOURCE</span>
          </span>
        )
      )}
    </div>
  );
};
