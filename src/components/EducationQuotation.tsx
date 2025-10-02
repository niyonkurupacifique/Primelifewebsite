'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Home } from 'lucide-react';
import { useAppSelector ,useAppDispatch} from '../hooks';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';


 import {
  SetEndowmentamountafterdeferredperiod,
  SetEndowmentamountduringdeferredperiod,
} from './Reducers/EducationQuotationResults'; 

import {
  setPremium,  
  setYearOfBirth,
  setContributionYears,
  setBenefitYears,
  setCycle,
  setPremiumFrequency,
  
} from './Reducers/EducationQuotationFormFieldsReducers'; 
import { setInsuranceName } from './Reducers/GetInsuranceNameReducer';






const EducationQuotationCalculator: React.FC = () => {

  const dispatch = useAppDispatch();
   const[contributionYear,setContributionYear]=useState<number[]>([]);
   const [benefitsYearsArray,setBenefitsYearsArray]=useState<number[]>([]);
   const[ratePerMille,setRatePerMille]=useState(12159.441)
   const router=useRouter()
  

const [PremiumFrequencyArray, setPremiumFrequencyArray] = useState([
  "Select",
  "Monthly",
  "Quarterly",
  "Semi-annual",
  "Annually"
]);


const [CycleArray, setCycleArray] = useState([
  "Select",
  "Nursery",
  "Primary",
  "Secondary",
  "University"
]);

 

   useEffect(() => {
  const periods = [];
  for (let i = 3; i <= 300; i++) {
    periods.push(i);
  }
  
  setContributionYear(periods)
  }, []);


  useEffect(() => {
  const periods = [];
  for (let i = 0; i <= 6; i++) {
    periods.push(i);
  }
  
  setBenefitsYearsArray(periods)
  }, []);


  // ✅ Form data from EducationQuotationformdata
  const Premium = useAppSelector((state) => state.EducationQuotationformdata.Premium);
  const yearOfBirth = useAppSelector((state) => state.EducationQuotationformdata.yearOfBirth);
  const ContributionYears = useAppSelector((state) => state.EducationQuotationformdata.ContributionYears);
  const BenefitYears = useAppSelector((state) => state.EducationQuotationformdata.BenefitYears);
  const PremiumFrequency = useAppSelector((state) => state.EducationQuotationformdata.PremiumFrequency);
  const Cycle = useAppSelector((state) => state.EducationQuotationformdata.Cycle);
 
   console.log("cycle we have",Cycle)

  // ✅ Result data from EducationQuotationResult
 const Endowmentamountafterdeferredperiod = useAppSelector(state => state.EducationQuotationResult.Endowmentamountafterdeferredperiod);
  const Endowmentamountduringdeferredperiod = useAppSelector(state => state.EducationQuotationResult.Endowmentamountduringdeferredperiod);
 

   const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  // State for displaying messages
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
   console.log("incompleteFields",incompleteFields)

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Function to reset results to initial state
  const resetResults = () => {
    dispatch(SetEndowmentamountafterdeferredperiod(0));
    dispatch(SetEndowmentamountduringdeferredperiod(0));
  };

  // Calculate premium based on frequency
  const calculatePremiumByFrequency = () => {
    if (PremiumFrequency === "Monthly") {
      return Premium;
    } else if (PremiumFrequency === "Quarterly") {
      return Premium * 3;
    } else if (PremiumFrequency === "Semi-annual") {
      return Premium * 6;
    } else if (PremiumFrequency === "Annually") {
      return Premium * 12;
    }
    return Premium;
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (Cycle === "Select") {
      // Error handling for missing cycle
      setMessage('Please select a Cycle first');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return;
    }
    
    if (Endowmentamountafterdeferredperiod === 0 || Endowmentamountduringdeferredperiod === 0) {
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
      // Calculate age from year of birth
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(yearOfBirth);
      
      // Get premium based on frequency
      const premiumByFrequency = calculatePremiumByFrequency();
      
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
    const titleText = 'EDUCATION INSURANCE QUOTATION ';
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
    const rectWidth = textWidth + 116; // Adjust padding
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
    doc.text(`Premium (${PremiumFrequency}): `, 15, currentY)
    doc.text(`${Math.round(premiumByFrequency).toLocaleString('en-US')} RWF`, 90, currentY);
    currentY += 6;
  
    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setTextColor(0, 0, 0);
    doc.text(`Age: `, 15, currentY)
    doc.text(`${age} years`, 90, currentY);
    currentY += 6;
  
    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setTextColor(0, 0, 0);
    doc.text(`Contribution Years: `, 15, currentY)
    doc.text(`${ContributionYears} years`, 90, currentY);
    currentY += 6;
    
    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setTextColor(0, 0, 0);
    doc.text(`Benefit Years: `, 15, currentY)
    doc.text(`${BenefitYears} years`, 90, currentY);
    currentY += 6;
  
    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setTextColor(0, 0, 0);
    doc.text(`Premium Frequency: `, 15, currentY)
    doc.text(`${PremiumFrequency}`, 90, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setTextColor(0, 0, 0);
    doc.text(`Cycle: `, 15, currentY)
    doc.text(`${Cycle}`, 90, currentY);
    currentY += 6;
  
    ///////////////////////////// Covers //////////////////////////////////
   
    const CoverstitleText = 'COVERS';
    const CoverstitleX = doc.internal.pageSize.getWidth() / 2;
    const CoverstitleY = 113;
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
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text(`Endowment amount after differed period: `, 15, currentY)
    doc.text(`${Math.round(Endowmentamountafterdeferredperiod).toLocaleString('en-US')} RWF`, 120, currentY);
    currentY += 6;
  
    doc.setFont('helvetica', 'bold'); // Bold font weight
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text(`Endowment amount during deferred period: `, 15, currentY)
    doc.text(`${Math.round(Endowmentamountduringdeferredperiod).toLocaleString('en-US')} RWF`, 120, currentY);
    currentY += 6;
  
    //////////////////////////////
  
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
  
    ////////////////////////////////////////////////////////////////////////
  
    currentY += 12;
  
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
    doc.save('education_quotation.pdf');
    setIsDownloading(false);
    
    // Show success message
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

   const HandleCalculateQuotation = async () => {
  setIncompleteFields([]);
  
  if(yearOfBirth === "" && Premium === 0 && Cycle === "Select") {
    setIncompleteFields(prev => [...prev, "yearOfBirth", "Premium", "Cycle"]);
    return;
  }
  else if(yearOfBirth === "" && Premium === 0) {
    setIncompleteFields(prev => [...prev, "yearOfBirth", "Premium"]);
    return;
  }
  else if(yearOfBirth === "" && Cycle === "Select") {
    setIncompleteFields(prev => [...prev, "yearOfBirth", "Cycle"]);
    return;
  }
  else if(Premium === 0 && Cycle === "Select") {
    setIncompleteFields(prev => [...prev, "Cycle", "Premium"]);
    return;
  }
  else if(Premium === 0) {
    setIncompleteFields(prev => [...prev, "Premium"]);
    return;
  }
  else if(Cycle === "Select") {
    setIncompleteFields(prev => [...prev, "Cycle"]);
    return;
  }
  else if(yearOfBirth === "") {
    setIncompleteFields(prev => [...prev, "yearOfBirth"]);
    return;
  }
  else {
    try {
      // Calculate age from year of birth
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(yearOfBirth);
      
      const result = await fetch(`https://apps.prime.rw/customerbackendtest/api/rate_per_mille?age=${age}&premiumFrequency=${PremiumFrequency}&benefitYears=${BenefitYears}&contributionYears=${ContributionYears}`);
      const result2 = await result.json();
      
      setRatePerMille(result2.rate_per_mille);
      
      // Perform calculations
      const endowmentAmountAfterDeferredPeriod = Premium * result2.rate_per_mille / 1000;
      const endowmentAmountDuringDeferredPeriod = endowmentAmountAfterDeferredPeriod / 2;
      
      
      dispatch(SetEndowmentamountafterdeferredperiod(endowmentAmountDuringDeferredPeriod));
      dispatch(SetEndowmentamountduringdeferredperiod(endowmentAmountAfterDeferredPeriod));
      
    } catch (error) {
      console.error(error);
    }
  }
};

// Reset results whenever any input field changes
useEffect(() => {
  resetResults();
}, [yearOfBirth, Premium, PremiumFrequency, BenefitYears, ContributionYears, Cycle]);

// Remove the old useEffect that was resetting results
// useEffect(()=>{
// dispatch(SetEndowmentamountafterdeferredperiod(0))
// dispatch(SetEndowmentamountduringdeferredperiod(0))
// },[yearOfBirth,PremiumFrequency,BenefitYears,ContributionYears])

// Check if both endowment amounts are greater than zero
const canBuyInsurance = Endowmentamountafterdeferredperiod > 0 && Endowmentamountduringdeferredperiod > 0;

// Handle buy insurance click
const handleBuyInsurance = () => {
  if (canBuyInsurance) {
    router.push('/buyeducation');
    dispatch(setInsuranceName("Education Insurance"))
  } else {
    setMessage('Please calculate a valid quotation first. Both endowment amounts must be greater than zero.');
    setMessageType('error');
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  }
};


  return (
    <div className="  bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] mt-9 p-4">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-800 to-transparent"></div>
        <Home className="absolute bottom-10 right-10 w-32 h-32 text-white opacity-30" />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Education Quotation Calculator
              </h1>
             
            </div>

            <div className="space-y-6">
              {/* Basic Loan Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("Premium")?<span className=' text-red-500'>Premium is Required</span>:<span>Premium</span>}</label>
                  <input
                    type="number"
                    onChange={(e) => dispatch(setPremium(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("Premium")?'border-red-500':'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    placeholder='0 RF'
                    
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("yearOfBirth")?<span className=' text-red-500'>Year of Birth is Required</span>:<span>Year of Birth</span>}</label>
                  <input
                    type="number"
                    value={yearOfBirth}
                    onChange={(e) => dispatch(setYearOfBirth(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("yearOfBirth")?'border-red-500':'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Contribution Years</label>
                  <select
                    value={ContributionYears}
                    onChange={(e) => dispatch(setContributionYears(Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {
                        contributionYear.map((item)=>(
                <option value={item} className="text-black">{item}</option>
                        ))
                    }
                   
                   
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Benefit Years</label>
                  <select
                    value={BenefitYears}
                    onChange={(e) => dispatch(setBenefitYears(Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    {
                    benefitsYearsArray.map((item)=>(
                <option value={item} className="text-black">{item}</option>   
                        ))
                    }
                   
                  </select>
                </div>
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("Cycle")?<span className=' text-red-500'>Cycle is Required</span>:<span>Cycle</span>}</label>
                  <select name="" id=""
                    value={Cycle}
                    onChange={(e) => dispatch(setCycle((e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("Cycle")?' text-red-500':'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                   
                  >
                  
                  {CycleArray.map((cycl) => (
                <option className="text-black" key={cycl} value={cycl}>
                {cycl}
                </option>
                ))}
                 
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("loanPeriod")?<span className=' text-red-500'>Premium Frequency is Required</span>:<span>Premium Frequency</span>}</label>
                  <select name="" id=""
                    value={PremiumFrequency}
                    onChange={(e) => dispatch(setPremiumFrequency(e.target.value))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("loanPeriod")?' text-red-500':'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                   
                  >
                      

                {PremiumFrequencyArray.map((freq) => (
                <option className="text-black" key={freq} value={freq}>
                {freq}
                </option>
                ))}
                  
                   
                 
                  </select>
                </div>
              </div>

             

             

              <button
              onClick={HandleCalculateQuotation}  
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate </span>
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
           



            {/* Insurance Details */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4">Insurance Covers</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-white/80">
                  <div className="mb-2">Endowment amount after deferred period: <span className="text-white font-semibold">{formatCurrency(Endowmentamountduringdeferredperiod)}</span></div>
                  <div className="mb-2">Endowment amount during deferred period: <span className="text-white font-semibold">{formatCurrency(Endowmentamountafterdeferredperiod)}</span></div>
                 
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

            {/* Covers Section */}
            {/* <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center">Covers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {covers.map((cover, index) => (
              <div key={index} className="text-center text-white/90 text-sm  w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60">
              {cover}
              </div>
              ))}

              </div>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Show loan schedule
              </button> */}
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
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6v-2h12v2H4z" clipRule="evenodd" />
                   </svg>
                <span>Buy Education Insurance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationQuotationCalculator;