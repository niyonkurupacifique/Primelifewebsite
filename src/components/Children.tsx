'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setFirstName,
  setMiddleName,
  setLastName,
  setDateOfBirth,
  setGender,
  setFormData,
  resetFormData,
  setChild,
  updateChild,
  removeChild,
  type ChildrenFormData
} from './Reducers/ChildrenFormFieldsReducer';

interface ChildrenProps {
  title?: string;
  onSubmit?: (data: ChildrenFormData) => void;
  onCancel?: () => void;
  onNext?: () => void;
  initialData?: Partial<ChildrenFormData>;
}

const Children: React.FC<ChildrenProps> = ({ 
  title = "Child Information",
  onSubmit,
  onCancel,
  onNext,
  initialData
}) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.childrenForm.currentForm);
  const existingChild = useAppSelector((state) => state.childrenForm.child);
  const [errors, setErrors] = useState<Partial<ChildrenFormData>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleInputChange = (field: keyof ChildrenFormData, value: string) => {
    dispatch(setFormData({ [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ChildrenFormData> = {};

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



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (existingChild && isEditing) {
        // Update existing child
        dispatch(updateChild(formData));
        setIsEditing(false);
        // Reset form after successful update
        dispatch(resetFormData());
      } else {
        // Save new child
        dispatch(setChild(formData));
        // Reset form after successful save
        dispatch(resetFormData());
      }
      onSubmit?.(formData);
    }
  };

  const handleReset = () => {
    dispatch(resetFormData());
    setErrors({});
    setIsEditing(false);
  };

  const handleRemoveChild = () => {
    dispatch(removeChild());
    setIsEditing(false);
  };

  const handleEditChild = () => {
    if (existingChild) {
      // Populate the form with existing child data for editing
      dispatch(setFormData(existingChild));
      setIsEditing(true);
    }
  };

  const handleNext = () => {
    if (existingChild) {
      onNext?.();
    } else if (validateForm()) {
      dispatch(setChild(formData));
      onNext?.();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg shadow-sm border border-[#EBEDF0] p-6">
        <h2 className="text-xl font-semibold text-[#003366] mb-6">{title}</h2>
        
        {/* Show existing child if available */}
        {existingChild && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-[#003366] mb-3">Current Child Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Full Name:</span>
                    <p className="text-gray-600">
                      {existingChild.firstName} {existingChild.middleName && `${existingChild.middleName} `}{existingChild.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date of Birth:</span>
                    <p className="text-gray-600">{existingChild.dateOfBirth}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Gender:</span>
                    <p className="text-gray-600">{existingChild.gender}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleEditChild}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit Child
                </button>
                <button
                  type="button"
                  onClick={handleRemoveChild}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove Child
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
        
          <div className={`${existingChild && !isEditing ? 'hidden' : 'visible'}  grid grid-cols-1 md:grid-cols-2 gap-6`}>
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
          </div>

          {/* Names Section */}
          <div className={`${existingChild && !isEditing ? 'hidden' : 'visible'} grid grid-cols-1 md:grid-cols-3 gap-6`}>
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

      

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-6 border-t border-gray-200">

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
              {isEditing ? 'Update Child' : 'Save Child'}
            </button>

            {onNext && (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
              >
                Next Step
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Children;
