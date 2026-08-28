import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Server, 
  FileText, 
  Globe, 
  Activity, 
  Plus, 
  Sun, 
  Moon, 
  Fingerprint
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import reachGrcLogo from '../assets/REACH_GRC.png';
import { fetchAllActiveCompanies } from '../services/api';
import type { Company } from '../types';

// Default demo companies for instant zero-latency render and fallback
const FALLBACK_COMPANIES: Array<Partial<Company> & { id: number; companyName: string; grade: string; score: number; controls: number; location: string; tags: string[] }> = [
  {
    id: 1,
    companyName: 'TechCorp',
    statement: 'Continuous security posture, enterprise infrastructure integrity, and active real-time compliance attestations.',
    grade: 'A+',
    score: 100,
    controls: 48,
    location: 'Bangalore, India • AWS ap-south-1',
    tags: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR', 'HIPAA', 'PCI-DSS v4.0']
  },
  {
    id: 2,
    companyName: 'Akshar Enterprise',
    statement: 'Cloud-native zero trust architecture, end-to-end payload encryption, and automated control governance.',
    grade: 'A',
    score: 92,
    controls: 36,
    location: 'US East • AWS us-east-1',
    tags: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR']
  },
  {
    id: 6,
    companyName: 'Akshar Cloud Labs',
    statement: 'High-frequency telemetry aggregation, multi-cloud isolation partitions, and automated vendor risk scoring.',
    grade: 'B',
    score: 85,
    controls: 28,
    location: 'Frankfurt, Germany • AWS eu-central-1',
    tags: ['SOC 2 Type II', 'GDPR']
  }
];

const FRAMEWORK_FILTERS = [
  'ALL',
  'SOC 2 Type II',
  'ISO/IEC 27001',
  'GDPR / CCPA',
  'HIPAA Ready',
  'PCI-DSS v4.0'
];

const TRUST_FAQS = [
  {
    id: '1',
    question: 'What is a Security Trust Center?',
    answer: 'A Security Trust Center is a real-time, public or gated portal that communicates an organization\'s live security posture, active compliance certifications (SOC 2, ISO 27001, HIPAA, PCI-DSS), cloud infrastructure controls, verified subprocessors, and data privacy commitments. It replaces obsolete static PDF audits with live telemetry.'
  },
  {
    id: '2',
    question: 'How do enterprise buyers request confidential SOC 2 or Pen Test reports?',
    answer: 'Buyers can browse the Trust Center and request gated compliance packages directly. Access is protected by automated NDA verification and optional email domain validation, ensuring only authorized procurement officers receive watermarked cryptographic copies.'
  },
  {
    id: '3',
    question: 'How does live telemetry replace manual vendor questionnaires (SIG / CAIQ)?',
    answer: 'Instead of filling out 50-page spreadsheets with 300+ repetitive questions, organizations connect their cloud environments (AWS, GitHub, Cloudflare, Google Workspace). Live telemetry streams control statuses directly into the Trust Center, allowing buyers to verify answers with immutable proof.'
  },
  {
    id: '4',
    question: 'What is the turnaround time for custom security assessments?',
    answer: 'Through our integrated Vendor Due Diligence workflow, procurement teams can submit custom SIG Lite, CAIQ, VSA, or RFP questionnaires. Our dedicated GRC engineering team coordinates verified answers within 48 business hours.'
  },
  {
    id: '5',
    question: 'How can an organization publish its own Trust Center on ReachGRC?',
    answer: 'Organizations can register through ReachGRC, configure their monitored domains (App, Data, Network, Cloud), sync automated telemetry via Google Sheets or REST APIs, upload attestation packages, and launch an enterprise-grade branded Trust Center in under 10 minutes.'
  }
];

export const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('1');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load companies from backend
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchAllActiveCompanies();
        if (isMounted) {
          if (data && data.length > 0) {
            setCompanies(data);
          }
        }
      } catch (err) {
        console.error('Error fetching companies for home page:', err);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Keyboard shortcut: Cmd+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalized company list for directory display
  const displayCompanies = useMemo(() => {
    if (companies.length > 0) {
      return companies.map(c => {
        const score = c.stats?.score ?? 95;
        const grade = c.stats?.grade ?? 'A';
        const controls = c.stats?.totalControls ?? 32;
        const location = c.locationName ? `${c.locationName} • Active Datacenter` : 'Multi-Region Cloud';
        return {
          id: c.id,
          companyName: c.companyName,
          statement: c.statement || 'Continuous compliance posture and real-time security attestation.',
          grade,
          score,
          controls,
          location,
          tags: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR / CCPA', 'HIPAA Ready']
        };
      });
    }
    return FALLBACK_COMPANIES;
  }, [companies]);

  // Filtered companies based on search and selected framework
  const filteredCompanies = useMemo(() => {
    return displayCompanies.filter(c => {
      const matchesSearch = 
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.statement && c.statement.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesFilter = selectedFilter === 'ALL' || (c.tags && c.tags.some(t => t.toLowerCase().includes(selectedFilter.toLowerCase())));

      return matchesSearch && matchesFilter;
    });
  }, [displayCompanies, searchQuery, selectedFilter]);

  const handleSelectCompany = (id: number | string) => {
    navigate(`/company/${id}`);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#090b11] text-zinc-100' 
        : 'bg-[#FBFBFD] text-zinc-900'
    }`}>
      
      {/* 1. TOP NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#090b11]/85 border-zinc-800/80 shadow-md'
          : 'bg-white/85 border-zinc-200/80 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <img 
              src={reachGrcLogo} 
              alt="ReachGRC Logo" 
              className="w-7 h-7 object-contain group-hover:scale-105 transition-transform" 
            />
            <div className="flex items-center gap-1 font-black text-sm tracking-wider uppercase">
              <span className="text-zinc-900 dark:text-white">Reach</span>
              <span className="text-brand-orange">GRC</span>
              <span className="text-[10px] text-zinc-400 font-bold ml-1 tracking-widest hidden sm:inline">Trust</span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <a href="#directory" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Directory</a>
            <a href="#overview" className="hover:text-zinc-900 dark:hover:text-white transition-colors">What is a Trust Center?</a>
            <a href="#faq" className="hover:text-zinc-900 dark:hover:text-white transition-colors">FAQs</a>
            <Link to="/docs/getting-started/overview" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</Link>
            <Link to="/status" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Status
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={(e) => toggleTheme(e)}
              aria-label="Toggle theme"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                theme === 'dark' 
                  ? 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700' 
                  : 'border-zinc-200 bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
              }`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Admin Login Button */}
            <Link
              to="/admin/login"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
            >
              Admin Portal
            </Link>

            {/* View Default Trust Center */}
            <Link
              to="/company/1"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-xs cursor-pointer"
            >
              <span>Explore TechCorp</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH INTERACTIVE SEARCH */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-visible">
        
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20rem] bg-gradient-to-tr from-brand-red/10 via-brand-orange/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10.5px] font-mono font-bold tracking-widest uppercase mb-6 shadow-xs">
          <Fingerprint size={12} />
          <span>ReachGRC Verified Trust Network</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Real-Time Security Posture &{' '}
          <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-500 bg-clip-text text-transparent">
            Verified Compliance Portals
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed font-normal">
          Search verified enterprise organizations, inspect live SOC 2, ISO 27001, and HIPAA compliance controls, review verified cloud subprocessors, and request gated security packages in seconds.
        </p>

        {/* INTERACTIVE SEARCH BAR CONTAINER */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto relative z-30">
          <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
            isSearchFocused
              ? 'ring-2 ring-brand-orange/50 border-brand-orange/80 bg-white dark:bg-zinc-900 shadow-xl shadow-brand-orange/10'
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}>
            
            <div className="pl-4 sm:pl-5 text-zinc-400">
              <Search size={18} />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredCompanies.length > 0) {
                  handleSelectCompany(filteredCompanies[0].id!);
                }
              }}
              placeholder="Search companies (e.g., TechCorp, Akshar), frameworks, or domains..."
              className="w-full py-4 pl-3 pr-24 text-sm sm:text-base bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
            />

            {/* Keyboard shortcut hint */}
            <div className="absolute right-3.5 hidden sm:flex items-center gap-1 text-[10.5px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">
              <span>⌘K</span>
            </div>
          </div>

          {/* AUTOCOMPLETE DROPDOWN RESULTS */}
          {isSearchFocused && (
            <div 
              ref={dropdownRef}
              className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0e16] shadow-2xl overflow-hidden z-50 text-left transition-all divide-y divide-zinc-100 dark:divide-zinc-800/80"
            >
              <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
                <span>Verified Organizations ({filteredCompanies.length})</span>
                <span>Press Enter to select</span>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => handleSelectCompany(comp.id!)}
                      className="px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-orange/20 border border-brand-orange/30 flex items-center justify-center font-black text-brand-orange shrink-0">
                          {comp.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">
                              {comp.companyName}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              {comp.grade} Grade
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                            {comp.statement}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-brand-orange font-semibold shrink-0 group-hover:translate-x-1 transition-transform">
                        <span>View Portal</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-zinc-500">
                    No verified organizations found matching "{searchQuery}"
                  </div>
                )}
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-500">
                <span>Looking for your company?</span>
                <Link to="/admin/login" className="font-bold text-brand-orange hover:underline">
                  Publish Your Trust Center →
                </Link>
              </div>
            </div>
          )}

          {/* Quick Filter Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {FRAMEWORK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Live Network Metric Stats */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80 pt-8">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">100%</div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Live Telemetry Feeds</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-orange">48 hrs</div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Questionnaire SLA</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">5+</div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Global Standards</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500">Zero-Log</div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">DPA & Encryption</div>
          </div>
        </div>

      </section>

      {/* 3. VERIFIED ORGANIZATIONS DIRECTORY GRID */}
      <section id="directory" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-1">
              <span>Public Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Verified Trust Centers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Inspect active controls, audited frameworks, and security telemetry for registered organizations.
            </p>
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            Showing {filteredCompanies.length} of {displayCompanies.length} Verified Portals
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => handleSelectCompany(comp.id!)}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                theme === 'dark'
                  ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-brand-orange/50 hover:bg-zinc-900/70 shadow-sm'
                  : 'bg-white border-zinc-200/80 hover:border-brand-orange/50 hover:shadow-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div>
                {/* Header with Avatar & Grade Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-red/10 via-brand-orange/15 to-amber-500/10 border border-brand-orange/20 flex items-center justify-center font-black text-brand-orange text-base group-hover:scale-105 transition-transform">
                      {comp.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">
                        {comp.companyName}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                        <Globe size={11} className="text-zinc-400" />
                        <span className="line-clamp-1">{comp.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase shrink-0">
                    Grade {comp.grade}
                  </span>
                </div>

                {/* Mission Statement */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-5 font-normal">
                  {comp.statement}
                </p>

                {/* Compliance Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {comp.tags.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[9.5px] font-mono font-semibold uppercase bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {comp.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9.5px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500">
                      +{comp.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                  <ShieldCheck size={14} className="text-brand-orange" />
                  <span>{comp.controls} Controls Verified</span>
                </div>

                <span className="font-bold text-zinc-900 dark:text-white group-hover:text-brand-orange flex items-center gap-1 transition-colors">
                  <span>Explore</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "WHAT IS A TRUST CENTER?" EDUCATIONAL OVERVIEW SECTION */}
      <section id="overview" className={`py-20 px-4 sm:px-6 lg:px-8 border-y transition-colors ${
        theme === 'dark' 
          ? 'bg-zinc-900/20 border-zinc-800/80' 
          : 'bg-zinc-50/70 border-zinc-200/80'
      }`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-2">
              <span>GRC Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              What is an Enterprise Security Trust Center?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
              A Trust Center is the authoritative, continuously updated public face of your security and compliance program. It transforms procurement friction into an automated enterprise sales accelerator.
            </p>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              theme === 'dark' 
                ? 'bg-zinc-900/40 border-zinc-800/80' 
                : 'bg-white border-zinc-200/80 shadow-xs'
            }`}>
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-4">
                <Activity size={20} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                1. Continuous Telemetry
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Replace point-in-time annual audits with hourly evidence streams from AWS, Cloudflare, Google Workspace, and GitHub environments.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              theme === 'dark' 
                ? 'bg-zinc-900/40 border-zinc-800/80' 
                : 'bg-white border-zinc-200/80 shadow-xs'
            }`}>
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mb-4">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                2. Self-Serve NDA Gating
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Allow prospective enterprise buyers to sign mutual NDAs and download watermarked SOC 2 and ISO 27001 audit reports without email delays.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              theme === 'dark' 
                ? 'bg-zinc-900/40 border-zinc-800/80' 
                : 'bg-white border-zinc-200/80 shadow-xs'
            }`}>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4">
                <Server size={20} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                3. Subprocessor Risk
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Publish full transparency over third-party cloud subprocessors, regional data isolation boundaries, cipher suites, and DPA agreements.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              theme === 'dark' 
                ? 'bg-zinc-900/40 border-zinc-800/80' 
                : 'bg-white border-zinc-200/80 shadow-xs'
            }`}>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-4">
                <FileText size={20} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                4. Rapid Questionnaires
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Empower prospective clients to request custom SIG, CAIQ, VSA, or RFP security evaluations completed by our compliance team in 48 hours.
              </p>
            </div>

          </div>

          {/* Comparison Matrix: Old Way vs. ReachGRC Trust Center */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-center text-zinc-900 dark:text-white mb-6">
              Traditional Security Reviews vs. ReachGRC Trust Center
            </h3>

            <div className={`rounded-3xl border overflow-hidden ${
              theme === 'dark' ? 'border-zinc-800 bg-zinc-900/30' : 'border-zinc-200 bg-white shadow-xs'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800">
                
                {/* Traditional Audits */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-red-500">
                    The Obsolete Way: Manual Audits
                  </div>
                  <ul className="space-y-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>50-page spreadsheets with 300+ repetitive security questions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Stale 11-month-old PDF audits that fail to reflect current posture.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Weeks of back-and-forth emails between sales and security engineers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Zero visibility into subprocessor changes and data sovereignty.</span>
                    </li>
                  </ul>
                </div>

                {/* ReachGRC Live Trust Center */}
                <div className="p-6 sm:p-8 space-y-4 bg-brand-orange/[0.02]">
                  <div className="text-xs font-mono font-bold uppercase text-brand-orange">
                    The Modern Standard: ReachGRC Trust Center
                  </div>
                  <ul className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Instant 1-click self-serve NDA access to audited attestation packages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Continuous hourly control telemetry feeds from cloud and developer tools.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>48-hour turnarounds on custom SIG, CAIQ, and RFP questionnaires.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Live global datacenter map and cryptographic DPA accountability.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TRUST CENTER FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange mb-1">
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Trust Center FAQs
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Essential answers on vendor risk assessment, compliance telemetry, and confidentiality.
          </p>
        </div>

        {/* FAQ Accordion List - Matching Vibrant Red & Orange Portal Style */}
        <div className="space-y-3.5">
          {TRUST_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`rounded-2xl sm:rounded-[1.25rem] transition-all duration-350 ease-out overflow-hidden select-none ${
                  isOpen 
                    ? 'bg-gradient-to-r from-[#FF0000] via-[#FF2600] to-[#FF5500] text-white shadow-xl shadow-red-500/20 border border-transparent' 
                    : 'bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer transition-colors select-none gap-4"
                >
                  <span className={`font-bold text-sm sm:text-base tracking-tight leading-snug pr-2 ${
                    isOpen ? 'text-white' : 'text-zinc-900 dark:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`p-1.5 rounded-xl transition-transform duration-350 ease-out shrink-0 ${
                    isOpen 
                      ? 'rotate-45 text-white' 
                      : 'text-zinc-400 dark:text-zinc-500'
                  }`}>
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>

                <div 
                  className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t border-white/20 pt-3 text-white/95 font-medium">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden text-center ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border-zinc-800 shadow-xl' 
            : 'bg-gradient-to-b from-white to-zinc-50 border-zinc-200 shadow-lg'
        }`}>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Accelerate Security Procurement with ReachGRC
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Publish your verified Trust Center, connect live telemetry from your cloud stack, and fulfill custom vendor questionnaires in hours instead of weeks.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/company/1"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer text-center"
              >
                Explore TechCorp Trust Center →
              </Link>
              <Link
                to="/admin/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-center"
              >
                Sign In to Admin Portal
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. MINIMALIST MODERN FOOTER */}
      <footer className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          
          <div className="flex items-center gap-2">
            <img src={reachGrcLogo} alt="ReachGRC" className="w-5 h-5 object-contain" />
            <span className="font-bold text-zinc-900 dark:text-white">ReachGRC Trust</span>
            <span>• Continuous Security Telemetry Platform</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#directory" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Directory</a>
            <a href="#overview" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Architecture</a>
            <a href="#faq" className="hover:text-zinc-900 dark:hover:text-white transition-colors">FAQs</a>
            <Link to="/docs/getting-started/overview" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</Link>
            <Link to="/status" className="hover:text-zinc-900 dark:hover:text-white transition-colors">System Status</Link>
          </div>

          <div className="text-[11px] font-mono text-zinc-400">
            © {new Date().getFullYear()} ReachGRC. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};
