import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { TrustCenterContainer } from './components/TrustCenterContainer';
import { adaptCompanyData } from './services/api';
import { ThemeProvider } from './ThemeContext';
import type { Company } from './types';
import './index.css';

const Widget = ({ apiKey }: { apiKey?: string }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!apiKey) {
        setError("API Key is required to view this widget.");
        setLoading(false);
        return;
      }

      try {
        let companyData: Company | null = null;
        let targetId: string | null = null;

        // Fetch company profile via API key auth
        const response = await fetch("http://localhost:8081/api/trust/public/me", {
          headers: {
            "x-api-key": apiKey
          }
        });
        if (response.ok) {
          const rawJson = await response.json();
          companyData = adaptCompanyData(rawJson);
          if (companyData) {
            targetId = String(companyData.id);
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          setError(errData.error || "Authentication failed.");
          setLoading(false);
          return;
        }

        if (!companyData || !targetId) {
          setError("Security Profile Not Found");
          setLoading(false);
          return;
        }

        // Fetch GRC resources using database ID
        const resResponse = await fetch(`http://localhost:8081/api/trust/${targetId}/resources/all`);
        const resourcesData = resResponse.ok ? await resResponse.json() : { resources: [] };

        setCompany(companyData);
        if (resourcesData && resourcesData.resources) {
          setResources(resourcesData.resources);
        }
      } catch (err) {
        console.error("Widget initialization failed:", err);
        setError("Network error initializing widget.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apiKey]);

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
  if (error || !company) return (
    <div className="p-5 text-center text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-lg mx-auto font-sans uppercase tracking-wider">
      {error || "Security Profile Not Found"}
    </div>
  );

  return <TrustCenterContainer company={company} resources={resources} />;
};

// Dynamically inject GRC styles relative to the script location
const injectStyles = () => {
  const cssId = 'reachgrc-trust-widget-css';
  if (document.getElementById(cssId)) return;

  let baseUrl = 'http://localhost:5173/widget';
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].src;
    if (src && src.includes('widget.umd.js')) {
      baseUrl = src.substring(0, src.lastIndexOf('/'));
      break;
    }
  }

  const link = document.createElement('link');
  link.id = cssId;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `${baseUrl}/reachgrc-trust.css`;
  document.head.appendChild(link);
};

// Find all elements with the widget attribute
const initWidgets = () => {
    injectStyles();

    const widgetElements = document.querySelectorAll('[data-reach-trust-widget]');
    
    widgetElements.forEach((el) => {
      const apiKey = el.getAttribute('data-api-key');
      
      // Prevent double initialization
      if (el.getAttribute('data-widget-initialized') === 'true') return;
      el.setAttribute('data-widget-initialized', 'true');

      const root = createRoot(el);
      root.render(
        <React.StrictMode>
          <ThemeProvider>
            <Widget apiKey={apiKey || undefined} />
          </ThemeProvider>
        </React.StrictMode>
      );
    });
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidgets);
} else {
  initWidgets();
}
