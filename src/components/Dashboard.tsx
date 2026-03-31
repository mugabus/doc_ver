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
  User,
  Loader2,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { getAllCertificates, getCertificateStats, deleteCertificate, updateCertificate } from '../lib/database';
import { Certificate } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

interface EditFormData {
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

export function Dashboard({ onLogout }: DashboardProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<EditFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Total Certificates', value: '0', icon: FileCheck, color: 'blue' },
    { label: 'Active', value: '0', icon: QrCode, color: 'green' },
    { label: 'Expired', value: '0', icon: BarChart3, color: 'red' },
    { label: 'Exporters', value: '0', icon: Users, color: 'purple' },
  ]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const email = localStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }

      // Fetch certificates
      const certs = await getAllCertificates();
      setCertificates(certs);

      // Fetch stats
      const statsData = await getCertificateStats();
      setStats([
        { label: 'Total Certificates', value: statsData.total.toString(), icon: FileCheck, color: 'blue' },
        { label: 'Active', value: statsData.active.toString(), icon: QrCode, color: 'green' },
        { label: 'Expired', value: statsData.expired.toString(), icon: BarChart3, color: 'red' },
        { label: 'Exporters', value: statsData.exporters.toString(), icon: Users, color: 'purple' },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredCertificates = certificates.filter(cert => {
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

  const handleViewCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const handleBackToList = () => {
    setSelectedCertificate(null);
  };

  const handleDeleteCertificate = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      const success = await deleteCertificate(id);
      if (success) {
        setCertificates(certificates.filter(c => c.id !== id));
        setSelectedCertificate(null);
      }
    }
  };

  const handleEditCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setEditFormData({
      loading_number: cert.loading_number,
      origin_country: cert.origin_country,
      province: cert.province,
      exporter_name: cert.exporter_name,
      exporter_address: cert.exporter_address,
      importer_name: cert.importer_name,
      importer_address: cert.importer_address,
      export_license: cert.export_license,
      shipment_date: cert.shipment_date,
      expiration_date: cert.expiration_date,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedCertificate || !editFormData) return;
    
    setSaving(true);
    const success = await updateCertificate(selectedCertificate.id, editFormData);
    setSaving(false);
    
    if (success) {
      // Update the local state
      const updatedCert = { ...selectedCertificate, ...editFormData } as Certificate;
      setSelectedCertificate(updatedCert);
      // Update the certificates list
      setCertificates(certificates.map(c => c.id === selectedCertificate.id ? updatedCert : c));
      setIsEditing(false);
      setEditFormData(null);
    } else {
      alert('Error updating certificate. Please try again.');
    }
  };

  if (selectedCertificate) {
    // Edit Mode
    if (isEditing && editFormData) {
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
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Edit Certificate</h1>
                    <p className="text-xs text-gray-500">{selectedCertificate.certificate_number}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form className="space-y-6">
                {/* Certificate Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Number</label>
                      <input
                        type="text"
                        value={selectedCertificate.certificate_number}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loading Number *</label>
                      <input
                        type="text"
                        name="loading_number"
                        value={editFormData.loading_number}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Export License *</label>
                      <input
                        type="text"
                        name="export_license"
                        value={editFormData.export_license}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Origin & Dates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Origin & Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin *</label>
                      <input
                        type="text"
                        name="origin_country"
                        value={editFormData.origin_country}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                      <input
                        type="text"
                        name="province"
                        value={editFormData.province}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Date *</label>
                      <input
                        type="date"
                        name="shipment_date"
                        value={editFormData.shipment_date}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date *</label>
                      <input
                        type="date"
                        name="expiration_date"
                        value={editFormData.expiration_date}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Trade Parties */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Parties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exporter Name *</label>
                      <input
                        type="text"
                        name="exporter_name"
                        value={editFormData.exporter_name}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exporter Address *</label>
                      <textarea
                        name="exporter_address"
                        value={editFormData.exporter_address}
                        onChange={handleEditFormChange}
                        required
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Importer Name *</label>
                      <input
                        type="text"
                        name="importer_name"
                        value={editFormData.importer_name}
                        onChange={handleEditFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Importer Address *</label>
                      <textarea
                        name="importer_address"
                        value={editFormData.importer_address}
                        onChange={handleEditFormChange}
                        required
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      );
    }

    // View Mode
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
                  href={`/?code=${selectedCertificate.certificate_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
              <div className="flex items-center justify-end">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleEditCertificate(selectedCertificate)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Certificate
                  </button>
                  <button 
                    onClick={() => handleDeleteCertificate(selectedCertificate.id)}
                    className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition"
                  >
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
            <a href="/" className="flex items-center">
              <img 
                src="/logo-cr.png" 
                alt="CIRGL Logo" 
                className="h-12 object-contain"
              />
            </a>
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <>
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
                                onClick={() => handleEditCertificate(cert)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition"
                                title="Edit Certificate"
                              >
                                <Edit3 className="w-4 h-4 text-blue-600" />
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
                    Showing {filteredCertificates.length} of {certificates.length} certificates
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}