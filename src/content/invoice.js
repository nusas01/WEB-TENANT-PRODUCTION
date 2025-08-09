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

import React, { useState, useRef, useEffect } from 'react';
import { 
  QrCode, 
  Wallet, 
  Building2, 
  CreditCard, 
  Clock, 
  Smartphone, 
  AlertCircle, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Receipt, 
  Download 
} from 'lucide-react';

const PaymentInvoice = ({ paymentData, colorType }) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const invoiceRef = useRef(null);

  // Color theme configuration
  const themes = {
    external: {
      primary: 'emerald',
      secondary: 'teal',
      headerBg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      accentBg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      textPrimary: 'text-emerald-700',
      textSecondary: 'text-emerald-600',
      textAccent: 'text-emerald-800',
      iconColor: 'text-emerald-500',
      buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
      downloadBg: 'bg-red-400 hover:bg-red-500'
    },
    internal: {
      primary: 'gray',
      secondary: 'slate',
      headerBg: 'bg-gradient-to-r from-gray-800 to-gray-900',
      accentBg: 'bg-gradient-to-br from-gray-50 to-slate-50',
      borderColor: 'border-gray-300',
      textPrimary: 'text-gray-700',
      textSecondary: 'text-gray-600',
      textAccent: 'text-gray-800',
      iconColor: 'text-gray-600',
      buttonBg: 'bg-gray-800 hover:bg-gray-900',
      downloadBg: 'bg-gray-800 hover:bg-gray-900'
    }
  };

  const theme = themes[colorType] || themes.external;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalAmount = paymentData.amount + paymentData.tax + paymentData.fee;

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
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = invoiceRef.current;
      
      if (!element) {
        throw new Error('Invoice element not found');
      }

      if (typeof window.html2canvas === 'undefined') {
        throw new Error('html2canvas library not loaded');
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await window.html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        logging: true,
        imageTimeout: 0,
        removeContainer: false,
        foreignObjectRendering: false,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        ignoreElements: function(element) {
          return element.classList && (
            element.classList.contains('animate-pulse') ||
            element.classList.contains('animate-spin') ||
            element.classList.contains('animate-slide-in')
          );
        }
      });

      if (canvas.width < 100 || canvas.height < 100) {
        throw new Error('Canvas too small, might be a rendering issue');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      if (!imgData || imgData.length < 1000) {
        throw new Error('Generated image data is too small');
      }
      
      const link = document.createElement('a');
      link.download = `NUSAS-Invoice-${Date.now().toString().slice(-6)}.png`;
      link.href = imgData;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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
        {/* Main Invoice Card */}
        <div ref={invoiceRef} className={`bg-white rounded-lg shadow-lg border ${colorType === 'external' ? 'border-emerald-100' : 'border-gray-200'} overflow-hidden`}>
          {/* Header Section */}
          <div className={`${theme.headerBg} text-white p-6 relative overflow-hidden`}>
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
                    <p className={`${colorType === 'external' ? 'text-emerald-100' : 'text-gray-300'} text-sm`}>
                      Digital Payment Solutions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${colorType === 'external' ? 'text-emerald-100' : 'text-gray-300'} text-sm`}>
                    Invoice ID
                  </p>
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
                  <p className={`${colorType === 'external' ? 'text-emerald-100' : 'text-gray-300'} text-sm`}>
                    Total Amount
                  </p>
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
                
                <div className={`inline-block p-4 bg-white border-2 ${theme.borderColor} rounded-xl shadow-inner mb-6`}>
                  <div className={`w-48 h-48 ${theme.accentBg} rounded-lg flex items-center justify-center border-2 border-dashed ${theme.borderColor}`}>
                    <div className="text-center">
                      <QrCode className={`w-16 h-16 ${theme.iconColor} mx-auto mb-2`} />
                      <p className={`${theme.textPrimary} font-medium`}>QR Code</p>
                      <p className={`text-sm ${theme.textSecondary}`}>Ready to Scan</p>
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
                
                <div className={`inline-block p-8 bg-white rounded-xl mb-6 border-2 ${theme.borderColor}`}>
                  <div className={`w-24 h-24 ${theme.accentBg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Smartphone className={`w-12 h-12 ${theme.iconColor}`} />
                  </div>
                  <h3 className={`${theme.textPrimary} font-bold text-lg`}>{paymentData.channel_code} Payment</h3>
                  <p className={`${theme.textSecondary} text-sm`}>Ready for Payment</p>
                </div>
                
                <div className={`${theme.accentBg} rounded-lg space-y-2 p-4 mt-6 border-2 ${theme.borderColor}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 ${theme.textSecondary} mt-0.5 flex-shrink-0`} />
                    <div className="text-left">
                      <p className={`${theme.textAccent} font-medium text-sm`}>Informasi:</p>
                      <p className={`${theme.textPrimary} text-sm mt-1`}>
                        Pastikan saldo {paymentData.channel_code} Anda mencukupi untuk melakukan pembayaran sebesar <strong>{formatCurrency(totalAmount)}</strong>
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(paymentData.redirect_url_web, '_blank')}
                    className={`w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg border-2 ${theme.borderColor} transition-colors flex items-center justify-center gap-2 group`}
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
                
                <div className={`${theme.accentBg} rounded-xl p-6 mb-6 border-2 ${theme.borderColor}`}>
                  <div className="text-center">
                    <p className={`${theme.textPrimary} font-medium mb-2`}>Nomor Virtual Account</p>
                    <div className={`bg-white rounded-lg p-4 border-2 ${theme.borderColor} shadow-inner`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-mono font-bold ${theme.textAccent} tracking-wider`}>
                          {paymentData.virtual_account_number}
                        </span>
                        <button
                          onClick={() => copyToClipboard(paymentData.virtual_account_number)}
                          className={`ml-3 p-2 ${theme.iconColor} hover:bg-blue-100 rounded-lg transition-colors group`}
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
              <Receipt className={`w-5 h-5 ${theme.iconColor}`} />
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
              
              <div className={`flex justify-between items-center py-2 ${colorType === 'external' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'} rounded-lg px-4 border`}>
                <span className={`font-semibold ${colorType === 'external' ? 'text-emerald-800' : 'text-gray-800'} text-lg`}>
                  Total Pembayaran
                </span>
                <span className={`font-bold ${colorType === 'external' ? 'text-emerald-800' : 'text-gray-800'} text-xl`}>
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Button */}
        {paymentData.payment_method !== "EWALLET" && (
          <div className="mt-6">
            <button
              onClick={downloadInvoiceAsPNG}
              disabled={downloading}
              className={`w-full ${theme.downloadBg} disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
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
          <div className={`bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 border ${colorType === 'external' ? 'border-emerald-100' : 'border-gray-200'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`w-3 h-3 ${colorType === 'external' ? 'bg-emerald-500' : 'bg-gray-600'} rounded-full`}></div>
              <span className={`${colorType === 'external' ? 'text-emerald-700' : 'text-gray-700'} font-medium`}>
                Secure Payment Processing
              </span>
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

export default PaymentInvoice;