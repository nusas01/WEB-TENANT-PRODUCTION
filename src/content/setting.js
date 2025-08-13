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
import { useElementHeight } from './helper';
import {
    fetchDataAccount,
} from '../actions/get'


const SettingsComponent = () => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  const { setIsOpen } = navbarSlice.actions
  const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)
  
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
  console.log("account data apa ini: ", accountData)
//   const [accountData, setAccountData] = useState({
//     id: 'ACC001',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     password: 'password123',
//     phone_number: '+6281234567890'
//   });

  // Xendit integration state
  const [xenditData, setXenditData] = useState({
    business_id: '',
    api_key: '',
    secret_key_webhook: ''
  });

  const [tempAccountData, setTempAccountData] = useState(accountData);
  const [errors, setErrors] = useState({});

  const handleAccountEdit = () => {
    setIsEditing(true);
    setTempAccountData(accountData);
  };

  const handleAccountSave = () => {
    // Basic validation
    const newErrors = {};
    
    if (!tempAccountData.name || tempAccountData.name.length < 6) {
      newErrors.name = 'Name must be at least 6 characters';
    }
    
    if (!tempAccountData.email || !/\S+@\S+\.\S+/.test(tempAccountData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!tempAccountData.password || tempAccountData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!tempAccountData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsEditing(false);
    setErrors({});
  };

  const handleAccountCancel = () => {
    setTempAccountData(accountData);
    setIsEditing(false);
    setErrors({});
  };

  const handleXenditSave = () => {
    // Here you would typically send the data to your backend
    console.log('Xendit data:', xenditData);
    alert('Xendit integration settings saved!');
  };

  const handleAccountInputChange = (field, value) => {
    setTempAccountData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleXenditInputChange = (field, value) => {
    setXenditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='flex'>
        {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
            <div className='w-1/10 z-50 min-w-[290px]'>
            <Sidebar
            activeMenu={"Setting"}
            />
            </div>
        )}

        <div className='flex-1'>
            <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
                <div className="max-w-7xl">
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

                    <div className='mx-auto space-y-4' style={{marginTop: headerHeight}}>
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
                                    onClick={() => setActiveTab('xendit')}
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
                                {!isEditing ? (
                                    <button
                                    onClick={handleAccountEdit}
                                    className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                    <button
                                        onClick={handleAccountSave}
                                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleAccountCancel}
                                        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                    </div>
                                )}
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
                                        value={isEditing ? tempAccountData?.email : accountData?.email}
                                        onChange={(e) => handleAccountInputChange('email', e.target.value)}
                                        disabled
                                        className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed`}
                                        placeholder="Enter your email address"
                                    />
                                    </div>
                                    {errors?.email && <p className="mt-1 text-sm text-red-600">{errors?.email}</p>}
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
                                        value={isEditing ? tempAccountData?.name : accountData?.name}
                                        onChange={(e) => handleAccountInputChange('name', e.target.value)}
                                        disabled={!isEditing}
                                        className={`pl-10 w-full px-3 py-2 border rounded-lg ${
                                        errors?.name ? 'border-red-500' : 'border-gray-300'
                                        } ${
                                        isEditing ? 'bg-white' : 'bg-gray-50'
                                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                        placeholder="Enter your full name"
                                    />
                                    </div>
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                                        value={isEditing ? tempAccountData.phone_number : accountData.phone_number}
                                        onChange={(e) => handleAccountInputChange('phone_number', e.target.value)}
                                        disabled={!isEditing}
                                        className={`pl-10 w-full px-3 py-2 border rounded-lg ${
                                        errors.phone_number ? 'border-red-500' : 'border-gray-300'
                                        } ${
                                        isEditing ? 'bg-white' : 'bg-gray-50'
                                        } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                        placeholder="Enter your phone number"
                                    />
                                    </div>
                                    {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Xendit Integration Tab */}
                            {activeTab === 'xendit' && (
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
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

                                {/* Current Integration Status */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Status Integrasi Saat Ini</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${accountData.business_id ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-sm text-gray-600">Business ID: {accountData.business_id ? 'Configured' : 'Not Set'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${accountData.api_key ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-sm text-gray-600">API Key: {accountData.api_key ? 'Configured' : 'Not Set'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${accountData.secret_key_webhook ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-sm text-gray-600">Webhook Secret: {accountData.secret_key_webhook ? 'Configured' : 'Not Set'}</span>
                                    </div>
                                    </div>
                                </div>

                                {/* Business ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business ID *
                                    </label>
                                    <div className="relative">
                                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={accountData.business_id}
                                        onChange={(e) => handleXenditInputChange('business_id', e.target.value)}
                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Enter your Xendit Business ID"
                                    />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Your unique business identifier from Xendit dashboard</p>
                                </div>

                                {/* API Key */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    API Key *
                                    </label>
                                    <div className="relative">
                                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={accountData.api_key}
                                        onChange={(e) => handleXenditInputChange('api_key', e.target.value)}
                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Enter your Xendit API Key"
                                    />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Your secret API key for authenticating with Xendit services</p>
                                </div>

                                {/* Secret Key Webhook */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Webhook Secret Key *
                                    </label>
                                    <div className="relative">
                                    <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={accountData.secret_key_webhook}
                                        onChange={(e) => handleXenditInputChange('secret_key_webhook', e.target.value)}
                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Enter your Webhook Secret Key"
                                    />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Secret key used to verify webhook authenticity from Xendit</p>
                                </div>

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
                                            <code className="text-sm font-mono text-gray-800">{accountData.domain_webhook}</code>
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
                                            <li>Klik "Add Webhook"</li>
                                            <li>Masukkan URL endpoint di atas</li>
                                            <li>Pilih event types yang diperlukan (payment, invoice, dll)</li>
                                            <li>Pastikan webhook status adalah "Active"</li>
                                        </ol>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                {/* Update/Save Button */}
                                <div className="pt-4 border-t border-gray-200 flex space-x-3">
                                    <button
                                    onClick={handleXenditSave}
                                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                    >
                                    <Save className="w-4 h-4 mr-2" />
                                    {accountData.business_id || accountData.api_key ||accountData.secret_key_webhook ? 'Update' : 'Save'} Xendit Settings
                                    </button>
                                    <button
                                    onClick={() => {
                                        setXenditData({
                                        business_id: '',
                                        api_key: '',
                                        secret_key_webhook: ''
                                        });
                                    }}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-400 transition-colors font-medium"
                                    >
                                    Reset
                                    </button>
                                </div>

                                {/* Credentials Guide */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Building className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-blue-800">
                                        Cara Mendapatkan Kredensial Xendit
                                        </h3>
                                        <div className="mt-2 text-sm text-blue-700">
                                        <div className="space-y-3">
                                            <div>
                                            <p className="font-medium">Business ID:</p>
                                            <p>Dashboard Xendit → Settings → Business Profile → Business ID</p>
                                            </div>
                                            <div>
                                            <p className="font-medium">API Key:</p>
                                            <p>Dashboard Xendit → Settings → API Keys → Generate/Copy Secret Key</p>
                                            </div>
                                            <div>
                                            <p className="font-medium">Webhook Secret:</p>
                                            <p>Dashboard Xendit → Settings → Webhooks → Webhook Verification Token</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
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