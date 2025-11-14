'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Download, Home } from 'lucide-react';
import { useAppSelector ,useAppDispatch} from '../hooks';

 import {
  SetNetPremium,
  SetRetrenchmentPremium,
  SetAdministrationFees,
  SetTotalPremiumJointBorrowers,
  SetTotalPremiumSingleBorrower,
  setCovers
} from './Reducers/loanQuotationResults'; 

import {
  setYearOfBirth,
  setLoanType,
  setLoanPeriod,
  setLoanAmount,
  setPremiumFrequency,
  setIsJoint,
  setCoverRetrenchment,
  setFormData
} from './Reducers/loanQuotationFormFieldsReducer';  




const LoanQuotationCalculator: React.FC = () => {

  const dispatch = useAppDispatch();

  const [loanPeriodArray, setLoanPeriodArray] = useState<number[]>([]);

   useEffect(() => {
  const periods = [];
  for (let i = 0; i <= 300; i++) {
    periods.push(i);
  }
  setLoanPeriodArray(periods);
  }, []);

     



  // ✅ Form data from loanQuotationFormFieldsReducer (state.formdata)
  const yearOfBirth = useAppSelector((state) => state.formdata.yearOfBirth);
  const loanType = useAppSelector((state) => state.formdata.loanType);
  //console.log("loantype is",loanType)
  const loanPeriod = useAppSelector((state) => state.formdata.loanPeriod);
  const loanAmount = useAppSelector((state) => state.formdata.loanAmount);
  const premiumFrequency = useAppSelector((state) => state.formdata.premiumFrequency);
  //console.log("premium frequency is",premiumFrequency)
  const isJoint = useAppSelector((state) => state.formdata.isJoint);
  const coverRetrenchment = useAppSelector((state) => state.formdata.coverRetrenchment);
  const interestRate = useAppSelector((state) => state.formdata.interestRate);

  // ✅ Result data from loanQuotationResults (state.Results)
 const NetPremium = useAppSelector(state => state.Results.NetPremium);
  const RetrenchmentPremium = useAppSelector(state => state.Results.RetrenchmentPremium);
  const AdministrationFees = useAppSelector(state => state.Results.AdministrationFees);
  const TotalPremiumJointBorrowers = useAppSelector(state => state.Results.TotalPremiumJointBorrowers);
  const TotalPremiumSingleBorrower = useAppSelector(state => state.Results.TotalPremiumSingleBorrower);
  const covers = useAppSelector(state => state.Results.covers);

   const [incompleteFields, setIncompleteFields] = useState<string[]>([]);
   //console.log("incompleteFields",incompleteFields)

  useEffect(()=>{
      dispatch(setLoanPeriod(0))
      
     },[loanType,premiumFrequency])

 useEffect(() => {
  if (loanType === "CreditLine" && premiumFrequency !== "Single") {
    dispatch(setPremiumFrequency("Single"));
  }
}, [loanType, premiumFrequency, dispatch]);



    const HandleCalculateQuotation=async()=>{
      
    setIncompleteFields([]);

    if(yearOfBirth=="" && loanAmount==0 && loanPeriod==0 ){
      setIncompleteFields(prev => [...prev, "yearOfBirth"])
      setIncompleteFields(prev => [...prev, "loanAmount"])
      setIncompleteFields(prev => [...prev, "loanPeriod"])
    return;
    }

    if(yearOfBirth=="" && loanAmount==0  ){
      setIncompleteFields(prev => [...prev, "yearOfBirth"])
      setIncompleteFields(prev => [...prev, "loanAmount"])
    
    return;
    }

     if(yearOfBirth=="" &&  loanPeriod==0  ){
      setIncompleteFields(prev => [...prev, "yearOfBirth"])
       setIncompleteFields(prev => [...prev, "loanPeriod"])
    
    return;
    }
     if(loanAmount==0 && loanPeriod==0 ){
    
      setIncompleteFields(prev => [...prev, "loanAmount"])
      setIncompleteFields(prev => [...prev, "loanPeriod"])
    return;
    }

    


  if (yearOfBirth==""){
    setIncompleteFields(prev => [...prev, "yearOfBirth"])
    return;
  }
  if (loanAmount==0){
    setIncompleteFields(prev => [...prev, "loanAmount"])
    return
  }
  if (loanPeriod==0){
    setIncompleteFields(prev => [...prev, "loanPeriod"])
    return
  }

  else{
    try {
        const result=await fetch(`https://apps.prime.rw/customerbackend/api/loan-protection?yearOfBirth=${yearOfBirth}&loanPeriod=${loanPeriod}&premiumFrequency=${premiumFrequency}&loanAmount=${loanAmount}&loanType=${loanType}&isJoint=${isJoint}&coverRetrenchment=${coverRetrenchment}`)
        const result2=await result.json()
        // //console.log("rate per mille from api:",result2)
        dispatch(SetNetPremium(result2.netPremium))
        dispatch(SetAdministrationFees(result2.administrationFees))
        dispatch(SetTotalPremiumSingleBorrower(result2.totalPremiumSingleBorrower))
        dispatch(SetTotalPremiumJointBorrowers(result2.totalPremiumJointBorrowers))
        dispatch(SetRetrenchmentPremium(result2.retrenchmentPremium))
        // //console.log("covers is",result2.covers)
        if(Array.isArray(result2.covers)){
       dispatch(setCovers(result2.covers)) 
        //  setCoverAvailable(true)
        }
        else{
           dispatch(setCovers([result2.covers]))
            // setCoverAvailable(true)
        }
          
        } catch (error) {
         // console.error(error)
        }

  }
        
      
        
   }





  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] mt-9 p-4">
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
                Loan Protection Quotation
              </h1>
             
            </div>

            <div className="space-y-6">
              {/* Basic Loan Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-white/80 text-sm mb-2">Loan Type</label>
                  <select
                    value={loanType}
                    onChange={(e) => dispatch(setLoanType(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    <option value="Decreasing" className="text-black">Decreasing</option>
                    <option value="CreditLine" className="text-black">Credit line</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("loanAmount")?<span className=' text-red-500'>Loan Amount is Required</span>:<span>Loan Amount</span>}</label>
                  <input
                    type="number"
            
                   onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("loanAmount")?'border-red-500':'border-white/30'} rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60`}
                    
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">{incompleteFields.includes("loanPeriod")?<span className=' text-red-500'>Loan Period is Required</span>:<span>Loan Period (Months)</span>}</label>
                  <select name="" id=""
                    value={loanPeriod}
                    onChange={(e) => dispatch(setLoanPeriod(Number(e.target.value)))}
                    className={`w-full px-4 py-3 bg-white/20 border ${incompleteFields.includes("loanPeriod")?' text-red-500':'border-white/30'} rounded-lg text-white focus:outline-none focus:border-white/60`}
                  
                  
                  >
                  {
                  loanType==="CreditLine" && premiumFrequency==="Single"  && loanPeriodArray.filter(data=>data<13).map((item)=>{
        
                 return <option className=' text-black' value={item}>{item}</option>
                 })
      
                  }
                  {
                 (loanType==="Decreasing" && premiumFrequency==="Annual")  && loanPeriodArray.filter(data=>data>23).map((item)=>{
        
                  return <option className='text-black' value={item}>{item}</option>
                  })
      
                  }
                 {
                (loanType==="Decreasing" && premiumFrequency==="Single")  && loanPeriodArray.map((item)=>{
        
               return <option className='text-black' value={item}>{item}</option>
               })
      
                  }
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
                <div>
                  <label className="block text-white/80 text-sm mb-2">Premium Frequency</label>
                    <select name="" id=""
                    value={premiumFrequency}
                    onChange={(e)=>{dispatch(setPremiumFrequency(e.target.value))}}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                    >
                    {
               loanType==="CreditLine"?( <option value="Single">Single</option>):( <><option value="Single">Single</option>
              <option className='text-black' value="Annual">Annual</option>
                </> )
                   }

                    </select>
                    
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Cover Retrenchment</label>
                  <select
                    value={coverRetrenchment}
                    onChange={(e) => dispatch(setCoverRetrenchment(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    <option value="False" className="text-black">No</option>
                    <option value="True" className="text-black">Yes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Is Joint?</label>
                  <select
                    value={isJoint}
                    onChange={(e) => dispatch(setIsJoint(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60"
                  >
                    <option value="False" className="text-black">No</option>
                    <option value="True" className="text-black">Yes</option>
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
              <h3 className="text-white font-semibold mb-4">Insurance Premium Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-white/80">
                  <div className="mb-2">Net Premium: <span className="text-white font-semibold">{formatCurrency(NetPremium)}</span></div>
                  <div className="mb-2">Retrenchment Premium: <span className="text-white font-semibold">{formatCurrency(RetrenchmentPremium)}</span></div>
                  <div className="mb-2">Administration Fees: <span className="text-white font-semibold">{formatCurrency(AdministrationFees)}</span></div>
                </div>
                <div className="text-white/80">
                  <div className="mb-2">Total Premium Joint: <span className="text-white font-semibold">{formatCurrency(TotalPremiumJointBorrowers)}</span></div>
                  <div className="mb-2">Total Premium Single: <span className="text-white font-semibold">{formatCurrency(TotalPremiumSingleBorrower)}</span></div>
                </div>
              </div>
            </div>

            {/* Covers Section */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center">Covers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {covers.map((cover, index) => (
              <div key={index} className="text-center text-white/90 text-sm  w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60">
              {cover}
              </div>
              ))}

              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Show loan schedule
              </button> */}
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanQuotationCalculator;