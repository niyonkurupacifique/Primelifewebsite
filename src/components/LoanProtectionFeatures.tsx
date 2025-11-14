import React from 'react';

const LoanInsuranceFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Features Card */}
        <div style={{ border: '1px' }} className="bg-white rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Loan Insurance</h2>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              If you find yourself in challenging financial times, you may need to borrow money. But what do you do when your circumstances change and you can no longer cover the repayments? Prime Loan Protection Insurance provides financial support when you need it most. And if you are disabled or pass away, Prime repays the outstanding amount. This protects your dependents from defaulting on the loan when you’re not able to provide for them
            </p>
          </div>

        </div>

        {/* How it Works Card */}
        <div style={{ border: '1px' }} className="bg-white rounded-lg  p-6 border  border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Loan Protection Insurance</h2>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Prime Loan Protection Insurance gives you peace of mind that your outstanding payments will be settled in case of the following events:{" "}
              <span className="text-black font-bold">Death, </span>
              <span className="text-black font-bold">Total permanent disability, </span>
              <a
                href="/List of Critical Illnesses.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#003366] underline hover:text-blue-800 transition-colors duration-200"
              >
                Critical illness
              </a>
              <span className="text-black font-bold">, Retrenchment</span>
            </p>


          </div>


        </div>

        {/* Special Benefits Card */}
        <div style={{ border: '1px' }} className="bg-white rounded-lg  p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Special benefits</h2>

          <div className="flex items-start space-x-3 mb-4">
            <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The product policy prevents your properties from being auctioned off. During unfortunate times, the loan protection insurance protects the subscriber and his/her family from the debts that would make the family struggle to pay off without a sufficient standard level of income. The loan protection insurance plays an essential role to provide peace of mind and safeguard the subscriber in a worst case scenario.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanInsuranceFeatures;