import {
  FiShield,
  FiKey,
  FiRefreshCw,
  FiToggleRight,
  FiLock,
  FiClock,
  FiImage,
  FiFile,
  FiActivity,
} from "react-icons/fi";
import {
  SectionTitle,
  Divider,
  InlineCode,
  Badge,
  CodeBlock,
  OnPageNav,
} from "@/components/docs/ReusableComponents";

const sections = [
  { id: "receive-key", label: "How you receive your API key" },
  { id: "using-key", label: "Using your API key" },
  { id: "validity-expiry", label: "API key validity & expiry" },
  { id: "access", label: "What your API key gives you access to" },
  { id: "errors", label: "Common error responses" },
];

const GettingStarted = () => {
  return (
     <div className="flex gap-12 p-8 max-w-5xl">
        <div className="flex-1 min-w-0">
      {/* ── Header ── */}
      <SectionTitle>Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
        Getting started
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Everything you need to start integrating with the ReachGRC Trust API —
        from receiving your API key to making your first authenticated request.
      </p>

      <Divider />

      {/* ── How you receive your key ── */}
      <div id="receive-key" className="mb-8 scroll-mt-6">
        <SectionTitle>How you receive your API key</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
          You do not sign up for an API key directly. ReachGRC Trust uses an
          admin-provisioned model — your key is created and issued to you by
          your ReachGRC administrator.
        </p>

        <div className="relative pl-8 ">
          {/* vertical line */}
          <div className="absolute left-2 top-2 bottom-2 mb-5 w-0.5 bg-zinc-200 dark:bg-zinc-700" />

          {[
            {
              step: "1",
              label: "Your account is created by a ReachGRC admin",
              desc: "When your organisation is onboarded, a ReachGRC administrator registers your company on the platform. No action is required from you at this stage.",
              active: true,
            },
            {
              step: "2",
              label: "An API key is automatically generated",
              desc: "The moment your company profile is created, a unique API key is generated and bound exclusively to your account.",
              active: true,
            },
            
            {
              step: "3",
              label: "Your admin shares the key with you",
              desc: "Your designated ReachGRC admin delivers the key to you through a secure channel. Treat it like a password — never expose it in client-side code or public repositories.",
              active: true,
            },
            {
              step: "✓",
              label: "You're ready to make API calls",
              desc: "Include the key in every request using the x-api-key header as shown in the next section.",
              active: true,
            },
          ].map((item, i) => (
            <div key={i} className="relative  mb-6 last:mb-0">
              <div
                className={`absolute -left-8 top-0.5 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px]  border-2 border-white dark:border-zinc-950 dark:font-bold ${
                  item.active
                    ? "bg-[#ff831c] text-white"
                    : "bg-zinc-300 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-300"
                }
                ${
                  item.step == "✓"? "bg-green-500 text-white":""
                }
                `}
              >
                {item.step}
              </div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                {item.label}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Using your API key ── */}
      <div id="using-key" className="mb-8 scroll-mt-6">
        <SectionTitle>Using your API key</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Every request to a <InlineCode>/api/trust/public/**</InlineCode>{" "}
          endpoint must include your API key as a request header. There is no
          session, cookie, or login flow — the key is your identity on every
          call.
        </p>

        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
          Required header
        </p>
        <CodeBlock>{`x-api-key: your_api_key_here`}</CodeBlock>

        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-5 mb-2">
          Example — fetch your company profile
        </p>
        <CodeBlock>{`curl https://api.reachgrc.com/api/trust/public/me \\
  -H "x-api-key: your_api_key_here"`}</CodeBlock>

        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-5 mb-2">
          Example — upload a logo
        </p>
        <CodeBlock>{`curl -X POST https://api.reachgrc.com/api/trust/public/image/new \\
  -H "x-api-key: your_api_key_here" \\
  -F "file=@/path/to/logo.png"`}</CodeBlock>

        <div className="mt-4 flex gap-2.5 items-start bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3.5">
          <FiShield size={15} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            Never include your API key in frontend JavaScript, browser URLs, or
            public source code. Always make API calls from your backend server.
          </p>
        </div>
      </div>

      <Divider />

      {/* ── Validity & Expiry ── */}
      <div id="validity-expiry" className="mb-8 scroll-mt-6">
        <SectionTitle>API key validity & expiry</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Your API key is not permanent. It has a defined lifespan and can also
          be deactivated by your admin at any time.
        </p>

        {/* Lifespan card */}
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Key lifespan
            </span>
            <Badge variant="green">
              <FiClock size={11} />
              Valid for 1 year
            </Badge>
          </div>
          <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-[#ff831c]"
              style={{ width: "72%" }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>Issued</span>
            <span>~72% remaining (example)</span>
            <span>Expires</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: <FiClock size={15} />,
              title: "Expires after 1 year",
              desc: (
                <>
                  Your key is valid for exactly 365 days from the date it was
                  issued. After expiry, every request will return a{" "}
                  <InlineCode>403 Forbidden</InlineCode> response until a new
                  key is issued by your admin.
                </>
              ),
            },
            {
              icon: <FiRefreshCw size={15} />,
              title: "Renewal is handled by your admin",
              desc: "Keys are not auto-renewed. Contact your ReachGRC administrator before your key expires to avoid any disruption to your integration.",
            },
            {
              icon: <FiToggleRight size={15} />,
              title: "Keys can be deactivated at any time",
              desc: (
                <>
                  An admin can disable your key independently of expiry — for
                  example, during a security review. A deactivated key also
                  returns <InlineCode>403 Forbidden</InlineCode>.
                </>
              ),
            },
            {
              icon: <FiLock size={15} />,
              title: "One active key per company",
              desc: "Each company has exactly one API key at a time. If a key is regenerated, the previous one is immediately invalidated.",
            },
          ].map((row, i) => (
            <div key={i} className="flex gap-3 items-start p-4">
              <span className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0">
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
      </div>

      <Divider />

      {/* ── What the key unlocks ── */}
      <div id="access" className="mb-8 scroll-mt-6">
        <SectionTitle>What your API key gives you access to</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Your key scopes access to your company's resources only. You cannot
          read or modify another company's data. All endpoints live under{" "}
          <InlineCode>/api/trust/public/</InlineCode>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: <FiKey size={17} />,
              label: "Company profile",
              desc: "Read your own company details, statement, and domain information.",
              path: "GET /public/me",
            },
            {
              icon: <FiImage size={17} />,
              label: "Logo management",
              desc: "Upload, update, retrieve, and delete your brand logo assets.",
              path: "GET · POST · PUT · DELETE /public/image/**",
            },
            {
              icon: <FiFile size={17} />,
              label: "PDF documents",
              desc: "Upload, update, retrieve, and delete your company documents.",
              path: "GET · POST · PUT · DELETE /public/pdf/**",
            },
            {
              icon: <FiActivity size={17} />,
              label: "Health check",
              desc: "Verify that the ReachGRC Trust API is reachable and operational.",
              path: "GET /public/health",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {item.label}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">
                {item.desc}
              </p>
              <InlineCode>{item.path}</InlineCode>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Error responses ── */}
      <div id="errors" className="scroll-mt-6">
        <SectionTitle>Common error responses</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          All authentication errors return JSON with an{" "}
          <InlineCode>error</InlineCode> field describing the reason.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              code: "401",
              variant: "amber" as const,
              title: "Missing API key",
              desc: (
                <>
                  The <InlineCode>x-api-key</InlineCode> header was not
                  included in the request.
                </>
              ),
              response: `{ "error": "API key missing" }`,
            },
            {
              code: "403",
              variant: "red" as const,
              title: "Expired key",
              desc: "Your API key has passed its 1-year validity period.",
              response: `{ "error": "Api Key is Expired" }`,
            },
            {
              code: "403",
              variant: "red" as const,
              title: "Deactivated key",
              desc: "Your API key has been disabled by your ReachGRC admin.",
              response: `{ "error": "Api Key is InActive" }`,
            },
            {
              code: "401",
              variant: "amber" as const,
              title: "Key not found",
              desc: "The provided key does not match any registered company.",
              response: `{ "error": "Api key not found" }`,
            },
            {
              code: "200",
              variant: "green" as const,
              title: "Success",
              desc: "Your key is valid and the request was processed successfully.",
              response: null,
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <Badge variant={item.variant}>{item.code}</Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-0.5">
                  {item.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
                {item.response && (
                  <div className="mt-2 font-mono text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 text-zinc-600 dark:text-zinc-400">
                    {item.response}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
          <OnPageNav sections={sections} />
    </div>
  );
};

export default GettingStarted