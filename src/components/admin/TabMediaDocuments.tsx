import React from 'react';
import { FileSpreadsheet, Search, Trash2 } from 'lucide-react';

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

/**
 * TabMediaDocuments Component
 * Handles drag and drop file uploads for brand logos and compliance PDFs.
 * Categorizes files and triggers preview modals.
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
            Upload brand logos and PDF compliance sheets directly to this organization
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
          <button className="pb-3 border-b-2 border-brand-orange text-brand-orange font-bold">Brand Assets</button>
          <button className="pb-3 border-b-2 border-transparent hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer font-medium">Compliance PDFs</button>
          <button className="pb-3 border-b-2 border-transparent hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer font-medium">Security Policies</button>
        </div>
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
          Standard Storage: Secure AWS S3
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/40 dark:bg-[#090b11]/30 border border-zinc-200 dark:border-[#1f2438] p-3.5 rounded-xl text-xs">
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border border-zinc-250 dark:border-[#1f2438] font-bold rounded-lg cursor-pointer">All Files</button>
          <button className="px-3 py-1 text-zinc-500 dark:text-zinc-405 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent font-medium rounded-lg cursor-pointer">Images Only</button>
          <button className="px-3 py-1 text-zinc-500 dark:text-zinc-405 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent font-medium rounded-lg cursor-pointer">PDFs Only</button>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-lg cursor-pointer focus:outline-none">
            <option>All Permissions</option>
            <option>Publicly Accessible</option>
            <option>NDA Enforced</option>
          </select>
          <div className="relative">
            <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search assets..."
              className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 pl-7 pr-2.5 py-1 rounded-lg focus:outline-none placeholder-zinc-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Brand Logos section */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/20 dark:bg-[#090b11]/25 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438]/80 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Brand Logos</h3>
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

          {images.length === 0 ? (
            <p className="text-xs text-zinc-400 dark:text-zinc-555 text-center py-8 font-light">No logo images uploaded yet.</p>
          ) : (
            <div className="space-y-2 relative z-10">
              {images
                .filter(img => !globalSearch || img.fileName.toLowerCase().includes(globalSearch.toLowerCase()))
                .map((img) => (
                  <div key={img.fileId} className="flex items-center justify-between bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438]/80 rounded-xl p-3 text-xs">
                    <span className="truncate font-semibold text-zinc-700 dark:text-zinc-300 max-w-[150px]">{img.fileName}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setPreviewFile(img);
                          setPreviewType('image');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-[10px] font-bold border border-brand-orange/20 cursor-pointer"
                      >
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

        {/* PDF Reports section */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/20 dark:bg-[#090b11]/25 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438]/80 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">PDF Reports</h3>
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

          {pdfs.length === 0 ? (
            <p className="text-xs text-zinc-400 dark:text-zinc-555 text-center py-8 font-light">No PDF sheets uploaded yet.</p>
          ) : (
            <div className="space-y-2 relative z-10">
              {pdfs
                .filter(pdf => !globalSearch || pdf.fileName.toLowerCase().includes(globalSearch.toLowerCase()))
                .map((pdf) => (
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
                        className="px-2.5 py-1.5 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-[10px] font-bold border border-brand-orange/20 cursor-pointer"
                      >
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
      </div>
    </div>
  );
};
