import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompanyData } from '../services/api';
import { Preloader } from '../components/Preloader';
import { TrustBadge } from '../components/TrustBadge';
import { SecurityControlsGrid } from '../components/SecurityControlsGrid';
import { DocumentSection } from '../components/DocumentSection';
import { FAQSection } from '../components/FAQSection';
import type { Company } from '../types';

export const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate a slightly longer load for the cinematic effect
      const timer = setTimeout(() => {
        fetchCompanyData(id).then((data) => {
          setCompany(data);
          setLoading(false);
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [id]);

  if (!company && !loading) return <div className="p-8 text-center text-red-500 font-sans">Security Profile Not Found</div>;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans relative overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
      <Preloader isLoading={loading} />
      
      {/* Exquisite Deep Background Effects */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0B1120] to-[#0B1120] pointer-events-none" />
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-orange-600/10 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-600/5 blur-[150px] mix-blend-screen pointer-events-none z-0" />
      
      {/* Subtle Noise Texture overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {company && (
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 animate-in fade-in duration-1000 delay-300 fill-mode-both relative z-10">
          
          {/* Hero Header Section */}
          <header className="relative group rounded-[2.5rem] bg-slate-900/40 backdrop-blur-3xl shadow-2xl ring-1 ring-white/10 p-8 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
            {/* Animated border gradient glow */}
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
