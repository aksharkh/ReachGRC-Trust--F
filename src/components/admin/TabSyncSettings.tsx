import React from 'react';
import { FileSpreadsheet, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

interface TabSyncSettingsProps {
  sheetConfig: {
    id?: number | null;
    spreadsheetId: string;
    sheetTabName: string;
    sheetUrl: string;
    syncEnabled: boolean;
    lastSyncTime?: string | null;
    lastSyncStatus?: string | null;
    companiesSynced?: number;
  };
  setSheetConfig: React.Dispatch<React.SetStateAction<any>>;
  triggerSync: () => Promise<void>;
  syncing: boolean;
  saveSheetConfig: () => Promise<void>;
  savingConfig: boolean;
}

/**
 * TabSyncSettings Component
 * Displays Google Sheets sync configuration inputs, toggles, trigger actions,
 * and sync activity reports.
 */
export const TabSyncSettings: React.FC<TabSyncSettingsProps> = ({
  sheetConfig,
  setSheetConfig,
  triggerSync,
  syncing,
  saveSheetConfig,
  savingConfig,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Tab Header & Action Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#1f2438]/80 pb-5">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="text-brand-orange" size={20} />
            Google Sheets GRC Sync Integration
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">
            Configure global synchronization parameters for updating trust profiles.
          </p>
        </div>
        <button
          onClick={triggerSync}
          disabled={syncing || !sheetConfig.syncEnabled}
          className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 disabled:from-zinc-200 disabled:to-zinc-200 dark:disabled:from-zinc-800 dark:disabled:to-[#111219] text-white disabled:text-zinc-450 dark:disabled:text-zinc-600 shadow-md shadow-brand-orange/20 disabled:shadow-none transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing..." : "Sync Now"}
        </button>
      </div>

      {/* Sync Status Cards Grid */}
      <div className="space-y-4">
        {/* Large Connected Source Card */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/30 dark:bg-[#090b11] relative group transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
          <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Synced Database Source</p>
          <p className="text-xl font-black text-zinc-900 dark:text-white mt-1.5">Google Sheets Integration</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-450 mt-1 truncate font-mono">
            Feed ID: {sheetConfig.spreadsheetId || "Not Connected"}
          </p>
        </div>
        
        {/* Metric columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Sync State</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className={`w-2 h-2 rounded-full ${sheetConfig.syncEnabled ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-zinc-450'}`} />
              <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                {sheetConfig.syncEnabled ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Synced Items</p>
            <p className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mt-2">
              {sheetConfig.companiesSynced || 0} Organizations
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] transition-all hover:border-zinc-300 dark:hover:border-zinc-850">
            <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Last Sync Attempt</p>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-2 truncate">
              {sheetConfig.lastSyncTime ? new Date(sheetConfig.lastSyncTime).toLocaleString() : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Spreadsheet ID</label>
          <input 
            type="text" 
            value={sheetConfig.spreadsheetId}
            onChange={e => setSheetConfig({ ...sheetConfig, spreadsheetId: e.target.value })}
            placeholder="e.g. 1mX3LM0cBCHi27-V6hvu3O_qqoLp289coeSX0JcNma6s"
            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Tab Name</label>
          <input 
            type="text" 
            value={sheetConfig.sheetTabName}
            onChange={e => setSheetConfig({ ...sheetConfig, sheetTabName: e.target.value })}
            placeholder="Sheet1"
            className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Google Sheets URL</label>
        <input 
          type="text" 
          value={sheetConfig.sheetUrl}
          onChange={e => setSheetConfig({ ...sheetConfig, sheetUrl: e.target.value })}
          placeholder="https://docs.google.com/spreadsheets/d/..."
          className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange/40 focus:ring-1 focus:ring-brand-orange/30 hover:dark:border-zinc-700/80 transition-all"
        />
      </div>

      {/* Switch Toggler */}
      <div className="flex items-center justify-between p-5 bg-zinc-50 dark:bg-[#090b11]/60 border border-zinc-200 dark:border-[#1f2438]/80 rounded-2xl">
        <div>
          <p className="text-sm font-bold text-zinc-900 dark:text-white">Enable Synchronization</p>
          <p className="text-xs text-zinc-550 dark:text-zinc-500 mt-0.5 font-light">Allow catalog synchronization updates to override local database</p>
        </div>
        <button
          onClick={() => setSheetConfig({ ...sheetConfig, syncEnabled: !sheetConfig.syncEnabled })}
          className="text-brand-orange hover:text-brand-orange/85 transition-colors cursor-pointer"
        >
          {sheetConfig.syncEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-zinc-300 dark:text-zinc-700" />}
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={saveSheetConfig}
          disabled={savingConfig}
          className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-white shadow-md shadow-brand-orange/20 cursor-pointer disabled:from-zinc-200 disabled:to-zinc-200 dark:disabled:from-zinc-800 dark:disabled:to-zinc-850"
        >
          {savingConfig ? "Saving..." : "Save Config"}
        </button>
      </div>

      {/* Telemetry output log detail block */}
      {sheetConfig.lastSyncTime && (
        <div className="border-t border-zinc-200 dark:border-[#1f2438]/80 pt-6 space-y-3">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-2">Sync Telemetry</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] backdrop-blur-sm relative group overflow-hidden">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Sync Status</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] ${
                  sheetConfig.lastSyncStatus?.startsWith("SUCCESS") ? "text-green-600 dark:text-green-400" : "text-brand-red"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sheetConfig.lastSyncStatus?.startsWith("SUCCESS") ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" : "bg-brand-red shadow-[0_0_6px_rgba(239,68,68,0.5)]"}`}></span>
                  {sheetConfig.lastSyncStatus || "UNKNOWN"}
                </span>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] backdrop-blur-sm relative group overflow-hidden">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Last Synchronized</p>
              <p className="font-bold text-zinc-700 dark:text-zinc-300 mt-2.5 truncate">{new Date(sheetConfig.lastSyncTime).toLocaleString()}</p>
            </div>
            
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#1f2438] bg-zinc-50/50 dark:bg-[#090b11] backdrop-blur-sm relative group overflow-hidden">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Sync Output</p>
              <p className="font-extrabold text-brand-orange mt-2 text-sm">{sheetConfig.companiesSynced} Active Profiles</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
