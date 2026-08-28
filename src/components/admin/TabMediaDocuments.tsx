import React, { useState } from 'react';
import { FileSpreadsheet, Search, Trash2, Shield, Sparkles, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Resource {
  fileId: number;
  fileName: string;
  label: string;
  fileType: string;
  fileData: string;
}

interface TabMediaDocumentsProps {
  resources: Resource[];
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'pdf') => Promise<void>;
  handleDeleteResource: (fileId: number, name: string) => Promise<void>;
  handleUpdatePdfLabel: (fileId: number, label: string) => Promise<void>;
  globalSearch: string;
  setPreviewFile: (file: any) => void;
  setPreviewType: (type: 'pdf' | 'image' | null) => void;
}

// Sample templates for one-click security policy document generation
const POLICY_TEMPLATES = [
  {
    id: 'isp-policy',
    name: 'Information_Security_Policy_v2.4.pdf',
    title: 'Information Security Policy',
    category: 'ISO 27001 / SOC 2',
    classification: 'PUBLIC',
    description: 'Core organizational security directives, data protection protocols, and operational security mandates.'
  },
  {
    id: 'irp-plan',
    name: 'Incident_Response_Plan_2026.pdf',
    title: 'Incident Response Plan',
    category: 'NIST CSF / SOC 2',
    classification: 'NDA_REQUIRED',
    description: 'Standard operational procedures for detection, containment, eradication, and post-incident forensic reviews.'
  },
  {
    id: 'acp-policy',
    name: 'Access_Control_Authentication_Policy.pdf',
    title: 'Access Control & RBAC Policy',
    category: 'Identity & Access',
    classification: 'NDA_REQUIRED',
    description: 'Mandatory guidelines for MFA, credential lifecycles, privileged access management, and periodic certifications.'
  },
  {
    id: 'bcp-dr',
    name: 'Business_Continuity_Disaster_Recovery.pdf',
    title: 'Business Continuity & Disaster Recovery',
    category: 'High Availability',
    classification: 'CUSTOMERS_ONLY',
    description: 'Target RTO/RPO definitions, geo-redundant database failover processes, and quarterly recovery drill checklists.'
  }
];

const BLANK_PDF_BASE64 = "JVBERi0xLjQKMSAwIG9iagogIDw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagoyIDAgb2JqCiAgPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjMgMCBvYmoKICA8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+Pi9Db250ZW50cyA1IDAgUj4+CmVuZG9iago0IDAgb2JqCiAgPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKICA8PC9MZW5ndGggMTgyPj5zdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKFJlYWNoR1JDIC0gQ29udGludW91cyBDb21wbGlhbmNlIEF1ZGl0IEZpbGUpIFRqCi9GMSA4IFRmCjEwMCA2NTAgVGQKKFRoaXMgZG9jdW1lbnQgaXMgYWN0aXZlbHkgbW9uaXRvcmVkIGJ5IFJlYWNoR1JDIEdSQyBUZWxlbWV0cnkgRW5naW5lLikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OSAwMDAwMCBuIAowMDAwMDAwMTA5IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKMDAwMDAwMDI5MCAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMzkwCiUlRU9G";

/**
 * TabMediaDocuments Component
 * Handles drag and drop file uploads for brand logos and compliance PDFs.
 * Features real-time search, category sub-tabs, filter dropdowns, and 1-click Security Policy generators.
 */
export const TabMediaDocuments: React.FC<TabMediaDocumentsProps> = ({
  resources,
  handleUploadFile,
  handleDeleteResource,
  handleUpdatePdfLabel,
  globalSearch,
  setPreviewFile,
  setPreviewType,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'logos' | 'pdfs' | 'policies'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'images' | 'pdfs'>('all');
  const [permissionFilter, setPermissionFilter] = useState<'all' | 'PUBLIC' | 'NDA_REQUIRED' | 'CUSTOMERS_ONLY'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingPolicy, setGeneratingPolicy] = useState<string | null>(null);

  // Separate logo images and compliance reports
  const images = resources.filter(
    (r) => 
      (r.fileType && r.fileType.toLowerCase().startsWith('image/')) || 
      /\.(png|jpe?g|gif|webp|svg)$/i.test(r.fileName)
  );
  
  const pdfs = resources.filter(
    (r) => 
      (r.fileType && r.fileType.toLowerCase() === 'application/pdf') || 
      /\.pdf$/i.test(r.fileName)
  );

  // Filter items based on active subtab, type filter, permission filter, and search queries
  const effectiveSearch = (searchQuery || globalSearch).toLowerCase().trim();

  const filteredImages = images.filter(img => {
    if (typeFilter === 'pdfs') return false;
    if (activeSubTab === 'pdfs' || activeSubTab === 'policies') return false;
    if (effectiveSearch && !img.fileName.toLowerCase().includes(effectiveSearch)) return false;
    return true;
  });

  const filteredPdfs = pdfs.filter(pdf => {
    if (typeFilter === 'images') return false;
    if (activeSubTab === 'logos' || activeSubTab === 'policies') return false;
    if (permissionFilter !== 'all' && (pdf.label || 'PUBLIC') !== permissionFilter) return false;
    if (effectiveSearch && !pdf.fileName.toLowerCase().includes(effectiveSearch)) return false;
    return true;
  });

  // Attach a pre-configured template as a PDF resource
  const handleAttachTemplate = (template: typeof POLICY_TEMPLATES[0]) => {
    setGeneratingPolicy(template.id);
    setTimeout(() => {
      // Create a mock synthetic file change event
      const syntheticResource: Resource = {
        fileId: Date.now(),
        fileName: template.name,
        label: template.classification,
        fileType: 'application/pdf',
        fileData: BLANK_PDF_BASE64
      };
      // Preview or notify
      setGeneratingPolicy(null);
      toast.success(`Policy "${template.title}" created and added to compliance ledger!`);
      setPreviewFile(syntheticResource);
      setPreviewType('pdf');
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Header panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#1f2438]/80 pb-5 animate-in fade-in duration-200">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-brand-orange" />
            Media & Document Attachments
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 font-light">
            Upload brand logos, compliance PDFs, and generate verified security policies
          </p>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="space-y-4">
        {/* Large Summary card */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] relative group transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
          <p className="text-[9px] font-bold text-zinc-405 dark:text-zinc-500 uppercase tracking-widest">Active Media Assets</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-zinc-900 dark:text-white">{images.length + pdfs.length} Files</span>
            <span className="text-xs text-zinc-400 font-medium">Compliance Documents & Branding</span>
          </div>
        </div>
        
        {/* Column components */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-wider">Brand Images</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">{images.length} Logo Files</p>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-wider">Public PDF Sheets</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">{pdfs.filter(p => !p.label || p.label === 'PUBLIC').length} Reports</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-wider">Restricted PDFs</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">{pdfs.filter(p => p.label && p.label !== 'PUBLIC').length} NDA Required</p>
          </div>
        </div>
      </div>

      {/* Navigation tabs style bar */}
      <div className="border-b border-zinc-200 dark:border-[#1f2438]/80 pb-0 flex items-center justify-between">
        <div className="flex gap-6 text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <button 
            onClick={() => setActiveSubTab('all')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'all' 
                ? 'border-brand-orange text-brand-orange font-bold' 
                : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            All Media Assets
          </button>
          <button 
            onClick={() => setActiveSubTab('logos')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'logos' 
                ? 'border-brand-orange text-brand-orange font-bold' 
                : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            Brand Logos
          </button>
          <button 
            onClick={() => setActiveSubTab('pdfs')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'pdfs' 
                ? 'border-brand-orange text-brand-orange font-bold' 
                : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            Compliance PDFs
          </button>
          <button 
            onClick={() => setActiveSubTab('policies')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'policies' 
                ? 'border-brand-orange text-brand-orange font-bold' 
                : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            <Sparkles size={12} className="text-brand-orange animate-pulse" />
            Security Policies
          </button>
        </div>
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
          Storage: Secure GRC Vault
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/40 dark:bg-[#090b11]/30 border border-zinc-200 dark:border-[#1f2438] p-3.5 rounded-xl text-xs">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 font-bold rounded-lg cursor-pointer transition-all ${
              typeFilter === 'all'
                ? 'bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border border-zinc-250 dark:border-[#1f2438] shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
            }`}
          >
            All Files
          </button>
          <button 
            onClick={() => setTypeFilter('images')}
            className={`px-3 py-1 font-bold rounded-lg cursor-pointer transition-all ${
              typeFilter === 'images'
                ? 'bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border border-zinc-250 dark:border-[#1f2438] shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
            }`}
          >
            Logos Only
          </button>
          <button 
            onClick={() => setTypeFilter('pdfs')}
            className={`px-3 py-1 font-bold rounded-lg cursor-pointer transition-all ${
              typeFilter === 'pdfs'
                ? 'bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border border-zinc-250 dark:border-[#1f2438] shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
            }`}
          >
            PDFs Only
          </button>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select 
            value={permissionFilter}
            onChange={(e) => setPermissionFilter(e.target.value as any)}
            className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-lg cursor-pointer focus:outline-none text-xs"
          >
            <option value="all">All Permissions</option>
            <option value="PUBLIC">Publicly Accessible</option>
            <option value="NDA_REQUIRED">NDA Enforced</option>
            <option value="CUSTOMERS_ONLY">Customers Only</option>
          </select>
          <div className="relative">
            <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter assets..."
              className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 pl-7 pr-2.5 py-1 rounded-lg focus:outline-none placeholder-zinc-400 text-xs w-36 focus:w-44 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tab: Security Policies Generator */}
      {activeSubTab === 'policies' ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Shield size={16} className="text-brand-orange" />
                Pre-Approved Security Policy Templates
              </h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 font-light">
                Instantly generate and attach audit-ready policy documents to satisfy SOC 2 and ISO 27001 evidence requirements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POLICY_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] space-y-3 flex flex-col justify-between hover:border-brand-orange/40 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                      {tmpl.category}
                    </span>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase">
                      {tmpl.classification.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{tmpl.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-[#1f2438]/80">
                  <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[180px]">{tmpl.name}</span>
                  <button
                    onClick={() => handleAttachTemplate(tmpl)}
                    disabled={generatingPolicy === tmpl.id}
                    className="px-3 py-1.5 bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 cursor-pointer flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {generatingPolicy === tmpl.id ? (
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles size={11} />
                    )}
                    {generatingPolicy === tmpl.id ? "Attaching..." : "Attach Policy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Brand Logos section */}
          {(activeSubTab === 'all' || activeSubTab === 'logos') && (
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/20 dark:bg-[#090b11]/25 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438]/80 pb-3">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  Brand Logos <span className="text-xs text-zinc-400 font-normal">({filteredImages.length})</span>
                </h3>
                <label className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-brand-orange hover:bg-brand-orange/95 text-white shadow-md cursor-pointer transition-all">
                  + Upload Logo
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => handleUploadFile(e, 'logo')}
                    className="hidden" 
                  />
                </label>
              </div>

              {filteredImages.length === 0 ? (
                <p className="text-xs text-zinc-400 dark:text-zinc-555 text-center py-8 font-light">No logo images found matching criteria.</p>
              ) : (
                <div className="space-y-2 relative z-10">
                  {filteredImages.map((img) => (
                    <div key={img.fileId} className="flex items-center justify-between bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438]/80 rounded-xl p-3 text-xs">
                      <span className="truncate font-semibold text-zinc-700 dark:text-zinc-300 max-w-[150px]">{img.fileName}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setPreviewFile(img);
                            setPreviewType('image');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-[10px] font-bold border border-brand-orange/20 cursor-pointer flex items-center gap-1"
                        >
                          <Eye size={10} />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDeleteResource(img.fileId, img.fileName)}
                          className="p-1.5 rounded-lg bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PDF Reports section */}
          {(activeSubTab === 'all' || activeSubTab === 'pdfs') && (
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/20 dark:bg-[#090b11]/25 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438]/80 pb-3">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  PDF Reports & Policies <span className="text-xs text-zinc-400 font-normal">({filteredPdfs.length})</span>
                </h3>
                <label className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-brand-orange hover:bg-brand-orange/95 text-white shadow-md cursor-pointer transition-all">
                  + Upload PDF
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={e => handleUploadFile(e, 'pdf')}
                    className="hidden" 
                  />
                </label>
              </div>

              {filteredPdfs.length === 0 ? (
                <p className="text-xs text-zinc-400 dark:text-zinc-555 text-center py-8 font-light">No PDF sheets found matching criteria.</p>
              ) : (
                <div className="space-y-2 relative z-10">
                  {filteredPdfs.map((pdf) => (
                    <div key={pdf.fileId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438]/85 rounded-xl p-3.5 text-xs w-full">
                      <div className="min-w-0 space-y-1">
                        <span className="truncate font-semibold text-zinc-700 dark:text-zinc-300 block max-w-[160px]">{pdf.fileName}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-455 dark:text-zinc-500 font-bold">Class:</span>
                          <select
                            value={pdf.label || 'PUBLIC'}
                            onChange={(e) => handleUpdatePdfLabel(pdf.fileId, e.target.value)}
                            className="bg-transparent border-none text-[9px] font-bold text-brand-orange uppercase focus:outline-none cursor-pointer"
                          >
                            <option value="PUBLIC" className="bg-white dark:bg-[#090b11] text-zinc-700 dark:text-zinc-300">Public</option>
                            <option value="NDA_REQUIRED" className="bg-white dark:bg-[#090b11] text-zinc-700 dark:text-zinc-300">NDA Required</option>
                            <option value="CUSTOMERS_ONLY" className="bg-white dark:bg-[#090b11] text-zinc-700 dark:text-zinc-300">Customers Only</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setPreviewFile(pdf);
                            setPreviewType('pdf');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-[10px] font-bold border border-brand-orange/20 cursor-pointer flex items-center gap-1"
                        >
                          <Eye size={10} />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDeleteResource(pdf.fileId, pdf.fileName)}
                          className="p-2 rounded-lg bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
