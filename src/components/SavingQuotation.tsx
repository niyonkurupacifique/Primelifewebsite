'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Home } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import autoTable from 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
}


import {
  SetValueAcquiredAtMaturity,
  SetSumAssured,
  SetQuotationId,
  SetStartDate,
  SetEndDate,
  SetInterestRate,
  SetContribution,
  SetPaymentFrequency,
  SetTerm,
  SetDateOfBirth,
  ResetSavingQuotationResults,
} from './Reducers/SavingQuotationResults';

import {
  setPremium,
  setContributionYears,
  setBenefitYears,
  setPremiumFrequency,
  setNames,
} from './Reducers/SavingQuotationFormFieldsReducers';

import { setInsuranceName } from './Reducers/GetInsuranceNameReducer';

const SavingQuotationCalculator: React.FC = () => {
  const dispatch = useAppDispatch();
  const [contributionYear, setContributionYear] = useState<number[]>([]);
  const [benefitsYearsArray, setBenefitsYearsArray] = useState<string[]>([]);
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isCalculating, setIsCalculating] = useState(false);
  const [pensionDetails, setPensionDetails] = useState<any[]>([]);
  const router = useRouter();

  const [PremiumFrequencyArray, setPremiumFrequencyArray] = useState([
    "Select",
    "Monthly",
    "Annually"
  ]);

  useEffect(() => {
    const periods = [];
    for (let i = 3; i <= 65; i++) {
      periods.push(i);
    }
    setContributionYear(periods);
  }, []);

  useEffect(() => {
    const periods = ["Lumpsum"];
    setBenefitsYearsArray(periods);
  }, []);

  // Form data from SavingQuotationformdata
  const Premium = useAppSelector((state) => state.SavingQuotationformdata.Premium);
  const ContributionYears = useAppSelector((state) => state.SavingQuotationformdata.ContributionYears);
  const BenefitYears = useAppSelector((state) => state.SavingQuotationformdata.BenefitYears);
  const PremiumFrequency = useAppSelector((state) => state.SavingQuotationformdata.PremiumFrequency);
  const Names = useAppSelector((state) => state.SavingQuotationformdata.Names);

  // Date picker state
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Result data from SavingQuotationResults
  const ValueAcquiredAtMaturity = useAppSelector((state) => state.SavingQuotationResults.ValueAcquiredAtMaturity);
  const SumAssured = useAppSelector((state) => state.SavingQuotationResults.SumAssured);
  const QuotationId = useAppSelector((state) => state.SavingQuotationResults.QuotationId);
  const StartDate = useAppSelector((state) => state.SavingQuotationResults.StartDate);
  const EndDate = useAppSelector((state) => state.SavingQuotationResults.EndDate);
  const InterestRate = useAppSelector((state) => state.SavingQuotationResults.InterestRate);
  const Contribution = useAppSelector((state) => state.SavingQuotationResults.Contribution);
  const PaymentFrequency = useAppSelector((state) => state.SavingQuotationResults.PaymentFrequency);
  const Term = useAppSelector((state) => state.SavingQuotationResults.Term);
  const DateOfBirth = useAppSelector((state) => state.SavingQuotationResults.DateOfBirth);

  // Calculate age from selected date
  const age = selectedDate ? dayjs().diff(selectedDate, 'year') : 0;

  // Calculate sum assured based on premium frequency
  useEffect(() => {
    if (PremiumFrequency === "Monthly") {
      dispatch(SetSumAssured(Premium * 120));
    } else if (PremiumFrequency === "Annually") {
      dispatch(SetSumAssured(Premium * 10));
    } else {
      dispatch(SetSumAssured(0));
    }
  }, [PremiumFrequency, Premium, dispatch]);

  // Reset results whenever any input field changes
  useEffect(() => {
    dispatch(ResetSavingQuotationResults());
  }, [Premium, selectedDate, ContributionYears, BenefitYears, PremiumFrequency, Names, dispatch]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

const handleDownloadPDF = () => {
  if (ValueAcquiredAtMaturity === 0) {
    setMessage('Please calculate the quotation first');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('success');
    }, 3000);
    return;
  }

  const doc = new jsPDF('p', 'mm', 'a4');

  // Get current formatted date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Add background color
  doc.setFillColor('#f5f5f5');
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

  // Add company logo
  doc.addImage('./primelogo.png', 'png', 14, 11, 0, 25);
  
  // Add title
  const titleText = `INTEGO QUOTATION NUMBER :${QuotationId}`;
  const titleX = doc.internal.pageSize.getWidth() / 2;
  const titleY = 48;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  const titleLines = doc.splitTextToSize(titleText, doc.internal.pageSize.getWidth() - 25);

  // Calculate the width and height of the text
  const textWidth =
    doc.getStringUnitWidth(titleLines[0]) *
    doc.getFontSize() /
    doc.internal.scaleFactor;
  const textHeight = doc.getTextDimensions(titleLines).h;

  // Draw rectangle around the text
  const rectX = 14;
  const rectY = titleY - textHeight / 2 - 5;
  const rectWidth = textWidth + 110;
  const rectHeight = textHeight + 5;

  // Draw the background rectangle first
  doc.setFillColor(190, 190, 190);
  doc.rect(rectX, rectY, rectWidth, rectHeight, 'F');

  // Render the text inside the rectangle
  doc.text(titleLines, titleX - titleLines.length * 2, titleY, { align: 'center' });

  ////////////////// QUOTATION DETAILS /////////////////////////////

  const yourInputTitleText = 'QUOTATION DETAILS';
  const yourInputTitleX = doc.internal.pageSize.getWidth() / 2;
  const yourInputTitleY = 65;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  const yourInputTitleLines = doc.splitTextToSize(yourInputTitleText, doc.internal.pageSize.getWidth() - 30);

  // Calculate the width and height of the text
  const yourInputTextWidth =
    doc.getStringUnitWidth(yourInputTitleLines[0]) *
    doc.getFontSize() /
    doc.internal.scaleFactor;
  const yourInputTextHeight = doc.getTextDimensions(yourInputTitleLines).h;

  // Draw rectangle around the text
  const yourInputRectX = 14;
  const yourInputRectY = yourInputTitleY - yourInputTextHeight / 2 - 5;
  const yourInputRectWidth = yourInputTextWidth + 146;
  const yourInputRectHeight = yourInputTextHeight + 5;

  // Draw the background rectangle first
  doc.setFillColor(190, 190, 190);
  doc.rect(yourInputRectX, yourInputRectY, yourInputRectWidth, yourInputRectHeight, 'F');

  // Render the text inside the rectangle
  doc.text(yourInputTitleLines, yourInputTitleX - yourInputTitleLines.length * 2, yourInputTitleY, { align: 'center' });

  // Add quotation details
  let currentY = 65;
  currentY += 8;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Scheme name: `, 15, currentY);
  doc.text(`QUOTATION `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Policy Effective date: `, 15, currentY);
  doc.text(`${StartDate} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Policy maturity date: `, 15, currentY);
  doc.text(`${EndDate} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Interest rate (%) : `, 15, currentY);
  doc.text(`${InterestRate} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Contribution: `, 15, currentY);
  doc.text(`${"FRW" + " " + Contribution?.toLocaleString('en-US')} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Contribution frequency: `, 15, currentY);
  doc.text(`${PaymentFrequency} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Benefits Payment: `, 15, currentY);
  doc.text(`Lumpsum`, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Term: `, 15, currentY);
  doc.text(`${Term + ' ' + "Year(s)"} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Value acquired at maturity : `, 15, currentY);
  doc.text(`${"FRW" + " " + Math.round(ValueAcquiredAtMaturity).toLocaleString('en-US')} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Sum assured : `, 15, currentY);
  doc.text(`${"FRW" + " " + Math.round(SumAssured).toLocaleString('en-US')} `, 90, currentY);
  currentY += 6;

  currentY += 6;

  ///////////////////////////// POLICYHOLDER DETAILS //////////////////////////////////

  const coverstitleText = 'POLICYHOLDER DETAILS';
  const coverstitleX = doc.internal.pageSize.getWidth() / 2;
  const coverstitleY = 140;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  const coverstitleLines = doc.splitTextToSize(coverstitleText, doc.internal.pageSize.getWidth() - 30);

  // Calculate the width and height of the text
  const coverstextWidth =
    doc.getStringUnitWidth(coverstitleLines[0]) *
    doc.getFontSize() /
    doc.internal.scaleFactor;

  const coverstextHeight = doc.getTextDimensions(coverstitleLines).h;

  // Draw rectangle around the text
  const coversrectX = 14;
  const coversrectY = coverstitleY - coverstextHeight / 2 - 5;
  const coversrectWidth = coverstextWidth + 138;
  const coversrectHeight = coverstextHeight + 5;

  // Draw the background rectangle first
  doc.setFillColor(190, 190, 190);
  doc.rect(coversrectX, coversrectY, coversrectWidth, coversrectHeight, 'F');

  // Render the text inside the rectangle
  doc.text(coverstitleLines, coverstitleX - coverstitleLines.length * 2, coverstitleY, { align: 'center' });

  // Add policyholder details
  currentY += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333333');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Policyholder name: `, 15, currentY);
  doc.text(`${Names} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Date of Birth : `, 15, currentY);
  doc.text(`${DateOfBirth} `, 90, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`ID Document: `, 15, currentY);
  doc.text(` `, 90, currentY);
  currentY += 6;

  ///////////////////////////// Signature //////////////////////////////////

  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  const companyText = 'Prime Life Insurance Ltd';
  doc.text(companyText, doc.internal.pageSize.width - 75, doc.internal.pageSize.height - 60);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  const dateText = `Done at Kigali, ${formattedDate}`;
  doc.text(dateText, 55, doc.internal.pageSize.height - 65);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  currentY += 12;
  currentY += 8;

  ////////////////////////////   Signature /////////////////

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

  // Process pension details for table
  const processedData = pensionDetails.reduce((acc: any[], item: any, index: number) => {
  // Show value at the end of each year (index 11, 23, 35...) or the last entry
  if (index % 12 === 11 || index === pensionDetails.length - 1) {
    const year = Math.floor(index / 12) + 1;
    const totalMonths = index + 1; // Total months elapsed
    acc.push({
      year: year,
      months: totalMonths,
      surrenderValue: item.acquiredValue || 0
    });
  }
  return acc;
}, []);

  // Add a new page for surrender values
  if (processedData && processedData.length > 0) {
    doc.addPage();

    // Set the font size and add the title
    doc.setFontSize(12);
    doc.text('Surrender Values Subject to the payment of the due premiums on the scheduled dates', 14, 20);

    // Create the table on the new page using autoTable function
    autoTable(doc, {
      head: [['Year #', 'At the end of n month(s)', 'Surrender value']],
      body: processedData.map((item: any) => [
        item.year,
        item.months,
        Math.round(item.surrenderValue).toLocaleString('en-US')
      ]),
      styles: {
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 7.3,
        halign: 'center',
        valign: 'middle',
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      headStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fillColor: [22, 160, 219]
      },
      bodyStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      startY: 30,
      showHead: 'firstPage',
      didDrawPage: function(data: any) {
        const tableEndY = data.cursor.y;
        const gapBetweenTableAndText = 20;
        let yPosition = tableEndY + gapBetweenTableAndText;

        doc.setFontSize(10);
        const noteText = [
          "Note :",
          "a) The above surrender values are subject to payment of the premium provided for in the contract on the due dates;",
          "b) The following elements are subject to changes:",
          "   • Beneficiary and next of kin;",
          "   • Premium frequency;",
          "   • Contribution amount (increase or decrease), surrender values will hence change accordingly;",
          "   • Policy duration;",
          "   • Addresses.",
          "c) Reference to the general conditions which form an integral part of this contract."
        ];

        noteText.forEach((line, index) => {
          if (index === 0) {
            doc.setFont("helvetica", "bold");
          } else {
            doc.setFont("helvetica", "normal");
          }
          
          doc.text(line, 14, yPosition);
          yPosition += 10;
          
          if (index === 0 || index === 7) {
            yPosition += 2;
          }
        });

        // Add decorative border
        const borderX = 10;
        const borderY = 10;
        const borderWidth = doc.internal.pageSize.getWidth() - 20;
        const borderHeight = doc.internal.pageSize.getHeight() - 20;
        doc.setLineWidth(0.5);
        doc.setDrawColor('#003366');
        doc.rect(borderX, borderY, borderWidth, borderHeight, 'D');
      }
    });
  }

  // Save the PDF
  const fileName = `Prime_Life_Intego_Quotation_${QuotationId}_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.pdf`;
  doc.save(fileName);
};

  const HandleCalculateQuotation = async () => {
    console.log("sum assured we are using",SumAssured)
    setIncompleteFields([]);
    setIsCalculating(true);
    
    const requiredFields = [];
    
    if (!selectedDate) requiredFields.push('selectedDate');
    if (Premium<5000) requiredFields.push('Premium');
    if (ContributionYears === 0) requiredFields.push('ContributionYears');
    if (PremiumFrequency === "Select") requiredFields.push('PremiumFrequency');
    if (Names === "") requiredFields.push('Names');

    if (requiredFields.length > 0) {
      setIncompleteFields(requiredFields);
      setIsCalculating(false);
      return;
    }

    try {
      const response = await fetch('https://apps.prime.rw/customerbackend/api/proposal/savingquotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NationalId: " ",
          DateOfBirth: selectedDate?.format('YYYY-MM-DD'),
          Premium: Number(Premium),
          PolicyTermYears: Number(ContributionYears),
          BenefitsInYears:1,
          PremiumFrequency: PremiumFrequency,
          SumInsured: Number(SumAssured) || 0,
          Names: Names,
          userName: Names
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("results is",result)
        dispatch(SetValueAcquiredAtMaturity(result.currentFundValue));
        // dispatch(SetSumAssured(result.sumAssured));
        dispatch(SetQuotationId(result.quotationId));
        dispatch(SetStartDate(result.startDate));
        dispatch(SetEndDate(result.endDate));
        dispatch(SetInterestRate(result.interestRate));
        dispatch(SetContribution(result.contribution));
        dispatch(SetPaymentFrequency(result.paymentFrequency));
        dispatch(SetTerm(result.term));
        dispatch(SetDateOfBirth(result.dateOfBirth));
        
        setPensionDetails(result.pensionDetails || []);
        
        setMessage('Quotation calculated successfully!');
        setMessageType('success');
      } else {
        const errorText = await response.text();
        setMessage('Failed to calculate quotation: ' + errorText);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setMessage('Failed to calculate quotation. Please try again.');
      setMessageType('error');
    } finally {
      setIsCalculating(false);
      setTimeout(() => {
        setMessage('');
        setMessageType('success');
      }, 5000);
    }
  };

  const handleBuyInsurance = () => {
    dispatch(setInsuranceName('Intego'));
    router.push('/buyintego');
  };

  return (
    <div className="bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] mt-9 p-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Saving Quotation Calculator
              </h1>
              <p className="text-white/80">Calculate your saving insurance benefits</p>
            </div>

            <div className="space-y-6">
              {/* Date of Birth */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  {incompleteFields.includes("selectedDate") ?
                    <span className="text-red-500">Date of Birth is Required</span> :
                    <span>Date of Birth</span>
                  }
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    className={`w-full ${incompleteFields.includes("selectedDate") ? 'border-red-500' : 'border-white/30'}`}
                    disableFuture
                    openTo="year"
                    views={['year', 'month', 'day']}
                    slotProps={{
                      textField: {
                        className: `w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("selectedDate") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60`,
                        placeholder: "Select date of birth",
                        InputProps: {
                          style: { color: 'white' }
                        },
                        InputLabelProps: {
                          style: { color: 'white' }
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
                {selectedDate && (
                  <p className="text-white/60 text-xs mt-1">Age: {age} years</p>
                )}
              </div>

              {/* Names */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  {incompleteFields.includes("Names") ?
                    <span className="text-red-500">Names is Required</span> :
                    <span>Full Names</span>
                  }
                </label>
                <input
                  type="text"
                  value={Names}
                  onChange={(e) => dispatch(setNames(e.target.value))}
                  className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("Names") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60`}
                  placeholder="Enter full names"
                />
              </div>

              {/* Premium */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  {incompleteFields.includes("Premium") ?
                    <span className="text-red-500">Premium is Required</span> :
                    <span>Monthly Premium (RWF)</span>
                  }
                </label>
                <input
                  type="number"
                  value={Premium || ''}
                  onChange={(e) => dispatch(setPremium(Number(e.target.value)))}
                  className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("Premium") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60`}
                  placeholder="Enter premium amount"
                  min="5000"
                />
              </div>

              {/* Contribution Years */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  {incompleteFields.includes("ContributionYears") ?
                    <span className="text-red-500">Contribution Years is Required</span> :
                    <span>Contribution Years</span>
                  }
                </label>
                <select
                  value={ContributionYears}
                  onChange={(e) => dispatch(setContributionYears(Number(e.target.value)))}
                  className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("ContributionYears") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                >
                  <option value={0} className="text-black">Select Contribution Years</option>
                  {contributionYear.map((year) => (
                    <option key={year} value={year} className="text-black">
                      {year} years
                    </option>
                  ))}
                </select>
              </div>

              {/* Premium Frequency */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  {incompleteFields.includes("PremiumFrequency") ?
                    <span className="text-red-500">Premium Frequency is Required</span> :
                    <span>Premium Frequency</span>
                  }
                </label>
                <select
                  value={PremiumFrequency}
                  onChange={(e) => dispatch(setPremiumFrequency(e.target.value))}
                  className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("PremiumFrequency") ? 'border-red-500' : 'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                >
                  {PremiumFrequencyArray.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Benefit Years */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Benefit Years</label>
                <select
                  value={BenefitYears}
                  onChange={(e) => dispatch(setBenefitYears(e.target.value))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                >
                  {benefitsYearsArray.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={HandleCalculateQuotation}
                disabled={isCalculating}
                className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5" />
                {isCalculating ? 'Calculating...' : 'Calculate Quotation'}
              </button>

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-lg ${messageType === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                  <p className={`text-sm ${messageType === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                    {message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Quotation Results
              </h2>
              <p className="text-white/80">Your saving insurance benefits</p>
            </div>

            <div className="space-y-6">
              {/* Value Acquired at Maturity */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Value Acquired at Maturity</span>
                  <span className="text-2xl font-bold text-white">
                    {formatCurrency(ValueAcquiredAtMaturity)}
                  </span>
                </div>
                <p className="text-white/60 text-xs">
                  Total amount you'll receive at maturity
                </p>
              </div>

              {/* Sum Assured */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Sum Assured</span>
                  <span className="text-xl font-bold text-white">
                    {formatCurrency(SumAssured)}
                  </span>
                </div>
                <p className="text-white/60 text-xs">
                  Total coverage amount
                </p>
              </div>

              {/* Premium Details */}
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-3">Premium Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">Monthly Premium:</span>
                    <span className="text-white font-medium">{formatCurrency(Premium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Frequency:</span>
                    <span className="text-white font-medium">{PremiumFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Contribution Years:</span>
                    <span className="text-white font-medium">{ContributionYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Interest Rate:</span>
                    <span className="text-white font-medium">{InterestRate}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={ValueAcquiredAtMaturity === 0}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  Download Quotation
                </button>

                <button
                  onClick={handleBuyInsurance}
                  disabled={ValueAcquiredAtMaturity === 0}
                  className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Insurance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingQuotationCalculator;
