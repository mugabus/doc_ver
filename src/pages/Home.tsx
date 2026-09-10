import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck,
  Search,
  FileText,
  Users
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { MEMBER_COUNTRIES } from '../lib/memberCountries';

export function Home() {
  const [verifyCode, setVerifyCode] = useState('');
  const navigate = useNavigate();

  // Backwards compatibility: old QR codes / links use /?code=... or /?data=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code') || params.has('data')) {
      navigate(`/verify${window.location.search}`, { replace: true });
    }
  }, [navigate]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.trim()) {
      navigate(`/verify?code=${encodeURIComponent(verifyCode.trim().toUpperCase())}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Système de Certification<br />
                <span className="text-yellow-400">CIRGL</span>
              </h2>
              <p className="text-xl text-sky-100 mb-8 leading-relaxed">
                Plateforme officielle de vérification et de certification des minerais
                de la Conférence Internationale sur la Région des Grands Lacs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <div className="flex w-full">
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Entrez le numéro de certificat (ex. COD2509010001)"
                    className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleVerify}
                    className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white hover:bg-opacity-30 transition rounded-r-lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Vérifier
                  </button>
                </div>
                <Link
                  to="/generate"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-sky-900 hover:bg-opacity-90 backdrop-blur-sm transition rounded-lg"
                >
                  <FileCheck className="w-5 h-5 mr-2" />
                  Générer un Certificat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour la certification CIRGL</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileCheck, title: 'Certificat CIRGL', description: "Obtenir un certificat de conformité pour l'exportation des minerais" },
              { icon: Search, title: 'Vérification', description: "Vérifier l'authenticité d'un certificat CIRGL" },
              { icon: FileText, title: 'Documentation', description: 'Accéder aux formulaires et guides de procédure' },
              { icon: Users, title: 'Espace Exportateurs', description: 'Portail dédié aux opérateurs économiques' }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10,847', label: 'Certificats émis' },
              { value: '12', label: 'Pays membres' },
              { value: '523', label: 'Exportateurs enregistrés' },
              { value: '99.9%', label: 'Taux de conformité' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Countries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pays Membres</h2>
            <p className="text-xl text-gray-600">La CIRGL regroupe 12 pays de la région des Grands Lacs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MEMBER_COUNTRIES.map((country) => (
              <div key={country.name} className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-white hover:shadow-md transition">
                <img
                  src={`/flags/${country.code}.svg`}
                  alt={`Drapeau : ${country.name}`}
                  title={country.name}
                  className="w-24 h-16 object-cover rounded shadow-sm"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
