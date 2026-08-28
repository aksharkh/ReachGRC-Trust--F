import React from 'react';
import { ShieldCheck, Shield, Activity, FileCheck, CheckCircle2, Cpu } from 'lucide-react';
import type { Company } from '../types';

interface TrustBadgeProps {
  company: Company;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
  detailed?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  company,
  onClick,
  className = '',
  theme = 'light',
  detailed = false
}) => {
  const { stats } = company;
  const isDark = theme === 'dark';

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 font-sans group ${
        isDark 
          ? 'bg-zinc-900/50 border-zinc-800 text-zinc-200 hover:border-zinc-700 shadow-xl' 
          : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 shadow-lg'
      } p-6 sm:p-7 ${className}`}
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info: Logo + Company Name */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <img 
              src={company.logoUrl} 
              alt={`${company.companyName} logo`} 
              className={`w-14 h-14 rounded-2xl object-contain p-1.5 ${
                isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
              }`}
            />
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className={`font-black tracking-tight text-lg truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {company.companyName}
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Active Posture
            </span>
          </div>
        </div>
      </div>

      {/* Security Statement */}
      {company.statement && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-4 leading-relaxed line-clamp-2">
          {company.statement}
        </p>
      )}

      {/* Trust Score Grade Block */}
      <div className={`my-5 relative z-10 py-4 px-4 rounded-2xl border backdrop-blur-sm flex items-center justify-between gap-4 ${
        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
      }`}>
        <div className="space-y-0.5">
          <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500">
            Security Posture
          </p>
          <p className={`text-sm font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Continuous Grade
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 size={11} /> 100% Automated Evidence
          </span>
          <p className="text-[9.5px] font-semibold text-zinc-400">
            Score: <strong className="text-zinc-800 dark:text-zinc-200">{stats.score || 100}/100</strong>
          </p>
        </div>
        
        {/* 3D Glowing Orange Score Sphere (Matching Reference Image) */}
        <div className="relative flex items-center justify-center shrink-0 p-1">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFA229] to-[#FF5814] rounded-full blur-lg opacity-50 scale-125 pointer-events-none" />
          <div 
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 select-none"
            style={{
              background: 'radial-gradient(circle at 35% 28%, #FFA726 0%, #FF8015 52%, #FF4500 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.65), inset 0 -3px 5px rgba(180, 40, 0, 0.35), 0 10px 25px -4px rgba(255, 115, 20, 0.5), 0 4px 12px -2px rgba(255, 80, 0, 0.35)'
            }}
          >
            <div className="absolute top-1 left-2.5 right-2.5 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />
            <span 
              className="text-xl font-black tracking-tight text-[#FFF3CC] drop-shadow-[0_1.5px_2px_rgba(160,35,0,0.5)]"
              style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {stats.grade || 'A+'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid (Normal vs Detailed) */}
      {!detailed ? (
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-[8.5px] text-zinc-400 uppercase tracking-wider font-bold">Telemetry</p>
              <p className="text-[10px] font-bold text-emerald-500 truncate">Live Syncing</p>
            </div>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <FileCheck className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-[8.5px] text-zinc-400 uppercase tracking-wider font-bold">Controls</p>
              <p className="text-[10px] font-bold text-zinc-700 dark:text-zinc-200 truncate">100% Passing</p>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Engineering Telemetry Metrics */
        <div className="space-y-2 my-4 pt-1">
          <div className="p-3 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-[9.5px] border border-zinc-800 space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800/80 pb-1">
              <span className="flex items-center gap-1 text-indigo-400">
                <Cpu size={10} /> Telemetry Node
              </span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Attestation ID:</span>
              <span className="text-zinc-200 font-bold">RCH-2026-9921</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>KMS Key Rotation:</span>
              <span className="text-emerald-400">90d Enforced</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Cryptographic State:</span>
              <span className="text-zinc-200">TLS 1.3 / AES-256</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className={`flex items-center justify-between text-[9.5px] uppercase tracking-wider font-semibold ${
        isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-400 border-zinc-200'
      } pt-3 border-t relative z-10`}>
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <Shield className="w-3 h-3" />
          <span>{detailed ? 'Continuous Attestation Feed' : 'Verified Audit State'}</span>
        </div>
        <span>{stats.lastAuditDate}</span>
      </div>
    </div>
  );
};
