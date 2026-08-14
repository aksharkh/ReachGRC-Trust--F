import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  Shield, 
  Key, 
  CreditCard, 
  Moon, 
  Sun 
} from 'lucide-react';
import type { Company } from '../../types';
import reachGrcLogo from '../../assets/REACH_GRC.png';

interface AdminSidebarProps {
  id: string;
  company: Company | null;
  allCompanies: Company[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowCreateModal: (show: boolean) => void;
  adminTab: 'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing';
  setAdminTab: (tab: 'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing') => void;
  theme: 'light' | 'dark';
  toggleTheme: (event?: React.MouseEvent) => void;
  handleLogout: () => void;
}

/**
 * AdminSidebar Component
 * Handles the organizational selector search lists, Tab navigations list,
 * Dark/Light theme toggles, and Root Admin logout triggers.
 */
export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  id,
  company,
  allCompanies,
  searchQuery,
  setSearchQuery,
  setShowCreateModal,
  adminTab,
  setAdminTab,
  theme,
  toggleTheme,
  handleLogout,
}) => {
  const navigate = useNavigate();

  // Filter organizations list based on query state
  const filteredCompanies = allCompanies.filter(c =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-80 border-r border-zinc-200 dark:border-[#1f2438] bg-[#f8f9fa] dark:bg-[#0d0f17] p-6 pt-20 flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none">
      <div className="space-y-6">
        
        {/* Logo / Header */}
        <div className="flex items-center gap-3">
          <div className="p-1 bg-brand-orange/5 border border-brand-orange/15 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,138,28,0.05)]">
            <img src={reachGrcLogo} alt="ReachGRC Logo" className="h-6 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-black text-zinc-900 dark:text-white tracking-wider uppercase">ReachGRC</h1>
            <p className="text-[10px] text-zinc-550 dark:text-zinc-500 font-bold uppercase tracking-widest">GRC Portal Admin</p>
          </div>
        </div>

        {/* Company Search and list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Organizations</label>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-[10px] font-bold text-brand-orange hover:text-brand-orange/85 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus size={10} /> Create New
            </button>
          </div>

          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-555" />
            <input
              type="text"
              placeholder="Filter organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
          </div>

          {/* Company List Box */}
          <div className="max-h-50 overflow-y-auto space-y-1 border border-zinc-200 dark:border-[#1f2438] rounded-xl p-1 bg-zinc-100/30 dark:bg-[#090b11]/60">
            {filteredCompanies.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  navigate(`/admin/company/${c.id}`);
                  setAdminTab('profile');
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  Number(id) === c.id 
                    ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 border border-transparent'
                }`}
              >
                <span className="truncate">{c.companyName}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-green-500' : 'bg-brand-red'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider block mb-2">Sections</label>
          
          {/* Standalone Sync Settings */}
          <button
            onClick={() => setAdminTab('sync')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              adminTab === 'sync' 
                ? 'bg-brand-orange/10 border-l-4 border-l-brand-orange text-brand-orange dark:text-brand-orange font-bold' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs">
              <FileSpreadsheet size={14} className={adminTab === 'sync' ? 'text-brand-orange' : 'text-zinc-400 dark:text-zinc-555'} />
              Google Sheets Sync
            </div>
          </button>

          {company && (
            <>
              <div className="border-t border-zinc-200 dark:border-[#1f2438] my-2" />
              <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider px-3.5 mb-1.5 truncate">
                Settings: {company.companyName}
              </p>

              {[
                { id: 'profile', label: 'Company Profile', icon: <Settings size={14} /> },
                { id: 'grc', label: 'Domains & Controls', icon: <Shield size={14} /> },
                { id: 'media', label: 'Media & Documents', icon: <Plus size={14} /> },
                { id: 'apikey', label: 'API Credentials', icon: <Key size={14} /> },
                { id: 'billing', label: 'Billing & Subscriptions', icon: <CreditCard size={14} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    adminTab === tab.id 
                      ? 'bg-brand-orange/10 border-l-4 border-l-brand-orange text-brand-orange dark:text-brand-orange font-bold' 
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className={adminTab === tab.id ? 'text-brand-orange' : 'text-zinc-400 dark:text-zinc-555'}>{tab.icon}</span>
                    {tab.label}
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Floating Theme Toggler and Logout triggers */}
      <div className="flex flex-col gap-3 border-t border-zinc-200 dark:border-[#1f2438] pt-4">
        <button
          onClick={(e) => toggleTheme(e)}
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-[#090b11] hover:bg-zinc-200 dark:hover:bg-[#1c1f2d] text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span className="text-[10px] text-zinc-450 dark:text-zinc-550">Switch</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 transition-all cursor-pointer"
        >
          Logout Session
        </button>

        <div className="text-[10px] text-zinc-400 dark:text-zinc-550 font-semibold text-center mt-1">
          ReachGRC
        </div>
      </div>
    </aside>
  );
};
