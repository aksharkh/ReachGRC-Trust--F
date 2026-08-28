import React from 'react';
import { Map, MapMarker, MarkerContent, MapControls } from './ui/map';

interface LocationGlobeProps {
  theme?: 'light' | 'dark';
  latitude?: number;
  longitude?: number;
  locationName?: string;
  mapHeight?: string;
  zoom?: number;
}

export const LocationGlobe: React.FC<LocationGlobeProps> = ({ 
  theme = 'light',
  latitude = 12.9716,
  longitude = 77.5946,
  locationName = 'Bengaluru, India',
  mapHeight = 'h-[200px]',
  zoom = 1.3
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border relative overflow-hidden font-sans group transition-all duration-300 ${
      isDark 
        ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-200 hover:border-zinc-700 shadow-sm' 
        : 'bg-white border-zinc-200/80 text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
    }`}>
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Professional Datacenter Ingress Node */}
      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          
          {/* Custom Architectural Network Node Emblem */}
          <div className="shrink-0 flex items-center justify-center relative bg-transparent">
            <svg 
              className="w-5 h-5 text-brand-orange" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.75" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Server rack chassis with ingress points */}
              <rect x="3" y="4" width="18" height="6" rx="2" />
              <rect x="3" y="14" width="18" height="6" rx="2" />
              <circle cx="7" cy="7" r="1" fill="currentColor" />
              <circle cx="10" cy="7" r="1" fill="currentColor" />
              <circle cx="7" cy="17" r="1" fill="currentColor" />
              <circle cx="10" cy="17" r="1" fill="currentColor" />
              <path d="M17 7h.01M17 17h.01" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-wider uppercase text-brand-orange">
              <span>Hosting Ingress</span>
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white tracking-tight">
              Primary Datacenter Node
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono">
              {locationName || 'AWS us-east-1 (N. Virginia)'}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          <span>INGRESS ONLINE</span>
        </div>
      </div>

      {/* Interactive MapLibre Container */}
      <div className={`relative rounded-2xl border overflow-hidden ${mapHeight} ${
        isDark ? 'bg-black/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
      }`}>
        <Map 
          key={`${longitude}-${latitude}`}
          center={[longitude, latitude]}
          zoom={zoom}
          theme={isDark ? "dark" : "light"}
          className="w-full h-full"
        >
          <MapMarker longitude={longitude} latitude={latitude}>
            <MarkerContent>
              <div className="flex items-center justify-center relative">
                <span className="absolute w-8 h-8 rounded-full bg-brand-orange/40 animate-ping" />
                <span className="relative w-4 h-4 rounded-full bg-brand-orange border-2 border-white dark:border-zinc-950 shadow-[0_0_12px_rgba(255,138,28,0.7)]" />
              </div>
            </MarkerContent>
          </MapMarker>
          <MapControls />
        </Map>
      </div>
    </div>
  );
};
