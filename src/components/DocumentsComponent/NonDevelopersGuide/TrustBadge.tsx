// pages/non-developers-guide/TrustBadge.tsx
import {
  SectionTitle, Divider, OnPageNav, CodeBlock, Callout, StepList,
  InlineCode, InfoRowList, Badge,
} from "../../DocumentsComponent/ReUsableCompoenets";
import {
  FiShield, FiCode, FiMonitor, FiAlertTriangle,
  FiCheckCircle, FiRefreshCw, FiEye,
} from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";

const sections = [
  { id: "what-is-badge",  label: "What is the Trust Badge?" },
  { id: "add-badge",      label: "Adding the badge to your site" },
  { id: "badge-variants", label: "Badge variants" },
  { id: "badge-behavior", label: "How the badge behaves" },
  { id: "troubleshoot",   label: "Troubleshooting" },
];

// Mini preview of badge styles
const BadgePreview = () => (
  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 bg-zinc-50 dark:bg-zinc-900 mb-4">
    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
      Preview
    </p>
    <div className="flex flex-wrap gap-4 items-center">
      {/* Dark badge */}
      <div className="flex items-center gap-2 bg-zinc-900 text-white px-3 py-2 rounded-lg text-xs font-medium shadow">
        <FiShield size={14} className="text-[#ff831c]" />
        <span>Verified by ReachGRC</span>
      </div>
      {/* Light badge */}
      <div className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-800 px-3 py-2 rounded-lg text-xs font-medium shadow-sm">
        <FiShield size={14} className="text-[#ff831c]" />
        <span>Verified by ReachGRC</span>
      </div>
      {/* Minimal */}
      <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium border border-zinc-200 px-2.5 py-1.5 rounded-md">
        <RiShieldCheckLine size={13} className="text-[#ff831c]" />
        <span>ReachGRC Trust</span>
      </div>
    </div>
  </div>
);

const TrustBadge = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">Trust Badge</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Embed a lightweight, always-live compliance badge anywhere on your website to
        instantly signal your verified security posture to visitors.
      </p>

      <Divider />

      {/* What is the Trust Badge */}
      <div id="what-is-badge" className="mb-8 scroll-mt-6">
        <SectionTitle>What is the Trust Badge?</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          The Trust Badge is a small embeddable widget that displays a verified compliance
          indicator on your website. It links directly to your Hosted Trust Center so
          visitors can explore the details with one click.
        </p>
        <BadgePreview />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          The badge is served from ReachGRC's CDN, so it always reflects your current
          verification status — no re-embedding required when you renew certifications.
        </p>
      </div>

      <Divider />

      {/* Adding the badge */}
      <div id="add-badge" className="mb-8 scroll-mt-6">
        <SectionTitle>Adding the badge to your site</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          No developer is required. Copy the snippet below and paste it into any HTML page,
          website builder (Webflow, Framer, Squarespace), or CMS.
        </p>

        <StepList
          steps={[
            {
              step: "1",
              label: "Open your ReachGRC dashboard",
              desc: "Navigate to Trust Center → Trust Badge in the left sidebar.",
            },
            {
              step: "2",
              label: "Choose your badge variant",
              desc: "Select between Dark, Light, and Minimal styles to match your website's design.",
            },
            {
              step: "3",
              label: "Copy the embed snippet",
              desc: 'Click "Copy code" — a small HTML snippet is copied to your clipboard.',
            },
            {
              step: "4",
              label: "Paste it on your website",
              desc: "Paste the snippet in your website footer, pricing page, or security page — anywhere visitors will notice it.",
              done: true,
            },
          ]}
        />

        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-6 mb-2">
          Example embed snippet
        </p>
        <CodeBlock>{`<!-- ReachGRC Trust Badge -->
<a href="https://trust.reachgrc.com/your-company" target="_blank" rel="noopener">
  <img
    src="https://cdn.reachgrc.com/badges/your-company/badge-dark.svg"
    alt="Verified by ReachGRC Trust"
    height="40"
  />
</a>`}</CodeBlock>

        <Callout icon={<FiCode size={15} />} variant="info">
          Replace <InlineCode>your-company</InlineCode> with your ReachGRC company slug.
          You can find it in Dashboard → Settings → Company Profile.
        </Callout>
      </div>

      <Divider />

      {/* Badge variants */}
      <div id="badge-variants" className="mb-8 scroll-mt-6">
        <SectionTitle>Badge variants</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Three visual variants are available to match your brand and website design.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              name: "Dark",
              param: "badge-dark.svg",
              desc: "Dark background with white text and the ReachGRC orange shield. Best for light-coloured websites or footers.",
              badge: <Badge variant="zinc">Default</Badge>,
            },
            {
              name: "Light",
              param: "badge-light.svg",
              desc: "White background with a subtle border. Ideal for websites with dark or colourful backgrounds.",
              badge: null,
            },
            {
              name: "Minimal",
              param: "badge-minimal.svg",
              desc: "Icon-and-text only, no background fill. Blends into any page without drawing too much attention.",
              badge: null,
            },
          ].map((v, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{v.name}</p>
                  {v.badge}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">
                  {v.desc}
                </p>
                <InlineCode>{v.param}</InlineCode>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Badge behavior */}
      <div id="badge-behavior" className="mb-8 scroll-mt-6">
        <SectionTitle>How the badge behaves</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          The badge is a live asset — it always reflects the current state of your Trust
          Center profile.
        </p>
        <InfoRowList
          rows={[
            {
              icon: <FiRefreshCw size={15} />,
              title: "Auto-updates",
              desc: "When you update your compliance documents or certifications in the dashboard, the badge reflects the change automatically. No re-embedding needed.",
            },
            {
              icon: <FiEye size={15} />,
              title: "Clickable link",
              desc: "By default, clicking the badge opens your Hosted Trust Center in a new tab, letting visitors explore your full compliance profile.",
            },
            {
              icon: <FiMonitor size={15} />,
              title: "Responsive sizing",
              desc: "The badge is an SVG — it scales perfectly on any screen size from mobile to 4K without blurring.",
            },
            {
              icon: <FiCheckCircle size={15} />,
              title: "Revocation",
              desc: "If your ReachGRC account is suspended or your key documents are removed, the badge will automatically display an 'Unverified' state.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* Troubleshooting */}
      <div id="troubleshoot" className="scroll-mt-6">
        <SectionTitle>Troubleshooting</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          If your badge is not displaying correctly, check the following.
        </p>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              code: "Badge shows broken image",
              variant: "red" as const,
              desc: "Your company slug in the badge URL may be incorrect. Check Dashboard → Settings → Company Profile for the exact slug.",
            },
            {
              code: "Badge shows 'Unverified'",
              variant: "amber" as const,
              desc: "Your Trust Center may be missing required documents or your account may be inactive. Check your dashboard for any outstanding actions.",
            },
            {
              code: "Badge not visible on dark background",
              variant: "amber" as const,
              desc: "Switch to the Light or Minimal variant which is designed for dark backgrounds.",
            },
            {
              code: "Badge displaying correctly",
              variant: "green" as const,
              desc: "No action required. The badge is live and will update automatically when your compliance status changes.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <Badge variant={item.variant}>
                <FiAlertTriangle size={10} />
                {item.variant === "green" ? "OK" : "Issue"}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-0.5">
                  {item.code}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default TrustBadge;