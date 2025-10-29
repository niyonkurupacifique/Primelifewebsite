'use client';

import React, { useState, useRef } from "react";

const ComplaintsForm: React.FC = () => {
  const formTopRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agree: false,
    isCustomer: "",
    products: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "isCustomer" && value === "no" ? { products: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    if (formData.isCustomer === 'yes' && !formData.products) {
      setSubmitStatus({ type: 'error', message: 'Please enter your products' });
      return;
    }

    if (!formData.agree) {
      setSubmitStatus({ type: 'error', message: 'Please agree to the terms of use' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Construct plain text email body with all complaint details
      let emailBody = `Dear Sir,

A new complaints form submission has been received with the following details:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPLAINT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.fullName}
Email Address: ${formData.email}
Contact Number: ${formData.phone}
Is Prime Life Insurance Customer: ${formData.isCustomer}`;

      // Add products if customer selected "yes"
      if (formData.isCustomer === 'yes') {
        emailBody += `\nProducts: ${formData.products}`;
      }

      emailBody += `

Message:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Regards,
${formData.fullName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

      // Prepare API request
      const requestBody = {
        email: "complaints@prime.rw",
        subject: `Complaint via Website - ${formData.fullName}`,
        body: emailBody
      };

      const API_URL = 'https://apps.prime.rw/onlineservicesapi/DigitalServices/sendEmailNotification';
      console.log('📤 Sending complaint email via API:', API_URL);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📥 Response status:', response.status);
      const responseData = await response.json();
      console.log('📥 Response data:', responseData);

      // Check if request was successful
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Your query was successfully sent.' });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          agree: false,
          isCustomer: "",
          products: "",
          message: ""
        });
        // Scroll to top to show success message
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: responseData.message || 'Message could not be sent. Please try again.' 
        });
        // Scroll to top to show error message
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error: any) {
      console.error('❌ Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Message could not be sent. Please try again.' });
      // Scroll to top to show error message
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formTopRef} onSubmit={handleSubmit} className="max-w-lg w-full p-6 rounded-md shadow-sm border border-[#EBEDF0]">
      <h2 className="text-xl font-semibold text-[#003366] mb-6">Complaints Form</h2>

      {/* Success/Error Messages */}
      {submitStatus.type === 'success' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Success: {submitStatus.message}
        </div>
      )}
      {submitStatus.type === 'error' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {submitStatus.message}
        </div>
      )}

      {/* Full name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">
          Full names <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="KANAKA Joseph"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="kanaka@gmail.com"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="0788 123 456"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Are you a Prime Life Insurance customer? */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-2">
          Are you a Prime Life Insurance customer? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isCustomer"
              value="yes"
              checked={formData.isCustomer === "yes"}
              onChange={handleChange}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="isCustomer"
              value="no"
              checked={formData.isCustomer === "no"}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      {/* Products — only when "Yes" */}
      {formData.isCustomer === "yes" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#003366] mb-1">
            Enter your product(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="e.g., Family Protection, Education Plan"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Message */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#003366] mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message here..."
          rows={4}
          required
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
          required
          className="mt-1"
        />
        <label className="text-sm text-gray-700">
          I agree to Prime Life Insurance's terms of use <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          style={{ backgroundColor: "#00AFF3" }}
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                     font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit my details'}
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
    </form>
  );
};

export default ComplaintsForm;
