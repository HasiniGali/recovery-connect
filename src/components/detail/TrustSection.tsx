import React from 'react';
import { Resource } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  ShieldCheck,
  Calendar,
  ExternalLink,
  History,
  Flag,
  FileCheck
} from 'lucide-react';

interface TrustSectionProps {
  resource: Resource;
  onOpenReport: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  resource,
  onOpenReport
}) => {
  return (
    <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-6">
      {/* Header with Verification Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADBCE]">
        <div>
          <span className="text-[11px] font-bold text-[#6F6D76] uppercase tracking-wider block mb-1">
            Trust & Verification Layer
          </span>
          <div className="flex items-center gap-2">
            <VerificationBadge
              status={resource.verificationStatus}
              isSynthetic={resource.isSynthetic}
              size="md"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FFF9F3] hover:bg-[#F4DDE2]/60 text-[#8E283E] border border-[#EADBCE] hover:border-[#E2BDC5] text-xs font-semibold transition-all"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report incorrect information</span>
        </button>
      </div>

      {/* Source Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#34343B]">
        <div className="p-3.5 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE]/80 space-y-1">
          <span className="text-[11px] font-semibold text-[#6F6D76] block">
            Verified Source:
          </span>
          <p className="font-medium text-[#34343B] flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#4B8344]" />
            <span>{resource.source}</span>
          </p>
          {resource.sourceUrl && (
            <a
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#4D396E] hover:underline pt-1"
            >
              <span>View source documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE]/80 space-y-1">
          <span className="text-[11px] font-semibold text-[#6F6D76] block">
            Verification Timeline:
          </span>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#6F6D76]">Last verified:</span>
            <strong className="text-[#34343B]">{resource.verificationDate}</strong>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6F6D76]">Last database sync:</span>
            <span className="text-[#34343B]">{resource.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Verification Notes */}
      {resource.verificationNotes && (
        <div className="p-3.5 rounded-2xl bg-[#DCE8DC]/40 border border-[#BCD4BC] text-xs text-[#2D5A27]">
          <span className="font-semibold block mb-0.5">Verification Assessor Notes:</span>
          <p>{resource.verificationNotes}</p>
        </div>
      )}

      {/* Audit History Timeline */}
      {resource.auditHistory && resource.auditHistory.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#34343B]">
            <History className="w-4 h-4 text-[#6F6D76]" />
            <span>Verification Audit Log</span>
          </div>

          <div className="space-y-2 border-l-2 border-[#EADBCE] ml-2 pl-3">
            {resource.auditHistory.map(audit => (
              <div key={audit.id} className="text-xs space-y-0.5 relative">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#34343B]">{audit.action}</span>
                  <span className="text-[10px] text-[#6F6D76]">by {audit.actor}</span>
                  <span className="text-[10px] text-[#6F6D76]">· {audit.date}</span>
                </div>
                <p className="text-[11px] text-[#6F6D76] leading-relaxed">
                  {audit.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice on Data */}
      <div className="p-3 rounded-2xl bg-[#E7DFF3]/30 border border-[#D4C3EC] text-[11px] text-[#4D396E]">
        <strong>Data Integrity Protocol:</strong> {resource.disclaimer}
      </div>
    </div>
  );
};
