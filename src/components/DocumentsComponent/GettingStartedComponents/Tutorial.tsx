import type { CardInterface } from "@/types/GettingStratedPage";
import { SectionHeader, Feedback } from "../DocShared";
import { PiEyedropperSampleFill } from "react-icons/pi";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,

} from "@/components/ui/card";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Quickstart: CardInterface[] = [
  {
    title:"reachGRC in 20 minutes",
    description:"Create domains, add your first controls, and run a compliance assessment end to end.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Your first risk entry",
    description:"Log a risk, assign likelihood and impact scores, and link it to an existing control.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Invite a team member",
    description:"Add a user to your organisation, assign a role, and send an invitation email.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
]

const ControlAndCompliance: CardInterface[] = [
    {
    title:"Create a control from scratch",
    description:"Build a custom control, assign it to a domain, and set its review frequency.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
    {
    title:"Import controls via REST API",
    description:"Bulk-import controls from an external system using the reachGRC REST API.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
    {
    title:"Map controls to a framework",
    description:"Link existing controls to the relevant clauses of ISO 27001 or SOC 2.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
    {
    title:"Upload evidence for a control",
    description:"Attach files, links, or screenshots to satisfy a control's evidence requirements.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
    {
    title:"Generate a compliance report",
    description:"Configure and export a compliance report for a selected framework and date range.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
]

const RiskManagement: CardInterface[] = [
  {
    title:"Build a risk register",
    description:"Set up your risk register, define a scoring matrix, and log your first set of risks.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Assign a risk owner",
    description:"Delegate a risk to a team member and track their remediation progress.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Create a risk treatment plan",
    description:"Document how a risk will be accepted, mitigated, transferred, or avoided.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
]

const ApiIntegration : CardInterface[] = [
  {
    title:"Authenticate with the REST API",
    description:"Generate an API key and make your first authenticated request to the reachGRC API.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Sync controls from Jira",
    description:"Connect reachGRC to Jira and auto-create issues when a control fails assessment.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
  {
    title:"Export data to CSV",
    description:"Export your control library, risk register, or audit log to a CSV file.",
    badge: "Tutorial",
    icons: <PiEyedropperSampleFill className="text-sm"/>
  },
]

const GettingStartedTutorials = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Tutorials
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      Step-by-step tutorials to help you complete key tasks in reachGRC. Each tutorial walks you through a real workflow from start to finish.
    </p>

    <section className="mb-12">
      <SectionHeader title="Quickstart tutorials" subtitle="Get productive with reachGRC as fast as possible." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Quickstart.map((item, idx) => (
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

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Controls and compliance" subtitle="Learn how to build and manage your control library." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ControlAndCompliance.map((item, idx) => (
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

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="Risk management" subtitle="Work through common risk management workflows." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {RiskManagement.map((item, idx) => (
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

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader title="API and integrations" subtitle="Connect reachGRC to your existing tools and workflows." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ApiIntegration.map((item, idx) => (
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

    <div className="flex flex-col  ">
      <div className="flex justify-between">
        <Link
          to="../get-started-for-users"
          className="group relative  flex flex-col cursor-pointer text-[#FF6A00]"
        >
          <p className="flex items-center gap-1.5 justify-between">
            <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 rotate-180 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center " />
            Get Started For Users
          </p>
          <div className="absolute right-0 bottom-0 h-0.5 w-full origin-right scale-x-0 bg-[#FF6A00] transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
        </Link>
        
        <Link
          to="../concepts-for-admins"
          className="group relative  flex flex-col cursor-pointer text-[#FF6A00]"
        >
          <p className="flex items-center justify-between">
            Concept For Admins{" "}
            <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center " />
          </p>
          <div className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-[#FF6A00] transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
        </Link>
      </div>

      <Feedback />
    </div>
  </div>
);

export default GettingStartedTutorials;