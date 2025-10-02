import React from 'react';

const EmployeeInsuranceFeatures = () => {
  return (
    <div className=" max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Features Card */}
        <div style={{border:'1px'}} className=" rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Product features</h2>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'>Savings Feature:</span> The product allows clients to save funds alongside their insurance coverage.
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className='text-black font-bold '> Parental Inclusion for Singles:</span> Single employees can include their parents (under 65 years old) as dependents.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'> Extended Coverage for Married Employees:</span> Married employees can add parents and in-laws by paying an additional 2,500 FRW monthly premium.
            </p>
          </div>

           <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'> Interest on savings:</span> Annual interest is generated on savings deposited.
            </p>
          </div>

          <div className="flex items-start space-x-3">
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
             <span className=' text-black font-bold'>Partial Surrender on savings:</span>Allowed after 3 years.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
             <span className=' text-black font-bold'>Total Surrender on savings: </span>Allowed after 3 years.
            </p>
          </div>

        </div>

       
       {/* How it Works Card */}
<div style={{ border: '1px' }} className=" rounded-lg p-6 border border-gray-200">
  <h2 className="text-2xl font-bold text-[#003366] mb-6">How it works</h2>

  {/* Employee Option 1 */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Employee Option 1</h3>
    <p className="text-gray-700 mb-2">Monthly Premium: <strong>25,000 Frw</strong> (Risk: 9,410 Frw, Savings: 15,590 Frw)</p>
    <p className="text-gray-700 mb-4">@500,000 Frw estimated minimum salary</p>
    <ul className="text-gray-700 list-disc pl-5 space-y-1">
      <li><strong>Employee Death:</strong> 15 Salaries</li>
      <li><strong>Total Permanent Disability (≥70%):</strong> 15 Salaries</li>
      <li><strong>Partial Permanent Disability:</strong> 15 Salaries × Disability %</li>
      <li><strong>Loss Of Income:</strong> 15 Salaries × 75%</li>
      <li><strong>Spouse or Child Death:</strong> 1,000,000 Frw</li>
    </ul>
  </div>

  {/* Employee Option 2 */}
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Employee Option 2</h3>
    <p className="text-gray-700 mb-2">Monthly Premium: <strong>15,000 Frw</strong> (Risk: 5,000 Frw, Savings: 10,000 Frw)</p>
    <p className="text-gray-700 mb-4">@300,000 Frw estimated minimum salary</p>
    <ul className="text-gray-700 list-disc pl-5 space-y-1">
      <li><strong>Employee Death:</strong> 5 Salaries</li>
      <li><strong>Total Permanent Disability (≥70%):</strong> 5 Salaries</li>
      <li><strong>Partial Permanent Disability:</strong> 5 Salaries × Disability %</li>
      <li><strong>Loss Of Income:</strong> 5 Salaries × 75%</li>
      <li><strong>Spouse or Child Death:</strong> 500,000 Frw</li>
    </ul>
      </div>
      </div>
       
      </div>
    </div>
  );
};

export default EmployeeInsuranceFeatures;