import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyData } from '../services/api';
import { useTheme } from '../ThemeContext';
import { Preloader } from '../components/Preloader';
import { SecurityControlsGrid } from '../components/SecurityControlsGrid';
import { DocumentSection } from '../components/DocumentSection';
import { FAQSection } from '../components/FAQSection';
import { ComplianceJourney } from '../components/ComplianceJourney';
import type { Company, Domain, JourneyMilestone } from '../types';
import { LocationGlobe } from '../components/LocationGlobe';
import { Toaster, toast } from 'sonner';

// Import newly refactored modular sub-components
import { NotchHeader } from '../components/admin/NotchHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { TabSyncSettings } from '../components/admin/TabSyncSettings';
import { TabCompanyProfile } from '../components/admin/TabCompanyProfile';
import { TabDomainsControls } from '../components/admin/TabDomainsControls';
import { TabMediaDocuments } from '../components/admin/TabMediaDocuments';
import { TabApiCredentials } from '../components/admin/TabApiCredentials';
import { TabBillingSubscriptions } from '../components/admin/TabBillingSubscriptions';
import { TabQuestionnaires } from '../components/admin/TabQuestionnaires';
import { CreateCompanyModal } from '../components/admin/CreateCompanyModal';
import { FilePreviewModal } from '../components/admin/FilePreviewModal';
import { TrustHeader } from '../components/TrustHeader';
import { SecurityHero } from '../components/SecurityHero';
import { FrameworkBadges } from '../components/FrameworkBadges';
import { SubprocessorsSection } from '../components/SubprocessorsSection';
import { SecurityQuestionnaireModal } from '../components/SecurityQuestionnaireModal';
import reachGrcLogo from '../assets/REACH_GRC.png';

import { 
  HelpCircle,
  Shield,
  Menu
} from 'lucide-react';

/**
 * CompanyProfile Page Component
 * Refactored wrapper page which routes layout settings, coordinates backend syncing feeds,
 * and delegates views dynamically to separate components inside the `src/components/admin/` folder.
 */
export const CompanyProfile = () => {
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailedView, setDetailedView] = useState(false);
  
  // Admin Mode detection
  const isAdmin = window.location.pathname.startsWith('/admin');
  const [adminTab, setAdminTab] = useState<'sync' | 'profile' | 'grc' | 'media' | 'apikey' | 'billing' | 'inquiries'>('profile');
  const [adminMobileSidebarOpen, setAdminMobileSidebarOpen] = useState(false);
  
  // Sidebar Search
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Company Profile Details State
  const [profileName, setProfileName] = useState('');
  const [profileStatement, setProfileStatement] = useState('');
  const [profileActive, setProfileActive] = useState(true);
  const [profileLatitude, setProfileLatitude] = useState<number | null>(null);
  const [profileLongitude, setProfileLongitude] = useState<number | null>(null);
  const [profileLocationName, setProfileLocationName] = useState('');

  // Domains & Controls tree editor state
  const [domains, setDomains] = useState<Domain[]>([]);

  // Compliance Journey milestones state
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);

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
  
  // Header Interactive States
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  // JWT Helper authorization headers
  const getAuthHeaders = (extraHeaders: Record<string, string> = {}): Record<string, string> => {
    const token = sessionStorage.getItem('adminToken');
    return {
      ...extraHeaders,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

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
          setProfileLatitude(data.latitude ?? null);
          setProfileLongitude(data.longitude ?? null);
          setProfileLocationName(data.locationName ?? '');
          if (data.domains) {
            setDomains(JSON.parse(JSON.stringify(data.domains))); // Deep copy for local edits
          }
          if (data.milestones) {
            setMilestones(JSON.parse(JSON.stringify(data.milestones)));
          } else {
            setMilestones([]);
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

  // Disable body scroll when previewFile modal is open
  useEffect(() => {
    if (previewFile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [previewFile]);

  // Load all companies for search list in Admin Mode
  const loadAllCompanies = () => {
    if (isAdmin) {
      fetch("http://localhost:8081/api/trust/allCompanies", {
        headers: getAuthHeaders()
      })
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
      fetch("http://localhost:8081/api/sheet-config", {
        headers: getAuthHeaders()
      })
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
    if (id) {
      const headers = isAdmin ? getAuthHeaders() : {};
      fetch(`http://localhost:8081/api/trust/${id}/resources/all`, { headers })
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
    fetchResources();
  }, [id]);

  // Create new company organization record
  const handleCreateCompany = async (name: string, statement: string) => {
    try {
      const res = await fetch("http://localhost:8081/api/trust", {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          companyName: name,
          statement: statement,
          isActive: true,
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
        toast.success("Organization created successfully!");
        loadAllCompanies();
        navigate(`/admin/company/${created.id}`);
        return true;
      } else {
        toast.error("Failed to create organization (it may already exist).");
        return false;
      }
    } catch (err) {
      toast.error("Connection failed.");
      return false;
    }
  };

  // Toggle environment visibility state directly from notch (auto-saving)
  const handleToggleActiveState = async (newVal: boolean) => {
    if (!company) return;
    toast.loading("Toggling environment visibility...", { id: "toggle-active" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${company.id}`, {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          ...company,
          companyName: profileName || company.companyName,
          statement: profileStatement || company.statement,
          isActive: newVal,
          latitude: profileLatitude !== null ? profileLatitude : company.latitude,
          longitude: profileLongitude !== null ? profileLongitude : company.longitude,
          locationName: profileLocationName || company.locationName
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setCompany(updated);
        setProfileActive(newVal);
        toast.success(`GRC Portal visibility updated to ${newVal ? 'LIVE MONITOR' : 'TEST MODE'}!`, { id: "toggle-active" });
      } else {
        toast.error("Failed to update environment state.", { id: "toggle-active" });
      }
    } catch {
      toast.error("Connection error.", { id: "toggle-active" });
    }
  };

  // Save company details form
  const saveProfileDetails = async () => {
    if (!company) return;
    toast.loading("Saving company profile...", { id: "save-profile" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${company.id}`, {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          ...company,
          companyName: profileName,
          statement: profileStatement,
          isActive: profileActive,
          latitude: profileLatitude,
          longitude: profileLongitude,
          locationName: profileLocationName
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

  // GRC Catalog updates (domains & controls tree editor + Compliance Journey milestones)
  const saveDomainsAndControls = async () => {
    if (!company) return;
    toast.loading("Saving GRC Catalog & Compliance Journey...", { id: "save-grc" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${company.id}`, {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          ...company,
          domains: domains,
          milestones: milestones
        })
      });
      if (res.ok) {
        toast.success("GRC Catalog & Roadmap saved successfully!", { id: "save-grc" });
        loadCompanyData();
      } else {
        toast.error("Failed to save changes.", { id: "save-grc" });
      }
    } catch {
      toast.error("Connection error.", { id: "save-grc" });
    }
  };

  // Google Sheets Config saving
  const saveSheetConfig = async () => {
    setSavingConfig(true);
    try {
      const res = await fetch("http://localhost:8081/api/sheet-config", {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
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

  // Trigger Google Sheets sync
  const triggerSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("http://localhost:8081/api/sheet-config/sync", {
        method: "POST",
        headers: getAuthHeaders()
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

  // API Key Actions
  const handleRegenerateKey = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/api-key/generate`, {
        method: "POST",
        headers: getAuthHeaders()
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
        method: "PATCH",
        headers: getAuthHeaders()
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

  // Media resource management
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    const formData = new FormData();
    formData.append("file", file);

    toast.loading(`Uploading ${type === 'logo' ? 'logo asset' : 'PDF paper'}...`, { id: "upload-file" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/resource/new`, {
        method: "POST",
        headers: getAuthHeaders(),
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
        method: "DELETE",
        headers: getAuthHeaders()
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

  const handleUpdatePdfLabel = async (fileId: number, label: string) => {
    if (!id) return;
    toast.loading("Updating document classification...", { id: "update-label" });
    try {
      const res = await fetch(`http://localhost:8081/api/trust/${id}/resource/${fileId}/label?label=${label}`, {
        method: "PUT",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        toast.success("Document classification updated!", { id: "update-label" });
        fetchResources();
      } else {
        toast.error("Failed to update classification.", { id: "update-label" });
      }
    } catch {
      toast.error("Network error.", { id: "update-label" });
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

  const handleCancelSubscription = async (pin: string) => {
    if (!pin.trim()) {
      toast.error("Please enter the security PIN.");
      return false;
    }

    try {
      toast.loading("Processing cancellation...", { id: "cancel-sub" });
      const token = sessionStorage.getItem('adminToken');
      const response = await fetch("http://localhost:8081/api/subscription/downgrade", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          companyId: Number(id),
          adminPassword: pin
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Subscription cancelled successfully!", { id: "cancel-sub" });
        loadCompanyData();
        return true;
      } else {
        toast.error(data.error || "Failed to cancel subscription.", { id: "cancel-sub" });
        return false;
      }
    } catch {
      toast.error("Billing endpoint unreachable.", { id: "cancel-sub" });
      return false;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminToken');
    toast.success("Administrator session closed.");
    navigate('/admin/login');
  };

  // Avatar / Logo URLs configurations
  const logoImage = resources.find(
    (r) => 
      (r.fileType && r.fileType.toLowerCase().startsWith('image/')) || 
      /\.(png|jpe?g|gif|webp|svg)$/i.test(r.fileName)
  );

  const displayLogoUrl = logoImage 
    ? `data:image/png;base64,${logoImage.fileData}` 
    : (company?.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(company?.companyName || '')}&background=0D8ABC&color=fff&size=128`);

  // Render Administrative Console Layout
  if (isAdmin) {
    return (
      <div className="w-screen h-screen bg-black text-zinc-900 dark:text-zinc-300 font-sans flex flex-col p-4 md:p-5 selection:bg-brand-orange/30 selection:text-brand-orange relative overflow-hidden">
        <Toaster richColors position="top-right" theme={theme} />
        
        {/* Outer Inset Shell Background (relative layout to support absolute combined curved header bar overlay) */}
        <div className="relative w-full h-full flex flex-col">
          
          {/* Combined Curved Header Bar (Axoraa Style - Desktop Only) */}
          <div className="hidden lg:block">
            <NotchHeader 
              company={company}
              adminTab={adminTab}
              setAdminTab={setAdminTab}
              globalSearch={globalSearch}
              setGlobalSearch={setGlobalSearch}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              sheetConfig={sheetConfig}
              handleToggleActiveState={handleToggleActiveState}
            />
          </div>

          {/* Mobile Admin Navigation Header (< lg) */}
          <div className="lg:hidden flex items-center justify-between p-3.5 bg-[#0a0c12] border-b border-[#1a1e2b] rounded-t-[1.5rem] text-white shrink-0 z-20">
            <button
              onClick={() => setAdminMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-[#131622] hover:bg-[#1f2438] border border-[#1f2438] text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <Menu size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Menu</span>
            </button>

            <div className="flex items-center gap-2">
              <img src={reachGrcLogo} alt="ReachGRC" className="w-5 h-5 object-contain" />
              <span className="text-xs font-black uppercase tracking-wider text-white truncate max-w-[130px]">
                {company ? company.companyName : 'Admin'}
              </span>
            </div>

            <button
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded-xl bg-[#131622] hover:bg-[#1f2438] border border-[#1f2438] text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Slide-Over Drawer (< lg) */}
          {adminMobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
              <div 
                className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
                onClick={() => setAdminMobileSidebarOpen(false)}
              />
              <div className="relative z-10 w-80 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-250">
                <AdminSidebar 
                  id={id || ''}
                  company={company}
                  allCompanies={allCompanies}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setShowCreateModal={setShowCreateModal}
                  adminTab={adminTab}
                  setAdminTab={setAdminTab}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  handleLogout={handleLogout}
                  onCloseMobile={() => setAdminMobileSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Nested Unified Canvas Frame */}
          <div className="w-full bg-[#f4f5f8] dark:bg-[#0d0f17] border border-[#1a1e2b] rounded-[1.5rem] shadow-2xl flex overflow-hidden flex-1 min-h-0">
            
            {/* Desktop Sidebar (Left Column - >= lg) */}
            <div className="hidden lg:flex shrink-0 h-full">
              <AdminSidebar 
                id={id || ''}
                company={company}
                allCompanies={allCompanies}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setShowCreateModal={setShowCreateModal}
                adminTab={adminTab}
                setAdminTab={setAdminTab}
                theme={theme}
                toggleTheme={toggleTheme}
                handleLogout={handleLogout}
              />
            </div>

            {/* Main Work Area */}
            <main className="flex-1 bg-white dark:bg-[#090b11] overflow-y-auto p-4 sm:p-6 lg:p-8 pt-6 sm:pt-8 lg:pt-20 relative flex flex-col justify-between">
              {/* Vibrant background glows wrapped in absolute-inset-overflow-hidden to fix scrollbars */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-red/8 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-orange/6 blur-[110px] mix-blend-screen" />
                <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] rounded-full bg-brand-yellow-light/5 blur-[100px] mix-blend-screen" />
              </div>
              
              <div className="relative z-10 max-w-5xl mx-auto w-full space-y-8">
                
                {/* Top Breadcrumb Nav Bar */}
                <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-[#1f2438] pb-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-550 dark:text-zinc-400">
                    <span>ReachGRC</span>
                    <span>/</span>
                    <span className="capitalize">{company ? company.companyName : 'Organization'}</span>
                    <span>/</span>
                    <span className="text-zinc-800 dark:text-white font-black capitalize">
                      {adminTab === 'sync' 
                        ? 'Google Sheets Sync' 
                        : adminTab === 'profile' 
                          ? 'Company Profile' 
                          : adminTab === 'grc' 
                            ? 'Domains & Controls' 
                            : adminTab === 'media' 
                              ? 'Media & Documents' 
                              : adminTab === 'apikey' 
                                ? 'API Credentials' 
                                : adminTab === 'billing'
                                  ? 'Billing & Subscriptions'
                                  : 'Security Inquiries'}
                    </span>
                  </div>

                  {company && (
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
                        {company.subscriptionPlan || 'FREE'}
                      </span>
                      {company.apiKeyStatus === 'ACTIVE' && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                          API Active
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Warning / Live Info Banner */}
                {company && (
                  company.isActive ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs gap-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-blue-500 text-white rounded-md px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] shrink-0">Live Mode</span>
                        <p className="font-medium">Continuous audit sync is currently active. The widget on client websites is rendering live certified compliance checks.</p>
                      </div>
                      <a href="http://localhost:5173/widget/widget.umd.js" target="_blank" rel="noopener noreferrer" className="font-bold text-[10px] uppercase hover:underline shrink-0 text-right">View Widget Script</a>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange text-xs gap-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-brand-orange text-white rounded-md px-2 py-0.5 font-bold uppercase tracking-wider text-[9px] shrink-0 font-black">Test Mode</span>
                        <p className="font-medium">Only dummy test data is shown. Toggling Live Mode inside the MacBook Notch will publish actual real-time GRC catalog evaluations.</p>
                      </div>
                      <button onClick={() => handleToggleActiveState(true)} className="font-bold text-[10px] uppercase hover:underline shrink-0 cursor-pointer text-right">Activate Live Mode</button>
                    </div>
                  )
                )}

                {/* Render corresponding Active Tab Panels */}
                {adminTab === 'sync' && (
                  <TabSyncSettings 
                    sheetConfig={sheetConfig}
                    setSheetConfig={setSheetConfig}
                    triggerSync={triggerSync}
                    syncing={syncing}
                    saveSheetConfig={saveSheetConfig}
                    savingConfig={savingConfig}
                  />
                )}

                {adminTab === 'profile' && company && (
                  <TabCompanyProfile 
                    profileName={profileName}
                    setProfileName={setProfileName}
                    profileStatement={profileStatement}
                    setProfileStatement={setProfileStatement}
                    profileLatitude={profileLatitude}
                    setProfileLatitude={setProfileLatitude}
                    profileLongitude={profileLongitude}
                    setProfileLongitude={setProfileLongitude}
                    profileLocationName={profileLocationName}
                    setProfileLocationName={setProfileLocationName}
                    saveProfileDetails={saveProfileDetails}
                    theme={theme}
                  />
                )}

                {adminTab === 'grc' && company && (
                  <TabDomainsControls 
                    domains={domains}
                    setDomains={setDomains}
                    milestones={milestones}
                    setMilestones={setMilestones}
                    globalSearch={globalSearch}
                    saveDomainsAndControls={saveDomainsAndControls}
                  />
                )}

                {adminTab === 'media' && company && (
                  <TabMediaDocuments 
                    resources={resources}
                    handleUploadFile={handleUploadFile}
                    handleDeleteResource={handleDeleteResource}
                    handleUpdatePdfLabel={handleUpdatePdfLabel}
                    globalSearch={globalSearch}
                    setPreviewFile={setPreviewFile}
                    setPreviewType={setPreviewType}
                  />
                )}

                {adminTab === 'apikey' && company && (
                  <TabApiCredentials 
                    company={company}
                    handleRegenerateKey={handleRegenerateKey}
                    handleToggleKeyStatus={handleToggleKeyStatus}
                  />
                )}

                {adminTab === 'billing' && company && (
                  <TabBillingSubscriptions 
                    company={company}
                    theme={theme}
                    handleUpgrade={handleUpgrade}
                    handleCancelSubscription={handleCancelSubscription}
                  />
                )}

                {adminTab === 'inquiries' && (
                  <TabQuestionnaires company={company} />
                )}

              </div>

              {/* Help & Support Floating Trigger */}
              <button 
                onClick={() => toast.info("Support ticket system opened! A GRC compliance engineer will contact you shortly.", { id: "support-ticket" })}
                className="fixed bottom-6 right-6 bg-[#0c0d12] hover:bg-zinc-950 text-white border border-[#1f2438] hover:border-[#1f2438] px-4 py-2.5 rounded-full flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95 z-40 cursor-pointer text-xs font-black uppercase tracking-wider"
              >
                <HelpCircle size={14} className="text-brand-orange animate-pulse" />
                <span>Help & Support</span>
              </button>
            </main>
          </div>
        </div>

        {/* Modal: Create Company organization popup */}
        {showCreateModal && (
          <CreateCompanyModal 
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateCompany}
          />
        )}

        {/* Modal: Resource file preview popup */}
        {previewFile && previewType && (
          <FilePreviewModal 
            previewFile={previewFile}
            previewType={previewType}
            onClose={() => {
              setPreviewFile(null);
              setPreviewType(null);
            }}
          />
        )}
      </div>
    );
  }

  // ─── PUBLIC CLIENT LANDING VIEW ─────────────────────────────────────────────
  if (!loading && company && !company.isActive && !isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-100/70 dark:bg-black text-zinc-700 dark:text-zinc-300 font-sans flex items-center justify-center p-4">
        {/* Glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-red/8 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-orange/6 blur-[110px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-md border-flow-card rounded-[2.5rem]">
          <div className={`p-8 sm:p-10 text-center space-y-6 border rounded-[calc(2.5rem-1.5px)] ${
            theme === 'dark' ? 'card-pattern-dark border-zinc-800 bg-zinc-950 text-white shadow-2xl' : 'card-pattern-light border-zinc-200 bg-white text-zinc-900 shadow-xl'
          }`}>
            <div className="mx-auto p-4 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl w-fit">
              <Shield className="w-12 h-12 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">Profile Inactive</h2>
              <p className="text-[11px] text-zinc-450 dark:text-zinc-550 font-light leading-relaxed">
                The GRC Trust Center for {company.companyName} is currently offline. Verification sync node has suspended active broadcasts.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full flex items-center justify-center gap-2 border border-zinc-200 dark:border-[#1f2438] hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 dark:hover:text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer text-[10px] uppercase tracking-wider shadow-sm"
            >
              Administrator Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100/70 dark:bg-black text-zinc-700 dark:text-zinc-300 font-sans relative overflow-x-hidden selection:bg-brand-orange/30 selection:text-brand-orange">
      <Preloader isLoading={loading} />
      <Toaster richColors position="top-right" theme={theme} />
      
      {/* Exquisite Deep Background Effects wrapped in absolute-inset-overflow-hidden to prevent mobile right cutoff */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-100/80 to-zinc-100/50 dark:from-zinc-950/40 dark:via-black dark:to-black" />
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-brand-red/10 blur-[140px] mix-blend-screen" />
        <div className="absolute top-[25%] left-[-10%] w-[700px] h-[700px] rounded-full bg-brand-orange/8 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[850px] h-[850px] rounded-full bg-brand-yellow-light/10 blur-[150px] mix-blend-screen" />
      </div>
      
      {/* Subtle Noise Texture overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
 
      {company && (
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Fixed Unified Glassmorphic Navigation Header */}
          <TrustHeader 
            company={company}
            theme={theme}
            toggleTheme={toggleTheme}
            detailedView={detailedView}
            setDetailedView={setDetailedView}
          />

          {/* Spacer to push content below the fixed header */}
          <div className="h-14 sm:h-16 w-full shrink-0 pointer-events-none" />

          {/* Main Content Body */}
          <div id="overview-section" className="w-full max-w-[92rem] mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 relative z-10">
            
            {/* Executive Security Hero Card (SafeBase & Sprinto style) */}
            <SecurityHero 
              company={{ ...company, logoUrl: displayLogoUrl }}
              theme={theme}
              detailed={detailedView}
              onRequestAccess={() => {
                const el = document.getElementById('documents-section');
                if (el) {
                  const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
              }}
            />

            {/* Verified Compliance Frameworks & Certifications Strip */}
            <FrameworkBadges theme={theme} detailed={detailedView} />

            {/* Continuous Security Controls Grid (3-Column SafeBase/Sprinto style) */}
            <SecurityControlsGrid domains={company.domains} theme={theme} detailed={detailedView} />

            {/* Resources & Compliance Documents Catalog */}
            <DocumentSection 
              documents={[
                ...resources
                  .filter(r => r.fileName.toLowerCase().endsWith('.pdf'))
                  .map(r => ({
                    id: String(r.fileId),
                    name: r.fileName.replace(/\.pdf$/i, '').replace(/_/g, ' '),
                    type: 'PDF',
                    requiresVerification: r.label !== 'PUBLIC',
                    label: r.label || 'PUBLIC',
                    fileData: r.fileData
                  })),
                { id: 'privacy-policy', name: 'Privacy Policy', type: 'Link', requiresVerification: false, url: '#', label: 'PUBLIC' }
              ]} 
              detailed={detailedView} 
            />

            {/* Verified Cloud Subprocessors & Infrastructure */}
            <SubprocessorsSection theme={theme} detailed={detailedView} />

            {/* Compliance Roadmap & Primary Hosting Datacenter Location + Due Diligence Support */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-7 xl:col-span-7">
                <ComplianceJourney theme={theme} milestones={company.milestones} detailed={detailedView} />
              </div>
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6">
                <LocationGlobe 
                  theme={theme} 
                  latitude={company.latitude ?? undefined} 
                  longitude={company.longitude ?? undefined} 
                  locationName={company.locationName ?? undefined} 
                />

                {/* Vendor Due Diligence & Security Questionnaire Card */}
                <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  theme === 'dark' 
                    ? 'bg-zinc-900/40 border-zinc-800/80 shadow-sm' 
                    : 'bg-white border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                }`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-wider uppercase text-brand-orange">
                        <span>Vendor Due Diligence</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold uppercase">
                        SIG • CAIQ • VSA
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                      Need a Custom Security Assessment?
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                      Our compliance team supports custom SIG, CAIQ, VSA, and RFP questionnaire workflows with fast 48-hour turnarounds.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <button
                      onClick={() => setIsQuestionnaireOpen(true)}
                      className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer text-center"
                    >
                      Request Security Questionnaire
                    </button>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Security FAQs */}
            <FAQSection 
              faqs={company.faqs} 
              theme={theme} 
              companyName={company.companyName}
              companyId={company.id} 
              showQuestionnaireBanner={false}
            />

            {/* Interactive Security Questionnaire Modal */}
            <SecurityQuestionnaireModal 
              isOpen={isQuestionnaireOpen} 
              onClose={() => setIsQuestionnaireOpen(false)} 
              companyName={company.companyName}
              companyId={company.id}
            />

          </div>

          {/* Minimalist Modern Footer */}
          <footer className="w-full relative z-10 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-transparent mt-16 sm:mt-24 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Brand & Tagline */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                <div 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-2.5 cursor-pointer group select-none"
                >
                  <img 
                    src={reachGrcLogo} 
                    alt="ReachGRC" 
                    className="h-5 w-auto object-contain transition-transform group-hover:scale-105" 
                  />
                  <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white tracking-tight">
                    <span>ReachGRC</span>
                    <span className="text-brand-orange font-semibold text-[10px] px-1.5 py-0.5 rounded-md bg-brand-orange/10 border border-brand-orange/20">Trust</span>
                  </div>
                </div>

                <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>

                <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                  Continuous security & compliance posture
                </span>
              </div>

              {/* Clean Navigation Links */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <button 
                  onClick={() => navigate('/status')}
                  className="hover:text-brand-orange transition-colors cursor-pointer"
                >
                  Status
                </button>
                <button 
                  onClick={() => navigate('/docs/getting-started/overview')}
                  className="hover:text-brand-orange transition-colors cursor-pointer"
                >
                  Documentation
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('controls-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors cursor-pointer"
                >
                  Controls
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors cursor-pointer"
                >
                  Security FAQ
                </button>
                <a 
                  href="mailto:security@reachgrc.io?subject=Security%20Questionnaire%20Inquiry"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact Security
                </a>
              </div>

              {/* Status Pill & Copyright */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Operational</span>
                </div>
                <span>© {new Date().getFullYear()} ReachGRC</span>
              </div>

            </div>
          </footer>

        </div>
      )}

      {/* Modal: Resource file preview popup in public mode */}
      {previewFile && previewType && (
        <FilePreviewModal 
          previewFile={previewFile}
          previewType={previewType}
          onClose={() => {
            setPreviewFile(null);
            setPreviewType(null);
          }}
        />
      )}
    </div>
  );
};
