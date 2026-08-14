import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const StatusPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const components = [
    {
      name: 'ReachGRC API Gateway',
      status: 'Operational',
      uptime: '100.0%',
      desc: 'API ingestion and credential verification nodes.'
    },
    {
      name: 'Continuous Audit Telemetry Engine',
      status: 'Operational',
      uptime: '99.98%',
      desc: 'Scheduled telemetry collections and integrity validation loops.'
    },
    {
      name: 'Sync Database Cluster',
      status: 'Operational',
      uptime: '100.0%',
      desc: 'Relational storage for GRC compliance posture evidence logs.'
    },
    {
      name: 'Attestation & Signing Service',
      status: 'Operational',
      uptime: '99.99%',
      desc: 'Cryptographic signature and watermark assembly layer.'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-100/70 dark:bg-black text-zinc-700 dark:text-zinc-300 font-sans relative overflow-x-hidden selection:bg-brand-orange/30 selection:text-brand-orange">
      {/* Exquisite Deep Background Effects */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-100/80 to-zinc-100/50 dark:from-zinc-950/40 dark:via-black dark:to-black pointer-events-none" />
      <div className="fixed top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-brand-orange/5 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-brand-red/5 blur-[130px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Header navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={12} />
            Back to Trust Center
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-550 dark:text-zinc-400">ReachGRC Status Monitor</span>
          </div>
        </div>

        {/* Hero operational banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-green-500 to-emerald-600 p-8 sm:p-10 text-white shadow-xl shadow-green-500/10">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_0)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/10 border border-white/20 rounded-2xl">
                <CheckCircle2 size={36} className="text-white" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">All Systems Operational</h1>
                <p className="text-xs text-white/80 font-light">ReachGRC continuous auditing and compliance sync portals are running clean.</p>
              </div>
            </div>
            <div className="text-center sm:text-right px-4 py-2 bg-white/10 border border-white/20 rounded-xl">
              <p className="text-[9px] uppercase tracking-widest font-bold text-white/70">Global Uptime</p>
              <p className="text-lg font-black mt-0.5">99.99%</p>
            </div>
          </div>
        </div>

        {/* System Components List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-brand-orange" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Active Components</h2>
          </div>
          
          <div className="grid gap-5">
            {components.map((comp, idx) => (
              <div
                key={idx}
                className={`p-6 border rounded-[1.8rem] transition-all duration-300 hover:scale-[1.005] ${
                  isDark
                    ? 'card-pattern-dark border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-white shadow-lg'
                    : 'card-pattern-light border-zinc-200 hover:border-zinc-300 bg-white text-zinc-900 shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm tracking-wide">{comp.name}</h3>
                    <p className={`text-[11px] font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{comp.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">90-Day Uptime</p>
                      <p className="text-xs font-black text-brand-orange mt-0.5">{comp.uptime}</p>
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {comp.status}
                    </span>
                  </div>
                </div>

                {/* 90-day graphical representation (simulated grid) */}
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between gap-1">
                  <div className="flex-1 flex gap-0.5 h-4">
                    {Array.from({ length: 45 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-[2px] ${
                          // Let's mock a tiny minor degradation in the past for the Telemetry engine
                          comp.name.includes('Telemetry') && i === 18
                            ? 'bg-brand-orange/60'
                            : 'bg-green-500/80'
                        }`}
                        title={`Day ${45 - i} ago: Clean`}
                      />
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-3">
                    90 Days Ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-zinc-400" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Uptime History (Last 30 Days)</h2>
          </div>
          
          <div className={`p-6 border rounded-[1.8rem] text-center ${
            isDark ? 'bg-zinc-900/20 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">No active incidents or service disruptions reported.</p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-550 mt-1 uppercase tracking-wider">All telemetry feeds are synced in realtime</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-[10px] text-zinc-400/80 dark:text-zinc-600 uppercase tracking-widest pt-8 border-t border-zinc-200/50 dark:border-zinc-900">
          Powered by REACH GRC Status Node • Sync active
        </footer>

      </div>
    </div>
  );
};
