import { SectionHeader, Feedback } from "../DocShared";
import type { CardInterface } from "@/types/GettingStratedPage";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,

} from "@/components/ui/card";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdOutlineAssessment } from "react-icons/md";
import { Link } from "react-router-dom";

const SetUpAccount: CardInterface[] = [
  {
   title: "Before you begin",
   description: "Check prerequisites including browser support, network requirements, and account access.",
  },
  {
    title: "Sign in for the first time",
    description:"Learn how to sign in using your organisation's SSO provider or email and password."
  },
  {
    title: "Enable two-factor authentication",
    description:"Secure your account by enabling 2FA via an authenticator app or SMS."
  },
  {
    title:"Update your profile",
    description:"Add your name, role, and notification preferences to personalise your experience."
  },
  {
    title:"Understand your role",
    description:"Learn what access level you have been assigned and what actions you can perform."
  }
]

const NavigateThePlatform: CardInterface[] = [
  {
    title: "Dashboard overview",
    description:"Understand what the dashboard shows — compliance scores, open tasks, and recent activity."
  },
  {
    title:"Controls library",
    description:"Browse and filter the full list of controls assigned to your organisation."
  },
  {
    title:"Risk register",
    description:"View logged risks, their severity ratings, and their linked controls."
  },
  {
    title:"My tasks",
    description:"Find and complete the controls and assessments that have been assigned to you."
  },
  {
    title:"Notifications",
    description:"Understand how reachGRC notifies you of deadlines, status changes, and comments."
  }
]

const CompleteYourAssessment: CardInterface[] = [
  {
    title: "Review an assigned control",
    description:"Open a control assigned to you, review its requirements, and submit your response.",
    badge:"Guide",
    icons:<MdOutlineAssessment />
  },
  {
    title: "Upload evidence",
    description:"Attach documents or links to a control to satisfy its evidence requirements.",
    badge:"Guide",
    icons:<MdOutlineAssessment />
  },
  {
    title: "Add a comment",
    description:"Collaborate with your team by leaving comments on controls, risks, and assessments.",
    badge:"Guide",
    icons:<MdOutlineAssessment />
  },
  {
    title: "Mark a control as complete",
    description:"Learn control statuses and how to mark one as compliant or remediated.",
    badge:"Guide",
    icons:<MdOutlineAssessment />
  },
]

const GetStartedForUsers = () => (
  <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
      Get started for users
    </h1>
    <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-10">
      Everything a new reachGRC user needs to get up and running — from signing
      in to completing your first compliance assessment.
    </p>

    <section className="mb-12">
      <SectionHeader
        title="Set up your account"
        subtitle="Complete these steps before you start working in reachGRC."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SetUpAccount.map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]"
          >
            <CardHeader>
              <CardTitle className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
                <p className="flex items-center">
                  {item.title}{" "}
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " />{" "}
                </p>
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
        title="Navigate the platform"
        subtitle="Learn the key areas of the reachGRC interface."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {NavigateThePlatform.map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out cursor-pointer dark:text-[]"
          >
            <CardHeader>
              <CardTitle className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
                <p className="flex items-center">
                  {item.title}{" "}
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " />{" "}
                </p>
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
        title="Complete your first assessment"
        subtitle="Step through your first compliance assessment from start to finish."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CompleteYourAssessment.map((item, idx) => (
          <Card
            key={idx}
            className="group hover:shadow-xl hover:scale-130 hover:bg-linear-to-l hover:from-[#FF3918] hover:to-[#FF6A00] hover:z-10 dark:bg-zinc-800 border rounded-xl hover:rounded-none dark:border-zinc-700 hover:border-0  border-[#dee3ea] transition-all ease-in-out  cursor-pointer duration-75"
          >
            <CardHeader>
              <CardTitle className="relative w-fit dark:text-white group-hover:text-white  transition-colors ease-in-out ">
                <p className="flex items-center">
                  {item.title}{" "}
                  <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center delay-150 " />{" "}
                </p>
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
          to="../overview"
          className="group relative  flex flex-col cursor-pointer text-[#FF6A00]"
        >
          <p className="flex items-center gap-1.5 justify-between">
            <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 rotate-180 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center " />
            Overview
          </p>
          <div className="absolute right-0 bottom-0 h-0.5 w-full origin-right scale-x-0 bg-[#FF6A00] transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
        </Link>
        
        <Link
          to="../tutorials"
          className="group relative  flex flex-col cursor-pointer text-[#FF6A00]"
        >
          <p className="flex items-center justify-between">
            Tutorials{" "}
            <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-xl group-hover:translate-x-1 transition-all ease-in-out flex items-center " />
          </p>
          <div className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-[#FF6A00] transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
        </Link>
      </div>

      <Feedback />
    </div>
  </div>
);

export default GetStartedForUsers;