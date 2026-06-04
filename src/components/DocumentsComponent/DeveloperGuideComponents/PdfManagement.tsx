import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCopy, FiCheck, FiKey, FiAlertTriangle, FiFile,
  FiTrash2, FiUpload, FiEdit, FiList,
} from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";

import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
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
  variant: "green" | "amber" | "red" | "zinc" | "purple" | "blue" | "orange";
}) => {
  const styles = {
    green:  "bg-green-50  text-green-700  dark:bg-green-900/20  dark:text-green-400",
    amber:  "bg-amber-50  text-amber-700  dark:bg-amber-900/20  dark:text-amber-400",
    red:    "bg-red-50    text-red-700    dark:bg-red-900/20    dark:text-red-400",
    zinc:   "bg-zinc-100  text-zinc-600   dark:bg-zinc-800      dark:text-zinc-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    blue:   "bg-blue-50   text-blue-700   dark:bg-blue-900/20   dark:text-blue-400",
    orange: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const MethodBadge = ({ method }: { method: "GET" | "POST" | "PUT" | "DELETE" }) => {
  const styles = {
    GET:    "bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-400",
    POST:   "bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-400",
    PUT:    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    DELETE: "bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-400",
  };
  return (
    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${styles[method]}`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ children, raw }: { children: React.ReactNode; raw?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(raw ?? (typeof children === "string" ? children : "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 overflow-x-auto">
      <button
        onClick={copy}
        className="absolute top-3 cursor-pointer right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 transition-colors"
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
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>{children}</div>
    </div>
  );
};

// ─── Endpoint definitions ─────────────────────────────────────────────────────

const endpoints = [
  {
    id:          "get-all-pdfs",
    method:      "GET"    as const,
    path:        "/api/trust/public/pdf/all",
    summary:     "List all PDFs",
    icon:        <FiList size={14} />,
    description: "Returns all PDF documents uploaded for your company.",
    params:      [],
    bodyNote:    null,
    responses: {
      "200": `[
  {
    "id": 1,
    "fileName": "compliance-report.pdf",
    "fileType": "application/pdf",
    "fileSize": 102400,
    "uploadedAt": "2026-06-01T10:12:58.774Z"
  }
]`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "upload-pdf",
    method:      "POST"   as const,
    path:        "/api/trust/public/pdf/new",
    summary:     "Upload a PDF",
    icon:        <FiUpload size={14} />,
    description: "Uploads a new PDF document for your company. Send the file as multipart/form-data. Only PDF files are accepted.",
    params:      [],
    bodyNote:    "multipart/form-data — field name: file",
    responses: {
      "201": `{
  "id": 2,
  "fileName": "new-document.pdf",
  "fileType": "application/pdf",
  "fileSize": 81920,
  "uploadedAt": "2026-06-01T11:00:00.000Z"
}`,
      "400": `{ "error": "Invalid file type. Only PDF files are accepted." }`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "update-pdf",
    method:      "PUT"    as const,
    path:        "/api/trust/public/pdf/{pdfId}",
    summary:     "Update a PDF",
    icon:        <FiEdit size={14} />,
    description: "Replaces an existing PDF document with a new file. The PDF ID must belong to your company.",
    params:      [{ name: "pdfId", type: "Long", required: true, desc: "The ID of the PDF to replace." }],
    bodyNote:    "multipart/form-data — field name: file",
    responses: {
      "200": `{
  "id": 1,
  "fileName": "updated-report.pdf",
  "fileType": "application/pdf",
  "fileSize": 95000,
  "uploadedAt": "2026-06-01T12:00:00.000Z"
}`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "404": `{ "error": "PDF not found" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "delete-pdf",
    method:      "DELETE" as const,
    path:        "/api/trust/public/pdf/{pdfId}",
    summary:     "Delete a PDF",
    icon:        <FiTrash2 size={14} />,
    description: "Permanently deletes a single PDF by ID. This action cannot be undone.",
    params:      [{ name: "pdfId", type: "Long", required: true, desc: "The ID of the PDF to delete." }],
    bodyNote:    null,
    responses: {
      "200": `"Deleted PDF ID: 1 from company ID: 1"`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "404": `{ "error": "PDF not found" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "delete-all-pdfs",
    method:      "DELETE" as const,
    path:        "/api/trust/public/pdf/all",
    summary:     "Delete all PDFs",
    icon:        <FiTrash2 size={14} />,
    description: "Permanently deletes every PDF document belonging to your company. This action cannot be undone.",
    params:      [],
    bodyNote:    null,
    responses: {
      "200": `"Deleted all PDFs from company ID: 1"`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
];

// ─── On-page nav ──────────────────────────────────────────────────────────────

const navSections = [
  { id: "endpoints-overview", label: "Endpoints" },
  ...endpoints.map((e) => ({ id: e.id, label: e.summary })),
  { id: "security-notes",     label: "Security notes" },
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
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-3">
          Was this page helpful?
        </p>
      
        <div className="flex gap-2 mb-4">
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer"
          >
            <FiThumbsUp size={12} />
            Yes
          </button>
      
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:text-zinc-300 dark:border-zinc-700 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer"
          >
            <FiThumbsDown size={12} />
            No
          </button>
        </div>
      
        <Link
          to="/docs/contact-us"
          className="flex items-center gap-2 text-sm text-[#ff831c] hover:underline"
        >
          <RiCustomerService2Line size={16} />
          Still need help? Contact us
        </Link>
      </div>
    </aside>
  );
};

// ─── Per-endpoint section ─────────────────────────────────────────────────────

const EndpointSection = ({ ep }: { ep: typeof endpoints[0] }) => {
  const statusCodes = Object.keys(ep.responses);
  const [tab, setTab] = useState(statusCodes[0]);

  const tabColors: Record<string, { active: string; inactive: string }> = {
    "200": { active: "bg-green-500 text-white",  inactive: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800" },
    "201": { active: "bg-green-500 text-white",  inactive: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800" },
    "400": { active: "bg-amber-500 text-white",  inactive: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800" },
    "401": { active: "bg-amber-500 text-white",  inactive: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800" },
    "403": { active: "bg-red-500 text-white",    inactive: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800" },
    "404": { active: "bg-red-500 text-white",    inactive: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800" },
    "500": { active: "bg-purple-500 text-white", inactive: "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800" },
  };

  return (
    <div id={ep.id} className="scroll-mt-6 mb-8">
      <div className="flex items-center gap-3 mb-3">
        <MethodBadge method={ep.method} />
        <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{ep.path}</code>
      </div>

      <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">{ep.summary}</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{ep.description}</p>

      {ep.params.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Path parameters
          </p>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
              <div>Parameter</div><div>Type</div><div>Description</div>
            </div>
            {ep.params.map((p) => (
              <div key={p.name} className="grid grid-cols-3 px-4 py-3 text-sm border-t border-zinc-100 dark:border-zinc-800">
                <span className="font-mono text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  {p.name}
                  {p.required && <Badge variant="red">required</Badge>}
                </span>
                <Badge variant="zinc">{p.type}</Badge>
                <span className="text-zinc-500 dark:text-zinc-400">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ep.bodyNote && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Request body
          </p>
          <CodeBlock>{ep.bodyNote}</CodeBlock>
        </div>
      )}

      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
        Response
      </p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {statusCodes.map((code) => (
          <button
            key={code}
            onClick={() => setTab(code)}
            className={`px-3 py-1.5 rounded-md cursor-pointer text-xs font-medium transition-all ${
              tab === code
                ? (tabColors[code]?.active ?? "bg-zinc-700 text-white")
                : (tabColors[code]?.inactive ?? "bg-zinc-100 text-zinc-600 border border-zinc-200")
            }`}
          >
            {code}
          </button>
        ))}
      </div>
      <CodeBlock>{ep.responses[tab as keyof typeof ep.responses]}</CodeBlock>

      {ep.method === "DELETE" && (
        <div className="mt-3">
          <Callout icon={<FiAlertTriangle size={13} />} variant="red">
            <strong>Irreversible.</strong> Deleted PDFs cannot be recovered. Confirm before calling this endpoint in production.
          </Callout>
        </div>
      )}
    </div>
  );
};


const PdfManagement = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-12 p-8 max-w-5xl">

      <div className="flex-1 min-w-0">

        <SectionTitle>Developers Guide</SectionTitle>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
          PDF Management
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Upload, retrieve, update, and delete your company's PDF documents.
          All endpoints are scoped to your company — you can only access
          documents that belong to your account.
        </p>

        <Divider />

        {/* Endpoints overview */}
        <div id="endpoints-overview" className="mb-8 scroll-mt-6">
          <SectionTitle>Endpoints</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto] bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
              <div className="w-16">Method</div>
              <div>Path</div>
              <div>Summary</div>
            </div>
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => scrollTo(ep.id)}
                className="w-full grid grid-cols-[auto_1fr_auto] px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-left group"
              >
                <div className="w-16 flex items-center">
                  <MethodBadge method={ep.method} />
                </div>
                <div className="font-mono text-zinc-700 dark:text-zinc-300 group-hover:text-[#ff831c] transition-colors">
                  {ep.path}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs self-center pl-4">
                  {ep.summary}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <Callout icon={<FiKey size={13} />} variant="blue">
              All endpoints require the <InlineCode>x-api-key</InlineCode> header.
              Visit <Link to="/docs/developers-guide/get-started" className="underline font-medium text-[#ff831c]">Getting Started</Link> if you don't have a key yet.
            </Callout>
          </div>
        </div>

        <Divider />

        {endpoints.map((ep, i) => (
          <React.Fragment key={ep.id}>
            <EndpointSection ep={ep} />
            {i < endpoints.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <Divider />

        {/* Security notes */}
        <div id="security-notes" className="scroll-mt-6">
          <SectionTitle>Security notes</SectionTitle>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              {
                icon:  <MdOutlineSecurity size={15} />,
                title: "Scoped to your company",
                desc:  "You can only read, update, or delete PDFs that belong to your own company account. Attempting to access another company's PDF ID will return 404.",
              },
              {
                icon:  <FiAlertTriangle size={14} />,
                title: "Deletions are permanent",
                desc:  "There is no recycle bin or soft delete for PDFs. Once deleted, the file cannot be recovered. Maintain your own backups if documents are business-critical.",
              },
              {
                icon:  <FiFile size={14} />,
                title: "PDF files only",
                desc:  "Upload and update endpoints only accept files with application/pdf MIME type. Submitting other file types will return a 400 Bad Request.",
              },
              {
                icon:  <FiKey size={14} />,
                title: "Keep your API key server-side",
                desc:  "Never embed your API key in frontend code or mobile bundles. All PDF management calls should originate from your backend server.",
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

      <OnPageNav />
    </div>
  );
};

export default PdfManagement;