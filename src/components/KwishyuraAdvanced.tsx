'use client';

import React, { useState } from 'react';
import { FaArrowRight, FaMobileAlt, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

interface KwishyuraAdvancedProps {
  onProceed: (phoneNumber: string) => void;
  insuranceType?: string;
  amount?: number;
  currency?: string;
  customerName?: string;
  policyNumber?: string;
}

const KwishyuraAdvanced: React.FC<KwishyuraAdvancedProps> = ({
  onProceed,
  insuranceType = "Nkunganire-Inganzo-3000 Educational Insurance",
  amount = 3000,
  currency = "RF",
  customerName = "Customer",
  policyNumber = "POL-2024-001"
}) => {
  const [phoneNumber, setPhoneNumber] = useState("+250 780 000 000");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Basic validation for Rwandan phone numbers
    const rwandaPhoneRegex = /^\+250\s?[789]\d{7}$/;
    return rwandaPhoneRegex.test(phone);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValidPhone(validatePhoneNumber(value) || value === "");
  };

  const handleProceed = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setIsValidPhone(false);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onProceed(phoneNumber);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaShieldAlt className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Pay subscription
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            You're one the last step, pay with MTN Mobile Mobile to activate your{' '}
            <span className="font-bold text-blue-600">{insuranceType}</span>, starting from today!
          </p>
        </div>

        {/* Policy Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-blue-600 text-sm font-medium">
              Policy Details
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {policyNumber}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Customer</span>
              <span className="font-medium text-gray-900">{customerName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Insurance Type</span>
              <span className="font-medium text-gray-900 text-sm text-right max-w-xs">
                {insuranceType}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Premium Amount</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaMobileAlt className="text-blue-600" />
              <span className="text-gray-700 font-medium">Pay with MTN MoMo</span>
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Your MoMo number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                    isValidPhone 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="+250 780 000 000"
                />
                
                {/* MTN MoMo Logo */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div 
                    className="flex items-center space-x-2 px-3 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: '#ffcb05' }}
                  >
                    <FaMobileAlt className="text-blue-600 text-sm" />
                    <span className="text-blue-600 text-xs font-bold">MTN MoMo</span>
                  </div>
                </div>
              </div>
              
              {!isValidPhone && phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid Rwandan phone number (+250 7XXXXXXXX)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Secure Payment</p>
              <p className="text-blue-700">Your payment information is encrypted and secure with MTN MoMo.</p>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!isValidPhone || isProcessing}
          className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
            isValidPhone && !isProcessing
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Proceed to Payment</span>
              <FaArrowRight className="text-white" />
            </>
          )}
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Powered by MTN Mobile Money</p>
          <p>Prime Life Insurance Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default KwishyuraAdvanced;
