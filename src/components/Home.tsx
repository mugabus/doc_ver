import { useState } from 'react';
import { 
  FileCheck, 
  Shield, 
  Globe, 
  Search,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  Users,
  Award,
  FileText,
  Building
} from 'lucide-react';

export function Home() {
  const [verifyCode, setVerifyCode] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.trim()) {
      // Redirect to viewer with code parameter for database lookup
      window.location.href = `/?code=${encodeURIComponent(verifyCode.trim().toUpperCase())}`;
    }
  };

  const newsItems = [
    {
      date: '13 Février 2026',
      title: 'Nouveau système de certificats électroniques lancé',
      category: 'Annonce'
    },
    {
      date: '10 Février 2026',
      title: 'Formation des agents de certification dans la région des Grands Lacs',
      category: 'Événement'
    },
    {
      date: '05 Février 2026',
      title: 'Rencontre des ministres de la CIRGL à Kinshasa',
      category: 'Actualité'
    }
  ];

  const services = [
    {
      icon: FileCheck,
      title: 'Certificat CIRGL',
      description: 'Obtenir un certificat de conformité pour l\'exportation des minerais'
    },
    {
      icon: Search,
      title: 'Vérification',
      description: 'Vérifier l\'authenticité d\'un certificat CIRGL'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Accéder aux formulaires et guides de procédure'
    },
    {
      icon: Users,
      title: 'Espace Exportateurs',
      description: 'Portail dédié aux opérateurs économiques'
    }
  ];

  const stats = [
    { value: '10,847', label: 'Certificats émis' },
    { value: '12', label: 'Pays membres' },
    { value: '523', label: 'Exportateurs enregistrés' },
    { value: '99.9%', label: 'Taux de conformité' }
  ];

  const memberCountries = [
    'Angola', 'Burundi', 'Centrafrique', 'Congo', 'RD Congo',
    'Kenya', 'Ouganda', 'Rwanda', 'Soudan', 'Soudan du Sud',
    'Tanzanie', 'Zambie'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Conférence Internationale sur la Région des Grands Lacs
              </span>
            </div>

            {/* TOP BAR PHONE ADDED */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-blue-200 transition">FR</a>
              <span className="text-blue-400">|</span>
              <a href="#" className="hover:text-blue-200 transition">EN</a>

              <span className="text-blue-400">|</span>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+243 971 404 588</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/logo-cr.png"
                alt="CIRGL Logo" 
                className="h-14 object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-blue-900 font-semibold border-b-2 border-blue-600 pb-1">Accueil</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">À propos</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Actualités</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <a href="/" className="text-blue-900 font-semibold py-2">Accueil</a>
                <a href="#" className="text-gray-600 py-2">À propos</a>
                <a href="#" className="text-gray-600 py-2">Services</a>
                <a href="#" className="text-gray-600 py-2">Actualités</a>
                <a href="#" className="text-gray-600 py-2">Contact</a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Système de Certification<br />
                <span className="text-yellow-400">CIRGL</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Plateforme officielle de vérification et de certification des minerais 
                de la Conférence Internationale sur la Région des Grands Lacs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#verification"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg transition shadow-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Vérifier un Certificat
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 text-center">Vérification Rapide</h3>
                <form onSubmit={handleVerify}>
                  <div className="relative">
                    <input
                      type="text"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      placeholder="Entrez le numéro de certificat..."
                      className="w-full px-4 py-4 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                      Vérifier
                    </button>
                  </div>
                </form>
                <p className="text-blue-200 text-sm text-center mt-4">
                  Ex: COD175870
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

    </div>
  );
}
