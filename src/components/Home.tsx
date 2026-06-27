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

            <div className="hidden md:flex items-center space-x-6">
              {/* PHONE ADDED */}
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+243 971 404 588</span>
              </div>

              <span className="text-blue-400">|</span>

              <a href="#" className="hover:text-blue-200 transition">FR</a>
              <span className="text-blue-400">|</span>
              <a href="#" className="hover:text-blue-200 transition">EN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">

            <a href="/" className="flex items-center">
              <img 
                src="/logo-cr.png"
                alt="CIRGL Logo" 
                className="h-14 object-contain"
              />
            </a>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-blue-900 font-semibold border-b-2 border-blue-600 pb-1">Accueil</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">À propos</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Actualités</a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition">Contact</a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

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

      {/* HERO + REST OF YOUR CODE (UNCHANGED) */}
      {/* ... everything else stays exactly the same until footer ... */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo-cr.png" 
                  alt="CIRGL Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">CIRGL</h3>
                  <p className="text-gray-500 text-xs">Système de Certification</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 max-w-md">
                La Conférence Internationale sur la Région des Grands Lacs œuvre pour la paix, 
                la sécurité et le développement durable dans la région des Grands Lacs africains.
              </p>

              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white transition">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition">À propos</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">Actualités</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Boulevard du 30 Juin, Kinshasa, RD Congo</span>
                </li>

                {/* PHONE ADDED HERE */}
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <span>+243 971 404 588</span>
                </li>

                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <span>info@cirgl.org</span>
                </li>

                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <span>Lun - Ven: 8h - 17h</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm">
              <p className="text-gray-500">
                © {new Date().getFullYear()} CIRGL - Tous droits réservés
              </p>

              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-white transition">Mentions légales</a>
                <a href="#" className="text-gray-500 hover:text-white transition">Politique de confidentialité</a>
                <a href="#" className="text-gray-500 hover:text-white transition">Conditions d'utilisation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
