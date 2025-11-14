'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../hooks'
import AuthenticateChoice from './Authenticate/AuthenticateChoice'
import UmusigireExample from './UmusigireExample'
import ParentBeneficiaries from './ParentBeneficiaries'
import EducationSummary from './EducationSummary'
import Kwishyura from './Kwishyura'
import SavingInsuranceSummary from './SavingInsuranceSummary'
type Step = 1 | 2 | 3 | 4 | 5 | 6

const BuyInsuranceSavingSteps = () => {
  const [step, setStep] = useState<Step>(1)
  const [isValidating, setIsValidating] = useState(true)
  const [showRedirectMessage, setShowRedirectMessage] = useState(false)
  const router = useRouter()
  
  // Get quotation data from Redux to validate
  const savingsFormData = useAppSelector((state) => state.SavingQuotationformdata)
  const savingsResults = useAppSelector((state) => state.SavingQuotationResults)
  
  // Check if user has completed a quotation
  useEffect(() => {
    // Check if essential quotation data exists
    const hasQuotationData = 
      savingsFormData.Premium > 0 &&
      savingsFormData.ContributionYears > 0 &&
      savingsFormData.Names !== "" &&
      savingsResults.ValueAcquiredAtMaturity > 0
    
    if (!hasQuotationData) {
      // Show redirect message first
      setShowRedirectMessage(true)
      // Redirect to quotation page after showing message
      setTimeout(() => {
        router.push('/intego')
      }, 3000)
    } else {
      setIsValidating(false)
    }
  }, [savingsFormData, savingsResults, router])

  const handleNext = () => {
    if (step < 5) setStep((prev) => (prev + 1) as Step)
  }
  
  // Show redirect message if no quotation data
  if (showRedirectMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00aff3] via-blue-500 to-[#00aff3] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quotation Required</h2>
          <p className="text-gray-600 mb-6">
            You need to complete a quotation before purchasing insurance. 
            We'll redirect you to the quotation page.
          </p>
          <div className="flex items-center justify-center space-x-2 text-[#00B0EF]">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00B0EF]"></div>
            <span className="text-sm">Redirecting to quotation page...</span>
          </div>
          <button 
            onClick={() => router.push('/intego')}
            className="mt-6 px-6 py-2 bg-[#00B0EF] text-white rounded-lg hover:bg-[#0090cf] transition-colors"
          >
            Go Now
          </button>
        </div>
      </div>
    )
  }
  
  // Show loading while validating
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00B0EF] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Validating quotation data...</h2>
          <p className="text-gray-600">Please wait while we verify your information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-6 py-8  w-full max-w-4xl">
        {/* Breadcrumb */}
        <div className="text-gray-500 text-sm ">
          <span className="hover:text-gray-700 cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="hover:text-gray-700 cursor-pointer">Our products</span>
          <span className="mx-2">›</span>
          <span className="text-[#00B0EF] font-medium">Intego</span>
        </div>

        {/* Title */}
        
        <h1 className="text-4xl font-bold  text-gray-900 mb-12">Buy Intego Insurance.</h1>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-16 px-4">
          <div className="flex items-center w-full max-w-4xl">
            <StepIndicator 
              number={1} 
              label="Authenticate" 
              active={step === 1} 
              completed={step > 1}
            />

            {/* Line 1: Between Authenticate and Umusigire */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={2} 
              label={
                <span className="flex flex-col sm:flex-row sm:gap-1">
                  <span>Next of Kin</span>
                  <span>(Umusigire)</span>
                </span>
              } 
              active={step === 2} 
              completed={step > 2}
            />

            {/* Line 2: Between Umusigire and Parent Beneficiaries */}
            {/* <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={3} 
              label="Parent Beneficiaries" 
              active={step === 3} 
              completed={step > 3}
            /> */}

            {/* Line 3: Between Parent Beneficiaries and Summary */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={3} 
              label="Summary" 
              active={step === 3} 
              completed={step > 3}
            />
            
            {/* Line 4: Between Summary and Kwishyura */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={4} 
              label="Payment" 
              active={step === 4} 
              completed={false}
            />
          </div>
        </div>

        {/* Step 1 Content */}
         {step === 1 && (
          <div className="max-w-2xl mx-auto text-center">
           <AuthenticateChoice onAuthenticated={() => setStep(2)} />
          </div>
        )}

        {/* Step 2: Umusigire */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto text-center">
            <UmusigireExample  HandleNextSteps={()=>setStep(3)}/>
          </div>
        )}

        {/* Step 3: Parent Beneficiaries */}
        {/* {step === 3 && (
          <div className="max-w-full mx-auto text-center">
            <ParentBeneficiaries
              title="Parent Beneficiaries Information"
              onNext={() => setStep(4)}
            />
          </div>
        )} */}
        
        {/* Step 4: Summary */}
        {step === 3 && (
           <div className="max-w-full mx-auto text-center">
            <SavingInsuranceSummary
             onNext={() => setStep(4)}
            />
          </div>
        )}

        {/* Step 5: Kwishyura */}
        {step === 4 && (
         <Kwishyura
  
/>
        )}
      </div>
    </div>
  )
}

export default BuyInsuranceSavingSteps

type StepIndicatorProps = {
  number: number
  label: React.ReactNode
  active: boolean
  completed?: boolean
}

// SVG Icons for each step
const getStepIcon = (stepNumber: number, isCompleted: boolean, isActive: boolean) => {
  const iconClass = `w-4 h-4 sm:w-5 sm:h-5 ${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-gray-500'}`
  
  if (isCompleted) {
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  }

  switch (stepNumber) {
    case 1: // Authenticate - User icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    case 2: // Umusigire (Next of kin) - People/Family icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )
    //   case 3: // Parent Beneficiaries - Family/Parents icon
    //   return (
    //     <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
    //       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    //     </svg>
    //   )
    case 3: // Summary - Document/List icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
        </svg>
      )
    case 4: // Kwishyura (Payment) - Credit card icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6v-2h12v2H4z" clipRule="evenodd" />
        </svg>
      )
    default:
      return null
  }
}

const StepIndicator = ({ number, label, active, completed = false }: StepIndicatorProps) => (
  <div className="flex flex-col items-center min-w-0 flex-shrink-0 space-y-1">
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-semibold transition-all ${
        completed
          ? 'bg-green-500 text-white'
          : active
          ? 'bg-[#00B0EF] text-white'
          : 'bg-gray-200 text-gray-500'
      }`}
    >
      {getStepIcon(number, completed, active)}
    </div>
    <span
      className={`text-xs font-medium text-center whitespace-nowrap ${
        active ? 'text-[#00B0EF]' : completed ? 'text-green-500' : 'text-[#003366]'
      }`}
    >
      {label}
    </span>
  </div>
)