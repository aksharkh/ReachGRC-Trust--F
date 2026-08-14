import { Globe } from 'lucide-react';
import { Map, MapMarker, MarkerContent, MapControls } from './ui/map';

interface LocationGlobeProps {
  theme?: 'light' | 'dark';
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export const LocationGlobe = ({ 
  theme = 'light',
  latitude = 51.5074,
  longitude = -0.1278,
  locationName = 'London, UK'
}: LocationGlobeProps) => {
  const isDark = theme === 'dark';

  return (
    <div className={`p-6 border rounded-[2rem] relative overflow-hidden font-sans group ${
      isDark 
        ? 'card-pattern-dark border-zinc-800/80 text-zinc-200 bg-zinc-950/40 hover:border-zinc-700/60 shadow-lg' 
        : 'card-pattern-light border-zinc-200 text-zinc-900 bg-white shadow-md'
    }`}>
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className="p-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-lg">
          <Globe size={14} className="animate-pulse" />
        </div>
        <div className="min-w-0">
          <h4 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Security Posture Location
          </h4>
          <p className="text-[9px] text-zinc-450 dark:text-zinc-550 uppercase tracking-wider font-semibold mt-0.5">
            Active Telemetry Node
          </p>
        </div>
      </div>

      {/* Composable mapcn (MapLibre) Map rendering */}
      <div className={`relative rounded-xl border overflow-hidden h-[180px] ${
        isDark ? 'bg-black/50 border-zinc-850' : 'bg-zinc-50 border-zinc-250'
      }`}>
        <Map 
          key={`${longitude}-${latitude}`}
          center={[longitude, latitude]} // MapLibre takes [lng, lat]
          zoom={3.5}
          theme={isDark ? "dark" : "light"}
          className="w-full h-full"
        >
          <MapMarker longitude={longitude} latitude={latitude}>
            <MarkerContent>
              {/* Custom high-tech pulsing orange marker */}
              <div className="flex items-center justify-center relative">
                <span className="absolute w-6 h-6 rounded-full bg-brand-orange animate-ping opacity-60" />
                <span className="relative w-3.5 h-3.5 rounded-full bg-brand-orange border-2 border-white dark:border-zinc-950 shadow-[0_0_8px_rgba(255,138,28,0.5)]" />
              </div>
            </MarkerContent>
          </MapMarker>
          <MapControls />
        </Map>

        {/* Coordinate Overlay stamp */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 border border-zinc-800 rounded text-[7px] font-black text-brand-orange uppercase tracking-wider font-mono z-10">
          NODE: {Math.abs(latitude).toFixed(4)}° {latitude >= 0 ? 'N' : 'S'}, {Math.abs(longitude).toFixed(4)}° {longitude >= 0 ? 'E' : 'W'}
        </div>
      </div>

      {/* Latency & Status Description info */}
      <div className="mt-4 flex items-center justify-between gap-3 text-xs relative z-10">
        <div className="space-y-0.5">
          <p className={`font-bold text-[10px] uppercase ${isDark ? 'text-zinc-350' : 'text-zinc-750'}`}>
            Audit Center: {locationName}
          </p>
          <span className="text-[9px] text-zinc-450 dark:text-zinc-550 block font-light">
            Telemetry link operational
          </span>
        </div>
      </div>
    </div>
  );
};
