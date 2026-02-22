import { useState, useEffect } from 'react';
import { 
  FileCheck, 
  QrCode, 
  Search, 
  Download, 
  Plus, 
  BarChart3, 
  Users, 
  Globe,
  Calendar,
  ArrowLeft,
  Eye,
  Trash2,
  Filter,
  LogOut,
  User
} from 'lucide-react';

interface Certificate {
  id: string;
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
  created_at: string;
}

// Sample data for demonstration
const sampleCertificates: Certificate[] = [
  {
    id: '1',
    certificate_number: 'COD175870',
    loading_number: 'MSI 079109135400 2117 26',
    origin_country: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO',
    province: 'ITURI',
    exporter_name: 'ROYAL IMPORT EXPORT SARL',
    exporter_address: '1148 AV.PROVINCE C/GOMBE KINSHASA',
    importer_name: 'BWAMBALE SINDANI/GOLDMANIA JEWELLERY LLC',
    importer_address: 'DUBAI U.A.E',
    export_license: 'CN-5007099',
    shipment_date: '2026-02-13',
    expiration_date: '2026-02-25',
    created_at: '2026-02-13T10:30:00Z',
  },
  {
    id: '2',
    certificate_number: 'COD175871',
    loading_number: 'MSI 079109135400 2117 27',
    origin_country: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO',
    province: 'NORD-KIVU',
    exporter_name: 'MINERALS CONGO SARL',
    exporter_address: '85 AV. LUMUMBA GOMA',
    importer_name: 'DUBAI MINERALS TRADING',
    importer_address: 'DUBAI U.A.E',
    export_license: 'CN-5007100',
    shipment_date: '2026-02-14',
    expiration_date: '2026-02-28',
    created_at: '2026-02-14T09:15:00Z',
  },
  {
    id: '3',
    certificate_number: 'COD175872',
    loading_number: 'MSI 079109135400 2117 28',
    origin_country: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO',
    province: 'SUD-KIVU',
    exporter_name: 'GOLDEN RESOURCES SPRL',
    exporter_address: '42 AV. INDEPENDANCE BUKAVU',
    importer_name: 'PRECIOUS METALS LTD',
    importer_address: 'ANTWERP, BELGIUM',
    export_license: 'CN-5007101',
    shipment_date: '2026-02-15',
    expiration_date: '2026-03-01',
    created_at: '2026-02-15T14:45:00Z',
  },
];

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const filteredCertificates = sampleCertificates.filter(cert => {
    const matchesSearch = 
      cert.certificate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.exporter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.importer_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') {
      return matchesSearch && new Date(cert.expiration_date) > new Date();
    }
    if (filterStatus === 'expired') {
      return matchesSearch && new Date(cert.expiration_date) <= new Date();
    }
    return matchesSearch;
  });

  const stats = [
    { label: 'Total Certificates', value: '10,847', icon: FileCheck, color: 'blue' },
    { label: 'Active', value: '9,234', icon: QrCode, color: 'green' },
    { label: 'Pending Review', value: '156', icon: BarChart3, color: 'yellow' },
    { label: 'Exporters', value: '523', icon: Users, color: 'purple' },
  ];

  const handleViewCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const handleBackToList = () => {
    setSelectedCertificate(null);
  };

  if (selectedCertificate) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Certificate Details</h1>
                  <p className="text-xs text-gray-500">{selectedCertificate.certificate_number}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={`/?data=${encodeURIComponent(JSON.stringify(selectedCertificate))}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Page
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Certificate Details */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Information</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Certificate Number</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.certificate_number}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Loading Number</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.loading_number}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Export License</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.export_license}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Origin & Dates</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Country of Origin</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.origin_country}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Province</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.province}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600">Shipment Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedCertificate.shipment_date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-600">Expiration Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedCertificate.expiration_date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Parties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">Exporter</h4>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.exporter_name}</p>
                  <p className="text-gray-600 mt-1">{selectedCertificate.exporter_address}</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-indigo-900 mb-3">Importer</h4>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.importer_name}</p>
                  <p className="text-gray-600 mt-1">{selectedCertificate.importer_address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedCertificate.created_at).toLocaleString()}
                </p>
                <div className="flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                    <Download className="w-4 h-4 mr-2" />
                    Download QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CIRGL Dashboard</h1>
                <p className="text-xs text-gray-500">Certificate Management System</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{userEmail}</span>
              </div>
              <a
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Home
              </a>
              <a
                href="/?action=generate"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Certificate
              </a>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Certificates</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'expired')}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exporter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCertificates.map((cert) => {
                  const isExpired = new Date(cert.expiration_date) <= new Date();
                  return (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-blue-600">{cert.certificate_number}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{cert.exporter_name}</p>
                          <p className="text-sm text-gray-500">{cert.exporter_address}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">{cert.province}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-900">
                            {new Date(cert.shipment_date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isExpired
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {isExpired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewCertificate(cert)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Download QR"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No certificates found</p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredCertificates.length} of {sampleCertificates.length} certificates
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}