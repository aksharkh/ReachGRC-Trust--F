import { GrOverview } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlinePlayLesson, MdOutlineContactSupport } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { TbDatabaseImport } from "react-icons/tb";

export const gettingStartedItems = [
  {
    label: "Overview",
    path: "overview",
    icon: <GrOverview/>
  },
  {
    label: "Get started for users",
    path: "get-started-for-users",
    icon: <HiOutlineLightBulb />
  },
  {
    label: "Tutorials",
    path: "tutorials",
    icon: <MdOutlinePlayLesson />
  },
  {
    label: "Concepts for administrators",
    path: "concepts-for-admins",
    icon: <RiAdminLine />
  },
  {
    label: "Sample data",
    path: "sample-data",
    icon: <TbDatabaseImport />
  },
  {
    label: "Contact us",
    path: "contact-us",
    icon: <MdOutlineContactSupport />
  }
];