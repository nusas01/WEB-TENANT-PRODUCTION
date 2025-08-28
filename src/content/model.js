import React from 'react';
import {
  AlertCircle, 
  CreditCard, 
  FileText, 
  BarChart2, 
  Clock,
  Calendar,
  Settings,
  Info,
  CheckCircle,
  Lock,
  AlertTriangle,
  X,
  Trash2,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import { formatDateTime } from './helper';
import { useState } from 'react';


export const FinanceRequiredCard = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 shadow-xl overflow-hidden transition-all hover:shadow-2xl">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <CreditCard size={32} className="text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <AlertCircle size={14} /> Tindakan Diperlukan
              </span>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Prioritas Tinggi
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Layanan Belum Aktif</h2>
            <p className="text-gray-600 mb-4">
              Untuk mengaktifkan layanan, kami memerlukan data keuangan perusahaan Anda. 
              Silakan isi data di bagian <strong>Keuangan</strong> pada dasbor Anda untuk menyelesaikan proses pendaftaran.
            </p>

            <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-100">
              <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
                <FileText size={18} /> Data yang Diperlukan
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Informasi rekening bank perusahaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Dokumen identifikasi pajak (NPWP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Laporan keuangan terbaru</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Dokumen izin usaha</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg font-medium">
                <CreditCard size={18} />
                Lengkapi Data Keuangan
              </button>
              <button className="border border-gray-300 hover:border-amber-500 text-gray-700 hover:text-amber-700 px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                <BarChart2 size={18} />
                Pelajari Persyaratan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-100" />
            <span>Status: Menunggu kelengkapan data</span>
          </div>
          <span className="bg-amber-700 px-3 py-1 rounded-full text-sm">Segera</span>
        </div>
      </div>
    </div>
  );
};


export const ServiceStatusCards = ({expiration_access}) => {
  return (
    <div className="max-w-7xl">
        {/* Card 2: Service Renewal */}
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200 shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Calendar size={32} className="text-red-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                    <AlertCircle size={14} /> Masa Aktif Habis
                  </span>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                    Batas Waktu
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Perpanjangan Layanan Diperlukan</h2>
                <p className="text-gray-600 mb-4">
                  Masa aktif layanan Anda telah berakhir pada {formatDateTime(expiration_access)}. 
                  Segera lakukan perpanjangan untuk melanjutkan akses ke seluruh fitur platform.
                </p>

                <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-100">
                  <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                    <Lock size={18} /> Dampak Jika Tidak Diperpanjang
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Akses ke fitur premium akan dinonaktifkan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Penyimpanan data akan dibatasi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Layanan dukungan prioritas akan ditangguhkan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Pengiriman laporan otomatis akan dihentikan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-red-100" />
                <span>Layanan berakhir: {formatDateTime(expiration_access)} (
                  {Math.floor(
                    (new Date() - new Date(expiration_access)) / (1000 * 60 * 60 * 24)
                  )} hari yang lalu)
                </span>
              </div>
              <span className="bg-red-700 px-3 py-1 rounded-full text-sm">Kadaluarsa</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export const DeleteEmployeeConfirmation = ({ 
  employeeId, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Konfirmasi Penghapusan
            </h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <p className="text-gray-700 text-center mb-2">
            Anda akan menghapus data karyawan dengan ID:
          </p>
          <div className="bg-gray-100 rounded-lg py-3 px-4 mb-4">
            <p className="text-gray-900 font-mono text-center font-bold text-lg">
              {employeeId}
            </p>
          </div>
          <p className="text-red-600 text-center text-sm">
            Tindakan ini tidak dapat dibatalkan!
          </p>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus Karyawan
          </button>
        </div>
      </div>
    </div>
  );
};


export function ServicePreparationNotice() {
  return (
    <div className="max-w-7xl mx-auto lg:p-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header dengan Icon */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Settings className="w-8 h-8 text-green-500 animate-spin" style={{animationDuration: '3s'}} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Clock className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Judul */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Layanan Sedang Dipersiapkan
        </h2>
        <p className="text-gray-600 text-md">
          Kami sedang mempersiapkan pengalaman terbaik untuk Anda
        </p>
      </div>

      {/* Status Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Status Saat Ini</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              Tim kami sedang bekerja keras untuk memastikan semua fitur berfungsi dengan optimal. 
              Layanan akan segera tersedia dengan performa terbaik.
            </p>
          </div>
        </div>
      </div>

      {/* Yang Sedang Dipersiapkan */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          Yang Sedang Kami Persiapkan:
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Optimisasi performa sistem</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Peningkatan keamanan data</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Deploy website store</span>
          </div>
        </div>
      </div>

      {/* Estimasi Waktu */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6" />
          <div>
            <h3 className="font-semibold mb-1">Estimasi Waktu</h3>
            <p className="text-green-100 text-sm">
              Layanan diperkirakan akan tersedia dalam waktu dekat. 
              Kami akan segera menginformasikan ketika sudah siap!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function XenditCredentialsGuide() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedItems, setCopiedItems] = useState({});

  const handleCopy = (text, item) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [item]: true }));
    setTimeout(() => {
      setCopiedItems(prev => ({ ...prev, [item]: false }));
    }, 2000);
  };

  const steps = [
    {
      title: "Business ID",
      path: "Dashboard Xendit → Settings → Your Business and Profile → Your Business → Business ID",
      description: "ID unik yang mengidentifikasi bisnis Anda di sistem Xendit"
    },
    {
      title: "API Key",
      path: "Dashboard Xendit → Settings → Developers → API Keys → Isi Key name → Money-in products Write → Balance Write → Transaction Write → Generate/Copy Api Key",
      description: "Kunci autentikasi untuk mengakses layanan Xendit API",
      sensitive: true
    },
    {
      title: "Webhook Secret",
      path: "Dashboard Xendit → Settings → Developers → Webhooks → View Webhook Verification Token → Copy the token",
      description: "Token untuk memverifikasi webhook dari Xendit",
      sensitive: true
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Cara Mendapatkan Kredensial Xendit
          </h2>
        </div>
        
        {/* Security Warning */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                ⚠️ PERINGATAN KEAMANAN PENTING
              </h3>
              <div className="text-red-700 space-y-2">
                <p className="font-medium">
                  JANGAN PERNAH membagikan kredensial ini kepada siapapun!
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Data ini hanya digunakan untuk mengisi form di sistem kami</li>
                  <li>Kami TIDAK PERNAH meminta kredensial melalui email, WhatsApp, atau platform lainnya</li>
                  <li>Kami hanya meminta input kredensial melalui form resmi di sistem ini</li>
                  <li>Membagikan kredensial dapat menyebabkan kerugian finansial yang serius</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-blue-700">
              <p className="text-sm">
                <strong>Catatan:</strong> Kredensial ini diperlukan untuk integrasi payment gateway dengan sistem kami. 
                Pastikan Anda mengakses dashboard Xendit resmi di <code className="bg-blue-100 px-1 rounded">dashboard.xendit.co</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    {step.sensitive && (
                      <div className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Sensitif
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-gray-700 font-mono flex-1">
                        {step.path}
                      </p>
                      <button
                        onClick={() => handleCopy(step.path, step.title)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
                      >
                        {copiedItems[step.title] ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Security Tips */}
      <div className="mt-2 bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Tips Keamanan Tambahan
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Selalu logout dari dashboard Xendit setelah selesai
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Gunakan koneksi internet yang aman dan terpercaya
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Jangan akses dari komputer atau jaringan publik
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Periksa URL dashboard untuk memastikan keaslian
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Segera ubah API key jika dicurigai telah bocor
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Monitor aktivitas akun secara berkala
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}