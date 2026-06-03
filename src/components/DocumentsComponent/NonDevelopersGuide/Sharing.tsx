// pages/non-developers-guide/Sharing.tsx
import {
  SectionTitle, Divider, OnPageNav, Callout, StepList,
  InfoRowList, Badge, InlineCode,
} from "../../DocumentsComponent/ReUsableCompoenets";
import {
  FiGlobe, FiLink, FiLock, FiMail, FiCopy,
  FiSliders, FiUserCheck, FiEyeOff,
} from "react-icons/fi";
import { RiInformationLine } from "react-icons/ri";
import { useState } from "react";

const sections = [
  { id: "sharing-overview",  label: "How sharing works" },
  { id: "visibility-modes",  label: "Visibility modes" },
  { id: "share-link",        label: "Sharing the link" },
  { id: "nda-flow",          label: "NDA-gated access" },
  { id: "revoke-access",     label: "Revoking access" },
];

const CopyableUrl = () => {
  const [copied, setCopied] = useState(false);
  const url = "https://trust.reachgrc.com/your-company";
  return (
    <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 bg-zinc-50 dark:bg-zinc-900 mt-4">
      <span className="flex-1 text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">{url}</span>
      <button
        onClick={() => { navigator.clipboard.writeText(url).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md px-2.5 py-1 transition-colors"
      >
        {copied ? "Copied!" : <><FiCopy size={11} /> Copy</>}
      </button>
    </div>
  );
};

const Sharing = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">Sharing</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Control who can access your Trust Center and how you share it with customers,
        partners, and the public — all from the dashboard, no code required.
      </p>

      <Divider />

      {/* How sharing works */}
      <div id="sharing-overview" className="mb-8 scroll-mt-6">
        <SectionTitle>How sharing works</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          Sharing your Trust Center is as simple as sending a link. ReachGRC hosts your
          Trust Center at a permanent URL and handles all the access control logic for you.
          There are no files to attach, no passwords to manage, and no logins required for
          viewers (unless you choose the NDA-gated option).
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          You control visibility from a single setting in the dashboard. Change it at any
          time — the change takes effect immediately.
        </p>
        <CopyableUrl />
      </div>

      <Divider />

      {/* Visibility modes */}
      <div id="visibility-modes" className="mb-8 scroll-mt-6">
        <SectionTitle>Visibility modes</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Choose the mode that best matches your sharing strategy.
        </p>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: <FiGlobe size={15} />,
              label: "Public",
              badge: <Badge variant="green">Indexed</Badge>,
              desc: "Your Trust Center is visible to anyone on the internet and indexed by search engines. Best for companies that want maximum transparency and want customers to discover the page organically.",
            },
            {
              icon: <FiLink size={15} />,
              label: "Link-only",
              badge: <Badge variant="blue">Not indexed</Badge>,
              desc: "Only people with the direct URL can view your Trust Center. Not discoverable via search engines. Ideal for sharing with specific customers or during active sales cycles.",
            },
            {
              icon: <FiLock size={15} />,
              label: "NDA-gated",
              badge: <Badge variant="amber">Approval required</Badge>,
              desc: "The overview and company profile are public, but individual documents require the visitor to submit an NDA request. You review and approve or deny each request from the dashboard.",
            },
            {
              icon: <FiEyeOff size={15} />,
              label: "Private (hidden)",
              badge: <Badge variant="zinc">Dashboard only</Badge>,
              desc: "Your Trust Center is completely hidden from the public. Useful while you are setting it up or during a period when you do not want it accessible.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <span className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</p>
                  {item.badge}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Sharing the link */}
      <div id="share-link" className="mb-8 scroll-mt-6">
        <SectionTitle>Sharing the link</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Once your Trust Center is live, share the link anywhere customers and partners
          will see it.
        </p>
        <InfoRowList
          rows={[
            {
              icon: <FiMail size={15} />,
              title: "Email signature",
              desc: 'Add your Trust Center URL to your email signature — e.g. "View our Security & Compliance posture at trust.reachgrc.com/your-company".',
            },
            {
              icon: <FiGlobe size={15} />,
              title: "Website",
              desc: "Link to your Trust Center from your website's footer, security page, or pricing page to proactively address compliance questions.",
            },
            {
              icon: <FiLink size={15} />,
              title: "Sales proposals",
              desc: "Include the link in proposals and RFP responses to instantly satisfy security review requirements.",
            },
            {
              icon: <FiSliders size={15} />,
              title: "Security questionnaires",
              desc: 'Answer security questionnaire fields with "See our Trust Center: [URL]" instead of filling out each question manually.',
            },
          ]}
        />
        <Callout icon={<RiInformationLine size={15} />} variant="info">
          Your Trust Center URL never changes. Once shared, it works permanently — no
          need to re-send updated links when you add new documents.
        </Callout>
      </div>

      <Divider />

      {/* NDA flow */}
      <div id="nda-flow" className="mb-8 scroll-mt-6">
        <SectionTitle>NDA-gated access</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          For sensitive documents (e.g., a detailed penetration test report), the NDA-gated
          mode lets you share them selectively without making them fully public.
        </p>
        <StepList
          steps={[
            {
              step: "1",
              label: "Visitor requests access",
              desc: "The visitor clicks 'Request access' on your Trust Center and fills in their name, company, and email.",
            },
            {
              step: "2",
              label: "You receive a notification",
              desc: "ReachGRC sends you an email and creates an entry in Dashboard → Sharing → Access Requests.",
            },
            {
              step: "3",
              label: "Review and approve or deny",
              desc: 'Open the request in the dashboard and click "Approve" or "Deny". Add an optional message.',
            },
            {
              step: "4",
              label: "Visitor is notified",
              desc: "If approved, the visitor receives an email with a time-limited link granting access to the gated documents. If denied, they receive a polite rejection.",
              done: true,
            },
          ]}
        />
        <Callout icon={<FiUserCheck size={15} />} variant="tip">
          Approved access links expire after{" "}
          <InlineCode>30 days</InlineCode> by default. You can revoke a specific visitor's
          access at any time from the Access Requests table.
        </Callout>
      </div>

      <Divider />

      {/* Revoking access */}
      <div id="revoke-access" className="scroll-mt-6">
        <SectionTitle>Revoking access</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          You can restrict or remove access to your Trust Center at any time, for any reason.
        </p>
        <InfoRowList
          rows={[
            {
              icon: <FiSliders size={15} />,
              title: "Change visibility mode",
              desc: "Switch from Public to Link-only or Private. The change is immediate — anyone who tries to visit the old URL will see an 'Access restricted' page.",
            },
            {
              icon: <FiEyeOff size={15} />,
              title: "Revoke individual NDA access",
              desc: "Go to Dashboard → Sharing → Access Requests, find the visitor, and click 'Revoke'. Their access link becomes invalid immediately.",
            },
            {
              icon: <FiLock size={15} />,
              title: "Remove specific documents",
              desc: "Delete individual documents from Dashboard → Documents. They are removed from the Trust Center instantly without affecting overall visibility.",
            },
          ]}
        />
      </div>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default Sharing;