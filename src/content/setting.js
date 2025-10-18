import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Key, 
  Calendar,
  ArrowLeft,
  Building, 
  Shield,
  Edit3,
  Menu,
  Check,
  X,
  Settings
} from 'lucide-react';
import Sidebar from './sidebar';
import { navbarSlice } from '../reducers/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useElementHeight } from './helper';
import {
    fetchDataAccount,
    fetchStatusChangePaymentGateway,
} from '../actions/get'
import {
    GetStatusChangePaymentGatewaySlice,
} from '../reducers/get'
import {
    patchCredentialStore,
    updateChangePaymentGateway,
} from '../actions/patch';
import {
    patchCredentialStoreSlice,
    updateChangePaymentGatewaySlice,
} from '../reducers/patch'
import {
    submissionChangePaymentGatewaySlice
} from '../reducers/post'
import {
    Toast,
    ToastPortal,
} from './alert'
import { useNavigate } from 'react-router-dom';
import { 
    XenditCredentialsGuide,
    TrialAccountAlert,
} from './model';

const SettingsComponent = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('account');
    const [toast, setToast] = useState(null)
    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const {status} = location?.state || {}

    useEffect(() => {
        if (status) {
            setActiveTab(status)
        }
    }, [status])
    
    const { ref: headerRef, height: headerHeight } = useElementHeight();

    // Account data state
    const {
        dataAccount:accountData,
        loadingDataAccount,
        errorDataAccount
    } = useSelector((state) => state.persisted.getDataAccount)
    useEffect(() => {
        if (Object.keys(accountData).length === 0) {
        dispatch(fetchDataAccount())
        }
    }, [])


    // account status change payment method
    const {resetErrorStatusChangePaymentGateway, setSuccessStatusChangePaymentGateway} = GetStatusChangePaymentGatewaySlice.actions
    const {isUpdate, isProcess, errorStatusChangePaymentGateway, loadingStatusChangePaymentGateway} = useSelector((state) => state.persisted.GetStatusChangePaymentGateway)
    useEffect(() => {
        if (!isUpdate || !isProcess) {
            dispatch(fetchStatusChangePaymentGateway())
        }
    }, [])
    
    useEffect(() => {
        if (errorStatusChangePaymentGateway) {
            setToast({
                type: "error",
                message: errorStatusChangePaymentGateway
            })
        }
    }, [errorStatusChangePaymentGateway])
 

    // Xendit integration state
    const [xenditData, setXenditData] = useState({
        bussness_id: '',
        api_key: '',
        secret_key_webhook: '',
        maintenance_time: '',
    });

    const {resetPatchCredentialStore} = patchCredentialStoreSlice.actions
    const {
        successPatchCredentialStore,
        errorFieldsPatchCredentialStore,
        errorPatchCredentialStore,
        loadingPatchCredentialStore
    } = useSelector((state) => state.patchCredentialStoreState)
    useEffect(() => {
        if (successPatchCredentialStore) {
            setToast({
                type: "success",
                message: successPatchCredentialStore
            })
            dispatch(fetchDataAccount())
        }
    }, [successPatchCredentialStore])

    useEffect(() => {
        if (errorPatchCredentialStore) {
            setToast({
                type: "error",
                message: errorPatchCredentialStore
            })
        }
    }, [errorPatchCredentialStore])

    const handleXenditInputChange = (field, value) => {
        setXenditData(prev => ({
        ...prev,
        [field]: value
        }));
    };

    const isDisabled = loadingPatchCredentialStore || xenditData.api_key === "" || xenditData.bussness_id === "" || xenditData.secret_key_webhook === "";

    const handleInputXendit = () => {
        dispatch(resetPatchCredentialStore())
        dispatch(patchCredentialStore(xenditData))
    };

    // handle update change payment gateway
    const {resetUpdateChangePaymentGateway} = updateChangePaymentGatewaySlice.actions
    const {
        successUpdateChangePaymentGateway,
        errorFieldsUpdateChangePaymentGateway,
        errorUpdateChangePaymentGateway,
        loadingUpdateChangePaymentGateway,
    } = useSelector((state) => state.updateChangePaymentGatewayState)
    useEffect(() => {
        if (successUpdateChangePaymentGateway) {
            setToast({
                type: "success",
                message: successUpdateChangePaymentGateway
            })
            dispatch(setSuccessStatusChangePaymentGateway({
                isUpdate: false,
                isProcess: false,
            }))
        }
    }, [successUpdateChangePaymentGateway])

    useEffect(() => {
        if (errorUpdateChangePaymentGateway) {
            setToast({
                type: "error",
                message: errorUpdateChangePaymentGateway
            })
        }
    }, [errorUpdateChangePaymentGateway])

    const isDisabledChangePaymentGateway = loadingUpdateChangePaymentGateway || xenditData.api_key === "" || xenditData.bussness_id === "" || xenditData.secret_key_webhook === "" || xenditData.maintenance_time === "";
   
    const handleUpdateChangePaymentGateway = () => {
        dispatch(updateChangePaymentGateway(xenditData))
        dispatch(resetUpdateChangePaymentGateway()) 
    }

    
    // response success create payment submission change payment gateway
    const {resetSubmissionChangePaymentGateway} = submissionChangePaymentGatewaySlice.actions
    const {
        successSubmissionChangePaymentGateway,
    } = useSelector((state) => state.submissionChangePaymentGatewayState)

    useEffect(() => {
        if (successSubmissionChangePaymentGateway) {
            setToast({
                type: "success",
                message: successSubmissionChangePaymentGateway
            })
            dispatch(fetchStatusChangePaymentGateway())
        }
    }, [successSubmissionChangePaymentGateway])

    return (
        <div className='flex'>
            <TrialAccountAlert/>

            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Setting"}
                />
                </div>
            )}

            <div className='flex-1'>
                <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
                    {toast && (
                    <ToastPortal> 
                        <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                        <Toast 
                        message={toast.message} 
                        type={toast.type} 
                        onClose={() => { 
                            setToast(null)
                            dispatch(resetErrorStatusChangePaymentGateway())
                            dispatch(resetPatchCredentialStore())
                            dispatch(resetUpdateChangePaymentGateway())
                            dispatch(resetSubmissionChangePaymentGateway())
                        }} 
                        duration={15000}
                        />
                        </div>
                    </ToastPortal>
                )}

                    <div>
                        {/* Header */}
                        <div
                        ref={headerRef}
                        className={`fixed top-0 z-50 bg-white border-b border-gray-200 ${isMobileDeviceType && isOpen ? 'hidden' : ''}`}
                        style={{
                            left: (isMobileDeviceType) ? '0' : '288px',
                            width: isMobileDeviceType ? '100%' : 'calc(100% - 288px)',
                            height: '64px'
                        }}
                        >
                            <div className="h-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                                <div className="flex items-center justify-between h-full gap-2 sm:gap-4">
                                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                            <Settings className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Setting</h1>
                                            <p className='text-xs taxt-gray-400'>Manage your account and integration setting.</p>
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

                        <div className='space-y-4' style={{marginTop: headerHeight}}>
                                {/* Tab Navigation */}
                                <div className="bg-white rounded-lg shadow-sm mb-6">
                                    <div className="border-b border-gray-200">
                                        <nav className="flex space-x-8 px-6">
                                        <button
                                            onClick={() => setActiveTab('account')}
                                            className={`py-6 px-1 border-b-2 font-medium text-md ${
                                            activeTab === 'account'
                                                ? 'border-gray-900 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            <User className="w-4 h-4 inline mr-2" />
                                            Account Settings
                                        </button>
                                        <button
                                            onClick={() => accountData.established_account ? setActiveTab('xendit') : setActiveTab('account')}
                                            className={`py-6 px-1 border-b-2 font-medium text-md ${
                                            activeTab === 'xendit'
                                                ? 'border-gray-900 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            <Building className="w-4 h-4 inline mr-2" />
                                            Xendit Integration
                                        </button>
                                        </nav>
                                    </div>
                                </div>

                                {/* Account Settings Tab */}
                                {activeTab === 'account' && (
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                                            <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                    {/* Account ID (Read-only) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Account ID
                                        </label>
                                        <div className="relative">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={accountData?.id}
                                            disabled
                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                        </label>
                                        <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={accountData?.email}
                                            disabled
                                            className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed`}
                                            placeholder="Enter your email address"
                                        />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                        </label>
                                        <div className="relative">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={accountData?.name}
                                            disabled
                                            className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed`}
                                            placeholder="Enter your full name"
                                        />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                        </label>
                                        <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={accountData?.phone_number}
                                            disabled
                                            className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed`}
                                            placeholder="Enter your phone number"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                )}

                                {/* Xendit Integration Tab */}
                                {activeTab === 'xendit' && (
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">Xendit Integration</h2>
                                            <p className="text-sm text-gray-600 mt-1">Configure your Xendit payment gateway settings</p>
                                        </div>
                                        <button
                                            onClick={() => window.open('https://www.youtube.com/watch?v=xendit-tutorial', '_blank')}
                                            className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                            Video Tutorial
                                        </button>
                                        </div>

                                        <div className="p-6 space-y-6">
                                        {/* Loading State */}
                                        {loadingDataAccount ? (
                                            <div className="flex flex-col items-center justify-center py-16">
                                            <div className="relative">
                                                <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="text-lg font-medium text-gray-900">Loading Payment Data</h3>
                                                <p className="text-sm text-gray-600 mt-1">Please wait while we fetch your Xendit configuration...</p>
                                            </div>
                                            <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-md">
                                                {[1, 2, 3].map((i) => (
                                                <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-8"></div>
                                                ))}
                                            </div>
                                            </div>
                                        ) : (
                                            <>
                                            {/* Business Mode Requirement Alert */}
                                            {(!accountData.bussness_id && !accountData.api_key && !accountData.secret_key_webhook) && (
                                                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                                                    <div className="relative flex items-start">
                                                    { !isMobileDeviceType && (
                                                        <div className="flex-shrink-0">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                                                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                            </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center">
                                                        <h3 className="text-lg font-bold text-white">
                                                            Verifikasi Akun Xendit Diperlukan
                                                        </h3>
                                                        <span className="ml-3 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                                                            WAJIB
                                                        </span>
                                                        </div>
                                                        <div className="mt-3 text-blue-50 space-y-2">
                                                        <p className="font-medium text-white">
                                                            Akun Xendit Anda <span className="underline decoration-2 decoration-yellow-400">HARUS</span> dalam mode bisnis untuk menggunakan fitur integrasi pembayaran.
                                                        </p>
                                                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mt-3 border border-white border-opacity-20">
                                                            <p className="text-sm font-semibold text-white mb-2 flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                            </svg>
                                                            Cara Mengaktifkan Mode Bisnis:
                                                            </p>
                                                            <ol className="text-sm space-y-2 ml-6">
                                                            <li className="flex items-start">
                                                                <span className="font-bold text-yellow-400 mr-2">1.</span>
                                                                <span>Login ke dashboard Xendit Anda</span>
                                                            </li>
                                                            <li className="flex items-start">
                                                                <span className="font-bold text-yellow-400 mr-2">2.</span>
                                                                <span>Lengkapi proses verifikasi akun (KYC)</span>
                                                            </li>
                                                            <li className="flex items-start">
                                                                <span className="font-bold text-yellow-400 mr-2">3.</span>
                                                                <span>Akun akan <span className="font-semibold text-white">otomatis berubah</span> menjadi mode bisnis setelah verifikasi selesai</span>
                                                            </li>
                                                            </ol>
                                                        </div>
                                                        <div className="flex items-center mt-3 text-sm bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-lg px-3 py-2">
                                                            <svg className="w-5 h-5 text-red-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="font-medium text-red-100">
                                                            Tanpa verifikasi, integrasi pembayaran tidak akan berfungsi dan transaksi akan gagal!
                                                            </span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Warning Alert */}
                                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                                <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-amber-800">
                                                    Penting! Pastikan Data yang Dimasukkan Benar
                                                    </h3>
                                                    <div className="mt-2 text-sm text-amber-700">
                                                    <p>Kesalahan dalam memasukkan kredensial Xendit dapat menyebabkan:</p>
                                                    <ul className="list-disc list-inside mt-1 space-y-1">
                                                        <li>Kegagalan pemrosesan pembayaran</li>
                                                        <li>Webhook tidak dapat menerima notifikasi</li>
                                                        <li>Gangguan pada sistem transaksi</li>
                                                    </ul>
                                                    <p className="mt-2 font-medium">Pastikan semua data diambil dari dashboard Xendit resmi Anda!</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            
                                            {/* Credentials Guide */}
                                            <XenditCredentialsGuide />

                                            {/* Current Integration Status */}
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h3 className="text-sm font-medium text-gray-900 mb-3">Status Integrasi Saat Ini</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center">
                                                    <div className={`w-3 h-3 rounded-full mr-2 ${accountData.bussness_id && !isUpdate ? 'bg-green-500' : isUpdate ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-sm text-gray-600">Business ID: {accountData.bussness_id && !isUpdate ? 'Configured' : isUpdate ? 'Required' : 'Not Set'}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className={`w-3 h-3 rounded-full mr-2 ${accountData.api_key && !isUpdate ? 'bg-green-500' : isUpdate ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-sm text-gray-600">API Key: {accountData.api_key && !isUpdate ? 'Configured' : isUpdate ? 'Required' : 'Not Set'}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className={`w-3 h-3 rounded-full mr-2 ${accountData.secret_key_webhook && !isUpdate ? 'bg-green-500' : isUpdate ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-sm text-gray-600">Webhook Secret: {accountData.secret_key_webhook && !isUpdate ? 'Configured' : isUpdate ? 'Required' : 'Not Set'}</span>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Form Fields - Only show if not in update mode OR if in update mode */}
                                            {(isProcess && !isUpdate) ? (
                                                <>
                                                {/* Verification Info */}
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm p-6 mb-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold">
                                                            !
                                                        </div>
                                                        </div>
                                                        <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            Verifikasi Credentials Sedang Diproses
                                                        </h3>
                                                        <p className="text-sm text-gray-700 mb-4">
                                                            Business ID, API Key, dan Webhook Secret Anda sedang dalam tahap verifikasi. 
                                                            Proses ini biasanya memerlukan beberapa saat sebelum akun dapat digunakan.
                                                        </p>
                                                        <div className="flex items-center gap-2 text-yellow-700">
                                                            <svg className="animate-spin h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Sedang diverifikasi...</span>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </>
                                            ) : 
                                            (
                                                <div className="space-y-6">
                                                    {/* Business ID */}
                                                    <div>
                                                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                                            <div className="p-6">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="flex-shrink-0">
                                                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                                                        1
                                                                    </div>
                                                                    </div>
                                                                    
                                                                    <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                                        Business ID
                                                                        </h3>
                                                                    </div>
                                                                    
                                                                    <p className="text-sm text-gray-600 mb-4">
                                                                        ID unik yang mengidentifikasi bisnis Anda di sistem Xendit
                                                                    </p>
                                                                    
                                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                                        <div className="flex items-center justify-between gap-2">
                                                                        <p className="text-sm text-gray-700 font-mono flex-1">
                                                                            Dashboard Xendit → Settings → Your Business and Profile → Your Business → Business ID
                                                                        </p>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div className="relative mt-6">
                                                                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                                <input
                                                                    type="text"
                                                                    name='busness_id'
                                                                    value={isUpdate ? xenditData.bussness_id : accountData?.bussness_id}
                                                                    onChange={(e) => isUpdate 
                                                                    ? setXenditData(prev => ({ ...prev, bussness_id: e.target.value }))
                                                                    : handleXenditInputChange('bussness_id', e.target.value)
                                                                    }
                                                                    disabled={!isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)}
                                                                    className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                                                    !isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)
                                                                        ? 'border-gray-200 bg-gray-50 text-gray-500'
                                                                        : 'border-gray-300 bg-white'
                                                                    }`}
                                                                    placeholder="Enter your Xendit Business ID"
                                                                />
                                                                </div>
                                                                <p className="mt-1 text-xs text-gray-500"> { 
                                                                    errorFieldsPatchCredentialStore?.BussnesId 
                                                                    ? errorFieldsPatchCredentialStore?.BussnesId 
                                                                    : errorFieldsUpdateChangePaymentGateway?.BussnesId
                                                                    ? errorFieldsUpdateChangePaymentGateway?.BussnesId
                                                                    : 'Your unique business identifier from Xendit dashboard'
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* API Key */}
                                                    <div>
                                                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                                            <div className="p-6">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="flex-shrink-0">
                                                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                                                        2
                                                                    </div>
                                                                    </div>
                                                                    
                                                                    <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                                        API Key
                                                                        </h3>
                                                                        <div className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                                                            Sensitif
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <p className="text-sm text-gray-600 mb-4">
                                                                        Kunci autentikasi untuk mengakses layanan Xendit API
                                                                    </p>
                                                                    
                                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                                        <div className="flex items-center justify-between gap-2">
                                                                        <p className="text-sm text-gray-700 font-mono flex-1">
                                                                            Dashboard Xendit → Settings → Developers → API Keys → Isi Key name → Money-in products Write → Balance Write → Transaction Write → Generate/Copy Api Key
                                                                        </p>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                                </div>

                                                                <div className="relative mt-6">
                                                                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                                    <input
                                                                        type="password"
                                                                        value={isUpdate ? xenditData.api_key : !accountData.api_key ? xenditData.api_key : accountData.api_key}
                                                                        onChange={(e) => isUpdate 
                                                                        ? setXenditData(prev => ({ ...prev, api_key: e.target.value }))
                                                                        : handleXenditInputChange('api_key', e.target.value)
                                                                        }
                                                                        disabled={!isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)}
                                                                        className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                                                        !isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)
                                                                            ? 'border-gray-200 bg-gray-50 text-gray-500'
                                                                            : 'border-gray-300 bg-white'
                                                                        }`}
                                                                        placeholder="Enter your Xendit API Key"
                                                                    />
                                                                </div>
                                                                <p className="mt-1 text-xs text-gray-500">{ 
                                                                errorFieldsUpdateChangePaymentGateway?.ApiKey
                                                                ? errorFieldsUpdateChangePaymentGateway?.ApiKey
                                                                : errorFieldsPatchCredentialStore?.ApiKey
                                                                ? errorFieldsPatchCredentialStore?.ApiKey
                                                                : 'Your secret API key for authenticating with Xendit services'
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Secret Key Webhook */}
                                                    <div>
                                                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                                            <div className="p-6">
                                                            <div className="flex items-start gap-4">
                                                                <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                                                    3
                                                                </div>
                                                                </div>
                                                                
                                                                <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                                    Webhook Secret
                                                                    </h3>
                                                                    <div className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                                                        Sensitif
                                                                    </div>
                                                                </div>
                                                                
                                                                <p className="text-sm text-gray-600 mb-4">
                                                                    Token untuk memverifikasi webhook dari Xendit
                                                                </p>
                                                                
                                                                <div className="bg-gray-50 rounded-lg p-4">
                                                                    <div className="flex items-center justify-between gap-2">
                                                                    <p className="text-sm text-gray-700 font-mono flex-1">
                                                                        Dashboard Xendit → Settings → Developers → Webhooks → View Webhook Verification Token → Copy the token
                                                                    </p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>

                                                            <div className="relative mt-6">
                                                                <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                                <input
                                                                    type="password"
                                                                    value={isUpdate ? xenditData.secret_key_webhook : !accountData.secret_key_webhook ? xenditData.secret_key_webhook : accountData.secret_key_webhook}
                                                                    onChange={(e) => isUpdate 
                                                                    ? setXenditData(prev => ({ ...prev, secret_key_webhook: e.target.value }))
                                                                    : handleXenditInputChange('secret_key_webhook', e.target.value)
                                                                    }
                                                                    disabled={!isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)}
                                                                    className={`pl-10 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                                                    !isUpdate && (accountData.bussness_id && accountData.api_key && accountData.secret_key_webhook)
                                                                        ? 'border-gray-200 bg-gray-50 text-gray-500'
                                                                        : 'border-gray-300 bg-white'
                                                                    }`}
                                                                    placeholder="Enter your Webhook Secret Key"
                                                                />
                                                            </div>
                                                            <p className="mt-1 text-xs text-gray-500">{ 
                                                                errorFieldsPatchCredentialStore?.SecretKeyWebhook 
                                                                ? errorFieldsPatchCredentialStore?.SecretKeyWebhook
                                                                : errorFieldsUpdateChangePaymentGateway?.SecretKeyWebhook
                                                                ? errorFieldsUpdateChangePaymentGateway?.SecretKeyWebhook
                                                                : "Secret key used to verify webhook authenticity from Xendit"
                                                            }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Maintenance Time - hanya muncul saat isUpdate */}
                                                    {isUpdate && (
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Maintenance Time
                                                            </label>
                                                            <div className="relative">
                                                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                            <input
                                                                    type="datetime-local"
                                                                    value={xenditData.maintenance_time || ""}
                                                                    onChange={(e) => {
                                                                        const raw = e.target.value; 
                                                                        const formatted = raw.replace("T", " ") + ":00";
                                                                        setXenditData((prev) => ({
                                                                        ...prev,
                                                                        maintenance_time: formatted,       
                                                                        }));
                                                                    }}
                                                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-white"
                                                                />

                                                            </div>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Set maintenance date and time for Xendit integration
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )} 

                                            {/* Webhook Endpoint Configuration */}
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                                <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="text-sm font-medium text-orange-800">
                                                    Konfigurasi Webhook Endpoint di Xendit
                                                    </h3>
                                                    <div className="mt-2 text-sm text-orange-700">
                                                    <p className="mb-2">Setelah menyimpan pengaturan ini, Anda harus menambahkan webhook endpoint berikut ke dashboard Xendit Anda:</p>
                                                    <div className="bg-white border border-orange-300 rounded p-3 mb-3">
                                                        <div className="flex justify-between items-center">
                                                        <code className="text-sm font-mono text-gray-800 break-all">{accountData.domain_webhook}</code>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(`${accountData.domain_webhook}`)}
                                                            className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200 transition-colors"
                                                        >
                                                            Copy
                                                        </button>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium mb-2">Langkah-langkah konfigurasi:</p>
                                                    <ol className="list-decimal list-inside space-y-1">
                                                        <li>Login ke dashboard Xendit Anda</li>
                                                        <li>Pergi ke Settings → Webhooks</li>
                                                        <li>Pergi ke REQUEST PAYMENT V2</li>
                                                        <li>Masukkan URL endpoint di atas ke <span className='font-bold'>Pembayaran Berhasil</span></li>
                                                    </ol>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="pt-4 border-t border-gray-200">
                                                {/* Show Save button when no data or in initial setup */}
                                                {(!accountData.bussness_id || !accountData.api_key || !accountData.secret_key_webhook) && (
                                                <div className="flex space-x-3">
                                                    <button
                                                    disabled={isDisabled}
                                                    onClick={() => handleInputXendit()}
                                                    className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors
                                                    ${isDisabled
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-gray-900 text-white hover:bg-gray-800"
                                                    }`}
                                                    >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    { loadingPatchCredentialStore  ? 'Save...' : 'Save Xendit Settings'}
                                                    </button>
                                                    <button
                                                    onClick={() => {
                                                        setXenditData({
                                                        bussness_id: '',
                                                        api_key: '',
                                                        secret_key_webhook: ''
                                                        });
                                                    }}
                                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors font-medium"
                                                    >
                                                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Reset
                                                    </button>
                                                </div>
                                                )}

                                                {/* Show Update/Cancel buttons when in update mode */}
                                                {(accountData.bussness_id || accountData.api_key || accountData.secret_key_webhook) && isUpdate && (
                                                    <div className="flex space-x-3">
                                                        <button
                                                        onClick={() => handleUpdateChangePaymentGateway()}
                                                        disabled={
                                                            isDisabledChangePaymentGateway
                                                        }
                                                        className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200
                                                            ${
                                                            isDisabledChangePaymentGateway
                                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed shadow-none'
                                                                : 'bg-gray-900 text-white hover:shadow-xl'
                                                            }
                                                        `}
                                                        >
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        {loadingUpdateChangePaymentGateway ? 'Updating...' : 'Update Account Payment'}
                                                        </button>

                                                        <button
                                                        onClick={() => {
                                                        }}
                                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                                        >
                                                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        Cancel
                                                        </button>
                                                    </div>
                                                    )}
                                            </div>

                                            {/* Show Change Account button when all data is configured and not in update mode */}
                                            {(accountData.bussness_id || accountData.api_key || accountData.secret_key_webhook) && !isUpdate && !isProcess && (
                                                <div className="flex justify-center">
                                                    <button
                                                    onClick={() => navigate('/setting/submission/change/payment/gateway')}
                                                    className="flex items-center px-6 w-full justify-center py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-100"
                                                    >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Change Account Payment
                                                    </button>
                                                </div>
                                            )}
                                            </>
                                        )}
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

export default SettingsComponent;