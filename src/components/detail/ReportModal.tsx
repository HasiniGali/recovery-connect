import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { api } from '../../services/api';
import { ReportItem } from '../../types';
import { ShieldCheck, CheckCircle2, Send, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
  resourceName: string;
  onReportSubmitted?: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  resourceId,
  resourceName,
  onReportSubmitted
}) => {
  const [reason, setReason] = useState<ReportItem['reason']>('phone_incorrect');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportReasons: { id: ReportItem['reason']; label: string }[] = [
    { id: 'phone_incorrect', label: 'Phone number incorrect' },
    { id: 'address_incorrect', label: 'Address incorrect' },
    { id: 'hours_incorrect', label: 'Opening hours incorrect' },
    { id: 'no_longer_exists', label: 'Resource no longer exists' },
    { id: 'other', label: 'Other discrepancy' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a brief note to help the verification team.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedReason = reportReasons.find(r => r.id === reason)?.label || 'Other';
      await api.reportResource({
        resourceId,
        resourceName,
        reason,
        reasonLabel: selectedReason,
        description: description.trim()
      });

      setIsSubmitted(true);
      if (onReportSubmitted) onReportSubmitted();
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setDescription('');
    setReason('phone_incorrect');
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Help keep this resource accurate"
      subtitle={`Submitting feedback for ${resourceName}`}
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#DCE8DC] text-[#2D5A27] flex items-center justify-center border border-[#BCD4BC] shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#34343B]">
              Thank you for keeping support accessible.
            </h4>
            <p className="text-xs text-[#6F6D76] mt-1 max-w-sm mx-auto leading-relaxed">
              Your report has been sent directly to our administrative review queue. A team member will inspect the official records and update the directory.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-full bg-[#34343B] text-white text-xs font-semibold hover:bg-black transition-all shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-[#E7DFF3]/50 border border-[#D4C3EC] rounded-2xl text-xs text-[#4D396E] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              We protect your privacy. You can submit this report completely anonymously without sharing any personal information.
            </span>
          </div>

          {/* Reason Radio / Select */}
          <div>
            <label className="block text-xs font-semibold text-[#34343B] mb-2">
              What seems incorrect or outdated?
            </label>
            <div className="space-y-1.5">
              {reportReasons.map(item => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    reason === item.id
                      ? 'bg-[#FFF9F3] border-[#34343B] text-[#34343B] font-medium shadow-2xs'
                      : 'bg-white border-[#EADBCE] text-[#6F6D76] hover:bg-[#FFF9F3]'
                  }`}
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={item.id}
                    checked={reason === item.id}
                    onChange={() => setReason(item.id)}
                    className="accent-[#34343B] w-3.5 h-3.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="report-desc" className="block text-xs font-semibold text-[#34343B] mb-1">
              Details for verification team:
            </label>
            <textarea
              id="report-desc"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Tried calling on Monday at 3pm, line disconnected. Their new contact may be..."
              className="w-full bg-white border border-[#EADBCE] rounded-2xl p-3 text-xs text-[#34343B] placeholder:text-[#6F6D76]/60 focus:outline-hidden focus:border-[#BBD7E6] focus:ring-2 focus:ring-[#DDECF4]/50"
            />
          </div>

          {error && (
            <div className="p-2.5 bg-[#F4DDE2] border border-[#E2BDC5] rounded-xl text-xs text-[#8E283E] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EADBCE]">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#6F6D76] hover:text-[#34343B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34343B] hover:bg-black text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Report for review'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
