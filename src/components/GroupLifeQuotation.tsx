'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const GroupLifeQuotationCalculator: React.FC = () => {
  // State management
  const [ratePerMille, setRatePerMille] = useState(0);
  const [yearOfBirth, setYearOfBirth] = useState<string>('');
  const [salaryAmount, setSalaryAmount] = useState<number>(0);
  const [numberOfKidsLessThan25Years, setNumberOfKidsLessThan25Years] = useState<number>(1);
  const [death, setDeath] = useState<number>(12);
  const [totalPartialPermanentDisability, setTotalPartialPermanentDisability] = useState<number>(0);
  const [staffFuneralFee, setStaffFuneralFee] = useState<number>(0);
  const [spouseFuneralFee, setSpouseFuneralFee] = useState<number>(0);
  const [kidsFuneralFee, setKidsFuneralFee] = useState<number>(0);
  const [dreadDiseaseCriticalIllness, setDreadDiseaseCriticalIllness] = useState<string>('Yes');
  const [lossOfIncome, setLossOfIncome] = useState<string>('Yes');
  
  // Calculated values
  const [deathCover, setDeathCover] = useState<number>(0);
  const [totalPartialPermanentDisabilityValue, setTotalPartialPermanentDisabilityValue] = useState<number>(0);
  const [dreadDiseasesCriticalIllnessValue, setDreadDiseasesCriticalIllnessValue] = useState<number>(0);
  const [lossOfIncomeValue, setLossOfIncomeValue] = useState<number>(0);
  const [staffFuneralFeeValue, setStaffFuneralFeeValue] = useState<number>(0);
  const [spouseFuneralFeeValue, setSpouseFuneralFeeValue] = useState<number>(0);
  const [kidsFuneralFeeValue, setKidsFuneralFeeValue] = useState<number>(0);
  const [totalPremium, setTotalPremium] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  
  // UI state
  const [isDownloading, setIsDownloading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const toDayDate = new Date();
  const currentYear = parseInt(toDayDate.getFullYear().toString());

  // Fetch rate per mille based on age
  const getRatePerMille = async () => {
    if (!yearOfBirth) return;
    
    try {
      const calculatedAge = currentYear - parseInt(yearOfBirth);
      if (calculatedAge < 0 || calculatedAge > 100) return;
      
      const result = await fetch(`https://apps.prime.rw/customerbackend/api/DeathRates?age=${calculatedAge}`);
      const result2 = await result.json();
      setAge(calculatedAge);
      const roundedRatePerMille = result2.rate_per_mille;
      setRatePerMille(roundedRatePerMille);
    } catch (error) {
      console.error('Error fetching rate per mille:', error);
    }
  };

  useEffect(() => {
    if (yearOfBirth) {
      getRatePerMille();
    }
  }, [yearOfBirth]);

  // Calculate all values
  useEffect(() => {
    const newDeathCover = Math.round(salaryAmount * death);
    setDeathCover(newDeathCover);

    if (totalPartialPermanentDisability > death) {
      setShowWarning(true);
      setTotalPartialPermanentDisabilityValue(0);
    } else {
      setTotalPartialPermanentDisabilityValue(Math.round(salaryAmount * totalPartialPermanentDisability));
      setShowWarning(false);
    }

    setKidsFuneralFeeValue(Math.round(numberOfKidsLessThan25Years * kidsFuneralFee));

    if (dreadDiseaseCriticalIllness === 'Yes') {
      setDreadDiseasesCriticalIllnessValue(Math.round(newDeathCover * 50 / 100));
    } else {
      setDreadDiseasesCriticalIllnessValue(0);
    }

    if (lossOfIncome === 'Yes') {
      setLossOfIncomeValue(Math.round(newDeathCover * 75 / 100));
    } else {
      setLossOfIncomeValue(0);
    }

    setStaffFuneralFeeValue(Math.round(staffFuneralFee));
    setSpouseFuneralFeeValue(Math.round(spouseFuneralFee));
  }, [
    salaryAmount,
    death,
    totalPartialPermanentDisability,
    dreadDiseaseCriticalIllness,
    deathCover,
    lossOfIncome,
    numberOfKidsLessThan25Years,
    kidsFuneralFee,
    staffFuneralFee,
    spouseFuneralFee
  ]);

  // Calculate total premium
  useEffect(() => {
    const deathPremium = Math.round(deathCover * ratePerMille / 1000);
    const tppdPremium = Math.round(totalPartialPermanentDisabilityValue * ratePerMille * 50 / 100 / 1000);
    const dreadDiseasePremium = Math.round(Math.round(dreadDiseasesCriticalIllnessValue * ratePerMille * 40 / 100) / 1000);
    const lossOfIncomePremium = Math.round(lossOfIncomeValue * 0.140 / 100);
    const staffFuneralPremium = Math.round(Math.round(staffFuneralFee * ratePerMille * 100 / 100) / 1000);
    const spouseFuneralPremium = Math.round((spouseFuneralFee * 5.4158 / 1000));
    const kidsFuneralPremium = Math.round((kidsFuneralFeeValue * 5.4158 / 1000));

    const total = deathPremium + tppdPremium + dreadDiseasePremium + lossOfIncomePremium + 
                  staffFuneralPremium + spouseFuneralPremium + kidsFuneralPremium;
    setTotalPremium(total);
  }, [
    deathCover,
    totalPartialPermanentDisabilityValue,
    dreadDiseasesCriticalIllnessValue,
    lossOfIncomeValue,
    staffFuneralFee,
    spouseFuneralFee,
    kidsFuneralFeeValue,
    ratePerMille
  ]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (!yearOfBirth || salaryAmount === 0) {
      setMessage('Please fill in all required fields (Year of Birth and Salary Amount)');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }

    setIsDownloading(true);

    try {
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

      // Enhanced title
      const titleText = 'GROUP LIFE INSURANCE QUOTATION';
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(41, 98, 166);

      const titleLines = doc.splitTextToSize(titleText, doc.internal.pageSize.getWidth() - 30);

      doc.setFillColor(235, 245, 255);
      doc.setDrawColor(41, 98, 166);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, 42, doc.internal.pageSize.getWidth() - 30, 12, 2, 2, 'FD');

      const titleX = doc.internal.pageSize.getWidth() / 2;
      doc.text(titleLines, titleX, 49, { align: 'center' });

      // QUOTATION DETAILS section
      let currentY = 65;

      const yourInputTitleText = 'QUOTATION DETAILS';
      const yourInputTitleX = doc.internal.pageSize.getWidth() / 2;
      const yourInputTitleY = 65;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);

      const yourInputTitleLines = doc.splitTextToSize(yourInputTitleText, doc.internal.pageSize.getWidth() - 30);
      const yourInputTextWidth = doc.getStringUnitWidth(yourInputTitleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const yourInputTextHeight = doc.getTextDimensions(yourInputTitleLines).h;

      const yourInputRectX = 14;
      const yourInputRectY = yourInputTitleY - yourInputTextHeight / 2 - 5;
      const yourInputRectWidth = yourInputTextWidth + 144;
      const yourInputRectHeight = yourInputTextHeight + 5;

      doc.setFillColor(190, 190, 190);
      doc.rect(yourInputRectX, yourInputRectY, yourInputRectWidth, yourInputRectHeight, 'F');
      doc.text(yourInputTitleLines, yourInputTitleX, yourInputTitleY, { align: 'center' });

      // Add input data
      currentY += 8;

      const addDataRow = (label: string, value: string, y: number) => {
        if (Math.floor((y - 77) / 7) % 2 === 0) {
          doc.setFillColor(250, 252, 255);
          doc.rect(15, y - 3, doc.internal.pageSize.getWidth() - 30, 6, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        doc.text(label, 18, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(value, 95, y);

        return y + 7;
      };

      currentY = addDataRow('Age:', `${age}`, currentY);
      currentY = addDataRow('Salary Amount:', `${Math.round(salaryAmount).toLocaleString('en-US')} RWF`, currentY);
      currentY = addDataRow('Number Of kids LessThan 25 years:', `${numberOfKidsLessThan25Years}`, currentY);
      currentY = addDataRow('Death:', `${death} months`, currentY);
      currentY = addDataRow('Total & Partial permanent disability:', `${totalPartialPermanentDisability} months`, currentY);
      currentY = addDataRow('Staff Funeral fee:', `${Math.round(staffFuneralFee).toLocaleString('en-US')} RWF`, currentY);
      currentY = addDataRow('Spouse funeral fee:', `${Math.round(spouseFuneralFee).toLocaleString('en-US')} RWF`, currentY);
      currentY = addDataRow('Kids funeral fee:', `${Math.round(kidsFuneralFee).toLocaleString('en-US')} RWF`, currentY);
      currentY = addDataRow('Dread disease/Critical illness:', `${dreadDiseaseCriticalIllness}`, currentY);
      currentY = addDataRow('Loss of Income:', `${lossOfIncome}`, currentY);

      currentY += 4;

      // COVERS section
      const coversTitleText = 'COVERS';
      const coversTitleX = doc.internal.pageSize.getWidth() / 2;
      const coversTitleY = 140;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);

      const coversTitleLines = doc.splitTextToSize(coversTitleText, doc.internal.pageSize.getWidth() - 30);
      const coversTextWidth = doc.getStringUnitWidth(coversTitleLines[0]) * doc.getFontSize() / doc.internal.scaleFactor;
      const coversTextHeight = doc.getTextDimensions(coversTitleLines).h;

      const coversRectX = 14;
      const coversRectY = coversTitleY - coversTextHeight / 2 - 5;
      const coversRectWidth = coversTextWidth + 161;
      const coversRectHeight = coversTextHeight + 5;

      doc.setFillColor(190, 190, 190);
      doc.rect(coversRectX, coversRectY, coversRectWidth, coversRectHeight, 'F');
      doc.text(coversTitleLines, coversTitleX, coversTitleY, { align: 'center' });

      currentY += 12;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Cover', 15, currentY);
      doc.text('Sum Assured', 110, currentY);
      doc.text('Annual Premium', 148, currentY);

      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`Death:12 months'salary:`, 15, currentY + 6);
      doc.text(`${Math.round(deathCover).toLocaleString('en-US')}`, 110, currentY + 6);
      doc.text(`${(Math.round(deathCover * ratePerMille / 1000)).toLocaleString('en-US')}`, 148, currentY + 6);

      doc.text(`Total & partial permanent Disability:12 months'salary:`, 15, currentY + 12);
      doc.text(`${Math.round(totalPartialPermanentDisabilityValue).toLocaleString('en-US')}`, 110, currentY + 12);
      doc.text(`${(Math.round(totalPartialPermanentDisabilityValue * ratePerMille * 50 / 100 / 1000)).toLocaleString('en-US')}`, 148, currentY + 12);

      doc.text(`Dread Disease:50% of death sum insured:`, 15, currentY + 18);
      doc.text(`${Math.round(dreadDiseasesCriticalIllnessValue).toLocaleString('en-US')}`, 110, currentY + 18);
      doc.text(`${(Math.round(Math.round(dreadDiseasesCriticalIllnessValue * ratePerMille * 40 / 100) / 1000)).toLocaleString('en-US')}`, 148, currentY + 18);

      doc.text(`Loss of Income:75% of death sum insured:`, 15, currentY + 24);
      doc.text(`${Math.round(lossOfIncomeValue).toLocaleString('en-US')}`, 110, currentY + 24);
      doc.text(`${(Math.round(lossOfIncomeValue * 0.140 / 100)).toLocaleString('en-US')}`, 148, currentY + 24);

      doc.text(`Staff Funeral fee:`, 15, currentY + 30);
      doc.text(`${Math.round(staffFuneralFee).toLocaleString('en-US')}`, 110, currentY + 30);
      doc.text(`${(Math.round(Math.round(staffFuneralFee * ratePerMille * 100 / 100) / 1000)).toLocaleString('en-US')}`, 148, currentY + 30);

      doc.text(`Spouse funeral fee:`, 15, currentY + 36);
      doc.text(`${Math.round(spouseFuneralFee).toLocaleString('en-US')}`, 110, currentY + 36);
      doc.text(`${(Math.round((spouseFuneralFee * 5.4158 / 1000))).toLocaleString('en-US')}`, 148, currentY + 36);

      doc.text(`Kids funeral fee:`, 15, currentY + 42);
      doc.text(`${Math.round(kidsFuneralFeeValue).toLocaleString('en-US')}`, 110, currentY + 42);
      doc.text(`${(Math.round((kidsFuneralFeeValue * 5.4158 / 1000))).toLocaleString('en-US')}`, 148, currentY + 42);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Total:', 15, currentY + 52);
      const totalSumAssured = Math.round(deathCover + totalPartialPermanentDisabilityValue + dreadDiseasesCriticalIllnessValue + lossOfIncomeValue + staffFuneralFee + spouseFuneralFee + kidsFuneralFeeValue);
      doc.text(`${totalSumAssured.toLocaleString('en-US')}`, 110, currentY + 52);
      doc.text(`${totalPremium.toLocaleString('en-US')}`, 148, currentY + 52);

      // Footer
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Prime Life Insurance Ltd', doc.internal.pageSize.width - 75, doc.internal.pageSize.height - 60);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      const date = `Done at Kigali, ${formattedDate}`;
      doc.text(date, 55, doc.internal.pageSize.height - 65);

      // Signature
      const signatureX = doc.internal.pageSize.width - 75;
  
    doc.addImage('./stamp.png', 'png', signatureX, doc.internal.pageSize.height - 60, 65, 45);

      // Add decorative border
      const borderX = 10;
      const borderY = 10;
      const borderWidth = doc.internal.pageSize.getWidth() - 20;
      const borderHeight = doc.internal.pageSize.getHeight() - 20;
      doc.setLineWidth(0.5);
      doc.setDrawColor('#003366');
      doc.rect(borderX, borderY, borderWidth, borderHeight, 'D');

      // Save the PDF
      doc.save('group_life_quotation.pdf');
      setIsDownloading(false);

      setMessage('Quotation PDF downloaded successfully!');
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

  // Calculate premium values
  const deathPremium = Math.round(deathCover * ratePerMille / 1000);
  const tppdPremium = Math.round(totalPartialPermanentDisabilityValue * ratePerMille * 50 / 100 / 1000);
  const dreadDiseasePremium = Math.round(Math.round(dreadDiseasesCriticalIllnessValue * ratePerMille * 40 / 100) / 1000);
  const lossOfIncomePremium = Math.round(lossOfIncomeValue * 0.140 / 100);
  const staffFuneralPremium = Math.round(Math.round(staffFuneralFee * ratePerMille * 100 / 100) / 1000);
  const spouseFuneralPremium = Math.round((spouseFuneralFee * 5.4158 / 1000));
  const kidsFuneralPremium = Math.round((kidsFuneralFeeValue * 5.4158 / 1000));

  return (
    <div className="bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] mt-9 p-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Warning Toast */}
        {showWarning && (
          <div className="flex justify-center pb-2">
            <div className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div className="inline-flex animate-bounce items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span className="sr-only">Warning icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Total & Partial permanent disability must be equal or be less than those for death.</div>
              <button onClick={() => setShowWarning(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Group Life Quotation Calculator
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Year of Birth</label>
                <input
                  type="number"
                  value={yearOfBirth}
                  onChange={(e) => setYearOfBirth(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                  placeholder="e.g., 1990"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Salary Amount</label>
                <input
                  type="number"
                  onChange={(e) => setSalaryAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                  placeholder="Enter Monthly Salary"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Number Of kids LessThan 25 years</label>
                <select
                  value={numberOfKidsLessThan25Years}
                  onChange={(e) => setNumberOfKidsLessThan25Years(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={1} className="text-black">1</option>
                  <option value={2} className="text-black">2</option>
                  <option value={3} className="text-black">3</option>
                  <option value={4} className="text-black">4</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Death (months)</label>
                <select
                  value={death}
                  onChange={(e) => setDeath(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={12} className="text-black">12</option>
                  <option value={24} className="text-black">24</option>
                  <option value={36} className="text-black">36</option>
                  <option value={48} className="text-black">48</option>
                  <option value={60} className="text-black">60</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Total & Partial permanent disability (months)</label>
                <select
                  value={totalPartialPermanentDisability}
                  onChange={(e) => setTotalPartialPermanentDisability(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={0} className="text-black">0</option>
                  <option value={12} className="text-black">12</option>
                  <option value={24} className="text-black">24</option>
                  <option value={36} className="text-black">36</option>
                  <option value={48} className="text-black">48</option>
                  <option value={60} className="text-black">60</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Staff Funeral fee</label>
                <select
                  value={staffFuneralFee}
                  onChange={(e) => setStaffFuneralFee(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={0} className="text-black">0</option>
                  <option value={500000} className="text-black">500,000</option>
                  <option value={1000000} className="text-black">1,000,000</option>
                  <option value={1500000} className="text-black">1,500,000</option>
                  <option value={2000000} className="text-black">2,000,000</option>
                  <option value={2500000} className="text-black">2,500,000</option>
                  <option value={3000000} className="text-black">3,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Spouse funeral fee</label>
                <select
                  value={spouseFuneralFee}
                  onChange={(e) => setSpouseFuneralFee(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={0} className="text-black">0</option>
                  <option value={500000} className="text-black">500,000</option>
                  <option value={1000000} className="text-black">1,000,000</option>
                  <option value={1500000} className="text-black">1,500,000</option>
                  <option value={2000000} className="text-black">2,000,000</option>
                  <option value={2500000} className="text-black">2,500,000</option>
                  <option value={3000000} className="text-black">3,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Kids funeral fee</label>
                <select
                  value={kidsFuneralFee}
                  onChange={(e) => setKidsFuneralFee(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value={0} className="text-black">0</option>
                  <option value={500000} className="text-black">500,000</option>
                  <option value={1000000} className="text-black">1,000,000</option>
                  <option value={1500000} className="text-black">1,500,000</option>
                  <option value={2000000} className="text-black">2,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Dread disease/Critical illness</label>
                <select
                  value={dreadDiseaseCriticalIllness}
                  onChange={(e) => setDreadDiseaseCriticalIllness(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value="Yes" className="text-black">Yes</option>
                  <option value="No" className="text-black">No</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Loss of Income</label>
                <select
                  value={lossOfIncome}
                  onChange={(e) => setLossOfIncome(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  <option value="Yes" className="text-black">Yes</option>
                  <option value="No" className="text-black">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            {/* Insurance Details - Sum Assured */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Sum Assured</h3>
              <div className="space-y-3 text-sm">
                <div className="text-white/80">
                  <div className="mb-2">Age: <span className="text-white font-semibold">{age} years</span></div>
                  <div className="mb-2">Death Cover: <span className="text-white font-semibold">{formatCurrency(deathCover)}</span></div>
                  <div className="mb-2">Total & Partial Permanent Disability: <span className="text-white font-semibold">{formatCurrency(totalPartialPermanentDisabilityValue)}</span></div>
                  <div className="mb-2">Dread Diseases/Critical Illness: <span className="text-white font-semibold">{formatCurrency(dreadDiseasesCriticalIllnessValue)}</span></div>
                  <div className="mb-2">Loss Of Income: <span className="text-white font-semibold">{formatCurrency(lossOfIncomeValue)}</span></div>
                  <div className="mb-2">Staff Funeral Fees: <span className="text-white font-semibold">{formatCurrency(staffFuneralFee)}</span></div>
                  <div className="mb-2">Spouse Funeral Fee: <span className="text-white font-semibold">{formatCurrency(spouseFuneralFee)}</span></div>
                  <div className="mb-2">Kids Funeral Fee: <span className="text-white font-semibold">{formatCurrency(kidsFuneralFeeValue)}</span></div>
                </div>
              </div>
            </div>

            {/* Insurance Details - Annual Premium */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Annual Premium</h3>
              <div className="space-y-3 text-sm">
                <div className="text-white/80">
                  <div className="mb-2">Death Cover: <span className="text-white font-semibold">{formatCurrency(deathPremium)}</span></div>
                  <div className="mb-2">Total & Partial Permanent Disability: <span className="text-white font-semibold">{formatCurrency(tppdPremium)}</span></div>
                  <div className="mb-2">Dread Diseases/Critical Illness: <span className="text-white font-semibold">{formatCurrency(dreadDiseasePremium)}</span></div>
                  <div className="mb-2">Loss of Income: <span className="text-white font-semibold">{formatCurrency(lossOfIncomePremium)}</span></div>
                  <div className="mb-2">Staff Funeral Fees: <span className="text-white font-semibold">{formatCurrency(staffFuneralPremium)}</span></div>
                  <div className="mb-2">Spouse Funeral Fee: <span className="text-white font-semibold">{formatCurrency(spouseFuneralPremium)}</span></div>
                  <div className="mb-2">Kids Funeral Fee: <span className="text-white font-semibold">{formatCurrency(kidsFuneralPremium)}</span></div>
                  <div className="mb-2 pt-2 border-t border-white/20">Total Premium: <span className="text-white font-bold text-lg">{formatCurrency(totalPremium)}</span></div>
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

            {/* Download Button */}
            <div className="flex flex-col gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupLifeQuotationCalculator;

