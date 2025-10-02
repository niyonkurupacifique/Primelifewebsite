'use client';

import React, { useState } from "react";

const ComplaintsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agree: false,
    isCustomer: "",   // "yes" | "no"
    products: "",
    message:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // If the user switches to "no", clear any products entered earlier
      ...(name === "isCustomer" && value === "no" ? { products: "" } : {}),
    }));
  };

  return (
    <div className=" max-w-lg w-full p-6 rounded-md shadow-sm border border-[#EBEDF0]">
      <h2 className="text-xl font-semibold text-[#003366] mb-6">Complaints Form</h2>

      {/* Full name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">Full names</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="KANAKA Joseph"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="kanaka@gmail.com"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">Contact number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+250 788 888 888"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Are you a customer? */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-2">
          Are you a Prime Life Insurance customer?
        </label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="isCustomer"
              value="yes"
              checked={formData.isCustomer === "yes"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="isCustomer"
              value="no"
              checked={formData.isCustomer === "no"}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Products — only when “Yes” */}
      {formData.isCustomer === "yes" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#003366] mb-1">
            Enter your product(s)
          </label>
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="e.g., Family Protection, Education Plan"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">Message</label>
        <textarea
       name="message"
      value={formData.message}
     placeholder="Enter your message here..."
    rows={4}
    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
     />

      </div>

      {/* Agree to terms */}
      <div className="flex items-start space-x-2 mt-4">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mt-1"
        />
        <label className="text-sm text-gray-700">
          I agree to Prime Life Insurance’s terms of use
        </label>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="button"
          style={{ backgroundColor: "#00AFF3" }}
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                     font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
        >
          Submit my details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ComplaintsForm;
