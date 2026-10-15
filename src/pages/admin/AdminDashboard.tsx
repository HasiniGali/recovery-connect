import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { AdminStats, Resource, ReportItem } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminStatCard } from '../../components/admin/AdminStatCard';
import { AddEditResourceModal } from '../../components/admin/AddEditResourceModal';
import {
  FileCheck2,
  AlertTriangle,
  Flag,
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentReports, setRecentReports] = useState<ReportItem[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [s, rep, res] = await Promise.all([
        api.getAdminStats(),
        api.getReports(),
        api.getAdminResources()
      ]);
      setStats(s);
      setRecentReports(rep.slice(0, 4));
      setResources(res);
    } catch (e) {
      console.error('Failed to load admin dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleResUpdate = () => fetchData();
    const handleRepUpdate = () => fetchData();
    window.addEventListener('recovery_connect_resources_updated', handleResUpdate);
    window.addEventListener('recovery_connect_reports_updated', handleRepUpdate);
    return () => {
      window.removeEventListener('recovery_connect_resources_updated', handleResUpdate);
      window.removeEventListener('recovery_connect_reports_updated', handleRepUpdate);
    };
  }, []);

  const handleCreateResource = async (data: any) => {
    await api.addResource(data);
    fetchData();
  };

  const handleQuickResolveReport = async (reportId: string) => {
    await api.resolveReport(reportId, 'Resolved from admin dashboard.');
    fetchData();
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Resource Management"
        subtitle="Operational overview, quality assurance metrics, and community reports"
        onAddResource={() => setAddModalOpen(true)}
        onRefresh={fetchData}
      />

      {/* Top Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total resources"
          value={stats ? stats.totalResources : '...'}
          sublabel="25 verified entries in Vellore"
          icon={FolderKanban}
          variant="blue"
        />
        <AdminStatCard
          label="Verified"
          value={stats ? stats.verifiedResources : '...'}
          sublabel="Accreditation confirmed"
          icon={FileCheck2}
          variant="sage"
        />
        <AdminStatCard
          label="Needs review"
          value={stats ? stats.needsReviewResources : '...'}
          sublabel="Scheduled 90-day check"
          icon={Clock}
          variant="peach"
        />
        <AdminStatCard
          label="Reported"
          value={stats ? stats.reportedResources : '...'}
          sublabel="Community feedback logged"
          icon={Flag}
          variant="blush"
        />
      </div>

      {/* Grid: Pending Community Reports & Verification Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Community Reports */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-[#8E283E]" />
              <h3 className="font-serif text-lg font-bold text-[#34343B]">
                Recent Community Accuracy Reports
              </h3>
            </div>
            <Link
              to="/admin/reports"
              className="text-xs font-semibold text-[#4D396E] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentReports.length === 0 ? (
              <p className="text-xs text-[#6F6D76] py-6 text-center">
                No active community reports.
              </p>
            ) : (
              recentReports.map(rep => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#34343B]">{rep.resourceName}</span>
                      <span className="text-[10px] text-[#6F6D76]">{rep.submittedAt}</span>
                    </div>
                    <p className="text-[#6F6D76] text-[11px]">
                      {rep.reasonLabel}: {rep.description}
                    </p>
                  </div>

                  {rep.status === 'pending' ? (
                    <button
                      type="button"
                      onClick={() => handleQuickResolveReport(rep.id)}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-[#DCE8DC] text-[#2D5A27] font-semibold border border-[#BCD4BC] hover:bg-[#CFE0CF]"
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="shrink-0 text-[11px] text-[#2D5A27] font-medium">
                      ✓ Resolved
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resources Needing Review Preview */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C4A1E]" />
              <h3 className="font-serif text-lg font-bold text-[#34343B]">
                Verification Review Queue
              </h3>
            </div>
            <Link
              to="/admin/verification"
              className="text-xs font-semibold text-[#4D396E] hover:underline flex items-center gap-1"
            >
              <span>Manage Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {resources
              .filter(r => r.verificationStatus !== 'verified')
              .slice(0, 4)
              .map(r => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#34343B]">{r.name}</span>
                    <p className="text-[11px] text-[#6F6D76] mt-0.5">
                      Status: <strong className="capitalize">{r.verificationStatus.replace('_', ' ')}</strong> · {r.verificationNotes}
                    </p>
                  </div>

                  <Link
                    to="/admin/verification"
                    className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#EADBCE] text-[#34343B] font-semibold hover:bg-[#FFF9F3]"
                  >
                    Audit
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      <AddEditResourceModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleCreateResource}
      />
    </div>
  );
};
