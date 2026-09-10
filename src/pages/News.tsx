import { Layout } from '../components/Layout';

const newsItems = [
  {
    date: '13 Février 2026',
    title: 'Nouveau système de certificats électroniques lancé',
    category: 'Annonce',
    excerpt: "La CIRGL lance sa plateforme officielle de certification et de vérification des minerais, permettant l'émission de certificats électroniques avec code QR d'authentification."
  },
  {
    date: '10 Février 2026',
    title: 'Formation des agents de certification dans la région des Grands Lacs',
    category: 'Événement',
    excerpt: "Une session de formation de deux semaines est organisée pour les agents agréés des 12 pays membres sur l'utilisation du nouveau système de certification."
  },
  {
    date: '05 Février 2026',
    title: 'Rencontre des ministres de la CIRGL à Kinshasa',
    category: 'Actualité',
    excerpt: "Les ministres en charge des minerais des pays membres se réunissent pour renforcer la coopération régionale et harmoniser les standards de certification."
  }
];

export function News() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Actualités</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Restez informé des dernières nouvelles et événements de la CIRGL.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((news, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <span className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded-full">{news.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                <p className="text-gray-600">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}