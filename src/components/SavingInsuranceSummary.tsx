'use client';

import React from 'react';
import { useAppSelector } from '../hooks';

interface SavingInsuranceSummaryProps {
  onNext: () => void; 
}

const SavingInsuranceSummary: React.FC<SavingInsuranceSummaryProps> = ({ onNext }) => {
    // Get next of kin (Umusigire) data from Redux store
    const umusigireData = useAppSelector((state) => state.umusigireForm.beneficiaries[0]);
    
    // Get savings form data from Redux store
    const savingsFormData = useAppSelector((state) => state.SavingQuotationformdata);
    const savingsResults = useAppSelector((state) => state.SavingQuotationResults);

    // Debug logging
    //console.log('Debug - Savings Summary Component - Full savingsFormData:', savingsFormData);
    //console.log('Debug - Savings Summary Component - Full savingsResults:', savingsResults);

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
                Your Savings Insurance Summary !
            </div>

            {/* Clean, User-Friendly Vertical Layout */}
            <div className="space-y-6">
                {/* Personal Information Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Personal Information</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Full Names</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsFormData.Names || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsResults.DateOfBirth || "Not provided"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insurance Details Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Insurance Details</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Monthly Premium (RWF)</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(savingsFormData.Premium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Premium Frequency</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsFormData.PremiumFrequency || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Contribution Years</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsFormData.ContributionYears || 0} years
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Benefit Years</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsFormData.BenefitYears || "Not provided"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Summary Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Covers</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Sum Assured</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(savingsResults.SumAssured)}
                                </span>
                            </div>
                            {/* <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Interest Rate</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {savingsResults.InterestRate}%
                                </span>
                            </div> */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-900 dark:text-gray-900 text-lg">Total Amount at Maturity</span>
                                <span className="font-semibold text-green-600 dark:text-gray-900 text-lg">
                                    {formatCurrency(savingsResults.ValueAcquiredAtMaturity)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coverage Period Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Coverage Period</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Start Date</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsResults.StartDate || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">End Date</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsResults.EndDate || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Term</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {savingsResults.Term} {savingsResults.Term === 1 ? 'year' : 'years'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next of Kin (Umusigire) Section */}
                <div className="  dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Next of Kin (Umusigire)</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">First Name</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.firstName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Last Name</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.lastName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Gender</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.gender || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Relationship</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.relationship || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.phoneNumber || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">National ID</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">{umusigireData?.nationalId || "Not provided"}</span>
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

export default SavingInsuranceSummary;

