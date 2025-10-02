'use client';

import React from 'react';
import { useAppSelector } from '../hooks';

interface FamilyInsuranceSummaryProps {
  onNext: () => void; 
}

const FamilyInsuranceSummary: React.FC<FamilyInsuranceSummaryProps> = ({ onNext }) => {
    // Get next of kin (Umusigire) data from Redux store
    const umusigireData = useAppSelector((state) => state.umusigireForm.beneficiaries[0]);
    
    // Get parent beneficiaries data from Redux store
    const parentBeneficiariesData = useAppSelector((state) => state.beneficiariesForm.beneficiaries);
    
    // Get real insurance details from Redux store
    const familyFormData = useAppSelector((state) => state.familyForm);
    const familyResults = useAppSelector((state) => state.FamilyQuotationResult);

    // Get premiums from Redux store
    const riskPremium = familyResults.RiskPremium;
    const totalPremium = familyResults.TotalPremium;

    // Debug logging
    console.log('Debug - Family Summary Component - Risk Premium:', riskPremium);
    console.log('Debug - Family Summary Component - Saving Premium:', familyFormData.savingPremium);
    console.log('Debug - Family Summary Component - Total Premium:', totalPremium);
    console.log('Debug - Family Summary Component - Full familyFormData:', familyFormData);
    console.log('Debug - Family Summary Component - Full familyResults:', familyResults);

    // Format currency function
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-RW', {
            style: 'currency',
            currency: 'RWF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-8">
            <div className="font-medium text-2xl leading-7 text-center align-middle" style={{ fontFamily: 'Satoshi' }}>
                Your Family Insurance Summary !
            </div>

            {/* Clean, User-Friendly Vertical Layout */}
            <div className="space-y-6">
                {/* Insurance Details Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-white dark:text-blue-300">Insurance Details</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Marital Status</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.maritalStatus || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Category</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.category || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Direct Parent</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.directParent || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Direct Parent in Law</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.directParentInLaw || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Number of Children</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.numberOfChildren || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Premium Frequency</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.premiumFrequency || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Contribution Years</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {familyFormData.contributionYears || 0} years
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Saving Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyFormData.savingPremium)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Summary Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-yellow-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-white dark:text-yellow-300">Premium Summary</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Risk Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(riskPremium)}
                                    <span className="text-xs text-gray-500 ml-2">({riskPremium})</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Savings Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyFormData.savingPremium)}
                                    <span className="text-xs text-gray-500 ml-2">({familyFormData.savingPremium})</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-900 dark:text-white text-lg">Total Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {formatCurrency(totalPremium)}
                                    <span className="text-xs text-gray-500 ml-2">({totalPremium})</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insurance Covers Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-green-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-white dark:text-green-300">Insurance Covers</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Policy Holder</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyPolicyHolder)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Spouse</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilySpouse)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Children</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyChildren)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Parent</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyParent)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Funeral Cash</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyFuneralCash)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Hospital Cash</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyHospitalCash)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Legal Assistance</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(familyResults.FamilyLegalAssistance)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next of Kin (Umusigire) Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-purple-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-white dark:text-purple-300">Next of Kin (Umusigire)</h3>
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

                {/* Parent Beneficiaries Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#00b0ef]/50 dark:bg-orange-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-white dark:text-orange-300">Parent Beneficiaries</h3>
                    </div>
                    <div className="p-6">
                        {parentBeneficiariesData && parentBeneficiariesData.length > 0 ? (
                            <div className="space-y-4">
                                {parentBeneficiariesData.map((parent, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">First Name</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.firstName || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Last Name</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.lastName || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Gender</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.gender || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Relationship</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.relationship || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.phoneNumber || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">National ID</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{parent.nationalId || "Not provided"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">
                                No parent beneficiaries added yet
                            </div>
                        )}
                    </div>
                </div>


            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
               <button onClick={onNext}
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-lg"
                >
                    Continue to Next Step
                </button>
            </div>
        </div>
    );
};

export default FamilyInsuranceSummary;
