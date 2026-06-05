import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProfile } from './pages/CompanyProfile';

import { ThemeProvider } from "./ThemeContext";


import DocsLayout from "./pages/DevelopersGuide";
import GettingStarted from "./components/DocumentsComponent/GettingStarted";
 
import Overview from "./components/DocumentsComponent/GettingStartedComponents/Overview";
import GetStartedForUsers from "./components/DocumentsComponent/GettingStartedComponents/GetStartedForUsers";
import GettingStartedTutorial from "./components/DocumentsComponent/GettingStartedComponents/Tutorial";
import ConceptsForAdmins from "./components/DocumentsComponent/GettingStartedComponents/ConceptForAdmin"
import SampleData from "./components/DocumentsComponent/GettingStartedComponents/SampleData";
import ContactUs from "./components/DocumentsComponent/GettingStartedComponents/ContactUs";

import DeveloperGuide from './components/DocumentsComponent/developerGuide';
import GetStarted from './components/DocumentsComponent/DeveloperGuideComponents/GettingStarted';
import ApiKeys from './components/DocumentsComponent/DeveloperGuideComponents/ApiKey';
import Companyprofile from './components/DocumentsComponent/DeveloperGuideComponents/CompanyProfile';
import LogoManagement from './components/DocumentsComponent/DeveloperGuideComponents/LogoManagement';
import PdfManagement from './components/DocumentsComponent/DeveloperGuideComponents/PdfManagement';
import StatusHealth from './components/DocumentsComponent/DeveloperGuideComponents/StatusHealth';


import NonDevelopersGuide from './components/DocumentsComponent/NonDeveloperGuide';
import NonDeveloperOverview from './components/DocumentsComponent/NonDevelopersGuide/Overview';
import TrustBadge from './components/DocumentsComponent/NonDevelopersGuide/TrustBadge';
import HostedTrustCenter from './components/DocumentsComponent/NonDevelopersGuide/Hosted';
import CustomBranding from './components/DocumentsComponent/NonDevelopersGuide/CustomBranding';
import Sharing from './components/DocumentsComponent/NonDevelopersGuide/Sharing';
import FAQ from './components/DocumentsComponent/NonDevelopersGuide/Faq';

import Contactus from './components/DocumentsComponent/ContactUs';

import StatusPage from './components/DocumentsComponent/Status';

import TutorialPage from './components/DocumentsComponent/TutorialsPage';

// const ComingSoon = ({ title }: { title: string }) => (
//   <div className="flex flex-col items-center justify-center h-full text-center px-8">
//     <p className="text-4xl mb-4">🚧</p>
//     <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">{title}</h2>
//     <p className="text-sm text-gray-500 dark:text-zinc-400">This section is coming soon.</p>
//   </div>
// );

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/admin/company/:id" element={<CompanyProfile />} />
          <Route path="/" element={<Navigate to="/company/1" replace />} />

          <Route path="/docs" element={<DocsLayout />}>
            {/* Getting Started — sidebar + nested sub-routes */}
            <Route path="getting-started" element={<GettingStarted />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route
                path="get-started-for-users"
                element={<GetStartedForUsers />}
              />
              <Route path="tutorials" element={<GettingStartedTutorial />} />
              <Route
                path="concepts-for-admins"
                element={<ConceptsForAdmins />}
              />
              <Route path="sample-data" element={<SampleData />} />
              <Route path="contact-us" element={<ContactUs />} />
            </Route>

            <Route path="developers-guide" element={<DeveloperGuide />}>
              <Route index element={<Navigate to="get-started" replace />} />

              <Route path="get-started" element={<GetStarted />} />

              <Route path="api-keys" element={<ApiKeys />} />

              <Route path="company-profile" element={<Companyprofile />} />
              <Route path="logo-management" element={<LogoManagement />} />
              <Route path="pdf-management" element={<PdfManagement />} />
              <Route path="pdf-management" element={<PdfManagement />} />
              <Route path="status" element={<StatusHealth />} />
            </Route>



            <Route path="non-developers-guide" element={<NonDevelopersGuide />}>


              <Route index element={<Navigate to="oview" replace />} />

              <Route
                path="oview"
                // element={<ComingSoon title="Hello We WIll be back" />}
                element={<NonDeveloperOverview />}
              />
              <Route
                path="trust-badge"
                element={<TrustBadge/>}
              />
              <Route
                path="hosted-trust-center"
                element={<HostedTrustCenter />}
              />
              <Route
                path="custom-branding"
                element={<CustomBranding/>}
              />
              <Route
                path="sharing"
                element={<Sharing />}
              />
              <Route
                path="faq"
                element={<FAQ/>}
              />
            </Route>
            <Route
              path="contact-us"
              element={<Contactus />}
            />
            <Route path="tutorial" element={<TutorialPage/>} />
            <Route path="status" element={<StatusPage/>} />

            {/* Catch-all redirect */}
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