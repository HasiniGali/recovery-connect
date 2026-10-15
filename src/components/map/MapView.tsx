import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Resource } from '../../types';
import { LocateFixed } from 'lucide-react';

interface MapViewProps {
  resources: Resource[];
  selectedResourceId?: string | null;
  onSelectResource: (resource: Resource) => void;
  center?: [number, number];
  zoom?: number;
}

export const MapView: React.FC<MapViewProps> = ({
  resources,
  selectedResourceId,
  onSelectResource,
  center = [12.9240, 79.1350], // Vellore / Katpadi default
  zoom = 13
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create map
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false
    });

    // Add gentle zoom control on top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Warm, calm pastel basemap (CartoDB Positron light style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Category pin colors
    const pinColors: Record<string, { bg: string; border: string; text: string }> = {
      counselling: { bg: '#DDECF4', border: '#34343B', text: '#25526C' },
      recovery: { bg: '#E7DFF3', border: '#34343B', text: '#4D396E' },
      crisis: { bg: '#F6E2D2', border: '#8C4A1E', text: '#8C4A1E' },
      support_group: { bg: '#F4DDE2', border: '#34343B', text: '#8E283E' },
      campus: { bg: '#DCE8DC', border: '#34343B', text: '#2D5A27' },
      medical: { bg: '#DDECF4', border: '#34343B', text: '#25526C' }
    };

    resources.forEach(resource => {
      const isSelected = resource.id === selectedResourceId;
      const palette = pinColors[resource.category] || { bg: '#FFF9F3', border: '#34343B', text: '#34343B' };

      // Custom pastel pin icon
      const customIcon = L.divIcon({
        className: 'custom-pastel-pin',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${
            isSelected ? 'scale-125 z-50' : 'hover:scale-110'
          }">
            <div style="background-color: ${palette.bg}; border: 2px solid ${palette.border}; color: ${palette.text}" 
                 class="px-2 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
              <span>●</span>
              <span>${resource.name.slice(0, 16)}...</span>
            </div>
            <div style="border-top-color: ${palette.border}" class="w-0 h-0 border-x-4 border-x-transparent border-t-6 -mt-0.5"></div>
          </div>
        `,
        iconSize: [120, 40],
        iconAnchor: [60, 36]
      });

      const marker = L.marker([resource.latitude, resource.longitude], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          onSelectResource(resource);
        });

      markersRef.current[resource.id] = marker;
    });
  }, [resources, selectedResourceId, onSelectResource]);

  // Pan to selected resource when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedResourceId) return;

    const target = resources.find(r => r.id === selectedResourceId);
    if (target) {
      map.flyTo([target.latitude, target.longitude], 14, { duration: 1 });
    }
  }, [selectedResourceId, resources]);

  // "Near Me" trigger
  const handleNearMe = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([12.9240, 79.1350], 13.5, { duration: 1.2 });
  };

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full min-h-[450px]" />

      {/* "Near Me" Floating Control */}
      <button
        type="button"
        onClick={handleNearMe}
        className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#34343B] font-semibold text-xs border border-[#EADBCE] shadow-md hover:shadow-lg transition-all active:scale-95"
        aria-label="Recenter map to Vellore / Katpadi area"
      >
        <LocateFixed className="w-4 h-4 text-[#4D396E]" />
        <span>Near me (Vellore)</span>
      </button>

      {/* Map Legend */}
      <div className="absolute top-5 left-5 z-20 hidden md:flex items-center gap-1.5 p-2 px-3 bg-white/90 backdrop-blur-xs rounded-full border border-[#EADBCE] text-[10px] text-[#6F6D76] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#DDECF4] border border-[#34343B]"></span>
        <span>Counselling</span>
        <span className="w-2 h-2 rounded-full bg-[#E7DFF3] border border-[#34343B] ml-1"></span>
        <span>Recovery</span>
        <span className="w-2 h-2 rounded-full bg-[#DCE8DC] border border-[#34343B] ml-1"></span>
        <span>Campus</span>
        <span className="w-2 h-2 rounded-full bg-[#F6E2D2] border border-[#8C4A1E] ml-1"></span>
        <span>Crisis</span>
      </div>
    </div>
  );
};
