import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, BookOpen } from 'lucide-react';
import type { Company } from '../types';
import reachGrcLogo from '../assets/REACH_GRC.png';

interface TrustHeaderProps {
  company: Company;
  theme: 'light' | 'dark';
  toggleTheme: (event?: React.MouseEvent) => void;
  detailedView: boolean;
  setDetailedView: (val: boolean) => void;
}

export const TrustHeader: React.FC<TrustHeaderProps> = ({
  company,
  theme,
  toggleTheme,
  detailedView,
  setDetailedView,
}) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl border-b border-zinc-200/90 dark:border-zinc-800/80 shadow-md' 
        : 'bg-white/80 dark:bg-[#090b11]/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/40'
    }`}>
      <div className="max-w-[92rem] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Left Brand & Organization Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
            title="Return to Trust Center Directory"
          >
            {/* Clean airplane logo without box or background */}
            <img 
              src={reachGrcLogo} 
              alt="ReachGRC Logo" 
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain group-hover:scale-110 transition-transform drop-shadow-sm shrink-0" 
            />
            <div className="flex items-center gap-1 font-black text-xs tracking-wider uppercase shrink-0">
              <span className="text-zinc-900 dark:text-white">Reach</span>
              <span className="text-brand-orange">GRC</span>
              <span className="text-[10px] text-zinc-400 font-bold ml-1 tracking-widest hidden md:inline">Trust</span>
            </div>
          </div>

          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>

          {/* Active Company Pill - Responsive (shown on tablet/desktop, hidden on narrow mobile where hero already displays company) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 shrink min-w-0">
            <span className="truncate max-w-[120px] md:max-w-[200px]">{company.companyName}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          </div>
        </div>

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* View Mode Toggle Pill (Normal vs Detailed) */}
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
            <button
              onClick={() => setDetailedView(false)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                !detailedView
                  ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setDetailedView(true)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                detailedView
                  ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Detailed
            </button>
          </div>

          {/* Docs Navigation Button (Hidden on Mobile) */}
          <button
            onClick={() => navigate('/docs/getting-started/overview')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-wider cursor-pointer hover:scale-105 transition-all shadow-sm shrink-0"
          >
            <BookOpen size={12} />
            <span>Docs</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={13} className="text-amber-400 sm:w-3.5 sm:h-3.5" /> : <Moon size={13} className="text-zinc-600 sm:w-3.5 sm:h-3.5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
