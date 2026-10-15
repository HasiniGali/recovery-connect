import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSaved } from '../context/SavedContext';
import { api } from '../services/api';
import { Resource } from '../types';
import { ResourceCard } from '../components/discovery/ResourceCard';
import { Bookmark, Compass, ArrowRight } from 'lucide-react';

export const SavedPage: React.FC = () => {
  const { savedIds } = useSaved();
  const [savedResources, setSavedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const data = await api.getSavedResources();
      setSavedResources(data);
    } catch (e) {
      console.error('Failed to load saved resources', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();

    const handleUpdate = () => fetchSaved();
    window.addEventListener('recovery_connect_saved_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_saved_updated', handleUpdate);
  }, [savedIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[60vh]">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
          Personal Bookmarks
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34343B]">
          Your saved resources
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6D76]">
          Easily access contact details and operating hours for resources you have bookmarked.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 mx-auto border-3 border-[#DDECF4] border-t-[#34343B] rounded-full animate-spin" />
          <p className="text-xs text-[#6F6D76]">Loading saved resources...</p>
        </div>
      ) : savedResources.length === 0 ? (
        /* Empty State with pastel connected-path illustration */
        <div className="py-16 px-4 max-w-md mx-auto text-center space-y-5 bg-white/80 border border-[#EADBCE] rounded-3xl p-8 shadow-xs">
          {/* Small pastel connected-path illustration */}
          <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#FFF9F3" stroke="#EADBCE" strokeWidth="1.5" />
              <path
                d="M 25 60 Q 40 30, 60 55 T 80 40"
                fill="none"
                stroke="#E7DFF3"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 30 40 Q 50 65, 75 45"
                fill="none"
                stroke="#DDECF4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="25" cy="60" r="6" fill="#DDECF4" stroke="#34343B" strokeWidth="1.5" />
              <circle cx="60" cy="55" r="7" fill="#E7DFF3" stroke="#34343B" strokeWidth="1.5" />
              <circle cx="80" cy="40" r="6" fill="#F4DDE2" stroke="#34343B" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif text-xl font-bold text-[#34343B]">
              No saved resources yet.
            </h2>
            <p className="text-xs text-[#6F6D76] leading-relaxed">
              When exploring counselling, recovery, or campus centers, tap the bookmark icon on any card to save it here for quick reference.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#34343B] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Compass className="w-4 h-4 text-[#DDECF4]" />
              <span>Explore resources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              showMatchDetails={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
