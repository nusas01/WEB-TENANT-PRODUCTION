import React, { useState, useEffect } from 'react';
import { 
    AlertCircle, 
    CreditCard, 
    Loader, 
    ArrowRight, 
    Building, 
    Info, 
    Phone, 
    Wallet, 
    Check, 
    RefreshCw,
    CheckCircle2,
    ExternalLink,
} from 'lucide-react';
import {
    GetProductChangePaymentGatewaySlice,
    paymentMethodsSlice
} from '../reducers/get'
import {
    fetchPaymentMethods,
    fetchProductChangePaymentGateway,
} from '../actions/get'
import {submissionChangePaymentGateway} from '../actions/post';
import { submissionChangePaymentGatewaySlice } from '../reducers/post';
import {
    Toast,
    ToastPortal
} from './alert'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency } from './helper';

const ChangePaymentGateway = () => {
    const [toast, setToast] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    // handle get data product change payment gateway
    const {resetProductChangePaymentGateway} =  GetProductChangePaymentGatewaySlice.actions
    const {
        dataProductChangePaymentGateway,
        errorProductChangePaymentGateway,
        loadingProductChangePaymentGateway,
    } = useSelector((state) => state.persisted.GetProductChangePaymentGateway)

    useEffect(() => {
        if(Object.keys(dataProductChangePaymentGateway).length === 0) {
            dispatch(fetchProductChangePaymentGateway())
        }
    }, [])

    useEffect(() => {
        if (errorProductChangePaymentGateway) {
            setToast({
                type: "error",
                message: errorProductChangePaymentGateway
            })
        }   
    }, [errorProductChangePaymentGateway])




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



     // handle submission 
    const [dataSubmission, setDataSubmission] = useState({
        product_service_id: '',
        payment_method_id: '',
        phone_number_ewallet: '',
        amount: '',
    })
    const {resetSubmissionChangePaymentGateway} = submissionChangePaymentGatewaySlice.actions
    const {
        successSubmissionChangePaymentGateway, 
        errorSubmissionChangePaymentGateway, 
        errorFieldSubmissionChangePaymentGateway, 
        loadingSubmissionChangePaymentGateway
    } = useSelector((state) => state.submissionChangePaymentGatewayState)

    useEffect(() => {
        if (successSubmissionChangePaymentGateway) {
            navigate('/setting')
        }
    }, [successSubmissionChangePaymentGateway])

    useEffect(() => {
        if (errorSubmissionChangePaymentGateway) {
            setToast({
                type: "error",
                message: errorSubmissionChangePaymentGateway
            })
        }
    }, [errorSubmissionChangePaymentGateway])

    useEffect(() => {
        if (errorFieldSubmissionChangePaymentGateway) {
            if (Array.isArray(errorFieldSubmissionChangePaymentGateway) && errorFieldSubmissionChangePaymentGateway.length > 0) {
                const mergedErrors = errorFieldSubmissionChangePaymentGateway.reduce((acc, curr) => {
                    return { ...acc, ...curr };
                }, {});

                setErrors(prev => ({
                    ...prev,
                    ...mergedErrors
                }));
            }
            dispatch(resetSubmissionChangePaymentGateway())
        }
    }, [errorFieldSubmissionChangePaymentGateway])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataSubmission(prev => ({ ...prev, [name]: value }));
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    // Calculate summary
    const calculateSummary = () => {
        if (!selectedPaymentMethod) return null;
        let fee
        const baseAmount = dataProductChangePaymentGateway.price;
        if (selectedPaymentMethod.type_payment_method !== 'VA') {
            fee = selectedPaymentMethod.fee * baseAmount;
        } else {
            fee = selectedPaymentMethod.fee;
        }
        const totalAmount = baseAmount + fee;
        const refundAmount = 8000; // Fixed refund amount
        const deductedAmount = totalAmount - refundAmount;

        return {
        baseAmount,
        fee,
        totalAmount,
        refundAmount,
        deductedAmount
        };
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setDataSubmission({
        ...dataSubmission,
        payment_method_id: method.id,
        amount: method.type_payment_method !== 'VA' 
            ?  (dataProductChangePaymentGateway.price * method.fee) + dataProductChangePaymentGateway.price
            : dataProductChangePaymentGateway.price + method.fee
        });
        setShowSummary(true);
    };

    const handleSubmit = () => {
        setErrors({})
        if (!isChecked) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        dispatch(submissionChangePaymentGateway({
            payment_method_id: dataSubmission.payment_method_id,
            product_service_id: dataProductChangePaymentGateway.id,
            amount: dataSubmission.amount,
            phone_number_ewallet: `+62${dataSubmission.phone_number_ewallet}`
        }))
    };

    const summary = calculateSummary();

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {toast && (
                <ToastPortal> 
                    <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                    <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => { 
                    setToast(null)
                    dispatch(resetSubmissionChangePaymentGateway())
                    dispatch(resetErrorPaymentMethods())
                    dispatch(resetProductChangePaymentGateway())
                    }} 
                    duration={5000}
                    />
                    </div>
                </ToastPortal>
            )}
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengajuan Perubahan Akun Xendit</h1>
                    <p className="text-gray-600">Lakukan pembayaran untuk testing perubahan data akun</p>
                    </div>
                </div>
                
                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Informasi Penting:</p>
                        <ul className="space-y-1 text-blue-700">
                            <li>• Dana yang Anda bayarkan digunakan untuk testing sistem</li>
                            <li>• Sebagian besar dana akan dikembalikan ke akun Xendit Anda setelah proses verifikasi selesai</li>
                            <li>• Selisih dana digunakan untuk biaya testing dan administrasi</li>
                            <li>• Jika menggunakan E-Wallet untuk pembayaran testing, pastikan nomor telepon E-Wallet diisi dengan benar</li>
                            <li>• Transaksi uji coba (testing transaction) tidak dapat diajukan pengembalian dana</li>
                            <li>• Pastikan akun Xendit Anda sudah berada dalam mode Bisnis atau Produksi sebelum melakukan perubahan akun payment gateway</li>
                        </ul>
                    </div>

                    </div>
                </div>
            </div>

            <div>
            {/* Payment Method Selection */}
                <div className="bg-white rounded-xl shadow-sm border mb-6 border-gray-200 p-6">
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
                                        dataSubmission.payment_method_id === method.id
                                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-opacity-20'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => handlePaymentMethodSelect(method)}
                                    >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900 text-sm">
                                        {method.channel_code}
                                        </span>
                                        {dataSubmission.payment_method_id === method.id && (
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
                            {selectedPaymentMethod?.type_payment_method === "EWALLET" && (
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
                                            value={dataSubmission.phone_number_ewallet}
                                            onChange={handleInputChange}
                                            className="flex-1 outline-none border-none focus:ring-0"
                                            placeholder="8123456789"
                                            length="12"
                                        />
                                    </div>
                                    {(errors.phone_number_ewallet || errors.PhoneNumberEwallet ) && (
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
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Ringkasan Transaksi
                </h3>
                
                {showSummary && summary ? (
                <div className="space-y-4">
                    <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Biaya Testing</span>
                        <span className="font-medium">Rp {summary.baseAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Biaya Admin</span>
                        <span className="font-medium">Rp {summary.fee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="border-t pt-3">
                        <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total Pembayaran</span>
                        <span className="font-semibold text-lg text-gray-900">
                            Rp {summary.totalAmount.toLocaleString('id-ID')}
                        </span>
                        </div>
                    </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <span className="text-sm font-medium text-green-800">Sebagian besar dana anda akan di kembalikan ke account xendit anda</span>
                    </div>

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
                    onClick={() => handleSubmit()}
                    disabled={loadingSubmissionChangePaymentGateway}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        { loadingSubmissionChangePaymentGateway 
                        ?  <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Proccess...
                            </>
                        : (
                            <>
                                Lanjutkan Pembayaran
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
                ) : (
                <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">
                    Pilih metode pembayaran untuk melihat ringkasan transaksi
                    </p>
                </div>
                )}
            </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                <h4 className="font-medium text-gray-900 mb-2">Catatan Penting</h4>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>• Proses testing akan di proses setelah pembayaran berhasil</p>
                    <p>• Setelah Pembayaran berhasil, harap isi kembali data account xendit anda</p>
                    <p>• Pengisian di lakukan seperti pertama kali input account xendit di dasboard setting bagian xendit integration</p>
                    <p>• Dan Pastikan anda mengikuti langkah langkah seperti yang ada di dashboard</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ChangePaymentGateway;