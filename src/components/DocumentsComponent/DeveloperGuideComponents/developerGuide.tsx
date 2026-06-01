// src/docs/developerGuideItems.tsx

import { FaRocket, FaKey, FaBuilding, FaImage, FaFilePdf, FaHeartbeat } from "react-icons/fa";

export const developerGuideItems = [
  {
    label: "Getting Started",
    path: "get-started",
    icon: <FaRocket />
  },
  {
    label: "API Keys",
    path: "api-keys",
    icon: <FaKey />
  },
  {
    label: "Company Profile",
    path: "company-profile",
    icon: <FaBuilding />
  },
  {
    label: "Logo Management",
    path: "logo-management",
    icon: <FaImage />
  },
  {
    label: "PDF Management",
    path: "pdf-management",
    icon: <FaFilePdf />
  },
  {
    label: "Status & Health",
    path: "status",
    icon: <FaHeartbeat />
  }
];