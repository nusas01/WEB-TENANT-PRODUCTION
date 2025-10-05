import React, { useState } from 'react';
import { FileText, Shield, RefreshCw, AlertTriangle, CheckCircle, XCircle, Clock, Store, Phone, Receipt, Building2, Scale, Lock, Globe } from 'lucide-react';

export default function TermsAndConditions() {
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState(null);

  const content = {
    en: {
      title: "Terms & Conditions",
      subtitle: "Software as a Service Agreement",
      intro1: "This Terms and Conditions Agreement (\"Agreement\") governs the provision of Point of Sale (POS) software services by Nusas.id (\"Service Provider,\" \"we,\" \"us,\" or \"our\") to businesses operating in the food and beverage sector (\"Client,\" \"you,\" or \"your\").",
      intro2: "By subscribing to our services, you acknowledge that you have read, understood, and agree to be bound by these terms.",
      sections: {
        service: {
          title: "1. Service Description",
          intro: "The Service Provider offers a comprehensive software solution comprising:",
          items: [
            "Web-based Point of Sale (POS) system for internal cafe and restaurant operations, including integrated cashier functionality",
            "Customer-facing web ordering platform accessible via mobile devices",
            "Integration with multiple payment gateway methods and processing systems"
          ]
        },
        refund: {
          title: "2. Refund Policy",
          eligible: "2.1 Eligible Refund Circumstances",
          eligibleItems: [
            "Refunds may be requested when the service status remains in \"Preparation\" or \"Under Review\" phase",
            "Extended service subscriptions for previously deactivated stores during the preparation or review period are eligible for refund consideration"
          ],
          nonEligible: "2.2 Non-Refundable Circumstances",
          nonEligibleItems: [
            "No refunds will be issued once the system status changes to \"Active\" or \"Operational\"",
            "Service extensions or renewals for currently active stores are non-refundable",
            "Any subscription where operational usage has commenced",
            "When submitting a payment gateway account change request that requires a test transaction fee, most of the amount will be refunded to the same payment gateway account after verification. However, refund requests for this verification transaction will not be accepted. Please ensure your Xendit account (or equivalent payment gateway account) is already in Business or Production mode before making any changes."
          ]
        },
        procedure: {
          title: "3. Refund Request Procedure",
          intro: "All refund requests must satisfy the following requirements:",
          verification: {
            title: "3.1 Account Verification",
            desc: "The WhatsApp number submitting the refund request must match the registered account contact number"
          },
          identification: {
            title: "3.2 Identification Details",
            desc: "Provision of valid Store ID and Tenant ID associated with the subscription"
          },
          documentation: {
            title: "3.3 Transaction Documentation",
            desc: "Submission of Transaction ID and valid proof of payment"
          }
        },
        security: {
          title: "4. Security & Payment Gateway Credentials",
          notice: "Critical Security Notice",
          items: [
            "Clients must maintain strict confidentiality of their Xendit payment gateway credentials and shall not disclose such information to any third party",
            "Credential requests will be made exclusively through the official platform at nusas.id",
            "The Service Provider will never request credentials through WhatsApp, personal email, or any unofficial channels",
            "Clients should exercise caution and verify the authenticity of any credential requests claiming to represent the Service Provider"
          ]
        },
        liability: {
          title: "5. Limitation of Liability",
          items: [
            "The Client assumes full responsibility for the security and proper use of their account credentials and payment gateway information",
            "The Service Provider shall not be held liable for any errors, negligence, or misconduct committed by the Client",
            "The Client is solely responsible for maintaining the confidentiality of login credentials and payment gateway access",
            "Any financial losses resulting from the Client's failure to safeguard sensitive information shall not constitute a liability of the Service Provider"
          ]
        },
        amendments: {
          title: "6. Amendments to Terms",
          items: [
            "The Service Provider reserves the right to modify these Terms and Conditions at any time without prior notice",
            "Amendments will be communicated through the official platform at nusas.id, and continued use of the service constitutes acceptance of the revised terms"
          ]
        },
        footer: {
          title: "Effective Date & Contact Information",
          effective: "These Terms and Conditions are effective immediately upon subscription to our services.",
          contact: "For inquiries or clarifications regarding these terms, please contact us through our official website at"
        }
      }
    },
    id: {
      title: "Syarat & Ketentuan",
      subtitle: "Perjanjian Layanan Perangkat Lunak",
      intro1: "Perjanjian Syarat dan Ketentuan ini (\"Perjanjian\") mengatur penyediaan layanan perangkat lunak Point of Sale (POS) oleh Nusas.id (\"Penyedia Layanan,\" \"kami,\" atau \"milik kami\") kepada bisnis yang beroperasi di sektor makanan dan minuman (\"Klien,\" \"Anda,\" atau \"milik Anda\").",
      intro2: "Dengan berlangganan layanan kami, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui syarat-syarat ini.",
      sections: {
        service: {
          title: "1. Deskripsi Layanan",
          intro: "Penyedia Layanan menawarkan solusi perangkat lunak komprehensif yang meliputi:",
          items: [
            "Sistem Point of Sale (POS) berbasis web untuk operasional internal kafe dan restoran, termasuk fungsionalitas kasir terintegrasi",
            "Platform pemesanan web untuk pelanggan yang dapat diakses melalui perangkat mobile",
            "Integrasi dengan berbagai metode payment gateway dan sistem pemrosesan pembayaran"
          ]
        },
        refund: {
          title: "2. Kebijakan Pengembalian Dana",
          eligible: "2.1 Kondisi Pengembalian Dana yang Memenuhi Syarat",
          eligibleItems: [
            "Pengembalian dana dapat diminta ketika status layanan masih dalam fase \"Persiapan\" atau \"Dalam Peninjauan\"",
            "Perpanjangan layanan untuk toko yang sebelumnya dinonaktifkan selama periode persiapan atau peninjauan memenuhi syarat untuk pertimbangan pengembalian dana"
          ],
          nonEligible: "2.2 Kondisi yang Tidak Dapat Dikembalikan",
          nonEligibleItems: [
            "Tidak ada pengembalian dana yang akan diterbitkan setelah status sistem berubah menjadi \"Aktif\" atau \"Operasional\"",
            "Perpanjangan atau pembaruan layanan untuk toko yang saat ini aktif tidak dapat dikembalikan",
            "Setiap langganan dimana penggunaan operasional telah dimulai",
            "Ketika mengajukan permintaan perubahan akun payment gateway yang memerlukan biaya transaksi uji coba, sebagian besar dana akan dikembalikan ke akun payment gateway yang sama setelah verifikasi selesai. Namun, permintaan pengembalian dana untuk transaksi verifikasi ini tidak akan diterima. Pastikan akun Xendit Anda (atau akun payment gateway setara) sudah berada dalam mode Bisnis atau Produksi sebelum melakukan perubahan."
          ]
        },
        procedure: {
          title: "3. Prosedur Pengajuan Pengembalian Dana",
          intro: "Semua permintaan pengembalian dana harus memenuhi persyaratan berikut:",
          verification: {
            title: "3.1 Verifikasi Akun",
            desc: "Nomor WhatsApp yang mengajukan permintaan pengembalian dana harus sesuai dengan nomor kontak akun yang terdaftar"
          },
          identification: {
            title: "3.2 Detail Identifikasi",
            desc: "Penyediaan ID Toko dan ID Tenant yang valid yang terkait dengan langganan"
          },
          documentation: {
            title: "3.3 Dokumentasi Transaksi",
            desc: "Penyerahan ID Transaksi dan bukti pembayaran yang valid"
          }
        },
        security: {
          title: "4. Keamanan & Kredensial Payment Gateway",
          notice: "Pemberitahuan Keamanan Kritis",
          items: [
            "Klien harus menjaga kerahasiaan kredensial payment gateway Xendit mereka secara ketat dan tidak boleh mengungkapkan informasi tersebut kepada pihak ketiga manapun",
            "Permintaan kredensial akan dilakukan secara eksklusif melalui platform resmi di nusas.id",
            "Penyedia Layanan tidak akan pernah meminta kredensial melalui WhatsApp, email pribadi, atau saluran tidak resmi lainnya",
            "Klien harus berhati-hati dan memverifikasi keaslian setiap permintaan kredensial yang mengklaim mewakili Penyedia Layanan"
          ]
        },
        liability: {
          title: "5. Batasan Tanggung Jawab",
          items: [
            "Klien bertanggung jawab penuh atas keamanan dan penggunaan yang tepat dari kredensial akun dan informasi payment gateway mereka",
            "Penyedia Layanan tidak akan bertanggung jawab atas kesalahan, kelalaian, atau pelanggaran yang dilakukan oleh Klien",
            "Klien bertanggung jawab sepenuhnya untuk menjaga kerahasiaan kredensial login dan akses payment gateway",
            "Setiap kerugian finansial yang diakibatkan oleh kegagalan Klien dalam menjaga informasi sensitif tidak akan menjadi tanggung jawab Penyedia Layanan"
          ]
        },
        amendments: {
          title: "6. Perubahan Ketentuan",
          items: [
            "Penyedia Layanan berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya",
            "Perubahan akan dikomunikasikan melalui platform resmi di nusas.id, dan penggunaan layanan yang berkelanjutan merupakan penerimaan terhadap ketentuan yang direvisi"
          ]
        },
        footer: {
          title: "Tanggal Efektif & Informasi Kontak",
          effective: "Syarat dan Ketentuan ini berlaku efektif segera setelah berlangganan layanan kami.",
          contact: "Untuk pertanyaan atau klarifikasi mengenai ketentuan ini, silakan hubungi kami melalui situs web resmi kami di"
        }
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Scale className="w-10 h-10" />
              <div>
                <h1 className="text-4xl font-light tracking-tight">{t.title}</h1>
                <p className="text-slate-300 mt-2 font-light">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  language === 'en' 
                    ? 'bg-white text-slate-900 font-semibold' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                EN
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  language === 'id' 
                    ? 'bg-white text-slate-900 font-semibold' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                ID
              </button>
            </div>
          </div>
          <div className="h-1 w-24 bg-blue-500 mt-6"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-4">{t.intro1}</p>
          <p className="text-gray-700 leading-relaxed">{t.intro2}</p>
        </div>

        {/* Section 1: Service Description */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.service.title}</h2>
          </div>
          
          <div className="ml-11 space-y-4 text-gray-700">
            <p className="leading-relaxed">{t.sections.service.intro}</p>
            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 space-y-3">
              {t.sections.service.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="font-semibold text-slate-900 min-w-[40px]">1.{idx + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Refund Policy */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.refund.title}</h2>
          </div>
          
          <div className="ml-11 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {t.sections.refund.eligible}
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3 text-gray-700">
                {t.sections.refund.eligibleItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-medium min-w-[50px]">2.1.{idx + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                {t.sections.refund.nonEligible}
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-3 text-gray-700">
                {t.sections.refund.nonEligibleItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-medium min-w-[50px]">2.2.{idx + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Refund Request Procedure */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.procedure.title}</h2>
          </div>
          
          <div className="ml-11 space-y-4">
            <p className="text-gray-700 mb-4">{t.sections.procedure.intro}</p>
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded">
                    <Phone className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{t.sections.procedure.verification.title}</h4>
                    <p className="text-gray-600 text-sm">{t.sections.procedure.verification.desc}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded">
                    <Store className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{t.sections.procedure.identification.title}</h4>
                    <p className="text-gray-600 text-sm">{t.sections.procedure.identification.desc}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded">
                    <Receipt className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{t.sections.procedure.documentation.title}</h4>
                    <p className="text-gray-600 text-sm">{t.sections.procedure.documentation.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Security & Credentials */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.security.title}</h2>
          </div>
          
          <div className="ml-11">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
              <div className="flex gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <h3 className="font-semibold text-amber-900 text-lg">{t.sections.security.notice}</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                {t.sections.security.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-semibold min-w-[40px]">4.{idx + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Liability & Responsibilities */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.liability.title}</h2>
          </div>
          
          <div className="ml-11 space-y-4 text-gray-700">
            {t.sections.liability.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="font-semibold text-slate-900 min-w-[40px]">5.{idx + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Amendments */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-2 rounded">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-light text-gray-900">{t.sections.amendments.title}</h2>
          </div>
          
          <div className="ml-11 text-gray-700">
            {t.sections.amendments.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 mb-4">
                <span className="font-semibold text-slate-900 min-w-[40px]">6.{idx + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-8 mt-12">
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t.sections.footer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{t.sections.footer.effective}</p>
                <p className="text-gray-600 text-sm">
                  {t.sections.footer.contact}{' '}
                  <a href="https://nusas.id" className="text-blue-600 font-semibold hover:underline">nusas.id</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Nusas.id - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}