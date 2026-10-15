import React from 'react';
import { FilterState, ResourceCategory } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Heart,
  ShieldAlert,
  Users,
  GraduationCap,
  Activity,
  Sparkles,
  CheckCircle2,
  XCircle,
  SlidersHorizontal
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  totalCount
}) => {
  const { t } = useLanguage();

  const categories: { id: ResourceCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: t('actions.all'), icon: Sparkles },
    { id: 'counselling', label: t('categories.counselling'), icon: Heart },
    { id: 'recovery', label: t('categories.recovery'), icon: Activity },
    { id: 'crisis', label: t('categories.crisis'), icon: ShieldAlert },
    { id: 'support_group', label: t('categories.support_group'), icon: Users },
    { id: 'campus', label: t('categories.campus'), icon: GraduationCap },
    { id: 'medical', label: t('categories.medical'), icon: Activity }
  ];

  const handleCategorySelect = (catId: ResourceCategory | 'all') => {
    onChange({ ...filters, category: catId });
  };

  const handleCostChange = (cost: string) => {
    onChange({ ...filters, cost });
  };

  const handleLanguageChange = (language: string) => {
    onChange({ ...filters, language });
  };

  const handleAvailabilityChange = (availability: string) => {
    onChange({ ...filters, availability });
  };

  const handleVerifiedToggle = () => {
    onChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
  };

  const handleDistanceChange = (distance: number) => {
    onChange({ ...filters, maxDistance: distance });
  };

  const handleResetFilters = () => {
    onChange({
      category: 'all',
      cost: 'all',
      language: 'all',
      maxDistance: 15,
      availability: 'all',
      verifiedOnly: false,
      search: ''
    });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.cost !== 'all' ||
    filters.language !== 'all' ||
    filters.availability !== 'all' ||
    filters.verifiedOnly ||
    filters.maxDistance < 15;

  return (
    <div className="space-y-4">
      {/* Category Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#34343B] text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-[#FFF9F3] text-[#6F6D76] hover:text-[#34343B] border border-[#EADBCE]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#4D396E]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Row */}
      <div className="p-3.5 bg-white/90 border border-[#EADBCE] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Cost Selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="cost-select" className="text-[#6F6D76] font-medium">Cost:</label>
            <select
              id="cost-select"
              value={filters.cost}
              onChange={e => handleCostChange(e.target.value)}
              className="bg-[#FFF9F3] border border-[#EADBCE] rounded-xl px-2.5 py-1 text-xs text-[#34343B] focus:outline-hidden"
            >
              <option value="all">All Costs</option>
              <option value="free">Free Only</option>
              <option value="sliding_scale">Sliding Scale / Subsidized</option>
              <option value="low_cost">Low Cost</option>
              <option value="paid">Standard Paid</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="lang-select" className="text-[#6F6D76] font-medium">Language:</label>
            <select
              id="lang-select"
              value={filters.language}
              onChange={e => handleLanguageChange(e.target.value)}
              className="bg-[#FFF9F3] border border-[#EADBCE] rounded-xl px-2.5 py-1 text-xs text-[#34343B] focus:outline-hidden"
            >
              <option value="all">All Languages</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
            </select>
          </div>

          {/* Availability Selector */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="avail-select" className="text-[#6F6D76] font-medium">Hours:</label>
            <select
              id="avail-select"
              value={filters.availability}
              onChange={e => handleAvailabilityChange(e.target.value)}
              className="bg-[#FFF9F3] border border-[#EADBCE] rounded-xl px-2.5 py-1 text-xs text-[#34343B] focus:outline-hidden"
            >
              <option value="all">Any Availability</option>
              <option value="open_today">Open Today</option>
              <option value="24_7">24/7 Available</option>
              <option value="weekdays">Weekdays</option>
            </select>
          </div>

          {/* Distance Slider / Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-1 border-l border-[#EADBCE]">
            <span className="text-[#6F6D76]">Distance:</span>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={filters.maxDistance}
              onChange={e => handleDistanceChange(parseFloat(e.target.value))}
              className="w-20 accent-[#34343B]"
              aria-label="Filter by maximum distance"
            />
            <span className="text-[11px] font-semibold text-[#34343B]">{filters.maxDistance} km</span>
          </div>

          {/* Verified Only Pill */}
          <button
            type="button"
            onClick={handleVerifiedToggle}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border transition-all ${
              filters.verifiedOnly
                ? 'bg-[#DCE8DC] text-[#2D5A27] border-[#BCD4BC] font-semibold'
                : 'bg-[#FFF9F3] text-[#6F6D76] border-[#EADBCE] hover:text-[#34343B]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified only</span>
          </button>
        </div>

        {/* Total count & Reset action */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-[#6F6D76]">
            Showing <strong className="text-[#34343B]">{totalCount}</strong> results
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#8E283E] hover:underline"
            >
              <XCircle className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
