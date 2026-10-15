import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Resource } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { VerificationTimeline } from '../../components/admin/VerificationTimeline';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const AdminVerificationPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminResources();
      setResources(data);
      if (data.length > 0 && !selectedId) {
        // Default to a resource needing review if available, else first
        const reviewItem = data.find(r => r.verificationStatus !== 'verified');
        setSelectedId(reviewItem ? reviewItem.id : data[0].id);
      }
    } catch (e) {
      console.error('Failed to load verification resources', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();

    const handleUpdate = () => fetchResources();
    window.addEventListener('recovery_connect_resources_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_resources_updated', handleUpdate);
  }, []);

  const handleVerify = async (id: string) => {
    await api.verifyResource(id, 'Accreditation verified by administrator.');
    fetchResources();
  };

  const handleRequestReview = async (id: string) => {
    await api.updateVerificationStatus(id, 'needs_review', 'Review requested: re-check operating phone lines.');
    fetchResources();
  };

  const handleMarkOutdated = async (id: string) => {
    await api.updateVerificationStatus(id, 'reported', 'Marked outdated: venue or timings unconfirmed.');
    fetchResources();
  };

  const selectedResource = resources.find(r => r.id === selectedId) || resources[0];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Verification Workflow & Audit Trail"
        subtitle="5-stage verification pipeline, accreditation records, and audit log inspection"
        onRefresh={fetchResources}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Resource Picker */}
        <div className="lg:col-span-4 bg-white border border-[#EADBCE] rounded-3xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]">
            <span className="text-xs font-bold text-[#34343B] uppercase tracking-wider">
              Verification Queue ({resources.length})
            </span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {resources.map(r => {
              const isSelected = r.id === selectedResource?.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFF9F3] border-[#34343B] shadow-xs'
                      : 'bg-white hover:bg-[#FFF9F3]/60 border-[#EADBCE]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 pb-1">
                    <VerificationBadge
                      status={r.verificationStatus}
                      isSynthetic={r.isSynthetic}
                      size="sm"
                      showSyntheticTag={false}
                    />
                    <span className="text-[10px] text-[#6F6D76]">{r.city}</span>
                  </div>

                  <h4 className="font-serif font-bold text-xs text-[#34343B]">
                    {r.name}
                  </h4>

                  <span className="text-[10px] text-[#6F6D76] block mt-0.5">
                    Source: {r.source.slice(0, 28)}...
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Verification Pipeline & Audit Timeline */}
        <div className="lg:col-span-8">
          {selectedResource ? (
            <VerificationTimeline
              resource={selectedResource}
              onVerify={handleVerify}
              onRequestReview={handleRequestReview}
              onMarkOutdated={handleMarkOutdated}
            />
          ) : (
            <div className="p-12 text-center text-xs text-[#6F6D76] bg-white rounded-3xl border border-[#EADBCE]">
              Select a resource to audit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
