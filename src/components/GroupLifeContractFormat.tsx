'use client';

import React from 'react';

const GroupLifeContractFormat = () => {
  const languages = [
    { name: 'Kinyarwanda', code: 'rw' },
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' }
  ];

  const handleView = (language:string) => {
    console.log(`Viewing ${language} contract`);
  };

  const handleDownload = (language:string) => {
    console.log(`Downloading ${language} contract`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1  className="text-3xl font-bold text-[#00AFF3] mb-4">Group Contract Format:</h1>
        <div className="w-32 h-1 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {languages.map((language) => (
          <div 
            key={language.code} 
            className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#00AFF3] mb-6">{language.name}</h2>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleView(language.name)}
                  className="px-6 py-3 bg-white border-2 border-yellow-400 text-gray-700 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  View
                </button>
                
                <button
                  onClick={() => handleDownload(language.name)}
                  className="px-6 py-3 bg-[#00AFF3] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLifeContractFormat;