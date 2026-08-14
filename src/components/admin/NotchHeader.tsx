import React, { useState } from 'react';
import { Search, X, Bell } from 'lucide-react';
import type { Company } from '../../types';
import reachGrcLogo from '../../assets/REACH_GRC.png';

interface NotchHeaderProps {
  company: Company | null;
  adminTab: 'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing';
  setAdminTab: (tab: 'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing') => void;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  sheetConfig: {
    lastSyncTime?: string | null;
    lastSyncStatus?: string | null;
    sheetTabName?: string;
    companiesSynced?: number;
  };
  handleToggleActiveState: (val: boolean) => Promise<void>;
}

/**
 * NotchHeader Component (Axoraa Style - Hover Expandable Dynamic Island)
 * Renders the top center-aligned navigation notch. Starts as a compact status pill
 * and expands smoothly on hover with a premium cubic-bezier easing to reveal controls.
 */
export const NotchHeader: React.FC<NotchHeaderProps> = ({
  company,
  adminTab,
  setAdminTab,
  globalSearch,
  setGlobalSearch,
  showNotifications,
  setShowNotifications,
  sheetConfig,
  handleToggleActiveState,
}) => {
  const [hovered, setHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Keep expanded if hovered, notifications popup is open, or search bar is focused
  const isExpanded = hovered || showNotifications || searchFocused;

  // Shared synchronized animation styles for a unified, glitch-free expansion
  const syncTransitionStyle = {
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDuration: '800ms',
  };

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={syncTransitionStyle}
      className={`absolute top-0 -mt-[1px] left-1/2 -translate-x-1/2 h-16 bg-[#0a0c12] border-b border-l border-r border-[#1a1e2b] rounded-b-[1.75rem] flex items-center justify-between z-30 shadow-[0_12px_40px_rgba(0,0,0,0.55)] select-none text-white transition-all ${
        isExpanded ? 'w-[92%] max-w-6xl px-8' : 'w-[280px] px-5'
      }`}
    >
      {/* Inverted curve flares to blend notch smoothly to canvas top border with matching strokes */}
      <svg 
        style={syncTransitionStyle}
        className="absolute top-0 right-full w-4 h-4 pointer-events-none transition-all" 
        viewBox="0 0 16 16"
      >
        <path d="M16 16 L16 0 L0 0 Q16 0 16 16 Z" fill="#0a0c12" />
        <path d="M0 0 Q16 0 16 16" fill="none" stroke="#1a1e2b" strokeWidth="1" />
      </svg>
      <svg 
        style={syncTransitionStyle}
        className="absolute top-0 left-full w-4 h-4 pointer-events-none transition-all" 
        viewBox="0 0 16 16"
      >
        <path d="M0 16 L0 0 L16 0 Q0 0 0 16 Z" fill="#0a0c12" />
        <path d="M16 0 Q0 0 0 16" fill="none" stroke="#1a1e2b" strokeWidth="1" />
      </svg>

      {/* Left Group: Logo and Security Hub / Audit Logs */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-brand-orange/5 border border-brand-orange/15 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(255,138,28,0.05)]">
            <img src={reachGrcLogo} alt="ReachGRC Logo" className="h-6 w-auto object-contain" />
          </div>
          <span className="text-sm font-black tracking-wider uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent inline">ReachGRC</span>
        </div>
        
        {/* Navigation links - smoothly expands max-width */}
        <div 
          style={{ ...syncTransitionStyle, transitionProperty: 'max-width, opacity' }}
          className={`flex items-center gap-4 transition-all overflow-hidden whitespace-nowrap ${
            isExpanded ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <div className="h-4 w-[1px] bg-zinc-800" />
          <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider text-zinc-455">
            <button 
              onClick={() => setAdminTab('grc')} 
              className={`transition-colors cursor-pointer ${adminTab === 'grc' ? 'text-white font-extrabold' : 'hover:text-white'}`}
            >
              Security Hub
            </button>
            <button 
              onClick={() => setAdminTab('sync')} 
              className={`transition-colors cursor-pointer ${adminTab === 'sync' ? 'text-white font-extrabold' : 'hover:text-white'}`}
            >
              Audit Logs
            </button>
          </nav>
        </div>
      </div>

      {/* Center Group: Live Monitor / Test Mode Badge - Positioned Dynamically to Prevent Overlap */}
      {company && (
        <div 
          style={{ ...syncTransitionStyle, transitionProperty: 'left, transform, background-color, border-color, padding, box-shadow' }}
          className={`absolute flex items-center gap-2.5 rounded-full border transition-all ${
            isExpanded 
              ? 'left-1/2 -translate-x-1/2 bg-[#131622]/60 border-[#1f2438]/80 px-4 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.2)]' 
              : 'left-[215px] -translate-x-0 bg-transparent border-transparent px-0 py-0 shadow-none'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${company.isActive ? 'bg-green-500 animate-pulse' : 'bg-brand-orange animate-pulse'}`} />
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-300">
            {company.isActive ? 'LIVE' : 'TEST'}
          </span>
          {isExpanded && (
            <div className="flex items-center gap-2 animate-in fade-in duration-300 delay-150">
              <div className="h-3 w-[1px] bg-zinc-800" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleActiveState(!company.isActive);
                }}
                className="bg-[#131622] hover:bg-[#1f2438] border border-[#1f2438] hover:border-brand-orange/50 px-2 py-0.5 rounded text-[8px] font-black uppercase text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {company.isActive ? 'Switch' : 'Go Live'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Right Group: Guides, API, Search, Notifications, Avatar */}
      <div 
        style={{ ...syncTransitionStyle, transitionProperty: 'max-width, opacity' }}
        className={`flex items-center gap-4 relative transition-all overflow-hidden ${
          isExpanded ? 'max-w-[600px] opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-4 min-w-[320px] justify-end">
          <nav className="hidden lg:flex items-center gap-4 text-[10px] font-black uppercase tracking-wider text-zinc-400 mr-2">
            <button 
              onClick={() => window.open('/docs/getting-started/overview', '_blank')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Guides
            </button>
            <button 
              onClick={() => setAdminTab('apikey')} 
              className={`transition-colors cursor-pointer ${adminTab === 'apikey' ? 'text-white font-extrabold' : 'hover:text-white'}`}
            >
              API
            </button>
          </nav>

          <div className="relative hidden sm:block">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search controls..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-[#131622] border border-[#1f2438]/85 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white focus:outline-none focus:border-brand-orange/40 w-36 placeholder-zinc-500 transition-all focus:w-44"
            />
            {globalSearch && (
              <button onClick={() => setGlobalSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-white cursor-pointer">
                <X size={10} />
              </button>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer relative ${showNotifications ? 'text-brand-orange bg-[#131622]' : 'text-zinc-400 hover:text-white'}`}
          >
            <Bell size={14} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          </button>
          
          {showNotifications && (
            <div className="absolute top-12 right-20 bg-[#0d0f17] border border-[#1f2438] rounded-xl shadow-2xl p-4 w-72 z-50 text-xs space-y-2.5 animate-in fade-in zoom-in-95 duration-200 text-left">
              <div className="flex items-center justify-between border-b border-[#1f2438] pb-2">
                <span className="font-black uppercase tracking-wider text-zinc-350 text-[10px]">Real-Time System Logs</span>
                <button onClick={() => setShowNotifications(false)} className="text-[9px] font-bold text-brand-orange hover:underline cursor-pointer">Dismiss</button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {sheetConfig.lastSyncTime ? (
                  <div className="p-2 rounded bg-[#131622] border border-[#1f2438]">
                    <p className="font-bold text-zinc-300 text-[10px]">Google Sheets Sync Status</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">
                      Status: {sheetConfig.lastSyncStatus || 'SUCCESS'}. Tab: {sheetConfig.sheetTabName}.
                  </p>
                    <span className="text-[8px] text-zinc-500 block mt-1">
                      Synced: {new Date(sheetConfig.lastSyncTime).toLocaleTimeString()}
                    </span>
                  </div>
                ) : (
                  <div className="p-2 rounded bg-[#131622] border border-[#1f2438]">
                    <p className="font-bold text-zinc-300 text-[10px]">Sync Monitor</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">Continuous Compliance check active.</p>
                  </div>
                )}
                {company && company.apiKey && (
                  <div className="p-2 rounded bg-[#131622] border border-[#1f2438]">
                    <p className="font-bold text-zinc-300 text-[10px]">API Security Credentials</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">
                      Key authorized. Status: {company.apiKeyStatus || 'ACTIVE'}. Plan: {company.subscriptionPlan || 'FREE'}.
                    </p>
                    <span className="text-[8px] text-zinc-500 block mt-1">
                      Issued: {company.apiKeyIssuedAt ? new Date(company.apiKeyIssuedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2.5 select-none hover:opacity-90 transition-opacity cursor-pointer" title="Logged in as GRC Root Operator">
            <div className="w-7 h-7 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center font-black text-[10px] tracking-wider uppercase shadow-[0_0_10px_rgba(255,138,28,0.1)]">
              AD
            </div>
            <div className="flex flex-col text-left hidden md:flex">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-200">System Admin</span>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest -mt-0.5">Root Operator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
