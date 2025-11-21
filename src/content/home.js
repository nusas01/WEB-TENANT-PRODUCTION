import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Zap, 
  ArrowRight, 
  Play, 
  Briefcase,
  Lightbulb,
  Handshake,
  Rocket,
  QrCode, 
  Smartphone, 
  Lock,
  BarChart3, 
  Users, 
  Shield, 
  Eye, 
  CheckCircle, 
  Star, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles,
  TrendingUp,
  Target,
  Globe,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchProductServices, 
  fetchAuthStatusLogin,
} from '../actions/get'
import {
  productServicesSlice,
} from '../reducers/get'
import { useSelector, useDispatch } from 'react-redux';
import {
  Toast, 
  ToastPortal
} from './alert'
import { formatCurrency } from './helper';


export default function QRestroLanding() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const segments = ['Starter', 'Professional', 'Enterprise'];

  const {resetErrorProductService} = productServicesSlice.actions
  const {dataProductService: packages, errorProductService, loadingProductService} = useSelector((state) => state.persisted.productServices)
  useEffect(() => {
    if (packages.length === 0) {
      dispatch(fetchProductServices())
    }
  }, [])

  useEffect(() => {
    if (errorProductService) {
      setToast({
        type: 'error',
        message: errorProductService
      })
    }
  }, [errorProductService])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section based on scroll position
      const sections = ['home', 'services', 'packages', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100; // offset for header
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const packages = [
  //   {
  //     name: 'Starter',
  //     segment: 'Untuk UMKM & Warung',
  //     price: 'Rp 299K',
  //     originalPrice: 'Rp 450K',
  //     badge: 'Hemat 33%',
  //     gradient: 'from-green-500 to-green-600',
  //     popular: false,
  //     features: [
  //       'QR Code Menu Digital + Customizable Design',
  //       'Payment Gateway (QRIS, E-wallet, Bank)',
  //       'Basic Analytics & Sales Report',
  //       'WhatsApp Integration untuk Notifikasi',
  //       'Cloud Storage 5GB untuk Menu & Assets',
  //       'Multi-device Access (HP, Tablet, Laptop)',
  //       'Setup & Training Online Included',
  //       'Email Support dengan Response < 24 Jam'
  //     ]
  //   },
  //   {
  //     name: 'Professional',
  //     segment: 'Untuk Restaurant & Cafe',
  //     price: 'Rp 599K',
  //     originalPrice: 'Rp 899K',
  //     badge: 'Most Popular',
  //     gradient: 'from-green-500 to-emerald-600',
  //     popular: true,
  //     features: [
  //       'Semua fitur Starter Plan',
  //       'Advanced Analytics dengan AI Insights',
  //       'Staff Management + Face Recognition',
  //       'Multi-location Support (hingga 3 cabang)',
  //       'Inventory Management Terintegrasi',
  //       'Custom Branding + White Label Option',
  //       'API Integration untuk POS/ERP',
  //       'Priority Support + Account Manager',
  //       'Marketing Tools (Loyalty, Voucher, Campaign)',
  //       'Advanced Reporting + Export Data'
  //     ]
  //   },
  //   {
  //     name: 'Enterprise',
  //     segment: 'Untuk Chain & Franchise',
  //     price: 'Rp 1.2JT',
  //     originalPrice: 'Rp 1.8JT',
  //     badge: 'Best Value',
  //     gradient: 'from-green-600 to-green-700',
  //     popular: false,
  //     features: [
  //       'Semua fitur Professional Plan',
  //       'Unlimited Locations & Multi-brand',
  //       'Advanced AI Analytics + Predictive Insights',
  //       'Enterprise Security (SOC 2, ISO 27001)',
  //       'Dedicated Server + 99.99% SLA',
  //       'Custom Development & API Priority',
  //       'Onsite Training + Implementation',
  //       '24/7 Phone Support + Dedicated Success Manager',
  //       'Advanced Integrations (SAP, Oracle, etc)',
  //       'Custom Reporting + Business Intelligence'
  //     ]
  //   }
  // ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // handle login
  const { loggedIn } = useSelector((state) => state.persisted.loginStatus);
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin());
    }
  }, []);
    
  const handleLogin = () => {
    if (loggedIn) {
      navigate('/store')
    }
    if (!loggedIn) {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {toast && (
          <ToastPortal> 
              <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
              <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => { 
                setToast(null)
                dispatch(resetErrorProductService())
              }} 
              duration={3000}
              />
              </div>
          </ToastPortal>
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-green-500/10 shadow-lg shadow-black/5' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-1">
              <img src="/image/logo_nusas_1.png" alt="logo" className="w-12 h-12" />
              <div className="text-2xl font-bold bg-gradient-to-br from-green-500 to-green-600 bg-clip-text text-transparent">
                nusas
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {['home', 'services', 'packages', 'features', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => { 
                    scrollToSection(item)
                    setActiveSection(item)
                  }}
                  className={`relative capitalize transition-all duration-300 hover:text-green-600 ${
                    activeSection === item ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {item === 'home' ? 'Beranda' : 
                  item === 'services' ? 'Layanan' :
                  item === 'packages' ? 'Paket' :
                  item === 'features' ? 'Fitur' : 'Kontak'}
                  {activeSection === item && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button 
              onClick={() => handleLogin()}
              className="px-6 py-2 text-green-600 border border-green-500/30 rounded-full hover:bg-green-50 transition-all duration-300">
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Mulai Sekarang
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 bg-white/95 backdrop-blur-xl rounded-2xl mt-2 border border-green-500/10 shadow-xl shadow-black/5">
              <div className="px-4 py-6 space-y-4">
                {['home', 'services', 'packages', 'features', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-3 capitalize hover:text-green-600 transition-colors text-gray-700">
                    {item === 'home' ? 'Beranda' : 
                    item === 'services' ? 'Layanan' :
                    item === 'packages' ? 'Paket' :
                    item === 'features' ? 'Fitur' : 'Kontak'}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => handleLogin()}
                    className="w-full py-3 text-green-600 border border-green-500/30 rounded-full hover:bg-green-50 transition-all duration-300"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  >
                    Mulai Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">#1 F&B Digital Solution</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                Revolusi Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent">
                Restoran And Coffee Shop Anda
              </span>
            </h1>

            <p className="text-xl sm:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sistem QR Code ordering terdepan dengan AI analytics, management terintegrasi, 
              dan dashboard yang akan mengubah cara Anda berbisnis F&B
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-100 flex items-center space-x-3"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* <button onClick={() => window.open(
                "https://resto.nusas.id",
                "_blank",
                "width=390,height=800"
                )} 
                className="group flex items-center space-x-3 px-8 py-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 ml-1 text-gray-700" />
                </div>
                <span className="text-gray-700">Tonton Demo</span>
              </button> */}
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform border border-green-500/10">
                    <stat.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl animate-bounce delay-1000"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-full mb-6">
              <span className="text-green-600 font-medium">Layanan Premium</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Teknologi Masa Depan
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Untuk Bisnis Anda
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solusi end-to-end yang akan mentransformasi operasional bisnis restoran dan coffee shop Anda dengan teknologi AI dan automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: QrCode,
                title: "Smart QR Ordering",
                description: "QR Code dinamis dengan menu interaktif, customizable sesuai brand, dan analytics mendalam untuk setiap meja.",
                gradient: "from-green-500 to-lime-600",
                features: ["Dynamic Menu", "Table Analytics", "Brand Customization"]
              },
              {
                icon: Mail,
                title: "Email Payment Receipt",
                description: "Fitur otomatis yang mengirimkan struk pembayaran langsung ke email pelanggan setelah transaksi di kasir.",
                gradient: "from-blue-500 to-indigo-600",
                features: [
                  "Struk pembayaran digital",
                  "Pengiriman otomatis via email",
                  "Mendukung transaksi kasir"
                ]
              },
              {
                icon: QrCode,
                title: "QR Ordering via Cashier",
                description: "Kasir dapat menyediakan pemesanan cepat dengan membagikan kode QR yang dapat discan pelanggan.",
                gradient: "from-purple-500 to-fuchsia-600",
                features: [
                  "Pemesanan instan melalui QR",
                  "Integrasi langsung ke sistem kasir",
                  "Meminimalisir antrean"
                ]
              },
              {
                icon: Lock,
                title: "Disable Cash Payment",
                description: "Opsi untuk menonaktifkan metode pembayaran tunai sehingga transaksi hanya lewat non-tunai.",
                gradient: "from-rose-500 to-orange-600",
                features: [
                  "Menonaktifkan pembayaran tunai",
                  "Fokus ke pembayaran digital",
                  "Meningkatkan efisiensi"
                ]
              },
              {
                icon: Smartphone,
                title: "Progressive Web App",
                description: "Website responsive yang berfungsi seperti aplikasi mobile native dan push notifications.",
                gradient: "from-teal-500 to-emerald-600",
                features: ["Responsive Design", "Push Notifications", "Mobile Native Feel"]
              },
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description: "Dashboard dengan machine learning yang memberikan insight prediktif dan rekomendasi untuk meningkatkan profit.",
                gradient: "from-cyan-500 to-sky-600",
                features: ["Predictive Analytics", "Revenue Optimization", "Smart Recommendations"]
              },
              {
                icon: Users,
                title: "Workforce Management",
                description: "Sistem HR terintegrasi dengan face recognition untuk absensi, shift scheduling otomatis, dan payroll calculation.",
                gradient: "from-amber-500 to-yellow-600",
                features: ["Face Recognition", "Auto Scheduling", "Payroll Integration"]
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Keamanan tingkat enterprise dengan enkripsi end-to-end, backup otomatis, dan compliance standar internasional.",
                gradient: "from-slate-600 to-gray-800",
                features: ["End-to-End Encryption", "Auto Backup", "International Compliance"]
              },
              {
                icon: Zap,
                title: "Real-time Sync",
                description: "Sinkronisasi real-time across all devices dengan real-time technology untuk update instant di semua platform.",
                gradient: "from-pink-500 to-red-600",
                features: ["Real-time Technology", "Instant Updates", "Multi-Device Sync"]
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/80 rounded-3xl border border-gray-200 transition-all duration-500 backdrop-blur-sm shadow-lg shadow-black/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/3 to-green-600/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`relative w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-full mb-6">
              <span className="text-green-600 font-medium">Paket Eksklusif</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Investasi Terbaik
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Untuk Masa Depan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih paket yang sesuai dengan visi bisnis Anda. Semua paket include setup, training, dan support unlimited.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
             {segments.map((segment) => {
                const currentPackage = packages.find(pkg => pkg.name === segment);
                const isInDevelopment = currentPackage?.status === "Pengembangan";

                return (
                  <div
                    key={segment}
                    className={`group relative bg-white/90 rounded-3xl border transition-all duration-500 backdrop-blur-sm shadow-lg shadow-black/5 flex flex-col ${
                      isInDevelopment 
                        ? 'border-gray-200 opacity-60 cursor-not-allowed'
                        : currentPackage?.popular
                        ? 'border-green-500/30 shadow-xl shadow-green-500/10 hover:transform hover:scale-100'
                        : 'border-gray-200 hover:border-green-500/20 hover:shadow-xl hover:shadow-green-500/5 hover:transform hover:scale-100'
                    }`}
                  >
                    {/* Gradient Layer */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentPackage?.gradient ?? ''} ${
                      isInDevelopment ? 'opacity-0' : 'opacity-0 group-hover:opacity-10'
                    } rounded-3xl transition-opacity duration-500`}></div>

                    {/* Badge */}
                    {isInDevelopment ? (
                      <div className="absolute -top-4 z-10 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Dalam Pengembangan</span>
                        </div>
                      </div>
                    ) : currentPackage?.popular ? (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>{currentPackage.badge}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-6 right-6">
                        <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                          {currentPackage?.badge ?? ''}
                        </div>
                      </div>
                    )}

                    {/* Konten Utama */}
                    <div className="relative p-8 sm:p-10 flex flex-col flex-grow">
                      {loadingProductService ? (
                        <div className="flex flex-col items-center justify-center py-16 text-green-600">
                          <Loader2 className="w-10 h-10 animate-spin mb-3" />
                          <p className="text-base font-medium">Memuat paket {segment}...</p>
                        </div>
                      ) : errorProductService || !currentPackage ? (
                        <div className="flex flex-col items-center justify-center py-16 text-red-600">
                          <AlertTriangle className="w-10 h-10 mb-3" />
                          <p className="text-base font-semibold">Paket {segment} tidak tersedia</p>
                        </div>
                      ) : (
                        <>
                          <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${
                              isInDevelopment ? 'from-gray-400 to-gray-500' : currentPackage.gradient
                            } rounded-2xl mb-6`}>
                              <Award className="h-10 w-10 text-white" />
                            </div>

                            <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${
                              isInDevelopment 
                                ? 'from-gray-400 to-gray-500' 
                                : 'from-gray-900 to-gray-700'
                            } bg-clip-text text-transparent`}>
                              {currentPackage.name}
                            </h3>

                            <p className={`mb-6 ${isInDevelopment ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentPackage.segment}
                            </p>

                            <div className="space-y-2">
                              <div className="flex items-center justify-center space-x-2">
                                <span className={`text-2xl font-bold bg-gradient-to-r ${
                                  isInDevelopment 
                                    ? 'from-gray-400 to-gray-500' 
                                    : 'from-green-600 to-green-700'
                                } bg-clip-text text-transparent`}>
                                  {formatCurrency(currentPackage.price)}
                                </span>
                                <span className={isInDevelopment ? 'text-gray-400' : 'text-gray-600'}>/bulan</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2">
                                <span className={`line-through ${isInDevelopment ? 'text-gray-300' : 'text-gray-400'}`}>
                                  {formatCurrency(currentPackage.originalPrice)}
                                </span>
                                {!isInDevelopment && (
                                  <span className="text-green-600 text-sm font-medium">{currentPackage.badge}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 mb-8 flex-grow">
                            {currentPackage.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${
                                  isInDevelopment 
                                    ? 'from-gray-400 to-gray-500' 
                                    : 'from-green-500 to-green-600'
                                } rounded-full flex items-center justify-center mt-0.5`}>
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <span className={`leading-relaxed ${
                                  isInDevelopment ? 'text-gray-400' : 'text-gray-700'
                                }`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <button 
                            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 mt-auto ${
                              isInDevelopment
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-100'
                            }`}
                            onClick={() => navigate('/signup', { state: {'packageId': currentPackage?.id}})}
                            disabled={isInDevelopment}
                          >
                            {isInDevelopment 
                              ? 'Segera Hadir' 
                              : currentPackage.popular 
                              ? 'Pilih Paket Terpopuler' 
                              : 'Mulai Sekarang'
                            }
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Tidak yakin paket mana yang tepat? Konsultasi gratis dengan expert kami
            </p>
            <button 
            onClick={() => {
              window.open("https://wa.me/6289524474969", "_blank"); 
            }}
            className="px-8 py-4 border border-green-500/30 text-green-600 rounded-full hover:bg-green-50 transition-all duration-300">
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-full mb-6">
                <span className="text-green-600 font-medium">Mengapa nusas?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Teknologi Yang
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Mengubah Segalanya
                </span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: QrCode,
                    title: "Smart QR Ordering",
                    description: "QR Code dinamis dengan menu interaktif, dapat dikustomisasi sesuai brand, dan menyediakan analytics mendalam."
                  },
                  {
                    icon: BarChart3,
                    title: "AI-Powered Analytics",
                    description: "Dashboard dengan machine learning yang memberikan insight prediktif dan rekomendasi cerdas untuk meningkatkan profit."
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description: "Keamanan tingkat enterprise dengan enkripsi end-to-end, backup otomatis, dan kepatuhan standar internasional."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Stats & Benefits */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg shadow-black/5">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  ROI Yang Terbukti
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "300%", label: "ROI dalam 6 bulan" },
                    { value: "45%", label: "Peningkatan efisiensi" },
                    { value: "60%", label: "Pengurangan wait time" },
                    { value: "25%", label: "Boost revenue rata-rata" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-3xl p-8 border border-green-500/20">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Keunggulan Kompetitif
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Smart QR Ordering untuk pengalaman pemesanan modern",
                    "AI-Powered Analytics dengan insight prediktif",
                    "Enterprise Security dengan enkripsi end-to-end",
                    "Progressive Web App yang responsif dan mobile native feel",
                    "Real-time Sync di semua perangkat"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 font-medium">Hubungi Kami</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Siap Memulai
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Transformasi Digital?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tim expert kami siap membantu implementasi dan memberikan konsultasi strategis untuk digitalisasi bisnis F&B Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg shadow-black/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 bg-clip-text text-transparent">
                  Informasi Kontak
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "WhatsApp Business",
                      info: "+62 895-2447-4969",
                      gradient: "from-green-500 to-green-600"
                    },
                    {
                      icon: Mail,
                      title: "Email Support",
                      info: "nusasinternal@gmail.com",
                      gradient: "from-green-600 to-emerald-600"
                    },
                    // {
                    //   icon: MapPin,
                    //   title: "Kantor Pusat",
                    //   info: "Jakarta Selatan, Indonesia",
                    //   gradient: "from-emerald-500 to-green-600"
                    // }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4 group hover:transform hover:scale-100 transition-all duration-300">
                      <div className={`w-14 h-14 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-600 mb-1">{contact.title}</div>
                        <div className="text-gray-400">{contact.info}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-3xl p-8 border border-green-500/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-600 font-bold">Response Time</h3>
                    <p className="text-green-400">&lt; 15 menit saat jam kerja</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Tim support kami tersedia untuk emergency dan prioritas tinggi. 
                  Response time rata-rata kurang dari 15 menit di jam kerja.
                </p>
              </div>
            </div>

            {/* CTA Card */}
             <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-lg shadow-black/5 backdrop-blur-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Konsultasi Eksklusif
                </h3>
                <p className="text-gray-400 mb-8">
                  Dapatkan sesi konsultasi strategis 1-on-1 dengan tim kami + studi kasus dari bisnis serupa untuk inspirasi solusi.
                </p>
              </div>

              {/* Button ke WhatsApp */}
              <div className="space-y-4">
                <a
                  onClick={() => {
                    window.open("https://wa.me/6289524474969", "_blank"); 
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl font-semibold text-white text-center hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-100"
                >
                  Konsultasi
                </a>
              </div>

              {/* Info bawah */}
              <div className="text-center mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Data aman & terenkripsi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Fleksibel sesuai kebutuhan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Handshake className="w-4 h-4 text-green-500" />
                  <span>Tanpa komitmen awal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-20 text-center">
            <p className="text-gray-400 mb-8">Dipercaya oleh 500+ restoran di seluruh Indonesia</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['McDonald\'s', 'KFC', 'Pizza Hut', 'Starbucks', 'Burger King', 'Domino\'s'].map((brand, index) => (
                <div key={index} className="text-2xl font-bold text-gray-600">
                  {brand}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand & Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <img src='/image/logo_nusas_1.png' alt="Nusas Logo" className="w-12 h-12" />
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  nusas
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                Platform digitalisasi F&B terdepan di Indonesia. Kami membantu ribuan restoran dan cafe 
                bertransformasi digital dengan teknologi AI dan automation terkini.
              </p>

              {/* Company Legal Info */}
              <div className="space-y-4 mb-8">
                <h5 className="text-white font-semibold text-sm mb-4">PT NUSAS DIGITAL SOLUSI</h5>
                
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400">
                      KP Tunggul Jaya RT/RW 007/001, Lebakwana,<br />
                      Kramatwatu, Serang, Banten, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:nusasinternal@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                    nusasinternal@gmail.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="https://wa.me/6289524474969" className="text-gray-400 hover:text-green-400 transition-colors">
                    +62 895-2447-4969
                  </a>
                </div>
              </div>

              {/* Social Media */}
              {/* <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Twitter, label: 'Twitter' }
                ].map((social, index) => (
                  <button 
                    key={index}
                    aria-label={social.label}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </button>
                ))}
              </div> */}
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Solusi</h4>
              <ul className="space-y-3">
                {[
                  'QR Code Ordering',
                  'Payment Integration',
                  'Analytics Dashboard',
                  'Staff Management',
                  'Multi-location',
                  'API Integration'
                ].map((item, index) => (
                  <li key={index} className="text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {[
                  'Documentation',
                  'Help Center',
                  'Community',
                  'Training',
                  'System Status',
                  'Contact Support'
                ].map((item, index) => (
                  <li key={index} className="text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-500 text-sm text-center lg:text-left">
                © 2025 PT NUSAS DIGITAL SOLUSI. All rights reserved. Made with ❤️ in Indonesia
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <button onClick={() => navigate('/privacy/policy')} className="hover:text-green-400 transition-colors">Privacy Policy</button>
                <button onClick={() => navigate('/term/and/condition')} className="hover:text-green-400 transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => {
            window.open("https://wa.me/6289524474969", "_blank"); 
          }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl shadow-green-500/25 flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <Phone className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}