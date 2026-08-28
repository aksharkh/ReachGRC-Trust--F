import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShieldCheck, 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Send, 
  Clock, 
  User, 
  Mail, 
  Building2 
} from 'lucide-react';
import { toast } from 'sonner';
import { submitSecurityQuestionnaire } from '../services/api';

interface SecurityQuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  companyId?: number | string;
}

export const SecurityQuestionnaireModal: React.FC<SecurityQuestionnaireModalProps> = ({
  isOpen,
  onClose,
  companyName = 'ReachGRC',
  companyId
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [frameworkType, setFrameworkType] = useState('SIG_LITE');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error("Attachment size exceeds 15MB limit.");
        return;
      }
      setAttachedFileName(file.name);
      toast.success(`Attached ${file.name}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !company.trim()) {
      toast.error("Please fill in your name, work email, and company.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid work email address.");
      return;
    }

    setSubmitting(true);

    try {
      const generatedTicket = `SEC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const result = await submitSecurityQuestionnaire({
        ticketId: generatedTicket,
        companyId: companyId ? Number(companyId) : undefined,
        companyName,
        fullName: fullName.trim(),
        email: email.trim(),
        requesterCompany: company.trim(),
        frameworkType,
        targetDate: targetDate || undefined,
        notes: notes.trim() || undefined,
        attachedFileName: attachedFileName || undefined,
      });

      const confirmedTicket = result.ticketId || generatedTicket;
      setSubmittedTicket(confirmedTicket);
      toast.success(`Security questionnaire request stored in database as ${confirmedTicket}`);
    } catch (error) {
      console.error('Error saving questionnaire to database:', error);
      toast.error("Failed to store questionnaire. Server error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setFrameworkType('SIG_LITE');
    setTargetDate('');
    setNotes('');
    setAttachedFileName(null);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-zinc-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0f17] border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden my-auto relative animate-in zoom-in-95 duration-250">
        
        {/* Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-brand-orange to-amber-500" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                Custom Security Assessment Request
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Submit your vendor questionnaire (SIG, CAIQ, VSA, RFP) for {companyName}.
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {submittedTicket ? (
          /* Success Confirmation State */
          <div className="p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                Request Registered Successfully!
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Our Dedicated Information Security and Compliance Office has received your request.
                A security engineer will review your questionnaire and return completed attestations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                <span>TICKET REFERENCE:</span>
                <strong className="text-brand-orange font-bold font-mono">{submittedTicket}</strong>
              </div>
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span>ESTIMATED SLA:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">24 – 48 Hours</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span>RECIPIENT CONTACT:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Questionnaire Submission Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Requester Name & Work Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <User size={11} /> Full Name <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-brand-orange/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Mail size={11} /> Work Email <span className="text-brand-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@customer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-brand-orange/50 transition-colors"
                />
              </div>
            </div>

            {/* Company Name & Questionnaire Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Building2 size={11} /> Organization / Company <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-brand-orange/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <FileText size={11} /> Questionnaire Format
                </label>
                <select
                  value={frameworkType}
                  onChange={(e) => setFrameworkType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/50 transition-colors cursor-pointer"
                >
                  <option value="SIG_LITE">SIG Lite (Standardized Information Gathering)</option>
                  <option value="SIG_CORE">SIG Core (Comprehensive Assessment)</option>
                  <option value="CSA_CAIQ">CSA CAIQ v4 (Cloud Security Alliance)</option>
                  <option value="VSA">VSA (Vendor Security Alliance Questionnaire)</option>
                  <option value="CUSTOM_RFP">Custom Vendor RFP / Procurement Form</option>
                  <option value="OTHER">Other Custom Security Assessment</option>
                </select>
              </div>
            </div>

            {/* Target Date & Attachment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Clock size={11} /> Target Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Upload size={11} /> Questionnaire Document
                </label>
                <label className="flex items-center justify-between gap-2 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-brand-orange/50 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer transition-colors">
                  <span className="truncate max-w-[170px]">
                    {attachedFileName ? attachedFileName : 'Choose .xlsx, .pdf, or .docx'}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300 shrink-0">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.pdf,.docx,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Notes / Special Instructions */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Additional Notes or In-Scope Services
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific product tiers, encryption requirements, or audit frameworks involved..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-brand-orange/50 transition-colors resize-none"
              />
            </div>

            {/* SLA Guarantee Note */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-2">
              <Clock size={13} className="shrink-0 text-amber-500" />
              <span>Standard Security SLA: Responses completed within <strong>24 – 48 hours</strong> with verified attestation.</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <span className="text-[10px] text-zinc-400">
                Direct email: <a href="mailto:security@reachgrc.io" className="underline hover:text-brand-orange">security@reachgrc.io</a>
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>{submitting ? 'Submitting...' : 'Submit Request'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>,
    document.body
  );
};
