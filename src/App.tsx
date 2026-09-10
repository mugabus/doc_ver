import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CertificateGenerator } from './components/CertificateGenerator';
import { CertificateViewer } from './components/CertificateViewer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { News } from './pages/News';
import { Contact } from './pages/Contact';
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

  const handleLogin = () => {
    // Route to the page the user originally intended (e.g. /generate)
    const action = new URLSearchParams(window.location.search).get('action');
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return <Dashboard onLogout={handleLogout} />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />

        {/* Certificate verification (via QR scan or manual code) */}
        <Route path="/verify" element={<CertificateViewer />} />
        {/* Backwards-compatible redirects for old query-param URLs */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        {/* Auth-protected pages */}
        <Route path="/generate" element={<RequireAuth><CertificateGenerator /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardRoute /></RequireAuth>} />
        <Route path="/login" element={<LoginRoute />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;