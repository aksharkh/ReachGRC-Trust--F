import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProfile } from './pages/CompanyProfile';

import { ThemeProvider } from "./ThemeContext";


import DocsLayout from "./pages/DevelopersGuide";
import GettingStarted from "./components/DocumentsComponent/GettingStarted";
 
import Overview from "./components/DocumentsComponent/GettingStartedComponents/Overview";
import GetStartedForUsers from "./components/DocumentsComponent/GettingStartedComponents/GetStartedForUsers";
import Tutorials from "./components/DocumentsComponent/GettingStartedComponents/Tutorial";
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

const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8">
    <p className="text-4xl mb-4">🚧</p>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">{title}</h2>
    <p className="text-sm text-gray-500 dark:text-zinc-400">This section is coming soon.</p>
  </div>
);

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
              <Route path="overview"                element={<Overview />} />
              <Route path="get-started-for-users"  element={<GetStartedForUsers />} />
              <Route path="tutorials"               element={<Tutorials />} />
              <Route path="concepts-for-admins"     element={<ConceptsForAdmins />} />
              <Route path="sample-data"             element={<SampleData />} />
              <Route path="contact-us"              element={<ContactUs />} />
            </Route>
 

<Route path="developers-guide" element={<DeveloperGuide />}>
  <Route
    index
    element={<Navigate to="get-started" replace />}
  />

  <Route
    path="get-started"
    element={<GetStarted />}
  />

  <Route
    path="api-keys"
    element={<ApiKeys/>}
  />

  <Route
    path="company-profile"
    element={<Companyprofile/>}
  />
  <Route 
    path="logo-management"
    element={<LogoManagement/>}
    />
  <Route 
    path="pdf-management"
    element={<PdfManagement/>}
    />
  <Route 
    path="pdf-management"
    element={<PdfManagement/>}
    />
  <Route 
    path="status"
    element={<StatusHealth/>}
    />

</Route>
            <Route path="non-developers-guide" element={<ComingSoon title="Non-Developers Guide" />} />
            <Route path="contact-us"           element={<ComingSoon title="Contact Us" />} />
            <Route path="tutorial"             element={<ComingSoon title="Tutorials" />} />
            <Route path="status"               element={<ComingSoon title="Status" />} />
 
            {/* Catch-all redirect */}
            <Route index element={<Navigate to="getting-started/overview" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;