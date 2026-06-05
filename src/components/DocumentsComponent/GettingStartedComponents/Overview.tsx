import { PiEyedropperSampleFill, PiTargetThin } from "react-icons/pi";
import {  SectionHeader, Feedback } from "../DocShared";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,

} from "@/components/ui/card";


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
        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Before you begin
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Check prerequisites for using reachGRC and connecting to your
              organisation's account.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Sign into reachGRC
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Learn how to sign in using SSO, email/password, or API key
              authentication.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group  hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Architecture and key concepts
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Understand how controls, domains, and compliance are structured in
              reachGRC.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Dashboard quick tour
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Learn the key areas of the dashboard — scores, tasks, risks, and
              activity.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Control lifecycle
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Learn how controls are created, assigned, assessed, and
              remediated.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>

    <hr className="border-gray-100 dark:border-zinc-800 mb-12" />

    <section className="mb-12">
      <SectionHeader
        title="Start learning with interactive tutorials"
        subtitle="Complete essential reachGRC tasks through step-by-step tutorials."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">


        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Domains & Controls
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Create domains, add controls, and run your first compliance
              assessment.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">tutorial</p>
             <PiTargetThin className="text-sm"/>
          </CardFooter>
        </Card>


        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Import controls via REST API
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Bulk-import controls from an external system using the reachGRC REST API.
              
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">tutorial</p>
             <PiTargetThin className="text-sm"/>
          </CardFooter>
        </Card>


        <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700   border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Generate a compliance report
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Configure and export a report for a selected framework and date range.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">tutorial</p>
             <PiTargetThin className="text-sm"/>
          </CardFooter>
        </Card>

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

                <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              ISO 27001 sample controls
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              A read-only control library mapped to ISO/IEC 27001:2022 for evaluation and testing.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">sample</p>
             <PiEyedropperSampleFill className="text-sm"/>
          </CardFooter>

        </Card>
                <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              SOC 2 Type II sample
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              Sample trust service criteria controls covering security, availability, and confidentiality.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">sample</p>
             <PiEyedropperSampleFill className="text-sm"/>
          </CardFooter>
        </Card>


                <Card className="group hover:scale-101 hover:shadow-md dark:bg-zinc-800 border hover:rounded-xl dark:border-zinc-700  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]">
          <CardHeader>
            <CardTitle className="dark:text-white transition-colors ease-in-out group-hover:text-[#ff831c]">
              Risk register template
            </CardTitle>
            <CardDescription className="transition-colors ease-in-out dark:group-hover:text-white : group-hover:text-black text-gray-400  dark:text-zinc-500 mb-2">
              A pre-populated register with sample risks, scores, and linked controls. Click to find more
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between uppercase dark:border-zinc-700 border-[#dee3ea] flex items-center  pl-3 h-1 font-bold text-zinc-500">
             <p className="text-xs">sample</p>
             <PiEyedropperSampleFill className="text-sm"/>
          </CardFooter>
        </Card>
      </div>
    </section>

    <Feedback />
  </div>
);

export default Overview;