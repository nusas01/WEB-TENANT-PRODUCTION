import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  QrCode, 
  Smartphone, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Receipt, 
  ExternalLink,
  CreditCard,
  Building2,
  Wallet
} from 'lucide-react';
import {
    formatCurrency,
    formatDateTime
} from './helper'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InvoicePDFDownloader = () => {
  const navigate = useNavigate()
  const [downloading, setDownloading] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const invoiceRef = useRef(null);

  // Mock data untuk demo
  const {dataRegisterVerification} = useSelector((state) => state.persisted.registerVerification)
  const {dataExtendServiceStore} = useSelector((state) => state.persisted.extendServiceStore)
  const paymentData = dataRegisterVerification || dataExtendServiceStore || {};

  const totalAmount = paymentData.amount + paymentData.tax + paymentData.fee; 

  useEffect(() => {
    const isExtendEmpty = Object.keys(dataExtendServiceStore || {}).length === 0;
    const isRegisterEmpty = Object.keys(dataRegisterVerification || {}).length === 0;

    if (isExtendEmpty && isRegisterEmpty) {
        navigate('/');
    }
    }, [dataRegisterVerification, dataExtendServiceStore]);


  const getChannelIcon = (method) => {
    switch (method) {
      case 'QR': return <QrCode className="w-6 h-6" />;
      case 'EWALLET': return <Wallet className="w-6 h-6" />;
      case 'VA': return <Building2 className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedVA(true);
      setTimeout(() => setCopiedVA(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const downloadInvoiceAsPNG = async () => {
    setDownloading(true);
    
    try {
      // Load html2canvas library
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      
      // Tunggu sebentar untuk memastikan library sudah loaded
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = invoiceRef.current;
      
      if (!element) {
        throw new Error('Invoice element not found');
      }

      // Pastikan library tersedia
      if (typeof window.html2canvas === 'undefined') {
        throw new Error('html2canvas library not loaded');
      }

      // Scroll ke element untuk memastikan terlihat
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Tunggu sebentar setelah scroll
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get element dimensions
      const rect = element.getBoundingClientRect();
      
      console.log('Element dimensions:', {
        width: element.offsetWidth,
        height: element.offsetHeight,
        rect: rect
      });

      // Konfigurasi html2canvas untuk kualitas HD dengan pengaturan yang lebih specific
      const canvas = await window.html2canvas(element, {
        scale: 2, // Turunkan scale untuk testing
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        logging: true, // Enable logging untuk debugging
        imageTimeout: 0,
        removeContainer: false,
        foreignObjectRendering: false, // Disable untuk compatibility
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        ignoreElements: function(element) {
          // Ignore certain elements that might cause issues
          return element.classList && (
            element.classList.contains('animate-pulse') ||
            element.classList.contains('animate-spin') ||
            element.classList.contains('animate-slide-in')
          );
        }
      });

      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height
      });

      // Check if canvas is too small
      if (canvas.width < 100 || canvas.height < 100) {
        throw new Error('Canvas too small, might be a rendering issue');
      }

      // Convert to high quality PNG
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Check if imgData is valid
      if (!imgData || imgData.length < 1000) {
        throw new Error('Generated image data is too small');
      }
      
      // Create download link
      const link = document.createElement('a');
      link.download = `NUSAS-Invoice-${Date.now().toString().slice(-6)}.png`;
      link.href = imgData;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download completed successfully');
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert(`Gagal mengunduh PNG: ${error.message}. Silakan coba lagi.`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Invoice Card - Yang akan di-download sebagai PDF */}
        <div ref={invoiceRef} className="bg-white rounded-lg shadow-lg border border-emerald-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">NUSAS</h1>
                    <p className="text-emerald-100 text-sm">Digital Payment Solutions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-sm">Invoice ID</p>
                  <p className="text-white font-mono font-semibold">NUSAS-{Date.now().toString().slice(-6)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getChannelIcon(paymentData.payment_method)}
                    <span className="text-xl font-semibold">{paymentData.channel_code}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white border border-white border-opacity-30">
                    {paymentData.product?.charAt(0).toUpperCase() + paymentData.product?.slice(1)} Plan
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-sm">Total Amount</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Method Specific Content */}
          <div className="p-6">
            {paymentData.payment_method === 'QR' && (
              <div className="text-center">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Scan QR Code untuk Pembayaran</h2>
                  <p className="text-gray-600">Gunakan aplikasi mobile banking atau e-wallet favorit Anda</p>
                </div>
                
                <div className="inline-block p-4 bg-white border-2 border-emerald-200 rounded-xl shadow-inner mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center border-2 border-dashed border-emerald-300">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-emerald-500 mx-auto mb-2" />
                      <p className="text-emerald-700 font-medium">QR Code</p>
                      <p className="text-sm text-emerald-600">Ready to Scan</p>
                    </div>
                  </div>
                </div>
                
                {paymentData.expires_at && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Berlaku sampai: {formatDateTime(paymentData.expires_at)}</span>
                  </div>
                )}
              </div>
            )}
            
            {paymentData.payment_method === 'EWALLET' && (
              <div className="text-center">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Pembayaran {paymentData.channel_code}</h2>
                  <p className="text-gray-600">Lanjutkan pembayaran menggunakan aplikasi {paymentData.channel_code}</p>
                </div>
                
                <div className="inline-block p-8 bg-white rounded-xl mb-6 border-2 border-emerald-200">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Smartphone className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h3 className="text-emerald-700 font-bold text-lg">{paymentData.channel_code} Payment</h3>
                  <p className="text-emerald-600 text-sm">Ready for Payment</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg space-y-2 p-4 mt-6 border-2 border-emerald-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-emerald-800 font-medium text-sm">Informasi:</p>
                      <p className="text-emerald-700 text-sm mt-1">
                        Pastikan saldo {paymentData.channel_code} Anda mencukupi untuk melakukan pembayaran sebesar <strong>{formatCurrency(totalAmount)}</strong>
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(paymentData.redirect_url_web, '_blank')}
                    className="w-full bg-white text-gray-900 font-semibold py-3 px-6  group-hover:translate-x-1 rounded-lg border-2 border-emerald-200 transition-colors flex items-center justify-center gap-2 group"
                  >
                    Lanjutkan Pembayaran
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
            
            {paymentData.payment_method === 'VA' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{paymentData.channel_code} Virtual Account</h2>
                  <p className="text-gray-600">Transfer ke nomor Virtual Account di bawah ini</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-emerald-200">
                  <div className="text-center">
                    <p className="text-emerald-700 font-medium mb-2">Nomor Virtual Account</p>
                    <div className="bg-white rounded-lg p-4 border-2 border-emerald-200 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-mono font-bold text-emerald-900 tracking-wider">
                          {paymentData.virtual_account_number}
                        </span>
                        <button
                          onClick={() => copyToClipboard(paymentData.virtual_account_number)}
                          className="ml-3 p-2 text-emerald-500 hover:bg-blue-100 rounded-lg transition-colors group"
                          title="Copy VA Number"
                        >
                          {copiedVA ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          )}
                        </button>
                      </div>
                    </div>
                    {copiedVA && (
                      <p className="text-green-600 text-sm mt-2 font-medium">Nomor VA berhasil disalin!</p>
                    )}
                  </div>
                </div>
                
                {paymentData.expires_at && (
                  <div className="flex items-center justify-center gap-2 mt-6 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Berlaku sampai: {formatDateTime(paymentData.expires_at)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Payment Breakdown */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-500" />
              Rincian Pembayaran
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subtotal Layanan</span>
                <span className="font-semibold text-gray-900">{formatCurrency(paymentData.amount)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Pajak & Administrasi</span>
                <span className="font-semibold text-gray-900">{formatCurrency(paymentData.tax)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Biaya Pemrosesan</span>
                <span className="font-semibold text-gray-900">{formatCurrency(paymentData.fee)}</span>
              </div>
              
              <hr className="border-gray-300 my-3" />
              
              <div className="flex justify-between items-center py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg px-4 border border-emerald-200">
                <span className="font-semibold text-emerald-800 text-lg">Total Pembayaran</span>
                <span className="font-bold text-emerald-800 text-xl">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Button - Di luar area yang akan di-capture */}
        { paymentData.payment_method !== "EWALLET" && (
            <div className="mt-6">
                <button
                    onClick={downloadInvoiceAsPNG}
                    disabled={downloading}
                    className="w-full bg-red-400 hover:bg-red-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                    {downloading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating HD PNG...
                    </>
                    ) : (
                    <>
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Download Invoice as HD PNG
                    </>
                    )}
                </button>
            </div>
        )}

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-700 font-medium">Secure Payment Processing</span>
            </div>
            <p className="text-gray-600 text-sm">
              Pembayaran akan diverifikasi otomatis setelah berhasil. 
              Notifikasi akan dikirim ke email yang terdaftar.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2025 NUSAS - Digital Payment Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDFDownloader;