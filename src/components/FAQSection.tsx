import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../types';

interface FAQSectionProps {
  faqs?: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-orange-500/30' : 'bg-slate-800/30 border-white/5 hover:bg-slate-800/50 hover:border-white/10'} backdrop-blur-sm`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className={`font-semibold transition-colors duration-200 ${isOpen ? 'text-white' : 'text-slate-300'}`}>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : 'text-slate-500'}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
