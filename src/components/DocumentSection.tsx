import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, 
  FileBadge, 
  Lock, 
  Download, 
  ChevronRight,
  X, 
  ShieldAlert, 
  CheckCircle2, 
  User, 
  Mail, 
  Building, 
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import type { Document } from '../types';
import { watermarkPdf } from '../lib/watermark';

interface DocumentSectionProps {
  documents?: Document[];
  detailed?: boolean;
}

const BLANK_PDF_BASE64 = "JVBERi0xLjQKMSAwIG9iagogIDw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagoyIDAgb2JqCiAgPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjMgMCBvYmoKICA8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+Pi9Db250ZW50cyA1IDAgUj4+CmVuZG9iago0IDAgb2JqCiAgPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKICA8PC9MZW5ndGggMTgyPj5zdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKFJlYWNoR1JDIC0gQ29udGludW91cyBDb21wbGlhbmNlIEF1ZGl0IEZpbGUpIFRqCi9GMSA4IFRmCjEwMCA2NTAgVGQKKFRoaXMgZG9jdW1lbnQgaXMgYWN0aXZlbHkgbW9uaXRvcmVkIGJ5IFJlYWNoR1JDIEdSQyBUZWxlbWV0cnkgRW5naW5lLikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OSAwMDAwMCBuIAowMDAwMDAwMTA5IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKMDAwMDAwMDI5MCAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMzkwCiUlRU9G";

export const DocumentSection: React.FC<DocumentSectionProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [docCategoryFilter, setDocCategoryFilter] = useState<'all' | 'audit' | 'policies'>('all');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(true);
  const [verified, setVerified] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<{ name: string; email: string; company?: string } | null>(null);

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
    setWatermarkedUrl(null);

    const docLabel = getDocLabel(doc);

    if (docLabel === 'PUBLIC') {
      setVerified(true);
      setAuthorizedUser({ name: 'Public Auditor', email: 'public@reachgrc.io' });
      setLoadingPdf(true);
      const rawPdf = doc.fileData || BLANK_PDF_BASE64;
      const wUrl = await watermarkPdf(rawPdf, {
        name: 'Public Compliance Copy',
        email: 'public@reachgrc.io'
      });
      setWatermarkedUrl(wUrl);
      setLoadingPdf(false);
    } else {
      setVerified(false);
      setAuthorizedUser(null);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = company.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || cleanName.length < 2) {
      toast.error("Please enter your valid full name.");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid work email address.");
      return;
    }

    if (!ndaAccepted) {
      toast.error("Please accept the Electronic Non-Disclosure Terms to proceed.");
      return;
    }

    setLoadingPdf(true);
    setVerified(true);
    const userInfo = {
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany
    };
    setAuthorizedUser(userInfo);

    try {
      if (selectedDoc?.id && !isNaN(Number(selectedDoc.id))) {
        fetch(`http://localhost:8081/api/trust/${selectedDoc.companyId || 1}/resource/${selectedDoc.id}/verify-access`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo)
        }).catch(() => {});
      }

      const rawPdf = selectedDoc?.fileData || BLANK_PDF_BASE64;
      const wUrl = await watermarkPdf(rawPdf, userInfo);
      setWatermarkedUrl(wUrl);
      toast.success(`Access Authorized for ${cleanName}! NDA watermarks applied.`);
    } catch (err) {
      console.error("Watermark generation error:", err);
      toast.error("Failed to generate watermarked document.");
    } finally {
      setLoadingPdf(false);
    }
  };

  const renderLabelBadge = (label: string) => {
    switch (label) {
      case 'PUBLIC':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
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
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            Customers Only
          </span>
        );
      default:
        return null;
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (docCategoryFilter === 'all') return true;
    const name = (doc.name || (doc as any).fileName || '').toLowerCase();
    if (docCategoryFilter === 'audit') {
      return name.includes('soc') || name.includes('iso') || name.includes('audit') || name.includes('cert') || name.includes('pen');
    }
    if (docCategoryFilter === 'policies') {
      return name.includes('policy') || name.includes('privacy') || name.includes('terms') || name.includes('dpa');
    }
    return true;
  });

  return (
    <div id="documents-section" className="space-y-5 font-sans">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-0.5">
            <span>Evidence & Artifacts</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Resources & Compliance Documents
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
            Audit reports, compliance certifications, and security policy documents.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setDocCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-xs ${
              docCategoryFilter === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-bold'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All ({documents.length})
          </button>
          <button
            onClick={() => setDocCategoryFilter('policies')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-xs ${
              docCategoryFilter === 'policies'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-bold'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Policies
          </button>
          <button
            onClick={() => setDocCategoryFilter('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-xs ${
              docCategoryFilter === 'audit'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-bold'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Audit Reports
          </button>
        </div>
      </div>
      
      {/* Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="p-6 col-span-1 md:col-span-2 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs text-zinc-400">
            No documents found in this category.
          </div>
        ) : (
          filteredDocs.map((doc: any, index) => {
            const docLabel = getDocLabel(doc);

            return (
              <button
                key={doc.id || doc.fileId || index}
                onClick={() => handleDocumentClick(doc)}
                className="group relative flex items-center justify-between p-4 bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl transition-all duration-300 text-left w-full cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]"
              >
                {/* Left elements: Icon + Name */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-orange transition-colors">
                    {doc.type === 'PDF' || doc.fileName?.toLowerCase().endsWith('.pdf') ? (
                      <FileBadge className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-xs sm:text-sm leading-snug group-hover:text-brand-orange transition-colors">
                      {doc.name || doc.fileName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {doc.type || 'PDF'}
                      </span>
                      {renderLabelBadge(docLabel)}
                    </div>
                  </div>
                </div>
                
                {/* Right Arrow / Action */}
                <div className="p-2 rounded-xl text-zinc-400 group-hover:text-brand-orange transition-colors shrink-0 ml-2">
                  <ChevronRight size={16} />
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Document Portal Modal */}
      {selectedDoc && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-zinc-900/60 dark:bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(255,138,28,0.15)] w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-400 relative flex flex-col md:grid md:grid-cols-12 max-h-[92vh] my-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red to-brand-orange z-20" />
            
            {/* Left Column - Security Information panel */}
            <div className="col-span-1 md:col-span-4 bg-zinc-950 p-5 sm:p-8 text-white flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-zinc-800 shrink-0">
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="p-2.5 sm:p-3 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-2xl w-fit">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">ReachGRC Verified</h3>
                  <p className="text-xs text-zinc-400 mt-1.5 sm:mt-2 leading-relaxed font-light">
                    Compliance files are audited automatically. Selected NDA documents require electronic authorization containing your real name and email permanently watermarked.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 pt-4 sm:pt-6 border-t border-zinc-800 space-y-1.5 sm:space-y-2 mt-4 md:mt-0">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg border border-brand-orange/20">
                  {getDocLabel(selectedDoc).replace('_', ' ')}
                </span>
                <p className="text-xs font-semibold text-zinc-300 truncate">{selectedDoc.name || selectedDoc.fileName}</p>
              </div>
            </div>

            {/* Right Column - PDF Viewer / Credentials Form */}
            <div className="col-span-1 md:col-span-8 p-5 sm:p-8 flex flex-col justify-between bg-white dark:bg-zinc-900 relative min-h-[360px] sm:min-h-[440px] overflow-y-auto">
              <button 
                onClick={() => {
                  setSelectedDoc(null);
                  setWatermarkedUrl(null);
                  setVerified(false);
                }} 
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer z-30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Form to submit credentials */}
              {!verified && (
                <div className="my-auto space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-base font-black uppercase tracking-wide text-zinc-900 dark:text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-orange" />
                      Verify Identity for NDA Document
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-light">
                      Please enter your valid name and email address. An encrypted, personalized watermarked copy will be generated for your preview and download.
                    </p>
                  </div>

                  <form onSubmit={handleVerify} className="space-y-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <User size={11} /> Full Name (Required)
                      </label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:border-brand-orange outline-none transition-all placeholder:text-zinc-400 text-xs font-semibold"
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>

                    {/* Work Email */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <Mail size={11} /> Work Email Address (Required)
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:border-brand-orange outline-none transition-all placeholder:text-zinc-400 text-xs font-semibold"
                        placeholder="e.g. alex.morgan@enterprise.com"
                      />
                    </div>

                    {/* Company / Organization */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <Building size={11} /> Organization / Company Name
                      </label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:border-brand-orange outline-none transition-all placeholder:text-zinc-400 text-xs"
                        placeholder="e.g. BlueSantos Corp"
                      />
                    </div>

                    {/* NDA Checkbox */}
                    <div className="flex items-start gap-2 pt-1">
                      <input 
                        type="checkbox"
                        id="nda-checkbox"
                        checked={ndaAccepted}
                        onChange={(e) => setNdaAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange cursor-pointer"
                      />
                      <label htmlFor="nda-checkbox" className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug cursor-pointer select-none">
                        I confirm that the entered name and email are accurate and agree to receive a personalized watermarked PDF under standard NDA terms.
                      </label>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold tracking-wide py-3 rounded-xl transition-all duration-300 mt-4 shadow-[0_4px_12px_rgba(255,138,28,0.2)] hover:opacity-95 cursor-pointer text-xs uppercase flex items-center justify-center gap-2"
                    >
                      <Lock size={13} />
                      <span className="relative z-10">Authorize & Generate Watermarked PDF</span>
                    </button>
                  </form>
                </div>
              )}

              {/* PDF Inline Viewer & Download Option */}
              {verified && (
                <div className="flex-1 flex flex-col justify-between space-y-3 mt-1">
                  {/* Authorized User Pill Bar */}
                  {authorizedUser && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
                          Authorized Recipient: <strong className="text-brand-orange">{authorizedUser.name}</strong> ({authorizedUser.email})
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setVerified(false);
                          setWatermarkedUrl(null);
                        }}
                        className="text-[10px] font-bold text-zinc-400 hover:text-white underline cursor-pointer shrink-0 ml-2"
                      >
                        Change User
                      </button>
                    </div>
                  )}

                  <div className="flex-1 min-h-[340px] relative flex flex-col">
                    {loadingPdf ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm space-y-3 z-20">
                        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Applying personalized security watermarks...</p>
                      </div>
                    ) : null}
                    
                    {watermarkedUrl && (
                      <div className="flex-1 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex">
                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-brand-red/90 text-white rounded text-[8px] font-black uppercase flex items-center gap-1 shadow-md pointer-events-none">
                          <ShieldAlert size={10} />
                          Watermarked Preview
                        </div>
                        
                        <iframe
                          src={watermarkedUrl}
                          title={selectedDoc?.name || selectedDoc?.fileName}
                          className="w-full flex-1 min-h-[340px] border-none bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      onClick={() => {
                        if (watermarkedUrl) {
                          const link = document.createElement('a');
                          link.href = watermarkedUrl;
                          const sanitizedName = (authorizedUser?.name || 'verified').replace(/\s+/g, '_');
                          const docName = (selectedDoc?.name || selectedDoc?.fileName || 'document').replace(/\.pdf$/i, '');
                          link.download = `${docName}-watermarked-${sanitizedName}.pdf`;
                          link.click();
                          toast.success(`Downloaded watermarked PDF for ${authorizedUser?.name || 'authorized user'}!`);
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
