import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCopy,
  FiCheck,
  FiKey,
  FiAlertTriangle,
} from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";

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
  variant: "green" | "amber" | "red" | "zinc";
}) => {
  const styles = {
    green: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    red: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    zinc: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-xs flex items-center gap-1"
      >
        {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>

<pre className="overflow-x-auto text-sm text-zinc-800 dark:text-zinc-200">
  <code>{children}</code>
</pre>
    </div>
  );
};

const CompanyProfile = () => {
  const [tab, setTab] = useState("200");

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

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="w-[65%] p-8">
        <SectionTitle>Developers Guide</SectionTitle>

        <h1 className="text-3xl font-semibold mb-3 text-zinc-900 dark:text-white">
          Company Profile
        </h1>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Retrieve the company profile associated with the API key used in the request.
        </p>

        <Divider />

        <SectionTitle>Endpoint</SectionTitle>
        <CodeBlock>{`GET /api/trust/me`}</CodeBlock>

        <Divider />

        <SectionTitle>Authentication</SectionTitle>

        <CodeBlock>{`x-api-key: your_company_api_key`}</CodeBlock>

        <div className="mt-4 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <FiKey />
            <span className="font-medium">API Key Required</span>
          </div>

          Don't have an API key? Visit{" "}
          <Link
            to="/docs/developers-guide/get-started"
            className="underline font-medium"
          >
            Getting Started
          </Link>
        </div>

        <Divider />

        <SectionTitle>Request Headers</SectionTitle>

        <div className="border rounded-lg overflow-hidden border-zinc-200 dark:border-zinc-700">
          <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900 p-3 font-medium">
            <div>Header</div>
            <div>Required</div>
            <div>Description</div>
          </div>

          <div className="grid grid-cols-3 p-3 border-t border-zinc-200 dark:border-zinc-700">
            <div className="font-mono">x-api-key</div>
            <div><Badge variant="green">Yes</Badge></div>
            <div>Company API key</div>
          </div>
        </div>

        <Divider />

        <SectionTitle>Response Fields</SectionTitle>

        <div className="border rounded-lg border-zinc-200 dark:border-zinc-700">
          {[
            ["id", "Long"],
            ["companyName", "String"],
            ["statement", "String"],
            ["domains", "Array"],
            ["isActive", "Boolean"],
            ["createdAt", "DateTime"],
            ["updatedAt", "DateTime"],
          ].map(([name, type]) => (
            <div
              key={name}
              className="flex justify-between p-4 border-b last:border-b-0 border-zinc-200 dark:border-zinc-700"
            >
              <span className="font-mono">{name}</span>
              <Badge variant="zinc">{type}</Badge>
            </div>
          ))}
        </div>

        <Divider />

        <Divider />

<SectionTitle>Field Descriptions</SectionTitle>


<div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 mb-6">
  <h3 className="font-semibold text-lg mb-4">
    Company Object
  </h3>

  <div className="space-y-4">
    ...
  </div>
</div>

<div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 mb-6">
  <h3 className="font-semibold text-lg mb-4">
    Domain Object
  </h3>

  <div className="space-y-4">
    ...
  </div>
</div>

{/* Control Object */}
<div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5">
  <h3 className="font-semibold text-lg mb-4">
    Control Object
  </h3>

  <div className="space-y-4">
    ...
  </div>
</div>

<Divider />


        <SectionTitle>Security Notes</SectionTitle>

        <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
          <div className="flex gap-2 items-start">
            <MdOutlineSecurity className="mt-0.5" />
            <p className="text-sm">
              Never expose your API key in frontend applications. Store it
              securely on your backend server.
            </p>
          </div>
        </div>
      </div>

<div className="w-[35%] border-l border-zinc-200 dark:border-zinc-800 sticky top-0 h-screen overflow-y-auto p-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-4">
          Responses
        </p>

        <div className="flex gap-2 mb-5">
  {["200", "401", "403", "500"].map((status) => {
    const activeStyles = {
      "200": "bg-green-500 text-white shadow-sm",
      "401": "bg-amber-500 text-white shadow-sm",
      "403": "bg-red-500 text-white shadow-sm",
      "500": "bg-purple-500 text-white shadow-sm",
    };

    const inactiveStyles = {
      "200":
        "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800",
      "401":
        "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800",
      "403":
        "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800",
      "500":
        "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800",
    };

    return (
      <button
        key={status}
        onClick={() => setTab(status)}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          tab === status
            ? activeStyles[status as keyof typeof activeStyles]
            : inactiveStyles[status as keyof typeof inactiveStyles]
        }`}
      >
        {status}
      </button>
    );
  })}
</div>

        <CodeBlock>{responses[tab]}</CodeBlock>

        {tab === "403" && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-sm">
            <div className="flex gap-2">
              <FiAlertTriangle />
              <span>
                This response may also occur when the API key has expired.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
