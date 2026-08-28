import React from 'react';
import { FaAws } from 'react-icons/fa6';
import { SiCloudflare, SiDatadog, SiStripe } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

interface Subprocessor {
  name: string;
  category: string;
  purpose: string;
  location: string;
  certifications: string[];
  encryption: string;
  dpaStatus: string;
  technicalDetails: string;
  logoGlyph: React.ReactNode;
}

const subprocessorsList: Subprocessor[] = [
  {
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud Infrastructure & Hosting',
    purpose: 'Virtual cloud compute, relational database partitions, and encrypted backup snapshots.',
    location: 'US & EU Multi-Region',
    certifications: ['SOC 2 Type II', 'ISO 27001', 'PCI-DSS', 'HIPAA'],
    encryption: 'AES-256-GCM • TLS 1.3 Strict',
    dpaStatus: 'DPA Executed (SCCs)',
    technicalDetails: 'VPC isolation, Multi-AZ encrypted partitions, automated KMS key rotation.',
    logoGlyph: <FaAws className="w-6 h-6 text-[#FF9900]" />
  },
  {
    name: 'Cloudflare',
    category: 'Edge CDN & DDoS Security',
    purpose: 'Distributed edge caching, Web Application Firewall (WAF), and automated DDoS mitigation.',
    location: 'Global Anycast (300+ Cities)',
    certifications: ['SOC 2 Type II', 'ISO 27001', 'PCI-DSS L1'],
    encryption: 'TLS 1.3 Strict • HSTS • Zero-Log',
    dpaStatus: 'DPA Executed (GDPR Art. 28)',
    technicalDetails: 'Edge SSL termination, Rate Limiting, OWASP Top 10 automated WAF rule enforcement.',
    logoGlyph: <SiCloudflare className="w-6 h-6 text-[#F38020]" />
  },
  {
    name: 'Google Workspace',
    category: 'Corporate Identity & SSO',
    purpose: 'Enterprise identity verification, single sign-on (SSO), and internal communications.',
    location: 'Global Multi-Region',
    certifications: ['SOC 2 / SOC 3', 'ISO 27001', 'FedRAMP'],
    encryption: 'AES-256 At Rest • TLS 1.3',
    dpaStatus: 'DPA Executed with Enterprise BAA',
    technicalDetails: 'SAML 2.0 / OIDC Identity provider, Hardware FIDO2 MFA enforcement.',
    logoGlyph: <FcGoogle className="w-6 h-6" />
  },
  {
    name: 'Datadog',
    category: 'Security Telemetry & Observability',
    purpose: 'Continuous infrastructure metrics, audit log aggregation, and real-time anomaly alerts.',
    location: 'US & EU Cloud',
    certifications: ['SOC 2 Type II', 'ISO 27001', 'HIPAA BAA'],
    encryption: 'AES-256 Encrypted',
    dpaStatus: 'DPA Executed with PII Scrubbing',
    technicalDetails: 'Agent-based audit trail telemetry, SIEM log aggregation with 365-day cold retention.',
    logoGlyph: <SiDatadog className="w-6 h-6 text-[#632CA6]" />
  },
  {
    name: 'Stripe',
    category: 'Payment Infrastructure',
    purpose: 'Cardholder payment tokenization and subscription billing processing.',
    location: 'Global Cloud (PCI Compliant)',
    certifications: ['PCI-DSS Level 1', 'SOC 2 Type II'],
    encryption: 'End-to-End Cryptographic Token',
    dpaStatus: 'DPA Executed (PCI Service Provider)',
    technicalDetails: 'Zero raw cardholder data ingestion, client-side Elements tokenization.',
    logoGlyph: <SiStripe className="w-6 h-6 text-[#635BFF]" />
  }
];

export const SubprocessorsSection: React.FC<{ theme?: 'light' | 'dark'; detailed?: boolean }> = ({ 
  theme = 'light',
  detailed = false
}) => {
  const isDark = theme === 'dark';

  return (
    <div id="subprocessors-section" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-0.5">
            <span>Third-Party Risk & Privacy</span>
            {detailed && (
              <span className="text-zinc-400 dark:text-zinc-500">• DPA Binding</span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Verified Subprocessors & Infrastructure
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
            Third-party cloud infrastructure providers evaluated under continuous vendor risk assessments and DPA agreements.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
          {subprocessorsList.length} Verified Vendors
        </span>
      </div>

      {/* High-Density Enterprise Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subprocessorsList.map((sp, idx) => {
          const isLastOdd = (idx === subprocessorsList.length - 1) && (subprocessorsList.length % 2 !== 0);

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.005] ${
                isLastOdd ? 'md:col-span-2' : ''
              } ${
                isDark 
                  ? 'bg-zinc-900/40 hover:bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 shadow-sm' 
                  : 'bg-white hover:bg-zinc-50/80 border-zinc-200/80 hover:border-zinc-300 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]'
              }`}
            >
            {/* Header: Logo Glyph + Name + Status */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="shrink-0 flex items-center justify-center bg-transparent">
                  {sp.logoGlyph}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                    {sp.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    {sp.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Assessed</span>
              </div>
            </div>

            {/* Purpose */}
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal mb-3">
              {sp.purpose}
            </p>

            {/* Detailed Architecture Spec */}
            {detailed && (
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono border border-zinc-200/80 dark:border-zinc-800 mb-3 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-wider text-[9.5px]">
                  <span>ISOLATION & DPA SPEC:</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 font-sans text-[11px] leading-relaxed">
                  {sp.technicalDetails}
                </p>
                <div className="text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold pt-0.5">
                  ✓ {sp.dpaStatus}
                </div>
              </div>
            )}

            {/* Technical Metadata Row (Clean Monospace Chips, No Generic AI Icons) */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px] font-mono">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 truncate">
                <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-[9.5px]">REGION:</span>
                <span className="text-zinc-700 dark:text-zinc-300 truncate">{sp.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 truncate">
                <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-[9.5px]">CIPHER:</span>
                <span className="text-zinc-700 dark:text-zinc-300 truncate font-semibold">{sp.encryption}</span>
              </div>
            </div>

            {/* Certifications badges */}
            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
              {sp.certifications.map((cert, cIdx) => (
                <span
                  key={cIdx}
                  className="px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
                >
                  {cert}
                </span>
              ))}
            </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
