import { useState } from 'react';
import { Terminal, Code, Server, Copy, Check } from 'lucide-react';

export const DeveloperGuide = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const widgetCode = `<!-- 1. Add this script tag just before the closing </body> tag -->
<script src="https://trust.yourcompany.com/widget/widget.umd.js" async></script>

<!-- 2. Place this div wherever you want the trust badge to appear -->
<div 
  data-reach-trust-widget 
  data-company-id="YOUR_COMPANY_ID_HERE"
></div>`;

  const apiCode = `fetch('https://api.reachgrc.com/v1/trust/companies/YOUR_COMPANY_ID')
  .then(response => response.json())
  .then(data => console.log(data.stats.score));`;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Developer Integration Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Integrate ReachGRC Trust capabilities directly into your own applications, websites, and workflows using our embeddable widgets or REST API.
          </p>
        </header>

        {/* Section 1: The Widget */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Code className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Embeddable UI Widget</h2>
            </div>
            <p className="text-gray-600 mt-2">
              The fastest way to show your security posture. Drop these two lines of code into any HTML page (like Webflow, WordPress, or standard HTML) to render the Trust Badge.
            </p>
          </div>
          
          <div className="p-8 bg-slate-900 text-slate-300 relative">
            <button 
              onClick={() => copyToClipboard(widgetCode, 'widget')}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors flex items-center gap-2 text-sm"
            >
              {copiedId === 'widget' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'widget' ? 'Copied!' : 'Copy Code'}
            </button>
            <pre className="overflow-x-auto text-sm leading-relaxed font-mono">
              <code dangerouslySetInnerHTML={{ __html: widgetCode.replace(/</g, '&lt;').replace(/>/g, '&gt;') }} />
            </pre>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> Replace <code className="bg-gray-200 px-1 rounded text-gray-700">YOUR_COMPANY_ID_HERE</code> with the ID provided in your ReachGRC dashboard.
            </p>
          </div>
        </section>

        {/* Section 2: Full Page Link */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Hosted Trust Center</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Don't want to build your own page? We host a premium, interactive full-page Trust Center for you. Simply link to it from your website footer.
            </p>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl">
               <code className="text-gray-800 font-mono flex-1">https://trust.reachgrc.com/company/YOUR_COMPANY_ID</code>
               <button 
                onClick={() => copyToClipboard('https://trust.reachgrc.com/company/YOUR_COMPANY_ID', 'url')}
                className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
               >
                 {copiedId === 'url' ? 'Copied' : 'Copy URL'}
               </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              We highly recommend setting up a custom subdomain (e.g., <code className="bg-gray-50 px-1 rounded border border-gray-100">trust.yourcompany.com</code>) via CNAME record in your DNS settings. Contact support to configure this.
            </p>
        </section>

        {/* Section 3: REST API */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">REST API Access</h2>
            </div>
            <p className="text-gray-600 mt-2">
              For complete control, fetch your live security data direct from our API and build your own custom UI.
            </p>
          </div>
          
          <div className="p-8 bg-slate-900 text-slate-300 relative">
             <button 
              onClick={() => copyToClipboard(apiCode, 'api')}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors flex items-center gap-2 text-sm"
            >
              {copiedId === 'api' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'api' ? 'Copied!' : 'Copy Code'}
            </button>
            <pre className="overflow-x-auto text-sm leading-relaxed font-mono">
              <code>{apiCode}</code>
            </pre>
          </div>
          
           <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm">Response structure summary:</h4>
            <div className="bg-white border border-gray-200 p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs text-gray-600 font-mono">
{`{
  "id": 1,
  "companyName": "TechCorp",
  "stats": {
    "score": 98,
    "grade": "A+",
    "controlsPassing": 142,
    "totalControls": 145
  },
  "domains": [ ... ]
}`}
              </pre>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
