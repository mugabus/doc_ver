import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Globe,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/news', label: 'Actualités' },
  { to: '/contact', label: 'Contact' }
];

const memberCountries = [
  'Angola', 'Burundi', 'Centrafrique', 'Congo', 'RD Congo',
  'Kenya', 'Ouganda', 'Rwanda', 'Soudan', 'Soudan du Sud',
  'Tanzanie', 'Zambie'
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-sky-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Conférence Internationale sur la Région des Grands Lacs
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-sky-200 transition">FR</a>
              <span className="text-sky-400">|</span>
              <a href="#" className="hover:text-sky-200 transition">EN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-sky-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo-cr.png"
                alt="CIRGL Logo"
                className="h-14 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-sky-900 font-semibold border-b-2 border-sky-600 pb-1'
                      : 'text-gray-600 hover:text-sky-900 transition'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-sky-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-sky-200">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      location.pathname === item.to
                        ? 'text-sky-900 font-semibold py-2'
                        : 'text-gray-600 py-2'
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Page Content */}
      {children}


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="/logo-cr.png"
                alt="CIRGL Logo"
                className="h-12 object-contain mb-4"
              />
              <p className="text-gray-400">
                Système officiel de certification et de vérification des minerais de la CIRGL.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">À propos</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-white transition">Actualités</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Certification</h4>
              <ul className="space-y-2 text-sm">
                
                <li><Link to="/verify" className="text-gray-400 hover:text-white transition">Vérifier un Certificat</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">Processus de Certification</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Région</h4>
              <ul className="space-y-2 text-sm">
                {memberCountries.slice(0, 6).map((country, index) => (
                  <li key={index}><span className="text-gray-400">{country}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CIRGL Certificate System. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
