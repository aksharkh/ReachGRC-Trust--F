import React, { useState } from 'react';
import { TrustBadge } from './TrustBadge';
import { SecurityControlsGrid } from './SecurityControlsGrid';
import { LocationGlobe } from './LocationGlobe';
import { DocumentSection } from './DocumentSection';
import { ComplianceJourney } from './ComplianceJourney';
import { FAQSection } from './FAQSection';
import type { Company } from '../types';
import { useTheme } from '../ThemeContext';
import { Sun, Moon } from 'lucide-react';
import reachGrcLogo from '../assets/REACH_GRC.png';

interface TrustCenterContainerProps {
  company: Company;
  resources: any[];
}

export const TrustCenterContainer: React.FC<TrustCenterContainerProps> = ({ company, resources }) => {
  const { theme, toggleTheme } = useTheme();
  const [detailedView, setDetailedView] = useState(false);

  // Logo resolver
  const logoImage = resources.filter(r => {
    const ext = r.fileName.toLowerCase();
    return ext.endsWith('.png') || ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.gif');
  })[0];

  const displayLogoUrl = logoImage 
    ? `data:image/png;base64,${logoImage.fileData}` 
    : (company.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName)}&background=0D8ABC&color=fff&size=128`);

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 shadow-2xl relative overflow-hidden group font-sans w-full max-w-[90rem] mx-auto selection:bg-brand-orange/30 selection:text-brand-orange animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top red-to-orange gradient highlight */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-yellow-dark/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
      
      {/* Subtle Noise Texture overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="p-6 sm:p-8 space-y-8 relative z-10">
        
        {/* Header Block */}
        <header className="bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-zinc-200/80 dark:border-zinc-800 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-850">
              <img 
                src={displayLogoUrl} 
                alt={company.companyName} 
                className="w-16 h-16 rounded-xl object-contain" 
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white m-0 tracking-tight uppercase">{company.companyName} Trust Center</h1>
              <p className="text-zinc-550 dark:text-zinc-400 mt-1 text-xs sm:text-sm font-medium">{company.statement}</p>
            </div>
          </div>

          {/* Controls: Theme & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white dark:bg-zinc-900/60 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
              <button
                onClick={() => setDetailedView(false)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  !detailedView
                    ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-md'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setDetailedView(true)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  detailedView
                    ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-md'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Detailed
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} className="text-brand-yellow-dark" /> : <Moon size={14} className="text-zinc-650" />}
            </button>
          </div>
        </header>

        {/* Core Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column (Sidebar) */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-8">
            
            {/* Trust Badge */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2rem] bg-zinc-50/20 dark:bg-zinc-950 overflow-hidden shadow-sm">
              <TrustBadge 
                company={{ ...company, logoUrl: displayLogoUrl }} 
                theme={theme} 
                className="w-full bg-transparent hover:border-transparent" 
                detailed={detailedView} 
              />
            </div>

            {/* Location Globe */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2rem] bg-zinc-50/20 dark:bg-zinc-955 overflow-hidden shadow-sm">
              <LocationGlobe 
                theme={theme} 
                latitude={company.latitude ?? undefined} 
                longitude={company.longitude ?? undefined} 
                locationName={company.locationName ?? undefined} 
              />
            </div>

            {/* Documents Section */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2rem] bg-white dark:bg-zinc-950 p-6 sm:p-8 overflow-hidden shadow-sm relative group/docs">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/5 blur-3xl pointer-events-none transition-transform duration-700 group-hover/docs:scale-150" />
              <div className="relative z-10">
                <DocumentSection 
                  documents={[
                    ...resources
                      .filter(r => r.fileName.toLowerCase().endsWith('.pdf'))
                      .map(r => ({
                        id: String(r.fileId),
                        name: r.fileName.replace(/\.pdf$/i, '').replace(/_/g, ' '),
                        type: 'PDF',
                        requiresVerification: r.label !== 'PUBLIC',
                        label: r.label || 'PUBLIC',
                        fileData: r.fileData
                      })),
                    { id: 'privacy-policy', name: 'Privacy Policy', type: 'Link', requiresVerification: false, url: '#', label: 'PUBLIC' }
                  ]} 
                  detailed={detailedView} 
                />
              </div>
            </div>

          </div>

          {/* Right Column (Main content) */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-8">
            
            {/* Controls Grid */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2.5rem] bg-white dark:bg-zinc-950 p-5 sm:p-8 md:p-10 shadow-sm relative group/grid">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
              <SecurityControlsGrid domains={company.domains} theme={theme} detailed={detailedView} />
            </div>

            {/* Compliance Journey */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2.5rem] bg-white dark:bg-zinc-950 p-5 sm:p-8 md:p-10 shadow-sm">
              <ComplianceJourney theme={theme} />
            </div>

            {/* FAQ section */}
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-[2.5rem] bg-white dark:bg-zinc-950 p-5 sm:p-8 md:p-10 shadow-sm">
              <FAQSection faqs={company.faqs} />
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-2.5">
          <img 
            src={reachGrcLogo} 
            alt="ReachGRC Logo" 
            className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(255,138,28,0.25)]" 
          />
          <a 
            href={import.meta.env.VITE_APP_URL || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center justify-center gap-1.5"
          >
            Powered by <b className="text-zinc-700 dark:text-zinc-300 uppercase tracking-widest text-[10px]">Reach<span className="text-brand-orange">GRC</span></b>
          </a>
        </div>

      </div>
    </div>
  );
};
