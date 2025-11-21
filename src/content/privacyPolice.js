import React, { useState } from 'react';
import { Shield, Lock, Cloud, Database, Eye, UserCheck, Clock, Phone, FileText, AlertTriangle, CheckCircle, Server, Key, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      title: "Privacy Policy",
      subtitle: "How We Protect Your Data",
      lastUpdated: "Last Updated",
      intro1: "At nusas.id (\"we,\" \"us,\" or \"our\"), we are committed to protecting your privacy and ensuring the security of your personal and business information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our Point of Sale (POS) software services.",
      intro2: "By using our services, you consent to the data practices described in this policy.",
      
      sections: {
        collection: {
          title: "1. Information We Collect",
          intro: "We collect the following types of information to provide and improve our services:",
          personal: {
            title: "1.1 Personal Information",
            items: [
              "Business name, owner name, and contact details",
              "WhatsApp number and email address for account verification and communication",
              "Store identification (Store ID and Tenant ID)",
              "Payment transaction records and receipts"
            ]
          },
          business: {
            title: "1.2 Business Information",
            items: [
              "Store configuration and operational settings",
              "Menu items, pricing, and product catalog",
              "Customer order data and transaction history",
              "Sales reports and analytics data"
            ]
          },
          payment: {
            title: "1.3 Payment Gateway Credentials",
            items: [
              "Xendit payment gateway API credentials (encrypted)",
              "Payment processing configuration details",
              "Transaction logs and payment method preferences"
            ]
          },
          technical: {
            title: "1.4 Technical Information",
            items: [
              "IP addresses and device information",
              "Browser type and operating system",
              "Usage patterns and feature interactions",
              "System logs and error reports"
            ]
          }
        },

        storage: {
          title: "2. Data Storage & Infrastructure",
          intro: "We utilize industry-standard cloud infrastructure to ensure the security and availability of your data:",
          items: [
            {
              title: "2.1 Cloud Storage Solutions",
              desc: "All data is stored on secure, enterprise-grade cloud servers with redundant backup systems to prevent data loss. Our cloud infrastructure providers maintain SOC 2 Type II compliance and ISO 27001 certification."
            },
            {
              title: "2.2 Data Redundancy",
              desc: "Your data is automatically replicated across multiple geographic locations to ensure high availability and disaster recovery capabilities."
            },
            {
              title: "2.3 Server Security",
              desc: "Our servers are protected by advanced firewalls, intrusion detection systems, and 24/7 security monitoring to prevent unauthorized access."
            }
          ]
        },

        security: {
          title: "3. Security Measures",
          notice: "Critical Security Protections",
          intro: "We implement multiple layers of security to protect your sensitive information:",
          encryption: {
            title: "3.1 Password Encoding",
            items: [
              "All user passwords are hashed using industry-standard bcrypt algorithm with salt",
              "Passwords are never stored in plain text or reversible encryption",
              "Password hashing occurs before transmission to our servers",
              "We cannot retrieve or view your original password"
            ]
          },
          paymentSecurity: {
            title: "3.2 Payment Gateway Credential Encryption",
            items: [
              "Payment gateway credentials (Xendit API keys) are encrypted using AES-256 encryption",
              "Encryption keys are stored separately from encrypted data using secure key management systems",
              "Credentials are encrypted at rest and in transit using TLS 1.3 protocol",
              "Decryption only occurs in secure, isolated processing environments"
            ]
          },
          additional: {
            title: "3.3 Additional Security Protocols",
            items: [
              "Regular security audits and penetration testing",
              "Automated threat detection and prevention systems",
              "Secure API endpoints with rate limiting and authentication"
            ]
          }
        },

        usage: {
          title: "4. How We Use Your Information",
          items: [
            "To provide, maintain, and improve our POS software services",
            "To process transactions and manage payment operations",
            "To communicate with you regarding service updates, support, and account matters",
            "To generate analytics and reports for your business operations",
            "To ensure system security and prevent fraudulent activities",
            "To comply with legal obligations and regulatory requirements"
          ]
        },

        sharing: {
          title: "5. Data Sharing & Disclosure",
          intro: "We do not sell, rent, or trade your personal information. We may share data only in the following circumstances:",
          items: [
            {
              title: "5.1 Service Providers",
              desc: "We may share data with trusted third-party service providers (cloud hosting, payment processors) who assist in operating our services, subject to strict confidentiality agreements."
            },
            {
              title: "5.2 Legal Requirements",
              desc: "We may disclose information when required by law, court order, or government regulation, or to protect our rights and prevent fraud or security issues."
            },
            {
              title: "5.3 Business Transfers",
              desc: "In the event of a merger, acquisition, or sale of assets, your information may be transferred, subject to the same privacy protections."
            }
          ]
        },

        rights: {
          title: "6. Your Data Rights",
          items: [
            "Access: Request a copy of your personal data we hold",
            "Correction: Request correction of inaccurate or incomplete data",
            "Deletion: Request deletion of your data (subject to legal retention requirements)",
            "Portability: Request transfer of your data to another service provider",
            "Objection: Object to certain data processing activities"
          ]
        },

        retention: {
          title: "7. Data Retention",
          items: [
            "We retain your data for as long as your account is active or as needed to provide services",
            "Transaction records are retained for 7 years to comply with financial regulations",
            "After account deletion, personal data is securely erased within 90 days, except where legal retention is required",
            "Backup copies are automatically purged according to our retention schedule"
          ]
        },

        cookies: {
          title: "8. Cookies & Tracking",
          items: [
            "We use essential cookies to maintain your login session and system functionality",
            "Analytics cookies help us understand usage patterns and improve our services",
            "You can manage cookie preferences through your browser settings",
            "We do not use third-party advertising cookies"
          ]
        },

        children: {
          title: "9. Children's Privacy",
          desc: "Our services are intended for business use and not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors."
        },

        changes: {
          title: "10. Changes to Privacy Policy",
          items: [
            "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements",
            "Material changes will be communicated via email or prominent notice on our platform",
            "Continued use of our services after changes constitutes acceptance of the updated policy",
            "The effective date at the top of this policy indicates the last revision"
          ]
        },

        contact: {
          title: "11. Contact Information",
          desc: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through:"
        }
      },

      footer: {
        website: "Official Website:",
        email: "Data Protection Contact:",
        response: "We will respond to your inquiries within 30 business days."
      }
    },

    id: {
      title: "Kebijakan Privasi",
      subtitle: "Bagaimana Kami Melindungi Data Anda",
      lastUpdated: "Terakhir Diperbarui",
      intro1: "Di nusas.id (\"kami\" atau \"milik kami\"), kami berkomitmen untuk melindungi privasi Anda dan memastikan keamanan informasi pribadi dan bisnis Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data Anda saat menggunakan layanan perangkat lunak Point of Sale (POS) kami.",
      intro2: "Dengan menggunakan layanan kami, Anda menyetujui praktik data yang dijelaskan dalam kebijakan ini.",
      
      sections: {
        collection: {
          title: "1. Informasi yang Kami Kumpulkan",
          intro: "Kami mengumpulkan jenis informasi berikut untuk menyediakan dan meningkatkan layanan kami:",
          personal: {
            title: "1.1 Informasi Pribadi",
            items: [
              "Nama bisnis, nama pemilik, dan detail kontak",
              "Nomor WhatsApp dan alamat email untuk verifikasi akun dan komunikasi",
              "Identifikasi toko (ID Toko dan ID Tenant)",
              "Catatan transaksi pembayaran dan bukti pembayaran"
            ]
          },
          business: {
            title: "1.2 Informasi Bisnis",
            items: [
              "Konfigurasi toko dan pengaturan operasional",
              "Item menu, harga, dan katalog produk",
              "Data pesanan pelanggan dan riwayat transaksi",
              "Laporan penjualan dan data analitik"
            ]
          },
          payment: {
            title: "1.3 Kredensial Payment Gateway",
            items: [
              "Kredensial API payment gateway Xendit (terenkripsi)",
              "Detail konfigurasi pemrosesan pembayaran",
              "Log transaksi dan preferensi metode pembayaran"
            ]
          },
          technical: {
            title: "1.4 Informasi Teknis",
            items: [
              "Alamat IP dan informasi perangkat",
              "Jenis browser dan sistem operasi",
              "Pola penggunaan dan interaksi fitur",
              "Log sistem dan laporan kesalahan"
            ]
          }
        },

        storage: {
          title: "2. Penyimpanan Data & Infrastruktur",
          intro: "Kami menggunakan infrastruktur cloud standar industri untuk memastikan keamanan dan ketersediaan data Anda:",
          items: [
            {
              title: "2.1 Solusi Cloud Storage",
              desc: "Semua data disimpan di server cloud tingkat perusahaan yang aman dengan sistem backup redundan untuk mencegah kehilangan data. Penyedia infrastruktur cloud kami mempertahankan kepatuhan SOC 2 Type II dan sertifikasi ISO 27001."
            },
            {
              title: "2.2 Keamanan Server",
              desc: "Server kami dilindungi oleh firewall canggih, sistem deteksi intrusi, dan pemantauan keamanan 24/7 untuk mencegah akses yang tidak sah."
            }
          ]
        },

        security: {
          title: "3. Langkah-Langkah Keamanan",
          notice: "Perlindungan Keamanan Kritis",
          intro: "Kami menerapkan beberapa lapisan keamanan untuk melindungi informasi sensitif Anda:",
          encryption: {
            title: "3.1 Encoding Password",
            items: [
              "Semua password pengguna di-hash menggunakan algoritma bcrypt standar industri dengan salt",
              "Password tidak pernah disimpan dalam teks biasa atau enkripsi yang dapat dibalik",
              "Hashing password terjadi sebelum transmisi ke server kami",
              "Kami tidak dapat mengambil atau melihat password asli Anda"
            ]
          },
          paymentSecurity: {
            title: "3.2 Enkripsi Kredensial Payment Gateway",
            items: [
              "Kredensial payment gateway (API key Xendit) dienkripsi menggunakan enkripsi AES-256",
              "Kunci enkripsi disimpan terpisah dari data terenkripsi menggunakan sistem manajemen kunci yang aman",
              "Kredensial dienkripsi saat disimpan dan saat transit menggunakan protokol TLS 1.3",
              "Dekripsi hanya terjadi di lingkungan pemrosesan yang aman dan terisolasi"
            ]
          },
          additional: {
            title: "3.3 Protokol Keamanan Tambahan",
            items: [
              "Audit keamanan dan pengujian penetrasi secara berkala",
              "Sistem deteksi dan pencegahan ancaman otomatis",
              "Endpoint API yang aman dengan pembatasan rate dan autentikasi"
            ]
          }
        },

        usage: {
          title: "4. Bagaimana Kami Menggunakan Informasi Anda",
          items: [
            "Untuk menyediakan, memelihara, dan meningkatkan layanan perangkat lunak POS kami",
            "Untuk memproses transaksi dan mengelola operasi pembayaran",
            "Untuk berkomunikasi dengan Anda mengenai pembaruan layanan, dukungan, dan masalah akun",
            "Untuk menghasilkan analitik dan laporan untuk operasi bisnis Anda",
            "Untuk memastikan keamanan sistem dan mencegah aktivitas penipuan",
            "Untuk mematuhi kewajiban hukum dan persyaratan peraturan"
          ]
        },

        sharing: {
          title: "5. Berbagi & Pengungkapan Data",
          intro: "Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda. Kami mungkin membagikan data hanya dalam keadaan berikut:",
          items: [
            {
              title: "5.1 Penyedia Layanan",
              desc: "Kami mungkin membagikan data dengan penyedia layanan pihak ketiga tepercaya (hosting cloud, pemroses pembayaran) yang membantu dalam mengoperasikan layanan kami, tunduk pada perjanjian kerahasiaan yang ketat."
            },
            {
              title: "5.2 Persyaratan Hukum",
              desc: "Kami mungkin mengungkapkan informasi ketika diwajibkan oleh hukum, perintah pengadilan, atau peraturan pemerintah, atau untuk melindungi hak kami dan mencegah penipuan atau masalah keamanan."
            },
            {
              title: "5.3 Transfer Bisnis",
              desc: "Dalam hal merger, akuisisi, atau penjualan aset, informasi Anda mungkin ditransfer, tunduk pada perlindungan privasi yang sama."
            }
          ]
        },

        rights: {
          title: "6. Hak Data Anda",
          items: [
            "Akses: Meminta salinan data pribadi Anda yang kami simpan",
            "Koreksi: Meminta koreksi data yang tidak akurat atau tidak lengkap",
            "Penghapusan: Meminta penghapusan data Anda (tunduk pada persyaratan retensi hukum)",
            "Portabilitas: Meminta transfer data Anda ke penyedia layanan lain",
            "Keberatan: Menolak aktivitas pemrosesan data tertentu"
          ]
        },

        retention: {
          title: "7. Retensi Data",
          items: [
            "Kami menyimpan data Anda selama akun Anda aktif atau seperlunya untuk menyediakan layanan",
            "Catatan transaksi disimpan selama 7 tahun untuk mematuhi peraturan keuangan",
            "Setelah penghapusan akun, data pribadi dihapus dengan aman dalam 90 hari, kecuali retensi hukum diperlukan",
            "Salinan backup secara otomatis dihapus sesuai jadwal retensi kami"
          ]
        },

        cookies: {
          title: "8. Cookie & Pelacakan",
          items: [
            "Kami menggunakan cookie esensial untuk mempertahankan sesi login dan fungsionalitas sistem Anda",
            "Cookie analitik membantu kami memahami pola penggunaan dan meningkatkan layanan kami",
            "Anda dapat mengelola preferensi cookie melalui pengaturan browser Anda",
            "Kami tidak menggunakan cookie iklan pihak ketiga"
          ]
        },

        children: {
          title: "9. Privasi Anak-Anak",
          desc: "Layanan kami ditujukan untuk penggunaan bisnis dan tidak ditujukan untuk individu di bawah 18 tahun. Kami tidak dengan sengaja mengumpulkan informasi pribadi dari anak di bawah umur."
        },

        changes: {
          title: "10. Perubahan Kebijakan Privasi",
          items: [
            "Kami dapat memperbarui Kebijakan Privasi ini secara berkala untuk mencerminkan perubahan dalam praktik kami atau persyaratan hukum",
            "Perubahan material akan dikomunikasikan melalui email atau pemberitahuan yang jelas di platform kami",
            "Penggunaan layanan kami yang berkelanjutan setelah perubahan merupakan penerimaan terhadap kebijakan yang diperbarui",
            "Tanggal efektif di bagian atas kebijakan ini menunjukkan revisi terakhir"
          ]
        },

        contact: {
          title: "11. Informasi Kontak",
          desc: "Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan mengenai Kebijakan Privasi ini atau praktik data kami, silakan hubungi kami melalui:"
        }
      },

      footer: {
        website: "Situs Web Resmi:",
        response: "Kami akan merespons pertanyaan Anda dalam 30 hari kerja."
      }
    }
  };

  const t = content[language];
  const currentDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10" />
              <div>
                <h1 className="text-4xl font-light tracking-tight">{t.title}</h1>
                <p className="text-blue-200 mt-2 font-light">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-blue-700 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  language === 'en' 
                    ? 'bg-white text-blue-900 font-semibold' 
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                EN
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  language === 'id' 
                    ? 'bg-white text-blue-900 font-semibold' 
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                ID
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-200 mt-4">
            <Clock className="w-4 h-4" />
            <span>{t.lastUpdated}: {currentDate}</span>
          </div>
          <div className="h-1 w-24 bg-blue-400 mt-6"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-4">{t.intro1}</p>
          <p className="text-gray-700 leading-relaxed">{t.intro2}</p>
        </div>

        {/* Section 1: Information Collection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.collection.title}</h2>
          </div>
          
          <div className="ml-11 space-y-6">
            <p className="text-gray-700 mb-4">{t.sections.collection.intro}</p>
            
            {/* Personal Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t.sections.collection.personal.title}</h3>
              <ul className="space-y-2">
                {t.sections.collection.personal.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t.sections.collection.business.title}</h3>
              <ul className="space-y-2">
                {t.sections.collection.business.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Gateway */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t.sections.collection.payment.title}</h3>
              <ul className="space-y-2">
                {t.sections.collection.payment.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t.sections.collection.technical.title}</h3>
              <ul className="space-y-2">
                {t.sections.collection.technical.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Data Storage */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.storage.title}</h2>
          </div>
          
          <div className="ml-11 space-y-6">
            <p className="text-gray-700 mb-4">{t.sections.storage.intro}</p>
            
            {t.sections.storage.items.map((item, idx) => (
              <div key={idx} className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Security Measures */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.security.title}</h2>
          </div>
          
          <div className="ml-11">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
              <div className="flex gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-green-900 text-lg">{t.sections.security.notice}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t.sections.security.intro}</p>
            </div>

            <div className="space-y-6">
              {/* Password Encoding */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  {t.sections.security.encryption.title}
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
                  {t.sections.security.encryption.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Security */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  {t.sections.security.paymentSecurity.title}
                </h3>
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5 space-y-3">
                  {t.sections.security.paymentSecurity.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-gray-700">
                      <Shield className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Security */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  {t.sections.security.additional.title}
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
                  {t.sections.security.additional.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How We Use Information */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.usage.title}</h2>
          </div>
          
          <div className="ml-11">
            <ul className="space-y-3">
              {t.sections.usage.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="font-semibold text-blue-600 min-w-[30px]">4.{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Data Sharing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.sharing.title}</h2>
          </div>
          
          <div className="ml-11 space-y-6">
            <p className="text-gray-700 mb-4">{t.sections.sharing.intro}</p>
            
            {t.sections.sharing.items.map((item, idx) => (
              <div key={idx} className="border-l-4 border-gray-300 pl-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Your Data Rights */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.rights.title}</h2>
          </div>
          
          <div className="ml-11">
            <div className="grid md:grid-cols-2 gap-4">
              {t.sections.rights.items.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Data Retention */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.retention.title}</h2>
          </div>
          
          <div className="ml-11 space-y-3">
            {t.sections.retention.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[30px]">7.{idx + 1}</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Cookies */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.cookies.title}</h2>
          </div>
          
          <div className="ml-11 space-y-3">
            {t.sections.cookies.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[30px]">8.{idx + 1}</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Children's Privacy */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.children.title}</h2>
          </div>
          
          <div className="ml-11">
            <p className="text-gray-700">{t.sections.children.desc}</p>
          </div>
        </section>

        {/* Section 10: Changes to Policy */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.changes.title}</h2>
          </div>
          
          <div className="ml-11 space-y-3">
            {t.sections.changes.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[40px]">10.{idx + 1}</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 11: Contact */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-900 p-2 rounded">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.contact.title}</h2>
          </div>
          
          <div className="ml-11">
            <p className="text-gray-700 mb-6">{t.sections.contact.desc}</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.footer.website}</p>
                  <a href="https://nusas.id" className="text-blue-600 hover:underline">nusas.id</a>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">{t.footer.response}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-8 mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-blue-900 mb-3">
              <Shield className="w-6 h-6" />
              <span className="font-semibold text-lg">Your Privacy Matters</span>
            </div>
            <p className="text-center text-sm text-gray-600">
              We are committed to protecting your data and maintaining transparent privacy practices.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} nusas.id - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export function CustomerPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <Shield className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-blue-100 text-lg mt-2">How We Protect Your Data</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-blue-200">
            <Clock className="h-5 w-5" />
            <span>Last Updated: November 21, 2025</span>
          </div>
          <div className="h-1 w-24 bg-blue-400 mt-6 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Sebagai pelanggan restoran atau kafe yang menggunakan layanan Point of Sale (POS) dari <strong>nusas.id</strong>, 
            kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan 
            bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda saat Anda melakukan pemesanan 
            atau transaksi di merchant yang menggunakan sistem kami.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dengan melakukan transaksi melalui sistem kami, Anda menyetujui praktik pengumpulan dan penggunaan data 
            sebagaimana dijelaskan dalam kebijakan ini.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Informasi yang Kami Kumpulkan</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">Kami mengumpulkan informasi berikut untuk memproses pesanan dan meningkatkan layanan:</p>
          
          <div className="space-y-4 ml-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.1 Informasi Pesanan</h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Username / email pelanggan</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Nomor meja atau nomor pesanan</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Detail menu yang dipesan</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Total pembayaran dan metode pembayaran</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.2 Informasi Kontak (Opsional)</h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Nomor telepon untuk notifikasi pesanan</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Alamat email untuk struk digital (jika diminta)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1.3 Informasi Teknis</h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Alamat IP perangkat</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Jenis perangkat dan browser yang digunakan</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-700">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Waktu dan tanggal transaksi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
          
          <ul className="space-y-3 ml-4">
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span><strong>Memproses pesanan:</strong> Menyampaikan pesanan Anda ke dapur dan menyelesaikan transaksi pembayaran</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span><strong>Komunikasi pesanan:</strong> Mengirim notifikasi status pesanan (siap, sedang diproses, dll)</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span><strong>Struk digital:</strong> Mengirimkan bukti pembayaran melalui email atau account pelanggan</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span><strong>Meningkatkan layanan:</strong> Menganalisis preferensi menu untuk rekomendasi yang lebih baik</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">•</span>
              <span><strong>Keamanan:</strong> Mencegah penipuan dan aktivitas yang mencurigakan</span>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Keamanan Data Anda</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">Kami menerapkan langkah-langkah keamanan untuk melindungi informasi Anda:</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-800">Enkripsi SSL/TLS untuk semua transaksi</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-800">Akses terbatas hanya untuk pihak yang berwenang</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-800">Sistem backup dan pemulihan data secara berkala</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-800">Monitoring keamanan 24/7</span>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Berbagi Informasi</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">Kami TIDAK menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Informasi Anda hanya dibagikan kepada:</p>
          
          <ul className="space-y-3 ml-4">
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Merchant/Restoran:</strong> Untuk memproses pesanan Anda</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Penyedia pembayaran:</strong> Untuk menyelesaikan transaksi (data pembayaran dienkripsi)</span>
            </li>
            <li className="flex items-start space-x-3 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Pihak berwajib:</strong> Jika diwajibkan oleh hukum</span>
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Hak Anda</h2>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">Sebagai pelanggan, Anda memiliki hak untuk:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Akses Data</p>
              <p className="text-gray-600 text-sm">Meminta salinan data pribadi yang kami simpan</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Koreksi Data</p>
              <p className="text-gray-600 text-sm">Memperbarui informasi yang tidak akurat</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Penghapusan Data</p>
              <p className="text-gray-600 text-sm">Meminta penghapusan data pribadi Anda</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900">Penarikan Persetujuan</p>
              <p className="text-gray-600 text-sm">Mencabut persetujuan penggunaan data</p>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Penyimpanan Data</h2>
            </div>
          </div>
          
          <p className="text-gray-700">
            Data transaksi Anda akan disimpan selama <strong>2 tahun</strong> untuk keperluan laporan keuangan dan pajak. 
            Setelah periode tersebut, data akan dihapus secara permanen dari sistem kami, kecuali diwajibkan oleh hukum untuk 
            menyimpannya lebih lama.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
          <p className="text-blue-100 mb-4">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, 
            silakan hubungi:
          </p>
          <div className="space-y-2 bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="font-semibold">nusas.id - Customer Support</p>
            <p>Email: nusasinternal@gmail.com</p>
            <p>Telepon: +62 812-3456-7890</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Kebijakan ini berlaku efektif mulai 21 November 2025</p>
          <p className="mt-2">Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan akan diberitahukan melalui sistem atau email.</p>
        </div>
      </div>
    </div>
  );
}