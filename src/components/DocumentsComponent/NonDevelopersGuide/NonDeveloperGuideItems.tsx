import { TbLayoutDashboard } from "react-icons/tb";
import { RiShieldLine } from "react-icons/ri";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { TbPalette } from "react-icons/tb";
import { RiShareLine } from "react-icons/ri";
import { TbHelpCircle } from "react-icons/tb";

export const NonDeveloperGuideItems = [
  { label: "Overview",            path: "oview",             icon: <TbLayoutDashboard /> },
  { label: "Trust Badge",         path: "trust-badge",          icon: <RiShieldLine /> },
  { label: "Hosted Trust Center", path: "hosted-trust-center",  icon: <HiOutlineGlobeAlt /> },
  { label: "Custom Branding",     path: "custom-branding",      icon: <TbPalette /> },
  { label: "Sharing",             path: "sharing",              icon: <RiShareLine /> },
  { label: "FAQ",                 path: "faq",                  icon: <TbHelpCircle /> },
];