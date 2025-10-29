import { useEffect, useRef, useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle2,
  ExternalLink,
  MapPin, 
  Building, 
  CreditCard, 
  Store,
  AlertCircle,
  Building2,
  Wallet,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  Star,
  Loader2,
  Award,
  AlertTriangle,
  Check,
  ChevronDown,
  Globe,
} from 'lucide-react';
import {registerAccountSlice} from '../reducers/post'
import { registerAccount } from '../actions/post';
import {
  Toast, 
  ToastPortal
} from './alert'
import { useNavigate } from 'react-router-dom';
import {
  fetchPaymentMethods,
  fetchProductServices,
} from '../actions/get'
import {
  productServicesSlice,
  paymentMethodsSlice
} from '../reducers/get'
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClick, formatCurrency } from './helper';

export default function TenantRegistrationForm() {
  const navigate = useNavigate()
  const [showPackageSelection, setShowPackageSelection] = useState(true);
  const [toast, setToast] = useState(null)
  const dispatch = useDispatch()
  const [isOpenPaymentMethod, setIsOpenPaymentMethod] = useState(false)
  const dropdownRef = useRef(null)
  const [packagePrice, setPackagePrice] = useState(0)
  const [paymentFee, setPaymentfee] = useState(0)
  const [taxTransaction, setTaxTransaction] = useState(0)
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  useOutsideClick({
    ref: dropdownRef,
    callback: () => setIsOpenPaymentMethod(false),
    isActive: isOpenPaymentMethod,    
  })

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone_number_ewallet: '',
    product_service_id: '',
    price: 0,
    payment_method: '',
    channel_code: '',
    payment_method_id: '',
    name_store: '',
    phone_number_store: '',
    subdomain: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // handle package or peroduct service
  const {resetErrorProductService} = productServicesSlice.actions
  const {dataProductService: packages, errorProductService, loadingProductService} = useSelector((state) => state.persisted.productServices)

  const segments = ['Starter', 'Professional', 'Enterprise'];
  useEffect(() => {
    if (packages.length === 0) {
      dispatch(fetchProductServices())
    }
  }, [])

  useEffect(() => {
    if (errorProductService) {
      setToast({
        type: "error",
        message: errorProductService
      })
    }
  }, [errorProductService])

  // handle payment methods
  const {resetErrorPaymentMethods} = paymentMethodsSlice.actions
  const {dataPaymentMethods, tax, errorPaymentMethods, loadingPaymentMethods} = useSelector((state) => state.persisted.paymentMethods)

  useEffect(() => {
    if (dataPaymentMethods.length === 0) {
      dispatch(fetchPaymentMethods())
    }
  }, [])

  useEffect(() => {
    if (errorPaymentMethods) {
      setToast({
        type: "error",
        message: errorPaymentMethods
      })
    }
  }, [errorPaymentMethods])

  const groupedPaymentMethods = dataPaymentMethods.reduce((acc, method) => {
    const type = method.type_payment_method;
    if (!acc[type]) acc[type] = [];
    acc[type].push(method);
    return acc;
  }, {});

  const handlePackageSelect = (packageId) => {
    const selected = packages.find(pkg => pkg.id === packageId);
    if (!selected) return;

    const selectedPrice = Number(selected.price);
    const selectedTax = selectedPrice * tax;

    // ✅ Gunakan nama variabel berbeda agar tidak bentrok
    let foundPaymentMethod = null;
    for (const methodGroup of Object.values(groupedPaymentMethods)) {
      const match = methodGroup.find(pm => pm.id === formData.payment_method_id);
      if (match) {
        foundPaymentMethod = match;
        break;
      }
    }

    let calculatedFee = 0;

    if (foundPaymentMethod) {
      if (foundPaymentMethod.type_payment_method !== 'VA') {
        calculatedFee = foundPaymentMethod.fee * (selectedPrice + selectedTax);
      } else {
        calculatedFee = foundPaymentMethod.fee; // diasumsikan flat
      }
    }

    const totalPrice = selectedPrice + selectedTax + calculatedFee;

    // ✅ Update state setelah semua dihitung
    // setSelectedPackage(packageId);
    setPackagePrice(selectedPrice);
    setTaxTransaction(selectedTax);
    setPaymentfee(calculatedFee);
    setShowPackageSelection(false);

    setFormData((prev) => ({
      ...prev,
      price: totalPrice,
      product_service_id: packageId,
    }));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'EWALLET':
        return <Wallet className="h-4 w-4 text-blue-500" />;
      case 'VA':
        return <Building2 className="h-4 w-4 text-green-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'EWALLET':
        return 'E-Wallet';
      case 'VA':
        return 'Virtual Account';
      default:
        return type;
    }
  };

  const validateField = (name, value, paymentMethod) => {
    const newErrors = {};

    switch (name) {
      case 'first_name':
      case 'last_name':
        if (!value) newErrors[name] = `${name.replace('_', ' ')} wajib diisi`;
        else if (value.length < 3) newErrors[name] = `${name.replace('_', ' ')} minimal 3 karakter`;
        else if (value.length > 50) newErrors[name] = `${name.replace('_', ' ')} maksimal 50 karakter`;
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.email = 'Email wajib diisi';
        else if (!emailRegex.test(value)) newErrors.email = 'Masukkan email yang valid';
        break;

      case 'password':
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (!value) newErrors.password = 'Kata sandi wajib diisi';
        else if (value.length < 6) newErrors.password = 'Kata sandi minimal 6 karakter';
        else if (value.length > 50) newErrors.password = 'Kata sandi maksimal 50 karakter';
        else if (!hasUppercase) newErrors.password = 'Kata sandi harus mengandung setidaknya 1 huruf kapital';
        else if (!hasNumber) newErrors.password = 'Kata sandi harus mengandung setidaknya 1 angka';
        else if (!hasSpecial) newErrors.password = 'Kata sandi harus mengandung setidaknya 1 karakter spesial';
        break;

      case 'phone_number':
      case 'phone_number_store':
      case 'phone_number_ewallet':
        if (name === 'phone_number' && !value) {
          newErrors[name] = 'Nomor telepon wajib diisi';
        } else if (name === 'phone_number_ewallet' && paymentMethod === 'EWALLET' && !value) {
          newErrors[name] = 'Nomor telepon e-wallet wajib diisi';
        }
        break;

      case 'postal_code':
        if (!value) newErrors.postal_code = 'Kode pos wajib diisi';
        else if (value.length !== 5 || !/^\d{5}$/.test(value)) {
          newErrors.postal_code = 'Kode pos harus terdiri dari tepat 5 angka';
        }
        break;

      case 'payment_method':
        if (!value) newErrors.payment_method = 'Metode pembayaran wajib diisi';
        break;

      case 'subdomain':
        if (!value) newErrors.subdomain = 'Subdomain wajib diisi';
        else if (value.length > 63) newErrors.subdomain = 'Subdomain maksimal 10 karakter';
        break;

      default:
        const requiredFields = ['address', 'city', 'state', 'country', 'name_store'];
        const fieldMaxLengths = {
          address: 100,
          city: 50,
          state: 50,
          country: 50,
          name_store: 50
        };
        const fieldLabels = {
          address: 'Alamat',
          city: 'Kota',
          state: 'Provinsi',
          country: 'Negara',
          name_store: 'Nama toko'
        };

        if (requiredFields.includes(name)) {
          if (!value) {
            newErrors[name] = `${fieldLabels[name]} wajib diisi`;
          } else if (value.length > fieldMaxLengths[name]) {
            newErrors[name] = `${fieldLabels[name]} maksimal ${fieldMaxLengths[name]} karakter`;
          }
        }
        break;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodClick = ({id, channelCode, paymentMethod, price}) => {
    if (packagePrice === 0) {
      let allErrors = {}
      allErrors.package = 'Silakan pilih paket terlebih dahulu.';
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setErrors(allErrors);
      return
    }

    setFormData(prev => ({ 
      ...prev, 
      payment_method_id: id,
      payment_method: paymentMethod,
      channel_code: channelCode
    }));

    if (paymentMethod !== 'VA') {
      setPaymentfee(((price * packagePrice) + (packagePrice * tax)))
    } else {
      setPaymentfee(price)
    }
    setIsOpenPaymentMethod(false)
  };

  useEffect(() => {
    // Cari payment method berdasarkan ID
    let foundPaymentMethod = null;
    for (const methodGroup of Object.values(groupedPaymentMethods)) {
      const match = methodGroup.find(pm => pm.id === formData.payment_method_id);
      if (match) {
        foundPaymentMethod = match;
        break;
      }
    }

    if (!foundPaymentMethod) return;

    const taxValue = packagePrice * tax;
    let calculatedFee = 0;

    // Hitung fee tergantung tipe
    if (foundPaymentMethod.type_payment_method !== 'VA') {
      calculatedFee = foundPaymentMethod.fee * (packagePrice + taxValue);
    } else {
      calculatedFee = foundPaymentMethod.fee; // diasumsikan fee VA adalah flat
    }

    setPaymentfee(calculatedFee); // ini tetap disimpan kalau kamu butuh secara global
    setTaxTransaction(taxValue);

    const totalPrice = packagePrice + calculatedFee + taxValue;
    setFormData((prev) => ({
      ...prev,
      price: totalPrice,
    }));
  }, [formData.payment_method_id, formData.product_service_id]);

  // handle submit register
  const {resetRegisterAccount} = registerAccountSlice.actions
  const {
    successRegister, 
    errorDomain, 
    errorFieldsRegister, 
    errorRegister, 
    loadingRegister
  } = useSelector((state) => state.registerAccountState)

  useEffect(() => {
    if (successRegister) {
      navigate('/signup/verification')
      dispatch(resetRegisterAccount())
    } 
  }, [successRegister])

  useEffect(() => {
    if (Array.isArray(errorFieldsRegister)) {
      const mappedErrors = errorFieldsRegister.reduce((acc, curr) => {
        const [field, message] = Object.entries(curr)[0]; 
        acc[field] = message;
        return acc;
      }, {});
      window.scrollTo({ top: 0, behavior: "smooth" });
      setErrors(prev => ({ ...prev, ...mappedErrors }));
      dispatch(resetRegisterAccount());
    }
  }, [errorFieldsRegister]);


  useEffect(() => {
    if (errorDomain) {
      setErrors(prev => ({
        ...prev,
        subdomain: errorDomain,
      }))
      
      dispatch(resetRegisterAccount())
    }
  }, [errorDomain])

  useEffect(() => {
    if (errorRegister) {
      setToast({
        type: 'error',
        message: errorRegister
      })
    }
  }, [errorRegister])

  const handleSubmit = async () => {
    let allErrors = {};

    // Cek paket
    if (formData.product_service_id === '') {
      allErrors.package = 'Silakan pilih paket terlebih dahulu.';
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Validasi tiap field
    Object.keys(formData).forEach((key) => {
      if (key === 'price') return;
      if (key === 'phone_number_ewallet' && formData.payment_method !== 'EWALLET') return;

      const fieldError = validateField(key, formData[key], formData.payment_method);
      allErrors = { ...allErrors, ...fieldError };
    });

    // Set hasil error ke state
    setErrors(allErrors);

    if (!isChecked) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Jika tidak ada error, kirim data
    if (Object.keys(allErrors).length === 0) {
      dispatch(registerAccount({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        phone_number: "+62" + formData.phone_number,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postal_code: formData.postal_code,
        phone_number_ewallet: "+62" + formData.phone_number_ewallet,
        product_service_id: formData.product_service_id,
        price: formData.price,
        payment_method: formData.payment_method,
        channel_code: formData.channel_code,
        payment_method_id: formData.payment_method_id,
        name_store: formData.name_store,
        phone_number_store: "+62" + formData.phone_number_store,
        subdomain: formData.subdomain,
      }));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      {toast && (
          <ToastPortal> 
              <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
              <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => { 
                setToast(null)
                dispatch(resetErrorProductService())
                dispatch(resetErrorPaymentMethods())
                dispatch(resetRegisterAccount())
              }} 
              duration={3000}
              />
              </div>
          </ToastPortal>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Tenant Account</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our platform and start managing your business with our comprehensive tenant management system.
          </p>
        </div>

        {/* Package Selection - Only show if no navigation data */}
        {showPackageSelection && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {segments.map((segment) => {
                const currentPackage = packages.find(pkg => pkg.name === segment);
                const isSelected = formData.product_service_id === currentPackage?.id;
                const isInDevelopment = currentPackage?.status === "Pengembangan";

                return (
                  <div
                    key={segment}
                    className={`group relative bg-white/90 rounded-3xl border transition-all duration-500 backdrop-blur-sm shadow-lg shadow-black/5 flex flex-col ${
                      isInDevelopment
                        ? 'border-gray-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-green-500 shadow-2xl shadow-green-500/20 scale-100 cursor-pointer'
                        : currentPackage?.popular
                        ? 'border-green-500/30 shadow-xl shadow-green-500/10 cursor-pointer hover:transform hover:scale-100'
                        : 'border-gray-200 hover:border-green-500/20 hover:shadow-xl hover:shadow-green-500/5 cursor-pointer hover:transform hover:scale-100'
                    }`}
                    onClick={() => !isInDevelopment && currentPackage && handlePackageSelect(currentPackage.id)}
                  >
                    {/* Selection Indicator */}
                    {isSelected && !isInDevelopment && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentPackage?.gradient ?? ''} ${
                      isInDevelopment ? 'opacity-0' : 'opacity-0 group-hover:opacity-10'
                    } rounded-3xl transition-opacity duration-500`} />

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
                    ) : currentPackage?.badge ? (
                      <div className="absolute top-6 right-6">
                        <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                          {currentPackage.badge}
                        </div>
                      </div>
                    ) : null}

                    <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col flex-grow">
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
                          <div className="text-center mb-6 lg:mb-8">
                            <div className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${
                              isInDevelopment ? 'from-gray-400 to-gray-500' : currentPackage.gradient
                            } rounded-2xl mb-4 lg:mb-6`}>
                              <Award className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                            </div>

                            <h3 className={`text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r ${
                              isInDevelopment 
                                ? 'from-gray-400 to-gray-500' 
                                : 'from-gray-900 to-gray-700'
                            } bg-clip-text text-transparent`}>
                              {currentPackage.name}
                            </h3>

                            <p className={`mb-4 lg:mb-6 text-sm lg:text-base ${
                              isInDevelopment ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {currentPackage.segment}
                            </p>

                            <div className="space-y-2">
                              <div className="flex items-center justify-center space-x-2">
                                <span className={`text-3xl lg:text-5xl font-bold bg-gradient-to-r ${
                                  isInDevelopment 
                                    ? 'from-gray-400 to-gray-500' 
                                    : 'from-green-600 to-green-700'
                                } bg-clip-text text-transparent`}>
                                  {formatCurrency(currentPackage.price)}
                                </span>
                                <span className={`text-sm lg:text-base ${
                                  isInDevelopment ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  /bulan
                                </span>
                              </div>
                                <div className="flex items-center justify-center space-x-2">
                                  <span className={`line-through ${
                                    isInDevelopment ? 'text-gray-300' : 'text-gray-400'
                                  }`}>
                                    {formatCurrency(currentPackage.originalPrice)}
                                  </span>
                                  {!isInDevelopment && (
                                    <span className="text-green-600 text-sm font-medium">{currentPackage.badge}</span>
                                  )}
                                </div>
                            </div>
                          </div>

                          <div className={`space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex-grow ${errors?.package ? 'border border-red-500 rounded-xl p-4 bg-red-50' : ''}`}>
                            {currentPackage.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br ${
                                  isInDevelopment 
                                    ? 'from-gray-400 to-gray-500' 
                                    : 'from-green-500 to-green-600'
                                } rounded-full flex items-center justify-center mt-0.5`}>
                                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                                </div>
                                <span className={`leading-relaxed text-sm lg:text-base ${
                                  isInDevelopment ? 'text-gray-400' : 'text-gray-700'
                                }`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="relative mt-auto">
                            <button 
                              className={`w-full py-3 lg:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-100 text-sm lg:text-base ${
                                isInDevelopment
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-green-600 text-white shadow-2xl shadow-green-500/25'
                                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:shadow-green-500/25'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isInDevelopment) {
                                  handlePackageSelect(currentPackage.id);
                                }
                              }}
                              disabled={isInDevelopment}
                            >
                              {isInDevelopment 
                                ? 'Segera Hadir'
                                : isSelected 
                                ? 'Paket Terpilih' 
                                : currentPackage.popular 
                                ? 'Pilih Paket Terpopuler' 
                                : 'Mulai Sekarang'
                              }
                            </button>

                            {errors?.package && !isInDevelopment && (
                              <div className="mt-2 text-sm text-red-600 text-center animate-fade-in">
                                {errors.package}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Package Summary - Show if package is selected */}
        {formData.product_service_id && !showPackageSelection && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">
                    {packages.find(pkg => pkg.id === formData.product_service_id)?.name} Package Selected
                  </h3>
                  <p className="text-sm text-green-600">
                    {formatCurrency(packagePrice)} /month
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPackageSelection(true)}
                className="text-green-600 hover:text-green-500 text-sm font-medium"
              >
                Change Package
              </button>
            </div>
          </div>
        )}

        {/* Registration Form - Only show if package is selected or navigation data exists */}
        <div className="mb-8 bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wide">
                Penting: Diperlukan Akun Xendit
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Sebelum melanjutkan pendaftaran, pastikan Anda telah memiliki akun Xendit yang aktif. 
                Xendit adalah mitra gateway pembayaran kami yang menangani seluruh proses transaksi pembayaran. 
                <a
                  href="https://xendit.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-blue-900 ml-1"
                >
                  Buat akun Xendit Anda di sini
                </a> jika Anda belum memilikinya.
              </p>
            </div>
          </div>
        </div>

         <form className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 text-green-500 mr-2" />
                Personal Information
              </h2>
            </div>

            {/* Full Name */}
            <div className='flex items-center gap-4 justify-between'>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    maxLength={50}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      (errors.first_name || errors.FirstName) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                </div>
                {(errors.first_name || errors.FirstName) && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.first_name || errors.FirstName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    maxLength={50}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      (errors.last_name || errors.LastName) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                </div>
                {(errors.last_name || errors.LastName) && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.last_name || errors.LastName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.email || errors.Email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.email || errors.Email) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.Email || errors.email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  maxLength={50}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors${
                    (errors.password || errors.Password) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {(errors.password || errors.Password) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password || errors.Password}</span>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div 
                className={`flex items-center w-full px-4 py-3 rounded-lg border 
                    ${(errors?.phone_number || errors?.PhoneNumber) ? 'border-red-300' : 'border-gray-300'} 
                    `}
                >
                  <span className="mr-2">+62</span>
                  <span className="mr-2 items-center">|</span>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="81234567890"
                    maxLength="12"
                    className="flex-1 outline-none border-none focus:ring-0"
                  />
              </div>
              {(errors.phone_number || errors?.PhoneNumber) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.phone_number || errors?.PhoneNumber}</span>
                </div>
              )}
            </div>

            {/* Address Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                Address Store 
              </h2>
            </div>

            {/* Street Address */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  maxLength={100}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.address || errors.Address) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.address || errors.Address) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.address || errors.Address}</span>
                </div>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  maxLength={50}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.city || errors.City) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.city || errors.City) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.city || errors.City}</span>
                </div>
              )}
            </div>

            {/* State/Province */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                State/Province <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state/province"
                  maxLength={50}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.state || errors.State) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.state || errors.State) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.state || errors.State}</span>
                </div>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                  maxLength={50}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.country || errors.Country) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.country || errors.Country) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.country || errors.Country}</span>
                </div>
              )}
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  placeholder="e.g., 12345"
                  maxLength={5}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.postal_code || errors.PostalCode) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.postal_code || errors.PostalCode) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.postal_code || errors.PostalCode}</span>
                </div>
              )}
            </div>

            {/* Store Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Store className="h-5 w-5 text-green-500 mr-2" />
                Store Information
              </h2>
            </div>

            {/* Store Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Store Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name_store"
                  value={formData.name_store}
                  onChange={handleInputChange}
                  placeholder="Enter your store name"
                  maxLength={50}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.name_store || errors.NameStore) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.name_store || errors.NameStore) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name_store || errors.NameStore}</span>
                </div>
              )}
            </div>

            {/* Store Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Store Phone Number
              </label>
              <div 
              className={`flex items-center w-full px-4 py-3 rounded-lg border 
                  ${(errors.phone_number_store || errors.PhoneNumberStore) ? 'border-red-300' : 'border-gray-300'} 
                  focus-within:ring-2 focus-within:ring-gray-900`}
              >
                <span className="mr-2">+62</span>
                <span className="mr-2 items-center">|</span>
                <input
                  type="text"
                  name="phone_number_store"
                  value={formData.phone_number_store}
                  onChange={handleInputChange}
                  placeholder="81234567890"
                  className="flex-1 outline-none border-none focus:ring-0"
                  maxLength="12"
                />
              </div>
              {(errors.phone_number_store || errors.PhoneNumberStore) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.phone_number_store || errors.PhoneNumberStore}</span>
                </div>
              )}

            </div>

            {/* sub domain */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Store Subdomain <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleInputChange}
                    placeholder="example: mystorename"
                    maxLength={63}
                    className={`block w-full pl-10 pr-0 py-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      (errors.subdomain || errors.SubDomain) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  />
                  <div className="inline-flex items-center px-3 py-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-lg">
                    .nusas.id
                  </div>
                </div>
              </div>
              {(errors.subdomain || errors.SubDomain) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.subdomain || errors.SubDomain}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Your store will be accessible at: <span className="font-medium">{formData.subdomain || 'mystorename'}.nusas.id</span>
              </p>
            </div>

            {/* Payment Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 text-green-500 mr-2" />
                Payment Information
              </h2>
            </div>

            {/* Payment Method Dropdown */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method <span className="text-red-500">*</span>
              </label>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsOpenPaymentMethod(!isOpenPaymentMethod)}
                  className={`relative w-full bg-white border rounded-lg px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    (errors.payment_method || errors.PaymentMethod)
                      ? 'border-red-300 bg-red-50' 
                      : isOpenPaymentMethod 
                      ? 'border-green-500 shadow-lg' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {formData.payment_method ? (
                        <>
                          <div>
                            <span className="block text-sm font-medium text-gray-900">
                              {formData.channel_code}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-500">Select Payment Method</span>
                        </>
                      )}
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpenPaymentMethod ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpenPaymentMethod && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    <div className="px-4 py-3 bg-blue-500 text-white rounded-t-lg">
                      <span className="text-sm font-medium">Select Payment Method</span>
                    </div>
                    
                    <div className="py-2">
                      {Object.entries(groupedPaymentMethods).map(([type, methods]) => (
                        <div key={type}>
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(type)}
                              <span>{getTypeLabel(type)}</span>
                            </div>
                          </div>
                          
                          {methods.map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              name="payment_method"
                              onClick={() => handlePaymentMethodClick({ 
                                id: method.id,
                                channelCode: method.channel_code,
                                paymentMethod: method.type_payment_method,
                                price: method.fee
                              })}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {method.channel_code}
                                    </div>
                                  </div>
                                </div>
                                {formData.payment_method === method.type_payment_method && formData.channel_code === method.channel_code && (
                                  <Check className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(errors.payment_method || errors.PaymentMethod) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.payment_method || errors.PaymentMethod}</span>
                </div>
              )}

              {formData.payment_method && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-800">
                      <Check className="w-4 h-4" />
                      <span className="font-medium">Selected:</span>
                    </div>
                    <span className="text-green-700">
                      {formData.channel_code} ({getTypeLabel(formData.type_payment_method)})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* E-Wallet Phone Number (conditional) */}
            {formData.payment_method === 'EWALLET' && (
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  E-Wallet Phone Number <span className="text-red-500">*</span>
                </label>
                <div 
                className={`flex items-center w-full px-4 py-3 rounded-lg border 
                    ${(errors.phone_number_ewallet || errors.PhoneNumberEwallet) ? 'border-red-300' : 'border-gray-300'} 
                    focus-within:ring-2 focus-within:ring-gray-900`}
                >
                    <span className="mr-2">+62</span>
                    <span className="mr-2 items-center">|</span>
                  <input
                    type="text"
                    name="phone_number_ewallet"
                    value={formData.phone_number_ewallet}
                    onChange={handleInputChange}
                    placeholder="Phone number linked to your e-wallet"
                    className="flex-1 outline-none border-none focus:ring-0"
                    maxLength="12"
                  />
                </div>
                {(errors.phone_number_ewallet || errors.PhoneNumberEwallet) && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.phone_number_ewallet || errors.PhoneNumberEwallet}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-4 mb-6">
              <div 
                className={`relative bg-white transition-all duration-300 ${
                  isChecked 
                    ? 'border-green-500 bg-green-50' 
                    : showError 
                      ? 'border-red-500 bg-red-50 animate-shake' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <label className="flex items-start gap-4 cursor-pointer group">
                  {/* Custom Checkbox */}
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        setIsChecked(e.target.checked);
                        setShowError(false);
                      }}
                      className="sr-only"
                    />
                    <div 
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                        isChecked 
                          ? 'bg-green-500 border-green-500 scale-110' 
                          : 'bg-white border-gray-300 group-hover:border-gray-400'
                      }`}
                    >
                      {isChecked && (
                        <CheckCircle2 className="w-5 h-5 text-white animate-in zoom-in duration-200" />
                      )}
                    </div>
                  </div>

                  {/* Terms Text */}
                  <div className="flex-1 text-xs leading-relaxed">
                    <span className="text-gray-700">
                      I have read and agree to the{' '}
                      <button
                        onClick={() => navigate('/term/and/condition')}
                        className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                      >
                        Terms of Service
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      {' '}and{' '}
                      <button
                        onClick={() => navigate('/privacy/policy')}
                        className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                      >
                        Privacy Policy
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </div>
                </label>

                {/* Error indicator */}
                {showError && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-in slide-in-from-top-2 duration-200">
                      <AlertCircle className="w-3 h-3" />
                      Please accept the terms to continue
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              {isChecked && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 mb-1">
                        Terms Accepted
                      </p>
                      <p className="text-xs text-green-700">
                        You can now proceed with creating your account. By continuing, you confirm that you understand and accept our service terms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loadingRegister}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingRegister ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Create Tenant Account
                </>
              )}
            </button>
          </div>
        </form>

        {/* card price Information */}
        <div class="bg-white rounded-2xl overflow-hidden receipt-shadow shadow-xl mt-6">
            <div class="px-6 py-4">
                <div class="space-y-2">
                    <div class="flex justify-between items-star divider">
                        <div class="flex items-start">
                            <div>
                                <h3 class="font-medium text-gray-800">Subtotal</h3>
                                <p class="text-gray-500 text-sm">Harga layanan package Service</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-800">{formatCurrency(packagePrice)}</p>
                        </div>
                    </div>

                    <div class="flex justify-between items-start divider">
                        <div class="flex items-start">
                            <div>
                                <h3 class="font-medium text-gray-800">Pajak</h3>
                                <p class="text-gray-500 text-sm">Pajak pemerintah</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-800">{formatCurrency(taxTransaction)}</p>
                        </div>
                    </div>

                    <div class="flex justify-between items-start">
                        <div class="flex items-start">
                            <div>
                                <div class="flex items-center space-x-2">
                                    <h3 class="font-medium text-gray-800">Biaya Pembayaran</h3>
                                </div>
                                <p class="text-gray-500 text-sm">Biaya pemrosesan transaksi</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-800">{formatCurrency(paymentFee)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 px-6 border-t border-gray-100">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h3 class="text-lg font-bold text-dark">Total Pembayaran</h3>
                            <p class="text-gray-600 text-sm">Termasuk semua biaya</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold text-primary">{formatCurrency((tax * packagePrice) + paymentFee + packagePrice)}</p>
                        <div class="flex items-center justify-end space-x-1 mt-1">
                            <i class="fas fa-check-circle text-green-500"></i>
                            <span class="text-xs text-green-600 font-medium">Jumlah akhir</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}