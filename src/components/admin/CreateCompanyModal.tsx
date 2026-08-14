import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface CreateCompanyModalProps {
  onClose: () => void;
  onCreate: (name: string, statement: string) => Promise<boolean>;
}

/**
 * CreateCompanyModal Component
 * Renders the organization registration popover overlay. Manages local input fields
 * and triggers parent organization registration API calls.
 */
export const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [statement, setStatement] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name.trim()) {
      toast.error("Company name is required.");
      return;
    }
    setLoading(true);
    const success = await onCreate(name, statement);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#131622] border border-zinc-200 dark:border-[#1f2438] rounded-3xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in duration-200">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438] pb-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Plus size={16} className="text-brand-orange" />
            Create GRC Profile
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Organization Name</label>
            <input 
              type="text"
              placeholder="e.g. Acme Corp"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Mission Statement</label>
            <textarea 
              placeholder="Risk mitigation statement..."
              value={statement}
              onChange={e => setStatement(e.target.value)}
              rows={2}
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/30 resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-white shadow-md shadow-brand-orange/20 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};
