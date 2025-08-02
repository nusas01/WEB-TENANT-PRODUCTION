import React from 'react';
import {
  AlertCircle, 
  CreditCard, 
  FileText, 
  BarChart2, 
  Clock,
  Calendar,
  RefreshCw,
  Lock
} from 'lucide-react';


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

            <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
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


export const ServiceStatusCards = () => {
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
                  Masa aktif layanan Anda telah berakhir pada 30 Juni 2023. 
                  Segera lakukan perpanjangan untuk melanjutkan akses ke seluruh fitur platform.
                </p>

                <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-100">
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
                <span>Layanan berakhir: 30 Juni 2023 (5 hari yang lalu)</span>
              </div>
              <span className="bg-red-700 px-3 py-1 rounded-full text-sm">Kadaluarsa</span>
            </div>
          </div>
        </div>
    </div>
  );
};
