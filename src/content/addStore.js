import React, { useState, useEffect } from 'react';
import { 
  Store, 
  MapPin, 
  Phone, 
  CreditCard, 
  Package, 
  Calculator,
  AlertCircle,
  CheckCircle,
  Building,
  Check,
} from 'lucide-react';
import {
    Toast, 
    ToastPortal
} from './alert'
import {
    productServicesSlice,
    paymentMethodsSlice,
} from '../reducers/get'
import {
    fetchProductServices, 
    fetchPaymentMethods, 
    fetchRequiredPayment,
} from '../actions/get'
import {
    formatCurrency
} from './helper'
import {
    addStoreSlice
} from '../reducers/post'
import {
    addStore
} from '../actions/post'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fromJSON } from 'postcss';

const AddStoreForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toast, setToast] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        subdomain: '',
        payment_method_id: '',
        product_service_id: '',
        phone_number_ewallet: '',
        price: 0
    });

    const [errors, setErrors] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const {isMobileDeviceType} = useSelector((state) => state.persisted.navbar)
    
  
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
            message: errorProductService
            })
        }
    }, [errorProductService])



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
                message: errorPaymentMethods
            })
        }
    }, [errorPaymentMethods])

    // validate form data
    const validateAllFields = () => {
        let isValid = true;
        const newErrors = { ...errors };

        Object.entries(formData).forEach(([key, value]) => {
            // panggil validateField untuk setiap field
            switch (key) {
            case 'name':
                if (!value) {
                    newErrors.name = 'Nama wajib diisi';
                    isValid = false;
                } else if (value.length < 6) {
                    newErrors.name = 'Nama harus terdiri dari minimal 6 karakter';
                    isValid = false;
                } else if (value.length > 50) {
                    newErrors.name = 'Nama tidak boleh lebih dari 50 karakter';
                    isValid = false;
                } else {
                    delete newErrors.name;
                }
                break;

            case 'phone_number':
                if (!value) {
                    newErrors.phone_number = 'Nomor telepon wajib diisi';
                    isValid = false;
                } else {
                    delete newErrors.phone_number;
                }
                break;

            case 'phone_number_ewallet':
                if (selectedPayment?.type_payment_method === 'EWALLET' && !value) {
                    newErrors.phone_number_ewallet = 'Phone number Ewallet perlu diisi';
                } else {
                    delete newErrors.phone_number_ewallet
                }
                break;


            case 'address':
                if (!value) {
                    newErrors.address = 'Alamat wajib diisi';
                    isValid = false;
                } else if (value.length > 100) {
                    newErrors.address = 'Alamat tidak boleh lebih dari 100 karakter';
                    isValid = false;
                } else {
                    delete newErrors.address;
                }
                break;

            case 'city':
            case 'state':
            case 'country':
                if (!value) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} wajib diisi`;
                    isValid = false;
                } else if (value.length > 50) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} tidak boleh lebih dari 50 karakter`;
                    isValid = false;
                } else {
                    delete newErrors[key];
                }
                break;

            case 'postal_code':
                if (!value) {
                    newErrors.postal_code = 'Kode pos wajib diisi';
                    isValid = false;
                } else if (value.length !== 5) {
                    newErrors.postal_code = 'Kode pos harus terdiri dari 5 karakter';
                    isValid = false;
                } else {
                    delete newErrors.postal_code;
                }
                break;

            case 'subdomain':
                if (!value) {
                    newErrors.subdomain = 'Subdomain wajib diisi';
                    isValid = false;
                } else if (value.length > 63) {
                    newErrors.subdomain = 'Subdomain tidak boleh lebih dari 63 karakter';
                    isValid = false;
                } else {
                    delete newErrors.subdomain;
                }
                break;

            default:
                break;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const calculateTotal = () => {
        if (!selectedProduct || !selectedPayment) return 0;
        
        const subtotal = selectedProduct.price;
        const taxAmount = subtotal * tax;
        let feeAmount = 0;

        if (selectedPayment?.type_payment_method === 'EWALLET' || selectedPayment?.type_payment_method === 'QR') {
        feeAmount = (subtotal+taxAmount) * selectedPayment.fee;
        } else {
        feeAmount = selectedPayment.fee;
        }

        return subtotal + taxAmount + feeAmount;
    };


    // handle add store 
    const {resetAddStore} = addStoreSlice.actions
    const {successAddStore, errorFieldsAddStore, errorAddStore, loadingAddStore} = useSelector((state) => state.persisted.addStore)

    const handleCreateStore = () => {
        if (validateAllFields()) {
            dispatch(addStore({
                name: formData.name,
                phone_number: '+62' + formData.phone_number,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                postal_code: formData.postal_code,
                subdomain: formData.subdomain,
                payment_method_id: formData.payment_method_id,
                product_service_id: formData.product_service_id,
                phone_number_ewallet: '+62' + formData.phone_number_ewallet,
                price: calculateTotal(),
            }));
            dispatch(resetAddStore())
            setErrors({})
        }
    };

    useEffect(() => {
        if (Object.keys(errorFieldsAddStore).length > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });

            if (Array.isArray(errorFieldsAddStore) && errorFieldsAddStore.length > 0) {
                const mergedErrors = errorFieldsAddStore.reduce((acc, curr) => {
                    return { ...acc, ...curr };
                }, {});

                setErrors(prev => ({
                    ...prev,
                    ...mergedErrors
                }));
            }
        }
    }, [errorFieldsAddStore])

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            window.scrollTo({
            top: 0,
            behavior: 'smooth' 
            });
        }
    }, [errors])

    useEffect(() => {
        if (successAddStore) {
            navigate('/invoice/create/store')
            dispatch(resetAddStore())
            dispatch(fetchRequiredPayment())
        }
    }, [successAddStore])

    useEffect(() => {
        if (errorAddStore) {
        setToast({
            type: "error",
            message: errorAddStore
        })
        }
    }, [errorAddStore])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setFormData(prev => ({ 
        ...prev, 
        product_service_id: product.id,
        price: product.price
        }));
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
        setFormData(prev => ({ 
        ...prev, 
        payment_method_id: payment.id 
        }));
    };

    const getPaymentIcon = (type) => {
        switch (type) {
        case 'EWALLET':
            return <Phone className="w-5 h-5" />;
        case 'VA':
            return <Building className="w-5 h-5" />;
        case 'QR':
            return <CreditCard className="w-5 h-5" />;
        default:
            return <CreditCard className="w-5 h-5" />;
        }
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


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 overflow-y-auto">
            {toast && (
                <ToastPortal> 
                    <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                    <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => { 
                        setToast(null)
                        dispatch(resetAddStore())
                        dispatch(resetErrorPaymentMethods())
                        dispatch(resetErrorProductService())
                    }} 
                    duration={3000}
                    />
                    </div>
                </ToastPortal>
            )}
            
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Store Registration</h1>
            </div>
            <p className="text-gray-600">Create your store and choose your plan</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
                {/* Store Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                    <Store className="w-6 h-6 text-gray-900 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Store Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="Enter store name (6-50 characters)"
                    />
                    {errors.name && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                        </div>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                    </label>
                    <div 
                    className={`flex items-center w-full px-4 py-3 rounded-lg border 
                        ${(errors.phone_number || errors.PhoneNumber) ? 'border-red-300' : 'border-gray-300'} 
                        focus-within:ring-2 focus-within:ring-gray-900`}
                    >
                        <span className="mr-2">+62</span>
                        <span className="mr-2 items-center">|</span>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="flex-1 outline-none border-none focus:ring-0"
                            placeholder="8123456789"
                            maxLength="12"
                        />
                    </div>
                    {(errors.phone_number || errors.PhoneNumber) && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone_number || errors.PhoneNumber}
                        </div>
                    )}
                    </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subdomain *
                    </label>
                    <div className="relative">
                        <input
                        type="text"
                        name="subdomain"
                        value={formData.subdomain}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 pr-28 rounded-lg border ${
                            (errors.subdomain || errors.Subdomain) ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="mystore"
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm pointer-events-none">
                        .nusas.id
                        </span>
                    </div>
                    {(errors.subdomain || errors.Subdomain)  && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subdomain || errors.Subdomain}
                        </div>
                    )}
                    {!errors.subdomain && formData.subdomain && (
                        <p className="mt-2 text-sm text-gray-500">
                        Domain lengkap: <span className="font-medium">{formData.subdomain}.nusas.id</span>
                        </p>
                    )}
                    </div>
                </div>
                </div>

                {/* Address Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6 text-gray-900 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="Enter full address"
                    />
                    {errors.address && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.address}
                        </div>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.city ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="Enter city"
                    />
                    {errors.city && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.city}
                        </div>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                    </label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.state ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="Enter state"
                    />
                    {errors.state && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.state}
                        </div>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.country ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="Enter country"
                    />
                    {errors.country && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.country}
                        </div>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code *
                    </label>
                    <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.postal_code ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="12345"
                        maxLength="5"
                    />
                    {errors.postal_code && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.postal_code}
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>

            {/* Right Column - Product & Payment Selection */}
            <div className="space-y-6">
                {/* Product Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Package className="w-6 h-6 text-gray-900 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900">Choose Your Plan</h2>
                    </div>
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={(e) => {
                                    if (product.status !== 'Active') return;
                                    handleProductSelect(product);
                                }}
                                className={`relative rounded-lg border-2 p-4 transition-all ${
                                    selectedProduct?.id === product.id
                                        ? 'border-gray-900 bg-gray-50'
                                        : product.status !== 'Active'
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                                }`}
                            >
                                {/* Badge for discounts */}
                                {product.badge && (
                                    <div className="absolute -top-2 -right-2">
                                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                                            {product.badge}
                                        </span>
                                    </div>
                                )}
                                
                                {/* Popular badge */}
                                {product.popular && (
                                    <div className="absolute -top-2 left-4">
                                        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                                            Popular
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Product Name and Segment */}
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {product.name || product.product}
                                            </h3>
                                        </div>
                                        
                                        {/* Segment description */}
                                        {product.segment && (
                                            <p className="text-sm text-gray-600 mb-3">
                                                {product.segment}
                                            </p>
                                        )}
                                        
                                        {/* Pricing */}
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="text-2xl font-bold text-gray-900">
                                                {formatCurrency(product.price)}
                                            </span>
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatCurrency(product.originalPrice)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Features */}
                                        {product.features && product.features.length > 0 && (
                                            <div className="mb-3">
                                                <div className="space-y-1">
                                                    {product.features.slice(0, 3).map((feature, index) => (
                                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                                            {feature}
                                                        </div>
                                                    ))}
                                                    {product.features.length > 3 && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            +{product.features.length - 3} more features
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Status */}
                                        <div className="mt-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                product.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Selection indicator */}
                                    {selectedProduct?.id === product.id && (
                                        <CheckCircle className="w-6 h-6 text-gray-900 mt-1" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                    <CreditCard className="w-6 h-6 text-gray-900 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                </div>

                <div>
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
                                    formData.payment_method_id === method.id
                                    ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-opacity-20'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handlePaymentSelect(method)}
                                >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900 text-sm">
                                    {method.channel_code}
                                    </span>
                                    {formData.payment_method_id === method.id && (
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
                        {selectedPayment?.type_payment_method === "EWALLET" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number Ewallet*
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
                                        className="flex-1 outline-none border-none focus:ring-0"
                                        placeholder="8123456789"
                                        length="12"
                                    />
                                </div>
                                {(errors.phone_number_ewallet || errors.PhoneNumberEwallet) && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.phone_number_ewallet || errors.PhoneNumberEwallet}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                </div>

                {/* Transaction Summary */}
                {selectedProduct && selectedPayment && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                    <Calculator className="w-6 h-6 text-gray-900 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Transaction Summary</h2>
                    </div>

                    <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Plan ({selectedProduct.product})</span>
                        <span className="font-semibold">{formatCurrency(selectedProduct.price)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tax ({(tax * 100).toFixed(0)}%)</span>
                        <span className="font-semibold">{formatCurrency(selectedProduct.price * tax)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Payment Fee ({selectedPayment.channel_code})</span>
                        <span className="font-semibold">
                        {selectedPayment?.type_payment_method === 'EWALLET' || selectedPayment?.type_payment_method === 'QR'
                            ? formatCurrency(selectedProduct.price * selectedPayment.fee)
                            : formatCurrency(selectedPayment.fee)
                        }
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-900">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-gray-900">{formatCurrency(calculateTotal())}</span>
                    </div>
                    </div>
                </div>
                )}

                {/* Submit Button */}
                <button
                type="button"
                disabled={!selectedProduct || !selectedPayment || loadingAddStore}
                onClick={() => handleCreateStore()}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    {loadingAddStore ? (
                        <span>Create Store...</span>
                    ) : (
                        <span>Create Store</span>
                    )}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AddStoreForm;