import React from 'react';
import { Cpu } from 'lucide-react';
import type { Company } from '../types';

interface SecurityHeroProps {
  company: Company;
  theme?: 'light' | 'dark';
  detailed?: boolean;
  onRequestAccess?: () => void;
}

export const SecurityHero: React.FC<SecurityHeroProps> = ({
  company,
  theme = 'light',
  detailed = false,
  onRequestAccess
}) => {
  const isDark = theme === 'dark';
  const { stats } = company;
  const statementText = (company.statement && company.statement.trim().length > 15)
    ? company.statement
    : `${company.companyName} is committed to maintaining the highest security, privacy, and compliance standards. Our architecture is continuously audited across key security domains to safeguard customer data and ensure full transparency.`;

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`p-5 sm:p-7 md:p-8 rounded-3xl border transition-all duration-300 ${
      isDark 
        ? 'bg-zinc-900/40 border-zinc-800/90 text-zinc-200 shadow-xl' 
        : 'bg-white border-zinc-200/80 text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
    }`}>
      {/* Top Main Row: Company Info & Circular Score Gauge Block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        
        {/* Left: Avatar + Title + Status + Statement */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative shrink-0">
              <img 
                src={company.logoUrl} 
                alt={`${company.companyName} logo`} 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain p-1 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white truncate">
                  {company.companyName} Trust Center
                </h1>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0" title="Audited Organization">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  Verified Active Posture
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">• Last Audit: {stats.lastAuditDate || 'Continuous'}</span>
              </div>
            </div>
          </div>

          {/* Security Statement */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {statementText}
          </p>
        </div>

        {/* Right: 3D Glowing Score Badge matching reference */}
        <div className={`w-full lg:w-auto p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 sm:gap-6 shrink-0 ${
          isDark ? 'bg-zinc-900/60 border-zinc-800/90 shadow-sm' : 'bg-zinc-50/70 border-zinc-200/80 shadow-2xs'
        }`}>
          <div className="space-y-1 sm:space-y-1.5 min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 truncate">
              Security Posture
            </p>
            <p className={`text-sm sm:text-base font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Continuous Grade
            </p>
            <div className="flex items-center gap-2 pt-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
              <span className="truncate">100% Automated Evidence</span>
            </div>
            <p className="text-xs font-medium text-zinc-400">
              Score: <strong className="text-zinc-700 dark:text-zinc-200 font-semibold">{stats.score || 100} / 100</strong>
            </p>
          </div>
          
          {/* 3D Glowing Orange Score Sphere (Exact Replica of Reference Image) */}
          <div className="relative flex items-center justify-center shrink-0 p-1">
            {/* Diffuse Outer Ambient Glow */}
            <div className="absolute inset-0 bg-[#FF8015] rounded-full blur-xl opacity-45 scale-125 pointer-events-none" />
            
            {/* Smooth 3D Sphere */}
            <div 
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 select-none shrink-0"
              style={{
                background: 'radial-gradient(circle at 48% 26%, #FFAE44 0%, #FF9020 36%, #FF6012 70%, #EB4600 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.55), inset 0 -4px 7px rgba(160, 30, 0, 0.25), 0 14px 28px -4px rgba(255, 115, 20, 0.45), 0 4px 10px -2px rgba(255, 80, 0, 0.25)'
              }}
            >
              {/* Grade A+ Typography with warm shadow */}
              <span 
                className="text-2xl sm:text-3xl font-extrabold text-[#FFF5D2] tracking-tight"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textShadow: '0 2px 4px rgba(180, 45, 0, 0.35)'
                }}
              >
                {stats.grade || 'A+'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Engineering Metadata Banner */}
      {detailed && (
        <div className="my-4 p-3.5 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-[10px] border border-zinc-800 space-y-1.5 overflow-x-auto">
          <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-1.5 gap-2">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold truncate">
              <Cpu size={12} className="shrink-0" />
              <span className="truncate">Continuous Attestation Telemetry Bridge</span>
            </span>
            <span className="text-emerald-400 font-bold shrink-0">● TELEMETRY INTACT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-zinc-400">
            <div><span className="text-zinc-500">Node ID:</span> RCH-2026-9921</div>
            <div><span className="text-zinc-500">KMS Key Rotation:</span> 90-Day Policy Enforced</div>
            <div><span className="text-zinc-500">Ingress Cipher:</span> TLS 1.3 / Strict HSTS</div>
          </div>
        </div>
      )}

      {/* Bottom Action Links & CTAs */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Quick Jump Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <button 
            onClick={() => handleScrollToSection('documents-section')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-1"
          >
            Compliance Documents
          </button>
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
          <button 
            onClick={() => handleScrollToSection('controls-section')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-1"
          >
            Security Controls
          </button>
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
          <button 
            onClick={() => handleScrollToSection('subprocessors-section')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-1"
          >
            Subprocessors
          </button>
        </div>

        {/* Right: Primary Request Access CTA */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (onRequestAccess) onRequestAccess();
              else handleScrollToSection('documents-section');
            }}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-sm shadow-brand-orange/20 cursor-pointer flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="10" height="8" rx="2" />
              <path d="M5.5 6V4.5C5.5 3.12 6.62 2 8 2C9.38 2 10.5 3.12 10.5 4.5V6" />
            </svg>
            <span>Request Access to Reports</span>
          </button>
        </div>

      </div>
    </div>
  );
};
