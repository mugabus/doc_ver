import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Layout } from '../components/Layout';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only: no backend wired for the contact form
    setSent(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Pour toute question concernant la certification CIRGL, n'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Coordonnées */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">info@ceec-icglr-cirgl.org</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-gray-600">Téléphone</p>
                  <p className="text-gray-900 font-medium">+243 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-gray-600">Adresse</p>
                  <p className="text-gray-900 font-medium">
                    Kinshasa, République Démocratique du Congo
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-8 text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">Support 24/7</h3>
            <p className="text-sky-100 mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions concernant la certification CIRGL.
            </p>
            <div className="flex items-center space-x-4">
              <Clock className="w-6 h-6" />
              <span className="text-sky-100">Disponible 24 heures sur 24, 7 jours sur 7</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
