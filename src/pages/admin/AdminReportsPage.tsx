import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { ReportItem } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ReportTable } from '../../components/admin/ReportTable';
import { Flag, CheckCircle2, Clock } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (e) {
      console.error('Failed to load reports', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    const handleUpdate = () => fetchReports();
    window.addEventListener('recovery_connect_reports_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_reports_updated', handleUpdate);
  }, []);

  const handleResolve = async (reportId: string) => {
    await api.resolveReport(reportId, 'Verified against official registry and updated.');
    fetchReports();
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Community Accuracy Reports"
        subtitle="Review feedback submitted by users regarding phone numbers, operating hours, and locations"
        onRefresh={fetchReports}
      />

      {/* Summary Pills */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6E2D2] text-[#8C4A1E] text-xs font-semibold border border-[#E8C4AB]">
          <Clock className="w-3.5 h-3.5" />
          <span>{pendingCount} Pending Review</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCE8DC] text-[#2D5A27] text-xs font-semibold border border-[#BCD4BC]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{resolvedCount} Resolved</span>
        </span>
      </div>

      {/* Reports Table */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#6F6D76]">
          Loading community reports...
        </div>
      ) : (
        <ReportTable
          reports={reports}
          onResolve={handleResolve}
        />
      )}
    </div>
  );
};
