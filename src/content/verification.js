import { useEffect, useState } from 'react';
import { 
  Shield, 
  Mail, 
  AlertCircle,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toast,
  ToastPortal,
} from './alert'
import {
  registerVerificationSlice
} from '../reducers/patch'
import {
  registerVerification
} from '../actions/patch'
import { useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';

export default function VerificationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const {resetRegisterVerification} = registerVerificationSlice.actions
  const {
    successRegisterVerification,
    errorRegisterVerification, 
    errorFieldsRegisterVerification,
    loadingRegisterVerification
  } = useSelector((state) => state.persisted.registerVerification)

  useEffect(() => {
    if (successRegisterVerification) {
      navigate('/invoice/signup');
      dispatch(resetRegisterVerification())
    }
  }, [successRegisterVerification])
 
  useEffect(() => {
    setIsVerifying(loadingRegisterVerification)
  }, [loadingRegisterVerification])

  useEffect(() => {
    if (errorRegisterVerification) {
      setToast({
        type: 'error',
        message: errorRegisterVerification
      })
      dispatch(resetRegisterVerification())
    }
  }, [errorRegisterVerification])

  useEffect(() => {
    if (errorFieldsRegisterVerification) {
      setError(errorFieldsRegisterVerification?.code)
      dispatch(resetRegisterVerification())
    }
  }, [errorFieldsRegisterVerification])

  const handleCodeChange = (e) => {
    dispatch(resetRegisterVerification())

    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
      if (value.length <= 8) {
        setCode(value);
        setError('');
      }
    };

  const handleVerify = () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    if (code.length !== 8) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    dispatch(registerVerification({code: code}))
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
                  dispatch(resetRegisterVerification())
                }} 
                duration={3000}
                />
                </div>
            </ToastPortal>
        )}

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src='/image/logo_nusas_1.png' className='w-20 h-20'/>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
          <p className="text-gray-600 mb-2">
            We've sent a 8-digit verification code to your email address
          </p>
          <p className="text-sm text-green-600 font-medium">
            nusas.id
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <div className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="00000000"
                  maxLength={8}
                  className={`block w-full px-4 py-4 text-center text-2xl font-mono tracking-widest border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {code.length > 0 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-sm text-gray-500">
                      {code.length}/8
                    </span>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="mt-2 flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || code.length !== 8}
              className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Verify Account
                </>
              )}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-800 font-medium mb-1">Having trouble?</p>
              <p className="text-blue-700">
                Check your spam folder or contact our support team if you don't receive the verification code within 5 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This verification code will expire in 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
}