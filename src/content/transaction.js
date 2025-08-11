import React, { useState } from 'react';
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

const PendingTransactions = () => {
  const dispatch = useDispatch()
  const [copiedId, setCopiedId] = useState(null);

  const { setIsOpen } = navbarSlice.actions
  const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

  const { ref: headerRef, height: headerHeight } = useElementHeight();
  
  
  // Sample data berdasarkan struktur yang diberikan
  const transactions = [
    {
      id: "TXN-001-2024-08-001",
      tax: 1500,
      fee: 2500,
      product: "Premium Coffee Bundle",
      payment_method: "EWALLET",
      payment_reference: "gopay://payment?id=GP123456789",
      channel_code: "GOPAY",
      expires_at: "2024-08-11T14:30:00Z",
      store_name: "Kopi Nusantara"
    },
    {
      id: "TXN-001-2024-08-002",
      tax: 2000,
      fee: 3000,
      product: "Wireless Headphones",
      payment_method: "VA",
      payment_reference: "8170123456789012",
      channel_code: "BCA",
      expires_at: "2024-08-11T16:45:00Z",
      store_name: "Tech Store Indonesia"
    },
    {
      id: "TXN-001-2024-08-003",
      tax: 1000,
      fee: 1500,
      product: "Organic Tea Set",
      payment_method: "QR",
      payment_reference: "QR_CODE_DATA_STRING_123456",
      channel_code: "QRIS",
      expires_at: "2024-08-11T12:15:00Z",
      store_name: "Healthy Living Store"
    },
    {
      id: "TXN-001-2024-08-004",
      tax: 3000,
      fee: 4000,
      product: "Gaming Mouse",
      payment_method: "EWALLET",
      payment_reference: "ovo://payment?ref=OV987654321",
      channel_code: "OVO",
      expires_at: "2024-08-11T18:20:00Z",
      store_name: "Gaming World"
    }
  ];

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

  const formatExpiryTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    if (diffHours <= 0) return "Expired";
    if (diffHours < 24) return `${diffHours} jam lagi`;
    
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays} hari lagi`;
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
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
          <div className="max-w-7xl">
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
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header Transaction */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-900 rounded-lg">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{transaction.store_name}</h3>
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
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">{transaction.product}</span>
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
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-gray-100 rounded">
                          {getPaymentMethodIcon(transaction.payment_method, transaction.channel_code)}
                        </div>
                        <span className="font-medium text-gray-900">
                          {transaction.payment_method === 'EWALLET' && 'E-Wallet'}
                          {transaction.payment_method === 'VA' && 'Virtual Account'}
                          {transaction.payment_method === 'QR' && 'QR Code'}
                        </span>
                      </div>

                      {/* E-Wallet Payment */}
                      {transaction.payment_method === 'EWALLET' && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            Klik tombol di bawah untuk membuka aplikasi pembayaran
                          </p>
                          <button
                            onClick={() => handleEwalletRedirect(transaction.payment_reference)}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Buka Aplikasi {transaction.channel_code}
                          </button>
                        </div>
                      )}

                      {/* Virtual Account Payment */}
                      {transaction.payment_method === 'VA' && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            Gunakan nomor Virtual Account berikut untuk transfer
                          </p>
                          <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                            <span className="font-mono text-lg font-semibold text-gray-900">
                              {transaction.payment_reference}
                            </span>
                            <button
                              onClick={() => handleCopyCode(transaction.payment_reference, transaction.id)}
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Salin nomor VA"
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
                            Scan QR Code berikut dengan aplikasi pembayaran Anda
                          </p>
                          <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                              <img
                                src={generateQRCode(transaction.payment_reference)}
                                alt="QR Code"
                                className="w-32 h-32"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expiry Warning */}
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-600">
                        Berlaku hingga: <span className="font-medium text-orange-600">
                          {formatExpiryTime(transaction.expires_at)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {transactions.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada transaksi pending</h3>
                <p className="text-gray-500">Semua transaksi Anda sudah diselesaikan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTransactions;