import React from 'react';
import { Calendar, CheckCircle2, Circle, Play } from 'lucide-react';

interface ComplianceJourneyProps {
  theme?: 'light' | 'dark';
}

export const ComplianceJourney: React.FC<ComplianceJourneyProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  const milestones = [
    {
      title: 'GRC Core Control Architecture Established',
      date: 'Jan 15, 2026',
      status: 'completed',
      description: 'Defined and mapped base compliance standards covering initial security domains.'
    },
    {
      title: 'Real-time Telemetry Synchronization Enabled',
      date: 'Mar 10, 2026',
      status: 'completed',
      description: 'Integrated Google Sheets automated catalog updates overriding static evidence.'
    },
    {
      title: 'External Attestation & Auditor Review',
      date: 'May 04, 2026',
      status: 'completed',
      description: 'Independent third-party assessor verification completed with full attestation.'
    },
    {
      title: 'Continuous Monitoring & Live Trust State',
      date: 'Jun 22, 2026',
      status: 'active',
      description: 'Active continuous posture state verified daily. Live security telemetry feeds.'
    },
    {
      title: 'Upcoming ISO 27001 Assessment Renewal',
      date: 'Nov 12, 2026',
      status: 'scheduled',
      description: 'Scheduled re-evaluation of system networks and database partitions.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-lg">
          <Calendar size={16} />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">
          The Compliance Journey
        </h2>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800/80 space-y-8 ml-3 py-2">
        {milestones.map((item, index) => {
          const isCompleted = item.status === 'completed';
          const isActive = item.status === 'active';
          
          return (
            <div key={index} className="relative group/timeline animate-in fade-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 80}ms` }}>
              {/* Timeline Bullet Indicator */}
              <div className="absolute -left-[38px] sm:-left-[46px] top-1 z-20 flex items-center justify-center">
                {isCompleted && (
                  <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center shadow-md">
                    <CheckCircle2 size={12} className="fill-current bg-transparent" />
                  </div>
                )}
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/40 text-brand-orange flex items-center justify-center shadow-[0_0_12px_rgba(255,138,28,0.3)] animate-pulse">
                    <Play size={8} className="fill-current rotate-90 ml-[1px]" />
                  </div>
                )}
                {item.status === 'scheduled' && (
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-650 flex items-center justify-center shadow-sm">
                    <Circle size={8} className="fill-current" />
                  </div>
                )}
              </div>

              {/* Timeline item card */}
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.005] ${
                isActive 
                  ? 'bg-brand-orange/5 border-brand-orange/30 shadow-[0_4px_20px_rgba(255,138,28,0.03)] border-l-4 border-l-brand-orange' 
                  : isDark
                    ? 'bg-zinc-900/10 border-zinc-800/80 hover:bg-zinc-900/30 hover:border-zinc-700/80 text-zinc-300'
                    : 'bg-zinc-50/45 border-zinc-200/80 hover:bg-zinc-100/50 hover:border-zinc-300/80 text-zinc-750'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm tracking-wide leading-snug ${
                      isActive ? 'text-brand-orange' : isDark ? 'text-zinc-100' : 'text-zinc-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border w-fit ${
                    isCompleted ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' :
                    isActive ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' :
                    'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                  }`}>
                    {item.date}
                  </span>
                </div>
                
                <p className={`text-[11px] mt-2 leading-relaxed font-light ${
                  isDark ? 'text-zinc-400' : 'text-zinc-550'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
