'use client';

import { useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../../hooks'
import { loginSuccess, setLoading, setError } from '../Reducers/LogInResultsReducers'

const LoginForm = ({
  onLoginSuccess,
  onBackToChoice
}: {
  onLoginSuccess: () => void,
  onBackToChoice: () => void
}) => {
  const dispatch = useAppDispatch()
  
  const [formData, setFormData] = useState({
    phone: '',
    otpCode: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const [errors, setErrors] = useState({
    phone: '',
    otpCode: '',
    api: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validatePhone = () => {
    if (!formData.phone) {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }))
      return false
    }
    if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }))
      return false
    }
    setErrors(prev => ({ ...prev, phone: '' }))
    return true
  }

  const validateForm = () => {
    const newErrors = {
      phone: '',
      otpCode: '',
      api: ''
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.otpCode) {
      newErrors.otpCode = 'OTP code is required'
    } else if (formData.otpCode.length < 4) {
      newErrors.otpCode = 'OTP code must be at least 4 digits'
    }

    setErrors(newErrors)
    return !newErrors.phone && !newErrors.otpCode
  }

  const sendOtpCode = async () => {
    if (!validatePhone()) return

    setIsSendingOtp(true)
    setErrors(prev => ({ ...prev, api: '' }))

    try {
      const response = await axios.post(
        `https://apps.prime.rw/customerbackend/User/send-new-password?username=${formData.phone}`
      )

      if (response.data?.message === "Verification Code generated and sent") {
        setOtpSent(true)
        setErrors(prev => ({ ...prev, api: '' }))
        // Optional: Show success message
      }
    } catch (error: any) {
      if (error.response?.data?.errorMessage) {
        setErrors(prev => ({ ...prev, api: error.response.data.errorMessage }))
      } else {
        setErrors(prev => ({ ...prev, api: 'Failed to send OTP. Please try again.' }))
      }
      setOtpSent(false)
    } finally {
      setIsSendingOtp(false)
    }
  }

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    // Set loading state in Redux
    dispatch(setLoading(true))
    dispatch(setError(null))
    setIsLoading(true)
    setErrors(prev => ({ ...prev, api: '' }))

    try {
      const response = await axios.post(
        'https://apps.prime.rw/customerbackend/User/api/Authenticate',
        {
          userName: formData.phone,
          password: formData.otpCode
        }
      )

      //console.log("response data",response)

      if (response.data?.token && response.data?.successMessage) {
        // Check age restriction before allowing login
        const userAge = calculateAge(response.data.dateOfBirth)
        
        if (userAge >= 62) {
          // User is 62 or older, deny access
          const errorMessage = 'Access denied. Users aged 62 and above are not allowed to access this system.'
          dispatch(setError(errorMessage))
          setErrors(prev => ({ ...prev, api: errorMessage }))
          return
        }

        // Prepare user data for Redux
        const userData = {
          id: response.data.id,
          userName: response.data.userName,
          names: response.data.names,
          email: response.data.email,
          nationalId: response.data.nationalId,
          dateOfBirth: response.data.dateOfBirth,
          customerCode:response.data.customerCode
        }

        // Store in Redux
        dispatch(loginSuccess({
          token: response.data.token,
          userData: userData
        }))

        // Optional: Still store in localStorage as backup
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('userData', JSON.stringify(userData))

        // Call success callback
        onLoginSuccess()
      }
    } catch (error: any) {
      let errorMessage = 'Login failed. Please check your credentials and try again.'
      
      if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage
      }
      
      // Set error in Redux
      dispatch(setError(errorMessage))
      
      // Also set local error state
      setErrors(prev => ({ ...prev, api: errorMessage }))
    } finally {
      // Loading handled by Redux and local state
      dispatch(setLoading(false))
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-[#00B0EF] font-semibold text-gray-900 mb-2">
          Authenticate
        </h2>
        <p className="text-gray-600">
          Sign in to your Prime Life Insurance account
        </p>
      </div>

      {/* Login Form */}
      <div className="space-y-6">
        {/* Phone Field */}
        <div>
          <div className="flex items-center gap-4">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">
              Phone:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={otpSent}
              className={`flex-1  md:px-4 py-2 border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                errors.phone
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-[#00B0EF] hover:border-gray-300'
              } ${otpSent ? 'bg-gray-100' : ''}`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 ml-28 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Send OTP Button */}
        {!otpSent && (
          <button
            type="button"
            onClick={sendOtpCode}
            disabled={isSendingOtp || !formData.phone}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              isSendingOtp || !formData.phone
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
            }`}
          >
            {isSendingOtp ? (
              <div className="flex items-center justify-center">
                <div className="w-5  h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending OTP...
              </div>
            ) : (
              'Send OTP Code'
            )}
          </button>
        )}

        {/* Success message when OTP is sent */}
        {otpSent && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  OTP code has been sent to your phone number
                </p>
              </div>
            </div>
          </div>
        )}

        {/* API Error message */}
        {errors.api && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.api}</p>
              </div>
            </div>
          </div>
        )}

        {/* OTP Code Field - Only show after OTP is sent */}
        {otpSent && (
          <div>
            <div className="flex items-center gap-4">
              <label htmlFor="otpCode" className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">
                OTP Code:
              </label>
              <input
                id="otpCode"
                name="otpCode"
                type="text"
                value={formData.otpCode}
                onChange={handleInputChange}
                className={`flex-1 md:px-4 py-2 border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                  errors.otpCode
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-[#00B0EF] hover:border-gray-300'
                }`}
                placeholder="Enter your OTP code"
              />
            </div>
            {errors.otpCode && (
              <p className="mt-1 ml-28 text-sm text-red-600">{errors.otpCode}</p>
            )}
          </div>
        )}

        {/* Submit Button - Only show after OTP is sent */}
        {otpSent && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#00B0EF] hover:bg-blue-600 active:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        )}

        {/* Resend OTP option */}
        {otpSent && (
          <button
            type="button"
            onClick={() => {
              setOtpSent(false)
              setFormData(prev => ({ ...prev, otpCode: '' }))
              setErrors(prev => ({ ...prev, otpCode: '', api: '' }))
            }}
            className="w-full py-2 px-4 text-sm text-[#00B0EF] hover:text-blue-700 font-medium transition-colors"
          >
            Didn't receive code? Send again
          </button>
        )}

        {/* Back Button */}
        <button
          type="button"
          onClick={onBackToChoice}
          className="w-full py-3 px-4 border border-slate-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Back to Account Selection
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onBackToChoice}
            className="text-[#00B0EF] hover:text-blue-700 font-medium transition-colors"
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
