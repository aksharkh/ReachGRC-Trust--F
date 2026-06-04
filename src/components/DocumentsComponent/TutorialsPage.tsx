import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TbRocket, TbShieldCheck, TbApi,
  TbPlayerPlay, TbClock, TbChevronDown, TbChevronUp,
} from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsLayoutTextWindow } from "react-icons/bs";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tutorial {
  id:          string;
  title:       string;
  description: string;
  duration:    string;
  youtubeId:   string;
  tags:        string[];
  steps:       string[];
}

interface TutorialGroup {
  id:        string;
  label:     string;
  icon:      React.ReactNode;
  color:     string;
  tutorials: Tutorial[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const groups: TutorialGroup[] = [
  {
    id: "quickstart",
    label: "Quickstart Tutorials",
    icon: <TbRocket size={18} />,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
    tutorials: [
      {
        id: "qs-1",
        title: "ReachGRC in 20 minutes",
        description: "A complete walkthrough of the ReachGRC platform — from login to your first compliance report.",
        duration: "20:14",
        youtubeId: "pD_imYhNoQ4",
        tags: ["overview", "beginner"],
        steps: [
          "Sign up and navigate the main dashboard",
          "Create your first risk and assign an owner",
          "Add a compliance control and link evidence",
          "Generate and export your first compliance report",
        ],
      },
      {
        id: "qs-2",
        title: "Your first risk entry",
        description: "Learn how to create, categorise, and assign your first risk entry in the ReachGRC dashboard.",
        duration: "8:42",
        youtubeId: "pD_imYhNoQ4",
        tags: ["risk", "beginner"],
        steps: [
          "Open the Risk Register and click New Risk",
          "Set the risk category, likelihood, and impact",
          "Assign an owner and set a review date",
          "Save and view the risk on the register",
        ],
      },
      {
        id: "qs-3",
        title: "Invite a team member",
        description: "Step-by-step guide to inviting colleagues, assigning roles, and managing team permissions.",
        duration: "5:17",
        youtubeId: "pD_imYhNoQ4",
        tags: ["team", "beginner"],
        steps: [
          "Go to Settings → Team Members",
          "Enter the invitee's email address",
          "Select a role: Admin, Member, or Viewer",
          "Send the invite and confirm acceptance",
        ],
      },
    ],
  },
  {
    id: "controls",
    label: "Controls & Compliance",
    icon: <TbShieldCheck size={18} />,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    tutorials: [
      {
        id: "cc-1",
        title: "Create a control from scratch",
        description: "Build a custom compliance control, set its owner, due date, and evidence requirements.",
        duration: "11:05",
        youtubeId: "pD_imYhNoQ4",
        tags: ["controls", "intermediate"],
        steps: [
          "Navigate to Controls and click Add Control",
          "Fill in the control name, description, and category",
          "Assign an owner and set the due date",
          "Define evidence requirements and save",
        ],
      },
      {
        id: "cc-2",
        title: "Import controls via REST API",
        description: "Use the ReachGRC REST API to bulk-import controls from a JSON payload.",
        duration: "14:33",
        youtubeId: "pD_imYhNoQ4",
        tags: ["controls", "api", "intermediate"],
        steps: [
          "Generate an API key from Settings → API",
          "Structure your controls as a JSON array",
          "POST the payload to /api/v1/controls",
          "Verify the imported controls in the dashboard",
        ],
      },
      {
        id: "cc-3",
        title: "Map controls to a framework",
        description: "Learn how to align your controls to ISO 27001, SOC 2, or a custom compliance framework.",
        duration: "9:48",
        youtubeId: "pD_imYhNoQ4",
        tags: ["controls", "framework", "intermediate"],
        steps: [
          "Open a control and go to the Mappings tab",
          "Select a framework (ISO 27001, SOC 2, or custom)",
          "Choose the relevant clause or requirement",
          "Save the mapping and review coverage gaps",
        ],
      },
      {
        id: "cc-4",
        title: "Upload video evidence for a control",
        description: "Attach video recordings as evidence to your controls for audit-ready documentation.",
        duration: "6:22",
        youtubeId: "pD_imYhNoQ4",
        tags: ["controls", "evidence", "beginner"],
        steps: [
          "Open the control and click Add Evidence",
          "Select Video as the evidence type",
          "Upload your recording (MP4, MOV supported)",
          "Add a description and mark as audit-ready",
        ],
      },
      {
        id: "cc-5",
        title: "Generate a compliance report",
        description: "Export a full compliance report as PDF or Excel directly from the ReachGRC dashboard.",
        duration: "7:55",
        youtubeId: "pD_imYhNoQ4",
        tags: ["reports", "compliance", "beginner"],
        steps: [
          "Go to Reports and click New Report",
          "Select the framework and date range",
          "Choose PDF or Excel as the export format",
          "Download and share the generated report",
        ],
      },
    ],
  },
  {
    id: "api",
    label: "API & Integrations",
    icon: <TbApi size={18} />,
    color: "text-violet-500 bg-violet-50 dark:bg-violet-900/20",
    tutorials: [
      {
        id: "api-1",
        title: "Authentication with the REST API",
        description: "Set up API key authentication and make your first authenticated request to ReachGRC.",
        duration: "10:11",
        youtubeId: "pD_imYhNoQ4",
        tags: ["api", "auth", "intermediate"],
        steps: [
          "Navigate to Settings → API Keys",
          "Generate a new key and copy it securely",
          "Pass the key as a Bearer token in headers",
          "Make a test GET request to verify authentication",
        ],
      },
      {
        id: "api-2",
        title: "Sync controls from Jira",
        description: "Connect Jira to ReachGRC and automatically sync issues as compliance controls.",
        duration: "16:44",
        youtubeId: "pD_imYhNoQ4",
        tags: ["api", "jira", "advanced"],
        steps: [
          "Install the ReachGRC app in your Jira workspace",
          "Authorise the OAuth connection from Settings",
          "Configure which Jira projects and issue types to sync",
          "Run the first sync and review imported controls",
        ],
      },
      {
        id: "api-3",
        title: "Export data to CSV",
        description: "Use the export API to pull your controls, risks, and audit logs into CSV format.",
        duration: "8:09",
        youtubeId: "pD_imYhNoQ4",
        tags: ["api", "export", "intermediate"],
        steps: [
          "Authenticate with your API key",
          "Call GET /api/v1/export with the resource type param",
          "Specify filters like date range or status",
          "Save the CSV response to your local machine",
        ],
      },
    ],
  },
  {
    id: "nondeveloper",
    label: "Non-Developer Guide",
    icon: <BsLayoutTextWindow size={17} />,
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
    tutorials: [
      {
        id: "nd-1",
        title: "Setting up your Hosted Trust Center",
        description: "Share your company's security posture publicly using the ReachGRC hosted trust center URL.",
        duration: "5:30",
        youtubeId: "pD_imYhNoQ4",
        tags: ["trust center", "no-code", "beginner"],
        steps: [
          "Go to Trust Center → Setup in the sidebar",
          "Fill in your company name and description",
          "Choose which controls to make public",
          "Publish and copy your unique trust center URL",
        ],
      },
      {
        id: "nd-2",
        title: "Embedding the Trust Badge on your website",
        description: "Drop two lines of HTML into Webflow, WordPress, or any site to render your live Trust Badge.",
        duration: "4:55",
        youtubeId: "pD_imYhNoQ4",
        tags: ["widget", "no-code", "beginner"],
        steps: [
          "Open Trust Center → Badge in the dashboard",
          "Copy the two-line embed snippet",
          "Paste it into your site's HTML (footer or header)",
          "Preview the live badge on your published page",
        ],
      },
      {
        id: "nd-3",
        title: "Custom branding your Trust Center",
        description: "Upload your logo, set brand colors, and personalise your public-facing trust center.",
        duration: "6:10",
        youtubeId: "pD_imYhNoQ4",
        tags: ["branding", "no-code", "beginner"],
        steps: [
          "Open Trust Center → Branding",
          "Upload your company logo (PNG or SVG)",
          "Set your primary brand colour using the colour picker",
          "Save and preview the branded trust center",
        ],
      },
      {
        id: "nd-4",
        title: "Sharing your Trust Center with customers",
        description: "Best practices for sharing your trust center link in emails, proposals, and your website footer.",
        duration: "3:45",
        youtubeId: "pD_imYhNoQ4",
        tags: ["sharing", "no-code", "beginner"],
        steps: [
          "Copy your public trust center URL",
          "Add it to your email signature and proposals",
          "Embed the link in your website's footer nav",
          "Track visitor engagement from the dashboard",
        ],
      },
    ],
  },
  {
    id: "admin",
    label: "Administrator Concepts",
    icon: <HiOutlineBuildingOffice2 size={17} />,
    color: "text-red-500 bg-red-50 dark:bg-red-900/20",
    tutorials: [
      {
        id: "adm-1",
        title: "Managing companies and API keys",
        description: "Create company accounts, issue API keys, set expiry, and manage key status from the admin panel.",
        duration: "12:20",
        youtubeId: "pD_imYhNoQ4",
        tags: ["admin", "api keys", "intermediate"],
        steps: [
          "Open the Admin Panel and click Add Company",
          "Fill in the company details and save",
          "Navigate to the company's API Keys tab",
          "Issue a new key, set expiry, and copy it securely",
        ],
      },
      {
        id: "adm-2",
        title: "User roles and permissions",
        description: "Understand the difference between admin, member, and viewer roles and how to assign them.",
        duration: "7:33",
        youtubeId: "pD_imYhNoQ4",
        tags: ["admin", "roles", "beginner"],
        steps: [
          "Review the three roles: Admin, Member, Viewer",
          "Understand what each role can access and edit",
          "Go to Settings → Team and select a user",
          "Change their role and confirm the update",
        ],
      },
      {
        id: "adm-3",
        title: "Importing companies from Excel",
        description: "Bulk-onboard multiple companies at once using the Excel import feature.",
        duration: "9:15",
        youtubeId: "pD_imYhNoQ4",
        tags: ["admin", "import", "intermediate"],
        steps: [
          "Download the company import template (XLSX)",
          "Fill in company names, contacts, and plan details",
          "Upload the file via Admin → Import Companies",
          "Review the import summary and fix any errors",
        ],
      },
    ],
  },
];

// ─── Tag badge ────────────────────────────────────────────────────────────────

const tagColors: Record<string, string> = {
  beginner: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  intermediate: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  advanced: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

const Tag = ({ tag }: { tag: string }) => (
  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
    tagColors[tag] ?? "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
  }`}>
    {tag}
  </span>
);

// ─── Video modal ──────────────────────────────────────────────────────────────

const VideoModal = ({ tutorial, onClose }: { tutorial: Tutorial; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${tutorial.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={tutorial.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">{tutorial.title}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{tutorial.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tutorial.tags.map((t) => <Tag key={t} tag={t} />)}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// ─── Steps list ───────────────────────────────────────────────────────────────

const StepsList = ({ steps }: { steps: string[] }) => (
  <ol className="mt-4 space-y-2">
    {steps.map((step, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff831c]/10 text-[#ff831c] text-[10px] font-bold flex items-center justify-center mt-px">
          {i + 1}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{step}</span>
      </li>
    ))}
  </ol>
);

// ─── Alternating Tutorial Row ─────────────────────────────────────────────────

const TutorialRow = ({ tutorial, index, onClick }: { tutorial: Tutorial; index: number; onClick: () => void }) => {
  const isEven = index % 2 === 0;

  const Thumbnail = (
    <div
      onClick={onClick}
      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group flex-shrink-0 w-full sm:w-[52%]"
    >
      <img
        src={`https://img.youtube.com/vi/${tutorial.youtubeId}/hqdefault.jpg`}
        alt={tutorial.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#ff831c] flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
          <TbPlayerPlay size={24} className="text-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
        <TbClock size={10} />
        {tutorial.duration}
      </div>
    </div>
  );

  const Info = (
    <div className="flex flex-col justify-center flex-1 min-w-0 py-2">
      <span className="text-[11px] font-bold tracking-widest text-zinc-300 dark:text-zinc-600 mb-2 uppercase select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        onClick={onClick}
        className="text-[15px] font-semibold text-zinc-900 dark:text-white leading-snug mb-1.5 cursor-pointer hover:text-[#ff831c] transition-colors"
      >
        {tutorial.title}
      </h3>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {tutorial.description}
      </p>

      <StepsList steps={tutorial.steps} />

      <div className="flex flex-wrap gap-1.5 mt-4">
        {tutorial.tags.map((t) => <Tag key={t} tag={t} />)}
      </div>

      <button
        onClick={onClick}
        className="mt-4 self-start flex items-center gap-2 text-xs font-medium text-[#ff831c] border border-[#ff831c]/40 hover:bg-[#ff831c]/8 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <TbPlayerPlay size={12} />
        Watch now
      </button>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      {isEven ? (
        <>
          {Info}
          {Thumbnail}
        </>
      ) : (
        <>
          {Thumbnail}
          {Info}
        </>
      )}
    </div>
  );
};

// ─── Group section ────────────────────────────────────────────────────────────

const GroupSection = ({ group }: { group: TutorialGroup }) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<Tutorial | null>(null);

  return (
    <div className="mb-12">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between mb-2 cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${group.color}`}>
            {group.icon}
          </div>
          <span className="text-base font-semibold text-zinc-900 dark:text-white">
            {group.label}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {group.tutorials.length} videos
          </span>
        </div>
        {open
          ? <TbChevronUp size={16} className="text-zinc-400" />
          : <TbChevronDown size={16} className="text-zinc-400" />
        }
      </button>

      {open && (
        <div className="mt-2">
          {group.tutorials.map((t, i) => (
            <TutorialRow key={t.id} tutorial={t} index={i} onClick={() => setActive(t)} />
          ))}
        </div>
      )}

      {active && <VideoModal tutorial={active} onClose={() => setActive(null)} />}
    </div>
  );
};

// ─── Page feedback ────────────────────────────────────────────────────────────

const PageFeedback = () => {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        {voted ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Thanks for your feedback!</p>
        ) : (
          <>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Were these tutorials helpful?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setVoted("yes")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer"
              >
                <FiThumbsUp size={12} /> Yes, helpful
              </button>
              <button
                onClick={() => setVoted("no")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer"
              >
                <FiThumbsDown size={12} /> Not really
              </button>
            </div>
          </>
        )}
      </div>
      <Link
        to="/docs/contact-us"
        className="flex items-center gap-2 text-sm text-[#ff831c] hover:underline"
      >
        <RiCustomerService2Line size={16} />
        Still need help? Contact us
      </Link>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const TutorialPage = () => (
  <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
    <div className="max-w-4xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
          Tutorials
        </p>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
          Video tutorials
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Step-by-step video guides covering everything from your first login to
          advanced API integrations. Click any card to watch.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Difficulty:</span>
        {["beginner", "intermediate", "advanced"].map((t) => <Tag key={t} tag={t} />)}
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800 mb-10" />

      {groups.map((g) => <GroupSection key={g.id} group={g} />)}

      <PageFeedback />

    </div>
  </div>
);

export default TutorialPage;