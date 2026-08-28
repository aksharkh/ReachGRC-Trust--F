import type { Company, ApiCompany, SecurityStats } from '../types';

const API_BASE_URL = 'http://localhost:8081/api/trust';

// Helper to calculate stats from the raw API data
const calculateStats = (domains: ApiCompany['domains']): SecurityStats => {
  let totalControls = 0;
  let passingControls = 0;

  domains.forEach(domain => {
    domain.controls.forEach(control => {
      totalControls++;
      if (control.status === 'OK') {
        passingControls++;
      }
    });
  });

  const percentage = totalControls === 0 ? 0 : (passingControls / totalControls) * 100;
  
  let grade: SecurityStats['grade'] = 'F';
  if (percentage >= 97) grade = 'A+';
  else if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';

  return {
    score: Math.round(percentage),
    grade,
    controlsPassing: passingControls,
    totalControls,
    lastAuditDate: new Date().toISOString().split('T')[0], // Default to today since API lacks this
  };
};

export const adaptCompanyData = (apiData: ApiCompany): Company => {
  const stats = calculateStats(apiData.domains);
  
  return {
    ...apiData,
    logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(apiData.companyName)}&background=0D8ABC&color=fff&size=128`,
    stats,
    certifications: [], // Placeholder
    documents: [
      { id: '1', name: 'SOC 2 Type II Report', type: 'PDF', requiresVerification: true },
      { id: '2', name: 'ISO 27001 Certificate', type: 'PDF', requiresVerification: true },
      { id: '3', name: 'Privacy Policy', type: 'Link', requiresVerification: false, url: '#' },
      { id: '4', name: 'Penetration Test Summary', type: 'PDF', requiresVerification: true },
    ],
    faqs: [
      { id: '1', question: 'How often do you perform security audits?', answer: 'We conduct comprehensive security audits annually, with quarterly vulnerability scans.' },
      { id: '2', question: 'Where is customer data stored?', answer: 'All customer data is encrypted at rest and stored in secure AWS data centers located in the US-East region.' },
      { id: '3', question: 'Do you offer a Bug Bounty program?', answer: 'Yes, we have a private bug bounty program. Please contact security@example.com for an invitation.' },
      { id: '4', question: 'What is your data retention policy?', answer: 'Customer data is retained for the duration of the active contract and securely deleted within 30 days of termination.' }
    ]
  };
};

export const fetchCompanyData = async (id: string): Promise<Company | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return null;
    }
    const data: ApiCompany = await response.json();
    return adaptCompanyData(data);
  } catch (error) {
    console.error('Network Error fetching company data:', error);
    return null;
  }
};

const QUESTIONNAIRE_API_URL = 'http://localhost:8081/api/trust/questionnaires';

export const submitSecurityQuestionnaire = async (payload: Partial<import('../types').SecurityQuestionnaire>): Promise<import('../types').SecurityQuestionnaire> => {
  const response = await fetch(QUESTIONNAIRE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit questionnaire: ${response.statusText}`);
  }

  return response.json();
};

export const fetchCompanyQuestionnaires = async (companyId: number): Promise<import('../types').SecurityQuestionnaire[]> => {
  try {
    const response = await fetch(`${QUESTIONNAIRE_API_URL}/company/${companyId}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching company questionnaires:', error);
    return [];
  }
};

export const fetchAllQuestionnaires = async (): Promise<import('../types').SecurityQuestionnaire[]> => {
  try {
    const response = await fetch(QUESTIONNAIRE_API_URL);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    return [];
  }
};

export const updateQuestionnaireStatus = async (id: number, status: string): Promise<import('../types').SecurityQuestionnaire> => {
  const response = await fetch(`${QUESTIONNAIRE_API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update status: ${response.statusText}`);
  }

  return response.json();
};

export const fetchAllActiveCompanies = async (): Promise<Company[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/allActive`);
    if (response.ok) {
      const data: ApiCompany[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(adaptCompanyData);
      }
    }
    // Fallback to allCompanies if allActive is empty or fails
    const fallbackRes = await fetch(`${API_BASE_URL}/allCompanies`);
    if (fallbackRes.ok) {
      const data: ApiCompany[] = await fallbackRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(adaptCompanyData);
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching all active companies:', error);
    return [];
  }
};


