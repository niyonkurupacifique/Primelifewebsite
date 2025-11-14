'use client';

import React from 'react';

const FamilyContractFormat = () => {
  const languages = [
    { name: 'Kinyarwanda', code: 'rw' },
    { name: 'English', code: 'en' },
  ];

  const contractFiles: Record<string, string> = {
    rw: '/Family_Kinyarwanda.pdf',
    en: '/Family_English.pdf',
  };

  const proposalForms = [
    {
      product: 'Family',
      url: 'https://apps.prime.rw/customerportal/files/Family_Insurance_27_12_2023_Version_Kinyarwanda.pdf',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1  className="text-3xl font-bold text-[#00AFF3] mb-4">Documents:</h1>
        <div className="w-32 h-1 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Standing Order Column */}
        <div className="rounded-lg p-6 border border-slate-300/40 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-[#00AFF3] mb-4">Standing Order</h2>
          <ul className="space-y-3">
            {[
              { label: 'BPR - Standing Order Form', url: 'https://apps.prime.rw/customerportal/files/bpr%20Bank%20-%20STANDING%20ORDER%20FORM.pdf' },
              { label: 'Salary Deduction Form', url: 'https://apps.prime.rw/customerportal/files/OPS%20FORM%20%202024_0001.pdf' },
              { label: 'EQUITY - Standing Order Form', url: 'https://apps.prime.rw/customerportal/files/STO%20EQUITY%20FORM%202024_0001.pdf' },
              { label: 'Other Banks-Standing Order', url: 'https://apps.prime.rw/customerportal/files/STO%20FORM%202024_0001.pdf' },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="text-gray-800">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border-2 border-yellow-400 text-gray-700 rounded-md text-sm font-semibold hover:bg-yellow-50 transition-colors duration-200"
                  >
                    View
                  </a>
                  <a
                    href={item.url}
                    download
                    className="px-3 py-1.5 bg-[#00AFF3] text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contract Format Column */}
        <div className="rounded-lg p-6 border border-slate-300/40 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-[#00AFF3] mb-4">Contract Format</h2>
          <ul className="space-y-3">
            {languages.map((language) => (
              <li key={language.code} className="flex items-center justify-between">
                <span className="text-gray-800">{language.name}</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={contractFiles[language.code]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border-2 border-yellow-400 text-gray-700 rounded-md text-sm font-semibold hover:bg-yellow-50 transition-colors duration-200"
                  >
                    View
                  </a>
                  <a
                    href={contractFiles[language.code]}
                    download
                    className="px-3 py-1.5 bg-[#00AFF3] text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Proposal Form Column */}
        <div className="rounded-lg p-6 border border-slate-300/40 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-[#00AFF3] mb-4">Proposal Form</h2>
          <ul className="space-y-3">
            {proposalForms.map((item) => (
              <li key={item.product} className="flex items-center justify-between">
                <span className="text-gray-800">{item.product}</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border-2 border-yellow-400 text-gray-700 rounded-md text-sm font-semibold hover:bg-yellow-50 transition-colors duration-200"
                  >
                    View
                  </a>
                  <a
                    href={item.url}
                    download
                    className="px-3 py-1.5 bg-[#00AFF3] text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FamilyContractFormat;