import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface TelemetryEvent {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  status: 'passed' | 'verified';
}

const telemetryEvents: TelemetryEvent[] = [
  {
    id: '1',
    title: 'Automated SAST & DAST pipeline security scans completed (0 critical / 0 high)',
    source: 'CI/CD Engine',
    timeAgo: '4 mins ago',
    status: 'passed'
  },
  {
    id: '2',
    title: 'AWS KMS envelope encryption keys verified with automated rotation policy',
    source: 'Cloud Security Node',
    timeAgo: '16 mins ago',
    status: 'verified'
  },
  {
    id: '3',
    title: 'Multi-factor authentication (MFA) & SSO enforcement verified across 100% accounts',
    source: 'Identity Engine',
    timeAgo: '32 mins ago',
    status: 'passed'
  },
  {
    id: '4',
    title: 'Continuous Google Sheets catalog synchronization validated and integrity checked',
    source: 'ReachGRC Sync Engine',
    timeAgo: '45 mins ago',
    status: 'verified'
  },
  {
    id: '5',
    title: 'TLS 1.3 cryptographic cipher suite enforcement confirmed on all API ingress routes',
    source: 'Edge Gateway',
    timeAgo: '1 hr ago',
    status: 'passed'
  }
];

export const LiveTelemetryTicker: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % telemetryEvents.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const event = telemetryEvents[currentIndex];

  return (
    <div className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-[#0e111a]/70 border-zinc-800/80 text-zinc-300' 
        : 'bg-zinc-50/90 border-zinc-200/90 text-zinc-700'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left Indicator + Event Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 shrink-0 text-[9px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Live Audit Telemetry</span>
          </div>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <CheckCircle2 size={13} className="text-green-500 shrink-0" />
            <p className="text-xs font-semibold truncate text-zinc-900 dark:text-zinc-100">
              {event.title}
            </p>
          </div>
        </div>

        {/* Right Timestamp & Source metadata */}
        <div className="flex items-center gap-3 shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium self-end sm:self-auto">
          <span className="px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800/80 font-bold uppercase tracking-wider text-[8.5px]">
            {event.source}
          </span>
          <span>{event.timeAgo}</span>
        </div>

      </div>
    </div>
  );
};
