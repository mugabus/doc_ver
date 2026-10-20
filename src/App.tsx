import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CertificateGenerator } from './components/CertificateGenerator';
import { CertificateViewer } from './components/CertificateViewer';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Route guard: pages like /generate and /dashboard require authentication
function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
}

function LoginRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Route to the page the user originally intended (e.g. /generate).
    const action = new URLSearchParams(location.search).get('action');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated && action === 'generate') {
      navigate('/generate');
    } else {
      navigate('/dashboard');
    }
  };

  return <Login onLogin={handleLogin} />;
}

function DashboardRoute() {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    // Full navigation to the public site home page (frontend/index.html),
    // which is now served at "/".
    window.location.assign('/');
  };

  return <Dashboard onLogout={handleLogout} />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin routes — same paths as the original SPA (/login, /dashboard,
            /generate). They are served by frontend/admin.html; the dev server
            (plugin in vite.config.ts) and vercel.json rewrites map these
            extensionless paths to the admin entry file. */}
        <Route path="/generate" element={<RequireAuth><CertificateGenerator /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardRoute /></RequireAuth>} />
        <Route path="/login" element={<LoginRoute />} />

        {/* Certificate verification (via QR scan or manual code) */}
        <Route path="/verify" element={<CertificateViewer />} />

        {/* Opening the entry file directly lands on the dashboard */}
        <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin.html" element={<Navigate to="/dashboard" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;