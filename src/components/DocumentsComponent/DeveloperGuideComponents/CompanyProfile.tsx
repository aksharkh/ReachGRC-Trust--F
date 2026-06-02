import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCopy,
  FiCheck,
  FiKey,
  FiAlertTriangle,
} from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";

// ─── Shared sub-components ───────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
    {children}
  </p>
);

const Divider = () => (
  <hr className="border-none border-t border-zinc-100 dark:border-zinc-800 my-8" />
);

const Badge = ({
  children,
  variant,
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

const InlineCode = ({ children }: { children: string }) => (
  <code className="text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
    {children}
  </code>
);

const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 overflow-x-auto">
      <button
        onClick={copy}
        className="absolute cursor-pointer top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 transition-colors"
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

// ─── On-page anchor nav ───────────────────────────────────────────────────────

const sections = [
  { id: "endpoint",           label: "Endpoint" },
  { id: "authentication",     label: "Authentication" },
  { id: "request-headers",    label: "Request headers" },
  { id: "response-fields",    label: "Response fields" },
  { id: "field-descriptions", label: "Field descriptions" },
  { id: "example-response",   label: "Example response" },
  { id: "security-notes",     label: "Security notes" },
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
    <aside className="hidden xl:block w-52 flex-shrink-0 sticky top-6 self-start">
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

// ─── Response panel ───────────────────────────────────────────────────────────

const statusStyles = {
  active: {
    "200": "bg-green-500  text-white",
    "401": "bg-amber-500  text-white",
    "403": "bg-red-500    text-white",
    "500": "bg-purple-500 text-white",
  },
  inactive: {
    "200": "bg-green-50  text-green-700  border border-green-200  dark:bg-green-900/10  dark:text-green-400  dark:border-green-800",
    "401": "bg-amber-50  text-amber-700  border border-amber-200  dark:bg-amber-900/10  dark:text-amber-400  dark:border-amber-800",
    "403": "bg-red-50    text-red-700    border border-red-200    dark:bg-red-900/10    dark:text-red-400    dark:border-red-800",
    "500": "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800",
  },
};

const responses: Record<string, string> = {
  "200": `{
  "id": 1,
  "companyName": "ReachGRC",
  "statement": "Security and Compliance",
  "domains": [],
  "isActive": true,
  "createdAt": "2026-06-01T10:12:58.774Z",
  "updatedAt": "2026-06-01T10:12:58.774Z"
}`,
  "401": `{
  "error": "API key missing"
}`,
  "403": `{
  "error": "Api Key is InActive"
}`,
  "500": `{
  "error": "Internal Server Error"
}`,
};

const ResponsePanel = () => {
  const [tab, setTab] = useState("200");
  return (
    <div>
      {/* status tab pills */}
      <div className="flex gap-2 mb-5 ">
        {(["200", "401", "403", "500"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setTab(status)}
            className={`px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-all duration-200 ${
              tab === status
                ? statusStyles.active[status]
                : statusStyles.inactive[status]
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <CodeBlock>{responses[tab]}</CodeBlock>

      {tab === "403" && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <div className="flex gap-2 items-start">
            <FiAlertTriangle className="mt-0.5 flex-shrink-0" />
            <span>This response may also occur when the API key has expired.</span>
          </div>
        </div>
      )}

      {tab === "401" && (
        <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-sm text-amber-700 dark:text-amber-400">
          <div className="flex gap-2 items-start">
            <FiKey className="mt-0.5 flex-shrink-0" />
            <span>
              Ensure the <InlineCode>x-api-key</InlineCode> header is present on every request.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const CompanyProfile = () => {
  return (
    <div className="flex gap-12 p-8 max-w-5xl">

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">

        {/* Header */}
        <SectionTitle>Developers Guide</SectionTitle>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
          Company Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Retrieve the company profile associated with the API key used in the
          request. This endpoint returns your organisation's details, active
          domains, and compliance controls.
        </p>

        <Divider />

        {/* Endpoint */}
        <div id="endpoint" className="mb-8 scroll-mt-6">
          <SectionTitle>Endpoint</SectionTitle>
          <CodeBlock>{`GET /api/trust/public/me`}</CodeBlock>
        </div>

        <Divider />

        {/* Authentication */}
        <div id="authentication" className="mb-8 scroll-mt-6">
          <SectionTitle>Authentication</SectionTitle>
          <CodeBlock>{`x-api-key: your_company_api_key`}</CodeBlock>
          <div className="mt-4 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 text-sm text-blue-800 dark:text-blue-300">
            <div className="flex items-center gap-2 mb-1.5">
              <FiKey size={14} />
              <span className="font-medium">API Key Required</span>
            </div>
            <span className="text-zinc-500 dark:text-zinc-400">
              Don't have an API key? Visit{" "}
              <Link
                to="/docs/developers-guide/getting-started"
                className="underline font-medium text-[#ff831c]"
              >
                Getting Started
              </Link>
            </span>
          </div>
        </div>

        <Divider />

        {/* Request headers */}
        <div id="request-headers" className="mb-8 scroll-mt-6">
          <SectionTitle>Request headers</SectionTitle>
          <div className="border rounded-lg overflow-hidden border-zinc-200 dark:border-zinc-700">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
              <div>Header</div>
              <div>Required</div>
              <div>Description</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-3 text-sm">
              <div className="font-mono text-zinc-700 dark:text-zinc-300">x-api-key</div>
              <div><Badge variant="green">Yes</Badge></div>
              <div className="text-zinc-500 dark:text-zinc-400">Your company API key</div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Response fields */}
        <div id="response-fields" className="mb-8 scroll-mt-6">
          <SectionTitle>Response fields</SectionTitle>
          <div className="border rounded-lg border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
              <div>Field</div>
              <div>Type</div>
              <div>Description</div>
            </div>
            {[
              ["id",          "Long",     "Unique company identifier"],
              ["companyName", "String",   "Registered name of your organisation"],
              ["statement",   "String",   "Company compliance statement"],
              ["domains",     "Array",    "List of compliance domains"],
              ["isActive",    "Boolean",  "Whether the company account is active"],
              ["createdAt",   "DateTime", "ISO 8601 timestamp of account creation"],
              ["updatedAt",   "DateTime", "ISO 8601 timestamp of last update"],
            ].map(([name, type, desc]) => (
              <div
                key={name}
                className="grid grid-cols-3 px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 text-sm"
              >
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{name}</span>
                <span><Badge variant="zinc">{type}</Badge></span>
                <span className="text-zinc-500 dark:text-zinc-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Field descriptions */}
        <div id="field-descriptions" className="mb-8 scroll-mt-6">
          <SectionTitle>Field descriptions</SectionTitle>

          {/* Company object */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden mb-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Company object</span>
            </div>
            {[
              { field: "id",          type: "Long",     desc: "Auto-generated primary key. Use this to reference the company in related requests." },
              { field: "companyName", type: "String",   desc: "The legal or trading name of your organisation as registered in ReachGRC." },
              { field: "statement",   type: "String",   desc: "A short compliance or security statement associated with your company profile." },
              { field: "domains",     type: "Array",    desc: "An array of Domain objects representing the compliance domains your company is assessed against. May be empty." },
              { field: "isActive",    type: "Boolean",  desc: "true if the company account is currently active. Inactive accounts cannot authenticate." },
              { field: "createdAt",   type: "DateTime", desc: "The UTC timestamp when the company was first registered in the system." },
              { field: "updatedAt",   type: "DateTime", desc: "The UTC timestamp of the most recent update to the company record." },
            ].map((row, i) => (
              <div key={i} className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{row.field}</span>
                  <Badge variant="zinc">{row.type}</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>

          {/* Domain object */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden mb-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Domain object</span>
            </div>
            {[
              { field: "id",       type: "Long",   desc: "Unique identifier for the compliance domain." },
              { field: "name",     type: "String", desc: "Name of the compliance domain (e.g. Access Control, Data Protection)." },
              { field: "controls", type: "Array",  desc: "List of Control objects that belong to this domain." },
            ].map((row, i) => (
              <div key={i} className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{row.field}</span>
                  <Badge variant="zinc">{row.type}</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>

          {/* Control object */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Control object</span>
            </div>
            {[
              { field: "id",      type: "Long",    desc: "Unique identifier for the control." },
              { field: "name",    type: "String",  desc: "Name of the compliance control." },
              { field: "status",  type: "String",  desc: "Current implementation status of the control (e.g. Implemented, In Progress, Not Started)." },
              { field: "remarks", type: "String",  desc: "Additional notes or context about the control's current status." },
            ].map((row, i) => (
              <div key={i} className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{row.field}</span>
                  <Badge variant="zinc">{row.type}</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Example response */}
        <div id="example-response" className="mb-8 scroll-mt-6">
          <SectionTitle>Example response</SectionTitle>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
            Select a status code to see the corresponding response body.
          </p>
          <ResponsePanel />
        </div>

        <Divider />

        {/* Security notes */}
        <div id="security-notes" className="scroll-mt-6">
          <SectionTitle>Security notes</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              {
                icon: <MdOutlineSecurity size={15} />,
                title: "Keep your key server-side",
                desc:  "Never expose your API key in frontend applications, browser DevTools, or mobile app bundles. Store it as an environment variable on your backend server.",
              },
              {
                icon: <FiKey size={14} />,
                title: "One key per company",
                desc:  "Your API key is uniquely bound to your company account. Do not share it with other organisations or third-party services you do not control.",
              },
              {
                icon: <FiAlertTriangle size={14} />,
                title: "Rotate on suspected compromise",
                desc:  "If you suspect your key has been exposed, contact your ReachGRC admin immediately. They can deactivate the current key and issue a new one.",
              },
            ].map((row, i) => (
              <div key={i} className="flex gap-3 items-start p-4">
                <span className="text-[#ff831c] mt-0.5 flex-shrink-0">{row.icon}</span>
                <div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-0.5">{row.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Right anchor nav ── */}
      <OnPageNav />

    </div>
  );
};

export default CompanyProfile;