'use client';

import { useState } from 'react'
import AuthenticateChoice from './Authenticate/AuthenticateChoice'
import Umusigire from './Umusigire'
import UmusigireExample from './UmusigireExample'
import Children from './Children'
import EducationSummary from './EducationSummary'
import KwishyuraAdvanced from './KwishyuraAdvanced'
import Kwishyura from './Kwishyura'
type Step = 1 | 2 | 3 | 4| 5

const BuyInsuranceEducationSteps = () => {
  const [step, setStep] = useState<Step>(1)

  const handleNext = () => {
    if (step < 3) setStep((prev) => (prev + 1) as Step)
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
          <span className="text-[#00B0EF] font-medium">Education Insurance</span>
        </div>

        {/* Title */}
        
        <h1 className="text-4xl font-bold  text-gray-900 mb-12">Buy education insurance.</h1>

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
              label="Umusigire" 
              active={step === 2} 
              completed={step > 2}
            />

            {/* Line 2: Between Umusigire and Child */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={3} 
              label="Children" 
              active={step === 3} 
              completed={step > 3}
            />

            {/* Line 3: Between Child and Summary */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={4} 
              label="Summary" 
              active={step === 4} 
              completed={step > 4}
            />
            
            {/* Line 4: Between Summary and Kwishyura */}
            <div className="flex-1 h-px bg-black mx-2 sm:mx-3 md:mx-4 lg:mx-6"></div>
            <StepIndicator 
              number={5} 
              label="Kwishyura" 
              active={step === 5} 
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

        {/* Placeholder content for other steps */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto text-center">
            <UmusigireExample  HandleNextSteps={()=>setStep(3)}/>
          </div>
        )}
        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center">
            <Children 
              title="Child Information for Education Insurance"
              onNext={() => setStep(4)}
            />
          </div>
        )}
        
        {step === 4 && (
           <div className="max-w-full mx-auto text-center">
            <EducationSummary
             onNext={() => setStep(5)}
            />
          </div>
        )}

        {step === 5 && (
         <Kwishyura
  
/>
        )}
      </div>
    </div>
  )
}

export default BuyInsuranceEducationSteps

type StepIndicatorProps = {
  number: number
  label: string
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
      case 3: // Children - Education/Student icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
        </svg>
      )
    case 4: // Summary - Document/List icon
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
        </svg>
      )
    case 5: // Kwishyura (Payment) - Credit card icon
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