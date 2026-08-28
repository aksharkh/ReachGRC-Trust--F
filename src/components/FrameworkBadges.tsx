import React from 'react';

interface FrameworkBadgesProps {
  theme?: 'light' | 'dark';
  detailed?: boolean;
}

interface ComplianceFramework {
  id: string;
  name: string;
  code: string;
  version: string;
  status: string;
  description: string;
  auditScope: string;
  insignia: React.ReactNode;
}

const frameworks: ComplianceFramework[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    code: 'AICPA Trust Criteria',
    version: '2025/2026 Audit',
    status: 'Certified',
    description: 'Independent examination of Security, Availability, and Confidentiality trust service criteria.',
    auditScope: 'TSP 100 Criteria (CC1.0 - CC9.0)',
    insignia: (
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Official AICPA Solid Circular Badge */}
        <circle cx="18" cy="18" r="17" fill="#002D62" />
        <circle cx="18" cy="18" r="14.5" stroke="#C59B27" strokeWidth="1.2" />
        {/* AICPA Arc Header */}
        <text x="18" y="9.8" textAnchor="middle" fill="#FFFFFF" fontSize="3.6" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.12em">AICPA</text>
        {/* Bold Center SOC Mark */}
        <text x="18" y="19.2" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.04em">SOC</text>
        {/* Golden TYPE II Ribbon */}
        <rect x="7" y="21.5" width="22" height="5.5" rx="1.5" fill="#C59B27" />
        <text x="18" y="25.5" textAnchor="middle" fill="#002D62" fontSize="3.4" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.08em">TYPE II</text>
      </svg>
    )
  },
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001',
    code: 'Global ISMS Standard',
    version: '2022 Revision',
    status: 'Certified',
    description: 'Certified Information Security Management System covering organizational and technical security controls.',
    auditScope: 'Annex A 93 Security Controls',
    insignia: (
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Official ISO Red Rounded Square */}
        <rect x="2" y="2" width="32" height="32" rx="7" fill="#D51125" />
        {/* Globe Grid Ellipses */}
        <circle cx="18" cy="18" r="13" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
        <ellipse cx="18" cy="18" rx="7.5" ry="13" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="5" y1="18" x2="31" y2="18" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
        {/* Authentic Bold ISO Text */}
        <text x="18" y="17.8" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.05em">ISO</text>
        {/* Official 27001 ISMS Standard Pill */}
        <rect x="6" y="21.5" width="24" height="5.5" rx="1.5" fill="#1E293B" />
        <text x="18" y="25.5" textAnchor="middle" fill="#FFFFFF" fontSize="3.4" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">IEC 27001</text>
      </svg>
    )
  },
  {
    id: 'gdpr',
    name: 'GDPR / CCPA',
    code: 'Data Privacy Standard',
    version: 'Article 32 & CPRA',
    status: 'Attested',
    description: 'Technical and organizational measures safeguarding data privacy rights and residency governance.',
    auditScope: 'GDPR Art. 32 / CPRA Safeguards',
    insignia: (
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Official European Union Azure Blue Shield */}
        <path d="M18 2L32 6.5V17C32 25.5 25.5 32 18 34C10.5 32 4 25.5 4 17V6.5L18 2Z" fill="#003399" />
        {/* 12 Authentic European Union Gold Stars at 30-deg intervals */}
        <circle cx="18" cy="6.5" r="0.9" fill="#FFCC00" />
        <circle cx="23.75" cy="8" r="0.9" fill="#FFCC00" />
        <circle cx="28" cy="12.25" r="0.9" fill="#FFCC00" />
        <circle cx="29.5" cy="18" r="0.9" fill="#FFCC00" />
        <circle cx="28" cy="23.75" r="0.9" fill="#FFCC00" />
        <circle cx="23.75" cy="28" r="0.9" fill="#FFCC00" />
        <circle cx="18" cy="29.5" r="0.9" fill="#FFCC00" />
        <circle cx="12.25" cy="28" r="0.9" fill="#FFCC00" />
        <circle cx="8" cy="23.75" r="0.9" fill="#FFCC00" />
        <circle cx="6.5" cy="18" r="0.9" fill="#FFCC00" />
        <circle cx="8" cy="12.25" r="0.9" fill="#FFCC00" />
        <circle cx="12.25" cy="8" r="0.9" fill="#FFCC00" />
        {/* Center GDPR Attestation Typography */}
        <text x="18" y="17.2" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">GDPR</text>
        <rect x="9.5" y="20.5" width="17" height="4.5" rx="1.2" fill="#FFCC00" />
        <text x="18" y="23.8" textAnchor="middle" fill="#003399" fontSize="2.8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">COMPLIANT</text>
      </svg>
    )
  },
  {
    id: 'hipaa',
    name: 'HIPAA Ready',
    code: 'Security & Privacy Rule',
    version: 'ePHI Safeguards',
    status: 'Verified',
    description: 'Administrative, physical, and technical safeguards for safeguarding Protected Health Information (ePHI).',
    auditScope: '45 CFR §164.308 / §164.312',
    insignia: (
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Official Healthcare Blue Shield */}
        <path d="M18 2L32 6.5V17C32 25.5 25.5 32 18 34C10.5 32 4 25.5 4 17V6.5L18 2Z" fill="#0A3663" />
        <path d="M18 4L29.5 7.8V17C29.5 24 24.2 29.5 18 31.5C11.8 29.5 6.5 24 6.5 17V7.8L18 4Z" stroke="#00B4D8" strokeWidth="1.2" />
        {/* Medical Cross in Top Half */}
        <path d="M16 8H20V11.5H23.5V15.5H20V19H16V15.5H12.5V11.5H16V8Z" fill="#00B4D8" fillOpacity="0.4" stroke="#00B4D8" strokeWidth="0.8" />
        {/* Official HIPAA Banner */}
        <rect x="5.5" y="17" width="25" height="6.5" rx="1.5" fill="#00B4D8" />
        <text x="18" y="22" textAnchor="middle" fill="#0A3663" fontSize="4.6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">HIPAA</text>
        {/* Verified Sub-label */}
        <text x="18" y="28" textAnchor="middle" fill="#90E0EF" fontSize="3" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">VERIFIED</text>
      </svg>
    )
  },
  {
    id: 'pci',
    name: 'PCI-DSS v4.0',
    code: 'Payment Data Security',
    version: 'Level 1 Merchant',
    status: 'Compliant',
    description: 'End-to-end tokenization and cryptographic isolation of payment and transaction workflows.',
    auditScope: 'Cardholder Data Environment (CDE) Isolation',
    insignia: (
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Official PCI Security Standards Emblem */}
        <rect x="2" y="2" width="32" height="32" rx="6" fill="#0F284E" />
        <rect x="3.5" y="3.5" width="29" height="29" rx="5" stroke="#E63946" strokeWidth="1.2" />
        {/* Lock Shackle */}
        <path d="M18 6.5C16.34 6.5 15 7.84 15 9.5V11H21V9.5C21 7.84 19.66 6.5 18 6.5Z" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.6" />
        {/* Official PCI Letters */}
        <text x="18" y="16.8" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.04em">PCI</text>
        {/* Official Red DSS Banner */}
        <rect x="5" y="19.5" width="26" height="6.5" rx="1.5" fill="#E63946" />
        <text x="18" y="24.2" textAnchor="middle" fill="#FFFFFF" fontSize="3.8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">DSS v4.0</text>
      </svg>
    )
  }
];

export const FrameworkBadges: React.FC<FrameworkBadgesProps> = ({ 
  theme = 'light',
  detailed = false
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-4 font-sans">
      {/* Refined Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-0.5">
            <span>Attestations & Audits</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Compliance Frameworks & Certifications
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
            Verified third-party audit reports, accredited standards, and continuous compliance posture.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
          5 Standards Passing
        </span>
      </div>

      {/* Responsive Grid of Framework Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {frameworks.map((fw) => (
          <div
            key={fw.id}
            className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between group ${
              isDark 
                ? 'bg-zinc-900/40 hover:bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 shadow-sm' 
                : 'bg-white hover:bg-zinc-50/80 border-zinc-200/80 hover:border-zinc-300 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]'
            }`}
          >
            <div>
              {/* Header with Framework Insignia + Certified Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="shrink-0 group-hover:scale-105 transition-transform bg-transparent">
                  {fw.insignia}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {fw.status}
                </span>
              </div>

              {/* Standard Code Category */}
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-0.5">
                {fw.code}
              </span>

              {/* Framework Title */}
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                {fw.name}
              </h3>

              {/* Detailed Scope Info */}
              {detailed && (
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 font-mono line-clamp-2 leading-relaxed">
                  {fw.auditScope}
                </p>
              )}
            </div>

            {/* Version & Verified Attestation */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="truncate max-w-[110px] font-mono text-[9.5px]">{fw.version}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Posture
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
