import React from 'react';
import { Link } from 'react-router-dom';
import { Resource, PreferenceMatchResult } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import { BookmarkButton } from '../common/BookmarkButton';
import { MatchScore } from './MatchScore';
import { MatchExplanation } from './MatchExplanation';
import {
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Languages,
  Clock,
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ResourceCardProps {
  resource: Resource;
  matchResult?: PreferenceMatchResult;
  showMatchDetails?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  matchResult,
  showMatchDetails = true
}) => {
  // Category styling and pastel badge backgrounds
  const categoryBadgeColors: Record<string, string> = {
    counselling: 'bg-[#DDECF4] text-[#25526C] border-[#BBD7E6]',
    recovery: 'bg-[#E7DFF3] text-[#4D396E] border-[#D4C3EC]',
    crisis: 'bg-[#F6E2D2] text-[#8C4A1E] border-[#E8C4AB]',
    support_group: 'bg-[#F4DDE2] text-[#8E283E] border-[#E2BDC5]',
    campus: 'bg-[#DCE8DC] text-[#2D5A27] border-[#BCD4BC]',
    medical: 'bg-[#DDECF4] text-[#25526C] border-[#BBD7E6]'
  };

  const formattedCategory = resource.category.replace('_', ' ');

  // Google Maps directions helper
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.latitude},${resource.longitude}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#EADBCE] rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Card Header: Badges & Bookmark */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#EADBCE]/60">
          <div className="flex items-center gap-2 flex-wrap">
            <VerificationBadge
              status={resource.verificationStatus}
              isSynthetic={resource.isSynthetic}
              size="sm"
            />
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                categoryBadgeColors[resource.category] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {formattedCategory}
            </span>
          </div>

          <BookmarkButton resourceId={resource.id} size="sm" />
        </div>

        {/* Resource Title & Distance */}
        <div className="mt-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <Link
              to={`/resources/${resource.id}`}
              className="font-serif text-lg sm:text-xl font-bold text-[#34343B] hover:text-[#4D396E] transition-colors leading-snug"
            >
              {resource.name}
            </Link>
          </div>

          <p className="text-xs text-[#6F6D76] mt-1.5 leading-relaxed">
            {resource.shortDescription || resource.description}
          </p>
        </div>

        {/* Key Operational Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-[#34343B]">
          {/* Location & Distance */}
          <div className="flex items-center gap-2 text-[#6F6D76]">
            <MapPin className="w-3.5 h-3.5 text-[#8E283E] shrink-0" />
            <span className="font-semibold text-[#34343B]">📍 {resource.distanceKm.toFixed(1)} km away</span>
            <span className="text-[11px]">· {resource.city}</span>
          </div>

          {/* Cost */}
          <div className="flex items-center gap-2 text-[#6F6D76]">
            <CircleDollarSign className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
            <span className="capitalize font-semibold text-[#34343B]">
              {resource.cost === 'free' ? 'Free Service' : resource.cost.replace('_', ' ')}
            </span>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 text-[#6F6D76]">
            <Languages className="w-3.5 h-3.5 text-[#25526C] shrink-0" />
            <span>Languages: <strong className="text-[#34343B]">{resource.languages.join(' · ')}</strong></span>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 text-[#6F6D76]">
            <Clock className="w-3.5 h-3.5 text-[#8C4A1E] shrink-0" />
            <span className="font-medium text-[#34343B]">{resource.availabilityHours}</span>
          </div>
        </div>

        {/* Verification Source & Date */}
        <div className="mt-3.5 pt-2.5 border-t border-[#EADBCE]/50 flex items-center justify-between text-[11px] text-[#6F6D76]">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B8344] shrink-0" />
            <span className="truncate">Source: <strong className="text-[#34343B]">{resource.source}</strong></span>
          </div>
          <span className="shrink-0">Verified: {resource.verificationDate}</span>
        </div>

        {/* Match Score & Explainable Breakdown (if matching info provided) */}
        {matchResult && showMatchDetails && (
          <div className="mt-4 pt-3 border-t border-[#EADBCE]/70">
            <div className="flex items-center justify-between">
              <MatchScore score={matchResult.score} size="sm" />
            </div>
            <MatchExplanation matchResult={matchResult} />
          </div>
        )}
      </div>

      {/* Action Buttons: View details, Directions, Call, Save */}
      <div className="mt-5 pt-4 border-t border-[#EADBCE]/60 flex items-center justify-between gap-2">
        <Link
          to={`/resources/${resource.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#DDECF4] hover:bg-[#CFE4EE] text-[#25526C] font-semibold text-xs transition-all shadow-2xs"
        >
          <span>View details</span>
        </Link>

        {resource.phone && (
          <a
            href={`tel:${resource.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-[#FFF9F3] text-[#34343B] border border-[#EADBCE] font-medium text-xs transition-all"
            title={`Call ${resource.name}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#4D396E]" />
            <span className="hidden sm:inline">Call</span>
          </a>
        )}

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-[#FFF9F3] text-[#34343B] border border-[#EADBCE] font-medium text-xs transition-all"
          title="Open directions in maps"
        >
          <Navigation className="w-3.5 h-3.5 text-[#8E283E]" />
          <span className="hidden sm:inline">Directions</span>
        </a>
      </div>
    </motion.div>
  );
};
