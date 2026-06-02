import React, { useState, useEffect } from "react";
import {
  FiCopy, FiCheck, FiActivity,
  FiCheckCircle, FiXCircle, FiClock,
} from "react-icons/fi";

// ─── Shared ──────────────────────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
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
  children, variant,
}: {
  children: React.ReactNode;
  variant: "green" | "amber" | "red" | "zinc" | "purple";
}) => {
  const styles = {
    green:  "bg-green-50  text-green-700  dark:bg-green-900/20  dark:text-green-400",
    amber:  "bg-amber-50  text-amber-700  dark:bg-amber-900/20  dark:text-amber-400",
    red:    "bg-red-50    text-red-700    dark:bg-red-900/20    dark:text-red-400",
    zinc:   "bg-zinc-100  text-zinc-600   dark:bg-zinc-800      dark:text-zinc-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const CodeBlock = ({ children, raw }: { children: React.ReactNode; raw?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = raw ?? (typeof children === "string" ? children : "");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 overflow-x-auto">
      <button
        onClick={copy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 transition-colors"
      >
        {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="whitespace-pre-wrap pr-16 font-mono text-sm leading-relaxed text-zinc-800 dark:text-white">
        {children}
      </pre>
    </div>
  );
};

const Callout = ({
  icon, children, variant = "amber",
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

// ─── On-page nav ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "endpoint",        label: "Endpoint" },
  { id: "authentication",  label: "Authentication" },
  { id: "response",        label: "Response" },
  { id: "status-meanings", label: "What status means" },
  { id: "use-cases",       label: "When to use this" },
  { id: "error-reference", label: "Error reference" },
];

const OnPageNav = () => {
  const [active, setActive] = useState(navSections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
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
    <aside className="hidden xl:block w-52 flex-shrink-0 sticky top-6 self-start">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {navSections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`w-full text-left cursor-pointer text-xs px-2 py-1.5 rounded transition-colors leading-snug ${
                active === id
                  ? "text-[#ff831c] font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
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

// ─── Live status indicator ────────────────────────────────────────────────────

const LiveStatusBadge = () => {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/trust/public/health", { method: "GET" });
        setStatus(res.ok ? "online" : "offline");
      } catch {
        setStatus("offline");
      }
    };
    check();
  }, []);

  const styles = {
    checking: { dot: "bg-zinc-400 animate-pulse", text: "text-zinc-500 dark:text-zinc-400", label: "Checking..." },
    online:   { dot: "bg-green-500 animate-pulse", text: "text-green-700 dark:text-green-400", label: "Operational" },
    offline:  { dot: "bg-red-500", text: "text-red-700 dark:text-red-400", label: "Unreachable" },
  };

  const s = styles[status];

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
      <span className={`text-sm font-medium ${s.text}`}>{s.label}</span>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const StatusHealth = () => {
  const [tab, setTab] = useState("200");

  const responses: Record<string, string> = {
    "200": `"health"`,
    "500": `{ "error": "Internal Server Error" }`,
  };

  const tabColors: Record<string, { active: string; inactive: string }> = {
    "200": { active: "bg-green-500 text-white",  inactive: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800" },
    "500": { active: "bg-purple-500 text-white", inactive: "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800" },
  };

  return (
    <div className="flex gap-12 p-8 max-w-5xl">

      <div className="flex-1 min-w-0">

        {/* Header */}
        <SectionTitle>Developers Guide</SectionTitle>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
          Status & Health
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          A lightweight endpoint to verify that the ReachGRC Trust API is
          reachable and accepting requests. Use it to build uptime monitors,
          pre-flight checks, or integration health dashboards.
        </p>

        {/* Live indicator card */}
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <FiActivity size={14} />
            <span>Live API status</span>
          </div>
          <LiveStatusBadge />
        </div>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-0">
          Checked on page load from your browser.
        </p>

        <Divider />

        {/* Endpoint */}
        <div id="endpoint" className="mb-8 scroll-mt-6">
          <SectionTitle>Endpoint</SectionTitle>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              GET
            </span>
            <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
              /api/trust/public/health
            </code>
            <Badge variant="green">No auth required</Badge>
          </div>
          <CodeBlock>{`GET /api/trust/public/health`}</CodeBlock>
          <div className="mt-4">
            <Callout icon={<FiCheckCircle size={13} />} variant="green">
              This is the only endpoint that does <strong>not</strong> require
              an <InlineCode>x-api-key</InlineCode> header. It is publicly
              accessible and safe to call without credentials.
            </Callout>
          </div>
        </div>

        <Divider />

        {/* Authentication */}
        <div id="authentication" className="mb-8 scroll-mt-6">
          <SectionTitle>Authentication</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <div>Header</div>
              <div>Required</div>
              <div>Notes</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-3 text-sm">
              <span className="font-mono text-zinc-700 dark:text-zinc-300">x-api-key</span>
              <Badge variant="zinc">No</Badge>
              <span className="text-zinc-500 dark:text-zinc-400">
                Not needed for this endpoint
              </span>
            </div>
          </div>
        </div>

        <Divider />

        {/* Response */}
        <div id="response" className="mb-8 scroll-mt-6">
          <SectionTitle>Response</SectionTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
            A healthy API returns a plain string <InlineCode>"health"</InlineCode>{" "}
            with HTTP <InlineCode>200 OK</InlineCode>. No JSON wrapper — just
            the string.
          </p>

          <div className="flex gap-2 mb-3">
            {(["200", "500"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setTab(code)}
                className={`px-3 py-1.5 cursor-pointer rounded-md text-xs font-medium transition-all ${
                  tab === code
                    ? tabColors[code].active
                    : tabColors[code].inactive
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <CodeBlock>{responses[tab]}</CodeBlock>
        </div>

        <Divider />

        {/* What status means */}
        <div id="status-meanings" className="mb-8 scroll-mt-6">
          <SectionTitle>What status means</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              {
                icon:  <FiCheckCircle size={16} className="text-green-500" />,
                badge: <Badge variant="green">200 OK</Badge>,
                title: "API is up and healthy",
                desc:  "The server received your request and is operating normally. You can proceed with authenticated API calls.",
              },
              {
                icon:  <FiClock size={16} className="text-amber-400" />,
                badge: <Badge variant="amber">Timeout / No response</Badge>,
                title: "Network or connectivity issue",
                desc:  "The request did not receive a response within the expected time. This may indicate a network issue on your end or the server being temporarily unreachable.",
              },
              {
                icon:  <FiXCircle size={16} className="text-red-400" />,
                badge: <Badge variant="red">500</Badge>,
                title: "Server error",
                desc:  "The server is reachable but encountered an internal error. If this persists, contact your ReachGRC administrator.",
              },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 items-start p-4">
                <div className="mt-0.5 flex-shrink-0">{row.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{row.title}</p>
                    {row.badge}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* When to use this */}
        <div id="use-cases" className="mb-8 scroll-mt-6">
          <SectionTitle>When to use this</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon:  "📡",
                title: "Uptime monitoring",
                desc:  "Ping this endpoint every 1–5 minutes from an uptime monitor (e.g. UptimeRobot, Checkly) to get alerted when the API goes down.",
              },
              {
                icon:  "🚀",
                title: "Pre-flight checks",
                desc:  "Call this before your application starts making authenticated API calls to confirm the service is reachable.",
              },
              {
                icon:  "🔁",
                title: "Retry logic",
                desc:  "Use this endpoint in your retry/backoff logic to determine whether failures are due to service downtime or bad requests.",
              },
              {
                icon:  "🧪",
                title: "Integration testing",
                desc:  "Include a health check assertion in your CI/CD pipeline to catch connectivity issues before deploying dependent services.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{item.icon}</span>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.title}</p>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* curl example */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              Example — polling the health endpoint
            </p>
            <CodeBlock>{`# Simple one-off check
curl https://api.reachgrc.com/api/trust/public/health

# Expected response
"health"`}
            </CodeBlock>
          </div>
        </div>

        <Divider />

        {/* Error reference */}
        <div id="error-reference" className="scroll-mt-6">
          <SectionTitle>Error reference</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              {
                code:     "200",
                variant:  "green" as const,
                title:    "Healthy",
                response: `"health"`,
                action:   "API is fully operational. Proceed with your integration.",
              },
              {
                code:     "500",
                variant:  "purple" as const,
                title:    "Internal server error",
                response: `{ "error": "Internal Server Error" }`,
                action:   "Server encountered an unexpected error. Retry after a short delay. If persistent, contact your ReachGRC admin.",
              },
            ].map((item, i) => (
              <div key={i} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={item.variant}>{item.code}</Badge>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.title}</p>
                </div>
                <div className="font-mono text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 text-zinc-600 dark:text-white mb-2">
                  {item.response}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">Note: </span>
                  {item.action}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <OnPageNav />
    </div>
  );
};

export default StatusHealth;