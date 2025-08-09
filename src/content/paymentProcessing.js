import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Check, 
  ArrowRight, 
  Package, 
  Calculator,
  Phone,
  Globe,
  Info
} from 'lucide-react';
import {
    Toast, 
    ToastPortal
} from './alert'
import {
    paymentMethodsSlice,
    productServicesSlice,
} from '../reducers/get'
import {
    fetchPaymentMethods,
    fetchProductServices,
} from '../actions/get'
import { useSelector, useDispatch } from 'react-redux';
import {
    formatCurrency,
} from './helper'
import {
    extendServiceStoreSlice
} from '../reducers/patch'
import {
    extendServiceStore
}  from '../actions/patch'
import { data, useLocation, useNavigate } from 'react-router-dom';

const PaymentProcessing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [continueCurrent, setContinueCurrent] = useState(null);
  const [toast, setToast] = useState(null)
  const [domainInput, setDomainInput] = useState(null)
  const location = useLocation()
  const phoneRegex = /^8[0-9]{8,12}$/;


  // handle data from previus path 
  const currentService = location.state?.currentService


  // handle payment methods
  const {resetErrorPaymentMethods} = paymentMethodsSlice.actions
  const {dataPaymentMethods: paymentMethods, tax, errorPaymentMethods, loadingPaymentMethods} = useSelector((state) => state.persisted.paymentMethods)

  useEffect(() => {
    if (paymentMethods.length === 0) {
      dispatch(fetchPaymentMethods())
    }
  }, [])

  useEffect(() => {
    if (errorPaymentMethods) {
      setToast({
        type: "error",
        message: "terjadi kesalahan saat memuat metode pembayaran, silahkan coba lagi nanti."
      })
    }
  }, [errorPaymentMethods])


   // handle package or products service
    const {resetErrorProductService} = productServicesSlice.actions
    const {dataProductService: products, errorProductService, loadingProductService} = useSelector((state) => state.persisted.productServices)

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductServices())
        }
    }, [])

    useEffect(() => {
        if (errorProductService) {
            setToast({
            type: "error",
            message: "Terjadi kesalahan saat memuat data package, silahkan coba lagi nanti"
            })
        }
    }, [errorProductService])


    // extended service
    const {resetErrorExtendServiceStore, resetExtendServiceStore} = extendServiceStoreSlice.actions
    const {
        successExtendServiceStore, 
        errorFieldsExtendServiceStore, 
        errorSubdomain,
        errorExtendServiceStore, 
        loadingExtendServiceStore
    } = useSelector((state) => state.persisted.extendServiceStore)

    useEffect(() => {
        if (successExtendServiceStore) {
            navigate("/invoice")
            dispatch(resetExtendServiceStore())
        }
    }, successExtendServiceStore)

    useEffect(() => {
        if (errorExtendServiceStore) {
        setToast({
            type: "error",
            message: "Terjadi kesalahan saat membuat transaksi perpanjangan layanan, silahkan coba lagi nanti"
        })
        }
    }, [errorExtendServiceStore])


    // Function untuk mendapatkan icon payment method
    const getPaymentIcon = (type) => {
        switch (type) {
        case 'EWALLET':
            return <Smartphone className="w-5 h-5" />;
        case 'VA':
            return <CreditCard className="w-5 h-5" />;
        case 'QR':
            return <QrCode className="w-5 h-5" />;
        default:
            return <CreditCard className="w-5 h-5" />;
        }
    };

    // Function untuk menghitung fee
    const calculateFee = (product, paymentMethod) => {
        if (!product || !paymentMethod) return 0;
        
        if (paymentMethod.type_payment_method === 'EWALLET' || paymentMethod.type_payment_method === 'QR') {
        return product.price * paymentMethod.fee;
        } else {
        return paymentMethod.fee;
        }
    };

    // Function untuk menghitung total
    const calculateTotal = () => {
        if (!selectedProduct || !selectedPaymentMethod) return 0;
        
        const subtotal = selectedProduct.price;
        const tax1 = subtotal * tax;
        const fee = calculateFee(selectedProduct, selectedPaymentMethod);
        
        return subtotal + tax1 + fee;
    };

    // Group payment methods by type
    const groupedPaymentMethods = paymentMethods.reduce((acc, method) => {
        const type = method.type_payment_method;
        if (!acc[type]) acc[type] = [];
        acc[type].push(method);
        return acc;
    }, {});

    const getTypeLabel = (type) => {
        switch (type) {
        case 'EWALLET':
            return 'E-Wallet';
        case 'VA':
            return 'Virtual Account';
        case 'QR':
            return 'QR Code';
        default:
            return type;
        }
    };


    // handle extend service 
    const handleExtendService = () => {
      if (selectedPaymentMethod.type_payment_method === "EWALLET") {
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneNumberError(
            'Nomor telepon e-wallet tidak valid. Gunakan format Indonesia tanpa awalan 0 atau +62, misalnya: 81234567890'
            );
            return;
        }
      }

      const data = {
            store_id: currentService.store_id,
            subdomain: '',
            product_service_id: continueCurrent || selectedProduct.id,
            payment_method_id: selectedPaymentMethod.id,
            phone_number_ewallet: phoneNumber,
            amount: 1000
      }

        dispatch(extendServiceStore(data))
    }

    console.log("data prodcts: ", products)

    return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
        {toast && (
            <ToastPortal> 
                <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => { 
                    setToast(null)
                    dispatch(resetErrorExtendServiceStore())
                }} 
                duration={3000}
                />
                </div>
            </ToastPortal>
        )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pemrosesan Pembayaran</h1>
          <p className="text-gray-600">Pilih layanan dan metode pembayaran yang sesuai untuk kebutuhan Anda</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Package className="w-5 h-5 text-white"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Pilih Layanan</h2>
              </div>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-xl p-4 transition-all ${
                      product.status === "Pengembangan" 
                        ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                        : selectedProduct?.id === product.id
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-opacity-20 cursor-pointer'
                        : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                    }`}
                    onClick={() => product.status !== "Pengembangan" && setSelectedProduct(product)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedProduct?.id === product.id && product.status !== "Pengembangan" && (
                          <div className="p-1 bg-gray-900 rounded-full">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${product.status === "Pengembangan" ? 'text-gray-400' : 'text-gray-900'}`}>
                              {product.name.toLowerCase()}
                            </h3>
                            {product.status === "Pengembangan" && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                Pengembangan
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${product.status === "Pengembangan" ? 'text-gray-400' : 'text-gray-500'}`}>
                            Paket {product.name.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {product.originalPrice !== product.price && (
                            <span className={`text-sm line-through ${product.status === "Pengembangan" ? 'text-gray-300' : 'text-gray-400'}`}>
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                          <span className={`font-bold ${product.status === "Pengembangan" ? 'text-gray-400' : 'text-gray-900'}`}>
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                        {product.original_price !== product.price && product.status !== "Pengembangan" && (
                          <span className="text-xs text-green-600 font-medium">
                            Hemat {formatCurrency(product.originalPrice - product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Current Service Option */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Lanjutkan Layanan Saat Ini</h3>
                  <p className="text-sm text-gray-600">Perpanjang layanan yang sedang aktif</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedProduct?.id === currentService.id}
                    onChange={() => {
                      const selected = products.find(product => product.id === currentService.id);
                      setSelectedProduct(selected);
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Metode Pembayaran</h2>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedPaymentMethods).map(([type, methods]) => (
                  <div key={type}>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      {getPaymentIcon(type)}
                      {getTypeLabel(type)}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {methods.map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            selectedPaymentMethod?.id === method.id
                              ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-opacity-20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPaymentMethod(method)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm">
                              {method.channel_code}
                            </span>
                            {selectedPaymentMethod?.id === method.id && (
                              <div className="p-1 bg-gray-900 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Fee: {method.type_payment_method === 'VA' 
                              ? formatCurrency(method.fee)
                              : `${(method.fee * 100).toFixed(1)}%`
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

           {selectedPaymentMethod?.type_payment_method === 'EWALLET' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-900 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Nomor Telepon Ewallet</h3>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 text-sm font-medium pointer-events-none">
                    +62<span className="mx-1">|</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="8xx-xxxx-xxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  {phoneNumberError && (
                    <p className="mt-2 text-sm text-red-600">{phoneNumberError}</p>
                  )}
                </div>
              </div>
            )}

            {/* Domain Input for Unverified Users */}
            {(currentService.verified_at === null && currentService.full_domain === null) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-900 rounded-lg">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Setup Domain</h3>
                </div>
                
                { errorSubdomain ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900 mb-1">Terjadi Kesalahan</h4>
                        <p className="text-sm text-red-700 leading-relaxed">
                          Subdomain{" "}
                          <code className="bg-red-100 px-2 py-1 rounded text-red-800 font-mono text-xs mx-1">
                            {domainInput || 'namaanda'}.nusas.id
                          </code>
                          {errorSubdomain}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Subdomain Gratis</h4>
                        <p className="text-sm text-blue-700 leading-relaxed">
                          Masukkan nama domain yang diinginkan. Domain akan dibuat sebagai subdomain gratis dengan format: 
                          <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono text-xs ml-1">
                            {domainInput || 'namaanda'}.nusas.id
                          </code>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Subdomain
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="masukkan-nama-domain"
                      value={domainInput}
                      onChange={(e) => {
                        // Format input: lowercase, replace spaces with hyphens, remove special chars
                        const formatted = e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^a-z0-9-]/g, '')
                          .replace(/--+/g, '-')
                          .replace(/^-+|-+$/g, '');
                        setDomainInput(formatted);
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-32"
                    />
                    <div className="absolute right-4 top-3 text-gray-500 font-mono text-sm">
                      .nusas.id
                    </div>
                  </div>
                  
                  {domainInput && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        Domain yang akan dibuat:
                      </p>
                      <p className="font-mono text-gray-900 font-semibold">
                        {domainInput}.nusas.id
                      </p>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Gunakan huruf kecil, angka, dan tanda hubung (-)</p>
                    <p>• Tidak boleh dimulai atau diakhiri dengan tanda hubung</p>
                    <p>• Minimal 3 karakter, maksimal 10 karakter</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Ringkasan Pembayaran</h2>
              </div>

              <div className="space-y-4">
                {/* Selected Product */}
                <div className="pb-4 border-b border-gray-100">
                  {selectedProduct ? (
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                      <p className="text-sm text-gray-600">Paket {selectedProduct.name}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">Pilih layanan terlebih dahulu</p>
                  )}
                </div>

                {/* Domain Setup (if not verified) */}
                <div className="pb-4 border-b border-gray-100">
                  {(currentService.verified_at === null && currentService.full_domain) ? (
                    <div>
                      <p className="text-sm text-gray-600">Domain Setup</p>
                      {domainInput ? (
                        <div className="mt-1">
                          <span className="font-mono text-gray-900 font-medium text-sm">
                            {domainInput}.nusas.id
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm mt-1">Masukkan nama domain</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">Domain</p>
                      <p className="text-gray-900 font-medium">Domain sudah terverifikasi</p>
                    </div>
                  )}
                </div>
                <div className="pb-4 border-b border-gray-100">
                  {selectedPaymentMethod ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Metode Pembayaran</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getPaymentIcon(selectedPaymentMethod.type_payment_method)}
                          <span className="font-medium text-gray-900">
                            {selectedPaymentMethod.channel_code}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">Pilih metode pembayaran</p>
                  )}
                </div>

                {/* Price Breakdown */}
                {selectedProduct && selectedPaymentMethod && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(selectedProduct.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pajak ({(tax * 100)}%)</span>
                      <span className="text-gray-900">{formatCurrency(selectedProduct.price * tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Transaksi</span>
                      <span className="text-gray-900">{formatCurrency(calculateFee(selectedProduct, selectedPaymentMethod))}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                disabled={
                  !selectedProduct || 
                  !selectedPaymentMethod || 
                  (selectedPaymentMethod?.type_payment_method === 'EWALLET' && !phoneNumber) ||
                  (
                    currentService.verified_at === null &&
                    currentService.full_domain === null &&
                    (
                      !domainInput || domainInput.length < 3 || domainInput.length > 10
                    )
                  ) ||
                  loadingExtendServiceStore
                }
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedProduct &&
                  selectedPaymentMethod &&
                  (selectedPaymentMethod?.type_payment_method !== 'EWALLET' || phoneNumber) &&
                  (
                    currentService.verified_at !== null || currentService.full_domain !== null ||
                    (
                      domainInput &&
                      domainInput.length >= 3 &&
                      domainInput.length <= 10
                    )
                  )
                    ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => handleExtendService()}
              >
                Lanjutkan Pembayaran
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;