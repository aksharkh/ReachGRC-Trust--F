import type { Company } from '../types';

const MOCK_COMPANIES: Record<string, Company> = {
  '1': {
    id: '1',
    name: 'Acme Corp',
    domain: 'acme.com',
    logoUrl: 'https://ui-avatars.com/api/?name=Acme+Corp&background=0D8ABC&color=fff',
    description: 'Leader in widget manufacturing and security.',
    stats: {
      score: 98,
      grade: 'A+',
      controlsPassing: 145,
      totalControls: 150,
      lastAuditDate: '2023-10-15',
    },
    certifications: ['SOC2 Type II', 'ISO 27001', 'GDPR'],
  },
  '2': {
    id: '2',
    name: 'Globex Inc',
    domain: 'globex.com',
    logoUrl: 'https://ui-avatars.com/api/?name=Globex+Inc&background=EB4D4B&color=fff',
    description: 'Global logistics and shipping partner.',
    stats: {
      score: 85,
      grade: 'B',
      controlsPassing: 110,
      totalControls: 150,
      lastAuditDate: '2023-09-01',
    },
    certifications: ['ISO 27001'],
  },
};

export const fetchCompanyData = async (id: string): Promise<Company | null> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_COMPANIES[id] || null;
};
