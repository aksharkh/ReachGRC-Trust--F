import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCompanyData } from '../services/api';
import type { Company } from '../types/index';
import { TrustBadge } from '../components/TrustBadge';
import { Shield, Lock, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface CompanyProfileProps {
  mode: 'public' | 'admin';
}

export const CompanyProfile = ({ mode }: CompanyProfileProps) => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompanyData(id).then((data) => {
        setCompany(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading security profile...</div>;
  if (!company) return <div className="p-8 text-center text-red-500">Company not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={company.logoUrl} alt={company.name} className="w-16 h-16 rounded-lg bg-gray-100" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name} Trust Center</h1>
              <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {company.domain}
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            {mode === 'admin' && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                Admin View
              </span>
            )}
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              Verified
            </span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Trust Badge & Key Stats */}
          <div className="space-y-6">
            <TrustBadge company={company} className="w-full" />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4 text-gray-900">Security Snapshot</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grade</span>
                  <span className="font-bold text-gray-900">{company.stats.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Controls Passing</span>
                  <span className="font-bold text-green-600">{company.stats.controlsPassing}/{company.stats.totalControls}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(company.stats.controlsPassing / company.stats.totalControls) * 100}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Certifications & Compliance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {company.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Only Detailed View */}
            {mode === 'admin' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <h2 className="text-lg font-semibold mb-4 text-purple-900 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Internal Audit Controls
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                     <h4 className="font-semibold text-red-900 flex items-center gap-2 mb-2">
                       <AlertTriangle className="w-4 h-4" />
                       Failing Controls ({company.stats.totalControls - company.stats.controlsPassing})
                     </h4>
                     <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                       <li>[AWS-001] S3 Buckets should not be public</li>
                       <li>[IAM-045] Two-factor authentication not enforced for all users</li>
                       <li>[LOG-002] Audit logs retention period &lt; 90 days</li>
                     </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      Audit Log
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>2023-10-15: Automated scan completed. Grade A+ confirmed.</p>
                      <p>2023-10-14: Manual override on Control #42 by Admin.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Public Documents (Visible to all) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                Available Documents
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex justify-between items-center group">
                  <span className="font-medium">SOC 2 Type II Report (2023)</span>
                  <span className="text-sm text-gray-400 group-hover:text-blue-500">Request Access</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex justify-between items-center group">
                  <span className="font-medium">Penetration Test Summary</span>
                  <span className="text-sm text-gray-400 group-hover:text-blue-500">Download</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
