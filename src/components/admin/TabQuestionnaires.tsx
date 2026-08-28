import React, { useEffect, useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  RefreshCw,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import type { Company, SecurityQuestionnaire } from '../../types';
import { fetchCompanyQuestionnaires, fetchAllQuestionnaires, updateQuestionnaireStatus } from '../../services/api';

interface TabQuestionnairesProps {
  company: Company | null;
}

export const TabQuestionnaires: React.FC<TabQuestionnairesProps> = ({ company }) => {
  const [questionnaires, setQuestionnaires] = useState<SecurityQuestionnaire[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      if (company?.id) {
        const data = await fetchCompanyQuestionnaires(company.id);
        setQuestionnaires(data);
      } else {
        const data = await fetchAllQuestionnaires();
        setQuestionnaires(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load questionnaire submissions from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [company?.id]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateQuestionnaireStatus(id, newStatus);
      setQuestionnaires(prev => prev.map(q => q.id === id ? { ...q, status: newStatus as any } : q));
      toast.success(`Updated ticket status to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status in database.');
    }
  };

  const filtered = questionnaires.filter(q => {
    const matchesSearch = 
      q.ticketId?.toLowerCase().includes(search.toLowerCase()) ||
      q.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase()) ||
      q.requesterCompany?.toLowerCase().includes(search.toLowerCase()) ||
      q.frameworkType?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <ClipboardList className="text-brand-orange" size={20} />
            Vendor Security Inquiries & Questionnaires
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Real-time database records of custom SIG, CAIQ, VSA, and RFP requests submitted from the Trust Center.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Total Inquiries</span>
          <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">{questionnaires.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Review</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {questionnaires.filter(q => q.status === 'PENDING').length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Completed SLA</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {questionnaires.filter(q => q.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tickets, names, emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/50 transition-colors placeholder-zinc-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'PENDING', 'IN_REVIEW', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-brand-orange text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Questionnaires Table */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Requester</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Framework</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-zinc-400">
                    {loading ? 'Querying database...' : 'No security questionnaire requests found in database.'}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-orange">
                      {item.ticketId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-white">{item.fullName}</div>
                      <a href={`mailto:${item.email}`} className="text-[11px] text-zinc-400 hover:text-brand-orange transition-colors flex items-center gap-1 mt-0.5">
                        <Mail size={10} /> {item.email}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-zinc-800 dark:text-zinc-200">
                      {item.requesterCompany}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] font-bold">
                        {item.frameworkType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px]">
                      {item.targetDate || 'Flexible'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={item.status || 'PENDING'}
                        onChange={(e) => item.id && handleStatusChange(item.id, e.target.value)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          item.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                            : item.status === 'IN_REVIEW'
                              ? 'bg-sky-500/10 text-sky-600 border-sky-500/30'
                              : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_REVIEW">IN_REVIEW</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.notes && (
                        <button
                          onClick={() => toast.info(`Notes for ${item.ticketId}: "${item.notes}"`)}
                          className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
                        >
                          View Notes
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
