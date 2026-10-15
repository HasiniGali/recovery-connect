import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import { MapPin, Navigation, ArrowRight, Languages, CircleDollarSign } from 'lucide-react';

interface ResourcePreviewProps {
  resource: Resource;
  onClose?: () => void;
}

export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.latitude},${resource.longitude}`;

  return (
    <div className="p-4 bg-white/95 border border-[#EADBCE] rounded-3xl shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-start justify-between gap-2 pb-2">
        <VerificationBadge
          status={resource.verificationStatus}
          isSynthetic={resource.isSynthetic}
          size="sm"
        />
        <span className="text-[11px] font-semibold text-[#8E283E] flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {resource.distanceKm.toFixed(1)} km away
        </span>
      </div>

      <h4 className="font-serif text-base font-bold text-[#34343B] mt-1">
        {resource.name}
      </h4>

      <p className="text-xs text-[#6F6D76] line-clamp-2 mt-1">
        {resource.shortDescription || resource.description}
      </p>

      <div className="flex items-center gap-4 mt-3 text-xs text-[#6F6D76]">
        <div className="flex items-center gap-1">
          <CircleDollarSign className="w-3 h-3 text-[#2D5A27]" />
          <span className="capitalize font-medium text-[#34343B]">
            {resource.cost === 'free' ? 'Free' : resource.cost.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Languages className="w-3 h-3 text-[#25526C]" />
          <span>{resource.languages.join(' · ')}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#EADBCE] flex items-center gap-2">
        <Link
          to={`/resources/${resource.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-[#DDECF4] hover:bg-[#CFE4EE] text-[#25526C] text-xs font-semibold transition-all"
        >
          <span>View full details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-2xl bg-white hover:bg-[#FFF9F3] text-[#34343B] border border-[#EADBCE] text-xs font-medium transition-all"
        >
          <Navigation className="w-3.5 h-3.5 text-[#8E283E]" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
};
