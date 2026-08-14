import React, { useState } from 'react';
import { CreditCard, Check, ShieldAlert, X } from 'lucide-react';
import type { Company } from '../../types';

interface TabBillingSubscriptionsProps {
  company: Company;
  theme: 'light' | 'dark';
  handleUpgrade: (plan: 'GROWTH' | 'ENTERPRISE') => Promise<void>;
  handleCancelSubscription: (pin: string) => Promise<boolean>;
}

/**
 * TabBillingSubscriptions Component
 * Configures Razorpay secure subscriptions, displays growth and enterprise tier pricing plan cards,
 * and houses the Danger Zone cancellation verification modal.
 */
export const TabBillingSubscriptions: React.FC<TabBillingSubscriptionsProps> = ({
  company,
  theme,
  handleUpgrade,
  handleCancelSubscription,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [securePinInput, setSecurePinInput] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const onConfirmCancel = async () => {
    setCancelling(true);
    const success = await handleCancelSubscription(securePinInput);
    setCancelling(false);
    if (success) {
      setShowCancelModal(false);
      setSecurePinInput('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-350">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438]/80 pb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <CreditCard size={18} className="text-brand-orange" />
          Billing & Subscription Manager
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 dark:bg-[#090b11] px-3 py-1 text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-[#1f2438]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]"></span>
          {company.subscriptionPlan || "FREE"} Plan
        </span>
      </div>

      {/* Subscription overview dashboard */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#090b11]/60 border border-zinc-200 dark:border-[#1f2438]/80 flex items-center justify-between flex-wrap gap-4 text-xs">
        <div>
          <p className="text-zinc-550 dark:text-zinc-400 font-bold uppercase tracking-wider">Subscription Status</p>
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-1">{company.subscriptionStatus || "ACTIVE"}</p>
        </div>
        <div>
          <p className="text-zinc-550 dark:text-zinc-400 font-bold uppercase tracking-wider text-left">Renewal Period</p>
          <p className="text-zinc-700 dark:text-zinc-300 mt-1 font-semibold">{company.subscriptionExpiresAt ? new Date(company.subscriptionExpiresAt).toLocaleDateString() : 'Unlimited'}</p>
        </div>
        <div>
          <p className="text-zinc-555 dark:text-zinc-450 font-bold uppercase tracking-wider">Payment Method</p>
          <p className="text-brand-orange mt-1 font-bold">Razorpay Secure Checkout</p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className={`p-6 rounded-2xl border flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
          company.subscriptionPlan === 'GROWTH' ? 'border-brand-orange/60 shadow-[0_0_15px_rgba(255,138,28,0.12)]' : 'border-zinc-200 dark:border-[#1f2438]'
        } ${
          theme === 'dark' ? 'bg-[#111219] card-pattern-dark text-white' : 'bg-white card-pattern-light text-zinc-900'
        }`}>
          {company.subscriptionPlan === 'GROWTH' && (
            <div className="absolute top-0 right-0 bg-brand-orange text-white font-black text-[9px] px-3 py-1.5 uppercase tracking-widest rounded-bl-xl">Current Plan</div>
          )}
          <div>
            <p className="text-[10px] font-bold text-zinc-450 dark:text-zinc-400 uppercase tracking-widest">Growth Plan</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-3">₹4,999<span className="text-xs text-zinc-505 font-normal text-zinc-500"> / month</span></p>
            <ul className="text-xs text-zinc-505 dark:text-zinc-400 space-y-2.5 mt-5">
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> Automated Google Sheets Sync</li>
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> API key authorization pipeline</li>
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> Unlimited compliance controls</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade('GROWTH')}
            disabled={company.subscriptionPlan === 'GROWTH' || company.subscriptionPlan === 'ENTERPRISE'}
            className="w-full mt-6 py-2.5 rounded-xl font-bold text-xs bg-brand-orange hover:bg-brand-orange/95 disabled:bg-zinc-200 dark:disabled:bg-zinc-850 disabled:text-zinc-400 dark:disabled:text-zinc-500 text-white shadow-lg hover:shadow-brand-orange/20 transition-all cursor-pointer uppercase tracking-wider animate-[pulse_2s_infinite]"
          >
            {company.subscriptionPlan === 'GROWTH' ? 'Active' : company.subscriptionPlan === 'ENTERPRISE' ? 'Included' : 'Upgrade to Growth'}
          </button>
        </div>

        <div className={`p-6 rounded-2xl border flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
          company.subscriptionPlan === 'ENTERPRISE' ? 'border-brand-orange/60 shadow-[0_0_15px_rgba(255,138,28,0.12)]' : 'border-zinc-200 dark:border-[#1f2438]'
        } ${
          theme === 'dark' ? 'bg-[#111219] card-pattern-dark text-white' : 'bg-white card-pattern-light text-zinc-900'
        }`}>
          {company.subscriptionPlan === 'ENTERPRISE' && (
            <div className="absolute top-0 right-0 bg-brand-orange text-white font-black text-[9px] px-3 py-1.5 uppercase tracking-widest rounded-bl-xl">Current Plan</div>
          )}
          <div>
            <p className="text-[10px] font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-widest">Enterprise Plan</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-3">₹19,999<span className="text-xs text-zinc-505 font-normal text-zinc-500"> / month</span></p>
            <ul className="text-xs text-zinc-550 dark:text-zinc-400 space-y-2.5 mt-5">
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> Custom compliance badge configuration</li>
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> Dedicated success engineer</li>
              <li className="flex items-center gap-2 font-medium"><Check size={12} className="text-green-500" /> 99.9% REST API availability SLA</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade('ENTERPRISE')}
            disabled={company.subscriptionPlan === 'ENTERPRISE'}
            className="w-full mt-6 py-2.5 rounded-xl font-bold text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-350 dark:border-zinc-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-850 disabled:text-zinc-400 dark:disabled:text-zinc-500 text-zinc-800 dark:text-white transition-all cursor-pointer uppercase tracking-wider"
          >
            {company.subscriptionPlan === 'ENTERPRISE' ? 'Active' : 'Upgrade to Enterprise'}
          </button>
        </div>
      </div>

      {/* Danger Zone Downgrade details */}
      {company.subscriptionPlan && company.subscriptionPlan !== 'FREE' && (
        <div className="mt-8 border-t border-zinc-200 dark:border-[#1f2438] pt-6 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">Danger Zone</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Downgrade compliance workspace to the Free tier and revoke API key.</p>
          </div>
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-550/20 text-red-500 font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      {/* Cancel Subscription Modal Overlay */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131622] border border-zinc-200 dark:border-[#1f2438] rounded-3xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f2438] pb-3">
              <h3 className="text-sm font-bold text-red-500 flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" />
                Cancel GRC Subscription
              </h3>
              <button 
                onClick={() => {
                  setShowCancelModal(false);
                  setSecurePinInput('');
                }}
                className="p-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs leading-relaxed space-y-1">
                <p className="font-bold">⚠️ Warning:</p>
                <p>This action will immediately downgrade the organization GRC workspace to the <strong>Free tier</strong>. API key authentication will be revoked and compliance clients will no longer have GRC API sync access.</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-bold text-zinc-405 dark:text-zinc-500 uppercase tracking-wider">Secure Administrative PIN</label>
                <input 
                  type="password"
                  placeholder="Enter Secure PIN"
                  value={securePinInput}
                  onChange={e => setSecurePinInput(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-[#090b11] border border-zinc-200 dark:border-[#1f2438] rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-red-550/40"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-zinc-200 dark:border-[#1f2438]">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSecurePinInput('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white transition-colors cursor-pointer"
              >
                Keep Subscription
              </button>
              <button
                onClick={onConfirmCancel}
                disabled={cancelling}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 disabled:bg-zinc-500 text-white transition-colors cursor-pointer"
              >
                {cancelling ? 'Downgrading...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
