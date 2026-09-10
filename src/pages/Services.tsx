import { Link } from 'react-router-dom';
import { FileCheck, Search, FileText, Users, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';

const services = [
  {
    icon: FileCheck,
    title: 'Certificat CIRGL',
    description: "Obtenir un certificat de conformité pour l'exportation des minerais, reconnu par les 12 pays membres de la région des Grands Lacs.",
    link: '/generate',
    linkLabel: 'Générer un certificat'
  },
  {
    icon: Search,
    title: 'Vérification',
    description: "Vérifier l'authenticité d'un certificat CIRGL en quelques secondes grâce au numéro de certificat ou au code QR.",
    link: '/verify',
    linkLabel: 'Vérifier un certificat'
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Accéder aux formulaires, guides de procédure et références réglementaires pour la certification des minerais.',
    link: '/news',
    linkLabel: 'Consulter les actualités'
  },
  {
    icon: Users,
    title: 'Espace Exportateurs',
    description: 'Portail dédié aux opérateurs économiques : gestion des demandes, suivi des certificats et statistiques.',
    link: '/dashboard',
    linkLabel: 'Accéder au portail'
  }
];

export function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Tout ce dont vous avez besoin pour la certification CIRGL, de la demande
            initiale jusqu'à la vérification du certificat final.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium"
                >
                  {service.linkLabel}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
