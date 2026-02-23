import { useState, useEffect } from 'react';
import { CertificateGenerator } from './components/CertificateGenerator';
import { CertificateViewer } from './components/CertificateViewer';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';

type AppView = 'home' | 'generator' | 'dashboard' | 'viewer' | 'login';

function App() {
  const [view, setView] = useState<AppView>('home');

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';

    const params = new URLSearchParams(window.location.search);
    const hasData = params.has('data');
    const hasCode = params.has('code');
    const action = params.get('action');

    if (hasCode) {
      // Certificate verification via code (from QR scan)
      setView('viewer');
    } else if (hasData) {
      const data = params.get('data');
      if (data) {
        try {
          const parsed = JSON.parse(decodeURIComponent(data));
          if (parsed.certificate_number) {
            setView('viewer');
          }
        } catch {
          setView('viewer');
        }
      }
    } else if (action === 'generate') {
      setView('generator');
    } else if (action === 'dashboard') {
      if (authStatus) {
        setView('dashboard');
      } else {
        setView('login');
      }
    } else if (action === 'verify') {
      setView('home');
    } else {
      setView('home');
    }
  }, []);

  const handleLogin = () => {
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setView('home');
    window.location.href = '/';
  };

  // Render based on current view
  switch (view) {
    case 'generator':
      return <CertificateGenerator />;
    case 'dashboard':
      return <Dashboard onLogout={handleLogout} />;
    case 'login':
      return <Login onLogin={handleLogin} />;
    case 'viewer':
      return <CertificateViewer />;
    case 'home':
    default:
      return <Home />;
  }
}

export default App;