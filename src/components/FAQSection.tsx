import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FAQ } from '../types';
import { SecurityQuestionnaireModal } from './SecurityQuestionnaireModal';

interface FAQSectionProps {
  faqs?: FAQ[];
  theme?: 'light' | 'dark';
  companyName?: string;
  companyId?: number | string;
  showQuestionnaireBanner?: boolean;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How often do you perform independent third-party penetration testing?',
    answer: 'We conduct full-scope gray-box and black-box penetration tests annually with CREST-accredited external auditors. Quarterly automated vulnerability scanning and continuous dependency monitoring run 24/7/365 across all production environments.'
  },
  {
    id: '2',
    question: 'Where is customer data stored and how is it encrypted?',
    answer: 'All customer data is hosted in ISO 27001 and SOC 2 Type II certified AWS datacenters. Data is encrypted in transit using TLS 1.3 with strict HSTS, and encrypted at rest using AES-256 with automated AWS KMS envelope key rotation.'
  },
  {
    id: '3',
    question: 'What is your vulnerability disclosure and bug bounty policy?',
    answer: 'We operate an active Vulnerability Disclosure Program (VDP). Ethical security researchers can submit findings to our dedicated security engineering team with a guaranteed response SLA within 24 hours.'
  },
  {
    id: '4',
    question: 'What is your incident response and disaster recovery SLA?',
    answer: 'Our Security Operations Center (SOC) operates 24/7 with automated anomaly alerts. Our target Recovery Time Objective (RTO) is under 1 hour and Recovery Point Objective (RPO) is under 15 minutes with immutable daily cross-region backups.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  companyName, 
  companyId,
  showQuestionnaireBanner = false
}) => {
  const [openId, setOpenId] = useState<string | null>('1');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const activeFaqs = (faqs && faqs.length > 0) ? faqs : DEFAULT_FAQS;

  return (
    <div id="faq-section" className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-0.5">
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Security & Compliance FAQs
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
            Direct answers to common procurement, privacy, architecture, and due-diligence questions.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0">
          {activeFaqs.length} Questions Answered
        </span>
      </div>
      
      {/* FAQ Accordion List - Red & Orange Vibrant Style */}
      <div className="space-y-3.5">
        {activeFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`rounded-2xl sm:rounded-[1.25rem] transition-all duration-350 ease-out overflow-hidden select-none ${
                isOpen 
                  ? 'bg-gradient-to-r from-[#FF0000] via-[#FF2600] to-[#FF5500] text-white shadow-xl shadow-red-500/20 border border-transparent' 
                  : 'bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer transition-colors select-none gap-4"
              >
                <span className={`font-bold text-sm sm:text-base tracking-tight leading-snug pr-2 ${
                  isOpen ? 'text-white' : 'text-zinc-900 dark:text-white'
                }`}>
                  {faq.question}
                </span>
                
                {/* 45-degree rotating Plus glyph */}
                <div className={`p-1.5 rounded-xl transition-transform duration-350 ease-out shrink-0 ${
                  isOpen 
                    ? 'rotate-45 text-white' 
                    : 'text-zinc-400 dark:text-zinc-500'
                }`}>
                  <Plus size={16} strokeWidth={2.5} />
                </div>
              </button>

              {/* Smooth Dynamic Content Grid Expansion */}
              <div 
                className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t border-white/20 pt-3 text-white/95 font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Security Questionnaire Banner */}
      {showQuestionnaireBanner && (
        <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="shrink-0 flex items-center justify-center bg-transparent">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Need a Custom Security Assessment or Vendor Questionnaire?
              </h4>
              <p className="text-[11px] text-zinc-500 font-normal mt-0.5">
                Our compliance team supports custom SIG, CAIQ, VSA, and RFP questionnaire workflows.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuestionnaireOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all whitespace-nowrap shadow-md shadow-brand-orange/20 cursor-pointer text-center"
          >
            Contact Security Team
          </button>
        </div>
      )}

      {/* Interactive Modal */}
      <SecurityQuestionnaireModal 
        isOpen={isQuestionnaireOpen} 
        onClose={() => setIsQuestionnaireOpen(false)} 
        companyName={companyName}
        companyId={companyId}
      />
    </div>
  );
};
