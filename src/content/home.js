import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  QrCode, 
  Smartphone, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  UserCheck, 
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Zap,
  TrendingUp,
  Shield,
  Sparkles,
  Play,
  ChevronDown,
  Eye,
  Target,
  Award
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = ['home', 'services', 'packages', 'features', 'contact'];
      const scrollPos = scrollPosition + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const packages = [
    {
      name: "Starter",
      price: "500K",
      originalPrice: "750K",
      segment: "Perfect untuk UMKM",
      features: [
        "Web pemesanan dengan QR Code",
        "QR Code untuk dine-in & take-away",
        "Dashboard admin modern",
        "Manajemen menu real-time",
        "Notifikasi pesanan instant",
        "Support WhatsApp 24/7"
      ],
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      popular: false,
      badge: "Hemat 33%"
    },
    {
      name: "Business Pro",
      price: "600K",
      originalPrice: "900K",
      segment: "Untuk bisnis berkembang",
      features: [
        "Semua fitur Starter Package",
        "Advanced analytics & insights",
        "Laporan keuangan otomatis",
        "Multi-location support",
        "Custom branding",
        "API integration ready"
      ],
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      popular: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "750K",
      originalPrice: "1.2M",
      segment: "Solusi lengkap enterprise",
      features: [
        "Semua fitur Business Pro",
        "HR Management terintegrasi",
        "Payroll & absensi otomatis",
        "Advanced role permissions",
        "White-label solution",
        "Dedicated account manager"
      ],
      gradient: "from-indigo-500 via-purple-600 to-pink-600",
      popular: false,
      badge: "Enterprise"
    }
  ];

  const stats = [
    { number: "500+", label: "Restoran Bergabung", icon: Target },
    { number: "99.9%", label: "Uptime Guaranteed", icon: Shield },
    { number: "24/7", label: "Customer Support", icon: Clock },
    { number: "50%", label: "Boost Penjualan", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                QRestro
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {['home', 'services', 'packages', 'features', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative capitalize transition-all duration-300 hover:text-emerald-400 ${
                    activeSection === item ? 'text-emerald-400' : 'text-gray-300'
                  }`}
                >
                  {item === 'home' ? 'Beranda' : 
                   item === 'services' ? 'Layanan' :
                   item === 'packages' ? 'Paket' :
                   item === 'features' ? 'Fitur' : 'Kontak'}
                  {activeSection === item && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-6 py-2 text-emerald-400 border border-emerald-400/30 rounded-full hover:bg-emerald-400/10 transition-all duration-300">
                Demo Gratis
              </button>
              <button 
                onClick={() => scrollToSection('packages')}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
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
            <div className="lg:hidden pb-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl mt-2 border border-emerald-500/20">
              <div className="px-4 py-6 space-y-4">
                {['home', 'services', 'packages', 'features', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-3 capitalize hover:text-emerald-400 transition-colors"
                  >
                    {item === 'home' ? 'Beranda' : 
                     item === 'services' ? 'Layanan' :
                     item === 'packages' ? 'Paket' :
                     item === 'features' ? 'Fitur' : 'Kontak'}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  <button className="w-full py-3 text-emerald-400 border border-emerald-400/30 rounded-full hover:bg-emerald-400/10 transition-all duration-300">
                    Demo Gratis
                  </button>
                  <button 
                    onClick={() => scrollToSection('packages')}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
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
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">#1 F&B Digital Solution</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Revolusi Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Restoran Anda
              </span>
            </h1>

            <p className="text-xl sm:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sistem QR Code ordering terdepan dengan AI analytics, management terintegrasi, 
              dan dashboard yang akan mengubah cara Anda berbisnis F&B
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => scrollToSection('packages')}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <span>Mulai Gratis Hari Ini</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group flex items-center space-x-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 ml-1" />
                </div>
                <span>Tonton Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-xl animate-bounce delay-1000"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 font-medium">Layanan Premium</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Teknologi Masa Depan
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Untuk Bisnis Anda
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Solusi end-to-end yang akan mentransformasi operasional restoran Anda dengan teknologi AI dan automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: QrCode,
                title: "Smart QR Ordering",
                description: "QR Code dinamis dengan menu interaktif, customizable sesuai brand, dan analytics mendalam untuk setiap meja.",
                gradient: "from-emerald-500 to-teal-600",
                features: ["Dynamic Menu", "Table Analytics", "Brand Customization"]
              },
              {
                icon: Smartphone,
                title: "Progressive Web App",
                description: "Website responsive yang berfungsi seperti aplikasi mobile native dengan offline support dan push notifications.",
                gradient: "from-cyan-500 to-blue-600",
                features: ["Offline Support", "Push Notifications", "Mobile Native Feel"]
              },
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description: "Dashboard dengan machine learning yang memberikan insight prediktif dan rekomendasi untuk meningkatkan profit.",
                gradient: "from-purple-500 to-pink-600",
                features: ["Predictive Analytics", "Revenue Optimization", "Smart Recommendations"]
              },
              {
                icon: Users,
                title: "Workforce Management",
                description: "Sistem HR terintegrasi dengan face recognition untuk absensi, shift scheduling otomatis, dan payroll calculation.",
                gradient: "from-orange-500 to-red-600",
                features: ["Face Recognition", "Auto Scheduling", "Payroll Integration"]
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Keamanan tingkat enterprise dengan enkripsi end-to-end, backup otomatis, dan compliance standar internasional.",
                gradient: "from-indigo-500 to-purple-600",
                features: ["End-to-End Encryption", "Auto Backup", "International Compliance"]
              },
              {
                icon: Zap,
                title: "Real-time Sync",
                description: "Sinkronisasi real-time across all devices dengan WebSocket technology untuk update instant di semua platform.",
                gradient: "from-yellow-500 to-orange-600",
                features: ["WebSocket Technology", "Instant Updates", "Multi-Device Sync"]
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`relative w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
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
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 font-medium">Paket Eksklusif</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Investasi Terbaik
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Untuk Masa Depan
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pilih paket yang sesuai dengan visi bisnis Anda. Semua paket include setup, training, dan support unlimited.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm ${
                  pkg.popular 
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                    : 'border-slate-700/50 hover:border-emerald-500/30'
                }`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>{pkg.badge}</span>
                    </div>
                  </div>
                )}

                {/* Package Badge */}
                {!pkg.popular && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                      {pkg.badge}
                    </div>
                  </div>
                )}

                <div className="relative p-8 sm:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${pkg.gradient} rounded-2xl mb-6`}>
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-6">{pkg.segment}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          {pkg.price}
                        </span>
                        <span className="text-gray-400">/bulan</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 line-through">{pkg.originalPrice}</span>
                        <span className="text-emerald-400 text-sm font-medium">Hemat 33%</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/25 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:shadow-2xl hover:shadow-emerald-500/25 text-white'
                  } transform hover:scale-105`}>
                    {pkg.popular ? 'Pilih Paket Terpopuler' : 'Mulai Sekarang'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Tidak yakin paket mana yang tepat? Konsultasi gratis dengan expert kami
            </p>
            <button className="px-8 py-4 border border-emerald-500/30 text-emerald-400 rounded-full hover:bg-emerald-500/10 transition-all duration-300">
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="text-cyan-400 font-medium">Mengapa QRestro?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Teknologi Yang
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Mengubah Segalanya
                </span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: Zap,
                    title: "Performance Lightning Fast",
                    description: "Sistem cloud dengan CDN global untuk loading time di bawah 2 detik di seluruh Indonesia."
                  },
                  {
                    icon: Eye,
                    title: "AI-Driven Insights",
                    description: "Machine learning algorithms yang menganalisis pattern pelanggan dan memberikan actionable insights."
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Grade Security",
                    description: "Sertifikasi ISO 27001 dengan encryption AES-256 dan backup multi-region untuk data protection maksimal."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Stats & Benefits */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
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
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl p-8 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Keunggulan Kompetitif
                </h3>
                
                <div className="space-y-4">
                  {[
                    "99.9% uptime dengan monitoring 24/7",
                    "API integration dengan 50+ payment gateways",
                    "Multi-language support (ID, EN, CN)",
                    "Scalable architecture untuk unlimited growth",
                    "White-label customization available"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
              <span className="text-pink-400 font-medium">Hubungi Kami</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Siap Memulai
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
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
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Informasi Kontak
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "WhatsApp Business",
                      info: "+62 812-3456-7890",
                      gradient: "from-green-500 to-emerald-600"
                    },
                    {
                      icon: Mail,
                      title: "Email Support",
                      info: "hello@qrestro.id",
                      gradient: "from-blue-500 to-cyan-600"
                    },
                    {
                      icon: MapPin,
                      title: "Kantor Pusat",
                      info: "Jakarta Selatan, Indonesia",
                      gradient: "from-purple-500 to-pink-600"
                    }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                      <div className={`w-14 h-14 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{contact.title}</div>
                        <div className="text-gray-400">{contact.info}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl p-8 border border-emerald-500/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Response Time</h3>
                    <p className="text-emerald-400">&lt; 15 menit saat jam kerja</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Tim support kami tersedia 24/7 untuk emergency dan prioritas tinggi. 
                  Response time rata-rata kurang dari 15 menit di jam kerja.
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl p-8 sm:p-10 border border-slate-700/50 backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Demo Eksklusif
                </h3>
                <p className="text-gray-400 mb-8">
                  Dapatkan demo personal dengan data real dari bisnis serupa + konsultasi strategis gratis senilai Rp 2.500.000
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  "✨ Setup demo dengan data real bisnis Anda",
                  "📊 Analisis kompetitor dan market positioning",
                  "💡 Strategi implementasi step-by-step",
                  "🎯 ROI calculation dan business case",
                  "🚀 Free trial 14 hari full features"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl font-semibold text-white hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                  Jadwalkan Demo Sekarang
                </button>
                <button className="w-full py-4 border border-gray-600 rounded-2xl font-semibold text-gray-300 hover:bg-gray-800/50 transition-all duration-300">
                  Download Brochure
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  💳 No credit card required • 🔒 Data aman & terenkripsi • ✅ Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-gray-400 mb-8">Dipercaya oleh 500+ restoran di seluruh Indonesia</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['McDonald\'s', 'KFC', 'Pizza Hut', 'Starbucks', 'Burger King', 'Domino\'s'].map((brand, index) => (
                <div key={index} className="text-2xl font-bold text-gray-600">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  QRestro
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Platform digitalisasi F&B terdepan di Indonesia. Kami membantu ribuan restoran dan cafe 
                bertransformasi digital dengan teknologi AI dan automation terkini.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <button key={index} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-300">
                    <span className="text-xs">{social.charAt(0)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Solusi</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  'QR Code Ordering',
                  'Payment Integration',
                  'Analytics Dashboard',
                  'Staff Management',
                  'Multi-location',
                  'API Integration'
                ].map((item, index) => (
                  <li key={index} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  'Documentation',
                  'Help Center',
                  'Community',
                  'Training',
                  'System Status',
                  'Contact Support'
                ].map((item, index) => (
                  <li key={index} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 sm:mb-0">
              © 2025 QRestro. All rights reserved. Made with ❤️ in Indonesia
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-emerald-400 transition-colors">Terms of Service</button>
              <button className="hover:text-emerald-400 transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => scrollToSection('contact')}
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full shadow-2xl shadow-emerald-500/25 flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <Phone className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}