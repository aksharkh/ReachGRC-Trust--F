import { ShieldCheck, Shield } from 'lucide-react';
import type { Company } from '../types';

interface TrustBadgeProps {
  company: Company;
  onClick?: () => void;
  className?: string;
}

export const TrustBadge = ({ company, onClick, className = '' }: TrustBadgeProps) => {
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

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-sm cursor-pointer hover:shadow-md transition-shadow font-sans ${className}`}
    >
      <div className="flex items-center gap-4">
        <img 
          src={company.logoUrl} 
          alt={`${company.name} logo`} 
          className="w-12 h-12 rounded bg-gray-50"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{company.name}</h3>
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500">Security Trust Score</p>
        </div>
        <div className={`px-3 py-1 rounded-full border font-bold ${getGradeColor(stats.grade)}`}>
          {stats.grade}
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          <span>Powered by ReachGRC</span>
        </div>
        <span>{stats.lastAuditDate}</span>
      </div>
    </div>
  );
};
