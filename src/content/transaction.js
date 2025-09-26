import React, { useEffect, useState } from 'react';
import { 
  Hourglass,
  Store, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Copy, 
  ExternalLink,
  AlertCircle,
  Receipt,
  DollarSign,
  Menu,
} from 'lucide-react';
import Sidebar from './sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { navbarSlice } from '../reducers/reducers';
import { useElementHeight } from './helper';
import {
  Toast,
  ToastPortal
} from './alert';
import {getRequiredPaymentSlice} from '../reducers/get'
import {fetchRequiredPayment} from '../actions/get'
import { TimeLeft } from '../helperComponent/countDown';

const PendingTransactions = () => {
  const dispatch = useDispatch()
  const [copiedId, setCopiedId] = useState(null);
  const {toast, setToast} = useState(null)

  const { setIsOpen } = navbarSlice.actions
  const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

  const { ref: headerRef, height: headerHeight } = useElementHeight();
  
  // Sample data berdasarkan struktur yang diberikan
  const {resetErrorRequiredPayment, removeRequiredPaymentById} = getRequiredPaymentSlice.actions
  const {dataRequiredPayment:transactions, loadingRequiredPayment, errorRequiredPayment} = useSelector((state) => state.persisted.getRequiredPayment)
  
  useEffect(() => {
    if (transactions.length === 0) {
      dispatch(fetchRequiredPayment())
    }
  }, [])

  useEffect(() => {
    if (errorRequiredPayment) {
      setToast({
          type: "error",
          message: errorRequiredPayment
      })
    }
  }, [errorRequiredPayment])

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEwalletRedirect = (paymentReference) => {
    window.open(paymentReference, '_blank');
  };

  const generateQRCode = (data) => {
    // Simulasi QR code dengan pattern sederhana
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" fill="white"/>
        <rect x="10" y="10" width="100" height="100" fill="black"/>
        <rect x="20" y="20" width="80" height="80" fill="white"/>
        <rect x="30" y="30" width="60" height="60" fill="black"/>
        <rect x="40" y="40" width="40" height="40" fill="white"/>
        <rect x="50" y="50" width="20" height="20" fill="black"/>
      </svg>
    `)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPaymentMethodIcon = (method, channelCode) => {
    switch (method) {
      case 'EWALLET':
        return <Smartphone className="w-5 h-5" />;
      case 'VA':
        return <CreditCard className="w-5 h-5" />;
      case 'QR':
        return <QrCode className="w-5 h-5" />;
      default:
        return <Receipt className="w-5 h-5" />;
    }
  };

  const getChannelColor = (channelCode) => {
    const colors = {
      'GOPAY': 'bg-green-100 text-green-800',
      'OVO': 'bg-purple-100 text-purple-800',
      'BCA': 'bg-blue-100 text-blue-800',
      'QRIS': 'bg-orange-100 text-orange-800'
    };
    return colors[channelCode] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to check if transaction is expired
  const isExpired = (expiresAt) => {
    const now = new Date();
    const expiryTime = new Date(expiresAt);
    return now >= expiryTime;
  };

  return (
    <div className='flex'>
      {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
        <div className='w-1/10 z-50 min-w-[290px]'>
          <Sidebar
          activeMenu={"Payment Required"}
          />
        </div>
      )}

      <div className='flex-1'>
        {toast && (
            <ToastPortal> 
                <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => { 
                    setToast(null)
                    dispatch(resetErrorRequiredPayment())
                }} 
                duration={3000}
                />
                </div>
            </ToastPortal>
        )}

        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
          <div>
            {/* Header */}
            <div
              ref={headerRef}
              className={`fixed top-0 z-10 bg-white border-b border-gray-200 ${isMobileDeviceType && isOpen ? 'hidden' : ''}`}
              style={{
                left: (isMobileDeviceType) ? '0' : '288px',
                width: isMobileDeviceType ? '100%' : 'calc(100% - 288px)',
                height: '64px'
              }}
            >
              <div className="h-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                <div className="flex items-center justify-between h-full gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                        <div className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center shadow-lg flex-shrink-0">
                            <Hourglass className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Payment Required</h1>
                            <p className='text-xs taxt-gray-400'>List of transactions awaiting payment</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0'>
                      { isMobileDeviceType && (
                        <button 
                          onClick={() => dispatch(setIsOpen(true))}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors touch-manipulation"
                          aria-label="Open menu"
                        >
                          <Menu className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                      )}
                    </div>
                </div>
              </div>
            </div>  

            {/* Transactions List */}
            <div className="space-y-4" style={{marginTop: headerHeight}}>
              {/* Loading State */}
              {loadingRequiredPayment && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                      <div className="p-6">
                        {/* Header Skeleton */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-300 rounded-lg"></div>
                            <div>
                              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                        </div>

                        {/* Product Info Skeleton */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                          </div>
                        </div>

                        {/* Payment Method Skeleton */}
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                          </div>
                          <div className="space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
                          </div>
                        </div>

                        {/* Expiry Skeleton */}
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-40"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actual Transactions */}
              {!loadingRequiredPayment && transactions && transactions.length > 0 && 
                transactions.map((transaction) => (
                  <div key={transaction.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
                    isExpired(transaction.expires_at) ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
                  }`}>
                    {/* CountDownRemoveData component for automatic removal */}
                    <div className="p-6">
                      {/* Header Transaction */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isExpired(transaction.expires_at) ? 'bg-red-100' : 'bg-gray-900'
                          }`}>
                            <Store className={`w-5 h-5 ${
                              isExpired(transaction.expires_at) ? 'text-red-600' : 'text-white'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${
                              isExpired(transaction.expires_at) ? 'text-red-900' : 'text-gray-900'
                            }`}>
                              {transaction.store_name}
                              {isExpired(transaction.expires_at) && (
                                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                  EXPIRED
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">ID: {transaction.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getChannelColor(transaction.channel_code)}`}>
                            {transaction.channel_code}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`rounded-lg p-4 mb-4 ${
                        isExpired(transaction.expires_at) ? 'bg-red-50' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Receipt className={`w-4 h-4 ${
                            isExpired(transaction.expires_at) ? 'text-red-600' : 'text-gray-600'
                          }`} />
                          <span className={`font-medium ${
                            isExpired(transaction.expires_at) ? 'text-red-900' : 'text-gray-900'
                          }`}>
                            {transaction.product}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span>Pajak: {formatCurrency(transaction.tax)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Biaya: {formatCurrency(transaction.fee)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method Section */}
                      <div className={`border rounded-lg p-4 ${
                        isExpired(transaction.expires_at) ? 'border-red-200 bg-red-50/50' : ''
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded ${
                            isExpired(transaction.expires_at) ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {getPaymentMethodIcon(transaction.payment_method, transaction.channel_code)}
                          </div>
                          <span className={`font-medium ${
                            isExpired(transaction.expires_at) ? 'text-red-900' : 'text-gray-900'
                          }`}>
                            {transaction.payment_method === 'EWALLET' && 'E-Wallet'}
                            {transaction.payment_method === 'VA' && 'Virtual Account'}
                            {transaction.payment_method === 'QR' && 'QR Code'}
                          </span>
                        </div>

                        {/* Disable payment options if expired */}
                        <div className={isExpired(transaction.expires_at) ? 'opacity-50 pointer-events-none' : ''}>
                          {/* E-Wallet Payment */}
                          {transaction.payment_method === 'EWALLET' && (
                            <div className="space-y-3">
                              {/* Pesan jika expired */}
                              <p className="text-sm text-gray-600">
                                {isExpired(transaction.expires_at) 
                                  ? 'Transaksi telah expired. Silahkan buat transaksi baru.'
                                  : transaction.channel_code === 'OVO'
                                    ? 'Untuk pembayaran menggunakan OVO, notifikasi akan langsung muncul di aplikasi OVO Anda. Silakan cek aplikasi OVO secara langsung untuk menyelesaikan pembayaran.'
                                    : 'Klik tombol di bawah untuk membuka aplikasi pembayaran'
                                }
                              </p>

                              {/* Jika bukan OVO → tampilkan tombol */}
                              {transaction.channel_code !== 'OVO' && (
                                <button
                                  onClick={() => handleEwalletRedirect(transaction.redirect_url_mobile)}
                                  disabled={isExpired(transaction.expires_at)}
                                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                                    isExpired(transaction.expires_at)
                                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                      : 'bg-gray-900 text-white hover:bg-gray-800'
                                  }`}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  {isExpired(transaction.expires_at) 
                                    ? 'Expired'
                                    : `Buka Aplikasi ${transaction.channel_code}`
                                  }
                                </button>
                              )}
                            </div>
                          )}

                          {/* Virtual Account Payment */}
                          {transaction.payment_method === 'VA' && (
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                {isExpired(transaction.expires_at)
                                  ? 'Virtual Account telah expired'
                                  : 'Gunakan nomor Virtual Account berikut untuk transfer'
                                }
                              </p>
                              <div className={`rounded-lg p-3 flex items-center justify-between ${
                                isExpired(transaction.expires_at) ? 'bg-red-50' : 'bg-gray-50'
                              }`}>
                                <span className={`font-mono text-lg font-semibold ${
                                  isExpired(transaction.expires_at) ? 'text-red-900' : 'text-gray-900'
                                }`}>
                                  {transaction.virtual_account_number}
                                </span>
                                <button
                                  onClick={() => handleCopyCode(transaction.virtual_account_number, transaction.id)}
                                  disabled={isExpired(transaction.expires_at)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  title={isExpired(transaction.expires_at) ? 'Expired' : 'Salin nomor VA'}
                                >
                                  {copiedId === transaction.id ? (
                                    <span className="text-green-600 text-sm font-medium">Tersalin!</span>
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* QR Code Payment */}
                          {transaction.payment_method === 'QR' && (
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                {isExpired(transaction.expires_at)
                                  ? 'QR Code telah expired'
                                  : 'Scan QR Code berikut dengan aplikasi pembayaran Anda'
                                }
                              </p>
                              <div className="flex justify-center">
                                <div className={`bg-white p-4 rounded-lg border-2 ${
                                  isExpired(transaction.expires_at) ? 'border-red-200' : 'border-gray-200'
                                }`}>
                                  <img
                                    src={generateQRCode(transaction.payment_reference)}
                                    alt="QR Code"
                                    className={`w-32 h-32 ${
                                      isExpired(transaction.expires_at) ? 'opacity-50' : ''
                                    }`}
                                  />
                                  {isExpired(transaction.expires_at) && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                                        EXPIRED
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expiry Warning or Status */}
                      <div className="mt-4 flex items-center gap-2 text-sm">
                        <AlertCircle className={`w-4 h-4 ${
                          isExpired(transaction.expires_at) ? 'text-red-500' : 'text-orange-500'
                        }`} />
                        <span className="text-gray-600">
                          {isExpired(transaction.expires_at) ? (
                            <span className="font-medium text-red-600">
                              Transaksi telah expired
                            </span>
                          ) : (
                            <div className='flex gap-2'>
                              <span>
                                Berlaku hingga:
                              </span>
                              <span className="font-medium text-orange-600">
                                <TimeLeft expiry={transaction.expires_at}/>
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }

              {/* Modern Empty State */}
              {!loadingRequiredPayment && transactions && transactions.length === 0 && (
                <div className="text-center bg-white rounded-xl shadow-lg border border-gray-200 py-[18vh]">
                  {/* Animated Icon Container */}
                  <div className="relative mb-8">
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl inline-block relative overflow-hidden">
                      {/* Background decoration */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent"></div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900/10 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gray-900/5 rounded-full"></div>
                      
                      {/* Main icon */}
                      <Receipt className="w-12 h-12 text-gray-400 relative z-10" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="max-w-sm mx-auto">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Tidak ada transaksi pending
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      Semua transaksi Anda sudah diselesaikan. Transaksi baru yang memerlukan pembayaran akan muncul di sini.
                    </p>
                    
                    {/* Action button */}
                    <button 
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTransactions;