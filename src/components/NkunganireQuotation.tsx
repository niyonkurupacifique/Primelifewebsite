
'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

import { setNkunganireMaritalStatus, 
         setNkunganireCategory,
         setNkunganireDirectParent,
         setNkunganireDirectParentInLaw,
         setNkunganirePremiumFrequency,
         setNkunganireNumberOfChildren,
         setNkunganireContributionYears,
         setNkunganireSavingPremium,
         setNkunganireRiskPremium,
         setNkunganireTotalPremium
} from './Reducers/NkunganireQuotationFormFieldsReducer';


import { setNkunganirePolicyHolder,
         setNkunganireSpouse,
         setNkunganireChildren,
         setNkunganireParent,
         setNkunganireFuneralCash,
         setNkunganireHospitalCash,
         setNkunganireLegalAssistance 


} from './NkunganireQuotationResult';

import { setInsuranceName } from './Reducers/GetInsuranceNameReducer';

import { useAppDispatch } from '../hooks';
import { useAppSelector } from '../hooks';

const NkunganireQuotationCalculator: React.FC = () => {
 
  // Form state
  const maritalStatus = useAppSelector((state) => state.NkunganireForm.maritalStatus);
  const category = useAppSelector((state) => state.NkunganireForm.category);
  const directParent = useAppSelector((state) => state.NkunganireForm.directParent);
  const directParentInLaw = useAppSelector((state) => state.NkunganireForm.directParentInLaw);
  const premiumFrequency = useAppSelector((state) => state.NkunganireForm.premiumFrequency);
  const numberOfChildren = useAppSelector((state) => state.NkunganireForm.numberOfChildren);
  const contributionYears = useAppSelector((state) => state.NkunganireForm.contributionYears);
  const savingPremium = useAppSelector((state) => state.NkunganireForm.savingPremium);

  //Covers State
   
  const NkunganirePolicyHolder=useAppSelector((state) => state.NkunganireQuotationResult.NkunganirePolicyHolder);
  const NkunganireSpouse=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireSpouse);
  const NkunganireChildren=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireChildren);
  const NkunganireParent=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireParent);
  const NkunganireFuneralCash=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireFuneralCash);
  const NkunganireHospitalCash=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireHospitalCash);
  const NkunganireLegalAssistance=useAppSelector((state) => state.NkunganireQuotationResult.NkunganireLegalAssistance);



  const [data, setData] = useState<any[]>([]);




  const dispatch = useAppDispatch();
  const router = useRouter();

  // Results state
  const [riskPremium, setRiskPremium] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  const [localSavingPremium, setLocalSavingPremium] = useState(0);

  // Validation state
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Check if insurance can be bought
  const canBuyInsurance = riskPremium > 0 && totalPremium > 0;

  // State for displaying messages
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Handle buy insurance click
  const handleBuyInsurance = () => {
    if (canBuyInsurance) {
      router.push('/buynkunganire');
      dispatch(setInsuranceName("Nkunganire Insurance"));
    } else {
      setMessage('Please calculate a valid quotation first. Both risk premium and total premium must be greater than zero.');
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
    if (!maritalStatus) {
      setMessage('Please select a Marital Status first');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }
    
    if (!category) {
      setMessage('Please select a Category first');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }
    
    if (riskPremium === 0 || totalPremium === 0) {
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
      const logoImage = 'https://apps.prime.rw/customerportal/images/primelogo.png';
      const img = new Image();
      img.src = logoImage;
      const logoWidth = 40;
      const logoHeight = logoWidth * img.naturalHeight / img.naturalWidth;
      const logoX = 15;
      const logoY = 15;
      doc.addImage('https://apps.prime.rw/customerportal/images/primelogo.png', 'png', 14, 11, 0, 25);
    
      // Add title
      // Add title with higher contrast
      const titleText = 'NKUNGANIRE INSURANCE QUOTATION ';
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
      const rectWidth = textWidth + 114; // Adjust padding
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
      const YourInPutrectWidth = YourInPuttextWidth + 146; // Adjust padding
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
      doc.text(`Marital status:`, 15, currentY)
      doc.text(`${maritalStatus}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Category:`, 15, currentY)
      doc.text(`${category}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of Direct Parent:`, 15, currentY)
      doc.text(`${directParent}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of Direct Parent in Law:`, 15, currentY)
      doc.text(`${directParentInLaw}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Premium Frequency:`, 15, currentY)
      doc.text(`${premiumFrequency}`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number Of Children:`, 15, currentY)
      doc.text(`${numberOfChildren}`, 90, currentY);
      currentY += 6;
    
      currentY += 6;
    
      ///////////////////////////// Covers //////////////////////////////////
    
      const CoverstitleText = 'COVERS';
      const CoverstitleX = doc.internal.pageSize.getWidth() / 2;
      const CoverstitleY = 115;
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
      doc.text(`Policy holder Sum:`, 15, currentY)
      doc.text(`${Math.round(NkunganirePolicyHolder).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Spouse Sum:`, 15, currentY)
      doc.text(`${Math.round(NkunganireSpouse).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Kids Sum Insured:`, 15, currentY)
      doc.text(`${Math.round(NkunganireChildren).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Parent Sum:`, 15, currentY)
      doc.text(`${Math.round(NkunganireParent).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Funeral Amount:`, 15, currentY)
      doc.text(`${Math.round(NkunganireFuneralCash).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Hospital Amount:`, 15, currentY)
      doc.text(`${Math.round(NkunganireHospitalCash).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Driver Emergency:`, 15, currentY)
      doc.text(`${Math.round(NkunganireLegalAssistance).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
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
    
      currentY += 12;
    
      // Add "Premium" section
      currentY += 8;
    
      //////// Premium //////////
    
      // Calculate premiums based on frequency
      const monthlyRisk = premiumFrequency === 'Monthly' ? riskPremium : riskPremium / 12;
      const annualRisk = premiumFrequency === 'Annually' ? riskPremium : riskPremium * 12;
      const monthlySaving = premiumFrequency === 'Monthly' ? localSavingPremium : localSavingPremium / 12;
      const annualSaving = premiumFrequency === 'Annually' ? localSavingPremium : localSavingPremium * 12;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Risk Premium (${premiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(riskPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Saving Premium (${premiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(localSavingPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Premium (${premiumFrequency}):`, 15, currentY)
      doc.text(`${Math.round(totalPremium).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      //////////////////////////////
    
      ////////////////////////////   Signature /////////////////
    
      const signatureX = doc.internal.pageSize.width - 75;
    
      doc.addImage('https://apps.prime.rw/customerportal/images/stamp.png', 'png', signatureX, doc.internal.pageSize.height - 60, 65, 45);
    
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
      doc.save('nkunganire_quotation.pdf');
      setIsDownloading(false);
      
      // Show success message
      setMessage('Nkunganire Insurance Quotation PDF downloaded successfully!');
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
  const [parentOptions] = useState<number[]>([0, 1,2]);
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

  // Function to handle custom saving premium input
  const handleCustomSavingPremium = (value: string) => {
    const numValue = parseFloat(value) || 0;
    console.log('Debug - Input value:', value);
    console.log('Debug - Parsed number:', numValue);
    const finalValue = Math.max(0, numValue);
    console.log('Debug - Final saving premium value:', finalValue);
    console.log('Debug - Current risk premium:', riskPremium);
    console.log('Debug - Expected total premium:', finalValue + riskPremium);
    
    // Update local state first
    setLocalSavingPremium(finalValue);
    
    // Then dispatch to Redux
    dispatch(setNkunganireSavingPremium(finalValue));
    
    // Manually update total premium to avoid useEffect conflicts
    const newTotalPremium = Math.round((riskPremium + finalValue) * 100) / 100;
    setTotalPremium(newTotalPremium);
    dispatch(setNkunganireTotalPremium(newTotalPremium));
  };

  const Handlecategory = async () => {
  try {
    const result = await fetch("https://apps.prime.rw/customerbackendtest/api/familyCategories");
    const result2 = await result.json();
    
    if(Array.isArray(result2)){
      setData(result2);
    }
    else{
      setData([result2]);
    }
  } catch (error) {
    console.error('Error fetching family categories:', error);
  }
};

  useEffect(() => {
    Handlecategory();
   
  }, []);

  // Update total premium whenever risk premium changes (but not saving premium to avoid conflicts)
  useEffect(() => {
    console.log('Debug - useEffect triggered with:', { riskPremium, savingPremium });
    console.log('Debug - useEffect execution timestamp:', new Date().toISOString());
    const newTotalPremium = Math.round((riskPremium + savingPremium) * 100) / 100; // Round to 2 decimal places
    console.log('Debug - Risk Premium:', riskPremium);
    console.log('Debug - Saving Premium:', savingPremium);
    console.log('Debug - Calculated Total Premium:', newTotalPremium);
    
    setTotalPremium(newTotalPremium);
    
    // Dispatch to Redux store
    dispatch(setNkunganireRiskPremium(riskPremium));
    dispatch(setNkunganireTotalPremium(newTotalPremium));
  }, [riskPremium, dispatch]); // Remove savingPremium from dependencies to avoid conflicts

  // Remove the sync useEffect that causes circular dependency
  // useEffect(() => {
  //   console.log('Debug - Syncing local state with Redux. Redux value:', savingPremium, 'Local value:', localSavingPremium);
  //   console.log('Debug - Sync useEffect execution timestamp:', new Date().toISOString());
  //   setLocalSavingPremium(savingPremium);
  // }, [savingPremium]);

  // Reset results when form fields change
  useEffect(() => {
    console.log('Debug - Resetting form fields');
    setRiskPremium(0);
    setTotalPremium(0);
    setLocalSavingPremium(0);
    dispatch(setNkunganireSavingPremium(0));
    dispatch(setNkunganireRiskPremium(0));
    dispatch(setNkunganireTotalPremium(0));
    // Reset covers data
    dispatch(setNkunganirePolicyHolder(0));
    dispatch(setNkunganireSpouse(0));
    dispatch(setNkunganireChildren(0));
    dispatch(setNkunganireParent(0));
    dispatch(setNkunganireFuneralCash(0));
    dispatch(setNkunganireHospitalCash(0));
    dispatch(setNkunganireLegalAssistance(0));
  }, [maritalStatus, category, directParent, directParentInLaw, premiumFrequency, numberOfChildren, contributionYears, dispatch]);

  const handleCalculatePremium = async () => {
  setIncompleteFields([]);
  const requiredFields = [];

  if (!maritalStatus) requiredFields.push('maritalStatus');
  if (!category) requiredFields.push('category');
  // if (!numberOfChildren) requiredFields.push('numberOfChildrenn');
  if (!contributionYears) requiredFields.push('contributionYears');

  if (requiredFields.length > 0) {
    setIncompleteFields(requiredFields);
    return;
  }

  try {
    const selected = data.find((item) => item.categoryType === category);
    console.log("seleted category",selected)
    if (!selected) return;

    console.log("test cover ",selected.spouseSumInsured)
    
    // Dispatch to Redux
    dispatch(setNkunganirePolicyHolder(selected.policyholderSumInsured || 0));
    dispatch(setNkunganireSpouse(selected.spouseSumInsured || 0));
    dispatch(setNkunganireChildren(selected.kidsSumInsured || 0));
    dispatch(setNkunganireParent(selected.parent || 0));
    dispatch(setNkunganireFuneralCash(selected.funeralCash || 0));
    dispatch(setNkunganireHospitalCash(selected.hospitalAmount || 0));
    dispatch(setNkunganireLegalAssistance(selected.driverEmergencyAmount || 0));

    const baseKids = selected.baseKids || 0;
    const monthlyPremium = selected.monthlyPremium || 0;
    const annualyPremium = selected.annualyPremium || 0;
    const monthlyAddPremium = selected.monthlyAddPremium || 0;
    const annualyAddPremium = selected.annualyAddPremium || 0;
    const monthlyAddPmParent = selected.monthlyAddPmParent || 0;
    const monthlyMinSavings = selected.monthlyMinSavings || 0;
    const annualyMinSavings = selected.annualyMinSavings || 0;

    console.log('Debug - Calculation inputs:', {
      baseKids,
      monthlyPremium,
      annualyPremium,
      monthlyAddPremium,
      annualyAddPremium,
      monthlyAddPmParent,
      monthlyMinSavings,
      annualyMinSavings,
      numberOfChildren,
      directParent,
      directParentInLaw,
      maritalStatus,
      premiumFrequency
    });

    const extraKids = Math.max(0, Number(numberOfChildren) - baseKids);
    const isMarried = maritalStatus === "Married";

    const parentCount = isMarried ? (Number(directParent) + Number(directParentInLaw)) : 0;

    // Risk Premium
    const monthlyRisk = monthlyPremium + (extraKids * monthlyAddPremium) + (monthlyAddPmParent);
    const annualRisk = annualyPremium + (extraKids * annualyAddPremium) + (monthlyAddPmParent * 12 );

    console.log('Debug - Base Premium (Monthly):', monthlyPremium);
    console.log('Debug - Base Premium (Annual):', annualyPremium);
    console.log('Debug - Extra Kids:', extraKids);
    console.log('Debug - Monthly Add Premium per Kid:', monthlyAddPremium);
    console.log('Debug - Annual Add Premium per Kid:', annualyAddPremium);
    console.log('Debug - Parent Count:', parentCount);
    console.log('Debug - Monthly Add Premium per Parent:', monthlyAddPmParent);
    console.log('Debug - Calculated Monthly Risk:', monthlyRisk);
    console.log('Debug - Calculated Annual Risk:', annualRisk);

    // Set results
    const calculatedRiskPremium = premiumFrequency === 'Monthly' ? monthlyRisk : annualRisk;
    console.log('Debug - Final Risk Premium:', calculatedRiskPremium);
    
    // Ensure risk premium is not negative
    const finalRiskPremium = Math.max(0, calculatedRiskPremium);
    console.log('Debug - Final Risk Premium (after validation):', finalRiskPremium);
    
    setRiskPremium(finalRiskPremium);
    
    // Set initial saving premium if it's 0 (first calculation)
    if (savingPremium === 0 && localSavingPremium === 0) {
      const initialSavingPremium = premiumFrequency === 'Monthly' ? monthlyMinSavings : annualyMinSavings;
      console.log('Debug - Setting initial saving premium:', initialSavingPremium);
      console.log('Debug - Monthly min savings:', monthlyMinSavings);
      console.log('Debug - Annual min savings:', annualyMinSavings);
      console.log('Debug - Premium frequency:', premiumFrequency);
      setLocalSavingPremium(initialSavingPremium);
      dispatch(setNkunganireSavingPremium(initialSavingPremium));
    } else {
      console.log('Debug - User has already set saving premium:', savingPremium, 'Local:', localSavingPremium);
    }

    // Total premium will be updated by useEffect

  } catch (error) {
    console.error('Calculation error:', error);
  }
};


  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
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
                    {incompleteFields.includes("maritalStatus") ? 
                      <span className="text-red-500">Marital Status is Required</span> : 
                      <span>Marital Status</span>
                    }
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => dispatch(setNkunganireMaritalStatus(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("maritalStatus") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="" className="text-black">Select Marital Status</option>
                    {maritalStatusOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-black">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("category") ? 
                      <span className="text-red-500">Category is Required</span> : 
                      <span>Category</span>
                    }
                  </label>
                  <select
                    value={category}
                    onChange={(e) => dispatch(setNkunganireCategory(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("category") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="" className="text-black">Select Category</option>
                        {data &&
    data
      .filter((item) =>
        item.categoryType.toLowerCase().includes("nkunganire")
       
      )
      .filter((item) => 
        !item.categoryType.toLowerCase().includes("nkunganire - uhtdrc") &&
        !item.categoryType.toLowerCase().includes("akabando-mushikiri")&&
        !item.categoryType.toLowerCase().includes("nkunganire -shoferi open")
      )
      .map((item) => (
        <option  className="text-black" key={item.categoryType} value={item.categoryType}>
          {item.categoryType}
        </option>
      ))}
                  </select>
                </div>
              </div>

              {/* Direct Parent Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Number of Direct Parent</label>
                  <select
                    value={directParent}
                    onChange={(e) => dispatch(setNkunganireDirectParent(Number(e.target.value)))}
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
                  <label className="block text-white/80 text-sm mb-2">Number of Direct Parent in Law</label>
                  <select
                    value={directParentInLaw}
                    onChange={(e) => dispatch(setNkunganireDirectParentInLaw(Number(e.target.value)))}
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

              {/* Premium Frequency and Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Premium Frequency</label>
                  <select
                    value={premiumFrequency}
                    onChange={(e) => dispatch(setNkunganirePremiumFrequency((e.target.value)))}
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
                    {incompleteFields.includes("numberOfChildrenn") ? 
                      <span className="text-red-500">Number of Children is Required</span> : 
                      <span>Number of Children</span>
                    }
                  </label>
                  <input
                    type="number"
                   
                    onChange={(e) => dispatch(setNkunganireNumberOfChildren(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("numberOfChildrenn") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    placeholder="Enter number of children"
                    min="0" 
                  />
                </div>
              </div>

              {/* Contribution Years */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {incompleteFields.includes("contributionYears") ? 
                      <span className="text-red-500">Contribution Years is Required</span> : 
                      <span>Contribution Years</span>
                    }
                  </label>
                  <select
                    value={contributionYears}
                    onChange={(e) => dispatch(setNkunganireContributionYears(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("contributionYears") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="" className="text-black">Select Years</option>
                    {contributionYearsOptions.map((year) => (
                      <option key={year} value={year} className="text-black">
                        {year} {year === '1' ? 'Year' : 'Years'}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <span className="text-white font-semibold">{formatCurrency(riskPremium)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80">Saving Premium:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/80">RF</span>
                    <input
                      type="number"
                      value={localSavingPremium}
                      onChange={(e) => handleCustomSavingPremium(e.target.value)}
                      className="w-24 px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-center focus:outline-none focus:border-white/60"
                      min="0"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-semibold text-lg">Total Premium:</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(totalPremium)}</span>
                </div>
              </div>
            </div>

            {/* Summary Information */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Covers</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Policy Holder :</span>
                  <span className="text-white">{formatCurrency(NkunganirePolicyHolder)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Spouse :</span>
                  <span className="text-white">{formatCurrency(NkunganireSpouse)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Children :</span>
                  <span className="text-white">{formatCurrency(NkunganireChildren)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Parent :</span>
                  <span className="text-white">{formatCurrency(NkunganireParent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Funeral Cash :</span>
                  <span className="text-white">{formatCurrency(NkunganireFuneralCash)}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-white/80">Hospital Cash :</span>
                  <span className="text-white">{formatCurrency(NkunganireHospitalCash)}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-white/80">Legal Assistance :</span>
                  <span className="text-white">{formatCurrency(NkunganireLegalAssistance)}</span>
                </div>
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
                    <span>Download Report</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleBuyInsurance}
                className={`flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 ${
                  canBuyInsurance 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6v-2h12v2H4z" clipRule="evenodd" />
                   </svg>
                <span>Buy Nkunganire Insurance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NkunganireQuotationCalculator;