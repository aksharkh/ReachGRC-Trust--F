import { Shield, Server, Globe, Database, Smartphone } from 'lucide-react';
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OK': return 'bg-green-500';
    case 'NOT_OK': return 'bg-red-500';
    case 'PENDING': return 'bg-yellow-500';
    default: return 'bg-gray-300';
  }
};

export const SecurityControlsGrid = ({ domains, theme = 'dark' }: SecurityControlsGridProps) => {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-slate-800/40 hover:bg-slate-700/60 border-white/10 hover:border-orange-500/30' : 'bg-white hover:bg-gray-50 border-gray-100';
  const iconText = isDark ? 'text-slate-300' : 'text-gray-700';

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className={`text-2xl font-black ${textPrimary} tracking-tight`}>Continuous Monitoring</h2>
        <p className={`text-sm ${textSecondary} max-w-3xl leading-relaxed`}>
          Live status of active security controls. Controls failing tests without resolution for 3+ days are flagged.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domains.map((domain, domainIndex) => (
          <div 
            key={domain.id} 
            className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            style={{ animationDelay: `${domainIndex * 100}ms` }}
          >
            <h3 className={`font-bold ${iconText} flex items-center gap-3 pb-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'} uppercase tracking-widest text-[11px]`}>
              <span className={`p-1.5 rounded-lg ${isDark ? 'bg-slate-800 text-orange-400 ring-1 ring-white/10' : 'bg-gray-100'}`}>
                {getDomainIcon(domain.name)}
              </span>
              {domain.name} Security
            </h3>
            
            <div className="space-y-3 pt-3">
              {domain.controls.map((control) => (
                <div 
                  key={control.id} 
                  className={`flex items-center gap-4 p-4 backdrop-blur-md border rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${cardBg}`}
                >
                  <div className="relative flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full blur-[4px] opacity-60 ${getStatusColor(control.status).replace('bg-','text-')}`} style={{backgroundColor: 'currentColor'}} />
                    <div className={`w-2.5 h-2.5 rounded-full relative z-10 ${getStatusColor(control.status)} shadow-[0_0_5px_rgba(255,255,255,0.5)]`} />
                  </div>
                  <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-gray-700'}`}>{control.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
