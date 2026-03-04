import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { TrustCenterContainer } from './components/TrustCenterContainer';
import { fetchCompanyData } from './services/api'; 
import type { Company } from './types';
import './index.css';

const Widget = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData(companyId).then((data) => {
      setCompany(data);
      setLoading(false);
    });
  }, [companyId]);

  if (loading) return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-lg max-w-6xl mx-auto font-sans animate-pulse">
      <div className="space-y-6">
        <div className="h-24 bg-slate-800 rounded-xl"></div>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4 lg:col-span-3 h-48 bg-slate-800 rounded-xl"></div>
          <div className="md:col-span-8 lg:col-span-9 h-64 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
  if (!company) return <div className="p-4 text-center text-sm text-red-400 font-sans bg-slate-900 rounded-2xl border border-red-900/50">Security Profile Not Found</div>;

  return <TrustCenterContainer company={company} />;
};


// Find all elements with the widget attribute
const initWidgets = () => {
    const widgetElements = document.querySelectorAll('[data-reach-trust-widget]');
    
    widgetElements.forEach((el) => {
      const companyId = el.getAttribute('data-company-id');
      
      if (companyId) {
        // Prevent double initialization
        if (el.getAttribute('data-widget-initialized') === 'true') return;
        el.setAttribute('data-widget-initialized', 'true');

        const root = createRoot(el);
        root.render(
          <React.StrictMode>
            <Widget companyId={companyId} />
          </React.StrictMode>
        );
      }
    });
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidgets);
} else {
  initWidgets();
}
