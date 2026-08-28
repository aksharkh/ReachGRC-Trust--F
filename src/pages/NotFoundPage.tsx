import React from 'react';
import { useNavigate } from 'react-router-dom';
import reachGrcLogo from '../assets/REACH_GRC.png';

/**
 * 404 Not Found Page
 * Minimalist, high-craft error screen with home redirect and status navigation.
 */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-[#060709] text-zinc-800 dark:text-zinc-200 flex flex-col justify-between p-6 sm:p-10 md:p-12 relative overflow-hidden font-sans select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/6 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header: Brand Mark */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto relative z-10">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img 
            src={reachGrcLogo} 
            alt="ReachGRC" 
            className="w-7 h-7 object-contain transition-transform group-hover:scale-105" 
          />
          <div className="flex items-center gap-1 font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white">
            <span>ReachGRC</span>
            <span className="text-brand-orange text-xs">Trust</span>
          </div>
        </div>

        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          ERROR 404
        </span>
      </div>

      {/* Centerpiece: Error Code & Redirection */}
      <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto my-auto relative z-10 space-y-6">
        
        {/* Large 404 Numeral */}
        <div className="relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-mono font-extralight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-600 select-none">
            404
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
            NODE_NOT_FOUND
          </div>
        </div>

        {/* Informative Copy */}
        <div className="space-y-2 pt-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal max-w-md">
            The attestation page, compliance document, or resource you requested does not exist or has been relocated.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <svg 
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" 
              viewBox="0 0 16 16" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M10 13L5 8L10 3" />
            </svg>
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => navigate('/status')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            System Status
          </button>
        </div>

      </div>

      {/* Bottom Footer Metadata */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto relative z-10 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
        <span>© {new Date().getFullYear()} ReachGRC</span>
        <span>CONTINUOUS TRUST POSTURE</span>
      </div>

    </div>
  );
};
