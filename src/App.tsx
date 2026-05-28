import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProfile } from './pages/CompanyProfile';
import { UIDeveloperGuide } from "./pages/UIDeveloperGuide";
import DevelopersGuide from './pages/DevelopersGuide';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/company/:id" element={<CompanyProfile />} />
        <Route path="/admin/company/:id" element={<CompanyProfile />} />
        
        {/* Redirect root to a demo company for easier testing */}
        <Route path="/" element={<Navigate to="/company/1" replace />} />
        <Route path="/developers/guide" element={<DevelopersGuide/>} />

      </Routes>
    </Router>
  );
}

export default App;
