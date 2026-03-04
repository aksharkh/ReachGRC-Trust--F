import { ShieldCheck, Shield } from 'lucide-react';
import type { Company } from '../types';

interface TrustBadgeProps {
  company: Company;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export const TrustBadge = ({ company, onClick, className = '', theme = 'light' }: TrustBadgeProps) => {
  const { stats } = company;
  
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'B': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'C': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const isDark = theme === 'dark';

  return (
    <div 
      onClick={onClick}
      className={`${isDark ? 'bg-slate-900/60 border-white/10 text-slate-200 hover:border-orange-500/40' : 'bg-white border-gray-200 text-gray-900'} rounded-2xl shadow-xl border p-5 max-w-sm cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 font-sans group ${className}`}
    >
      <div className="flex items-center gap-4">
        <img 
          src={company.logoUrl} 
          alt={`${company.companyName} logo`} 
          className={`w-14 h-14 rounded-xl ${isDark ? 'bg-slate-800 ring-1 ring-white/10 shadow-lg' : 'bg-gray-50'}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className={`font-bold truncate text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{company.companyName}</h3>
            <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
          </div>
          <p className={`text-[11px] uppercase tracking-wider font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Security Trust Score</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full border-2 font-black text-sm shadow-inner ${getGradeColor(stats.grade)}`}>
          {stats.grade}
        </div>
      </div>
      
      <div className={`mt-5 flex items-center justify-between text-[11px] uppercase tracking-wider font-medium ${isDark ? 'text-slate-400 border-white/10' : 'text-gray-500 border-gray-100'} pt-4 border-t`}>
        <div className="flex items-center gap-1.5 group-hover:text-orange-400 transition-colors">
          <Shield className="w-3.5 h-3.5" />
          <span>Powered by ReachGRC</span>
        </div>
        <span>{stats.lastAuditDate}</span>
      </div>
    </div>
  );
};
