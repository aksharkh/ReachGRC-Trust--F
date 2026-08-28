import React, { useState } from 'react';
import { Shield, Search, Trash2, CheckCircle2, Clock, RefreshCw, Layers, Calendar, Plus, Play, Circle, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import type { Domain, JourneyMilestone } from '../../types';

interface TabDomainsControlsProps {
  domains: Domain[];
  setDomains: React.Dispatch<React.SetStateAction<Domain[]>>;
  milestones?: JourneyMilestone[];
  setMilestones?: React.Dispatch<React.SetStateAction<JourneyMilestone[]>>;
  globalSearch: string;
  saveDomainsAndControls: () => Promise<void>;
}

const DEFAULT_STANDARD_MILESTONES: JourneyMilestone[] = [
  {
    title: 'GRC Core Control Architecture Established',
    date: 'Jan 15, 2026',
    status: 'completed',
    description: 'Defined and mapped base compliance standards covering initial security domains.',
    orderIndex: 1
  },
  {
    title: 'Real-time Telemetry Synchronization Enabled',
    date: 'Mar 10, 2026',
    status: 'completed',
    description: 'Integrated Google Sheets automated catalog updates overriding static evidence.',
    orderIndex: 2
  },
  {
    title: 'External Attestation & Auditor Review',
    date: 'May 04, 2026',
    status: 'completed',
    description: 'Independent third-party assessor verification completed with full attestation.',
    orderIndex: 3
  },
  {
    title: 'Continuous Monitoring & Live Trust State',
    date: 'Jun 22, 2026',
    status: 'active',
    description: 'Active continuous posture state verified daily. Live security telemetry feeds.',
    orderIndex: 4
  },
  {
    title: 'Upcoming ISO 27001 Assessment Renewal',
    date: 'Nov 12, 2026',
    status: 'scheduled',
    description: 'Scheduled re-evaluation of system networks and database partitions.',
    orderIndex: 5
  }
];

/**
 * TabDomainsControls Component
 * Renders the compliance framework domains tree editor, Compliance Journey timeline editor,
 * and security frameworks mapping with real-time audit trails.
 */
export const TabDomainsControls: React.FC<TabDomainsControlsProps> = ({
  domains,
  setDomains,
  milestones = [],
  setMilestones,
  globalSearch: propGlobalSearch,
  saveDomainsAndControls,
}) => {
  // Local Interactive States
  const [subTab, setSubTab] = useState<'catalog' | 'mapping' | 'journey' | 'audit'>('catalog');
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OK' | 'ACTION'>('ALL');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE'>('ALL');

  // Milestone Actions
  const handleAddMilestone = () => {
    if (!setMilestones) return;
    const currentList = milestones.length > 0 ? milestones : DEFAULT_STANDARD_MILESTONES;
    const newOrder = currentList.length + 1;
    const newMilestone: JourneyMilestone = {
      title: 'New Compliance Milestone',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'scheduled',
      description: 'Milestone description detailing audit scope and security objectives.',
      orderIndex: newOrder
    };
    setMilestones([...currentList, newMilestone]);
    toast.success("Added new compliance journey milestone!");
  };

  const handleUpdateMilestone = (index: number, field: keyof JourneyMilestone, value: any) => {
    if (!setMilestones) return;
    const currentList = milestones.length > 0 ? [...milestones] : [...DEFAULT_STANDARD_MILESTONES];
    currentList[index] = {
      ...currentList[index],
      [field]: value
    };
    setMilestones(currentList);
  };

  const handleDeleteMilestone = (index: number, title: string) => {
    if (!setMilestones) return;
    const currentList = milestones.length > 0 ? [...milestones] : [...DEFAULT_STANDARD_MILESTONES];
    const updated = currentList.filter((_, i) => i !== index);
    setMilestones(updated);
    toast.info(`Deleted milestone "${title}"`);
  };

  const handleMoveMilestone = (index: number, direction: 'up' | 'down') => {
    if (!setMilestones) return;
    const currentList = milestones.length > 0 ? [...milestones] : [...DEFAULT_STANDARD_MILESTONES];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const temp = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = temp;

    // re-assign order indices
    currentList.forEach((m, idx) => {
      m.orderIndex = idx + 1;
    });

    setMilestones(currentList);
  };

  const handleResetToDefaultMilestones = () => {
    if (!setMilestones) return;
    setMilestones(DEFAULT_STANDARD_MILESTONES);
    toast.success("Restored standard GRC Compliance Journey!");
  };

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
    toast.info("Added control check");
  };

  const handleDeleteControl = (domainIdx: number, controlIdx: number) => {
    const updated = [...domains];
    updated[domainIdx].controls = updated[domainIdx].controls.filter((_, i) => i !== controlIdx);
    setDomains(updated);
  };

  // Helper metric calculations
  const totalControls = domains.reduce((acc, d) => acc + d.controls.length, 0);
  const passingControls = domains.reduce((acc, d) => acc + d.controls.filter(c => c.status === 'OK').length, 0);
  const score = totalControls > 0 ? Math.round((passingControls / totalControls) * 100) : 100;

  // Filter logic combined (search query + status filter + risk filter)
  const activeSearch = localSearch || propGlobalSearch;
  const activeMilestoneList = milestones.length > 0 ? milestones : DEFAULT_STANDARD_MILESTONES;

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
          {subTab === 'catalog' && (
            <button
              onClick={handleAddDomain}
              className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] text-zinc-700 dark:text-zinc-300 dark:hover:bg-[#1c1f2d] transition-all cursor-pointer"
            >
              + Add Domain
            </button>
          )}
          {subTab === 'journey' && (
            <button
              onClick={handleAddMilestone}
              className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] text-zinc-700 dark:text-zinc-300 dark:hover:bg-[#1c1f2d] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={13} />
              Add Milestone
            </button>
          )}
          <button
            onClick={saveDomainsAndControls}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-white transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Compliance Index card */}
      <div className="space-y-4">
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] relative group transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
          <p className="text-[9px] font-bold text-zinc-455 dark:text-zinc-550 uppercase tracking-widest">Overall Compliance Grade</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-zinc-900 dark:text-white">{score}%</span>
            <span className="text-xs text-zinc-400 font-medium">Compliance Index</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-850 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-brand-orange h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${score}%` }} 
            />
          </div>
        </div>

        {/* Secondary Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Framework Domains</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">{domains.length} Scope Groups</p>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-green-600 dark:text-green-405 uppercase tracking-wider font-semibold">Passing Checks (OK)</p>
            <p className="text-xs font-black uppercase tracking-wider text-green-600 dark:text-green-405 mt-2">
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
          <button 
            onClick={() => setSubTab('catalog')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              subTab === 'catalog' ? 'border-brand-orange text-brand-orange font-bold' : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            Compliance Catalog
          </button>
          <button 
            onClick={() => setSubTab('journey')}
            className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'journey' ? 'border-brand-orange text-brand-orange font-bold' : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            <Calendar size={13} />
            Compliance Journey
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
              {activeMilestoneList.length}
            </span>
          </button>
          <button 
            onClick={() => setSubTab('mapping')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              subTab === 'mapping' ? 'border-brand-orange text-brand-orange font-bold' : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            Security Framework Mapping
          </button>
          <button 
            onClick={() => setSubTab('audit')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              subTab === 'audit' ? 'border-brand-orange text-brand-orange font-bold' : 'border-transparent hover:text-zinc-900 dark:hover:text-white font-medium'
            }`}
          >
            Audit Trails
          </button>
        </div>
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:block">
          Standard Framework: ISO 27001
        </div>
      </div>

      {subTab === 'catalog' && (
        <>
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/40 dark:bg-[#090b11]/30 border border-zinc-200 dark:border-[#1f2438] p-3.5 rounded-xl text-xs">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1 border transition-all rounded-lg cursor-pointer font-bold ${
                  statusFilter === 'ALL' 
                    ? 'bg-white dark:bg-[#131622] text-zinc-900 dark:text-white border-zinc-250 dark:border-[#1f2438]' 
                    : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200 border-transparent'
                }`}
              >
                All Statuses
              </button>
              <button 
                onClick={() => setStatusFilter('OK')}
                className={`px-3 py-1 border transition-all rounded-lg cursor-pointer font-bold ${
                  statusFilter === 'OK' 
                    ? 'bg-white dark:bg-[#131622] text-green-600 border-zinc-250 dark:border-[#1f2438]' 
                    : 'text-zinc-500 hover:text-green-600 border-transparent'
                }`}
              >
                Active OK
              </button>
              <button 
                onClick={() => setStatusFilter('ACTION')}
                className={`px-3 py-1 border transition-all rounded-lg cursor-pointer font-bold ${
                  statusFilter === 'ACTION' 
                    ? 'bg-white dark:bg-[#131622] text-brand-orange border-zinc-250 dark:border-[#1f2438]' 
                    : 'text-zinc-500 hover:text-brand-orange border-transparent'
                }`}
              >
                Needs Action
              </button>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <select 
                value={riskFilter} 
                onChange={e => setRiskFilter(e.target.value as any)}
                className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-lg cursor-pointer focus:outline-none"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="HIGH">High Risk</option>
                <option value="MODERATE">Moderate Risk</option>
              </select>
              <div className="relative">
                <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text"
                  placeholder="Search controls..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="bg-white dark:bg-[#131622] border border-zinc-250 dark:border-[#1f2438] text-zinc-800 dark:text-zinc-300 pl-7 pr-2.5 py-1 rounded-lg focus:outline-none placeholder-zinc-400"
                />
              </div>
            </div>
          </div>

          {domains.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-[#1f2438]/80 rounded-2xl text-zinc-500 dark:text-zinc-550 text-sm font-light">
              No domains configured. Click "+ Add Domain" to construct catalog.
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {domains
                .filter(domain => {
                  if (!activeSearch) return true;
                  const query = activeSearch.toLowerCase();
                  const matchesDomain = domain.name.toLowerCase().includes(query);
                  const matchesControl = domain.controls.some(c => 
                    c.name.toLowerCase().includes(query) || 
                    (c.remarks?.toLowerCase().includes(query) || false)
                  );
                  return matchesDomain || matchesControl;
                })
                .map((domain, dIdx) => {
                  // Filter controls locally based on active filters
                  const filteredControls = domain.controls.filter(c => {
                    // Search query check
                    if (activeSearch) {
                      const query = activeSearch.toLowerCase();
                      const matchName = c.name.toLowerCase().includes(query);
                      const matchRemarks = c.remarks?.toLowerCase().includes(query) || false;
                      if (!matchName && !matchRemarks) return false;
                    }
                    // Status check
                    if (statusFilter === 'OK') {
                      if (c.status !== 'OK') return false;
                    } else if (statusFilter === 'ACTION') {
                      if (c.status === 'OK') return false;
                    }
                    // Risk level simulated check
                    if (riskFilter === 'HIGH') {
                      // High risk simulation: controls containing "Access" or "Encrypt"
                      const isHigh = c.name.toLowerCase().includes('access') || c.name.toLowerCase().includes('encrypt') || c.name.toLowerCase().includes('credentials');
                      if (!isHigh) return false;
                    } else if (riskFilter === 'MODERATE') {
                      const isHigh = c.name.toLowerCase().includes('access') || c.name.toLowerCase().includes('encrypt') || c.name.toLowerCase().includes('credentials');
                      if (isHigh) return false;
                    }
                    return true;
                  });

                  return (
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
                        <div className="grid grid-cols-12 gap-3 text-[10px] font-bold text-zinc-405 dark:text-zinc-500 uppercase tracking-wider px-3">
                          <div className="col-span-4">Control Name</div>
                          <div className="col-span-2">Status</div>
                          <div className="col-span-5">Remarks</div>
                          <div className="col-span-1 text-right">Delete</div>
                        </div>

                        {filteredControls.length === 0 ? (
                          <div className="text-center py-6 bg-zinc-50/20 dark:bg-[#090b11]/40 border border-dashed border-zinc-200 dark:border-[#1f2438]/80 rounded-xl text-zinc-400 dark:text-zinc-500 text-xs">
                            No controls match the selected filters inside this domain.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {filteredControls.map((control, cIdx) => {
                              // Find real index in domain.controls array for mutations
                              const realIdx = domain.controls.findIndex(c => c === control);
                              if (realIdx === -1) return null;

                              return (
                                <div key={cIdx} className="grid grid-cols-12 gap-3 items-center bg-zinc-100/30 dark:bg-[#090b11]/60 p-3 rounded-xl border border-zinc-200 dark:border-[#1f2438]">
                                  <div className="col-span-4">
                                    <input 
                                      type="text"
                                      value={control.name}
                                      onChange={(e) => {
                                        const updated = [...domains];
                                        updated[dIdx].controls[realIdx].name = e.target.value;
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
                                        updated[dIdx].controls[realIdx].status = e.target.value as any;
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
                                        updated[dIdx].controls[realIdx].remarks = e.target.value;
                                        setDomains(updated);
                                      }}
                                      placeholder="Audit remarks"
                                      className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-250 dark:border-[#1f2438] rounded-lg px-3 py-1.5 text-xs text-zinc-750 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-550 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
                                    />
                                  </div>

                                  <div className="col-span-1 text-right">
                                    <button
                                      onClick={() => handleDeleteControl(dIdx, realIdx)}
                                      className="p-2 rounded-lg bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 cursor-pointer inline-flex"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
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
                  );
                })}
            </div>
          )}
        </>
      )}

      {/* Compliance Journey Timeline Sub-Tab */}
      {subTab === 'journey' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brand-orange/5 border border-brand-orange/20">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar size={16} className="text-brand-orange" />
                Organization Compliance Roadmap
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                Manage dynamic audit dates, accreditation stages, and continuous monitoring milestones displayed on the public Trust Center.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetToDefaultMilestones}
                className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
              >
                Reset Standard Roadmap
              </button>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="px-3.5 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-bold shadow-sm hover:bg-brand-orange/90 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus size={13} />
                + Add Milestone
              </button>
            </div>
          </div>

          {/* Dynamic Milestones List */}
          <div className="space-y-4">
            {activeMilestoneList.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';

              return (
                <div 
                  key={index}
                  className={`p-5 rounded-2xl border transition-all duration-200 bg-white dark:bg-[#131622] space-y-4 shadow-sm ${
                    isActive 
                      ? 'border-brand-orange/40 ring-1 ring-brand-orange/20' 
                      : 'border-zinc-200 dark:border-[#1f2438] hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {/* Top Bar: Sequence, Status, Order controls, Delete */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-[#1f2438]/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-black flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        isCompleted 
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' 
                          : isActive 
                            ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20 animate-pulse' 
                            : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800'
                      }`}>
                        {isCompleted && <CheckCircle2 size={10} />}
                        {isActive && <Play size={8} className="rotate-90 fill-current" />}
                        {item.status === 'scheduled' && <Circle size={8} className="fill-current" />}
                        {item.status?.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleMoveMilestone(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveMilestone(index, 'down')}
                        disabled={index === activeMilestoneList.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMilestone(index, item.title)}
                        title="Delete Milestone"
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="sm:col-span-6 space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Milestone Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateMilestone(index, 'title', e.target.value)}
                        placeholder="e.g. GRC Core Control Architecture Established"
                        className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-3.5 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 transition-all"
                      />
                    </div>

                    {/* Date */}
                    <div className="sm:col-span-3 space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date / Target Window</label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => handleUpdateMilestone(index, 'date', e.target.value)}
                        placeholder="e.g. Jan 15, 2026"
                        className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-3.5 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 transition-all"
                      />
                    </div>

                    {/* Status */}
                    <div className="sm:col-span-3 space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Compliance Status</label>
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateMilestone(index, 'status', e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 transition-all cursor-pointer font-semibold"
                      >
                        <option value="completed">Completed (Attested)</option>
                        <option value="active">Active (In Progress)</option>
                        <option value="scheduled">Scheduled (Upcoming)</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-12 space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Milestone Description & Scope</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleUpdateMilestone(index, 'description', e.target.value)}
                        placeholder="Detailed explanation of the compliance check, standard, or accreditation result..."
                        className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-3.5 py-2 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 transition-all resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {subTab === 'mapping' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-300">
          {[
            { name: 'ISO/IEC 27001:2022', desc: 'Information Security Management System framework standard requirements.', mapped: 8, progress: Math.min(score + 5, 100), icon: <Shield size={16} /> },
            { name: 'SOC 2 Type II', desc: 'Trust Services Criteria auditing standard for security, availability, processing integrity, confidentiality, and privacy.', mapped: 12, progress: score, icon: <Layers size={16} /> },
            { name: 'GDPR Privacy Rule', desc: 'European Union data protection and privacy safeguard compliance requirements.', mapped: 5, progress: Math.max(score - 10, 0), icon: <Shield size={16} /> },
            { name: 'HIPAA Safeguards', desc: 'US national security standards for protecting electronic protected health information (ePHI).', mapped: 7, progress: Math.min(score + 2, 100), icon: <Layers size={16} /> }
          ].map((fw, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#131622] card-pattern-light dark:card-pattern-dark border border-zinc-200 dark:border-[#1f2438] relative overflow-hidden flex flex-col justify-between h-48 shadow-md">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-lg">
                    {fw.icon}
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{fw.name}</h4>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed">{fw.desc}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-zinc-450 dark:text-zinc-500">{fw.mapped} Mapped Controls</span>
                  <span className="text-brand-orange">{fw.progress}% Compliant</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-850 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-red to-brand-orange h-1.5 rounded-full transition-all duration-700" 
                    style={{ width: `${fw.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === 'audit' && (
        <div className="bg-white dark:bg-[#131622] card-pattern-light dark:card-pattern-dark border border-zinc-200 dark:border-[#1f2438] rounded-2xl p-5 space-y-4 shadow-md animate-in fade-in duration-300">
          <div className="border-b border-zinc-200 dark:border-[#1f2438] pb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Real-time GRC Activity Audit Log</h4>
            <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/5 border border-brand-orange/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <RefreshCw size={8} className="animate-spin" />
              Live Feed
            </span>
          </div>

          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {[
              { time: 'Today, 18:05', title: 'GRC Catalog Saved', text: 'Admin saved domain mappings and modified control scopes.', operator: 'System Admin (AD)', type: 'OK' },
              { time: 'Today, 17:15', title: 'API Key Generated', text: 'Rotated API credentials workspace tokens.', operator: 'Root Operator', type: 'OK' },
              { time: 'Today, 15:30', title: 'Google Sheets Compliance Sync', text: 'Check triggered manually. Mapped 10 active domains.', operator: 'System Trigger', type: 'SYNC' },
              { time: 'Yesterday, 14:22', title: 'Security Document Classified', text: 'Updated logo assets classification to BRAND_LOGO.', operator: 'Admin User', type: 'OK' },
              { time: 'Aug 15, 11:10', title: 'Workspace Settings Updated', text: 'Modified location name coordinates visualizer.', operator: 'Root Operator', type: 'OK' },
              { time: 'Aug 14, 09:05', title: 'Razorpay Billing Sync', text: 'Simulated subscription transaction verification callback.', operator: 'Razorpay Webhook', type: 'BILL' }
            ].map((log, idx) => (
              <div key={idx} className="flex gap-4 p-3 rounded-xl bg-zinc-50/50 dark:bg-[#090b11]/50 border border-zinc-200/60 dark:border-[#1f2438]/50 text-xs">
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className={`p-1.5 rounded-lg border ${
                    log.type === 'SYNC' 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' 
                      : log.type === 'BILL' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-500'
                        : 'bg-brand-orange/10 border-brand-orange/20 text-brand-orange'
                  }`}>
                    {log.type === 'SYNC' ? <RefreshCw size={12} /> : log.type === 'BILL' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-zinc-800 dark:text-zinc-200">{log.title}</p>
                    <span className="text-[8px] text-zinc-400 font-mono">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{log.text}</p>
                  <div className="flex items-center gap-1.5 pt-1 text-[9px] text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider">
                    <span>Operator: {log.operator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
