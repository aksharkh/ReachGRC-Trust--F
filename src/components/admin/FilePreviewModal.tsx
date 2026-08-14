import React from 'react';
import { Shield, X } from 'lucide-react';
import { base64ToBlobUrl } from '../../lib/watermark';

interface FilePreviewModalProps {
  previewFile: {
    fileName: string;
    fileData: string;
    createdAt?: string;
  };
  previewType: 'pdf' | 'image';
  onClose: () => void;
}

/**
 * FilePreviewModal Component
 * Renders the lightbox file attachment preview. Converts base64 file payloads
 * into Blob URIs for dynamic iframe or image displaying.
 */
export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  previewFile,
  previewType,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/80 dark:bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#131622] border border-zinc-200 dark:border-[#1f2438] rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] flex flex-col justify-between space-y-4 animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438] pb-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Shield size={16} className="text-brand-orange" />
              GRC Resource Preview
            </h3>
            <p className="text-[10px] text-zinc-550 dark:text-zinc-400 mt-0.5">{previewFile.fileName}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`data:application/octet-stream;base64,${previewFile.fileData}`}
              download={previewFile.fileName}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-[#1f2438] text-zinc-700 dark:text-white cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              Download File
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Body / Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-[#090b11] rounded-2xl border border-zinc-200 dark:border-[#1f2438] p-4 flex items-center justify-center min-h-[350px] max-h-[60vh]">
          {previewType === 'image' && (
            <img
              src={`data:image/png;base64,${previewFile.fileData}`}
              alt={previewFile.fileName}
              className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl"
            />
          )}
          {previewType === 'pdf' && (
            <iframe
              src={base64ToBlobUrl(previewFile.fileData)}
              title={previewFile.fileName}
              className="w-full h-[50vh] rounded-xl border border-zinc-200 dark:border-[#1f2438]"
            />
          )}
        </div>

        {/* Footer Metadata */}
        <div className="text-[10px] text-zinc-500 flex justify-between border-t border-zinc-200 dark:border-[#1f2438] pt-3">
          <span>File size: {Math.round(previewFile.fileData.length * 0.75 / 1024)} KB</span>
          <span>Uploaded: {previewFile.createdAt ? new Date(previewFile.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>

      </div>
    </div>
  );
};
