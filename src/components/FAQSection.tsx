import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQ } from '../types';

interface FAQSectionProps {
  faqs?: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>('1');

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">Frequently Asked Questions</h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? 'bg-zinc-100/60 dark:bg-zinc-950/40 border-brand-orange/40 shadow-sm border-l-4 border-l-brand-orange' 
                  : 'bg-zinc-50/45 dark:bg-zinc-900/10 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30 hover:border-zinc-300/80 dark:hover:border-zinc-700'
              } backdrop-blur-sm`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center p-5 text-left cursor-pointer transition-colors select-none"
              >
                <span className={`font-bold transition-colors duration-200 text-sm tracking-wide leading-snug ${isOpen ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-350'}`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-zinc-450 dark:text-zinc-500'}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800/60 mt-1 font-medium">
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
