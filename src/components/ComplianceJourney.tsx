import React from 'react';
import { CheckCircle2, Circle, Play, FileCode } from 'lucide-react';
import type { JourneyMilestone } from '../types';

interface ComplianceJourneyProps {
  theme?: 'light' | 'dark';
  milestones?: JourneyMilestone[];
  detailed?: boolean;
}

interface MilestoneWithTech extends JourneyMilestone {
  auditStandard?: string;
  assessorMethod?: string;
}

const DEFAULT_MILESTONES: MilestoneWithTech[] = [
  {
    id: 1,
    title: 'GRC Core Control Architecture Established',
    date: 'Jan 15, 2026',
    status: 'completed',
    description: 'Defined and mapped base compliance standards covering initial security domains.',
    auditStandard: 'AICPA Trust Services Criteria (Security & Confidentiality)',
    assessorMethod: 'Architectural gap assessment and threat model validation.'
  },
  {
    id: 2,
    title: 'Real-time Telemetry Synchronization Enabled',
    date: 'Mar 10, 2026',
    status: 'completed',
    description: 'Integrated Google Sheets automated catalog updates overriding static evidence.',
    auditStandard: 'SOC 2 CC7.1 / CC7.2 (Continuous Monitoring)',
    assessorMethod: 'Automated REST webhook integrity verification and data schema synchronization.'
  },
  {
    id: 3,
    title: 'External Attestation & Auditor Review',
    date: 'May 04, 2026',
    status: 'completed',
    description: 'Independent third-party assessor verification completed with full attestation.',
    auditStandard: 'AICPA SOC 2 Type II Examination Standard',
    assessorMethod: 'Independent third-party CPA audit firm sampling and operating effectiveness tests.'
  },
  {
    id: 4,
    title: 'Continuous Monitoring & Live Trust State',
    date: 'Jun 22, 2026',
    status: 'active',
    description: 'Active continuous posture state verified daily. Live security telemetry feeds.',
    auditStandard: 'ISO/IEC 27001:2022 ISMS Clause 9.1 (Performance Evaluation)',
    assessorMethod: 'Daily automated continuous compliance telemetry and anomaly detection.'
  },
  {
    id: 5,
    title: 'Upcoming ISO 27001 Assessment Renewal',
    date: 'Nov 12, 2026',
    status: 'scheduled',
    description: 'Scheduled re-evaluation of system networks and database partitions.',
    auditStandard: 'ISO/IEC 27001:2022 Surveillance Audit',
    assessorMethod: 'Full accredited certification body ISMS surveillance inspection.'
  }
];

export const ComplianceJourney: React.FC<ComplianceJourneyProps> = ({ 
  theme = 'light',
  milestones: propMilestones,
  detailed = false
}) => {
  const isDark = theme === 'dark';
  const activeMilestones = (propMilestones && propMilestones.length > 0) ? propMilestones : DEFAULT_MILESTONES;

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-0.5">
            <span>Audit Lifecycle</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            The Compliance Journey
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
            Historical audit stages, active surveillance cycles, and upcoming accreditation reviews.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
          {activeMilestones.length} Roadmap Stages
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-6 ml-3 py-2">
        {activeMilestones.map((item: any, index: number) => {
          const isCompleted = item.status === 'completed';
          const isActive = item.status === 'active';
          
          return (
            <div key={item.id || index} className="relative group/timeline animate-in fade-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 80}ms` }}>
              {/* Timeline Bullet Indicator */}
              <div className="absolute -left-[38px] sm:-left-[46px] top-1 z-20 flex items-center justify-center">
                {isCompleted && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-md">
                    <CheckCircle2 size={12} className="fill-current bg-transparent" />
                  </div>
                )}
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/40 text-brand-orange flex items-center justify-center shadow-[0_0_12px_rgba(255,138,28,0.3)] animate-pulse">
                    <Play size={8} className="fill-current rotate-90 ml-[1px]" />
                  </div>
                )}
                {item.status === 'scheduled' && (
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 flex items-center justify-center shadow-sm">
                    <Circle size={8} className="fill-current" />
                  </div>
                )}
              </div>

              {/* Timeline item card */}
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.005] ${
                isActive 
                  ? 'bg-white dark:bg-zinc-900/60 border-brand-orange/40 dark:border-brand-orange/50 shadow-[0_4px_16px_rgba(255,138,28,0.06)] border-l-3 border-l-brand-orange' 
                  : isDark
                    ? 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/60 hover:border-zinc-700 text-zinc-300'
                    : 'bg-white border-zinc-200/80 hover:bg-zinc-50/80 hover:border-zinc-300 text-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-sm tracking-wide leading-snug ${
                      isActive ? 'text-brand-orange' : isDark ? 'text-zinc-100' : 'text-zinc-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border w-fit ${
                    isCompleted ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' :
                    isActive ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' :
                    'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                  }`}>
                    {item.date}
                  </span>
                </div>
                
                <p className={`text-xs mt-2 leading-relaxed font-normal ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {item.description}
                </p>

                {/* DETAILED MODE: Attestation Standard & Audit Methodology */}
                {detailed && (item.auditStandard || DEFAULT_MILESTONES[index]?.auditStandard) && (
                  <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 space-y-1 text-[10px] font-mono text-zinc-500">
                    <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                      <FileCode size={11} />
                      <span>Audit Benchmark: {item.auditStandard || DEFAULT_MILESTONES[index]?.auditStandard}</span>
                    </div>
                    <p className="text-zinc-400 font-sans text-[10.5px]">
                      Methodology: {item.assessorMethod || DEFAULT_MILESTONES[index]?.assessorMethod}
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
