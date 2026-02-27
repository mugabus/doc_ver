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
            <div className="hidden md:flex items-center space-x-6">
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

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-900">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La CIRGL offre une gamme de services pour faciliter le commerce légal des minerais 
              dans la région des Grands Lacs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <a
                key={index}
                href="#"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                À propos de la CIRGL
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                La Conférence Internationale sur la Région des Grands Lacs (CIRGL) est une 
                organisation intergouvernementale composée de 12 pays membres, créée pour 
                promouvoir la paix, la sécurité et le développement dans la région.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Le système de certification CIRGL permet de garantir que les minerais 
                exportés proviennent de sources légales et ne financent pas les conflits 
                armés dans la région.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-gray-700">Sécurité garantie</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-gray-700">Normes internationales</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Pays Membres</h3>
              <div className="grid grid-cols-2 gap-4">
                {memberCountries.map((country, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-100">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section id="verification" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Vérification de Certificat</h2>
              <p className="text-gray-600">
                Entrez le numéro de certificat pour vérifier son authenticité
              </p>
            </div>
            
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="Exemple: COD175870"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Vérifier le Certificat
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Comment ça marche?</h4>
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  Entrez le numéro de certificat inscrit sur votre document
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  Le système recherche dans notre base de données sécurisée
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  Consultez les détails du certificat et confirmez son authenticité
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Actualités</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Voir toutes les actualités <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <Building className="w-16 h-16 text-white/30" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
                    {news.category}
                  </span>
                  <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    Lire la suite <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un Certificat CIRGL?</h2>
          <p className="text-blue-200 mb-8 text-lg">
            Contactez nos services pour obtenir assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#verification"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg transition shadow-lg"
            >
              Vérifier un Certificat
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
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

            {/* Quick Links */}
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

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Boulevard du 30 Juin, Kinshasa, RD Congo</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <span>+243 XXX XXX XXX</span>
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

          {/* Bottom Bar */}
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
