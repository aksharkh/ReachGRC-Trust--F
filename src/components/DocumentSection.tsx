import React, { useState } from 'react';
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

  if (!documents || documents.length === 0) return null;

  const handleDocumentClick = (doc: Document) => {
    if (doc.requiresVerification) {
      setSelectedDoc(doc);
      setVerified(false);
      setEmail('');
      setCompany('');
    } else {
      // Handle open for unrestricted docs
      if (doc.url) window.open(doc.url, '_blank');
      else alert(`Opened ${doc.name}`);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && company) {
      // Simulate verification process
      setTimeout(() => {
        setVerified(true);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white tracking-tight">Compliance Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <button
            key={doc.id}
            onClick={() => handleDocumentClick(doc)}
            className="group relative flex items-center p-5 bg-slate-800/40 hover:bg-slate-700/60 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 rounded-2xl transition-all duration-500 text-left w-full overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
            
            <div className="relative p-3.5 bg-slate-900/80 text-orange-400 rounded-xl border border-white/5 group-hover:scale-110 group-hover:text-orange-300 group-hover:border-orange-500/40 transition-all duration-300 shadow-lg">
              {doc.type === 'PDF' ? <FileBadge className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            
            <div className="ml-5 flex-1 min-w-0 relative">
              <h3 className="font-semibold text-white truncate text-base tracking-wide group-hover:text-orange-50 transition-colors">
                {doc.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">{doc.type}</p>
            </div>
            
            <div className="ml-4 flex-shrink-0 text-slate-500 group-hover:text-orange-400 transition-colors relative">
              {doc.requiresVerification ? <Lock className="w-5 h-5" /> : (doc.type === 'Link' ? <ExternalLink className="w-5 h-5" /> : <Download className="w-5 h-5" />)}
            </div>
          </button>
        ))}
      </div>

      {/* Verification Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(249,115,22,0.15)] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-400">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white tracking-tight">Request Secure Access</h3>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {!verified ? (
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="flex items-start gap-3 p-4 mb-6 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-inner">
                    <Lock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-200">
                      <strong className="text-white font-semibold">{selectedDoc.name}</strong> contains sensitive compliance information and requires verification before viewing.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Work Email</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3 bg-neutral-900 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-neutral-600"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">Company Name</label>
                    <input 
                      type="text" 
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-5 py-3 bg-neutral-900 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-neutral-600"
                      placeholder="Acme Corp"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full relative overflow-hidden group bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-wide py-3.5 rounded-xl transition-all duration-300 mt-8 shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]"
                  >
                    <span className="relative z-10">Verify & Access</span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 animate-in slide-in-from-bottom-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight mb-2">Access Granted</h4>
                  <p className="text-slate-400 mb-6">Your request has been verified. You can now securely download the document.</p>
                  <button 
                    onClick={() => {
                      alert(`Downloading ${selectedDoc.name}`);
                      setSelectedDoc(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white hover:bg-orange-500 font-medium py-2.5 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download {selectedDoc.type}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
