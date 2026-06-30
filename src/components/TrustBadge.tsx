import { ShieldCheck, Shield, Activity, FileCheck } from 'lucide-react';
import type { Company } from '../types';

interface TrustBadgeProps {
  company: Company;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export const TrustBadge = ({ company, onClick, className = '', theme = 'light' }: TrustBadgeProps) => {
  const { stats } = company;
  
  const isDark = theme === 'dark';

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 font-sans group cursor-pointer ${
        isDark 
          ? 'card-pattern-dark border-zinc-800/80 text-zinc-200 hover:border-brand-orange/50 hover:shadow-[0_20px_50px_rgba(255,138,28,0.15)] shadow-[0_15px_35px_-5px_rgba(0,0,0,0.6)]' 
          : 'card-pattern-light border-zinc-200 text-zinc-900 hover:border-brand-orange/40 hover:shadow-[0_20px_50px_rgba(255,138,28,0.06)] shadow-[0_15px_35px_-5px_rgba(24,24,27,0.04)]'
      } p-6 sm:p-8 ${className}`}
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-red/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Pulsing Outer Status Ring */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-red via-brand-orange to-brand-yellow-dark opacity-20 blur-[2px] group-hover:opacity-40 transition duration-500" />
            <img 
              src={company.logoUrl} 
              alt={`${company.companyName} logo`} 
              className={`relative w-16 h-16 rounded-2xl object-contain p-1.5 ${
                isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
              }`}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-black tracking-tight text-xl truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {company.companyName}
              </h3>
              <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Verified Active
            </span>
          </div>
        </div>
      </div>

      {/* Trust Score Grade Medal Block */}
      <div className={`my-8 relative z-10 py-6 px-5 rounded-2xl border backdrop-blur-sm flex items-center justify-between gap-6 ${
        isDark ? 'bg-zinc-900/30 border-zinc-800/40' : 'bg-zinc-50 border-zinc-200'
      }`}>
        <div className="space-y-1">
          <p className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-zinc-550' : 'text-zinc-400'}`}>
            Security Posture
          </p>
          <p className={`text-base font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Trust Center Grade
          </p>
        </div>
        <div className="relative">
          {/* Glowing Badge Halo */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red/10 via-brand-orange/20 to-brand-yellow-dark/15 rounded-full blur-md opacity-75 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-brand-red via-brand-orange to-brand-yellow-dark p-[4px] shadow-[0_8px_20px_rgba(255,138,28,0.25)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center border border-white/10">
              <span className="font-black text-2xl tracking-tighter text-transparent bg-gradient-to-tr from-brand-yellow-light via-brand-yellow-dark to-white bg-clip-text">
                {stats.grade}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Telemetry Badges */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
          isDark ? 'bg-zinc-900/40 border-zinc-850/60' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <Activity className="w-4.5 h-4.5 text-brand-orange shrink-0 animate-pulse" />
          <div className="min-w-0">
            <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Telemetry</p>
            <p className="text-[10px] font-bold truncate text-green-500">Live Syncing</p>
          </div>
        </div>
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
          isDark ? 'bg-zinc-900/40 border-zinc-850/60' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <FileCheck className="w-4.5 h-4.5 text-brand-red shrink-0" />
          <div className="min-w-0">
            <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Controls</p>
            <p className="text-[10px] font-bold truncate text-zinc-700 dark:text-zinc-250">100% Verified</p>
          </div>
        </div>
      </div>

      {/* Footer Powered By */}
      <div className={`flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold ${
        isDark ? 'text-zinc-550 border-zinc-850' : 'text-zinc-450 border-zinc-200'
      } pt-4 border-t relative z-10`}>
        <div className="flex items-center gap-1.5 text-zinc-550 dark:text-zinc-400 group-hover:text-brand-orange transition-colors">
          <Shield className="w-3.5 h-3.5" />
          <span>Verified GRC Profile</span>
        </div>
        <span>{stats.lastAuditDate}</span>
      </div>
    </div>
  );
};
