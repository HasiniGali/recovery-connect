import React from 'react';
import { Plus, RotateCcw, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onAddResource?: () => void;
  onRefresh?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onAddResource,
  onRefresh
}) => {
  const handleResetData = async () => {
    if (window.confirm('Reset all demo data and reports back to original initial dataset?')) {
      await api.resetToDefaults();
      if (onRefresh) onRefresh();
    }
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADBCE]">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-serif text-2xl font-bold text-[#34343B]">
            {title}
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7DFF3] text-[#4D396E] border border-[#D4C3EC] tracking-wider uppercase">
            <Sparkles className="w-2.5 h-2.5" />
            DEMO DATA
          </span>
        </div>
        {subtitle && (
          <p className="text-xs text-[#6F6D76] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleResetData}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-[#FFF9F3] text-[#6F6D76] hover:text-[#34343B] border border-[#EADBCE] text-xs font-medium transition-all"
          title="Reset database to fresh demo state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        {onAddResource && (
          <button
            type="button"
            onClick={onAddResource}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#34343B] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all hover:scale-102 active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Resource</span>
          </button>
        )}
      </div>
    </header>
  );
};
