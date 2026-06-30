import React from 'react';
import { TrustBadge } from './TrustBadge';
import { SecurityControlsGrid } from './SecurityControlsGrid';
import type { Company } from '../types';
import { useTheme } from '../ThemeContext';

interface TrustCenterContainerProps {
  company: Company;
}

export const TrustCenterContainer: React.FC<TrustCenterContainerProps> = ({ company }) => {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-950/90 backdrop-blur-xl p-6 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 shadow-[0_8px_40px_rgba(0,0,0,0.08)] max-w-6xl mx-auto font-sans text-zinc-800 dark:text-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden group">
      {/* Top Gradient Highlight (ReachGRC aesthetic) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-yellow-dark/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="space-y-8 relative z-10 pt-2">
        <header className="bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-zinc-200/80 dark:border-zinc-800 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-xl shadow-inner border border-zinc-200 dark:border-zinc-850">
              <img 
                src={company.logoUrl} 
                alt={company.companyName} 
                className="w-16 h-16 rounded-lg object-contain" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white m-0 tracking-tight uppercase">{company.companyName} Trust Center</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm font-medium">{company.statement}</p>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <TrustBadge company={company} theme={theme} className="w-full bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-lg" />
          </div>

          <div className="md:col-span-8 lg:col-span-9 space-y-6">
             <SecurityControlsGrid domains={company.domains} theme={theme} />
           </div>
        </div>
        
        <div className="text-center pt-6 border-t border-zinc-200 dark:border-zinc-800">
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
