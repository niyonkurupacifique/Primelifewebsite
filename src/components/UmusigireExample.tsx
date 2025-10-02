'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Umusigire from './Umusigire';
import {
  type UmusigireFormData,
  addBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  setEditingIndex,
  clearBeneficiaries
} from './Reducers/UmusigireFormFieldsReducer';


type UmusigireExampleProps = {
  HandleNextSteps: () => void;
};



const UmusigireExample: React.FC<UmusigireExampleProps> = ({ HandleNextSteps }) => {
  const dispatch = useAppDispatch();
  const { beneficiaries, editingIndex } = useAppSelector((state) => state.umusigireForm);
  const [showForm, setShowForm] = useState(false);

  const handleContinue=()=>{
    HandleNextSteps()
  }

  const handleSubmit = (data: UmusigireFormData) => {
    if (editingIndex !== null) {
      // Update existing beneficiary
      dispatch(updateBeneficiary({ index: editingIndex, data }));
    } else {
      // Add new beneficiary
      dispatch(addBeneficiary(data));
    }
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    dispatch(setEditingIndex(index));
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    dispatch(deleteBeneficiary(index));
  };

  const handleCancel = () => {
    setShowForm(false);
    dispatch(setEditingIndex(null));
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#003366] mb-2">
            Next of Kin Management(Umusigire)
          </h1>
          <p className="text-gray-600">
            Manage your insurance Next of Kin (Umusigire)
          </p>
        </div>

        {!showForm ? (
          <div>
            {/* Add New Beneficiary Button */}
            <div className="mb-6 flex  justify-center space-x-4 items-center">
              <button
                onClick={() => setShowForm(true)}
              className={` ${beneficiaries.length > 0 ? 'hidden':''}  px-6 py-3 bg-[#00B0EF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium`}
              >
                + Add Next Of Kin
              </button>

              {beneficiaries.length > 0 && (
                <button
                  onClick={() => dispatch(clearBeneficiaries())}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Beneficiaries List */}
            {beneficiaries.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                {/* <h3 className="text-lg font-medium text-gray-900 mb-2">No Beneficiaries Added</h3>
              <p className="text-gray-500 mb-4">Start by adding your first beneficiary</p> */}
                {/* <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[#00B0EF] text-white rounded-md hover:bg-blue-600"
              >
                Add Beneficiary
              </button> */}
              </div>
            ) : (
              <div className=" rounded-lg shadow-sm border border-[#EBEDF0] overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-[#003366]">
                    Next of Kin ({beneficiaries.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          National ID
                        </th>
                        <th className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Names (First Name)
                        </th>
                        <th className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Other Names (Middle Name)
                        </th>
                        <th className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Name (Surname)
                        </th>
                        <th className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date of Birth
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Relationship
                        </th>
                        <th className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {beneficiaries.map((beneficiary, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.nationalId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.firstName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.middleName || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.dateOfBirth ? new Date(beneficiary.dateOfBirth).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.gender}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.relationship}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.phoneNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(index)}
                                className="text-[#00B0EF] hover:text-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Umusigire
            title={editingIndex !== null ? "Edit Next of Kin(Umusigire)" : "Add New Next of Kin(Umusigite)"}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingIndex !== null ? beneficiaries[editingIndex] : undefined}
          />
        )}
      </div>
      {
        beneficiaries.length > 0 && (

          <button onClick={handleContinue}
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-lg"
          >
            Continue to Next Step
          </button>

        )
      }

    </div>
  );
};

export default UmusigireExample; 