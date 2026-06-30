import { useState, useEffect } from 'react';
import { Shield, Server, Globe, Database, Smartphone, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import type { Domain } from '../types';

interface SecurityControlsGridProps {
  domains: Domain[];
  theme?: 'light' | 'dark';
}

const getDomainIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('app')) return <Smartphone className="w-4 h-4" />;
  if (n.includes('data')) return <Database className="w-4 h-4" />;
  if (n.includes('network')) return <Globe className="w-4 h-4" />;
  if (n.includes('cloud')) return <Server className="w-4 h-4" />;
  if (n.includes('infra')) return <Server className="w-4 h-4" />;
  return <Shield className="w-4 h-4" />;
};

export const SecurityControlsGrid = ({ domains, theme = 'dark' }: SecurityControlsGridProps) => {
  const [activeTab, setActiveTab] = useState<number | string>('');

  useEffect(() => {
    if (domains && domains.length > 0) {
      setActiveTab(domains[0].id);
    }
  }, [domains]);

  const isDark = theme === 'dark';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-505';

  const selectedDomain = domains.find(d => d.id === activeTab) || domains[0];

  if (!domains || domains.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
          <h2 className={`text-2xl font-black ${textPrimary} tracking-tight uppercase`}>Continuous Monitoring</h2>
        </div>
        <p className={`text-sm ${textSecondary} max-w-3xl leading-relaxed font-light`}>
          Real-time verification of active compliance rules and GRC indicators. Status metrics are synced continuously via our automated telemetry bridge.
        </p>
      </div>

      {/* Horizontal Domain Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none">
        {domains.map((domain) => {
          const isActive = activeTab === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setActiveTab(domain.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                isActive 
                  ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white border-transparent shadow-[0_6px_15px_rgba(255,138,28,0.25)] scale-[1.02]' 
                  : isDark
                    ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-zinc-700'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300'
              }`}
            >
              {getDomainIcon(domain.name)}
              {domain.name}
            </button>
          );
        })}
      </div>

      {/* Controls List for Selected Domain */}
      {selectedDomain && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-3 duration-400">
          {selectedDomain.controls.map((control) => {
            const isOk = control.status === 'OK';
            const isNotOk = control.status === 'NOT_OK';
            
            // Premium styling with status-specific borders and shadow glows
            const cardStyles = isOk 
              ? isDark 
                ? 'bg-zinc-950/40 border-green-500/20 hover:border-green-500/40 shadow-[0_2px_12px_rgba(34,197,94,0.01)] hover:shadow-[0_4px_24px_rgba(34,197,94,0.06)]' 
                : 'bg-zinc-50/60 border-green-500/20 hover:border-green-500/40 shadow-[0_2px_12px_rgba(34,197,94,0.01)] hover:shadow-[0_4px_24px_rgba(34,197,94,0.04)]'
              : isNotOk 
              ? isDark
                ? 'bg-zinc-950/40 border-brand-red/35 hover:border-brand-red/50 shadow-[0_2px_12px_rgba(255,57,24,0.02)] hover:shadow-[0_4px_24px_rgba(255,57,24,0.08)]' 
                : 'bg-zinc-50/60 border-brand-red/25 hover:border-brand-red/45 shadow-[0_2px_12px_rgba(255,57,24,0.02)] hover:shadow-[0_4px_24px_rgba(255,57,24,0.06)]'
              : isDark
                ? 'bg-zinc-950/40 border-brand-orange/30 hover:border-brand-orange/50 shadow-[0_2px_12px_rgba(255,138,28,0.01)] hover:shadow-[0_4px_24px_rgba(255,138,28,0.07)]'
                : 'bg-zinc-50/60 border-brand-orange/25 hover:border-brand-orange/45 shadow-[0_2px_12px_rgba(255,138,28,0.01)] hover:shadow-[0_4px_24px_rgba(255,138,28,0.05)]';

            const statusColor = isOk 
              ? 'text-green-550' 
              : isNotOk 
              ? 'text-brand-red' 
              : 'text-brand-orange';

            const lightBg = isOk 
              ? 'bg-green-500/10' 
              : isNotOk 
              ? 'bg-brand-red/10 animate-pulse' 
              : 'bg-brand-orange/10';

            return (
              <div 
                key={control.id} 
                className={`flex flex-col justify-between p-5 border rounded-2xl transition-all duration-300 hover:scale-[1.01] ${cardStyles} ${
                  isDark ? 'card-pattern-dark text-white' : 'card-pattern-light text-zinc-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-sm tracking-wide leading-snug">{control.name}</h4>
                    {control.remarks && (
                      <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-505'} font-medium`}>
                        {control.remarks}
                      </p>
                    )}
                  </div>
                  
                  {/* Status Indicator Icon */}
                  <div className={`p-1.5 rounded-lg shrink-0 ${lightBg} ${statusColor}`}>
                    {isOk ? <CheckCircle className="w-4 h-4" /> : isNotOk ? <AlertTriangle className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
                  </div>
                </div>

                {/* Footer Metadata row inside the control box */}
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 mt-4 pt-3 text-[10px] text-zinc-450 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOk ? 'bg-green-500' : isNotOk ? 'bg-brand-red' : 'bg-brand-orange'}`} />
                    Continuous audit active
                  </span>
                  <span className="font-semibold uppercase tracking-wider">
                    {isOk ? 'Secured' : isNotOk ? 'Failing' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
