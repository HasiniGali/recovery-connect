import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Resource } from '../types';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { TrustSection } from '../components/detail/TrustSection';
import { ReportModal } from '../components/detail/ReportModal';
import {
  MapPin,
  Phone,
  Globe,
  Navigation,
  Clock,
  CircleDollarSign,
  Languages,
  CheckCircle2,
  Calendar,
  Accessibility,
  ArrowLeft,
  Share2,
  AlertTriangle
} from 'lucide-react';

export const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  const fetchResource = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await api.getResourceById(id);
      setResource(data);
    } catch (e) {
      console.error('Failed to load resource', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResource();

    const handleUpdate = () => fetchResource();
    window.addEventListener('recovery_connect_resources_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_resources_updated', handleUpdate);
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center space-y-3">
        <div className="w-8 h-8 mx-auto border-3 border-[#DDECF4] border-t-[#34343B] rounded-full animate-spin" />
        <p className="text-xs text-[#6F6D76]">Loading resource details...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4 space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#F4DDE2] flex items-center justify-center text-[#8E283E]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#34343B]">
          Resource Not Found
        </h2>
        <p className="text-xs text-[#6F6D76]">
          The resource you are looking for may have been archived or updated.
        </p>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34343B] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </Link>
      </div>
    );
  }

  const formattedCat = resource.category.replace('_', ' ');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.latitude},${resource.longitude}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back navigation & Share */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6F6D76] hover:text-[#34343B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {copyNotification && (
            <span className="text-[11px] font-semibold text-[#2D5A27] bg-[#DCE8DC] px-2.5 py-1 rounded-full animate-in fade-in">
              Link copied!
            </span>
          )}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full bg-white hover:bg-[#FFF9F3] border border-[#EADBCE] text-[#6F6D76] hover:text-[#34343B]"
            title="Share resource"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <BookmarkButton resourceId={resource.id} size="md" />
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <VerificationBadge
            status={resource.verificationStatus}
            isSynthetic={resource.isSynthetic}
            size="md"
          />
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF9F3] border border-[#EADBCE] text-[#34343B]">
            {formattedCat}
          </span>
          <span className="text-xs text-[#8E283E] font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {resource.distanceKm.toFixed(1)} km away ({resource.city})
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#34343B] leading-tight">
            {resource.name}
          </h1>
          <p className="text-sm sm:text-base text-[#6F6D76] mt-3 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Quick Contact Action Bar */}
        <div className="pt-4 border-t border-[#EADBCE]/70 flex flex-wrap items-center gap-3">
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34343B] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all hover:scale-102 active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#DDECF4]" />
              <span>Call {resource.phone}</span>
            </a>
          )}

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DDECF4] hover:bg-[#CFE4EE] text-[#25526C] text-xs font-semibold border border-[#BBD7E6] shadow-xs transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>

          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF9F3] text-[#34343B] text-xs font-medium border border-[#EADBCE] transition-all"
            >
              <Globe className="w-4 h-4 text-[#4D396E]" />
              <span>Visit Website</span>
            </a>
          )}
        </div>
      </div>

      {/* Details Grid: Location, Access, Availability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1: Location & Coordinates */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#34343B] font-semibold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#8E283E]" />
            <span>Location</span>
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-medium text-[#34343B] leading-relaxed">
              {resource.address}
            </p>
            <p className="text-[#6F6D76]">
              Coordinates: {resource.latitude.toFixed(4)}, {resource.longitude.toFixed(4)}
            </p>
            <p className="text-[#6F6D76] pt-1">
              Estimated distance: <strong>{resource.distanceKm.toFixed(1)} km</strong> from central hub.
            </p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 rounded-2xl bg-[#FFF9F3] hover:bg-[#F6E2D2] text-[#8C4A1E] border border-[#EADBCE] text-xs font-semibold transition-all"
          >
            Open in Maps
          </a>
        </div>

        {/* Col 2: Access, Cost & Languages */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#34343B] font-semibold text-xs uppercase tracking-wider">
            <CircleDollarSign className="w-4 h-4 text-[#2D5A27]" />
            <span>Access & Languages</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-[#6F6D76] block font-medium">Cost Structure:</span>
              <span className="capitalize font-bold text-[#34343B]">
                {resource.cost === 'free' ? 'Free of charge' : resource.cost.replace('_', ' ')}
              </span>
              <p className="text-[#6F6D76] text-[11px] mt-0.5">{resource.costDetails}</p>
            </div>

            <div>
              <span className="text-[#6F6D76] block font-medium">Languages:</span>
              <span className="font-semibold text-[#34343B]">
                {resource.languages.join(' · ')}
              </span>
            </div>

            <div>
              <span className="text-[#6F6D76] block font-medium">Eligibility:</span>
              <p className="text-[#6F6D76] text-[11px] leading-tight">
                {resource.eligibility}
              </p>
            </div>
          </div>
        </div>

        {/* Col 3: Availability & Hours */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#34343B] font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#8C4A1E]" />
            <span>Operating Hours</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[#6F6D76] block font-medium">Hours:</span>
              <p className="font-bold text-[#34343B] text-sm">
                {resource.availabilityHours}
              </p>
            </div>

            <div>
              <span className="text-[#6F6D76] block font-medium">Appointment Requirement:</span>
              <span className="font-semibold text-[#34343B]">
                {resource.appointmentRequired ? 'Prior Appointment Required' : 'Walk-ins Welcome'}
              </span>
            </div>

            {resource.accessibilityFeatures && resource.accessibilityFeatures.length > 0 && (
              <div className="pt-1">
                <span className="text-[#6F6D76] block font-medium mb-1">Accessibility Facilities:</span>
                <div className="flex flex-wrap gap-1">
                  {resource.accessibilityFeatures.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#FFF9F3] border border-[#EADBCE] text-[10px] text-[#34343B]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust & Verification Layer Section */}
      <TrustSection
        resource={resource}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        resourceId={resource.id}
        resourceName={resource.name}
        onReportSubmitted={fetchResource}
      />
    </div>
  );
};
