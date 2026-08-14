import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { Toaster, toast } from 'sonner';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('expired') === 'true') {
      toast.error("Your administrator session has expired. Please log in again.", { id: "session-expired" });
      // Clear the query parameter from browser address bar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        toast.success("Administrator session verified!");
        navigate('/admin/company/1');
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.error || "Invalid administrator credentials. Try password 'admin123'.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Failed to connect to authentication server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100/70 dark:bg-black text-zinc-700 dark:text-zinc-300 font-sans relative flex items-center justify-center p-4 overflow-hidden selection:bg-brand-orange/30 selection:text-brand-orange">
      {/* Exquisite Deep Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-100/80 to-zinc-100/50 dark:from-zinc-950/40 dark:via-black dark:to-black" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-red/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-orange/8 blur-[120px] mix-blend-screen" />
      </div>

      <Toaster richColors position="top-right" theme={theme} />

      {/* Main Login Card Wrapper */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-400">
        
        {/* Floating Back Action */}
        <button
          onClick={() => navigate('/company/1')}
          className="absolute -top-14 left-0 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-550 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={12} />
          Client Portal
        </button>

        {/* Outer Card with border-flow glow effect */}
        <div className="border-flow-card rounded-[2.5rem]">
          <div className={`rounded-[calc(2.5rem-1.5px)] border p-8 sm:p-10 space-y-6 ${
            isDark 
              ? 'card-pattern-dark border-zinc-800/80 bg-zinc-950/80 text-white shadow-2xl'
              : 'card-pattern-light border-zinc-200 bg-white text-zinc-900 shadow-xl'
          }`}>
            
            {/* Lock / Security Shield Icon */}
            <div className="mx-auto p-4 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-2xl w-fit">
              <Lock size={28} className="animate-pulse" />
            </div>

            {/* Title */}
            <div className="text-center space-y-1.5">
              <h1 className="text-xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">Admin Console Access</h1>
              <p className="text-[11px] text-zinc-450 dark:text-zinc-500 font-light">Verify administrator credentials to access the GRC telemetry hub.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-xs focus:border-brand-orange ${
                    isDark 
                      ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-650' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-405'
                  }`}
                  placeholder="admin"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Security Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-4 pr-10 py-2.5 rounded-xl border outline-none transition-all text-xs focus:border-brand-orange ${
                      isDark 
                        ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-650' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-405'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-350 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold tracking-wide py-3 rounded-xl transition-all duration-300 mt-8 shadow-[0_4px_12px_rgba(255,138,28,0.2)] hover:opacity-95 cursor-pointer text-xs uppercase disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {loading ? "Authenticating..." : "Authorize Access"}
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[9px] text-zinc-450 dark:text-zinc-650 uppercase tracking-widest mt-6">
          ReachGRC Attestation Protocol • Key Length 256-bit
        </p>

      </div>
    </div>
  );
};
