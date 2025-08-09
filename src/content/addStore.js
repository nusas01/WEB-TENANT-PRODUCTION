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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddStoreForm = () => {
    const navigate = useNavigate()
    const [toast, setToast] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        subdomain: '',
        paymentMethodId: '',
        productServiceId: '',
        phoneNumberEwallet: '',
        price: 0
    });

    const [errors, setErrors] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);


  
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


    // handle add store 
    const {resetAddStore} = addStoreSlice.actions
    const {successAddStore, errorFieldsAddStore, errorAddStore, loadingAddStore} = useSelector((state) => state.addStoreState)

    useEffect(() => {
        if (successAddStore) {
            navigate('/navigate')
            dispatch(resetAddStore())
        }
    }, [successAddStore])

    useEffect(() => {
        if (errorAddStore) {
        setToast({
            type: "error",
            message: "terjadi kesalahan saat menambah store, silahkan coba lagi nanti."
        })
        }
    }, [errorAddStore])

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
        case 'name':
            if (!value) {
            newErrors.name = 'Name is required';
            } else if (value.length < 6) {
            newErrors.name = 'Name must be at least 6 characters';
            } else if (value.length > 50) {
            newErrors.name = 'Name must not exceed 50 characters';
            } else {
            delete newErrors.name;
            }
            break;
        case 'phoneNumber':
            if (!value) {
            newErrors.phoneNumber = 'Phone number is required';
            } else if (!/^\d+$/.test(value)) {
            newErrors.phoneNumber = 'Phone number must contain only numbers';
            } else {
            delete newErrors.phoneNumber;
            }
            break;
        case 'address':
            if (!value) {
            newErrors.address = 'Address is required';
            } else if (value.length > 100) {
            newErrors.address = 'Address must not exceed 100 characters';
            } else {
            delete newErrors.address;
            }
            break;
        case 'city':
        case 'state':
        case 'country':
            if (!value) {
            newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
            } else if (value.length > 50) {
            newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed 50 characters`;
            } else {
            delete newErrors[name];
            }
            break;
        case 'postalCode':
            if (!value) {
            newErrors.postalCode = 'Postal code is required';
            } else if (value.length !== 5) {
            newErrors.postalCode = 'Postal code must be exactly 5 characters';
            } else {
            delete newErrors.postalCode;
            }
            break;
        case 'subdomain':
            if (!value) {
            newErrors.subdomain = 'Subdomain is required';
            } else if (value.length > 10) {
            newErrors.subdomain = 'Subdomain must not exceed 10 characters';
            } else {
            delete newErrors.subdomain;
            }
            break;
        default:
            break;
        }

        setErrors(newErrors);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setFormData(prev => ({ 
        ...prev, 
        productServiceId: product.id,
        price: product.price
        }));
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
        setFormData(prev => ({ 
        ...prev, 
        paymentMethodId: payment.id 
        }));
    };

    const calculateTotal = () => {
        if (!selectedProduct || !selectedPayment) return 0;
        
        const subtotal = selectedProduct.price;
        const taxAmount = subtotal * tax;
        let feeAmount = 0;

        if (selectedPayment.type_payment_method === 'EWALLET' || selectedPayment.type_payment_method === 'QR') {
        feeAmount = subtotal * selectedPayment.fee;
        } else {
        feeAmount = selectedPayment.fee;
        }

        return subtotal + taxAmount + feeAmount;
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
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="08123456789"
                    />
                    {errors.phoneNumber && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phoneNumber}
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
                            errors.subdomain ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="mystore"
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm pointer-events-none">
                        .nusas.id
                        </span>
                    </div>
                    {errors.subdomain && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subdomain}
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
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.postalCode ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-gray-900 focus:border-transparent`}
                        placeholder="12345"
                        maxLength="5"
                    />
                    {errors.postalCode && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.postalCode}
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
                        onClick={() => handleProductSelect(product)}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedProduct?.id === product.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${product.status !== 'Active' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                            {product.product}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                            <span className="text-2xl font-bold text-gray-900">
                                {formatCurrency(product.price)}
                            </span>
                            {product.original_price > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(product.original_price)}
                                </span>
                            )}
                            </div>
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
                        {selectedProduct?.id === product.id && (
                            <CheckCircle className="w-6 h-6 text-gray-900" />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paymentMethods.map((payment) => (
                    <div
                        key={payment.id}
                        onClick={() => handlePaymentSelect(payment)}
                        className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        selectedPayment?.id === payment.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {getPaymentIcon(payment.type_payment_method)}
                            <div>
                            <h4 className="font-semibold text-gray-900">
                                {payment.channel_code}
                            </h4>
                            <p className="text-xs text-gray-500">
                                {payment.type_payment_method}
                            </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                            {payment.type_payment_method === 'EWALLET' || payment.type_payment_method === 'QR'
                                ? `${(payment.fee * 100).toFixed(1)}%`
                                : formatCurrency(payment.fee)
                            }
                            </p>
                            {selectedPayment?.id === payment.id && (
                            <CheckCircle className="w-4 h-4 text-gray-900 ml-auto mt-1" />
                            )}
                        </div>
                        </div>
                    </div>
                    ))}
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
                        {selectedPayment.type_payment_method === 'EWALLET' || selectedPayment.type_payment_method === 'QR'
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
                disabled={!selectedProduct || !selectedPayment || Object.keys(errors).length > 0 || loadingAddStore}
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