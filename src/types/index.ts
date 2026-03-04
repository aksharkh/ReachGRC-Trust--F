// Basic stats interface for UI
export interface SecurityStats {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  controlsPassing: number;
  totalControls: number;
  lastAuditDate: string;
}

// Low-level API types
export interface Control {
  id: number;
  name: string;
  status: 'OK' | 'NOT_OK' | 'PENDING';
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Domain {
  id: number;
  name: string;
  controls: Control[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiCompany {
  id: number;
  companyName: string;
  statement: string;
  domains: Domain[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url?: string;
  requiresVerification: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Enhanced Company interface for the Frontend (includes computed props)
export interface Company extends ApiCompany {
  // Computed/Frontend-only properties
  logoUrl: string;
  stats: SecurityStats;
  certifications?: string[]; // Optional now as API doesn't seem to return them yet
  documents?: Document[];
  faqs?: FAQ[];
}

export interface TrustBadgeProps {
  companyId: string;
  theme?: 'light' | 'dark';
}
