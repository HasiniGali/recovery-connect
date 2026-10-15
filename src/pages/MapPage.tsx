import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Resource, ResourceCategory } from '../types';
import { MapView } from '../components/map/MapView';
import { ResourcePreview } from '../components/map/ResourcePreview';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Filter,
  Navigation,
  Sparkles,
  Phone,
  Layers
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const data = await api.getResources();
        setResources(data);
        if (data.length > 0) {
          setSelectedResource(data[0]);
        }
      } catch (e) {
        console.error('Failed to load map resources', e);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filtered resources for map list
  const filtered = resources.filter(r => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
            Geographic Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#34343B]">
            Support Across Vellore & Katpadi
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6F6D76]">
            Showing <strong className="text-[#34343B]">{filtered.length}</strong> locations
          </span>
        </div>
      </div>

      {/* Split Layout: Left Panel & Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        {/* Left Panel: Search, Category, Cards */}
        <div className="lg:col-span-5 flex flex-col h-full space-y-4">
          {/* Search bar inside left panel */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#6F6D76] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search location or name..."
              className="w-full bg-white border border-[#EADBCE] rounded-2xl py-2.5 pl-10 pr-4 text-xs text-[#34343B] focus:outline-hidden focus:border-[#BBD7E6]"
            />
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['all', 'counselling', 'recovery', 'crisis', 'campus', 'medical'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full capitalize whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#34343B] text-white font-semibold'
                    : 'bg-white hover:bg-[#FFF9F3] text-[#6F6D76] border border-[#EADBCE]'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Scrollable List of Resource Cards */}
          <div className="flex-1 max-h-[500px] overflow-y-auto space-y-3 pr-1">
            {filtered.map(resource => {
              const isSelected = selectedResource?.id === resource.id;
              return (
                <div
                  key={resource.id}
                  onClick={() => setSelectedResource(resource)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#34343B] shadow-md ring-2 ring-[#DDECF4]'
                      : 'bg-white/80 hover:bg-white border-[#EADBCE] shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pb-1.5">
                    <VerificationBadge
                      status={resource.verificationStatus}
                      isSynthetic={resource.isSynthetic}
                      size="sm"
                    />
                    <span className="text-[11px] font-bold text-[#8E283E]">
                      📍 {resource.distanceKm.toFixed(1)} km
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[#34343B]">
                    {resource.name}
                  </h3>

                  <p className="text-[11px] text-[#6F6D76] line-clamp-1 mt-0.5">
                    {resource.address}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#EADBCE]/50 flex items-center justify-between text-[11px] text-[#6F6D76]">
                    <span className="capitalize font-medium text-[#2D5A27]">
                      {resource.cost === 'free' ? 'Free' : resource.cost.replace('_', ' ')}
                    </span>
                    <span className="text-[#4D396E] font-medium">
                      {resource.languages.join(' · ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Interactive Pastel Leaflet Map & Preview Card */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="h-[460px] w-full">
            <MapView
              resources={filtered}
              selectedResourceId={selectedResource?.id}
              onSelectResource={setSelectedResource}
            />
          </div>

          {/* Bottom Selected Resource Preview */}
          {selectedResource && (
            <ResourcePreview
              resource={selectedResource}
              onClose={() => setSelectedResource(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
