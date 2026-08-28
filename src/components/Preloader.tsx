import React, { useEffect, useState } from 'react';
import reachGrcLogo from '../assets/REACH_GRC.png';

interface PreloaderProps {
  isLoading: boolean;
}

/**
 * Minimalist Awwwards-Caliber Preloader
 * Stripped of technical jargon and noise.
 * Features an editorial HUD layout, smooth progressive counter, 
 * hairline progress track, and cinematic easing.
 */
export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const startTime = Date.now();
    const duration = 2400; // 2.4s minimum duration for people to see and appreciate the design

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out pacing
      const targetProgress = Math.floor(
        (1 - Math.pow(1 - progressFraction, 2.5)) * (isLoading ? 92 : 100)
      );

      if (targetProgress > currentProgress) {
        currentProgress = targetProgress;
        setProgress(currentProgress);
      }

      // Once 100% is reached and data has finished loading
      if (progressFraction >= 1 && !isLoading) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setFade(true);
          setTimeout(() => setShow(false), 650);
        }, 220);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isLoading]);

  // When isLoading flips to false after initial duration, guarantee clean completion
  useEffect(() => {
    if (!isLoading && progress >= 90) {
      setProgress(100);
      const timer = setTimeout(() => {
        setFade(true);
        setTimeout(() => setShow(false), 650);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-[#060709] text-zinc-300 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        fade ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Ethereal Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-brand-orange/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Editorial Bar */}
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-[10.5px] font-medium tracking-[0.3em] uppercase text-zinc-400">
            ReachGRC / Trust
          </span>
        </div>

        <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
          [ ATT-2026 ]
        </span>
      </div>

      {/* Centerpiece: Minimalist Logo + Large Editorial Counter + Hairline */}
      <div className="flex flex-col items-center justify-center relative z-10 space-y-7 my-auto">
        
        {/* Clean Logo Silhouette */}
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-xl opacity-60 scale-110 pointer-events-none" />
          <img 
            src={reachGrcLogo} 
            alt="ReachGRC" 
            className="w-12 h-12 object-contain relative z-10 transition-transform duration-500 hover:scale-105" 
          />
        </div>

        {/* Large Editorial Monospace Counter */}
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-mono font-extralight tracking-tight text-white/95 tabular-nums">
            {String(progress).padStart(2, '0')}
            <span className="text-xl sm:text-2xl text-brand-orange font-light ml-0.5">%</span>
          </span>

          <span className="text-[10px] tracking-[0.35em] text-zinc-500 uppercase mt-2 font-medium">
            Loading Attestation
          </span>
        </div>

        {/* Hairline Progress Runner */}
        <div className="w-56 sm:w-72 h-[1.5px] bg-zinc-900 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Bottom Editorial Footer */}
      <div className="flex items-center justify-between w-full relative z-10 text-[10px] text-zinc-500 font-mono">
        <span className="tracking-[0.25em] uppercase text-zinc-500 hidden sm:inline">
          Continuous Security & Posture
        </span>
        <span className="tracking-widest uppercase text-zinc-500 sm:hidden">
          Posture
        </span>

        <span className="tracking-widest text-zinc-500 uppercase">
          INITIALIZING...
        </span>
      </div>

    </div>
  );
};
