// pages/non-developers-guide/HostedTrustCenter.tsx
import {
  SectionTitle, Divider, OnPageNav, Callout, StepList,
  InlineCode, InfoRowList, FeatureGrid, Badge,
} from "@/components/docs/ReusableComponents";
import {
  FiGlobe, FiFileText, FiImage, FiLink, FiLock,
  FiEye, FiRefreshCw, FiUploadCloud, FiShield,
} from "react-icons/fi";
import { RiInformationLine } from "react-icons/ri";

const sections = [
  { id: "what-is-htc",   label: "What is the Hosted Trust Center?" },
  { id: "setup",         label: "Setting it up" },
  { id: "what-includes", label: "What it includes" },
  { id: "url-sharing",   label: "Your Trust Center URL" },
  { id: "managing",      label: "Managing content" },
  { id: "visibility",    label: "Visibility settings" },
];

const HostedTrustCenter = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
        Hosted Trust Center
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Your Hosted Trust Center is a full public webpage — managed entirely by ReachGRC —
        where customers and partners can review your security and compliance posture at any time.
      </p>

      <Divider />

      {/* What is it */}
      <div id="what-is-htc" className="mb-8 scroll-mt-6">
        <SectionTitle>What is the Hosted Trust Center?</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          The Hosted Trust Center is a dedicated web page at a ReachGRC subdomain that presents
          your organisation's complete compliance profile — certifications, documents, security
          statement, and contact details — in a clean, professional layout.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Unlike a static PDF or a shared folder, it updates in real time whenever you change
          anything in your dashboard. Visitors always see your latest status without you having
          to re-share any link.
        </p>
        <Callout icon={<FiGlobe size={15} />} variant="tip">
          Your Trust Center URL looks like:{" "}
          <InlineCode>https://trust.reachgrc.com/your-company</InlineCode>. Share it in
          proposals, email signatures, and on your website.
        </Callout>
      </div>

      <Divider />

      {/* Setup */}
      <div id="setup" className="mb-8 scroll-mt-6">
        <SectionTitle>Setting it up</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Your Trust Center is created automatically when your ReachGRC account is activated.
          Follow these steps to populate it with your content.
        </p>
        <StepList
          steps={[
            {
              step: "1",
              label: "Complete your company profile",
              desc: "Go to Dashboard → Company Profile. Fill in your company name, website, industry, and a short security statement.",
            },
            {
              step: "2",
              label: "Upload your logo",
              desc: "Go to Dashboard → Custom Branding → Logo. Upload a PNG or SVG. This logo appears at the top of your Trust Center.",
            },
            {
              step: "3",
              label: "Upload compliance documents",
              desc: "Go to Dashboard → Documents. Upload your SOC 2 report, ISO certificate, penetration test summary, or any other document you want to share publicly.",
            },
            {
              step: "4",
              label: "Preview your Trust Center",
              desc: 'Click "Preview" in the dashboard to see exactly what visitors will see before you share the link.',
            },
            {
              step: "5",
              label: "Set visibility and share",
              desc: "Choose a visibility setting (Public, Link-only, or NDA-gated) and share your Trust Center URL with customers.",
              done: true,
            },
          ]}
        />
      </div>

      <Divider />

      {/* What it includes */}
      <div id="what-includes" className="mb-8 scroll-mt-6">
        <SectionTitle>What it includes</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Your Hosted Trust Center automatically assembles the following sections from your
          dashboard content.
        </p>
        <FeatureGrid
          cards={[
            {
              icon: <FiShield size={17} />,
              label: "Security overview",
              desc: "Your company's security statement and a high-level summary of your compliance posture.",
            },
            {
              icon: <FiFileText size={17} />,
              label: "Documents & certificates",
              desc: "All PDF documents you have uploaded — SOC 2, ISO 27001, pen test reports, and more.",
            },
            {
              icon: <FiImage size={17} />,
              label: "Brand & logo",
              desc: "Your company logo appears at the top of the page for a professional, branded experience.",
            },
            {
              icon: <FiLink size={17} />,
              label: "Contact & request access",
              desc: "A built-in 'Request access' button lets visitors ask for restricted documents via NDA flow.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* URL sharing */}
      <div id="url-sharing" className="mb-8 scroll-mt-6">
        <SectionTitle>Your Trust Center URL</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Every company gets a permanent, shareable URL. The slug is derived from your company
          name and can only be changed by contacting support.
        </p>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">Your Trust Center URL</p>
            <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
              https://trust.reachgrc.com/<span className="text-[#ff831c]">your-company</span>
            </p>
          </div>
          <Badge variant="green">
            <FiGlobe size={11} /> Live
          </Badge>
        </div>
        <Callout icon={<RiInformationLine size={15} />} variant="note">
          The URL is permanent once set. Include it in your email signature, security
          questionnaires, and proposal documents so customers can always self-serve.
        </Callout>
      </div>

      <Divider />

      {/* Managing content */}
      <div id="managing" className="mb-8 scroll-mt-6">
        <SectionTitle>Managing content</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Every change you make in the dashboard is reflected on your Trust Center within
          seconds. There is no publish button — it is always live.
        </p>
        <InfoRowList
          rows={[
            {
              icon: <FiUploadCloud size={15} />,
              title: "Adding documents",
              desc: "Upload PDFs from Dashboard → Documents. Supported: SOC 2, ISO certificates, pen test summaries, privacy policies, and custom documents.",
            },
            {
              icon: <FiRefreshCw size={15} />,
              title: "Updating documents",
              desc: "Upload a new version of an existing document. The old version is replaced immediately — no broken links for visitors.",
            },
            {
              icon: <FiImage size={15} />,
              title: "Updating your logo",
              desc: "Replace your logo at any time from Dashboard → Custom Branding. Takes effect instantly.",
            },
            {
              icon: <FiEye size={15} />,
              title: "Previewing changes",
              desc: 'Use the "Preview" button in the dashboard to see your Trust Center as a visitor sees it before committing any changes.',
            },
          ]}
        />
      </div>

      <Divider />

      {/* Visibility */}
      <div id="visibility" className="scroll-mt-6">
        <SectionTitle>Visibility settings</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Control who can see your Trust Center. Change the setting at any time from
          Dashboard → Trust Center → Visibility.
        </p>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              label: "Public",
              variant: "green" as const,
              desc: "Anyone on the internet can view your Trust Center. Indexed by search engines. Best for maximum transparency.",
              icon: <FiGlobe size={15} />,
            },
            {
              label: "Link-only",
              variant: "blue" as const,
              desc: "Only people with the direct URL can view it. Not indexed by search engines. Good for sharing with specific customers.",
              icon: <FiLink size={15} />,
            },
            {
              label: "NDA-gated",
              variant: "amber" as const,
              desc: "Visitors must submit an NDA request before viewing sensitive documents. The overview is public but documents require approval.",
              icon: <FiLock size={15} />,
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <span className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</p>
                  <Badge variant={item.variant}>{item.label}</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default HostedTrustCenter;