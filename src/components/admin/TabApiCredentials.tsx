import React, { useState } from 'react';
import { Key, RefreshCw, Eye, EyeOff, Copy, Check, Clock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import type { Company } from '../../types';

interface TabApiCredentialsProps {
  company: Company;
  handleRegenerateKey: () => Promise<void>;
  handleToggleKeyStatus: () => Promise<void>;
}

/**
 * TabApiCredentials Component
 * Manages API rotation keys, credentials activation states, and copy-to-clipboard actions,
 * alongside developers curl and HTML widget instructions.
 */
export const TabApiCredentials: React.FC<TabApiCredentialsProps> = ({
  company,
  handleRegenerateKey,
  handleToggleKeyStatus,
}) => {
  const [keyVisible, setKeyVisible] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  const copyKeyToClipboard = () => {
    if (company.apiKey) {
      navigator.clipboard.writeText(company.apiKey).catch(() => {});
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
      toast.success("API key copied!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Header and Rotate action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#1f2438]/80 pb-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Key size={18} className="text-brand-orange" />
            Access Token Manager
          </h2>
          <p className="text-xs text-zinc-550 mt-1 font-light">Rotate credentials and verify API authentication flows.</p>
        </div>
        <button
          onClick={handleRegenerateKey}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-[#090b11] dark:hover:bg-[#1c1f2d] border border-zinc-200 dark:border-[#1f2438] text-zinc-850 dark:text-white transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw size={12} />
          Rotate Token
        </button>
      </div>

      {/* Metric Dashboard */}
      <div className="space-y-4">
        {/* Large details card */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] relative group transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
          <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-555 uppercase tracking-widest">Active Client Widget Key</p>
          <p className="text-xl font-black text-zinc-900 dark:text-white mt-1.5">
            {company.apiKey ? "rgc_••••••••••••••••••••••••••••••••" : "No Token Issued"}
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> API Endpoint Authorized
            </span>
          </p>
        </div>
        
        {/* Metric columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Credential Status</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className={`w-2 h-2 rounded-full ${company.apiKeyStatus === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-zinc-455'}`} />
              <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                {company.apiKeyStatus || 'INACTIVE'}
              </span>
            </div>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider">Days Until Expiry</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">
              {company.apiKeyExpiresAt 
                ? `${Math.max(0, Math.ceil((new Date(company.apiKeyExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} Days`
                : 'Never'}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-555 uppercase tracking-wider">Authentication Class</p>
            <p className="text-xs font-black uppercase tracking-wider text-brand-orange mt-2">WIDGET KEY</p>
          </div>
        </div>
      </div>

      {/* Copy credential box */}
      <div className="bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-2xl overflow-hidden">
        <div className="px-4 py-2.5 bg-zinc-100/50 dark:bg-[#090b11]/60 border-b border-zinc-200 dark:border-[#1f2438]/80 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-550">Active API key credential</span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
            company.apiKeyStatus === 'ACTIVE'
              ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-500/20'
              : 'bg-brand-red/10 text-brand-red border border-brand-red/20'
          }`}>
            {company.apiKeyStatus || 'INACTIVE'}
          </span>
        </div>
        
        <div className="p-4 flex items-center justify-between gap-4">
          <span className="font-mono text-sm tracking-wider text-zinc-800 dark:text-zinc-200 truncate select-all">
            {company.apiKey 
              ? (keyVisible ? company.apiKey : `rgc_•${"•".repeat(27)}`) 
              : "No token issued. Click Rotate Token."}
          </span>
          
          {company.apiKey && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setKeyVisible(!keyVisible)}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-[#090b11] hover:bg-zinc-200 dark:hover:bg-[#1c1f2d] text-zinc-505 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {keyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={copyKeyToClipboard}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-[#090b11] hover:bg-zinc-200 dark:hover:bg-[#1c1f2d] text-zinc-505 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {keyCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Revocation trigger info */}
      {company.apiKey && (
        <div className="flex items-center justify-between p-4 bg-zinc-50/20 dark:bg-[#090b11]/40 border border-zinc-200 dark:border-[#1f2438]/80 rounded-xl flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">Temporary Key Expiry</p>
            <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock size={12} /> Issued: {company.apiKeyIssuedAt ? new Date(company.apiKeyIssuedAt).toLocaleDateString() : 'N/A'}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> Expires: {company.apiKeyExpiresAt ? new Date(company.apiKeyExpiresAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleToggleKeyStatus}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-[#1f2438] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-750 dark:text-zinc-300 transition-all cursor-pointer flex items-center gap-2"
          >
            <Shield size={12} className="text-brand-orange" />
            {company.apiKeyStatus === 'ACTIVE' ? "Revoke API Key" : "Activate API Key"}
          </button>
        </div>
      )}

      {/* Interactive Developer Sandbox / Code Snippets */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            Developer Integration Code Examples
          </h3>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            Public REST Endpoints
          </span>
        </div>

        <DeveloperCodeSnippets apiKey={company.apiKey || 'rgc_demo_key'} companyId={company.id} />
      </div>
    </div>
  );
};

interface SnippetProps {
  apiKey: string;
  companyId: number | string;
}

const DeveloperCodeSnippets: React.FC<SnippetProps> = ({ apiKey, companyId }) => {
  const [activeLang, setActiveLang] = useState<'curl' | 'js' | 'python' | 'widget'>('curl');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const snippets: Record<string, string> = {
    curl: `curl -X GET "http://localhost:8081/api/trust/${companyId}" \\
  -H "X-API-KEY: ${apiKey}" \\
  -H "Accept: application/json"`,

    js: `// Fetch Live GRC Posture Data in JavaScript / TypeScript
const response = await fetch("http://localhost:8081/api/trust/${companyId}", {
  headers: {
    "X-API-KEY": "${apiKey}",
    "Accept": "application/json"
  }
});
const posture = await response.json();
console.log("GRC Trust Score:", posture.stats.score, "Grade:", posture.stats.grade);`,

    python: `# Fetch Live GRC Posture Data in Python
import requests

url = "http://localhost:8081/api/trust/${companyId}"
headers = {
    "X-API-KEY": "${apiKey}",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(f"Verified Security Posture: {data['companyName']} -> Grade {data['stats']['grade']}")`,

    widget: `<!-- Embeddable ReachGRC Trust Badge Widget -->
<script 
  src="http://localhost:5173/widget/widget.umd.js"
  data-company-id="${companyId}"
  data-api-key="${apiKey}"
  data-theme="dark"
  async>
</script>
<div id="reachgrc-trust-badge"></div>`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]).catch(() => {});
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
    toast.success(`${activeLang.toUpperCase()} code example copied!`);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-900/90 overflow-hidden text-white font-mono text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/80 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {(['curl', 'js', 'python', 'widget'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeLang === lang
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {lang === 'js' ? 'JavaScript' : lang === 'python' ? 'Python' : lang === 'widget' ? 'HTML Widget' : 'cURL'}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          {copiedSnippet ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
          {copiedSnippet ? 'Copied' : 'Copy Code'}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-[11px] text-zinc-200 leading-relaxed font-mono">
        <pre>{snippets[activeLang]}</pre>
      </div>
    </div>
  );
};
