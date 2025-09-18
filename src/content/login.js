import { useEffect, useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight,
  Store
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutSlice } from '../reducers/get';
import { loginSlice } from '../reducers/post';
import { login } from '../actions/post';
import { 
  Toast,
  ToastPortal,
} from './alert'
import { useDispatch, useSelector } from 'react-redux';

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] =  useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // handle sumbit login
  const { resetLogout } = logoutSlice.actions
  const { resetLogin } = loginSlice.actions
  const {
    successLogin, 
    errorLogin, 
    loadingLogin, 
    errorField,
  } = useSelector((state) => state.loginState)

  useEffect(() => {
    if (Object.keys(errorField).length > 0) {
      const mergedErrors = errorField.reduce((acc, curr) => {
          return { ...acc, ...curr };
      }, {});

      setErrors(prev => ({
          ...prev,
          ...mergedErrors
      }));
    }
  }, [errorField])

  useEffect(() => {
    if (successLogin) {
      setFormData({
        email: '',
        password: '',
      })
      setErrors({})
      dispatch(resetLogin())
      dispatch(resetLogout())
      navigate('/store')
    }
  }, [successLogin])

  useEffect(() => { 
    if (errorLogin) {
      setToast({
        type: 'error',
        message: errorLogin
      })

      const timer = setTimeout(() => {
        dispatch(resetLogin())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorLogin])

  const validateField = (name, value) => {
    const newErrors = {};

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        }
        break;

      default:
        break;
    }

    return newErrors;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  // handle login
  const handleLogin = () => {
    // Validate all fields
    let allErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key]);
      allErrors = { ...allErrors, ...fieldErrors };
    });

    // Cek apakah ada error
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setErrors({})
    dispatch(login(formData));
  };


  const handleSignup = () => {
    navigate('/signup')
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
          <ToastPortal> 
              <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
              <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => { 
                setToast(null)
                dispatch(resetLogin())
              }} 
              duration={3000}
              />
              </div>
          </ToastPortal>
      )}

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src='/image/logo_nusas_1.png' alt="logo" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to your Nusas account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{errors.general}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
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
                    (errors.email || errors?.Email) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              {(errors.email || errors?.Email) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email || errors?.Email}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    (errors.password || errors?.Password) ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
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
              {(errors.password || errors?.Password) && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password || errors?.Password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-500 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                onClick={() => navigate('/forgot/password')}
                className="text-sm text-green-600 hover:text-green-500 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={() => handleLogin()}
              disabled={loadingLogin}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingLogin ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          {/* Sign Up Link */}
          <div className="text-center mb-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={handleSignup}
                className="text-green-600 hover:text-green-500 font-medium transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{' '}
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