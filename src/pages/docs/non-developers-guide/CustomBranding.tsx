// pages/non-developers-guide/CustomBranding.tsx
import {
  SectionTitle, Divider, OnPageNav, Callout, StepList,
  InlineCode, InfoRowList, Badge,
} from "@/components/docs/ReusableComponents";
import {
  FiImage, FiSliders, FiCheckCircle, FiAlertTriangle,
  FiUploadCloud, FiEye, FiTrash2,
} from "react-icons/fi";
import { TbPalette } from "react-icons/tb";
import { RiInformationLine } from "react-icons/ri";

const sections = [
  { id: "overview-branding", label: "Overview" },
  { id: "logo",              label: "Logo" },
  { id: "logo-specs",        label: "Logo specifications" },
  { id: "manage-logo",       label: "Managing your logo" },
  { id: "best-practices",    label: "Best practices" },
];

// Color swatch display
const ColorSwatch = ({ hex, name }: { hex: string; name: string }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 flex-shrink-0"
      style={{ backgroundColor: hex }}
    />
    <div>
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{name}</p>
      <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">{hex}</p>
    </div>
  </div>
);

const CustomBranding = () => (
  <div className="flex gap-12 p-8 max-w-5xl">
    <div className="flex-1 min-w-0">

      <SectionTitle>Non-Developers Guide</SectionTitle>
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">Custom Branding</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Make your Trust Center feel like a natural extension of your brand by adding your
        company logo and customising the visual identity of your public profile.
      </p>

      <Divider />

      {/* Overview */}
      <div id="overview-branding" className="mb-8 scroll-mt-6">
        <SectionTitle>Overview</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          Custom Branding lets you replace the default ReachGRC placeholder with your own logo,
          so every visitor immediately recognises whose Trust Center they are viewing.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          Your logo appears in two places:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            {
              icon: <FiEye size={17} />,
              label: "Hosted Trust Center header",
              desc: "Displayed prominently at the top of your public Trust Center page.",
            },
            {
              icon: <FiImage size={17} />,
              label: "Trust Badge",
              desc: "Shown alongside the verified indicator in the embeddable Trust Badge widget.",
            },
          ].map((item, i) => (
            <div key={i} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <Callout icon={<TbPalette size={15} />} variant="info">
          Custom colour themes and font customisation are available on the Enterprise plan.
          Contact your ReachGRC administrator for more information.
        </Callout>
      </div>

      <Divider />

      {/* Logo upload */}
      <div id="logo" className="mb-8 scroll-mt-6">
        <SectionTitle>Logo</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          Upload your company logo in a few clicks — no image editing software required.
        </p>
        <StepList
          steps={[
            {
              step: "1",
              label: "Open Custom Branding settings",
              desc: "In your ReachGRC dashboard, navigate to Trust Center → Custom Branding → Logo.",
            },
            {
              step: "2",
              label: "Click 'Upload logo'",
              desc: "A file picker opens. Select your logo file from your computer.",
            },
            {
              step: "3",
              label: "Review the preview",
              desc: "Your logo is displayed in a preview panel showing how it will appear on the Trust Center and in the badge.",
            },
            {
              step: "4",
              label: "Save",
              desc: "Click 'Save'. Your logo goes live on your Trust Center immediately.",
              done: true,
            },
          ]}
        />
      </div>

      <Divider />

      {/* Logo specifications */}
      <div id="logo-specs" className="mb-8 scroll-mt-6">
        <SectionTitle>Logo specifications</SectionTitle>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          For the best result on all screen sizes, follow these guidelines when preparing
          your logo file.
        </p>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800 mb-5">
          {[
            { label: "Accepted formats", value: "PNG, SVG, WebP" },
            { label: "Max file size",    value: "2 MB" },
            { label: "Recommended size", value: "400 × 120 px (horizontal logo)" },
            { label: "Minimum width",    value: "200 px" },
            { label: "Background",       value: "Transparent preferred; white acceptable" },
            { label: "Colour mode",      value: "RGB (not CMYK)" },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{row.label}</span>
              <InlineCode>{row.value}</InlineCode>
            </div>
          ))}
        </div>

        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
          ReachGRC brand colours for reference
        </p>
        <div className="flex flex-wrap gap-4">
          <ColorSwatch hex="#ff831c" name="ReachGRC Orange" />
          <ColorSwatch hex="#18181b" name="Zinc 950 (dark bg)" />
          <ColorSwatch hex="#ffffff" name="White" />
          <ColorSwatch hex="#f4f4f5" name="Zinc 100 (light bg)" />
        </div>
      </div>

      <Divider />

      {/* Managing logo */}
      <div id="manage-logo" className="mb-8 scroll-mt-6">
        <SectionTitle>Managing your logo</SectionTitle>
        <InfoRowList
          rows={[
            {
              icon: <FiUploadCloud size={15} />,
              title: "Replacing the logo",
              desc: "Upload a new logo at any time. The new file immediately replaces the old one — no broken images for visitors.",
            },
            {
              icon: <FiTrash2 size={15} />,
              title: "Removing the logo",
              desc: "Click 'Remove logo' in the dashboard. Your Trust Center will display the default ReachGRC placeholder until a new logo is uploaded.",
            },
            {
              icon: <FiEye size={15} />,
              title: "Previewing before saving",
              desc: "The preview panel updates in real time as you select a new file, so you can confirm it looks right before saving.",
            },
            {
              icon: <FiSliders size={15} />,
              title: "Logo on the Trust Badge",
              desc: "The badge automatically uses the same logo as your Trust Center. Upload once, it appears everywhere.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* Best practices */}
      <div id="best-practices" className="scroll-mt-6">
        <SectionTitle>Best practices</SectionTitle>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: <FiCheckCircle size={15} />,
              variant: "green" as const,
              title: "Use a transparent PNG or SVG",
              desc: "Transparent backgrounds look professional on both light and dark versions of the Trust Center.",
            },
            {
              icon: <FiCheckCircle size={15} />,
              variant: "green" as const,
              title: "Use a horizontal logo",
              desc: "Horizontal (landscape) logos fit the header area best. Square or stacked logos may appear smaller than intended.",
            },
            {
              icon: <FiAlertTriangle size={15} />,
              variant: "amber" as const,
              title: "Avoid logos with thin strokes on white",
              desc: "Fine details may not render well at small sizes (as used in the Trust Badge). Test the badge preview before saving.",
            },
            {
              icon: <FiAlertTriangle size={15} />,
              variant: "amber" as const,
              title: "Avoid JPEG for logos with text",
              desc: "JPEG compression introduces artefacts around text and sharp edges. Use PNG or SVG instead.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <span className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.title}</p>
                  <Badge variant={item.variant}>{item.variant === "green" ? "Do" : "Avoid"}</Badge>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout icon={<RiInformationLine size={15} />} variant="note">
          Still unsure about your logo? Send a test upload and use the "Preview" button to
          review before sharing the link with customers.
        </Callout>
      </div>

    </div>
    <OnPageNav sections={sections} />
  </div>
);

export default CustomBranding;