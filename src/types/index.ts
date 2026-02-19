export interface SecurityStats {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  controlsPassing: number;
  totalControls: number;
  lastAuditDate: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  logoUrl: string;
  description: string;
  stats: SecurityStats;
  certifications: string[];
}

export interface TrustBadgeProps {
  companyId: string;
  theme?: 'light' | 'dark';
}
