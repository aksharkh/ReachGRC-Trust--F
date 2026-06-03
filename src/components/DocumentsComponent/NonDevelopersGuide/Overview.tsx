// pages/non-developers-guide/Overview.tsx
import {
  SectionTitle, Divider, OnPageNav, FeatureGrid, InfoRowList, Callout,
} from "../../DocumentsComponent/ReUsableCompoenets";
import {
  FiShield, FiUsers, FiRefreshCw, FiCode,
  FiGlobe, FiCheckCircle, FiLayers, FiZap,
} from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";

const sections = [
  { id: "what-is",      label: "What is ReachGRC Trust?" },
  { id: "why-use",      label: "Why organisations use it" },
  { id: "how-it-works", label: "How it works" },
  { id: "options",      label: "Available options" },
];

const Overview = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">Overview</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Learn how ReachGRC Trust helps organisations showcase their security and compliance
        posture without requiring any technical integration.
      </p>

      <Divider />

      {/* What is ReachGRC Trust */}
      <div id="what-is" className="mb-8 scroll-mt-6">
        <SectionTitle>What is ReachGRC Trust?</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          ReachGRC Trust helps organisations publicly demonstrate their security, compliance,
          and governance posture. Instead of manually answering customer security
          questionnaires, you can share a live Trust Center that reflects your latest
          compliance status.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          It is designed for teams who want to build customer trust at scale — no developer
          required. From uploading certifications to customising your brand, everything is
          managed through a simple dashboard.
        </p>
        <Callout icon={<RiShieldCheckLine size={15} />} variant="tip">
          ReachGRC Trust is built for <strong>non-technical users</strong>. No coding,
          no API calls, no configuration files — just a clean dashboard.
        </Callout>
      </div>

      <Divider />

      {/* Why organisations use it */}
      <div id="why-use" className="mb-8 scroll-mt-6">
        <SectionTitle>Why organisations use it</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Security reviews and compliance questionnaires slow down sales cycles. ReachGRC
          Trust lets you answer those questions once — publicly — and share a link instead
          of filling out another spreadsheet.
        </p>
        <FeatureGrid
          cards={[
            {
              icon: <FiShield size={17} />,
              label: "Build customer trust",
              desc: "Show prospects and customers a verified snapshot of your security posture before they even ask.",
            },
            {
              icon: <FiUsers size={17} />,
              label: "Reduce questionnaire fatigue",
              desc: "Replace repetitive security questionnaires with a single, always-up-to-date Trust Center URL.",
            },
            {
              icon: <FiRefreshCw size={17} />,
              label: "Always up to date",
              desc: "Your Trust Center reflects your current compliance status in real time — no manual exports needed.",
            },
            {
              icon: <FiCode size={17} />,
              label: "No development required",
              desc: "Set up and manage your entire Trust Center through a point-and-click dashboard. Zero code.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* How it works */}
      <div id="how-it-works" className="mb-8 scroll-mt-6">
        <SectionTitle>How it works</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          ReachGRC Trust works in three simple steps. You configure your profile once, and
          your Trust Center is live immediately.
        </p>
        <InfoRowList
          rows={[
            {
              icon: <FiLayers size={15} />,
              title: "1 — Set up your Trust Center",
              desc: "Log in to the ReachGRC dashboard, fill in your company profile, upload your compliance documents and certificates, and add your logo.",
            },
            {
              icon: <FiGlobe size={15} />,
              title: "2 — Share your Trust Center link",
              desc: "ReachGRC generates a public URL for your Trust Center. Share it with customers, partners, or embed it on your website — no login required for viewers.",
            },
            {
              icon: <FiRefreshCw size={15} />,
              title: "3 — Keep it current",
              desc: "Whenever your compliance status changes, update your documents or profile in the dashboard. The Trust Center updates instantly.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* Available options */}
      <div id="options" className="scroll-mt-6">
        <SectionTitle>Available options</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          ReachGRC Trust offers several ways to present your compliance posture to the
          world. Use one or combine them for maximum coverage.
        </p>
        <FeatureGrid
          cards={[
            {
              icon: <FiShield size={17} />,
              label: "Trust Badge",
              desc: "A small embeddable widget you place on your website to signal compliance at a glance.",
              badge: "No code needed",
            },
            {
              icon: <FiGlobe size={17} />,
              label: "Hosted Trust Center",
              desc: "A full public page hosted by ReachGRC with your documents, certifications, and compliance statements.",
              badge: "Recommended",
            },
            {
              icon: <FiCheckCircle size={17} />,
              label: "Custom Branding",
              desc: "Personalise your Trust Center with your company logo and brand colours for a seamless experience.",
            },
            {
              icon: <FiZap size={17} />,
              label: "Sharing Controls",
              desc: "Control who can see your Trust Center — fully public, link-only, or gated behind an NDA request.",
            },
          ]}
        />
      </div>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default Overview;