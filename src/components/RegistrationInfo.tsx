'use client';

import { useAppSelector } from '../hooks'

const RegistrationInfo = () => {
  const registrationData = useAppSelector((state) => state.registration.registrationData)
  const isRegistered = useAppSelector((state) => state.registration.isRegistered)
  const successMessage = useAppSelector((state) => state.registration.successMessage)

  if (!isRegistered || !registrationData) {
    return null
  }

  return (
    <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-lg p-6 mt-4">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        Registration Successful!
      </h3>
      
      {successMessage && (
        <p className="text-green-700 mb-4">{successMessage}</p>
      )}
      
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Customer Code:</span>
          <span className="text-gray-900">{registrationData.customerCodee}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Application Number:</span>
          <span className="text-gray-900">{registrationData.applicationNumber}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Full Name:</span>
          <span className="text-gray-900">{registrationData.names}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{registrationData.email}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="text-gray-900">{registrationData.phoneNumber}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Location:</span>
          <span className="text-gray-900">
            {registrationData.village}, {registrationData.sector}, {registrationData.district}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium text-gray-700">Date of Birth:</span>
          <span className="text-gray-900">
            {new Date(registrationData.dateOfBirth).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Please save your Customer Code ({registrationData.customerCodee}) 
          and Application Number ({registrationData.applicationNumber}) for future reference.
        </p>
      </div>
    </div>
  )
}

export default RegistrationInfo 