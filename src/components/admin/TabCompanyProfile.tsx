import React from 'react';
import { Settings } from 'lucide-react';
import { LocationGlobe } from '../LocationGlobe';

interface TabCompanyProfileProps {
  profileName: string;
  setProfileName: (val: string) => void;
  profileStatement: string;
  setProfileStatement: (val: string) => void;
  profileLatitude: number | null;
  setProfileLatitude: (val: number | null) => void;
  profileLongitude: number | null;
  setProfileLongitude: (val: number | null) => void;
  profileLocationName: string;
  setProfileLocationName: (val: string) => void;
  saveProfileDetails: () => Promise<void>;
  theme: 'light' | 'dark';
}

/**
 * TabCompanyProfile Component
 * Manages core organization descriptions, mission statements, and maps coordinates
 * with the LocationGlobe visualizer.
 */
export const TabCompanyProfile: React.FC<TabCompanyProfileProps> = ({
  profileName,
  setProfileName,
  profileStatement,
  setProfileStatement,
  profileLatitude,
  setProfileLatitude,
  profileLongitude,
  setProfileLongitude,
  profileLocationName,
  setProfileLocationName,
  saveProfileDetails,
  theme,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Header and save action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#1f2438]/80 pb-5">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Settings className="text-brand-orange" size={20} />
            Organization GRC settings
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">Configure profile details and visibility states</p>
        </div>
        <button
          onClick={saveProfileDetails}
          className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-white transition-all shadow-md shadow-brand-orange/20 cursor-pointer self-start sm:self-auto"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Company Name</label>
          <input 
            type="text" 
            value={profileName}
            onChange={e => setProfileName(e.target.value)}
            placeholder="e.g. ReachGRC"
            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
          />
        </div>

        {/* Mission Statement */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-455 dark:text-zinc-550 uppercase tracking-wider">Mission Statement</label>
          <textarea 
            value={profileStatement}
            onChange={e => setProfileStatement(e.target.value)}
            placeholder="We ensure robust security and continuous GRC compliance monitoring..."
            rows={3}
            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all resize-none font-light"
          />
        </div>

        {/* Coordinates Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Latitude</label>
            <input 
              type="number"
              step="any"
              value={profileLatitude !== null ? profileLatitude : ''}
              onChange={e => setProfileLatitude(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="e.g. 12.968318"
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Longitude</label>
            <input 
              type="number"
              step="any"
              value={profileLongitude !== null ? profileLongitude : ''}
              onChange={e => setProfileLongitude(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="e.g. 77.651727"
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Location Name</label>
            <input 
              type="text" 
              value={profileLocationName}
              onChange={e => setProfileLocationName(e.target.value)}
              placeholder="e.g. Bangalore, India"
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
            />
          </div>
        </div>

        {/* Coordinates Preview visualizer globe card */}
        <div className="border border-zinc-200 dark:border-[#1f2438] rounded-2xl overflow-hidden h-[300px] relative z-10 bg-zinc-50 dark:bg-[#090b11]">
          <LocationGlobe 
            theme={theme}
            latitude={profileLatitude !== null ? profileLatitude : undefined}
            longitude={profileLongitude !== null ? profileLongitude : undefined}
            locationName={profileLocationName || undefined}
          />
        </div>
      </div>
    </div>
  );
};
