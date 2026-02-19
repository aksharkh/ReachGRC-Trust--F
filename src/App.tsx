import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CompanyProfile } from './pages/CompanyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/company/:id" element={<CompanyProfile mode="public" />} />
        <Route path="/admin/company/:id" element={<CompanyProfile mode="admin" />} />
        
        {/* Redirect root to a demo company for easier testing */}
        <Route path="/" element={<Navigate to="/company/1" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
