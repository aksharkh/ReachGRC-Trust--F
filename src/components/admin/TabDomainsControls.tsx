import React from 'react';
import { Shield, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Domain } from '../../types';

interface TabDomainsControlsProps {
  domains: Domain[];
  setDomains: React.Dispatch<React.SetStateAction<Domain[]>>;
  globalSearch: string;
  saveDomainsAndControls: () => Promise<void>;
}

/**
 * TabDomainsControls Component
 * Renders the compliance framework domains tree editor. Supports adding, editing,
 * deleting domains and controls, along with changing status values and remarks.
 */
export const TabDomainsControls: React.FC<TabDomainsControlsProps> = ({
  domains,
  setDomains,
  globalSearch,
  saveDomainsAndControls,
}) => {
  
  const handleAddDomain = () => {
    setDomains([...domains, {
      id: null as any,
      name: 'New Domain',
      controls: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]);
    toast.info("Added new compliance domain");
  };

  const handleDeleteDomain = (index: number, name: string) => {
    const updated = domains.filter((_, i) => i !== index);
    setDomains(updated);
    toast.info(`Deleted domain "${name}"`);
  };

  const handleAddControl = (domainIdx: number) => {
    const updated = [...domains];
    updated[domainIdx].controls.push({
      id: null as any,
      name: 'New Control',
      status: 'PENDING',
      remarks: 'Remarks description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setDomains(updated);
  };

  const handleDeleteControl = (domainIdx: number, controlIdx: number) => {
    const updated = [...domains];
    updated[domainIdx].controls = updated[domainIdx].controls.filter((_, i) => i !== controlIdx);
    setDomains(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#1f2438]/80 pb-5 animate-in fade-in duration-200">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Shield className="text-brand-orange" size={20} />
            GRC Domains & Controls Editor
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">Configure compliance framework controls and remarks status</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handleAddDomain}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] text-zinc-700 dark:text-zinc-300 dark:hover:bg-[#1c1f2d] transition-all cursor-pointer"
          >
            + Add Domain
          </button>
          <button
            onClick={saveDomainsAndControls}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-white transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
          >
            Save Catalog
          </button>
        </div>
      </div>

      {/* Compliance Index card */}
      <div className="space-y-4">
        {(() => {
          const totalControls = domains.reduce((acc, d) => acc + d.controls.length, 0);
          const passingControls = domains.reduce((acc, d) => acc + d.controls.filter(c => c.status === 'OK').length, 0);
          const score = totalControls > 0 ? Math.round((passingControls / totalControls) * 100) : 100;
          
          return (
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] relative group transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
              <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-widest">Overall Compliance Grade</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-black text-zinc-900 dark:text-white">{score}%</span>
                <span className="text-xs text-zinc-400 font-medium">Compliance Index</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className="bg-brand-orange h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${score}%` }} 
                />
              </div>
            </div>
          );
        })()}

        {/* Secondary Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Framework Domains</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">{domains.length} Scope Groups</p>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Passing Checks (OK)</p>
            <p className="text-xs font-black uppercase tracking-wider text-green-600 dark:text-green-400 mt-2">
              {domains.reduce((acc, d) => acc + d.controls.filter(c => c.status === 'OK').length, 0)} Verified
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-brand-orange uppercase tracking-wider">Pending Audits</p>
            <p className="text-xs font-black uppercase tracking-wider text-brand-orange mt-2">
              {domains.reduce((acc, d) => acc + d.controls.filter(c => c.status === 'PENDING' || c.status === 'NOT_OK').length, 0)} Action Items
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="border-b border-zinc-200 dark:border-[#1f2438]/80 pb-0 flex items-center justify-between">
        <div className="flex gap-6 text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <button className="pb-3 border-b-2 border-brand-orange text-brand-orange font-bold">Compliance Catalog</button>
          <button className="pb-3 border-b-2 border-transparent hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer font-medium">Security Framework Mapping</button>
          <button className="pb-3 border-b-2 border-transparent hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer font-medium">Audit Trails</button>
        </div>
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
          Standard Framework: ISO 27001
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/40 dark:bg-[#090b11]/30 border border-zinc-200 dark:border-[#1f2438] p-3.5 rounded-xl text-xs">
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border border-zinc-250 dark:border-[#1f2438] font-bold rounded-lg cursor-pointer">All Statuses</button>
          <button className="px-3 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent font-medium rounded-lg cursor-pointer">Active OK</button>
          <button className="px-3 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent font-medium rounded-lg cursor-pointer">Needs Action</button>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-lg cursor-pointer focus:outline-none">
            <option>All Risk Levels</option>
            <option>High Risk</option>
            <option>Moderate Risk</option>
          </select>
          <div className="relative">
            <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search controls..."
              className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 pl-7 pr-2.5 py-1 rounded-lg focus:outline-none placeholder-zinc-400"
            />
          </div>
        </div>
      </div>

      {domains.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-[#1f2438]/80 rounded-2xl text-zinc-500 dark:text-zinc-500 text-sm font-light">
          No domains configured. Click "+ Add Domain" to construct catalog.
        </div>
      ) : (
        <div className="space-y-6">
          {domains
            .filter(domain => {
              if (!globalSearch) return true;
              const query = globalSearch.toLowerCase();
              const matchesDomain = domain.name.toLowerCase().includes(query);
              const matchesControl = domain.controls.some(c => 
                c.name.toLowerCase().includes(query) || 
                (c.remarks?.toLowerCase().includes(query) || false)
              );
              return matchesDomain || matchesControl;
            })
            .map((domain, dIdx) => (
            <div key={dIdx} className="relative overflow-hidden bg-white dark:bg-[#131622] card-pattern-light dark:card-pattern-dark border border-zinc-200 dark:border-[#1f2438] rounded-2xl p-6 space-y-5 shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red to-brand-orange z-10" />
              
              {/* Domain Header bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-widest bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] px-2.5 py-1 rounded-lg">Domain</span>
                  <input
                    type="text"
                    value={domain.name}
                    onChange={(e) => {
                      const updated = [...domains];
                      updated[dIdx].name = e.target.value;
                      setDomains(updated);
                    }}
                    className="bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438] rounded-xl px-4 py-2 text-xs text-zinc-900 dark:text-white font-bold focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all flex-1"
                  />
                </div>
                <button
                  onClick={() => handleDeleteDomain(dIdx, domain.name)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 transition-all cursor-pointer"
                >
                  Delete Domain
                </button>
              </div>

              {/* Controls List */}
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3">
                  <div className="col-span-4">Control Name</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-5">Remarks</div>
                  <div className="col-span-1 text-right">Delete</div>
                </div>

                {domain.controls.length === 0 ? (
                  <div className="text-center py-6 bg-zinc-50/20 dark:bg-[#090b11]/40 border border-dashed border-zinc-200 dark:border-[#1f2438]/80 rounded-xl text-zinc-400 dark:text-zinc-500 text-xs">
                    No compliance controls defined inside this domain.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {domain.controls
                      .filter(c => {
                        if (!globalSearch) return true;
                        const query = globalSearch.toLowerCase();
                        return c.name.toLowerCase().includes(query) || (c.remarks?.toLowerCase().includes(query) || false);
                      })
                      .map((control, cIdx) => (
                      <div key={cIdx} className="grid grid-cols-12 gap-3 items-center bg-zinc-100/30 dark:bg-[#090b11]/60 p-3 rounded-xl border border-zinc-200 dark:border-[#1f2438]">
                        <div className="col-span-4">
                          <input 
                            type="text"
                            value={control.name}
                            onChange={(e) => {
                              const updated = [...domains];
                              updated[dIdx].controls[cIdx].name = e.target.value;
                              setDomains(updated);
                            }}
                            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
                          />
                        </div>

                        <div className="col-span-2">
                          <select
                            value={control.status}
                            onChange={(e) => {
                              const updated = [...domains];
                              updated[dIdx].controls[cIdx].status = e.target.value as any;
                              setDomains(updated);
                            }}
                            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all cursor-pointer"
                          >
                            <option value="OK">OK</option>
                            <option value="NOT_OK">NOT_OK</option>
                            <option value="PENDING">PENDING</option>
                          </select>
                        </div>

                        <div className="col-span-5">
                          <input 
                            type="text"
                            value={control.remarks || ''}
                            onChange={(e) => {
                              const updated = [...domains];
                              updated[dIdx].controls[cIdx].remarks = e.target.value;
                              setDomains(updated);
                            }}
                            placeholder="Audit remarks"
                            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438] rounded-lg px-3 py-1.5 text-xs text-zinc-750 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-550 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
                          />
                        </div>

                        <div className="col-span-1 text-right">
                          <button
                            onClick={() => handleDeleteControl(dIdx, cIdx)}
                            className="p-2 rounded-lg bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 cursor-pointer inline-flex"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => handleAddControl(dIdx)}
                    className="px-3.5 py-2 rounded-xl text-[10px] font-bold bg-zinc-100 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] text-zinc-500 dark:text-zinc-405 hover:text-zinc-800 dark:hover:text-zinc-250 transition-colors cursor-pointer"
                  >
                    + Add Control
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
