import React from 'react';

const EducationInsuranceFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Features Card */}
        <div style={{border:'1px'}} className=" shadow-md rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Subscriber can insure his/her future education or a child to be born.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Premium payment options: monthly, quarterly, by semester, annually or a single payment.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              And much more...
            </p>
          </div>
        </div>

        {/* How it Works Card */}
        <div style={{border:'1px'}} className="shadow-md rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">How it works</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Parent select the education level to secure: Nursery, Primary, Secondary or University.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Parent starts contributing earlier for the entire predicted education cost in monthly instalments until the child reach secured level.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Prime Life Insurance issues predicted tuition fees to the insurance beneficiary at the beginning of every trimester/ semester/ year of the selected level.
            </p>
          </div>
        </div>

        {/* Special Benefits Card */}
        <div style={{border:'1px'}} className="shadow-md rounded-lg  p-6 border border-gray-200">
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
        </div>
      </div>
    </div>
  );
};

export default EducationInsuranceFeatures;