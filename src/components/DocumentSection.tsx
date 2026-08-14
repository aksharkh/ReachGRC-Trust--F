import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, FileBadge, Lock, Download, ExternalLink, X, Eye, ShieldAlert } from 'lucide-react';
import type { Document } from '../types';
import { watermarkPdf } from '../lib/watermark';

interface DocumentSectionProps {
  documents?: Document[];
  detailed?: boolean;
}

// A tiny valid blank 1-page PDF file in base64 as a fallback
const BLANK_PDF_BASE64 = "JVBERi0xLjQKMSAwIG9iagogIDw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagoyIDAgb2JqCiAgPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjMgMCBvYmoKICA8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+Pi9Db250ZW50cyA1IDAgUj4+CmVuZG9iago0IDAgb2JqCiAgPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKICA8PC9MZW5ndGggMTgyPj5zdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKFJlYWNoR1JDIC0gQ29udGludW91cyBDb21wbGlhbmNlIEF1ZGl0IEZpbGUpIFRqCi9GMSA4IFRmCjEwMCA2NTAgVGQKKFRoaXMgZG9jdW1lbnQgaXMgYWN0aXZlbHkgbW9uaXRvcmVkIGJ5IFJlYWNoR1JDIEdSQyBUZWxlbWV0cnkgRW5naW5lLikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OSAwMDAwMCBuIAowMDAwMDAwMTA5IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKMDAwMDAwMDI5MCAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMzkwCiUlRU9G";

export const DocumentSection: React.FC<DocumentSectionProps> = ({ documents, detailed = false }) => {
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [verified, setVerified] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

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

  // Normalized document label mapper
  const getDocLabel = (doc: any) => {
    if (doc.label) return doc.label;
    return doc.requiresVerification ? 'NDA_REQUIRED' : 'PUBLIC';
  };

  const handleDocumentClick = async (doc: any) => {
    if (doc.type === 'Link' && doc.url && doc.url !== '#') {
      window.open(doc.url, '_blank');
      return;
    }

    setSelectedDoc(doc);
    setVerified(false);
    setEmail('');
    setCompany('');
    setWatermarkedUrl(null);

    const docLabel = getDocLabel(doc);

    // If document is Public (no authorization required)
    if (docLabel === 'PUBLIC') {
      setVerified(true);
      setLoadingPdf(true);
      const rawPdf = doc.fileData || BLANK_PDF_BASE64;
      const wUrl = await watermarkPdf(rawPdf, 'PUBLIC PUBLIC');
      setWatermarkedUrl(wUrl);
      setLoadingPdf(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && company) {
      setLoadingPdf(true);
      setVerified(true);
      
      // Simulate verification check, then add email watermark
      setTimeout(async () => {
        const rawPdf = selectedDoc?.fileData || BLANK_PDF_BASE64;
        const wUrl = await watermarkPdf(rawPdf, email);
        setWatermarkedUrl(wUrl);
        setLoadingPdf(false);
      }, 600);
    }
  };

  // Badge styles according to doc classification labels
  const renderLabelBadge = (label: string) => {
    switch (label) {
      case 'PUBLIC':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
            Public
          </span>
        );
      case 'NDA_REQUIRED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
            NDA Required
          </span>
        );
      case 'CUSTOMERS_ONLY':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-brand-red/10 text-brand-red border border-brand-red/20">
            Customers Only
          </span>
        );
      default:
        return null;
    }
  };

  const filteredDocs = detailed 
    ? documents 
    : documents.filter(doc => getDocLabel(doc) === 'PUBLIC');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">Compliance Documents</h2>
      
      {/* Document Grid Stack */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredDocs.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs text-zinc-400 dark:text-zinc-550 font-light">
            No public documents available. Toggle Detailed View to access confidential files.
          </div>
        ) : (
          filteredDocs.map((doc: any, index) => {
            const docLabel = getDocLabel(doc);
            return (
            <button
              key={doc.id || doc.fileId}
              onClick={() => handleDocumentClick(doc)}
              className="group relative flex items-center justify-between p-4 bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-brand-orange/40 rounded-2xl transition-all duration-300 text-left w-full cursor-pointer hover:scale-[1.01] hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/3 to-brand-orange/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              
              {/* Left elements: Icon + Name Info */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0 group-hover:scale-105 transition-all duration-300">
                  {doc.type === 'PDF' || doc.fileName?.toLowerCase().endsWith('.pdf') ? <FileBadge className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm leading-snug group-hover:text-brand-orange transition-colors">
                    {doc.name || doc.fileName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-zinc-450 dark:text-zinc-500 uppercase tracking-wider font-bold">{doc.type || 'PDF'}</span>
                    {renderLabelBadge(docLabel)}
                  </div>
                </div>
              </div>
              
              {/* Right Status Icon */}
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-455 dark:text-zinc-550 rounded-lg shrink-0 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors ml-4">
                {docLabel !== 'PUBLIC' ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : doc.type === 'Link' ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </div>
            </button>
          );
        }))}
      </div>

      {/* Document Portal Modal */}
      {selectedDoc && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-[0_0_80px_rgba(255,138,28,0.15)] w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-400 relative flex flex-col md:grid md:grid-cols-12 min-h-[480px] my-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
            
            {/* Left Column - Security Information panel (col-span-4) */}
            <div className="col-span-4 bg-gradient-to-br from-zinc-900 via-zinc-955 to-black card-pattern-dark p-8 text-white flex flex-col justify-between relative border-r border-zinc-800/60">
              <div className="absolute inset-0 bg-brand-orange/5 blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-2xl w-fit">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">ReachGRC Verified</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                    Compliance files are audited automatically. Selected NDA documents require electronic watermarking containing your identity credentials.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 pt-6 border-t border-zinc-800/80 space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg border border-brand-orange/20">
                  {getDocLabel(selectedDoc).replace('_', ' ')}
                </span>
                <p className="text-xs font-semibold text-zinc-250 truncate mt-1">{selectedDoc.name || selectedDoc.fileName}</p>
              </div>
            </div>

            {/* Right Column - PDF Viewer / Credentials Form (col-span-8) */}
            <div className="col-span-8 p-8 flex flex-col justify-between bg-white dark:bg-zinc-900 relative min-h-[420px]">
              <button 
                onClick={() => {
                  setSelectedDoc(null);
                  setWatermarkedUrl(null);
                }} 
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer z-30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Form to submit credentials */}
              {!verified && (
                <div className="my-auto space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-base font-black uppercase tracking-wide text-zinc-900 dark:text-white">Verify Credentials</h4>
                    <p className="text-[11px] text-zinc-500 font-light">Enter details below to watermark and preview the encrypted GRC report.</p>
                  </div>

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
                      <span className="relative z-10">Verify & Watermark PDF</span>
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                    </button>
                  </form>
                </div>
              )}

              {/* PDF Inline Viewer & Download Option */}
              {verified && (
                <div className="flex-1 flex flex-col justify-between space-y-4 mt-2">
                  <div className="flex-1 min-h-[350px] relative flex flex-col">
                    {loadingPdf ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-sm space-y-3">
                        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Watermarking file...</p>
                      </div>
                    ) : null}
                    
                    {watermarkedUrl && (
                      <div className="flex-1 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex">
                        {/* Overlay diagonal visual banner to show secure preview in browser */}
                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-brand-red/90 text-white rounded text-[8px] font-black uppercase flex items-center gap-1 shadow-md pointer-events-none">
                          <ShieldAlert size={10} />
                          Watermarked Preview
                        </div>
                        
                        <iframe
                          src={watermarkedUrl}
                          title={selectedDoc?.name || selectedDoc?.fileName}
                          className="w-full flex-1 min-h-[350px] border-none bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        // Download PDF client side
                        if (watermarkedUrl) {
                          const link = document.createElement('a');
                          link.href = watermarkedUrl;
                          link.download = `${(selectedDoc?.name || selectedDoc?.fileName || 'document').replace(/\.pdf$/i, '')}-watermarked.pdf`;
                          link.click();
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-orange text-white hover:opacity-95 font-bold py-3 rounded-xl transition-all cursor-pointer text-xs uppercase shadow-md shadow-brand-orange/20"
                    >
                      <Download className="w-4 h-4" />
                      Download Watermarked PDF
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
