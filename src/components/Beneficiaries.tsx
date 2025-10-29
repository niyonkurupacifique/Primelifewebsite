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
  addBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  loadBeneficiaryForEdit,
  setEditingIndex,
  setNumberOfBeneficiaries,
  type BeneficiaryFormData
} from './Reducers/BeneficiariesReducer';
import { searchSubscriber, getGenderFromNationalId, formatDateForInput } from '../services/nidaApi';

interface BeneficiariesProps {
  title?: string;
  onSubmit?: (data: BeneficiaryFormData[]) => void;
  onCancel?: () => void;
  onNext?: () => void;
  initialData?: Partial<BeneficiaryFormData>[];
}

const Beneficiaries: React.FC<BeneficiariesProps> = ({ 
  title = "Beneficiaries Information",
  onSubmit,
  onCancel,
  onNext,
  initialData
}) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.beneficiariesForm.currentForm);
  const beneficiaries = useAppSelector((state) => state.beneficiariesForm.beneficiaries);
  const editingIndex = useAppSelector((state) => state.beneficiariesForm.editingIndex);
  const numberOfBeneficiaries = useAppSelector((state) => state.beneficiariesForm.numberOfBeneficiaries);
  
  const [errors, setErrors] = useState<Partial<BeneficiaryFormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Initialize form with initial data if provided
  React.useEffect(() => {
    if (initialData && initialData.length > 0) {
      initialData.forEach((data) => {
        if (data) {
          dispatch(addBeneficiary(data as BeneficiaryFormData));
        }
      });
    }
  }, [initialData, dispatch]);

  const handleInputChange = (field: keyof BeneficiaryFormData, value: string) => {
    dispatch(setFormData({ [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear success message when user starts editing
    if (successMessage) {
      setSuccessMessage('');
    }
    
    // If we're editing and the user changes something, we're no longer in edit mode
    if (isEditing) {
      setIsEditing(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BeneficiaryFormData> = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (editingIndex !== null && isEditing) {
        // Update existing beneficiary
        dispatch(updateBeneficiary({ index: editingIndex, data: formData }));
        setSuccessMessage('Beneficiary information updated successfully!');
        setIsEditing(false);
        dispatch(setEditingIndex(null));
        // Reset form after successful update
        dispatch(resetFormData());
      } else {
        // Add new beneficiary
        dispatch(addBeneficiary(formData));
        setSuccessMessage('Beneficiary information added successfully!');
        // Reset form after successful save
        dispatch(resetFormData());
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      onSubmit?.(beneficiaries);
    }
  };

  const handleReset = () => {
    dispatch(resetFormData());
    setErrors({});
    setSuccessMessage('');
    setIsEditing(false);
    dispatch(setEditingIndex(null));
  };

  const handleRemoveBeneficiary = (index: number) => {
    dispatch(deleteBeneficiary(index));
    setSuccessMessage('Beneficiary removed successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleEditBeneficiary = (index: number) => {
    dispatch(loadBeneficiaryForEdit(index));
    setIsEditing(true);
    setSuccessMessage('');
  };

  const handleNext = () => {
    if (beneficiaries.length > 0) {
      onNext?.();
    } else if (validateForm()) {
      dispatch(addBeneficiary(formData));
      onNext?.();
    }
  };

  const handleNumberOfBeneficiariesChange = (value: number) => {
    dispatch(setNumberOfBeneficiaries(value));
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
        
        setSuccessMessage('National ID verified successfully! Personal information auto-filled.');
        setTimeout(() => setSuccessMessage(''), 3000);
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
    <div className="max-w-6xl mx-auto">
      <div className="rounded-lg shadow-sm border border-[#EBEDF0] p-6">
        <h2 className="text-xl font-semibold text-[#003366] mb-6">{title}</h2>
        
        {/* Success message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 text-sm font-medium">{successMessage}</p>
            </div>
          </div>
        )}

       

        {/* Information message */}
        {beneficiaries.length === 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-6 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Please add beneficiaries or click continue if you have none.
              </p>
            </div>
          </div>
        )}
        
        {/* Show existing beneficiaries if available */}
        {beneficiaries.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-[#003366] mb-3">Added Beneficiaries</h3>
            <div className="space-y-3">
              {beneficiaries.map((beneficiary, index) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Full Name:</span>
                          <p className="text-gray-600">
                            {beneficiary.firstName} {beneficiary.middleName && `${beneficiary.middleName} `}{beneficiary.lastName}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">National ID:</span>
                          <p className="text-gray-600">{beneficiary.nationalId}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Relationship:</span>
                          <p className="text-gray-600">{beneficiary.relationship}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date of Birth:</span>
                          <p className="text-gray-600">{beneficiary.dateOfBirth}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Gender:</span>
                          <p className="text-gray-600">{beneficiary.gender}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <p className="text-gray-600">{beneficiary.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditBeneficiary(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveBeneficiary(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ready to continue message */}
        {beneficiaries.length > 0 && onNext && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 text-sm">
                <strong>Ready to continue!</strong> Beneficiaries have been added. You can now proceed to the next step.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        {beneficiaries.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> {isEditing ? 'You are currently editing a beneficiary. Click "Update Beneficiary" to save your changes.' : 'Fill out the form below to add another beneficiary.'}
            </p>
          </div>
        )}
        
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

          {/* Names Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                First Name *
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
                Middle Name
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
                Last Name *
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

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-[#003366] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            {isEditing ? (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Cancel Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Reset
              </button>
            )}
            
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
              {isEditing ? 'Update Beneficiary' : 'Add Beneficiary'}
            </button>

            {/* Show Continue button if onNext is provided */}
            {onNext && (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-[#159fdb] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-lg"
            >
              Continue to Next Step
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Beneficiaries;
