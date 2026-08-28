import React from "react";
import { PiEyedropperSampleFill, PiTargetThin } from "react-icons/pi";
import { SectionHeader, PageFeedback as Feedback } from "@/components/docs/ReusableComponents";
import type { OverviewInterface } from "@/types/GettingStratedPage";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const gettingStartedWithReachGRC: OverviewInterface[] = [
  {
    title: "Before you begin",
    description: "Check prerequisites for using reachGRC and connecting to your organisation's account.",
  },
  {
    title: "Sign into reachGRC",
    description: "Learn how to sign in using SSO, email/password, or API key authentication.",
  },
  {
    title: "Architecture and key concepts",
    description: "Understand how controls, domains, and compliance are structured reachGRC.",
  },
  {
    title: "Dashboard quick tour",
    description: "Learn the key areas of the dashboard — scores, tasks, risks, and activity.",
  },
  {
    title: "Control lifecycle",
    description: "Learn how controls are created, assigned, assessed, and remediated.",
  },
];

const StartLearning: OverviewInterface[] = [
  {
    title: "Domains & Controls",
    description: "Create domains, add controls, and run your first compliance assessment.",
    badge: "tutorial",
    icons: <PiTargetThin className="text-base" />
  },
  {
    title: "Import controls via REST API",
    description: "Bulk-import controls from an external system using the reachGRC REST API.",
    badge: "tutorial",
    icons: <PiTargetThin className="text-base" />
  },
  {
    title: "Generate a compliance report",
    description: "Configure and export a report for a selected framework and date range.",
    badge: "tutorial",
    icons: <PiTargetThin className="text-base" />
  },
];

const SampleSet: OverviewInterface[] = [
  {
    title: "ISO 27001 sample controls",
    description: "A read-only control library mapped to ISO/IEC 27001:2022 for evaluation and testing.",
    badge: "sample",
    icons: <PiEyedropperSampleFill className="text-base" />
  },
  {
    title: "SOC 2 Type II sample",
    description: "Sample trust service criteria controls covering security, availability, and confidentiality.",
    badge: "sample",
    icons: <PiEyedropperSampleFill className="text-base" />
  },
  {
    title: "Risk register template",
    description: "A pre-populated register with sample risks, scores, and linked controls. Click to find more.",
    badge: "sample",
    icons: <PiEyedropperSampleFill className="text-base" />
  },
];

const Overview: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Get started
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      To begin with reachGRC and learn about its key features and benefits,
      start with the following topics.
    </p>

    {/* Section 1 */}
    <section className="mb-12">
      <SectionHeader
        title="Get started with reachGRC for users"
        subtitle="Learn basic information and follow instructions as a first-time user of reachGRC."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {gettingStartedWithReachGRC.map((item, idx) => (
          <Link key={idx} to="/docs/getting-started/get-started-for-users" className="no-underline block h-full group relative z-10 hover:z-30">
            <div className="h-full p-5 rounded-xl border border-[#dee3ea] dark:border-zinc-800 bg-white dark:bg-zinc-900 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-orange group-hover:border-transparent group-hover:shadow-[0_20px_50px_rgba(255,57,24,0.35)] group-hover:scale-110 group-hover:rounded-none transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between origin-center">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors leading-snug">
                  <span>{item.title}</span>
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-lg text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-black font-semibold mt-2 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    {/* Section 2 */}
    <section className="mb-12">
      <SectionHeader
        title="Start learning with interactive tutorials"
        subtitle="Complete essential reachGRC tasks through step-by-step tutorials."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {StartLearning.map((item, idx) => (
          <Link key={idx} to="/docs/tutorial" className="no-underline block h-full group relative z-10 hover:z-30">
            <div className="h-full p-5 rounded-xl border border-[#dee3ea] dark:border-zinc-800 bg-white dark:bg-zinc-900 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-orange group-hover:border-transparent group-hover:shadow-[0_20px_50px_rgba(255,57,24,0.35)] group-hover:scale-110 group-hover:rounded-none transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between origin-center">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors leading-snug">
                  <span>{item.title}</span>
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-lg text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-black font-semibold mt-2 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 group-hover:border-black/15 flex items-center justify-between text-xs font-bold transition-colors">
                <span className="bg-orange-500/10 text-brand-orange group-hover:bg-black/15 group-hover:text-black px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors">{item.badge}</span>
                <span className="text-zinc-400 group-hover:text-black transition-colors">{item.icons}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    {/* Section 3 */}
    <section className="mb-12">
      <SectionHeader
        title="Sample data sets"
        subtitle="Explore reachGRC using ready-made sample controls, risk registers, and reports."
        seeAll
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {SampleSet.map((item, idx) => (
          <Link key={idx} to="/docs/getting-started/sample-data" className="no-underline block h-full group relative z-10 hover:z-30">
            <div className="h-full p-5 rounded-xl border border-[#dee3ea] dark:border-zinc-800 bg-white dark:bg-zinc-900 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-orange group-hover:border-transparent group-hover:shadow-[0_20px_50px_rgba(255,57,24,0.35)] group-hover:scale-110 group-hover:rounded-none transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between origin-center">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors leading-snug">
                  <span>{item.title}</span>
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-lg text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-black font-semibold mt-2 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 group-hover:border-black/15 flex items-center justify-between text-xs font-bold transition-colors">
                <span className="bg-orange-500/10 text-brand-orange group-hover:bg-black/15 group-hover:text-black px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors">{item.badge}</span>
                <span className="text-zinc-400 group-hover:text-black transition-colors">{item.icons}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <div className="flex items-center border-t border-zinc-200 dark:border-zinc-800 pt-6 justify-between">
      <Feedback />
      <Link to="../get-started-for-users" className="group relative flex flex-col cursor-pointer text-brand-orange font-bold text-sm">
        <p className="flex items-center gap-1">
          Getting started for users 
          <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out" />
        </p>
        <div className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
      </Link>
    </div>
    
  </div>
);

export default Overview;