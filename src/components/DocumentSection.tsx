import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, FileBadge, Lock, Download, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import type { Document } from '../types';

interface DocumentSectionProps {
  documents?: Document[];
}

export const DocumentSection: React.FC<DocumentSectionProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [verified, setVerified] = useState(false);

  // Disable body and html scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedDoc]);

  if (!documents || documents.length === 0) return null;

  const handleDocumentClick = (doc: Document) => {
    if (doc.requiresVerification) {
      setSelectedDoc(doc);
      setVerified(false);
      setEmail('');
      setCompany('');
    } else {
      if (doc.url) window.open(doc.url, '_blank');
      else alert(`Opened ${doc.name}`);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && company) {
      setTimeout(() => {
        setVerified(true);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">Compliance Documents</h2>
      
      {/* Document Grid Stack */}
      <div className="grid grid-cols-1 gap-3.5">
        {documents.map((doc, index) => (
          <button
            key={doc.id}
            onClick={() => handleDocumentClick(doc)}
            className="group relative flex items-center justify-between p-4 bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-brand-orange/40 rounded-2xl transition-all duration-300 text-left w-full cursor-pointer hover:scale-[1.01] hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/3 to-brand-orange/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
            
            {/* Left elements: Icon + Name Info */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 group-hover:scale-105 transition-all duration-300">
                {doc.type === 'PDF' ? <FileBadge className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm leading-snug group-hover:text-brand-orange transition-colors">
                  {doc.name}
                </h3>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider font-bold">{doc.type}</p>
              </div>
            </div>
            
            {/* Right Status Icon */}
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-450 dark:text-zinc-550 rounded-lg shrink-0 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors ml-4">
              {doc.requiresVerification ? (
                <Lock className="w-3.5 h-3.5" />
              ) : doc.type === 'Link' ? (
                <ExternalLink className="w-3.5 h-3.5" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Verification Modal - Portal to document.body to escape stacking contexts and resolve z-index clipping */}
      {selectedDoc && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-[0_0_80px_rgba(255,138,28,0.15)] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-400 relative flex flex-col md:grid md:grid-cols-12 min-h-[400px] my-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
            
            {/* Left Column - Security Information panel (col-span-5) */}
            <div className="col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-955 to-black card-pattern-dark p-8 text-white flex flex-col justify-between relative border-r border-zinc-800/60">
              <div className="absolute inset-0 bg-brand-orange/5 blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-2xl w-fit">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">Secure Audit Asset</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                    This compliance profile is continuously monitored. Access to critical documentation requires work credentials verification.
                  </p>
                </div>
              </div>
              <div className="relative z-10 pt-6 border-t border-zinc-800/80">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Document Locked</p>
                <p className="text-xs font-semibold text-brand-orange truncate mt-1">{selectedDoc.name}</p>
              </div>
            </div>

            {/* Right Column - Input Form panel (col-span-7) */}
            <div className="col-span-7 p-8 flex flex-col justify-between bg-white dark:bg-zinc-900 relative">
              <button 
                onClick={() => setSelectedDoc(null)} 
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="my-auto space-y-5">
                <div className="space-y-1">
                  <h4 className="text-base font-black uppercase tracking-wide text-zinc-900 dark:text-white">Verify Credentials</h4>
                  <p className="text-[11px] text-zinc-500 font-light">Enter details below to download the encrypted audit report.</p>
                </div>

                {!verified ? (
                  <form onSubmit={handleVerify} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:border-brand-orange outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-550 text-xs"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:border-brand-orange outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-550 text-xs"
                        placeholder="Acme Corp"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold tracking-wide py-3 rounded-xl transition-all duration-300 mt-8 shadow-[0_4px_12px_rgba(255,138,28,0.2)] hover:opacity-95 cursor-pointer text-xs uppercase"
                    >
                      <span className="relative z-10">Verify & Access</span>
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 animate-in slide-in-from-bottom-4 space-y-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight uppercase">Access Approved</h4>
                      <p className="text-xs text-zinc-555 mt-1">Your credentials were authenticated. Download is ready.</p>
                    </div>
                    <button 
                      onClick={() => {
                        alert(`Downloading ${selectedDoc.name}`);
                        setSelectedDoc(null);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-orange text-white hover:opacity-95 font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-xs uppercase shadow-md shadow-brand-orange/20"
                    >
                      <Download className="w-4 h-4" />
                      Download {selectedDoc.type}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
