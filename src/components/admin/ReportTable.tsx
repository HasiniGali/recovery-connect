import React from 'react';
import { ReportItem } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReportTableProps {
  reports: ReportItem[];
  onResolve: (reportId: string) => void;
  onSelectResource?: (resourceId: string) => void;
}

export const ReportTable: React.FC<ReportTableProps> = ({
  reports,
  onResolve
}) => {
  return (
    <div className="bg-white border border-[#EADBCE] rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FFF9F3] border-b border-[#EADBCE] text-[#6F6D76] font-semibold">
              <th className="p-4">Reported Resource</th>
              <th className="p-4">Issue / Reason</th>
              <th className="p-4">User Notes</th>
              <th className="p-4">Reported At</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADBCE]/70">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[#6F6D76]">
                  No reports in queue. Directory accuracy is up to date!
                </td>
              </tr>
            ) : (
              reports.map(report => {
                const isPending = report.status === 'pending';
                return (
                  <tr
                    key={report.id}
                    className={`hover:bg-[#FFF9F3]/60 transition-colors ${
                      isPending ? 'bg-white' : 'bg-gray-50/50 opacity-80'
                    }`}
                  >
                    {/* Resource Name */}
                    <td className="p-4">
                      <Link
                        to={`/resources/${report.resourceId}`}
                        className="font-serif font-bold text-sm text-[#34343B] hover:text-[#4D396E] hover:underline flex items-center gap-1.5"
                      >
                        <span>{report.resourceName}</span>
                        <ExternalLink className="w-3 h-3 text-[#6F6D76]" />
                      </Link>
                      <span className="text-[10px] text-[#6F6D76]">ID: {report.resourceId}</span>
                    </td>

                    {/* Reason */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F4DDE2] text-[#8E283E] border border-[#E2BDC5]">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{report.reasonLabel}</span>
                      </span>
                    </td>

                    {/* Description */}
                    <td className="p-4 max-w-xs text-[#6F6D76] leading-relaxed">
                      {report.description}
                      {report.resolutionNotes && (
                        <div className="mt-1 text-[11px] text-[#2D5A27] bg-[#DCE8DC]/50 p-1.5 rounded-lg border border-[#BCD4BC]">
                          <strong>Resolution:</strong> {report.resolutionNotes} ({report.resolvedAt})
                        </div>
                      )}
                    </td>

                    {/* Timestamp */}
                    <td className="p-4 text-[#6F6D76] whitespace-nowrap">
                      {report.submittedAt}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F6E2D2] text-[#8C4A1E] border border-[#E8C4AB]">
                          <Clock className="w-3 h-3" />
                          <span>Pending Review</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCE8DC] text-[#2D5A27] border border-[#BCD4BC]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Resolved</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onResolve(report.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#DCE8DC] hover:bg-[#CFE0CF] text-[#2D5A27] font-semibold border border-[#BCD4BC] transition-all"
                            title="Mark issue verified and resolved"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Resolve</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#6F6D76]">
                          Completed {report.resolvedAt}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
