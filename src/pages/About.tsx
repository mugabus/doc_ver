import { Link } from 'react-router-dom';
import { Target, Eye, HeartHandshake } from 'lucide-react';
import { Layout } from '../components/Layout';
import { MEMBER_COUNTRIES } from '../lib/memberCountries';

export function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">À propos de la CIRGL</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            La Conférence Internationale sur la Région des Grands Lacs (CIRGL) œuvre pour la paix,
            la sécurité et le développement de la région, notamment à travers la certification
            des minerais.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre Mission</h3>
              <p className="text-gray-600">
                Garantir la traçabilité et la légalité de l'exploitation minière dans la région
                des Grands Lacs afin de rompre le lien entre les ressources naturelles et les
                conflits armés.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre Vision</h3>
              <p className="text-gray-600">
                Une région des Grands Lacs prospère où les ressources minières bénéficient
                durablement aux populations et au développement économique des pays membres.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nos Valeurs</h3>
              <p className="text-gray-600">
                Transparence, intégrité, coopération régionale et respect des standards
                internationaux en matière d'exploitation responsable des ressources naturelles.
              </p>
            </div>
          </div>

          {/* Processus */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Processus de Certification</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Enregistrement', desc: "L'exportateur s'enregistre sur la plateforme et obtient ses identifiants." },
                { step: '2', title: 'Demande', desc: 'Soumission de la demande de certification avec les documents requis.' },
                { step: '3', title: 'Contrôle', desc: 'Vérification par les agents agréés et inspection de la cargaison.' },
                { step: '4', title: 'Émission', desc: "Émission du certificat électronique avec code QR d'authentification." }
              ].map((item) => (
                <div key={item.step} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-10 h-10 mx-auto bg-sky-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pays membres */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Pays Membres</h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
              La CIRGL regroupe 12 pays de la région des Grands Lacs
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
