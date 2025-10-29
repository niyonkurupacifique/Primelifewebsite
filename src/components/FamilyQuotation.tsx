
'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

import {
  setMaritalStatus,
  setCategory,
  setDirectParent,
  setDirectParentInLaw,
  setPremiumFrequency,
  setNumberOfChildren,
  setContributionYears,
  setSavingPremium,
  increaseSavingPremium,
  decreaseSavingPremium
} from './Reducers/FamilyQuotationFormFieldsReducer';

import {
  setFamilyPolicyHolder,
  setFamilySpouse,
  setFamilyChildren,
  setFamilyParent,
  setFamilyFuneralCash,
  setFamilyHospitalCash,
  setFamilyLegalAssistance,
  setRiskPremium,
  setTotalPremium



} from './Reducers/FamilyQuotationResult';
import { setInsuranceName } from './Reducers/GetInsuranceNameReducer';


import { useAppDispatch } from '../hooks';
import { useAppSelector } from '../hooks';

const FamilyQuotationCalculator: React.FC = () => {

  // Form state
  const maritalStatus = useAppSelector((state) => state.familyForm.maritalStatus);
  const category = useAppSelector((state) => state.familyForm.category);
  const directParent = useAppSelector((state) => state.familyForm.directParent);
  const directParentInLaw = useAppSelector((state) => state.familyForm.directParentInLaw);
  const premiumFrequency = useAppSelector((state) => state.familyForm.premiumFrequency);
  const numberOfChildren = useAppSelector((state) => state.familyForm.numberOfChildren);

  const contributionYears = useAppSelector((state) => state.familyForm.contributionYears);
  const savingPremium = useAppSelector((state) => state.familyForm.savingPremium);


  //Covers State

  const FamilyPolicyHolder = useAppSelector((state) => state.FamilyQuotationResult.FamilyPolicyHolder);
  const FamilySpous = useAppSelector((state) => state.FamilyQuotationResult.FamilySpouse);
  const FamilyChildren = useAppSelector((state) => state.FamilyQuotationResult.FamilyChildren);
  const FamilyParent = useAppSelector((state) => state.FamilyQuotationResult.FamilyParent);
  const FamilyFuneralCash = useAppSelector((state) => state.FamilyQuotationResult.FamilyFuneralCash);
  const FamilyHospitalCash = useAppSelector((state) => state.FamilyQuotationResult.FamilyHospitalCash);
  const FamilyLegalAssistance = useAppSelector((state) => state.FamilyQuotationResult.FamilyLegalAssistance);



  const [data, setData] = useState<any[]>([]);




  const dispatch = useAppDispatch();
  const router = useRouter();

  // Results state
  const riskPremium = useAppSelector((state) => state.FamilyQuotationResult.RiskPremium);
  const [localSavingPremium, setLocalSavingPremium] = useState(0);
  const totalPremium = useAppSelector((state) => state.FamilyQuotationResult.TotalPremium);

  // Validation state
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate arrays for dropdowns
  const [parentOptions] = useState<number[]>([0, 1, 2]);
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


  const Handlecategory = async () => {
    try {
      const result = await fetch("https://apps.prime.rw/customerbackend/api/familyCategories");
      const result2 = await result.json();

      if (Array.isArray(result2)) {
        setData(result2);
      }
      else {
        setData([result2]);
      }
    } catch (error) {
      console.error('Error fetching family categories:', error);
    }
  };

  useEffect(() => {
    Handlecategory();

  }, []);

  const handleCalculatePremium = async () => {
    setIncompleteFields([]);
    const requiredFields = [];

    if (!maritalStatus) requiredFields.push('maritalStatus');
    if (!category) requiredFields.push('category');
    // if (!numberOfChildren) requiredFields.push('numberOfChildren');
    if (!contributionYears) requiredFields.push('contributionYears');

    if (requiredFields.length > 0) {
      setIncompleteFields(requiredFields);
      return;
    }

    try {
      const selected = data.find((item) => item.categoryType === category);
      console.log("seleted category", selected)
      if (!selected) return;

      console.log("test cover ", selected.spouseSumInsured)

      // Dispatch to Redux
      dispatch(setFamilyPolicyHolder(selected.policyholderSumInsured || 0));
      dispatch(setFamilySpouse(selected.spouseSumInsured || 0));
      dispatch(setFamilyChildren(selected.kidsSumInsured || 0));
      dispatch(setFamilyParent(selected.parent || 0));
      dispatch(setFamilyFuneralCash(selected.funeralCash || 0));
      dispatch(setFamilyHospitalCash(selected.hospitalAmount || 0));
      dispatch(setFamilyLegalAssistance(selected.driverEmergencyAmount || 0));

      const baseKids = selected.baseKids || 0;
      const monthlyPremium = selected.monthlyPremium || 0;
      const annualyPremium = selected.annualyPremium || 0;
      const monthlyAddPremium = selected.monthlyAddPremium || 0;
      const annualyAddPremium = selected.annualyAddPremium || 0;
      const monthlyAddPmParent = selected.monthlyAddPmParent || 0;
      const monthlyMinSavings = selected.monthlyMinSavings || 0;
      const annualyMinSavings = selected.annualyMinSavings || 0;
      
      console.log('Debug - API Data:', {
        monthlyMinSavings,
        annualyMinSavings,
        premiumFrequency,
        selected
      });

      const extraKids = Math.max(0, Number(numberOfChildren) - baseKids);
      const isMarried = maritalStatus === "Married";

      const parentCount = isMarried ? (Number(directParent) + Number(directParentInLaw)) : 0;

      // Risk Premium
      let MoneyToAddforParent = parentCount > 0 && parentCount <= 1 ? monthlyAddPmParent : parentCount >= 2 ? monthlyAddPmParent * 2 : 0
      const monthlyRisk = monthlyPremium + (extraKids * monthlyAddPremium) + (MoneyToAddforParent);
      const annualRisk = annualyPremium + (extraKids * annualyAddPremium) + (MoneyToAddforParent * 12);

      // Set results
      dispatch(setRiskPremium(premiumFrequency === 'Monthly' ? monthlyRisk : annualRisk));
      const minSavings = premiumFrequency === 'Monthly' ? monthlyMinSavings : annualyMinSavings;
      console.log('Debug - Setting saving premium:', minSavings, 'for frequency:', premiumFrequency);
      setLocalSavingPremium(minSavings);
      dispatch(setSavingPremium(minSavings));
      dispatch(setTotalPremium(
        (premiumFrequency === 'Monthly' ? monthlyRisk + monthlyMinSavings : annualRisk + annualyMinSavings)
      ));




    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  // Function to handle custom saving premium input
  const handleCustomSavingPremium = (value: string) => {
    const numValue = parseFloat(value) || 0;
    const finalValue = Math.max(0, numValue);

    console.log('Debug - handleCustomSavingPremium called with:', {
      inputValue: value,
      parsedValue: numValue,
      finalValue: finalValue,
      currentRiskPremium: riskPremium
    });

    // Update local state first
    setLocalSavingPremium(finalValue);

    // Then dispatch to Redux
    dispatch(setSavingPremium(finalValue));

    // Manually update total premium to avoid useEffect conflicts
    const newTotalPremium = Math.round((riskPremium + finalValue) * 100) / 100;
    console.log('Debug - New total premium calculated:', newTotalPremium);
    dispatch(setTotalPremium(newTotalPremium));
  };

  // Function to handle increase/decrease buttons
  const handleIncreaseSavingPremium = (amount: number) => {
    const newValue = localSavingPremium + amount;
    handleCustomSavingPremium(newValue.toString());
  };

  const handleDecreaseSavingPremium = (amount: number) => {
    const newValue = Math.max(0, localSavingPremium - amount);
    handleCustomSavingPremium(newValue.toString());
  };

  // Update total premium whenever saving premium changes
  useEffect(() => {
    const newTotalPremium = Math.round((riskPremium + localSavingPremium) * 100) / 100;
    dispatch(setTotalPremium(newTotalPremium));
  }, [localSavingPremium, riskPremium]);

  // Sync local saving premium with Redux state
  useEffect(() => {
    console.log('Debug - Syncing local state with Redux, savingPremium:', savingPremium);
    setLocalSavingPremium(savingPremium);
  }, [savingPremium]);

  // Reset results when form fields change
  useEffect(() => {
    console.log('Debug - Resetting form due to field changes');
    dispatch(setRiskPremium(0));
    setLocalSavingPremium(0);
    dispatch(setTotalPremium(0));
    // Reset Redux saving premium as well
    dispatch(setSavingPremium(0));
    // Reset covers to initial state
    dispatch(setFamilyPolicyHolder(0));
    dispatch(setFamilySpouse(0));
    dispatch(setFamilyChildren(0));
    dispatch(setFamilyParent(0));
    dispatch(setFamilyFuneralCash(0));
    dispatch(setFamilyHospitalCash(0));
    dispatch(setFamilyLegalAssistance(0));
  }, [maritalStatus, category, directParent, directParentInLaw, premiumFrequency, numberOfChildren, contributionYears, dispatch]);

  // Check if insurance can be bought
  const canBuyInsurance = riskPremium > 0 && totalPremium > 0;

  // State for displaying messages
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Handle buy insurance click
  const handleBuyInsurance = () => {
    if (canBuyInsurance) {
      router.push('/buyfamilyinsurance');
      dispatch(setInsuranceName("Family Insurance"));
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
      const titleText = 'FAMILY INSURANCE QUOTATION ';
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
      const rectWidth = textWidth + 124; // Adjust padding
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
      if (category === "Akabando - Imena - 500" || category === "Akabando - Ingenzi - 1000") {
        doc.text(`0`, 90, currentY);
      } else {
        doc.text(`${directParent}`, 90, currentY);
      }
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Number of Direct Parent in Law:`, 15, currentY)
      if (maritalStatus === "Single" || category === "Akabando - Imena - 500" || category === "Akabando - Ingenzi - 1000") {
        doc.text(`0`, 90, currentY);
      } else {
        doc.text(`${directParentInLaw}`, 90, currentY);
      }
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
      doc.text(`${Math.round(FamilyPolicyHolder).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Spouse Sum:`, 15, currentY)
      doc.text(`${Math.round(FamilySpous).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Kids Sum Insured:`, 15, currentY)
      doc.text(`${Math.round(FamilyChildren).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Parent Sum:`, 15, currentY)
      doc.text(`${Math.round(FamilyParent).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Funeral Amount:`, 15, currentY)
      doc.text(`${Math.round(FamilyFuneralCash).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Hospital Amount:`, 15, currentY)
      doc.text(`${Math.round(FamilyHospitalCash).toLocaleString('en-US')} RWF`, 90, currentY);
      currentY += 6;
    
      doc.setFont('helvetica', 'bold'); // Bold font weight
      doc.setTextColor(0, 0, 0);
      doc.text(`Driver Emergency:`, 15, currentY)
      doc.text(`${Math.round(FamilyLegalAssistance).toLocaleString('en-US')} RWF`, 90, currentY);
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
      const monthlyPremium = premiumFrequency === 'Monthly' ? riskPremium : riskPremium / 12;
      const AnnualRiskPremium = premiumFrequency === 'Annually' ? riskPremium : riskPremium * 12;
      const MonthlyMinSavings = premiumFrequency === 'Monthly' ? localSavingPremium : localSavingPremium / 12;
      const AnnualyMinSavings = premiumFrequency === 'Annually' ? localSavingPremium : localSavingPremium * 12;
    
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
      doc.save('family_quotation.pdf');
      setIsDownloading(false);
      
      // Show success message
      setMessage('Family Insurance Quotation PDF downloaded successfully!');
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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('rw-RW', {
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
                    onChange={(e) => dispatch(setMaritalStatus(e.target.value))}
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
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("category") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  >
                    <option value="" className="text-black">Select Category</option>
                    {data &&
                      data
                        .filter((item) =>

                          item.categoryType.toLowerCase().includes("akabando") ||
                          item.categoryType.toLowerCase().includes("category") ||
                          item.categoryType.toLowerCase().includes("akabando - Imena - 500")


                        )
                        .filter((item) =>
                          !item.categoryType.toLowerCase().includes("nkunganire") &&
                          !item.categoryType.toLowerCase().includes("category 01 - 250") &&
                          !item.categoryType.toLowerCase().includes("category 02 - 500") &&
                          !item.categoryType.toLowerCase().includes("category 03 - 1000") &&
                          !item.categoryType.toLowerCase().includes("akabando - single - 800") &&
                          !item.categoryType.toLowerCase().includes("akabando-mushikiri")


                        )
                        .map((item) => (
                          <option className='text-black' key={item.categoryType} value={item.categoryType}>
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
                    onChange={(e) => dispatch(setDirectParent(Number(e.target.value)))}
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
                    onChange={(e) => dispatch(setDirectParentInLaw(Number(e.target.value)))}
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
                    onChange={(e) => dispatch(setPremiumFrequency((e.target.value)))}
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

                    onChange={(e) => dispatch(setNumberOfChildren(Number(e.target.value)))}
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
                    onChange={(e) => dispatch(setContributionYears(Number(e.target.value)))}
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
                  <span className="text-white">{formatCurrency(FamilyPolicyHolder)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Spouse :</span>
                  <span className="text-white">{formatCurrency(FamilySpous)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Children :</span>
                  <span className="text-white">{formatCurrency(FamilyChildren)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Parent :</span>
                  <span className="text-white">{formatCurrency(FamilyParent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Funeral Cash :</span>
                  <span className="text-white">{formatCurrency(FamilyFuneralCash)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Hospital Cash :</span>
                  <span className="text-white">{formatCurrency(FamilyHospitalCash)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Legal Assistance :</span>
                  <span className="text-white">{formatCurrency(FamilyLegalAssistance)}</span>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${messageType === 'error'
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
                className={`flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 ${canBuyInsurance
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6v-2h12v2H4z" clipRule="evenodd" />
                </svg>
                <span>Buy Family Insurance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyQuotationCalculator;