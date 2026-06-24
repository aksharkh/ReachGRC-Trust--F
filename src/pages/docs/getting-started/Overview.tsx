import { PiEyedropperSampleFill, PiTargetThin } from "react-icons/pi";
import { SectionHeader, PageFeedback as Feedback } from "@/components/docs/ReusableComponents";

import type {OverviewInterface}  from "@/types/GettingStratedPage";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,

} from "@/components/ui/card";

import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";


const gettingStartedWithReachGRC : OverviewInterface[] = [
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

]

const StartLearning: OverviewInterface[] = [
  {
    title:"Domains & Controls",
    description:"Create domains, add controls, and run your first compliance assessment.",
    badge:"tutorial",
    icons: <PiTargetThin className="text-sm"/>
  },
  {
    title:"Import controls via REST API",
    description:"Bulk-import controls from an external system using the reachGRC REST API.",
    badge:"tutorial",
    icons: <PiTargetThin className="text-sm"/>
  },
  {
    title:"Generate a compliance report",
    description:"Configure and export a report for a selected framework and date range.",
    badge:"tutorial",
    icons: <PiTargetThin className="text-sm"/>
  },
]

const SampleSet: OverviewInterface[] = [
  {
    title:"ISO 27001 sample controls",
    description:"A read-only control library mapped to ISO/IEC 27001:2022 for evaluation and testing.",
    badge:"sample",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"SOC 2 Type II sample",
    description:"Sample trust service criteria controls covering security, availability, and confidentiality.",
    badge:"sample",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Risk register template",
    description:"A pre-populated register with sample risks, scores, and linked controls. Click to find more",
    badge:"sample",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
]


const Overview = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Get started
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      To begin with reachGRC and learn about its key features and benefits,
      start with the following topics.
    </p>

    <section className="mb-12">
      <SectionHeader
        title="Get started with reachGRC for users"
        subtitle="Learn basic information and follow instructions as a first-time user of reachGRC."
      />
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {gettingStartedWithReachGRC.map((item, idx) => (
                  <Card key={idx} className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle  className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
               <p className="flex items-center">{item.title} <TbArrowBadgeRightFilled  className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " /> </p>
                <div className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </CardTitle>
            <CardDescription className="transition-colors group-hover:text-black ease-in-out   text-gray-400  dark:text-zinc-500 mb-2">
              {item.description}
            </CardDescription>
          </CardHeader>
        </Card>
        ))}
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader
        title="Start learning with interactive tutorials"
        subtitle="Complete essential reachGRC tasks through step-by-step tutorials."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {StartLearning.map((item, idx) => (
                  <Card key={idx} className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle  className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
              <p className="flex items-center">{item.title} <TbArrowBadgeRightFilled  className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " /> </p>
                <div className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </CardTitle>
            <CardDescription className="transition-colors group-hover:text-black ease-in-out   text-gray-400  dark:text-zinc-500 mb-2">
              {item.description}
            </CardDescription>
          </CardHeader>
                    <CardFooter className="justify-between group-hover:text-white uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">{item.badge}</p>
             {item.icons}
          </CardFooter>
        </Card>
        ))}

      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader
        title="Sample data sets"
        subtitle="Explore reachGRC using ready-made sample controls, risk registers, and reports."
        seeAll
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {SampleSet.map((item, idx) => (
                  <Card key={idx} className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out  cursor-pointer duration-75">
          <CardHeader>
            <CardTitle  className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
              <p className="flex items-center">{item.title} <TbArrowBadgeRightFilled  className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " /> </p>
                <div className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </CardTitle>
            <CardDescription className="transition-colors group-hover:text-black ease-in-out   text-gray-400  dark:text-zinc-500 mb-2">
              {item.description}
            </CardDescription>
          </CardHeader>
                    <CardFooter className="justify-between uppercase text-zinc-500 group-hover:text-white dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold ">
             <p className="text-xs">{item.badge}</p>
             {item.icons}
          </CardFooter>
        </Card>
        ))}

      </div>
    </section>
    <div className="flex items-center border-t  justify-between">
      <Feedback />
<Link to="../get-started-for-users" className="group relative  flex flex-col cursor-pointer text-[#FF6A00]">
  <p className="flex items-center justify-between">Getting started for users <TbArrowBadgeRightFilled  className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center " /></p>
  <div className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-[#FF6A00] transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
</Link>
    </div>
    
  </div>
);

export default Overview;