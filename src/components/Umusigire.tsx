'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setNationalId,
  setFirstName,
  setMiddleName,
  setLastName,
  setDateOfBirth,
  setGender,
  setRelationship,
  setPhoneNumber,
  setFormData,
  resetFormData,
  type UmusigireFormData
} from './Reducers/UmusigireFormFieldsReducer';
import { searchSubscriber, getGenderFromNationalId, formatDateForInput } from '../services/nidaApi';

interface UmusigireProps {
  title?: string;
  onSubmit?: (data: UmusigireFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<UmusigireFormData>;
}

const Umusigire: React.FC<UmusigireProps> = ({ 
  title = "Umusigire (Beneficiary) Information",
  onSubmit,
  onCancel,
  initialData
}) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.umusigireForm.currentForm);
  const [errors, setErrors] = useState<Partial<UmusigireFormData>>({});
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Initialize form with initial data if provided
  React.useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          dispatch(setFormData({ [key]: value }));
        }
      });
    }
  }, [initialData, dispatch]);

  const handleInputChange = (field: keyof UmusigireFormData, value: string) => {
    dispatch(setFormData({ [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UmusigireFormData> = {};

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Relationship is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleReset = () => {
    dispatch(resetFormData());
    setErrors({});
  };

  // NIDA API verification function
  const validateNationalId = async (nationalId: string) => {
    if (nationalId.length !== 16) return;
    
    setIsVerifying(true);
    try {
      const result = await searchSubscriber(nationalId);
      
             if (result) {
         // Auto-fill form fields with NIDA data
         dispatch(setFormData({
           firstName: result.foreName,
           lastName: result.surnames,
           dateOfBirth: formatDateForInput(result.dateofbirth),
           gender: getGenderFromNationalId(nationalId)
         }));
        
        // Clear any existing errors
        setErrors(prev => ({ ...prev, nationalId: '' }));
      } else {
        setErrors(prev => ({ ...prev, nationalId: 'Unable to verify National ID. Please check and try again.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, nationalId: 'Error verifying National ID. Please try again.' }));
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-verify National ID when it reaches 16 digits
  useEffect(() => {
    if (formData.nationalId.length === 16) {
      validateNationalId(formData.nationalId);
    }
  }, [formData.nationalId]);

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="rounded-lg shadow-sm border border-[#EBEDF0] p-6">
        <h2 className="text-xl font-semibold text-[#003366] mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* National ID */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                National ID *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange('nationalId', e.target.value)}
                  placeholder="Enter 16-digit national ID"
                  maxLength={16}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 ${
                    errors.nationalId ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {isVerifying && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
                {formData.nationalId.length === 16 && !isVerifying && !errors.nationalId && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.nationalId && (
                <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>
              )}
              {formData.nationalId.length > 0 && formData.nationalId.length < 16 && (
                <p className="text-blue-600 text-xs mt-1">
                  Enter {16 - formData.nationalId.length} more digits to auto-verify
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+250 788 888 888"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Names Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Names (First Name) *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.firstName ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Other Names (Middle Name)
              </label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                placeholder="Enter middle name"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Last Name (Surname) *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.lastName ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.dateOfBirth ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.gender ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Relationship *
              </label>
              <select
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.relationship ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">Select Relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Children">Child</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Sister">Sister</option>
                <option value="Brother">Brother</option>
                <option value="Others">Others</option>
              </select>
              {errors.relationship && (
                <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Reset
            </button>
            
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              className="px-6 py-2 bg-[#00B0EF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            >
              Save Next of Kin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Umusigire; 