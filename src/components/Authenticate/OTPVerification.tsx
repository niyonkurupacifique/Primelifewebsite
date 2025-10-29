'use client';

import { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../../hooks'

interface OTPVerificationProps {
  onVerificationSuccess: () => void
  onBackToLogin: () => void
  userData?: any // Fallback user data if Redux isn't updated yet
}

const OTPVerification = ({ onVerificationSuccess, onBackToLogin, userData }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [resendMessage, setResendMessage] = useState('')
  const [countdown, setCountdown] = useState(0)

  const registrationData = useAppSelector((state) => state.registration.registrationData)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Use Redux data if available, otherwise use passed userData
  const currentData = registrationData || userData

  console.log('OTP Verification - registrationData:', registrationData)
  console.log('OTP Verification - userData prop:', userData)
  console.log('OTP Verification - currentData:', currentData)

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)
    setError('') // Clear error when user types

    // Auto-focus next input
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 7)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 7; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('')

    if (otpCode.length !== 7) {
      setError('Please enter the complete 6-digit verification code')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      
      const response = await fetch('https://apps.prime.rw/customerbackend/User/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: currentData?.phoneNumber || currentData?.username,
          otp: otpCode,
        })
      })

      const responseData = await response.json()

      if (response.ok) {
        // OTP verification successful
        onVerificationSuccess()
      } else {
        setError(responseData.errorMessage || 'Invalid verification code. Please try again.')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (countdown > 0) return

    setIsResending(true)
    setError('')
    setResendMessage('')

    try {
      const username = currentData?.phoneNumber || currentData?.username
      const response = await fetch(`https://apps.prime.rw/customerbackend/User/send-new-password?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setResendMessage(responseData.message || 'Verification code sent successfully!')
        setCountdown(60) // 60 second cooldown
      } else {
        setError(responseData.errorMessage || 'Failed to resend verification code. Please try again.')
      }
    } catch (error) {
      console.error('Resend OTP error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#00B0EF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verify Your Phone Number
        </h2>

        <p className="text-gray-600 mb-2">
          We've sent a 7-digit verification code to
        </p>

        <p className="text-[#00B0EF] font-semibold text-lg">
          {currentData?.phoneNumber || 'your phone number'}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Enter the code below to complete your registration
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Success Message for Resend */}
      {resendMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">{resendMessage}</p>
        </div>
      )}

      {/* OTP Input Fields */}
      <div className="mb-8">
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#00B0EF] focus:outline-none transition-colors"
              disabled={isLoading}
            />

          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.some(digit => !digit)}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${isLoading || otp.some(digit => !digit)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#00B0EF] hover:bg-blue-600 active:bg-blue-700'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            'Verify Code'
          )}
        </button>
      </div>

      {/* Resend Code Section */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">Didn't receive the code?</p>

        <button
          onClick={handleResendOTP}
          disabled={isResending || countdown > 0}
          className={`font-semibold transition-colors ${isResending || countdown > 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#00B0EF] hover:text-blue-600'
            }`}
        >
          {isResending ? (
            <span className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#00B0EF] border-t-transparent rounded-full animate-spin mr-2"></div>
              Sending...
            </span>
          ) : countdown > 0 ? (
            `Resend code in ${countdown}s`
          ) : (
            'Resend verification code'
          )}
        </button>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <button
          onClick={onBackToLogin}
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  )
}

export default OTPVerification 