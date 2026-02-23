import { useEffect, useState } from 'react';
import { FileCheck, MapPin, Building2, Calendar, CreditCard, Package, AlertCircle } from 'lucide-react';
import { getCertificateByNumber } from '../lib/database';
import { Certificate } from '../lib/supabase';

export function CertificateViewer() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        
        // Check for certificate code (from QR scan)
        const code = params.get('code');
        
        // Also check for full data (legacy support)
        const dataParam = params.get('data');

        if (code) {
          // Fetch from database by certificate number
          const cert = await getCertificateByNumber(code);
          if (cert) {
            setCertificate(cert);
          } else {
            setError('Certificate not found. Please check the certificate number and try again.');
          }
        } else if (dataParam) {
          // Legacy: decode from URL parameter
          const decodedData = JSON.parse(decodeURIComponent(dataParam)) as Certificate;
          setCertificate(decodedData);
        } else {
          setError('No certificate code provided');
        }
      } catch (err) {
        console.error('Error loading certificate:', err);
        setError('Failed to load certificate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Found</h2>
          <p className="text-gray-600">{error || 'The certificate you are looking for does not exist.'}</p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const isExpired = new Date(certificate.expiration_date) <= new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="CIRGL Logo" 
                className="h-12 object-contain"
              />
            </a>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/logo.png" 
                  alt="CIRGL Logo" 
                  className="w-20 h-20 object-contain bg-white rounded-full p-2"
                />
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                CERTIFICAT DE LA CONFÉRENCE INTERNATIONALE
              </h1>
              <p className="text-blue-100 text-center text-lg">
                SUR LA REGION DES GRANDS LACS
              </p>
            </div>

            <div className="p-8 space-y-6">
              {/* Status Banner */}
              {isExpired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">This certificate has expired</p>
                    <p className="text-red-700 text-sm">Expiration date: {new Date(certificate.expiration_date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}

              {!isExpired && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">✓ Valid Certificate</p>
                    <p className="text-green-700 text-sm">This certificate is valid until {new Date(certificate.expiration_date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Chargement N°</p>
                      <p className="text-lg font-semibold text-gray-900">{certificate.loading_number}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Numéro du Certificat CIRGL</p>
                      <p className="text-lg font-semibold text-gray-900">{certificate.certificate_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Origine</p>
                    <p className="text-lg font-semibold text-gray-900">{certificate.origin_country}</p>
                    <p className="text-md text-gray-700">Province: {certificate.province}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Exportateur</p>
                    <p className="text-lg font-semibold text-gray-900">{certificate.exporter_name}</p>
                    <p className="text-md text-gray-700">{certificate.exporter_address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 mt-4">
                  <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">Importateur</p>
                    <p className="text-lg font-semibold text-gray-900">{certificate.importer_name}</p>
                    <p className="text-md text-gray-700">{certificate.importer_address}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-600">N° de Licence d'Exportation</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{certificate.export_license}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-600">Date d'Expédition</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {new Date(certificate.shipment_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 ${isExpired ? 'bg-red-50' : 'bg-orange-50'}`}>
                    <div className="flex items-start space-x-2">
                      <Calendar className={`w-4 h-4 mt-1 flex-shrink-0 ${isExpired ? 'text-red-600' : 'text-orange-600'}`} />
                      <div>
                        <p className="text-xs font-medium text-gray-600">Date d'Expiration</p>
                        <p className={`text-sm font-semibold mt-1 ${isExpired ? 'text-red-700' : 'text-gray-900'}`}>
                          {new Date(certificate.expiration_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Ce certificat a été généré électroniquement et est valide sans signature
              </p>
              {certificate.created_at && (
                <p className="text-xs text-gray-400 text-center mt-1">
                  Created: {new Date(certificate.created_at).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}