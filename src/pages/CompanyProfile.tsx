import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyData } from '../services/api';
import { Preloader } from '../components/Preloader';
import { TrustBadge } from '../components/TrustBadge';
import { SecurityControlsGrid } from '../components/SecurityControlsGrid';
import { DocumentSection } from '../components/DocumentSection';
import { FAQSection } from '../components/FAQSection';
import type { Company, Domain } from '../types';
import { Toaster, toast } from 'sonner';
import { 
  Settings, 
  RefreshCw, 
  Key, 
  CreditCard, 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  FileSpreadsheet,
  ToggleLeft,
  ToggleRight,
  Shield,
  Clock,
  Search,
  Plus,
  Trash2,
  X
} from 'lucide-react';

/**
 * CompanyProfile component.
 * Acts as the public Trust Center landing page for clients (e.g. /company/:id)
 * OR renders a fully featured, tree-editable administrative console if navigated via (/admin/company/:id).
 */
export const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin Mode detection
  const isAdmin = window.location.pathname.startsWith('/admin');
  const [adminTab, setAdminTab] = useState<'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing'>('profile');
  
  // Sidebar Search
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyStatement, setNewCompanyStatement] = useState('');

  // Company Profile Details State
  const [profileName, setProfileName] = useState('');
  const [profileStatement, setProfileStatement] = useState('');
  const [profileActive, setProfileActive] = useState(true);

  // Domains & Controls tree editor state
  const [domains, setDomains] = useState<Domain[]>([]);

  // API Key state
  const [keyVisible, setKeyVisible] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  // Resources state
  const [resources, setResources] = useState<any[]>([]);

  // File Preview states
  const [previewFile, setPreviewFile] = useState<any>(null);
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | null>(null);

  // Google Sheets configuration state
  const [sheetConfig, setSheetConfig] = useState({
    id: null as number | null,
    sheetName: 'ReachGRC Sync',
    sheetUrl: '',
    spreadsheetId: '',
    sheetTabName: 'Sheet1',
    isActive: true,
    syncEnabled: true,
    lastSyncTime: null as string | null,
    lastSyncStatus: null as string | null,
    companiesSynced: 0
  });
  const [syncing, setSyncing] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);

  // Fetch current company data
  const loadCompanyData = () => {
    if (id) {
      setLoading(true);
      fetchCompanyData(id).then((data) => {
        if (data) {
          setCompany(data);
          setProfileName(data.companyName);
          setProfileStatement(data.statement);
          setProfileActive(data.isActive);
          if (data.domains) {
            setDomains(JSON.parse(JSON.stringify(data.domains))); // Deep copy for local edits
          }
        }
        setLoading(false);
      }).catch(err => {
        console.error("Error loading company:", err);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, [id]);

  // Load all companies for search list in Admin Mode
  const loadAllCompanies = () => {
    if (isAdmin) {
      fetch("http://localhost:8081/api/trust/allCompanies")
        .then((res) => res.json())
        .then((data) => setAllCompanies(data))
        .catch((err) => console.error("Error fetching all companies:", err));
    }
  };

  useEffect(() => {
    loadAllCompanies();
  }, [isAdmin, id]);

  // Fetch sheet config
  const loadSheetConfig = () => {
    if (isAdmin) {
      fetch("http://localhost:8081/api/sheet-config")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("No config");
        })
        .then((data) => {
          setSheetConfig(prev => ({
            ...prev,
            id: data.id,
            sheetName: data.sheetName || prev.sheetName,
            sheetUrl: data.sheetUrl || prev.sheetUrl,
            spreadsheetId: data.spreadsheetId || prev.spreadsheetId,
            sheetTabName: data.sheetTabName || prev.sheetTabName,
            isActive: data.isActive !== undefined ? data.isActive : prev.isActive,
            syncEnabled: data.syncEnabled !== undefined ? data.syncEnabled : prev.syncEnabled,
            lastSyncTime: data.lastSyncTime,
            lastSyncStatus: data.lastSyncStatus,
            companiesSynced: data.companiesSynced || 0
          }));
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    loadSheetConfig();
  }, [isAdmin]);

  // Fetch resource uploads
  const fetchResources = () => {
    if (id && isAdmin) {
      fetch(`http://localhost:8081/api/trust/${id}/resources/all`)
        .then(res => res.json())
        .then(data => {
          if (data && data.resources) {
            setResources(data.resources);
          }
        })
        .catch(err => console.error("Error fetching resources:", err));
    }
  };

  useEffect(() => {
    if (adminTab === 'media' && isAdmin) {
      fetchResources();
    }
  }, [adminTab, id]);

  // Create new company
  const handleCreateCompany = async () => {
    if (!newCompanyName.trim()) {
      toast.error("Company name is required.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8081/api/trust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: newCompanyName,
          statement: newCompanyStatement,
          isActive: true,
          // Seed with a default domain to bypass the @NotEmpty constraint
          domains: [
            {
              name: 'General Compliance',
              controls: []
            }
          ]
        })
      });
      if (res.ok) {
        const created = await res.json();
        toast.success("Company created successfully!");
        setShowCreateModal(false);
        setNewCompanyName('');
        setNewCompanyStatement('');
        loadAllCompanies();
        navigate(`/admin/company/${created.id}`);
      } else {
        toast.error("Failed to create company (it may already exist).");
      }
    } catch (err) {
      toast.error("Connection failed.");
    }
  };

  // Save company details form
  const saveProfileDetails = async () => {
    if (!company) return;
    toast.loading("Saving company profile...", { id: "save-profile" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...company,
          companyName: profileName,
          statement: profileStatement,
          isActive: profileActive
        })
      });
      if (res.ok) {
        toast.success("Company profile saved successfully!", { id: "save-profile" });
        loadCompanyData();
        loadAllCompanies();
      } else {
        toast.error("Failed to save changes.", { id: "save-profile" });
      }
    } catch {
      toast.error("Connection error.", { id: "save-profile" });
    }
  };

  // GRC Catalog updates (domains & controls tree editor)
  const saveDomainsAndControls = async () => {
    if (!company) return;
    toast.loading("Saving GRC Catalog...", { id: "save-grc" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...company,
          domains: domains
        })
      });
      if (res.ok) {
        toast.success("GRC Catalog updated successfully!", { id: "save-grc" });
        loadCompanyData();
      } else {
        toast.error("Failed to save changes.", { id: "save-grc" });
      }
    } catch {
      toast.error("Connection error.", { id: "save-grc" });
    }
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
  };

  const handleDeleteControl = (domainIdx: number, controlIdx: number) => {
    const updated = [...domains];
    updated[domainIdx].controls = updated[domainIdx].controls.filter((_, i) => i !== controlIdx);
    setDomains(updated);
  };

  // Google Sheets Config saving
  const saveSheetConfig = async () => {
    setSavingConfig(true);
    try {
      const res = await fetch("http://localhost:8081/api/sheet-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sheetConfig,
          sheetName: sheetConfig.sheetName || "ReachGRC Sync"
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSheetConfig(prev => ({
          ...prev,
          id: data.id,
          lastSyncTime: data.lastSyncTime,
          lastSyncStatus: data.lastSyncStatus,
          companiesSynced: data.companiesSynced
        }));
        toast.success("Google Sheets configuration saved!");
      } else {
        toast.error("Failed to save configurations.");
      }
    } catch (err) {
      toast.error("Connection error.");
    } finally {
      setSavingConfig(false);
    }
  };

  const triggerSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("http://localhost:8081/api/sheet-config/sync", {
        method: "POST"
      });
      const message = await res.text();
      if (res.ok) {
        toast.success(message);
        loadCompanyData();
        loadAllCompanies();
        loadSheetConfig();
      } else {
        toast.error(message || "Synchronization failed.");
      }
    } catch {
      toast.error("Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  // API Key actions
  const handleRegenerateKey = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/api-key/generate`, {
        method: "POST"
      });
      if (res.ok) {
        toast.success("API credentials rotated!");
        loadCompanyData();
      } else {
        toast.error("Failed to generate API Key.");
      }
    } catch {
      toast.error("Connection failed.");
    }
  };

  const handleToggleKeyStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/api-key/status`, {
        method: "PATCH"
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`API Key is now ${data.apiKeyStatus}`);
        loadCompanyData();
      } else {
        toast.error("Failed to toggle API Key status.");
      }
    } catch {
      toast.error("Connection failed.");
    }
  };

  const copyKeyToClipboard = () => {
    if (company?.apiKey) {
      navigator.clipboard.writeText(company.apiKey).catch(() => {});
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
      toast.success("API key copied!");
    }
  };

  // Media upload & delete
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    const formData = new FormData();
    formData.append("file", file);

    toast.loading(`Uploading ${type === 'logo' ? 'logo asset' : 'PDF paper'}...`, { id: "upload-file" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/resource/new`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        toast.success("File uploaded successfully!", { id: "upload-file" });
        fetchResources();
      } else {
        toast.error("Failed to upload file. Duplicates are restricted.", { id: "upload-file" });
      }
    } catch {
      toast.error("Connection failed.", { id: "upload-file" });
    }
  };

  const handleDeleteResource = async (fileId: number, name: string) => {
    if (!id) return;
    toast.loading("Removing file...", { id: "delete-res" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/resource/${fileId}`, {
        method: "DELETE"
      });
      if (res.status === 204 || res.ok) {
        toast.success(`Deleted file: ${name}`, { id: "delete-res" });
        fetchResources();
      } else {
        toast.error("Failed to remove file.", { id: "delete-res" });
      }
    } catch {
      toast.error("Connection failed.", { id: "delete-res" });
    }
  };

  // Razorpay Upgrade script injection
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (plan: 'GROWTH' | 'ENTERPRISE') => {
    try {
      const response = await fetch("http://localhost:8081/api/subscription/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: Number(id), plan }),
      });
      
      if (!response.ok) {
        toast.error("Transaction construction error.");
        return;
      }
      
      const orderData = await response.json();
      
      if (orderData.isSimulated) {
        toast.loading("Simulating checkout...", { id: "payment" });
        setTimeout(async () => {
          const verifyRes = await fetch("http://localhost:8081/api/subscription/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              companyId: Number(id),
              plan,
              razorpayOrderId: orderData.orderId,
              razorpayPaymentId: "pay_mock_" + Date.now(),
              razorpaySignature: "sig_mock_" + Date.now()
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success(`Upgraded to ${plan} Plan (Simulated payment)!`, { id: "payment" });
            loadCompanyData();
          } else {
            toast.error("Verification failed.", { id: "payment" });
          }
        }, 1500);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Razorpay integration script missing.");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ReachGRC Trust Center",
        description: `Upgrade to ${plan} Plan`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          toast.loading("Verifying payment...", { id: "payment" });
          const verifyRes = await fetch("http://localhost:8081/api/subscription/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              companyId: Number(id),
              plan,
              razorpayOrderId: orderData.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success(`Plan upgraded successfully!`, { id: "payment" });
            loadCompanyData();
          } else {
            toast.error("Verification error.", { id: "payment" });
          }
        },
        prefill: {
          name: company?.companyName || "Admin",
          email: "billing@example.com",
        },
        theme: { color: "#f97316" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
    } catch {
      toast.error("Billing endpoint unreachable.");
    }
  };

  const filteredCompanies = allCompanies.filter(c => 
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const images = resources.filter(r => {
    const ext = r.fileName.toLowerCase();
    return ext.endsWith('.png') || ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.gif');
  });

  const pdfs = resources.filter(r => r.fileName.toLowerCase().endsWith('.pdf'));

  if (!company && !loading) return <div className="p-8 text-center text-red-500 font-sans">Security Profile Not Found</div>;

  // ─── DEDICATED ADMIN PANEL LAYOUT ──────────────────────────────────────────
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex">
        <Toaster richColors position="top-right" theme="dark" />
        
        {/* Sidebar Component */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/60 backdrop-blur-2xl p-6 flex flex-col justify-between shrink-0 z-10">
          <div className="space-y-6">
            
            {/* Logo / Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                <Settings size={18} className="animate-[spin_15s_linear_infinite]" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-wider uppercase">ReachGRC Console</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">GRC Portal Admin</p>
              </div>
            </div>

            {/* Company Search and list */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Organizations</label>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-[10px] font-bold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={10} /> Create New
                </button>
              </div>

              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  placeholder="Filter organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/30 placeholder-slate-600"
                />
              </div>

              {/* Company List Box */}
              <div className="max-h-40 overflow-y-auto space-y-1 border border-slate-800/40 rounded-xl p-1 bg-slate-950/20">
                {filteredCompanies.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/admin/company/${c.id}`);
                      setAdminTab('profile');
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      Number(id) === c.id 
                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{c.companyName}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Sections */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Sections</label>
              
              {/* Standalone Sync Settings */}
              <button
                onClick={() => setAdminTab('sync')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  adminTab === 'sync' 
                    ? 'bg-slate-850 border-l-4 border-orange-500 text-white font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/10'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <FileSpreadsheet size={14} className={adminTab === 'sync' ? 'text-orange-500' : 'text-slate-500'} />
                  Google Sheets Sync
                </div>
              </button>

              {company && (
                <>
                  <div className="border-t border-slate-800/60 my-2" />
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider px-3.5 mb-1.5 truncate">
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
                          ? 'bg-slate-850 border-l-4 border-orange-500 text-white font-bold' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className={adminTab === tab.id ? 'text-orange-500' : 'text-slate-500'}>{tab.icon}</span>
                        {tab.label}
                      </div>
                    </button>
                  ))}
                </>
              )}

            </div>

          </div>

          <div className="text-[10px] text-slate-600 font-semibold text-center border-t border-slate-800/40 pt-4">
            ReachGRC Admin Console
          </div>
        </aside>

        {/* Main Work Area */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-8 relative flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] mix-blend-screen pointer-events-none z-0" />
          
          <div className="relative z-10 max-w-5xl mx-auto w-full space-y-8">
            
            {/* 1. Global Sheet Sync Component */}
            {adminTab === 'sync' && (
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="text-orange-500" size={20} />
                      Google Sheets GRC Sync Integration
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Configure global synchronization parameters for updating trust profiles.</p>
                  </div>
                  <button
                    onClick={triggerSync}
                    disabled={syncing || !sheetConfig.syncEnabled}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 disabled:bg-slate-850 text-white disabled:text-slate-500 shadow-md shadow-orange-500/20 disabled:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
                    {syncing ? "Syncing GRC..." : "Sync Now"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Spreadsheet ID</label>
                    <input 
                      type="text" 
                      value={sheetConfig.spreadsheetId}
                      onChange={e => setSheetConfig({...sheetConfig, spreadsheetId: e.target.value})}
                      placeholder="e.g. 1mX3LM0cBCHi27-V6hvu3O_qqoLp289coeSX0JcNma6s"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tab Name</label>
                    <input 
                      type="text" 
                      value={sheetConfig.sheetTabName}
                      onChange={e => setSheetConfig({...sheetConfig, sheetTabName: e.target.value})}
                      placeholder="Sheet1"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Google Sheets URL</label>
                  <input 
                    type="text" 
                    value={sheetConfig.sheetUrl}
                    onChange={e => setSheetConfig({...sheetConfig, sheetUrl: e.target.value})}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/30"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-white">Enable Synchronization</p>
                    <p className="text-xs text-slate-500">Allow catalog synchronization updates to override local database</p>
                  </div>
                  <button
                    onClick={() => setSheetConfig({...sheetConfig, syncEnabled: !sheetConfig.syncEnabled})}
                    className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    {sheetConfig.syncEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-700" />}
                  </button>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={saveSheetConfig}
                    disabled={savingConfig}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-850 hover:bg-slate-800 text-white border border-white/5 cursor-pointer"
                  >
                    {savingConfig ? "Saving..." : "Save Config"}
                  </button>
                </div>

                {sheetConfig.lastSyncTime && (
                  <div className="border-t border-slate-850 pt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500">Last Sync Status</p>
                      <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] mt-1 ${
                        sheetConfig.lastSyncStatus?.startsWith("SUCCESS") ? "text-green-400" : "text-red-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sheetConfig.lastSyncStatus?.startsWith("SUCCESS") ? "bg-green-500" : "bg-red-500"}`}></span>
                        {sheetConfig.lastSyncStatus || "UNKNOWN"}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500">Last Synchronized</p>
                      <p className="font-semibold text-slate-300 mt-1">{new Date(sheetConfig.lastSyncTime).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Sync Count</p>
                      <p className="font-bold text-orange-400 mt-1">{sheetConfig.companiesSynced} Synced Organizations</p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 2. Company Details Tab */}
            {adminTab === 'profile' && company && (
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Settings className="text-orange-500" size={20} />
                      Organization GRC settings
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Configure profile details and visibility states</p>
                  </div>
                  <button
                    onClick={saveProfileDetails}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={e => setProfileName(e.target.value)}
                      placeholder="e.g. ReachGRC"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mission Statement</label>
                    <textarea 
                      value={profileStatement}
                      onChange={e => setProfileStatement(e.target.value)}
                      placeholder="We ensure robust security and continuous GRC compliance monitoring..."
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/30 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                    <div>
                      <p className="text-sm font-bold text-white">Trust Center Active Status</p>
                      <p className="text-xs text-slate-500">Toggling off hides the GRC landing page from public visitors</p>
                    </div>
                    <button
                      onClick={() => setProfileActive(!profileActive)}
                      className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {profileActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-700" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. GRC Tree Editor Tab */}
            {adminTab === 'grc' && company && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Shield className="text-orange-500" size={20} />
                      GRC Domains & Controls Editor
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Configure compliance framework controls and remarks status</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAddDomain}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      + Add Domain
                    </button>
                    <button
                      onClick={saveDomainsAndControls}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      Save Catalog
                    </button>
                  </div>
                </div>

                {domains.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
                    No domains configured. Click "+ Add Domain" to construct catalog.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {domains.map((domain, dIdx) => (
                      <div key={dIdx} className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 space-y-4">
                        
                        {/* Domain Title */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-lg">Domain</span>
                            <input
                              type="text"
                              value={domain.name}
                              onChange={(e) => {
                                const updated = [...domains];
                                updated[dIdx].name = e.target.value;
                                setDomains(updated);
                              }}
                              className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-2 text-xs text-white font-bold focus:outline-none focus:border-orange-500/30 flex-1"
                            />
                          </div>
                          <button
                            onClick={() => handleDeleteDomain(dIdx, domain.name)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                          >
                            Delete Domain
                          </button>
                        </div>

                        {/* Controls Grid */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-12 gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3">
                            <div className="col-span-4">Control Name</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-5">Remarks</div>
                            <div className="col-span-1 text-right">Delete</div>
                          </div>

                          {domain.controls.length === 0 ? (
                            <div className="text-center py-6 bg-slate-950/20 border border-dashed border-slate-850 rounded-xl text-slate-600 text-xs">
                              No compliance controls defined inside this domain.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {domain.controls.map((control, cIdx) => (
                                <div key={cIdx} className="grid grid-cols-12 gap-3 items-center bg-slate-955/60 p-3 rounded-xl border border-slate-900">
                                  <div className="col-span-4">
                                    <input 
                                      type="text"
                                      value={control.name}
                                      onChange={(e) => {
                                        const updated = [...domains];
                                        updated[dIdx].controls[cIdx].name = e.target.value;
                                        setDomains(updated);
                                      }}
                                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500/30"
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
                                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500/30 cursor-pointer"
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
                                      className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-700 focus:outline-none"
                                    />
                                  </div>

                                  <div className="col-span-1 text-right">
                                    <button
                                      onClick={() => handleDeleteControl(dIdx, cIdx)}
                                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer inline-flex"
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
                              className="px-3.5 py-2 rounded-xl text-[10px] font-bold bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
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
            )}

            {/* 4. Media & Document Management */}
            {adminTab === 'media' && company && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet size={20} className="text-orange-500" />
                    Media & Document Attachments
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Upload brand logos and PDF compliance sheets directly to this organization</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Logos section */}
                  <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white">Brand Logos</h3>
                      <label className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md cursor-pointer transition-all">
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
                      <p className="text-xs text-slate-500 text-center py-8">No logo images uploaded yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {images.map((img: any) => (
                          <div key={img.fileId} className="flex items-center justify-between bg-slate-955/60 border border-slate-850 rounded-xl p-3 text-xs">
                            <span className="truncate font-semibold text-slate-300 max-w-[150px]">{img.fileName}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setPreviewFile(img);
                                  setPreviewType('image');
                                }}
                                className="px-2 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/20 cursor-pointer"
                              >
                                Preview
                              </button>
                              <button
                                onClick={() => handleDeleteResource(img.fileId, img.fileName)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PDFs section */}
                  <div className="bg-slate-900/40 border border-slate-855 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white">PDF Compliance Reports</h3>
                      <label className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md cursor-pointer transition-all">
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
                      <p className="text-xs text-slate-500 text-center py-8">No PDF sheets uploaded yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {pdfs.map((pdf: any) => (
                          <div key={pdf.fileId} className="flex items-center justify-between bg-slate-955/60 border border-slate-855 rounded-xl p-3 text-xs">
                            <span className="truncate font-semibold text-slate-300 max-w-[150px]">{pdf.fileName}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setPreviewFile(pdf);
                                  setPreviewType('pdf');
                                }}
                                className="px-2 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/20 cursor-pointer"
                              >
                                Preview
                              </button>
                              <button
                                onClick={() => handleDeleteResource(pdf.fileId, pdf.fileName)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
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
            )}

            {/* 5. API Credentials Tab */}
            {adminTab === 'apikey' && company && (
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Key size={18} className="text-orange-500" />
                    Access Token Manager
                  </h2>
                  <button
                    onClick={handleRegenerateKey}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-white/5 text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw size={12} />
                    Rotate Token
                  </button>
                </div>

                <div className="bg-slate-950/80 border border-slate-850 rounded-2xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Active API key credential</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                      company.apiKeyStatus === 'ACTIVE'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {company.apiKeyStatus || 'INACTIVE'}
                    </span>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between gap-4">
                    <span className="font-mono text-sm tracking-wider text-slate-200 truncate select-all">
                      {company.apiKey 
                        ? (keyVisible ? company.apiKey : `rgc_•${"•".repeat(27)}`) 
                        : "No token issued. Click Rotate Token."}
                    </span>
                    
                    {company.apiKey && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setKeyVisible(!keyVisible)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {keyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={copyKeyToClipboard}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {keyCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {company.apiKey && (
                  <div className="flex items-center justify-between p-4 bg-slate-950/20 border border-slate-850 rounded-xl flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-bold text-white">Temporary Key Expiry</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Clock size={12} /> Issued: {company.apiKeyIssuedAt ? new Date(company.apiKeyIssuedAt).toLocaleDateString() : 'N/A'}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> Expires: {company.apiKeyExpiresAt ? new Date(company.apiKeyExpiresAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleToggleKeyStatus}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-850 hover:border-slate-800 hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Shield size={12} className="text-orange-500" />
                      {company.apiKeyStatus === 'ACTIVE' ? "Revoke API Key" : "Activate API Key"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 6. Subscriptions Tab */}
            {adminTab === 'billing' && company && (
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard size={18} className="text-orange-500" />
                    Billing & Subscription Manager
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-slate-300 border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {company.subscriptionPlan || "FREE"} Plan
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 flex items-center justify-between flex-wrap gap-4 text-xs">
                  <div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider">Subscription Status</p>
                    <p className="text-sm font-bold text-slate-200 mt-1">{company.subscriptionStatus || "ACTIVE"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-left">Renewal Period</p>
                    <p className="text-slate-300 mt-1">{company.subscriptionExpiresAt ? new Date(company.subscriptionExpiresAt).toLocaleDateString() : 'Unlimited'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider">Payment Method</p>
                    <p className="text-orange-400 mt-1 font-semibold">Razorpay Secure Checkout</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between h-full relative overflow-hidden ${
                    company.subscriptionPlan === 'GROWTH' ? 'border-orange-500/50' : 'border-slate-850'
                  }`}>
                    {company.subscriptionPlan === 'GROWTH' && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-slate-950 font-black text-[9px] px-3 py-1 uppercase tracking-widest rounded-bl-xl">Current</div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Plan</p>
                      <p className="text-xl font-black text-white mt-2">₹4,999<span className="text-xs text-slate-500 font-normal"> / month</span></p>
                      <ul className="text-xs text-slate-400 space-y-2 mt-4">
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Automated Google Sheets Sync</li>
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> API key authorization pipeline</li>
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Unlimited compliance controls</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleUpgrade('GROWTH')}
                      disabled={company.subscriptionPlan === 'GROWTH' || company.subscriptionPlan === 'ENTERPRISE'}
                      className="w-full mt-6 py-2.5 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 disabled:bg-slate-850 disabled:text-slate-500 text-white shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer"
                    >
                      {company.subscriptionPlan === 'GROWTH' ? 'Active' : company.subscriptionPlan === 'ENTERPRISE' ? 'Included' : 'Upgrade to Growth'}
                    </button>
                  </div>

                  <div className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between h-full relative overflow-hidden ${
                    company.subscriptionPlan === 'ENTERPRISE' ? 'border-orange-500/50' : 'border-slate-850'
                  }`}>
                    {company.subscriptionPlan === 'ENTERPRISE' && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-slate-950 font-black text-[9px] px-3 py-1 uppercase tracking-widest rounded-bl-xl">Current</div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Plan</p>
                      <p className="text-xl font-black text-white mt-2">₹19,999<span className="text-xs text-slate-500 font-normal"> / month</span></p>
                      <ul className="text-xs text-slate-400 space-y-2 mt-4">
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Custom compliance badge configuration</li>
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Dedicated success engineer</li>
                        <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> 99.9% REST API availability SLA</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleUpgrade('ENTERPRISE')}
                      disabled={company.subscriptionPlan === 'ENTERPRISE'}
                      className="w-full mt-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 disabled:bg-slate-850 disabled:text-slate-500 text-white transition-all cursor-pointer"
                    >
                      {company.subscriptionPlan === 'ENTERPRISE' ? 'Active' : 'Upgrade to Enterprise'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Create Company Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus size={16} className="text-orange-500" />
                    Create GRC Profile
                  </h3>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Organization Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={newCompanyName}
                      onChange={e => setNewCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mission Statement</label>
                    <textarea 
                      placeholder="Risk mitigation statement..."
                      value={newCompanyStatement}
                      onChange={e => setNewCompanyStatement(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500/30 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCompany}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md cursor-pointer"
                  >
                    Create Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* File Preview Modal */}
          {previewFile && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] flex flex-col justify-between space-y-4 animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shield size={16} className="text-orange-500" />
                      GRC Resource Preview
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{previewFile.fileName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`data:application/octet-stream;base64,${previewFile.fileData}`}
                      download={previewFile.fileName}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-white/5 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      Download File
                    </a>
                    <button 
                      onClick={() => {
                        setPreviewFile(null);
                        setPreviewType(null);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Body / Content */}
                <div className="flex-1 overflow-y-auto bg-slate-950 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[350px] max-h-[60vh]">
                  {previewType === 'image' && (
                    <img
                      src={`data:image/png;base64,${previewFile.fileData}`}
                      alt={previewFile.fileName}
                      className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl"
                    />
                  )}
                  {previewType === 'pdf' && (
                    <iframe
                      src={`data:application/pdf;base64,${previewFile.fileData}`}
                      title={previewFile.fileName}
                      className="w-full h-[50vh] rounded-xl border border-slate-800"
                    />
                  )}
                </div>

                {/* Footer Metadata */}
                <div className="text-[10px] text-slate-500 flex justify-between border-t border-slate-800 pt-3">
                  <span>File size: {Math.round(previewFile.fileData.length * 0.75 / 1024)} KB</span>
                  <span>Uploaded: {previewFile.createdAt ? new Date(previewFile.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>

              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ─── PUBLIC CLIENT LANDING PAGE ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans relative overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
      <Preloader isLoading={loading} />
      <Toaster richColors position="top-right" theme="dark" />
      
      {/* Exquisite Deep Background Effects */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0B1120] to-[#0B1120] pointer-events-none" />
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-orange-600/10 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-600/5 blur-[150px] mix-blend-screen pointer-events-none z-0" />
      
      {/* Subtle Noise Texture overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {company && (
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12 animate-in fade-in duration-1000 delay-300 fill-mode-both relative z-10">
          
          {/* Hero Header Section */}
          <header className="relative group rounded-[2.5rem] bg-slate-900/40 backdrop-blur-3xl shadow-2xl ring-1 ring-white/10 p-8 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-slate-500/5 to-transparent opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="bg-slate-800/80 p-4 rounded-3xl shadow-2xl ring-1 ring-white/10 group-hover:ring-orange-500/30 transition-all duration-500 group-hover:scale-105">
                <img src={company.logoUrl} alt={company.companyName} className="w-24 h-24 rounded-2xl object-contain drop-shadow-2xl" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                    {company.companyName}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-400 ring-1 ring-inset ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)] animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Verified
                  </span>
                </div>
                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light tracking-wide">{company.statement}</p>
              </div>
            </div>
          </header>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Sidebar */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-10">
               <div className="sticky top-12 space-y-10">
                
                {/* Trust Badge Card */}
                <div className="relative group/badge">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover/badge:opacity-100 transition duration-700 pointer-events-none" />
                  <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] shadow-2xl ring-1 ring-white/10 p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <TrustBadge company={company} theme="dark" className="w-full bg-slate-800/80 border-white/10 hover:border-orange-500/40 backdrop-blur-xl shadow-2xl" />
                    </div>
                  </div>
                </div>

                {/* Documents Card */}
                <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] shadow-2xl ring-1 ring-white/10 p-8 lg:p-10 relative overflow-hidden group/docs">
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/5 blur-3xl pointer-events-none transition-transform duration-700 group-hover/docs:scale-150" />
                  <div className="relative z-10">
                    <DocumentSection documents={company.documents} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-12 xl:col-span-8 space-y-10">
              
              {/* Controls Grid */}
              <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl ring-1 ring-white/10 p-8 md:p-12 relative overflow-hidden group/grid transition-all duration-500 hover:ring-white/20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover/grid:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                <SecurityControlsGrid domains={company.domains} theme="dark" />
              </div>

              {/* FAQ */}
              <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl ring-1 ring-white/10 p-8 md:p-12">
                <FAQSection faqs={company.faqs} />
              </div>
            </div>
          </div>
          
          <footer className="text-center pt-12 pb-8 relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">
              Powered by <span className="text-white font-bold ml-1">Reach<span className="text-orange-500">GRC</span></span>
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};
