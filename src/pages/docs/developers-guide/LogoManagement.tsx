import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  FiKey, FiAlertTriangle, FiImage,
  FiTrash2, FiUpload, FiEdit, FiList,
} from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import {
  SectionTitle,
  Divider,
  InlineCode,
  Badge,
  MethodBadge,
  CodeBlock,
  Callout,
  OnPageNav,
} from "@/components/docs/ReusableComponents";

// ─── Endpoint definitions ─────────────────────────────────────────────────────

const endpoints = [
  {
    id:          "get-all-logos",
    method:      "GET"    as const,
    path:        "/api/trust/public/image/all",
    summary:     "List all logos",
    icon:        <FiList size={14} />,
    description: "Returns all logos uploaded for your company.",
    params:      [],
    bodyNote:    null,
    responses: {
      "200": `[
  {
    "id": 1,
    "fileName": "company-logo.png",
    "fileType": "image/png",
    "fileSize": 24576,
    "uploadedAt": "2026-06-01T10:12:58.774Z"
  }
]`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "get-logo-by-id",
    method:      "GET"    as const,
    path:        "/api/trust/public/image/{logoId}",
    summary:     "Get logo by ID",
    icon:        <FiImage size={14} />,
    description: "Returns a single logo by its ID. Only accessible if the logo belongs to your company.",
    params:      [{ name: "logoId", type: "Long", required: true, desc: "The ID of the logo to retrieve." }],
    bodyNote:    null,
    responses: {
      "200": `{
  "id": 1,
  "fileName": "company-logo.png",
  "fileType": "image/png",
  "fileSize": 24576,
  "uploadedAt": "2026-06-01T10:12:58.774Z"
}`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "404": `{ "error": "Logo not found" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "upload-logo",
    method:      "POST"   as const,
    path:        "/api/trust/public/image/new",
    summary:     "Upload a logo",
    icon:        <FiUpload size={14} />,
    description: "Uploads a new logo for your company. Send the file as multipart/form-data.",
    params:      [],
    bodyNote:    "multipart/form-data — field name: file",
    responses: {
      "201": `{
  "id": 2,
  "fileName": "new-logo.png",
  "fileType": "image/png",
  "fileSize": 18432,
  "uploadedAt": "2026-06-01T11:00:00.000Z"
}`,
      "400": `{ "error": "Invalid file type" }`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "update-logo",
    method:      "PUT"    as const,
    path:        "/api/trust/public/image/{logoId}",
    summary:     "Update a logo",
    icon:        <FiEdit size={14} />,
    description: "Replaces an existing logo with a new file. The logo ID must belong to your company.",
    params:      [{ name: "logoId", type: "Long", required: true, desc: "The ID of the logo to replace." }],
    bodyNote:    "multipart/form-data — field name: file",
    responses: {
      "200": `{
  "id": 1,
  "fileName": "updated-logo.png",
  "fileType": "image/png",
  "fileSize": 20480,
  "uploadedAt": "2026-06-01T12:00:00.000Z"
}`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "404": `{ "error": "Logo not found" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "delete-logo",
    method:      "DELETE" as const,
    path:        "/api/trust/public/image/{logoId}",
    summary:     "Delete a logo",
    icon:        <FiTrash2 size={14} />,
    description: "Permanently deletes a single logo by ID. This action cannot be undone.",
    params:      [{ name: "logoId", type: "Long", required: true, desc: "The ID of the logo to delete." }],
    bodyNote:    null,
    responses: {
      "200": `"Deleted logo ID: 1 from company ID: 1"`,
      "401": `{ "error": "API key missing" }`,
      "403": `{ "error": "Api Key is InActive" }`,
      "404": `{ "error": "Logo not found" }`,
      "500": `{ "error": "Internal Server Error" }`,
    },
  },
  {
    id:          "delete-all-logos",
    method:      "DELETE" as const,
    path:        "/api/trust/public/image/all",
    summary:     "Delete all logos",
    icon:        <FiTrash2 size={14} />,
    description: "Permanently deletes every logo belonging to your company. This action cannot be undone.",
    params:      [],
    bodyNote:    null,
    responses: {
      "200": `"Deleted all logos from company ID: 1"`,
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



// ─── Per-endpoint section ─────────────────────────────────────────────────────

const EndpointSection = ({ ep }: { ep: typeof endpoints[0] }) => {
  const statusCodes = Object.keys(ep.responses) as string[];
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
      {/* heading row */}
      <div className="flex items-center gap-3 mb-3">
        <MethodBadge method={ep.method} />
        <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{ep.path}</code>
      </div>

      <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">{ep.summary}</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{ep.description}</p>

      {/* path params */}
      {ep.params.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Path parameters
          </p>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
              <div>Parameter</div>
              <div>Type</div>
              <div>Description</div>
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

      {/* request body note */}
      {ep.bodyNote && (
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Request body
          </p>
          <CodeBlock>{ep.bodyNote}</CodeBlock>
        </div>
      )}

      {/* response tabs */}
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
        Response
      </p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {statusCodes.map((code) => (
          <button
            key={code}
            onClick={() => setTab(code)}
            className={`px-3 py-1.5 rounded-md text-xs cursor-pointer font-medium transition-all ${
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

      {/* delete danger note */}
      {ep.method === "DELETE" && (
        <div className="mt-3">
          <Callout icon={<FiAlertTriangle size={13} />} variant="red">
            <strong>Irreversible.</strong> Deleted logos cannot be recovered. Confirm before calling this endpoint in production.
          </Callout>
        </div>
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const LogoManagement = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-12 p-8 max-w-5xl">

      <div className="flex-1 min-w-0">

        {/* Header */}
        <SectionTitle>Developers Guide</SectionTitle>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
          Logo Management
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Upload, retrieve, update, and delete your company's logo assets.
          All endpoints are scoped to your company — you can only access
          logos that belong to your account.
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

        {/* Individual endpoint sections */}
        {endpoints.map((ep, i) => (
          <Fragment key={ep.id}>
            <EndpointSection ep={ep} />
            {i < endpoints.length - 1 && <Divider />}
          </Fragment>
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
                desc:  "You can only read, update, or delete logos that belong to your own company account. Attempting to access another company's logo ID will return 404.",
              },
              {
                icon:  <FiAlertTriangle size={14} />,
                title: "Deletions are permanent",
                desc:  "There is no recycle bin or soft delete for logos. Once deleted, the file cannot be recovered. Consider maintaining your own backup if assets are business-critical.",
              },
              {
                icon:  <FiKey size={14} />,
                title: "Keep your API key server-side",
                desc:  "Never embed your API key in frontend code or mobile bundles. All logo management calls should originate from your backend server.",
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

      <OnPageNav sections={navSections} />
    </div>
  );
};

export default LogoManagement;