import React from 'react';


const IntegoInsuranceFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Features Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold font-black'>Interest on savings:</span> Annual interest is generated on savings deposited.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold font-black'> Waiting period:</span>There is no waiting period in case of accident but 2 months for other cases.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold font-black'> Advance/Partial Surrender:</span> Allowed after 3 years
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold font-black'>Total Surrender:</span> Allowed after 3 years
            </p>
          </div>
        </div>

        {/* How it Works Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">How it works</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Subscriber has the choice to select the number of years to save considering target amount desired.
The client saves the amount of money he/she wants.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold font-black'>Covered</span>  PAYOUT.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold font-black'> Death Sum Insured </span>	10 Years Contribution.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold font-black'> Permanent Disability [Rate {'>'}=70%] </span>	10 Years Contribution.
            </p>
          </div>
        </div>

        {/* Special Benefits Card */}
        {/* <div style={{border:'1px'}} className="bg-white rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Special benefits</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              All deposited premiums generate an annual compound interest.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              In case of parent's death or total permanent disability with rate of 70% and above, premium payment stops and every year, Prime Life pays 50% of agreed tuition fees to help the child reaching selected level and 100% school fees is also paid for the insured level.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IntegoInsuranceFeatures;