import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Building, 
  CreditCard, 
  Store,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

export default function TenantRegistrationForm() {
  // Simulate navigation data - set to null to show package selection, or set package to skip
  const navigationData = null; // Change this to { selectedPackage: 'starter' } to simulate data from navigation
  
  const [selectedPackage, setSelectedPackage] = useState(navigationData?.selectedPackage || '');
  const [showPackageSelection, setShowPackageSelection] = useState(!navigationData?.selectedPackage);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone_number_ewallet: '',
    price: navigationData?.selectedPackage === 'starter' ? 500000 : 
           navigationData?.selectedPackage === 'business' ? 600000 :
           navigationData?.selectedPackage === 'enterprise' ? 750000 : '',
    payment_method: '',
    name_store: '',
    phone_number_store: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect untuk UMKM',
      price: 500000,
      originalPrice: 750000,
      discount: 33,
      features: [
        'Web pemesanan dengan QR Code',
        'QR Code untuk dine-in & take-away',
        'Dashboard admin modern'
      ],
      buttonText: 'Mulai Sekarang',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'business',
      name: 'Business Pro',
      description: 'Untuk bisnis berkembang',
      price: 600000,
      originalPrice: 900000,
      discount: 33,
      features: [
        'Semua fitur Starter Package',
        'Advanced analytics & insights',
        'Laporan keuangan otomatis'
      ],
      buttonText: 'Pilih Paket Terpopuler',
      color: 'from-pink-400 to-pink-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Solusi lengkap enterprise',
      price: 750000,
      originalPrice: 1125000,
      discount: 33,
      features: [
        'Semua fitur Business Pro',
        'HR Management terintegrasi',
        'Payroll & absensi otomatis'
      ],
      buttonText: 'Mulai Sekarang',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const handlePackageSelect = (packageId) => {
    const selected = packages.find(pkg => pkg.id === packageId);
    setSelectedPackage(packageId);
    setFormData(prev => ({ ...prev, price: selected.price }));
    setShowPackageSelection(false);
  };

  const paymentMethods = [
    { value: '', label: 'Select Payment Method' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'ewallet', label: 'E-Wallet (OVO, GoPay, DANA)' },
    { value: 'virtual_account', label: 'Virtual Account' }
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value) newErrors.name = 'Name is required';
        else if (value.length < 6) newErrors.name = 'Name must be at least 6 characters';
        else if (value.length > 50) newErrors.name = 'Name must not exceed 50 characters';
        else delete newErrors.name;
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) newErrors.email = 'Please enter a valid email';
        else delete newErrors.email;
        break;

      case 'password':
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        if (!value) newErrors.password = 'Password is required';
        else if (value.length < 6) newErrors.password = 'Password must be at least 6 characters';
        else if (value.length > 50) newErrors.password = 'Password must not exceed 50 characters';
        else if (!hasUppercase) newErrors.password = 'Password must contain at least one uppercase letter';
        else if (!hasNumber) newErrors.password = 'Password must contain at least one number';
        else if (!hasSpecial) newErrors.password = 'Password must contain at least one special character';
        else delete newErrors.password;
        break;

      case 'phone_number':
      case 'phone_number_store':
      case 'phone_number_ewallet':
        const phoneRegex = /^(\+?62|0)[0-9]{9,12}$/;
        if (name === 'phone_number' && !value) {
          newErrors[name] = 'Phone number is required';
        } else if (value && !phoneRegex.test(value)) {
          newErrors[name] = 'Please enter a valid Indonesian phone number';
        } else {
          delete newErrors[name];
        }
        break;

      case 'postal_code':
        if (!value) newErrors.postal_code = 'Postal code is required';
        else if (value.length !== 5 || !/^\d{5}$/.test(value)) newErrors.postal_code = 'Postal code must be exactly 5 digits';
        else delete newErrors.postal_code;
        break;

      case 'payment_method':
        if (!value) newErrors.payment_method = 'Payment method is required';
        else delete newErrors.payment_method;
        break;

      default:
        const requiredFields = ['address', 'city', 'state', 'country', 'name_store'];
        if (requiredFields.includes(name)) {
          if (!value) newErrors[name] = `${name.replace('_', ' ')} is required`;
          else delete newErrors[name];
        }
        break;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const newErrors = validateField(name, value);
    setErrors(newErrors);

    // Clear e-wallet phone when payment method changes
    if (name === 'payment_method' && value !== 'ewallet') {
      setFormData(prev => ({ ...prev, phone_number_ewallet: '' }));
      delete newErrors.phone_number_ewallet;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all fields
    let allErrors = {};
    Object.keys(formData).forEach(key => {
      if (key === 'phone_number_ewallet' && formData.payment_method !== 'ewallet') return;
      if (key === 'price') return; // Skip price validation as it's auto-calculated
      
      const fieldErrors = validateField(key, formData[key]);
      allErrors = { ...allErrors, ...fieldErrors };
    });

    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        alert('Registration successful! Please check your email for verification.');
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ name, label, type = 'text', icon: Icon, placeholder, maxLength }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        )}
      </div>
      {errors[name] && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-500 rounded-full">
              <Store className="h-8 w-8 text-white" />
            </div>
          <div/>

          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Tenant Account</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our platform and start managing your business with our comprehensive tenant management system.
          </p>
        </div>

        {/* Package Selection - Only show if no navigation data */}
        {showPackageSelection && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
              <p className="text-gray-600">Select the perfect plan for your business needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    selectedPackage === pkg.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Package Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${pkg.color}`}>
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      {pkg.discount && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          Hemat {pkg.discount}%
                        </span>
                      )}
                    </div>

                    {/* Package Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-green-600">
                          {pkg.price.toLocaleString('id-ID')}K
                        </span>
                        <span className="text-gray-500 text-sm">/bulan</span>
                      </div>
                      {pkg.originalPrice && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-400 line-through text-sm">
                            {pkg.originalPrice.toLocaleString('id-ID')}K
                          </span>
                          <span className="text-green-600 text-sm font-medium">
                            Hemat {pkg.discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => handlePackageSelect(pkg.id)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                          : selectedPackage === pkg.id
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {selectedPackage === pkg.id ? 'Selected' : pkg.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Package Summary - Show if package is selected */}
        {selectedPackage && !showPackageSelection && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">
                    {packages.find(pkg => pkg.id === selectedPackage)?.name} Package Selected
                  </h3>
                  <p className="text-sm text-green-600">
                    Rp {formData.price?.toLocaleString('id-ID')}/month
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
        {/* {(selectedPackage || !showPackageSelection) && ( */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Important: Xendit Account Required</h3>
              <p className="text-sm text-blue-700">
                Before proceeding with registration, please ensure you have an active Xendit account. 
                Xendit is our payment gateway partner that handles all payment processing. 
                <a href="https://xendit.co" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:no-underline ml-1">
                  Create your Xendit account here
                </a> if you don't have one yet.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 text-green-500 mr-2" />
                Personal Information
              </h2>
            </div>

            <InputField
              name="name"
              label="Full Name"
              icon={User}
              placeholder="Enter your full name"
              maxLength={50}
            />

            <InputField
              name="email"
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="Enter your email"
            />

            <InputField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              placeholder="Create a strong password"
              maxLength={50}
            />

            <InputField
              name="phone_number"
              label="Phone Number"
              icon={Phone}
              placeholder="e.g., +6281234567890"
            />

            {/* Address Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                Address Information
              </h2>
            </div>

            <div className="md:col-span-2">
              <InputField
                name="address"
                label="Street Address"
                icon={MapPin}
                placeholder="Enter your complete address"
                maxLength={100}
              />
            </div>

            <InputField
              name="city"
              label="City"
              icon={Building}
              placeholder="Enter your city"
              maxLength={50}
            />

            <InputField
              name="state"
              label="State/Province"
              icon={Building}
              placeholder="Enter your state/province"
              maxLength={50}
            />

            <InputField
              name="country"
              label="Country"
              icon={Building}
              placeholder="Enter your country"
              maxLength={50}
            />

            <InputField
              name="postal_code"
              label="Postal Code"
              icon={MapPin}
              placeholder="e.g., 12345"
              maxLength={5}
            />

            {/* Store Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Store className="h-5 w-5 text-green-500 mr-2" />
                Store Information
              </h2>
            </div>

            <InputField
              name="name_store"
              label="Store Name"
              icon={Store}
              placeholder="Enter your store name"
              maxLength={50}
            />

            <InputField
              name="phone_number_store"
              label="Store Phone Number (Optional)"
              icon={Phone}
              placeholder="e.g., +6281234567890"
            />

            {/* Payment Information */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 text-green-500 mr-2" />
                Payment Information
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.payment_method ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {paymentMethods.map(method => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.payment_method && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.payment_method}</span>
                </div>
              )}
            </div>

            {formData.payment_method === 'ewallet' && (
              <InputField
                name="phone_number_ewallet"
                label="E-Wallet Phone Number"
                icon={Phone}
                placeholder="Phone number linked to your e-wallet"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
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

          {/* Terms */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}