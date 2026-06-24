import { 
  TbChartPie, 
  TbRocket, 
  TbBook, 
  TbShieldCheck, 
  TbDatabase, 
  TbHeadset,
  TbPhoto,
  TbFileTypePdf,
  TbLayoutDashboard,
  TbPalette,
  TbHelpCircle
} from "react-icons/tb";
import { HiOutlineKey, HiOutlineBuildingOffice2, HiOutlineGlobeAlt } from "react-icons/hi2";
import { RiPulseLine, RiShieldLine, RiShareLine } from "react-icons/ri";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

/**
 * Sidebar navigation items for the "Getting Started" documentation section.
 */
export const gettingStartedItems: SidebarItem[] = [
  {
    label: "Overview",
    path: "/docs/getting-started/overview",
    icon: <TbChartPie />
  },
  {
    label: "Get started for users",
    path: "/docs/getting-started/get-started-for-users",
    icon: <TbRocket />
  },
  {
    label: "Tutorials",
    path: "/docs/getting-started/tutorials",
    icon: <TbBook />
  },
  {
    label: "Concepts for administrators",
    path: "/docs/getting-started/concepts-for-admins",
    icon: <TbShieldCheck />
  },
  {
    label: "Sample data",
    path: "/docs/getting-started/sample-data",
    icon: <TbDatabase />
  },
  {
    label: "Contact us",
    path: "/docs/getting-started/contact-us",
    icon: <TbHeadset />
  },
];

/**
 * Sidebar navigation items for the "Developers Guide" documentation section.
 */
export const developerGuideItems: SidebarItem[] = [
  {
    label: "Getting Started",
    path: "/docs/developers-guide/get-started",
    icon: <TbRocket />
  },
  {
    label: "API Keys",
    path: "/docs/developers-guide/api-keys",
    icon: <HiOutlineKey />
  },
  {
    label: "Company Profile",
    path: "/docs/developers-guide/company-profile",
    icon: <HiOutlineBuildingOffice2 />
  },
  {
    label: "Logo Management",
    path: "/docs/developers-guide/logo-management",
    icon: <TbPhoto />
  },
  {
    label: "PDF Management",
    path: "/docs/developers-guide/pdf-management",
    icon: <TbFileTypePdf />
  },
  {
    label: "Status & Health",
    path: "/docs/developers-guide/status",
    icon: <RiPulseLine />
  }
];

/**
 * Sidebar navigation items for the "Non-Developers Guide" documentation section.
 */
export const NonDeveloperGuideItems: SidebarItem[] = [
  { 
    label: "Overview", 
    path: "/docs/non-developers-guide/oview", 
    icon: <TbLayoutDashboard /> 
  },
  { 
    label: "Trust Badge", 
    path: "/docs/non-developers-guide/trust-badge", 
    icon: <RiShieldLine /> 
  },
  { 
    label: "Hosted Trust Center", 
    path: "/docs/non-developers-guide/hosted-trust-center", 
    icon: <HiOutlineGlobeAlt /> 
  },
  { 
    label: "Custom Branding", 
    path: "/docs/non-developers-guide/custom-branding", 
    icon: <TbPalette /> 
  },
  { 
    label: "Sharing", 
    path: "/docs/non-developers-guide/sharing", 
    icon: <RiShareLine /> 
  },
  { 
    label: "FAQ", 
    path: "/docs/non-developers-guide/faq", 
    icon: <TbHelpCircle /> 
  },
];
