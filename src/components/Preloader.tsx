import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFade(true);
      const timer = setTimeout(() => setShow(false), 500); // Wait for fade out
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-orange-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        
        <div className="relative">
          <Shield className="w-20 h-20 text-orange-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" strokeWidth={1.5} />
          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="w-full h-1 bg-white/50 blur-[2px] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        
        <div className="mt-8 space-y-3 text-center z-10">
          <h2 className="text-2xl font-light tracking-[0.2em] text-white uppercase">Reach<span className="font-bold">GRC</span></h2>
          <div className="flex items-center justify-center gap-2 text-orange-400">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          <p className="text-xs text-gray-500 tracking-widest uppercase mt-4">Establishing Secure Connection</p>
        </div>
      </div>
{/* Add custom keyframes for the scan line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }
      `}} />
    </div>
  );
};
