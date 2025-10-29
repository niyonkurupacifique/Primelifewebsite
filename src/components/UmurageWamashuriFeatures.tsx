import React from 'react';

const UmurageWamashuriFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Features Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product Features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className=' text-black font-bold'>Interest on savings:</span> Annual interest is generated on savings deposited
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Waiting period:</span> There is no waiting period in case of accident but 3 months for other cases.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Partial surrender:</span> Applicable after 2 years [50% of Total Contribution]
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Contribution period:</span> Between 3 to 30 years
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>School fees Payment period:</span> Between 1 to 6 years
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Covers:</span> Death and Total and Permanent disability
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Policy lapsation:</span> Umurage policy never lapse
            </p>
          </div>
        </div>

        {/* How to Subscribe Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Steps to Subscribe for Umurage w'Amashuri</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className=' text-black font-bold'>Dial *177#</span> on your mobile phone
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Choose 4) Umurage w'Amashuri</span> and follow instructions
            </p>
          </div>
        </div>

        {/* Product Description Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">About Umurage w'Amashuri</h2>
          
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed mb-4">
              Umurage w'Amashuri is an education insurance that is taken by a parent, future parent or guardian to paying for children's education in the future. Whether parents are alive or not, children study in the school of parent dreams.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Competitive Interest:</span> All deposited premiums generate a competitive annual compound interest and 100% school fees is paid by Prime Life Insurance for the insured level.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className='text-black font-bold'>Death/Disability Protection:</span> In case of parent's death or total permanent disability [rate ≥70%], premium payment stops and every year Prime Life pays 50% of agreed tuition fees as INDEZO to help the child reaching selected level and 100% school fees are also paid for the insured level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmurageWamashuriFeatures;
