
"use client"
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { loginSuccess } from '../Reducers/LogInResultsReducers'
import LoginForm from './Login'
import SignupForm from './Register'
import OTPVerification from './OTPVerification'


type AuthenticateSubStep = 'choose' | 'login' | 'register' | 'otpVerification'

const AuthenticateChoice = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
    const [subStep, setSubStep] = useState<AuthenticateSubStep>('choose')
    const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false)
    const [currentUserData, setCurrentUserData] = useState<any>(null)
    const hasAccount = useAppSelector((item) => item.AuthenticationChoice.hasAccount)
    const registrationData = useAppSelector((state) => state.registration.registrationData)
    const dispatch = useAppDispatch()

    // Debug: log current substep
    console.log('AuthenticateChoice - Current subStep:', subStep)


    const handleAccountSelection = (value: boolean) => {
        // Clear registration success message when switching
        setShowRegistrationSuccess(false)
        setCurrentUserData(null)
        
        if (value) {
            setSubStep('login') // Step 1.1
        } else {
            setSubStep('register') // Step 1.2
        }
    }

    const handleLoginSuccess = () => {
        onAuthenticated() // Move to Step 2 only for login
    }

    const handleRegisterSuccess = (userData?: any) => {
        // If registration was successful and we have user data
        if (userData) {
            console.log('Registration successful, redirecting to OTP verification:', userData)
            
            // Store user data locally as fallback
            setCurrentUserData(userData)
            
            // Redirect to OTP verification step
            console.log('Setting subStep to otpVerification')
            setSubStep('otpVerification')
        } else {
            console.log('handleRegisterSuccess called but no userData provided')
        }
    }

    const handleOTPVerificationSuccess = () => {
        console.log('OTP verification successful, showing login with success message')
        
        // Show success message and redirect to login
        setShowRegistrationSuccess(true)
        setSubStep('login')
    }

    const handleBackToLogin = () => {
        setSubStep('login')
        setShowRegistrationSuccess(false)
    }

    return (
        <div className="max-w-2xl mx-auto text-center">
            {subStep === 'choose' && (
                <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Hey, It's Prime Life Insurance!
                    </h2>
                    <p className="text-lg text-gray-700 mb-2">Do you have an account on Prime Life Insurance?</p>

                    <div className="text-gray-600 mb-12 space-y-1">
                        <p>Secure your education for tomorrow, today. With Prime Life Insurance,</p>
                        <p>your education is now possible!</p>
                    </div>

                    <div className="space-y-4 mb-12">
                        <label className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50">
                            <input
                                type="radio"
                                name="account"
                                onChange={() => handleAccountSelection(true)}
                                className="w-5 h-5 text-blue-600 mr-4"
                            />
                            <span className="text-lg text-gray-700">Yes, I have an account</span>
                        </label>

                        <label className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="account"
                                checked={hasAccount === false}
                                onChange={() => handleAccountSelection(false)}
                                className="w-5 h-5 text-gray-600 mr-4"
                            />
                            <span className="text-lg text-gray-700">No, I don't have an account</span>
                        </label>
                    </div>
                </>
            )}

            {subStep === 'register' && (
                <SignupForm
                    onSignupSuccess={handleRegisterSuccess}
                    onBackToChoice={() => setSubStep('choose')}
                />
            )}

            {subStep === 'otpVerification' && (
                <OTPVerification
                    onVerificationSuccess={handleOTPVerificationSuccess}
                    onBackToLogin={handleBackToLogin}
                    userData={currentUserData}
                />
            )}

            {subStep === 'login' && (
                <>
                    {/* Show registration success message */}
                    {showRegistrationSuccess && registrationData && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 className="text-lg font-semibold text-green-800">
                                    Phone Number Verified!
                                </h3>
                            </div>
                            <p className="text-green-700 mb-2">
                                Great! <strong>{registrationData.names}</strong>, your phone number has been verified successfully.
                            </p>
                            <p className="text-sm text-green-600">
                                Customer Code: <strong>{registrationData.customerCodee}</strong> | 
                                Application Number: <strong>{registrationData.applicationNumber}</strong>
                            </p>
                            <p className="text-sm text-green-700 mt-2">
                                Please login below using your phone number and password.
                            </p>
                        </div>
                    )}
                    
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onBackToChoice={() => {
                            setSubStep('choose')
                            setShowRegistrationSuccess(false)
                        }}
                    />
                </>
            )}
        </div>
    )
}

export default AuthenticateChoice





