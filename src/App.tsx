import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProfile } from './pages/CompanyProfile';
import { DeveloperGuide } from "./pages/DeveloperGuide";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/company/:id" element={<CompanyProfile />} />
        <Route path="/admin/company/:id" element={<CompanyProfile />} />
        
        {/* Redirect root to a demo company for easier testing */}
        <Route path="/" element={<Navigate to="/company/1" replace />} />
        <Route path="/developers/guide" element={<DeveloperGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
