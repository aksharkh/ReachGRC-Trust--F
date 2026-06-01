import { useState, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaBan } from "react-icons/fa6";
import {
  FiKey,
  FiCopy,
  FiCheck,
  FiAlertTriangle,
  FiShield,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiToggleRight,
  FiMail,
  FiClock,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

// ─── Shared sub-components ───────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: string }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
    {children}
  </p>
);

const Divider = () => (
  <hr className="border-none border-t border-zinc-100 dark:border-zinc-800 my-8" />
);

const InlineCode = ({ children }: { children: string }) => (
  <code className="text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
    {children}
  </code>
);

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "green" | "amber" | "red" | "blue" | "zinc";
}) => {
  const styles = {
    green: "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    amber: "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    red:   "bg-red-50   text-red-800   dark:bg-red-900/20   dark:text-red-400",
    blue:  "bg-blue-50  text-blue-800  dark:bg-blue-900/20  dark:text-blue-400",
    zinc:  "bg-zinc-100 text-zinc-600  dark:bg-zinc-800     dark:text-zinc-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
};

const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 transition-colors"
      >
        {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="whitespace-pre-wrap pr-16">{children}</pre>
    </div>
  );
};

const Callout = ({
  icon,
  children,
  variant = "amber",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "amber" | "blue" | "red" | "green";
}) => {
  const styles = {
    amber: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400",
    blue:  "bg-blue-50  dark:bg-blue-900/10  border-blue-200  dark:border-blue-800  text-blue-700  dark:text-blue-400",
    red:   "bg-red-50   dark:bg-red-900/10   border-red-200   dark:border-red-800   text-red-700   dark:text-red-400",
    green: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400",
  };
  return (
    <div className={`flex gap-2.5 items-start border rounded-lg p-3.5 text-xs leading-relaxed ${styles[variant]}`}>
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <div>{children}</div>
    </div>
  );
};

// ─── Mock API key widget ──────────────────────────────────────────────────────

const ApiKeyPreview = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const fakeKey = "rgc_a3f9c2e1b74d6085fa91dc23e0b58764";
  const masked   = "rgc_" + "•".repeat(28);

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <FiKey size={13} />
          <span className="font-medium">Your API Key</span>
        </div>
        <Badge variant="green">
          <FiCheckCircle size={11} /> Active
        </Badge>
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300 tracking-wide truncate">
          {visible ? fakeKey : masked}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setVisible((v) => !v)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={visible ? "Hide key" : "Reveal key"}
          >
            {visible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Copy key"
          >
            {copied ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
          </button>
        </div>
      </div>
      <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Issued: Jan 15, 2025</span>
        <span>Expires: Jan 15, 2026</span>
      </div>
    </div>
  );
};



const sections = [
  { id: "what-it-looks-like",  label: "What your API key looks like" },
  { id: "how-to-pass",         label: "How to pass the key" },
  { id: "key-status",          label: "API key status" },
  { id: "rotation-renewal",    label: "Key rotation & renewal" },
  { id: "best-practices",      label: "Security best practices" },
  { id: "error-reference",     label: "Error reference" },
];

const OnPageNav = () => {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-6 self-start">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`w-full text-left cursor-pointer text-xs px-2 py-1.5 rounded transition-colors leading-snug ${
                active === id
                  ? "text-[#ff831c] font-medium "
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200  "
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};



// ─── Main page ────────────────────────────────────────────────────────────────

const ApiKeys = () => {
  return (
        <div className="flex gap-12 p-8 max-w-5xl">


      <div className="flex-1 min-w-0">

      <SectionTitle>Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
        API Keys
      </h1>
       <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
         Your API key is the single credential that authenticates every request
         you make to the ReachGRC Trust API. This page covers how your key looks,
         how to use it correctly, what its limits are, and what to do when things
         go wrong.
       </p>
       <Divider />
       {/* ── What an API key looks like ── */}
   <div id="what-it-looks-like" className="mb-8 scroll-mt-6">

         <SectionTitle> What your API key looks like</SectionTitle>
         <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
           Your key is a long random string prefixed with{" "}
           <InlineCode>rgc_</InlineCode>. The example below shows how it appears
           in your admin dashboard. Click the eye icon to reveal it.
         </p>
         <ApiKeyPreview />
         <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
           {[
          { label: "Format", value: "rgc_ + 32 hex chars" },
          { label: "Length", value: "36 characters total" },
          { label: "Validity", value: "1 year from issue date" },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3"
          >
            <p className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
              {item.label}
            </p>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-mono">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
       <Divider />
       {/* ── How to pass the key ── */}
       <div id="how-to-pass" className="mb-8 scroll-mt-6">
         <SectionTitle>How to pass the key in requests</SectionTitle>
         <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
           Include the key in the <InlineCode>x-api-key</InlineCode> HTTP header
           on every request. The API does not support query-parameter or
           cookie-based authentication.
         </p>
         <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
           Header format
         </p>
         <CodeBlock>{`x-api-key: rgc_your_api_key_here`}</CodeBlock>
         <div className="mt-5 border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
           {[
            {
              correct: true,
              label: "Correct — header",
              code: `curl https://api.reachgrc.com/api/trust/public/me \
-H "x-api-key: rgc_your_key"`,
            },
            {
              correct: false,
              label: "Wrong — query param (not supported)",
              code: `curl "https://api.reachgrc.com/api/trust/public/me?api_key=rgc_your_key"`,
            },
          ].map((item) => (
            <div key={item.label} className="p-4">
<p className="text-xs flex items-center gap-2 mb-2 text-zinc-700 dark:text-zinc-200">
  {item.correct ? (
    <SiTicktick className="text-green-500" />
  ) : (
    <RxCross2 className="text-red-500" />
  )}

  {item.label}
</p>
              <CodeBlock>{item.code}</CodeBlock>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Callout icon={<FiShield size={14} />} variant="amber">
            <strong>Security rule:</strong> Never embed your API key in
            client-side JavaScript, mobile app bundles, or public Git
            repositories. Always call the API from your backend server where the
            key is stored as an environment variable.
          </Callout>
        </div>
      </div>

      <Divider />

      {/* ── Key status ── */}
      <div id="key-status" className="mb-8 scroll-mt-6">
        <SectionTitle>API key status</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Your key can be in one of three states at any given time. Your
          ReachGRC admin can view and change the status from the admin
          dashboard.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: <FiCheckCircle size={16} className="text-green-500" />,
              badge: (
                <Badge variant="green">
                  <FiCheckCircle size={11} /> Active
                </Badge>
              ),
              title: "Active",
              desc: "The key is valid and all requests will be authenticated normally. This is the default state when a key is first issued.",
            },
            {
              icon: <FiXCircle size={16} className="text-red-400" />,
              badge: (
                <Badge variant="red">
                  <FiXCircle size={11} /> Inactive
                </Badge>
              ),
              title: "Inactive",
              desc: "The key has been manually deactivated by your admin — for example, during a security review or key rotation. All requests will return 403 Forbidden until reactivated or a new key is issued.",
            },
            {
              icon: <FiAlertCircle size={16} className="text-amber-400" />,
              badge: (
                <Badge variant="amber">
                  <FiClock size={11} /> Expired
                </Badge>
              ),
              title: "Expired",
              desc: "The key has passed its 1-year validity window. It cannot be reactivated — your admin must generate a new key for your account.",
            },
          ].map((row, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <div className="mt-0.5 flex-shrink-0">{row.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {row.title}
                  </p>
                  {row.badge}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {row.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Key rotation & renewal ── */}
      <div id="rotation-renewal" className="mb-8 scroll-mt-6">
        <SectionTitle>Key rotation & renewal</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Keys are not auto-renewed. You are responsible for tracking your
          expiry date and initiating renewal before it lapses.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: <FiMail size={15} />,
              title: "Contact your admin before expiry",
              desc: "Reach out to your ReachGRC administrator at least 7 days before your key expires. They will issue a new key and share it with you securely.",
            },
            {
              icon: <FiRefreshCw size={15} />,
              title: "Old key is invalidated on rotation",
              desc: "When a new key is generated for your account, the previous key is immediately invalidated. Update your integration before the switch to avoid downtime.",
            },
            {
              icon: <FiToggleRight size={15} />,
              title: "Update your environment variables",
              desc: (
                <>
                  Store your key as an environment variable (e.g.{" "}
                  <InlineCode>REACHGRC_API_KEY</InlineCode>) and update it
                  server-side when a new key is issued. Never hardcode the key
                  in source files.
                </>
              ),
            },
          ].map((row, i) => (
            <div key={i} className="flex gap-3 items-start p-4">
              <span className="  text-[#ff831c] mt-0.5 flex-shrink-0">
                {row.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-0.5">
                  {row.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {row.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Callout icon={<FiAlertTriangle size={14} />} variant="red">
            <strong>Do not wait until expiry.</strong> Once a key expires, all
            API calls immediately fail with{" "}
            <InlineCode>403 Forbidden</InlineCode>. There is no grace period.
          </Callout>
        </div>
      </div>

      <Divider />

      {/* ── Best practices ── */}
      <div id="best-practices" className="mb-8 scroll-mt-6">
        <SectionTitle>Security best practices</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: <MdOutlineSecurity />,
              title: "Store in environment variables",
              desc: "Use process.env or your server's secret manager. Never hardcode the key in source files.",
            },
            {
              icon: <FaBan />,
              title: "Never expose in the frontend",
              desc: "Client-side code (React, Vue, mobile apps) must never contain or forward your API key.",
            },
            {
              icon: <LuNotebookPen />,
              title: "Rotate on suspected compromise",
              desc: "If you believe your key has been leaked, contact your admin immediately to revoke and reissue it.",
            },
            {
              icon: <CiCalendarDate />,
              title: "Track your expiry date",
              desc: "Note the issue date. Set a calendar reminder 14 days before expiry to request a renewal.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base text-[#ff831c]">{item.icon}</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Error reference ──  */}
      <div id="error-reference" className="scroll-mt-6">
        <SectionTitle>Error reference</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Every API key error returns a JSON body with an{" "}
          <InlineCode>error</InlineCode> field. Use these to handle failures
          gracefully in your integration.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              code: "401",
              variant: "amber" as const,
              title: "API key missing",
              response: `{ "error": "API key missing" }`,
              action: `Add the x-api-key header to your request.`,
            },
            {
              code: "401",
              variant: "amber" as const,
              title: "API key not found",
              response: `{ "error": "Api key not found" }`,
              action:
                "Verify the key value — it may have a typo or belong to a different environment.",
            },
            {
              code: "403",
              variant: "red" as const,
              title: "API key is inactive",
              response: `{ "error": "Api Key is InActive" }`,
              action:
                "Contact your ReachGRC admin to reactivate or reissue your key.",
            },
            {
              code: "403",
              variant: "red" as const,
              title: "API key is expired",
              response: `{ "error": "Api Key is Expired" }`,
              action:
                "Request a new key from your ReachGRC admin. Expired keys cannot be reactivated.",
            },
          ].map((item, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={item.variant}>{item.code}</Badge>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </p>
              </div>
              <div className="font-mono text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 text-zinc-600 dark:text-zinc-400 mb-2">
                {item.response}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">
                  Fix:{" "}
                </span>
                {item.action}
              </p>
            </div>
          ))}
        </div>
      </div>
</div>
<OnPageNav/>
    </div>
  );
};

export default ApiKeys
