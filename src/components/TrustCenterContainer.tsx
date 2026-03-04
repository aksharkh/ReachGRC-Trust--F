import React from 'react';
import { TrustBadge } from './TrustBadge';
import { SecurityControlsGrid } from './SecurityControlsGrid';
import type { Company } from '../types';

interface TrustCenterContainerProps {
  company: Company;
}

export const TrustCenterContainer: React.FC<TrustCenterContainerProps> = ({ company }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-6xl mx-auto font-sans text-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden group">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        <header className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-white/5 transition-all duration-300 hover:bg-slate-800/70">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-800 rounded-xl shadow-inner border border-white/5">
              <img 
                src={company.logoUrl} 
                alt={company.companyName} 
                className="w-16 h-16 rounded-lg object-contain" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white m-0 tracking-tight">{company.companyName} Trust Center</h1>
              <p className="text-slate-400 mt-1 text-sm">{company.statement}</p>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <TrustBadge company={company} theme="dark" className="w-full bg-slate-800/50 backdrop-blur-md border-white/5 text-slate-200" />
          </div>

          <div className="md:col-span-8 lg:col-span-9 space-y-6">
             <SecurityControlsGrid domains={company.domains} theme="dark" />
           </div>
        </div>
        
        <div className="text-center pt-4 border-t border-white/10">
          <a 
            href={import.meta.env.VITE_APP_URL || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1"
          >
            Powered by <b className="text-slate-400">ReachGRC</b>
          </a>
        </div>
      </div>
    </div>
  );
};
