'use client';

import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { 
  setRegistrationLoading, 
  setRegistrationError, 
  registrationSuccess,
  clearRegistrationError 
} from '../Reducers/RegistrationReducer'

const SignupForm = ({ onSignupSuccess, onBackToChoice }: { 
  onSignupSuccess: (userData?: any) => void,
       onBackToChoice: () => void 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    nationalId: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    nationalId: '',
    general: ''
  })

  const dispatch = useAppDispatch()

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
        [name]: '',
        general: '' // Clear general error too
      }))
      // Also clear Redux registration error
      dispatch(clearRegistrationError())
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      phoneNumber: '',
      nationalId: '',
      general: ''
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone number validation (Rwanda format)
    if (!formData.phoneNumber) {
        
    //   newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^(\+250|250|0)?[7][0-9]{8}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Rwandan phone number'
    }

    // National ID validation (Rwanda format - 16 digits)
    if (!formData.nationalId) {
      newErrors.nationalId = 'National ID is required'
    } else if (!/^\d{16}$/.test(formData.nationalId)) {
      newErrors.nationalId = 'National ID must be exactly 16 digits'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    dispatch(setRegistrationLoading(true))
    
    try {
      // Prepare API request body
      const requestBody = {
        email: formData.email,
        username: formData.phoneNumber,
        nationalId: formData.nationalId
      }

      const response = await fetch('https://apps.prime.rw/customerbackend/User/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const responseData = await response.json()

      if (response.ok) {
        // Registration successful - store in Redux
        dispatch(registrationSuccess({
          data: responseData,
          successMessage: responseData.successMessage || 'Registration successful!'
        }))

        console.log('Registration successful:', responseData)
        onSignupSuccess(responseData)
      } else if (response.status === 409) {
        // National ID already in use
        const errorMessage = responseData.errorMessage || 'National ID already in use. Please contact our support at 1320 for assistance.'
        setErrors(prev => ({
          ...prev,
          general: errorMessage
        }))
        dispatch(setRegistrationError(errorMessage))
      } else {
        // Other errors
        const errorMessage = responseData.errorMessage || 'Registration failed. Please try again.'
        setErrors(prev => ({
          ...prev,
          general: errorMessage
        }))
        dispatch(setRegistrationError(errorMessage))
      }
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = 'Network error. Please check your connection and try again.'
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }))
      dispatch(setRegistrationError(errorMessage))
    } finally {
      setIsLoading(false)
      dispatch(setRegistrationLoading(false))
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-[#00B0EF] font-semibold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-gray-600">
          Join Prime Life Insurance and secure your future
        </p>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.general}</p>
          {errors.general.includes('1320') && (
            <p className="text-sm text-red-500 mt-2 font-medium">
              Support Hotline: 1320
            </p>
          )}
        </div>
      )}

      {/* Signup Form */}
      <div className="space-y-6">
        {/* Email and Phone Number - Same Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3  border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-[#00B0EF] hover:border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3  border  border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                errors.phoneNumber 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-[#00B0EF] hover:border-gray-300'
              }`}
              placeholder="e.g., +250 7XX XXX XXX"
              disabled={isLoading}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* National ID Field - Full Width */}
        <div>
          <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-2">
            National ID
          </label>
          <input
            id="nationalId"
            name="nationalId"
            type="text"
            value={formData.nationalId}
            onChange={handleInputChange}
            maxLength={16}
            className={`w-full px-4 py-3  border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
              errors.nationalId 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-[#00B0EF] hover:border-gray-300'
            }`}
            placeholder="Enter your 16-digit National ID"
            disabled={isLoading}
          />
          {errors.nationalId && (
            <p className="mt-1 text-sm text-red-600">{errors.nationalId}</p>
          )}
        </div>

        {/* Submit Button */}
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
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBackToChoice}
          className="w-full py-3 px-4  border  border-slate-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Back to Account Selection
        </button>
      </div>

      {/* Sign In Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onBackToChoice}
            className="text-[#00B0EF] hover:text-blue-700 font-medium transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignupForm