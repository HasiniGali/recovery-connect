import React from 'react';
import { Resource } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  History,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileCheck
} from 'lucide-react';

interface VerificationTimelineProps {
  resource: Resource;
  onVerify: (id: string) => void;
  onRequestReview: (id: string) => void;
  onMarkOutdated: (id: string) => void;
}

export const VerificationTimeline: React.FC<VerificationTimelineProps> = ({
  resource,
  onVerify,
  onRequestReview,
  onMarkOutdated
}) => {
  // 5-Stage Verification Pipeline Steps
  const stages = [
    { id: 1, name: 'RESOURCE ADDED', done: true },
    { id: 2, name: 'SOURCE CHECKED', done: true },
    { id: 3, name: 'ADMIN REVIEW', done: resource.verificationStatus !== 'needs_review' },
    { id: 4, name: 'VERIFIED', done: resource.verificationStatus === 'verified' },
    { id: 5, name: 'PUBLISHED', done: resource.verificationStatus === 'verified' }
  ];

  return (
    <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-[#6F6D76] uppercase tracking-wider block">
            Verification Pipeline
          </span>
          <h4 className="font-serif text-lg font-bold text-[#34343B]">
            {resource.name}
          </h4>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onVerify(resource.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCE8DC] text-[#2D5A27] border border-[#BCD4BC] text-xs font-semibold hover:bg-[#CFE0CF] transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verify resource</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestReview(resource.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F6E2D2] text-[#8C4A1E] border border-[#E8C4AB] text-xs font-semibold hover:bg-[#EED4C0] transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Request review</span>
          </button>

          <button
            type="button"
            onClick={() => onMarkOutdated(resource.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4DDE2] text-[#8E283E] border border-[#E2BDC5] text-xs font-semibold hover:bg-[#ECD0D6] transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Mark outdated</span>
          </button>
        </div>
      </div>

      {/* 5-Stage Pipeline Visual */}
      <div className="p-4 bg-[#FFF9F3] border border-[#EADBCE] rounded-2xl">
        <span className="text-[10px] font-bold text-[#6F6D76] tracking-widest uppercase block mb-3">
          Verification Workflow Progression
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`p-2.5 rounded-xl border flex flex-col justify-between text-center transition-all ${
                stage.done
                  ? 'bg-[#DCE8DC]/70 border-[#BCD4BC] text-[#2D5A27]'
                  : 'bg-white/60 border-[#EADBCE] text-[#6F6D76]'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {stage.done ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4B8344]" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-[#6F6D76] flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold tracking-tight">
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification History Log */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#34343B]">
          <History className="w-4 h-4 text-[#6F6D76]" />
          <span>Audit History & Verification Trail</span>
        </div>

        <div className="space-y-3 border-l-2 border-[#EADBCE] ml-2 pl-4">
          {resource.auditHistory && resource.auditHistory.length > 0 ? (
            resource.auditHistory.map(audit => (
              <div key={audit.id} className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#34343B]">{audit.date}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E7DFF3] text-[#4D396E]">
                    {audit.actor}
                  </span>
                  <span className="text-[#6F6D76]">· {audit.action}</span>
                </div>
                <p className="text-[11px] text-[#6F6D76] leading-relaxed">
                  {audit.note}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#6F6D76]">No previous verification events logged.</p>
          )}
        </div>
      </div>
    </div>
  );
};
