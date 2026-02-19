import { createRoot } from 'react-dom/client';
import { TrustBadge } from './components/TrustBadge';
import { fetchCompanyData } from './services/api';
import './index.css'; // Import styles to inject them

const initWidgets = () => {
  const widgetElements = document.querySelectorAll('[data-reach-trust-widget]');

  widgetElements.forEach(async (el) => {
    const companyId = el.getAttribute('data-company-id');
    if (!companyId) return;

    // Fetch data
    const company = await fetchCompanyData(companyId);
    if (!company) {
      console.error(`ReachGRC Widget: Company ${companyId} not found.`);
      return;
    }

    // Create a shadow root to isolate styles
    // Note: For Tailwind to work in Shadow DOM, we need to inject the styles manually or use a specific strategy.
    // For simplicity in this demo, we'll mount directly but standard practice often uses Shadow DOM.
    // However, Tailwind preflight might conflict. Let's try direct mount first for simplicity, 
    // or we'd need to fetch the CSS file and inject it into the shadow root.
    
    // Changing approach: Mount inside a div, but we need to ensure styles are available.
    // We will build a single JS file that includes CSS injection if possible, 
    // or we distribute a JS + CSS file.
    // For a "single script" experience, we'll stick to direct mounting for now, 
    // acknowledging that global styles *might* bleed if not careful, but Tailwind classes are specific enough.
    
    const root = createRoot(el);
    root.render(
      <div className="reach-trust-widget-container">
        <TrustBadge 
          company={company} 
          onClick={() => {
            const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
            window.open(`${baseUrl}/company/${companyId}`, '_blank');
          }}
        />
      </div>
    );
  });
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidgets);
} else {
  initWidgets();
}
