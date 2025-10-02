import React from 'react';

const NkunganireInsuranceFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Product Features Card */}
       
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product Features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
            <span className=' text-black font-bold'> Interest on savings:</span> Annual interest is generated on savings deposited
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
            <span className=' text-black font-bold'> Waiting period:</span> There is no waiting period in case of accident but 2 months for other cases.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'>Partial Surrender on savings:</span>  Allowed after 3 years.
            </p>
          </div>
           <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'>Total Surrender on savings:</span>  Allowed after 3 years.
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

export default NkunganireInsuranceFeatures;