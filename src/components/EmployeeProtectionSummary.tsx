
'use client';

import React from 'react';
import { useAppSelector } from '../hooks';

interface EmployeeProtectionSummaryProps {
    onNext: () => void;
}

const EmployeeProtectionSummary: React.FC<EmployeeProtectionSummaryProps> = ({ onNext }) => {
    // Get real data from Redux store
    const umusigireData = useAppSelector((state) => state.umusigireForm.beneficiaries[0]);
    const beneficiariesData = useAppSelector((state) => state.beneficiariesForm.beneficiaries);

    // Get real employee protection details from Redux store
    const employeeFormData = useAppSelector((state) => state.EmployeeQuotationFormData);
    const employeeResults = useAppSelector((state) => state.EmployeeQuotationResult);

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
                Summary !
            </div>

            {/* Clean, User-Friendly Vertical Layout */}
            <div className="space-y-6">
                {/* Employee Protection Details Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Employee Protection Details</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Total Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(employeeResults.EmployeeTotalPremium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Risk Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(employeeResults.EmployeeRiskPremium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Savings Premium</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(employeeResults.EmployeeSavingPremium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Monthly Salary</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {formatCurrency(Number(employeeFormData.EmployeeMonthlySalary))}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Marital Status</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeMaritalStatus || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Contribution Years</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeContributionYears} years
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Premium Frequency</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeePremiumFrequency || "Not provided"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Number of Children</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeNumberOfChildren}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Number of Parents</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeNumberOfDirectParent}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Number of In-Laws</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeNumberOfDirectParentInLaw}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Funeral Coverage</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeFuneral}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Savings Component</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeSavings}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 md:col-span-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Sum Insured Shared to Spouse</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                    {employeeFormData.EmployeeSumInsuredSharedToSpouse}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee Benefits Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Employee Benefits Coverage</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {/* Policy Holder Benefits */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Policy Holder Benefits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Death Benefit</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeePolicyHolderDeath)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Permanent Disability</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeePolicyHolderPermanentDisability)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Loss of Revenue</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeePolicyHolderLossOfRevenue)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Funeral Fees</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeePolicyHolderFuneralFees)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Spouse Benefits */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Spouse Benefits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Death Benefit</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeSpouseDeath)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Permanent Disability</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeSpousePermanentDisability)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Loss of Revenue</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeSpouseLossOfRevenue)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Funeral Fees</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeSpouseFuneralFees)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Children Benefits */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Children Benefits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Death Benefit</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeChildrenDeath)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Permanent Disability</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeChildrenPermanentDisability)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Loss of Revenue</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeChildrenLossOfRevenue)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Funeral Fees</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-900">
                                            {formatCurrency(employeeResults.EmployeeChildrenFuneralFees)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Beneficiaries Information Section */}
                <div className=" dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="bg-[#e0e4e9]/50 dark:bg-blue-900/20 px-6 py-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Beneficiaries Information</h3>
                    </div>
                    <div className="p-6">
                        {beneficiariesData.length > 0 ? (
                            <div className="space-y-4">
                                {beneficiariesData.map((beneficiary, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Beneficiary {index + 1}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Full Name</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">
                                                    {beneficiary.firstName} {beneficiary.middleName && `${beneficiary.middleName} `}{beneficiary.lastName}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">National ID</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">{beneficiary.nationalId || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Relationship</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">{beneficiary.relationship || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">{beneficiary.dateOfBirth || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Gender</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">{beneficiary.gender || "Not provided"}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
                                                <span className="font-semibold text-gray-900 dark:text-gray-900">{beneficiary.phoneNumber || "Not provided"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">
                                No beneficiaries added yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Next of Kin (Umusigire) Section */}
                <div className="dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
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
                    className="px-8 py-3 bg-[#159fdb] text-black rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-lg"
                >
                    Continue to Next Step
                </button>
            </div>
        </div>
    );
};

export default EmployeeProtectionSummary