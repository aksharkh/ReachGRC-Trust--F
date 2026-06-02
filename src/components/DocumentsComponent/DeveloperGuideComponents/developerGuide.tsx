
import { TbRocket } from "react-icons/tb";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbPhoto } from "react-icons/tb";
import { TbFileTypePdf } from "react-icons/tb";
import { RiPulseLine } from "react-icons/ri";

export const developerGuideItems = [
  {
    label: "Getting Started",
    path: "get-started",
    icon: <TbRocket />
  },
  {
    label: "API Keys",
    path: "api-keys",
    icon: <HiOutlineKey />
  },
  {
    label: "Company Profile",
    path: "company-profile",
    icon: <HiOutlineBuildingOffice2/>
  },
  {
    label: "Logo Management",
    path: "logo-management",
    icon: <TbPhoto />
  },
  {
    label: "PDF Management",
    path: "pdf-management",
    icon: <TbFileTypePdf/>
  },
  {
    label: "Status & Health",
    path: "status",
    icon: <RiPulseLine/>
  }
];