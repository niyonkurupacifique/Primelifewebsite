import React from 'react';

const IkiminaCyacuFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Features Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product Features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className=' text-black font-bold'>Pure Savings Product:</span> IKIMINA CYACU is a pure savings insurance product that helps clients keep aside emergency funds.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>3% Annual Interest:</span> Emergency funds generate 3% annual interest on savings deposited.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>3-Month Withdrawal Period:</span> Clients can only start withdrawing savings after 3 months from initial deposit.
            </p>
          </div>
        </div>

        {/* How to Subscribe Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Steps to Subscribe for Ikimina Cyacu</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className=' text-black font-bold'>Dial *177#</span> on your mobile phone
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Choose 1) Ubuzima no Kwizigamira</span> from the menu options
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Choose 1) Ikimina Cyacu</span> and follow the instructions provided
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IkiminaCyacuFeatures;
