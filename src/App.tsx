import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CompanyProfile } from "./pages/CompanyProfile";
import { ThemeProvider } from "./ThemeContext";

// Layout & Menu Configurations
import DocsLayout from "./layouts/DocsLayout";
import DocsSectionLayout from "@/components/docs/DocsSectionLayout";
import {
  gettingStartedItems,
  developerGuideItems,
  NonDeveloperGuideItems
} from "@/components/docs/docsMenu";

// Getting Started Child Pages
import Overview from "./pages/docs/getting-started/Overview";
import GetStartedForUsers from "./pages/docs/getting-started/GetStartedForUsers";
import ConceptsForAdmins from "./pages/docs/getting-started/ConceptForAdmin";
import SampleData from "./pages/docs/getting-started/SampleData";

// Developers Guide Child Pages
import GettingStarted from "./pages/docs/developers-guide/GettingStarted";
import ApiKey from "./pages/docs/developers-guide/ApiKey";
import CompanyProfileDevPage from "./pages/docs/developers-guide/CompanyProfile";
import LogoManagement from "./pages/docs/developers-guide/LogoManagement";
import PdfManagement from "./pages/docs/developers-guide/PdfManagement";
import StatusHealth from "./pages/docs/developers-guide/StatusHealth";

// Non-Developers Guide Child Pages
import NonDeveloperOverview from "./pages/docs/non-developers-guide/Overview";
import TrustBadge from "./pages/docs/non-developers-guide/TrustBadge";
import HostedTrustCenter from "./pages/docs/non-developers-guide/Hosted";
import CustomBranding from "./pages/docs/non-developers-guide/CustomBranding";
import Sharing from "./pages/docs/non-developers-guide/Sharing";
import FAQ from "./pages/docs/non-developers-guide/Faq";

// Unified Content Pages
import ContactUsPage from "./pages/docs/ContactUs";
import TutorialsPage from "./pages/docs/Tutorials";
import StatusPage from "./pages/docs/Status";

/**
 * Main application component configuring the React Router navigation tree
 * and wrapping views in the ThemeProvider (Light/Dark mode) and Analytics tracker.
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main Landing & Admin Pages */}
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/admin/company/:id" element={<CompanyProfile />} />
          <Route path="/" element={<Navigate to="/company/1" replace />} />

          {/* Documentation Root Wrapper Layout */}
          <Route path="/docs" element={<DocsLayout />}>
            
            {/* 1. Getting Started Section */}
            <Route 
              path="getting-started" 
              element={<DocsSectionLayout title="Getting Started" items={gettingStartedItems} />}
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="get-started-for-users" element={<GetStartedForUsers />} />
              <Route path="tutorials" element={<Navigate to="/docs/tutorial" replace />} />
              <Route path="concepts-for-admins" element={<ConceptsForAdmins />} />
              <Route path="sample-data" element={<SampleData />} />
              <Route path="contact-us" element={<Navigate to="/docs/contact-us" replace />} />
            </Route>

            {/* 2. Developers Guide Section */}
            <Route 
              path="developers-guide" 
              element={<DocsSectionLayout title="Developers Guide" items={developerGuideItems} />}
            >
              <Route index element={<Navigate to="get-started" replace />} />
              <Route path="get-started" element={<GettingStarted />} />
              <Route path="api-keys" element={<ApiKey />} />
              <Route path="company-profile" element={<CompanyProfileDevPage />} />
              <Route path="logo-management" element={<LogoManagement />} />
              <Route path="pdf-management" element={<PdfManagement />} />
              <Route path="status" element={<StatusHealth />} />
            </Route>

            {/* 3. Non-Developers Guide Section */}
            <Route 
              path="non-developers-guide" 
              element={<DocsSectionLayout title="Non - Developers Guide" items={NonDeveloperGuideItems} />}
            >
              <Route index element={<Navigate to="oview" replace />} />
              <Route path="oview" element={<NonDeveloperOverview />} />
              <Route path="trust-badge" element={<TrustBadge />} />
              <Route path="hosted-trust-center" element={<HostedTrustCenter />} />
              <Route path="custom-branding" element={<CustomBranding />} />
              <Route path="sharing" element={<Sharing />} />
              <Route path="faq" element={<FAQ />} />
            </Route>

            {/* General Unified Section Views */}
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="tutorial" element={<TutorialsPage />} />
            <Route path="status" element={<StatusPage />} />

            {/* Default Docs Catch-all redirect */}
            <Route
              index
              element={<Navigate to="getting-started/overview" replace />}
            />
          </Route>
        </Routes>
      </Router>

      <Analytics />
    </ThemeProvider>
  );
}

export default App;