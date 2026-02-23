import { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, FileCheck, Loader2, Eye } from 'lucide-react';
import { saveCertificate, generateCertificateNumber } from '../lib/database';

interface CertificateData {
  certificate_number: string;
  loading_number: string;
  origin_country: string;
  province: string;
  exporter_name: string;
  exporter_address: string;
  importer_name: string;
  importer_address: string;
  export_license: string;
  shipment_date: string;
  expiration_date: string;
}

export function CertificateGenerator() {
  const [formData, setFormData] = useState<CertificateData>({
    certificate_number: '',
    loading_number: '',
    origin_country: '',
    province: '',
    exporter_name: '',
    exporter_address: '',
    importer_name: '',
    importer_address: '',
    export_license: '',
    shipment_date: '',
    expiration_date: '',
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [previewData, setPreviewData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setSavedToDb(false);

    try {
      // Generate certificate number if not provided
      const certificateNumber = formData.certificate_number || generateCertificateNumber();
      const dataToSave = { ...formData, certificate_number: certificateNumber };

      // Save to Supabase database
      const saved = await saveCertificate(dataToSave);
      
      if (saved) {
        setSavedToDb(true);
        setFormData(prev => ({ ...prev, certificate_number: certificateNumber }));
      }

      // Generate QR code with certificate number for verification
      const certificateUrl = `${window.location.origin}/?code=${certificateNumber}`;

      const qrCode = await QRCode.toDataURL(certificateUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#1e40af',
          light: '#ffffff',
        },
      });

      setQrCodeUrl(qrCode);
      setPreviewData({ ...dataToSave });
      setSuccess(true);
    } catch (error) {
      console.error('Error creating certificate:', error);
      alert('Error creating certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `certificate-${formData.certificate_number}-qr.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const showPreview = () => {
    if (previewData) {
      alert('Certificate Preview:\n\n' + JSON.stringify(previewData, null, 2));
    }
  };

  const loadSampleData = () => {
    setFormData({
      certificate_number: '',
      loading_number: 'MSI 079109135400 2117 26',
      origin_country: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO',
      province: 'ITURI',
      exporter_name: 'ROYAL IMPORT EXPORT SARL',
      exporter_address: '1148 AV.PROVINCE C/GOMBE KINSHASA',
      importer_name: 'BWAMBALE SINDANI/GOLDMANIA JEWELLERY LLC',
      importer_address: 'DUBAI U.A.E',
      export_license: 'CN-5007099',
      shipment_date: new Date().toISOString().split('T')[0],
      expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificate QR Generator</h1>
          <p className="text-gray-600 text-lg">Generate QR codes for CIRGL certificates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Certificate Details</h2>
              <button
                type="button"
                onClick={loadSampleData}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Load Sample Data
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Number (CIRGL) - Leave empty to auto-generate
                </label>
                <input
                  type="text"
                  name="certificate_number"
                  value={formData.certificate_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated if empty"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loading Number *
                </label>
                <input
                  type="text"
                  name="loading_number"
                  value={formData.loading_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MSI 079109135400 2117 26"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin Country *
                  </label>
                  <input
                    type="text"
                    name="origin_country"
                    value={formData.origin_country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province *
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Province"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exporter Name *
                </label>
                <input
                  type="text"
                  name="exporter_name"
                  value={formData.exporter_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exporter Address *
                </label>
                <textarea
                  name="exporter_address"
                  value={formData.exporter_address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Importer Name *
                </label>
                <input
                  type="text"
                  name="importer_name"
                  value={formData.importer_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Importer Address *
                </label>
                <textarea
                  name="importer_address"
                  value={formData.importer_address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Export License Number *
                </label>
                <input
                  type="text"
                  name="export_license"
                  value={formData.export_license}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="CN-5007099"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipment Date *
                  </label>
                  <input
                    type="date"
                    name="shipment_date"
                    value={formData.shipment_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date *
                  </label>
                  <input
                    type="date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5 mr-2" />
                    Generate QR Code
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">QR Code Preview</h2>

            {!qrCodeUrl && !success && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <QrCode className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-gray-500">Fill in the form and generate a QR code</p>
              </div>
            )}

            {success && qrCodeUrl && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl flex items-center justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="max-w-full rounded-lg shadow-lg" />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">QR Code Generated Successfully!</p>
                    <p className="text-green-700 text-sm mt-1">
                      Certificate Number: <strong>{formData.certificate_number}</strong>
                    </p>
                    {savedToDb && (
                      <p className="text-green-700 text-sm mt-1">✓ Saved to database</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={downloadQRCode}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download QR Code
                  </button>

                  <a
                    href={`/?code=${formData.certificate_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
                  >
                    View Certificate
                  </a>
                </div>

                <button
                  type="button"
                  onClick={showPreview}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview Certificate Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}