
'use client';

import React from 'react';
import { useAppSelector } from '../hooks';

interface EducationSummaryProps {
  onNext: () => void; 
}



const EducationSummary:React.FC<EducationSummaryProps> =({ onNext }) => {
    // Get real data from Redux store
    const umusigireData = useAppSelector((state) => state.umusigireForm.beneficiaries[0]);
    const childrenData = useAppSelector((state) => state.childrenForm.child);
    
    // Get real insurance details from Redux store
    const educationFormData = useAppSelector((state) => state.EducationQuotationformdata);
    const educationResults = useAppSelector((state) => state.EducationQuotationResult);

    // Format currency function
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('rw-RW', {
            style: 'currency',
            currency: 'RWF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-8">
            <div className="font-medium text-2xl leading-7 text-center align-middle" style={{ fontFamily: 'Satoshi' }}>
                Your summary !
            </div>

            {/* Clean, User-Friendly Vertical Layout */}
            <div className="space-y-6">
                {/* Insurance Details Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-blue-300">Insurance Details</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(educationFormData.Premium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Year of Birth</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {educationFormData.yearOfBirth || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Contribution Years</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {educationFormData.ContributionYears} years
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Benefit Years</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {educationFormData.BenefitYears} years
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Cycle</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {educationFormData.Cycle || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Premium Frequency</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {educationFormData.PremiumFrequency || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Endowment After Deferred Period</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(educationResults.Endowmentamountafterdeferredperiod)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Endowment During Deferred Period</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(educationResults.Endowmentamountduringdeferredperiod)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Child Information Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-green-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-green-300">Child Information</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">First Name</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{childrenData?.firstName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Middle Name</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{childrenData?.middleName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Last Name</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{childrenData?.lastName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{childrenData?.dateOfBirth || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Gender</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{childrenData?.gender || "Not provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next of Kin (Umusigire) Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-purple-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-purple-300">Next of Kin (Umusigire)</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">First Name</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.firstName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Last Name</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.lastName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Gender</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.gender || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Relationship</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.relationship || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.phoneNumber || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">National ID</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{umusigireData?.nationalId || "Not provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
               <button onClick={onNext}
            type="submit"
            className="px-8 py-3 bg-[#159fdb] text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-lg"
          >
            Continue to Next Step
          </button>
            </div> 
        </div>
    );
};

export default EducationSummary