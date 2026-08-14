import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global fetch interceptor to handle auto-logout on JWT expiration (401/403 errors)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  if (response.status === 401 || response.status === 403) {
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('isAdminAuthenticated');
      window.location.href = '/admin/login?expired=true';
    }
  }
  return response;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
