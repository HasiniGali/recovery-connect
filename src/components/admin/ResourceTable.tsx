import React from 'react';
import { Resource } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import { Eye, Edit3, CheckCircle2, Archive, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResourceTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onVerify: (resourceId: string) => void;
  onArchive: (resourceId: string) => void;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  onEdit,
  onVerify,
  onArchive
}) => {
  return (
    <div className="bg-white border border-[#EADBCE] rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FFF9F3] border-b border-[#EADBCE] text-[#6F6D76] font-semibold">
              <th className="p-4">Resource</th>
              <th className="p-4">Category</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Verified</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADBCE]/70">
            {resources.map(resource => {
              const formattedCat = resource.category.replace('_', ' ');
              return (
                <tr key={resource.id} className="hover:bg-[#FFF9F3]/60 transition-colors">
                  {/* Name & ID */}
                  <td className="p-4">
                    <Link
                      to={`/resources/${resource.id}`}
                      className="font-serif font-bold text-sm text-[#34343B] hover:text-[#4D396E] hover:underline block"
                    >
                      {resource.name}
                    </Link>
                    <span className="text-[11px] text-[#6F6D76] line-clamp-1 mt-0.5">
                      {resource.phone || resource.website || resource.address}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="capitalize px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FFF9F3] border border-[#EADBCE] text-[#34343B]">
                      {formattedCat}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="p-4">
                    <span className="text-[#34343B] font-medium block">{resource.city}</span>
                    <span className="text-[11px] text-[#6F6D76]">{resource.distanceKm.toFixed(1)} km away</span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <VerificationBadge
                      status={resource.verificationStatus}
                      isSynthetic={resource.isSynthetic}
                      size="sm"
                    />
                  </td>

                  {/* Last Verified */}
                  <td className="p-4 text-[#6F6D76] whitespace-nowrap">
                    <div>{resource.verificationDate}</div>
                    <span className="text-[10px] text-[#6F6D76]/80 truncate block max-w-[120px]">
                      {resource.source}
                    </span>
                  </td>

                  {/* Actions: View, Edit, Verify, Archive */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/resources/${resource.id}`}
                        className="p-1.5 rounded-xl text-[#6F6D76] hover:text-[#34343B] hover:bg-[#FFF9F3] border border-[#EADBCE]"
                        title="View public details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onEdit(resource)}
                        className="p-1.5 rounded-xl text-[#4D396E] hover:bg-[#E7DFF3] border border-[#EADBCE]"
                        title="Edit resource"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {resource.verificationStatus !== 'verified' && (
                        <button
                          type="button"
                          onClick={() => onVerify(resource.id)}
                          className="p-1.5 rounded-xl text-[#2D5A27] bg-[#DCE8DC]/70 hover:bg-[#DCE8DC] border border-[#BCD4BC]"
                          title="Verify resource"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onArchive(resource.id)}
                        className="p-1.5 rounded-xl text-[#8E283E] hover:bg-[#F4DDE2] border border-[#EADBCE]"
                        title="Archive / Remove resource"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
