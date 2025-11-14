'use client';

import React from 'react';
import ParentBeneficiaries from './ParentBeneficiaries';
import Header from './Header';
import Footer from './Footer';

const ParentBeneficiariesDemo = () => {
  const handleNext = () => {
    //console.log('Moving to next step');
    alert('Moving to next step!');
  };

  const handleSubmit = (data: any) => {
    //console.log('Submitted data:', data);
  };

  const handleCancel = () => {
    //console.log('Cancelled');
    alert('Cancelled!');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Parent Beneficiaries Component Demo
          </h1>
          <ParentBeneficiaries
            title="Parent Beneficiaries Information"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParentBeneficiariesDemo;
