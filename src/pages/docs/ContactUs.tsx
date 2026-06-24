import { useState } from "react";
import { FiMail, FiUser, FiChevronDown, FiCheck, FiSend } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaPhone, FaBullseye, FaKey, FaLock } from "react-icons/fa";
import { BiWrench } from "react-icons/bi";
import { HiHand } from "react-icons/hi";
import {
  LuPhone,
  LuPresentation,
  LuRocket,
  LuPlug,
  LuKeyRound,
  LuCreditCard,
  LuClipboardCheck,
  LuHandshake,
  LuShieldAlert,
  LuMessageSquare,
  LuCircle
} from "react-icons/lu";

// Data contract for the Contact Us inquiry payload
interface FormState {
  name: string;
  email: string;
  company: string;
  reason: string;
  message: string;
}

// Selectable contact inquiry reasons mapped to corresponding UI icons
const reasons = [
  {
    value: "",
    label: "Select a reason for reaching out",
    icon: <LuCircle />,
  },
  {
    value: "executive-callback",
    label: "Request an executive callback",
    icon: <LuPhone />,
  },
  {
    value: "demo",
    label: "Schedule a product demo",
    icon: <LuPresentation />,
  },
  {
    value: "onboarding",
    label: "Help with onboarding / setup",
    icon: <LuRocket />,
  },
  {
    value: "api-support",
    label: "API integration support",
    icon: <LuPlug />,
  },
  {
    value: "api-key",
    label: "API key issue or renewal",
    icon: <LuKeyRound />,
  },
  {
    value: "billing",
    label: "Billing or plan inquiry",
    icon: <LuCreditCard />,
  },
  {
    value: "compliance",
    label: "Compliance or audit question",
    icon: <LuClipboardCheck />,
  },
  {
    value: "partnership",
    label: "Partnership or reseller inquiry",
    icon: <LuHandshake />,
  },
  {
    value: "security",
    label: "Report a security concern",
    icon: <LuShieldAlert />,
  },
  {
    value: "other",
    label: "Other",
    icon: <LuMessageSquare />,
  },
];

// Tailwind CSS class primitives for the form inputs
const inputBase =
  "w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ff831c]/40 focus:border-[#ff831c] transition-colors";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
    {children}
  </label>
);

const SuccessState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-5">
      <FiCheck size={26} className="text-green-600 dark:text-green-400" />
    </div>
    <h2 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
      Message sent
    </h2>
    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
      Thanks for reaching out. Our team will get back to you within one
      business day.
    </p>
  </div>
);

/**
 * ContactUsPage is the unified form page for customer inquiries.
 * 
 * Features:
 *   - Grid of quick contact badges (Sales, Support, Partners)
 *   - Stateful contact form with field validations
 *   - Contextual banner hints appearing dynamically based on select drop-down reasons
 *   - Submit button displaying inline loading animations during api post simulation
 *   - Interactive checkmark success screen upon submit completion
 */
const ContactUsPage = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission call delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const isValid = form.name && form.email && form.reason;

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header Branding */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[#ff831c]">
              <RiCustomerService2Line size={18} />
            </div>
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">
              Contact us
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Whether you need a demo, have a technical question, or want to
            discuss a partnership — we're here to help. Fill out the form and
            our team will get back to you within one business day.
          </p>
        </div>

        {/* Quick Contacts List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { icon: <FaPhone className="text-[#2563eb]" />, label: "Sales", sub: "Talk to our sales team" },
            { icon: <BiWrench className="text-[#D97706]" />, label: "Support", sub: "Get technical help" },
            { icon: <HiHand className="text-[#059669]" />, label: "Partners", sub: "Explore partnerships" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-550">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-zinc-100 dark:border-zinc-800 mb-10" />

        {submitted ? (
          <SuccessState />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name + Email Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>
                  <span className="flex items-center gap-1.5">
                    <FiUser size={11} /> Full name <span className="text-red-400">*</span>
                  </span>
                </Label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className={inputBase}
                />
              </div>
              <div>
                <Label>
                  <span className="flex items-center gap-1.5">
                    <FiMail size={11} /> Work email <span className="text-red-400">*</span>
                  </span>
                </Label>
                <input
                  type="email"
                  placeholder="jane@yourcompany.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  className={inputBase}
                />
              </div>
            </div>

            {/* Company Input */}
            <div>
              <Label>
                <span className="flex items-center gap-1.5">
                  <HiOutlineBuildingOffice2 size={11} /> Company name
                </span>
              </Label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={set("company")}
                className={inputBase}
              />
            </div>

            {/* Dropdown Select Reason */}
            <div>
              <Label>
                <span className="flex items-center gap-1.5">
                  How can we help? <span className="text-red-400">*</span>
                </span>
              </Label>
              <div className="relative">
                <select
                  value={form.reason}
                  onChange={set("reason")}
                  required
                  className={`${inputBase} appearance-none pr-9 cursor-pointer ${
                    !form.reason ? "text-zinc-400 dark:text-zinc-500" : ""
                  }`}
                >
                  {reasons.map((r) => (
                    <option
                      key={r.value}
                      value={r.value}
                      disabled={r.value === ""}
                      className="text-zinc-800 dark:text-zinc-200"
                    >
                      {r.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Contextual Warning/Information Banners */}
            {form.reason === "executive-callback" && (
              <div className="flex gap-2.5 items-start bg-orange-50/50 dark:bg-orange-950/10 border border-orange-200 dark:border-orange-900/40 rounded-lg p-3.5 text-xs text-orange-700 dark:text-orange-400">
                <span className="flex-shrink-0 mt-0.5"><FaPhone /></span>
                <span>Our executive team typically responds within 4 business hours. Please include your preferred callback time in the message below.</span>
              </div>
            )}
            {form.reason === "demo" && (
              <div className="flex gap-2.5 items-start bg-blue-50/55 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/40 rounded-lg p-3.5 text-xs text-blue-700 dark:text-blue-400">
                <span className="flex-shrink-0 mt-0.5"><FaBullseye /></span>
                <span>Demos are 30 minutes and tailored to your use case. Mention your team size and compliance goals in the message and we'll come prepared.</span>
              </div>
            )}
            {form.reason === "api-key" && (
              <div className="flex gap-2.5 items-start bg-amber-50/55 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-lg p-3.5 text-xs text-amber-700 dark:text-amber-400">
                <span className="flex-shrink-0 mt-0.5"><FaKey /></span>
                <span>For urgent API key issues, include your Company ID in the message below so we can resolve it faster.</span>
              </div>
            )}
            {form.reason === "security" && (
              <div className="flex gap-2.5 items-start bg-red-50/55 dark:bg-red-950/10 border border-red-200 dark:border-red-900/40 rounded-lg p-3.5 text-xs text-red-700 dark:text-red-400">
                <span className="shrink-0 mt-0.5"><FaLock /></span>
                <span>Please do not include sensitive vulnerability details here. We will provide a secure channel once we acknowledge your report.</span>
              </div>
            )}

            {/* Message Area */}
            <div>
              <Label>Message</Label>
              <textarea
                rows={5}
                placeholder="Tell us more about what you need..."
                value={form.message}
                onChange={set("message")}
                className={`${inputBase} resize-none`}
              />
            </div>

            {/* Submit Button with Inline spinner */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                isValid && !loading
                  ? "bg-[#ff831c] hover:bg-[#e6731a] text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-550 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={14} />
                  Send message
                </>
              )}
            </button>

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-550">
              We typically respond within one business day.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};

export default ContactUsPage;