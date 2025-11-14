
'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

import {
  setEmployeeMaritalStatus,
  setEmployeeMonthlySalary,
  setEmployeeNumberOfChildren,
  setEmployeeNumberOfDirectParent,
  setEmployeeNumberOfDirectParentInLaw,
  setEmployeeFuneral,
  setEmployeeSavings,
  setEmployeeSumInsuredSharedToSpouse,
  setEmployeePremiumFrequency,
  setEmployeeContributionYears,
  setEmployeeFormData
} from './Reducers/EmployeeProtectionQuatationFormField';

import { setInsuranceName } from './Reducers/GetInsuranceNameReducer';


import {
  setEmployeeRiskPremium,
  setEmployeeSavingPremium,
  setEmployeeTotalPremium,

  setEmployeePolicyHolderDeath,
  setEmployeePolicyHolderPermanentDisability,
  setEmployeePolicyHolderLossOfRevenue,
  setEmployeePolicyHolderFuneralFees,

  setEmployeeSpouseDeath,
  setEmployeeSpousePermanentDisability,
  setEmployeeSpouseLossOfRevenue,
  setEmployeeSpouseFuneralFees,

  setEmployeeChildrenDeath,
  setEmployeeChildrenPermanentDisability,
  setEmployeeChildrenLossOfRevenue,
  setEmployeeChildrenFuneralFees,
  setEmployeeBenefits



} from './Reducers/EmployeeProtectionQuatationResults';


import { useAppDispatch } from '../hooks';
import { useAppSelector } from '../hooks';

const EmployeeQuotationCalculator: React.FC = () => {
  const router = useRouter();

  // Form state
  const employeeMaritalStatus = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeMaritalStatus);
  const employeeMonthlySalary = parseInt(useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeMonthlySalary));
  const employeeNumberOfChildren = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeNumberOfChildren);
  const employeeNumberOfDirectParent = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeNumberOfDirectParent);
  const employeeNumberOfDirectParentInLaw = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeNumberOfDirectParentInLaw);
  const employeeFuneral = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeFuneral);
  const employeeSavings = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeSavings);
  const employeeSumInsuredSharedToSpouse = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeSumInsuredSharedToSpouse);
  const employeePremiumFrequency = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeePremiumFrequency);
  const employeeContributionYears = useAppSelector((state) => state.EmployeeQuotationFormData.EmployeeContributionYears);

  //Covers State

  // Premiums
  const employeeRiskPremium = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeRiskPremium);
  const employeeSavingPremium = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeSavingPremium);
  const employeeTotalPremium = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeTotalPremium);

  // Policy Holder
  const employeePolicyHolderDeath = useAppSelector((state) => state.EmployeeQuotationResult.EmployeePolicyHolderDeath);
  const employeePolicyHolderPermanentDisability = useAppSelector((state) => state.EmployeeQuotationResult.EmployeePolicyHolderPermanentDisability);
  const employeePolicyHolderLossOfRevenue = useAppSelector((state) => state.EmployeeQuotationResult.EmployeePolicyHolderLossOfRevenue);
  const employeePolicyHolderFuneralFees = useAppSelector((state) => state.EmployeeQuotationResult.EmployeePolicyHolderFuneralFees);

  // Spouse
  const employeeSpouseDeath = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeSpouseDeath);
  const employeeSpousePermanentDisability = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeSpousePermanentDisability);
  const employeeSpouseLossOfRevenue = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeSpouseLossOfRevenue);
  const employeeSpouseFuneralFees = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeSpouseFuneralFees);

  // Children
  const employeeChildrenDeath = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeChildrenDeath);
  const employeeChildrenPermanentDisability = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeChildrenPermanentDisability);
  const employeeChildrenLossOfRevenue = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeChildrenLossOfRevenue);
  const employeeChildrenFuneralFees = useAppSelector((state) => state.EmployeeQuotationResult.EmployeeChildrenFuneralFees);


  const dispatch = useAppDispatch();

  // Validation state
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Check if total premium is greater than zero
  const canBuyInsurance = employeeTotalPremium > 0;

  // State for displaying messages
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Handle buy insurance click
  const handleBuyInsurance = () => {
    if (canBuyInsurance) {
      router.push('/buyemployee');
      dispatch(setInsuranceName("Employee Protection Insurance"))
    } else {
      setMessage('Please calculate a valid quotation first. Total Premium must be greater than zero.');
      setMessageType('error');
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (employeeMaritalStatus === "Select Marital Status") {
      setMessage('Please select a Marital Status first');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }
    
    if (employeeTotalPremium === 0) {
      setMessage('Please calculate a quotation first before downloading');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }
    
    setIsDownloading(true);
    
    try {
      // Get current date
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const doc = new jsPDF('p', 'mm', 'a4');
    
      // Add background color or image
      doc.setFillColor('#f5f5f5');
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    
      // Add company logo
      const logoImage = './primelogo.png';
      const img = new Image();
      img.src = logoImage;
      const logoWidth = 40;
      const logoHeight = logoWidth * img.naturalHeight / img.naturalWidth;
      const logoX = 15;
      const logoY = 15;
      doc.addImage('./primelogo.png', 'png', 14, 11, 0, 25);
    
      // Add title
      // Add title with higher contrast
      const titleText = 'EMPLOYEE PROTECTION INSURANCE QUOTATION ';
      const titleX = doc.internal.pageSize.getWidth() / 2;
      const titleY = 48;
      doc.setFontSize(10); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      // Consider font embedding if using a custom font (research jsPDF plugins or server-side solutions)
    
      const titleLines = doc.splitTextToSize(titleText, doc.internal.pageSize.getWidth() - 30);
    
      // Calculate the width and height of the text
      const textWidth = doc.getStringUnitWidth(titleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const textHeight = doc.getTextDimensions(titleLines).h;
    
      // Draw rectangle around the text (optional, adjust padding as needed)
      const rectX = 14;
      const rectY = titleY - textHeight / 2 - 5; 
      const rectWidth = textWidth + 93; // Adjust padding
      const rectHeight = textHeight + 5; // Adjust padding
    
      // **Draw the background rectangle first (ensure text appears on top)**
      doc.setFillColor(190, 190, 190); // Adjust opacity as needed
      doc.rect(rectX, rectY, rectWidth, rectHeight, 'F'); // Use 'F' for filling
    
      // Render the text inside the rectangle
      doc.text(titleLines, titleX, titleY, { align: 'center' });
    
      ////////////////// input /////////////////////////////
    
      const YourInPuttitleText = 'QUOTATION DETAILS';
      const YourInPuttitleX = doc.internal.pageSize.getWidth() / 2;
      const YourInPuttitleY = 65;
      doc.setFontSize(10); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      // Consider font embedding if using a custom font (research jsPDF plugins or server-side solutions)
    
      const YourInPuttitleLines = doc.splitTextToSize(YourInPuttitleText, doc.internal.pageSize.getWidth() - 30);
    
      // Calculate the width and height of the text
      const YourInPuttextWidth = doc.getStringUnitWidth(YourInPuttitleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const YourInPuttextHeight = doc.getTextDimensions(YourInPuttitleLines).h;
    
      // Draw rectangle around the text (optional, adjust padding as needed)
      const YourInPutrectX = 14;
      const YourInPutrectY = YourInPuttitleY - YourInPuttextHeight / 2 - 5; 
      const YourInPutrectWidth = YourInPuttextWidth + 144; // Adjust padding
      const YourInPutrectHeight = YourInPuttextHeight + 5; // Adjust padding
    
      // **Draw the background rectangle first (ensure text appears on top)**
      doc.setFillColor(190, 190, 190); // Adjust opacity as needed
      doc.rect(YourInPutrectX, YourInPutrectY, YourInPutrectWidth, YourInPutrectHeight, 'F'); // Use 'F' for filling
    
      // Render the text inside the rectangle
      doc.text(YourInPuttitleLines, YourInPuttitleX, YourInPuttitleY, { align: 'center' });
    
      ///////////////////////////////////////////////////////
    
      // Add "Your Input" section
      let currentY = 65;
      currentY += 8;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Marital status: `, 15, currentY)
      doc.text(`${employeeMaritalStatus}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Monthly Salary: `, 15, currentY)
      doc.text(`${Math.round(employeeMonthlySalary).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of children: `, 15, currentY)
      doc.text(`${employeeNumberOfChildren}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of Direct Parent: `, 15, currentY)
      doc.text(`${employeeNumberOfDirectParent}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of Direct Parent in law: `, 15, currentY)
      doc.text(`${employeeNumberOfDirectParentInLaw}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Funeral: `, 15, currentY)
      doc.text(`${employeeFuneral}`, 90, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Savings: `, 15, currentY)
      doc.text(`${employeeSavings}`, 90, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Sum Insured shared to spouse: `, 15, currentY)
      doc.text(`${employeeSumInsuredSharedToSpouse}`, 90, currentY);
      currentY += 6;
    
      currentY += 6;
    
      ///////////////////////////// Covers //////////////////////////////////
    
      const CoverstitleText = 'COVERS';
      const CoverstitleX = doc.internal.pageSize.getWidth() / 2;
      const CoverstitleY = 130;
      doc.setFontSize(10); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      // Consider font embedding if using a custom font (research jsPDF plugins or server-side solutions)
    
      const CoverstitleLines = doc.splitTextToSize(CoverstitleText, doc.internal.pageSize.getWidth() - 30);
    
      // Calculate the width and height of the text
      const CoverstextWidth = doc.getStringUnitWidth(CoverstitleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const CoverstextHeight = doc.getTextDimensions(CoverstitleLines).h;
    
      // Draw rectangle around the text (optional, adjust padding as needed)
      const CoversrectX = 14;
      const CoversrectY = CoverstitleY - CoverstextHeight / 2 - 5; 
      const CoversrectWidth = CoverstextWidth + 167; // Adjust padding
      const CoversrectHeight = CoverstextHeight + 5; // Adjust padding
    
      // **Draw the background rectangle first (ensure text appears on top)**
      doc.setFillColor(190, 190, 190); // Adjust opacity as needed
      doc.rect(CoversrectX, CoversrectY, CoversrectWidth, CoversrectHeight, 'F'); // Use 'F' for filling
    
      // Render the text inside the rectangle
      doc.text(CoverstitleLines, CoverstitleX, CoverstitleY, { align: 'center' });
    
      ////////////////////////////////////////////////////////////////////////
    
      // Add "Covers" section
      currentY += 12;
    
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#333333');
    
      //////// covers //////////
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Cover`, 15, currentY)
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Sum Assured Policy Holder`, 55, currentY)
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Spouse Assured Policy Holder`, 110, currentY)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Children`, 170, currentY)
     
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Death:`, 15, currentY + 6)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeePolicyHolderDeath).toLocaleString('en-US')} RWF`, 70, currentY + 6)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeSpouseDeath).toLocaleString('en-US')} RWF`, 130, currentY + 6)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeChildrenDeath).toLocaleString('en-US')} RWF`, 180, currentY + 6)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Permanent Disability:`, 15, currentY + 12)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeePolicyHolderPermanentDisability).toLocaleString('en-US')} RWF`, 70, currentY + 12)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeSpousePermanentDisability).toLocaleString('en-US')} RWF`, 130, currentY + 12)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeChildrenPermanentDisability).toLocaleString('en-US')} RWF`, 180, currentY + 12)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Loss of Revenue:`, 15, currentY + 18)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeePolicyHolderLossOfRevenue).toLocaleString('en-US')} RWF`, 70, currentY + 18)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeSpouseLossOfRevenue).toLocaleString('en-US')} RWF`, 130, currentY + 18)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeChildrenLossOfRevenue).toLocaleString('en-US')} RWF`, 180, currentY + 18)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Funeral Fees:`, 15, currentY + 24)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeePolicyHolderFuneralFees).toLocaleString('en-US')} RWF`, 70, currentY + 24)
      
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeSpouseFuneralFees).toLocaleString('en-US')} RWF`, 130, currentY + 24)

      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`${Math.round(employeeChildrenFuneralFees).toLocaleString('en-US')} RWF`, 180, currentY + 24)
    
      //////////////////////////////
    
      ///////////////////////////// Premium //////////////////////////////////
    
      const PremiumtitleText = 'Premium';
      const PremiumtitleX = doc.internal.pageSize.getWidth() / 2;
      const PremiumtitleY = 180;
    
      doc.setFontSize(15); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      const Text = 'Prime Life Insurance Ltd';
      doc.text(Text, doc.internal.pageSize.width - 75, doc.internal.pageSize.height - 60);
    
      doc.setFontSize(10); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      const date = `Done at Kigali, ${formattedDate}`;
      doc.text(date, 55, doc.internal.pageSize.height - 65);
    
      doc.setFontSize(10); // Increased font size (adjust as needed)
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0); // Black for better contrast
    
      // Consider font embedding if using a custom font (research jsPDF plugins or server-side solutions)
    
      const PremiumtitleLines = doc.splitTextToSize(PremiumtitleText, doc.internal.pageSize.getWidth() - 30);
    
      // Calculate the width and height of the text
      const PremiumtextWidth = doc.getStringUnitWidth(PremiumtitleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const PremiumtextHeight = doc.getTextDimensions(PremiumtitleLines).h;
    
      // Draw rectangle around the text (optional, adjust padding as needed)
      const PremiumrectX = 14;
      const PremiumrectY = PremiumtitleY - PremiumtextHeight / 2 - 5; 
      const PremiumrectWidth = PremiumtextWidth + 167; // Adjust padding
      const PremiumrectHeight = PremiumtextHeight + 5; // Adjust padding
    
      // **Draw the background rectangle first (ensure text appears on top)**
      doc.setFillColor(190, 190, 190); // Adjust opacity as needed
      doc.rect(PremiumrectX, PremiumrectY, PremiumrectWidth, PremiumrectHeight, 'F'); // Use 'F' for filling
    
      // Render the text inside the rectangle
      doc.text(PremiumtitleLines, PremiumtitleX, PremiumtitleY, { align: 'center' });
    
      ////////////////////////////////////////////////////////////////////////
    
      // Add "Premium" section
      currentY += 48;
    
      //////// Premium //////////
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Risk Premium (${employeePremiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(employeeRiskPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
     
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Saving Premium (${employeePremiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(employeeSavingPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
     
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Premium (${employeePremiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(employeeTotalPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
     
      //////////////////////////////
    
      ////////////////////////////   Signature /////////////////
    
      const signatureX = doc.internal.pageSize.width - 75;
    
      doc.addImage('./stamp.png', 'png', signatureX, doc.internal.pageSize.height - 60, 65, 45);
    
      ////////////////////////////////////////////////////////////
    
      // Add decorative border
      const borderX = 10;
      const borderY = 10;
      const borderWidth = doc.internal.pageSize.getWidth() - 20;
      const borderHeight = doc.internal.pageSize.getHeight() - 20;
      doc.setLineWidth(0.5);
      doc.setDrawColor('#003366');
      doc.rect(borderX, borderY, borderWidth, borderHeight, 'D');
    
      // Save the PDF
      doc.save('employee_protection_quotation.pdf');
      setIsDownloading(false);
      
      // Show success message
      setMessage('Employee Protection Quotation PDF downloaded successfully!');
      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsDownloading(false);
      setMessage('Error generating PDF. Please try again.');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  // Generate arrays for dropdowns
  const [parentOptions] = useState<number[]>([0, 1, 2]);
  const [FuneralOptions] = useState<string[]>(["Yes", "No"]);
  const [SavingsOptions] = useState<string[]>(["Yes", "No"]);
  const [contributionYearsOptions] = useState<string[]>(() => {
    const years = [];
    for (let i = 1; i <= 40; i++) {
      years.push(i.toString());
    }
    return years;
  });

  const maritalStatusOptions = [
    
    { value: 'Married', label: 'Married' },
    { value: 'Single', label: 'Single' },
    { value: 'Other', label: 'Other' },

  ];



  const frequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Annually', label: 'Annually' },

  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

 
  useEffect(() => {
  dispatch(setEmployeeBenefits({
    EmployeeRiskPremium: 0,
    EmployeeSavingPremium: 0,
    EmployeeTotalPremium: 0,

    EmployeePolicyHolderDeath: 0,
    EmployeePolicyHolderPermanentDisability: 0,
    EmployeePolicyHolderLossOfRevenue: 0,
    EmployeePolicyHolderFuneralFees: 0,

    EmployeeSpouseDeath: 0,
    EmployeeSpousePermanentDisability: 0,
    EmployeeSpouseLossOfRevenue: 0,
    EmployeeSpouseFuneralFees: 0,

    EmployeeChildrenDeath: 0,
    EmployeeChildrenPermanentDisability: 0,
    EmployeeChildrenLossOfRevenue: 0,
    EmployeeChildrenFuneralFees: 0,
  }));
}, [employeeMaritalStatus, employeeMonthlySalary,employeeNumberOfChildren,employeeNumberOfDirectParent,employeeNumberOfDirectParentInLaw,employeeFuneral,employeeSavings,employeeSumInsuredSharedToSpouse,employeePremiumFrequency]);



 const handleCalculatePremium = () => {
   
  setIncompleteFields([]);
  const requiredFields = [];

  if (employeeMaritalStatus==="Select Marital Status") requiredFields.push('employeeMaritalStatus');
   if (employeeMonthlySalary<300000) requiredFields.push('employeeMonthlySalaryIncomplete');
 

  if (requiredFields.length > 0) {
    setIncompleteFields(requiredFields);
    return;
  }


  const salary = employeeMonthlySalary;
  const sumInsuredRate = 15;
  const funeral = employeeFuneral === "Yes";
  const savings = employeeSavings === "Yes";
  const sharedToSpouse = employeeSumInsuredSharedToSpouse === "Yes";
  const premiumRate = 5;

  if (salary < 300000) {
    dispatch(setEmployeeRiskPremium(0));
    dispatch(setEmployeeSavingPremium(0));
    dispatch(setEmployeeTotalPremium(0));
    return;
  }

  // Sum assured calculations
  const death = salary * sumInsuredRate;
  const permanentDisability = death;
  const lossOfRevenue = death * 0.75;

  // Funeral fees
  const funeralFeesSumAssured = funeral ? Math.min(1_000_000, salary * sumInsuredRate) : 0;
  const funeralFeesMonthly = funeral ? 2416 : 0;
  const funeralFeesAnnual = (funeralFeesMonthly * 12) / 1.04;

  // Split death cover
  const deathPH = sharedToSpouse ? death * 0.6 : death;
  const deathSpouse = sharedToSpouse ? death * 0.4 : 0;
  const permPH = deathPH;
  const permSpouse = deathSpouse;
  const lossPH = deathPH * 0.75;

  // Base monthly premiums
  const pMonthlyDeath = Math.ceil((1850 + (death * 4.89477683361112) / 12 / 1000) / 0.85);
  const pMonthlyPD = (permanentDisability * 1.2) / 1000 / 12;
  const pMonthlyLOR = (lossOfRevenue * 0.001) / 12;

  // Base annual premiums
  const pAnnualDeath = (pMonthlyDeath * 12) / 1.04 - 1000;
  const pAnnualPD = (pMonthlyPD * 12) / 1.04;
  const pAnnualLOR = (pMonthlyLOR * 12) / 1.04;

  // ➕ Extra children beyond 4
  const extraChildren = Math.max(0, employeeNumberOfChildren - 4);
  const extraChildrenMonthly = extraChildren * 500;
  const extraChildrenAnnual = extraChildrenMonthly * 12;

  // ➕ Direct parents and parents-in-law
  let parentMonthly = 0;
  if (employeeNumberOfDirectParent > 0) parentMonthly += 2500;
  if (employeeNumberOfDirectParentInLaw > 0 && employeeMaritalStatus !== "Other") parentMonthly += 2500;
  const parentAnnual = parentMonthly * 12;

  // 💼 Base risk premiums (used for saving calculation)
  const baseRiskMonthly = pMonthlyDeath + pMonthlyPD + pMonthlyLOR + funeralFeesMonthly;
  const baseRiskAnnual = pAnnualDeath + pAnnualPD + pAnnualLOR + funeralFeesAnnual;

  // 💼 Final risk premiums (with additions)
  const riskMonthly = employeeMaritalStatus!=="Single"?baseRiskMonthly + extraChildrenMonthly + parentMonthly:baseRiskMonthly;
  const riskAnnual = employeeMaritalStatus!=="Single"?baseRiskAnnual + extraChildrenAnnual + parentAnnual:baseRiskAnnual;

  // 🎯 Total premium target (5% of salary)
  const totalTargetMonthly = (salary * premiumRate) / 100;
  const totalTargetAnnual = totalTargetMonthly * 12;

  // 💰 Savings = target - base risk only (so extra charges don’t reduce savings)
  const savingMonthly = savings ? totalTargetMonthly - baseRiskMonthly : 0;
  const savingAnnual = savings ? totalTargetAnnual - baseRiskAnnual : 0;

  // Dispatching all cover values
  dispatch(setEmployeePolicyHolderDeath(deathPH));
  dispatch(setEmployeeSpouseDeath(deathSpouse));
  dispatch(setEmployeeChildrenDeath(0));

  dispatch(setEmployeePolicyHolderPermanentDisability(permPH));
  dispatch(setEmployeeSpousePermanentDisability(permSpouse));
  dispatch(setEmployeeChildrenPermanentDisability(0));

  dispatch(setEmployeePolicyHolderLossOfRevenue(lossPH));
  dispatch(setEmployeeSpouseLossOfRevenue(0));
  dispatch(setEmployeeChildrenLossOfRevenue(0));

  dispatch(setEmployeePolicyHolderFuneralFees(funeralFeesSumAssured));
  dispatch(setEmployeeSpouseFuneralFees(funeralFeesSumAssured));
  dispatch(setEmployeeChildrenFuneralFees(funeralFeesSumAssured));

  // Final premium dispatch
  if (employeePremiumFrequency === "Annually") {
    dispatch(setEmployeeRiskPremium(Math.round(riskAnnual)));
    dispatch(setEmployeeSavingPremium(Math.round(savingAnnual)));
    dispatch(setEmployeeTotalPremium(Math.round(riskAnnual + savingAnnual)));
  } else {
    dispatch(setEmployeeRiskPremium(Math.floor(riskMonthly)));
    dispatch(setEmployeeSavingPremium(Math.floor(savingMonthly)));
    dispatch(setEmployeeTotalPremium(Math.floor(riskMonthly + savingMonthly)));
  }
};




 


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] mt-9 p-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Premium Calculator
              </h1>
            </div>

            <div className="space-y-6">
              {/* Marital Status and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("employeeMaritalStatus") ?
                      <span className="text-red-500">Marital Status is Required</span> :
                      <span>Marital Status</span>
                    }
                  </label>
                  <select
                    value={employeeMaritalStatus}
                    onChange={(e) => dispatch(setEmployeeMaritalStatus(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("maritalStatus") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="Select Marital Status" className="text-black">Select Marital Status</option>
                    {maritalStatusOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-black">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("employeeMonthlySalaryIncomplete") ?
                      <span className="text-red-500">Monthly Salary must be greater than 300,000 RWF</span> :
                      <span>Monthly Salary</span>
                    }
                  </label>
                  <input
                    type="number"
                    value={employeeMonthlySalary}                    
                    onChange={(e) => dispatch(setEmployeeMonthlySalary(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("numberOfChildren") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    placeholder="Enter Monthly Salary"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("numberOfChildren") ?
                      <span className="text-red-500">Number of Children is Required</span> :
                      <span>Number of Children</span>
                    }
                  </label>
                  <input
                    type="number"
                    value={employeeNumberOfChildren}
                    onChange={(e) => dispatch(setEmployeeNumberOfChildren(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("numberOfChildren") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    placeholder="Enter number of children"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Number of Direct Parent</label>
                  <select
                    value={employeeNumberOfDirectParent}
                    onChange={(e) => dispatch(setEmployeeNumberOfDirectParent(Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {parentOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Number of Direct Parent in Law</label>
                  <select
                    value={employeeNumberOfDirectParentInLaw}
                    onChange={(e) => dispatch(setEmployeeNumberOfDirectParentInLaw(Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {parentOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Funeral</label>
                  <select
                  value={employeeFuneral}
                  onChange={(e)=>{dispatch(setEmployeeFuneral(e.target.value))}}

                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {FuneralOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>


              </div>

              {/* Direct Parent Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Savings</label>
                  <select
                  value={employeeSavings}
                  onChange={(e)=>{dispatch(setEmployeeSavings(e.target.value))}}

                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {SavingsOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Sum Insured shared to spouse</label>
                  <select
                  value={employeeSumInsuredSharedToSpouse}
                  onChange={(e)=>{dispatch(setEmployeeSumInsuredSharedToSpouse(e.target.value))}}

                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {SavingsOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Premium Frequency and Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Premium Frequency</label>
                  <select
                    value={employeePremiumFrequency}
                    onChange={(e) => dispatch(setEmployeePremiumFrequency((e.target.value)))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-black">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("contributionYears") ?
                      <span className="text-red-500">Contribution Years is Required</span> :
                      <span>Contribution Years</span>
                    }
                  </label>
                  <select
                    value={employeeContributionYears}
                    onChange={(e) => dispatch(setEmployeeContributionYears(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("contributionYears") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="" className="text-black">Select Years</option>
                    {contributionYearsOptions.map((year) => (
                      <option key={year} value={year} className="text-black">
                        {year}
                      </option>
                    ))}
                  </select>
                </div>


              </div>

              {/* Contribution Years */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              </div>

              <button
              onClick={handleCalculatePremium}
               
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Premium</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Premium Results
              </h2>
            </div>

            {/* Premium Details */}
            <div className="bg-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-white font-semibold mb-6 text-center">Premium Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80">Risk Premium:</span>
                  <span className="text-white font-semibold">{formatCurrency(employeeRiskPremium)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80">Saving Premium:</span>
                  <span className="text-white font-semibold">{formatCurrency(employeeSavingPremium)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-semibold text-lg">Total Premium:</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(employeeTotalPremium)}</span>
                </div>
              </div>
            </div>

            {/* Summary Information */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Covers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-white text-sm border border-white/20">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="text-left px-4 py-2 border border-white/20">Covers</th>
                      <th className="text-left px-4 py-2 border border-white/20">Policy Holder</th>
                      <th className="text-left px-4 py-2 border border-white/20">Spouse</th>
                      <th className="text-left px-4 py-2 border border-white/20">Children</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-white/20">Death</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeePolicyHolderDeath)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeSpouseDeath)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeChildrenDeath)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-white/20">Permanent Disability</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeePolicyHolderPermanentDisability)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeSpousePermanentDisability)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeChildrenPermanentDisability)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-white/20">Loss of Revenue</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeePolicyHolderLossOfRevenue)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeSpouseLossOfRevenue)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeChildrenLossOfRevenue)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-white/20">Funeral Fees</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeePolicyHolderFuneralFees)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeSpouseFuneralFees)}</td>
                      <td className="px-4 py-2 border border-white/20">{formatCurrency(employeeChildrenFuneralFees)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                messageType === 'error' 
                  ? 'bg-red-500/20 border border-red-500/30 text-red-200' 
                  : 'bg-green-500/20 border border-green-500/30 text-green-200'
              }`}>
                {message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className={`flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 ${
                  isDownloading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Quotation</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleBuyInsurance}
                className={`flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 ${
                  canBuyInsurance 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-500 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6v-2h12v2H4z" clipRule="evenodd" />
                </svg>
                <span>Buy Employee Insurance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeQuotationCalculator;