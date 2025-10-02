'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroFAQS from './HeroFAQ';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([3, 6]); // Start with the last item in each column open

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What types of insurance products does Prime Life Insurance offer?",
      answer: "Prime Life Insurance offers a comprehensive range of insurance products including Family Insurance, Education Insurance, Employee Protection, Group Life Insurance, Loan Protection, and Nkunganire Insurance. Each product is designed to meet specific needs and provide financial security for different life stages."
    },
    {
      id: 2,
      question: "How do I file a claim with Prime Life Insurance?",
      answer: "To file a claim, you can contact us through our toll-free number 1320, visit our office, or submit your claim online through our customer portal. You'll need to provide your policy number, relevant documentation, and details about the incident. Our claims team will guide you through the entire process."
    },
    {
      id: 3,
      question: "What documents do I need to purchase an insurance policy?",
      answer: "The required documents vary by product type, but generally include a valid ID (national ID or passport), proof of income, medical examination results (for some products), and beneficiary information. Our agents will provide you with a complete list of required documents during the application process."
    },
    {
      id: 4,
      question: "Can I change my beneficiaries after purchasing a policy?",
      answer: "Yes, you can change your beneficiaries at any time during the policy term. You'll need to submit a written request along with the new beneficiary's information and your policy details. The change will be effective once approved and processed by our team."
    },
    {
      id: 5,
      question: "What happens if I miss a premium payment?",
      answer: "If you miss a premium payment, your policy enters a grace period (typically 30 days) during which coverage continues. If payment isn't made within the grace period, the policy may lapse. We recommend contacting us immediately if you're having difficulty making payments to discuss available options."
    },
    {
      id: 6,
      question: "How do I calculate the premium for my insurance policy?",
      answer: "Premium calculation depends on factors such as age, health status, coverage amount, policy term, and product type. You can use our online quotation tools for an instant estimate, or contact our agents for a detailed calculation based on your specific circumstances and needs."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  // Split FAQ data into two columns
  const leftColumn = faqData.slice(0, 3);
  const rightColumn = faqData.slice(3, 6);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Header Section */}
        <HeroFAQS/>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 py-16" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              {leftColumn.map((item) => (
                <div
                  key={item.id}
                  className=" rounded-lg  border  border-gray/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className={`font-medium ${isOpen(item.id) ? 'text-blue-600' : 'text-gray-900'}`}>
                        {item.question}
                      </span>
                    </div>
                    {isOpen(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen(item.id) && (
                    <div className="px-6 pb-4">
                      <div className="ml-12">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {rightColumn.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg  border  border-gray/10 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className={`font-medium ${isOpen(item.id) ? 'text-blue-600' : 'text-gray-900'}`}>
                        {item.question}
                      </span>
                    </div>
                    {isOpen(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen(item.id) && (
                    <div className="px-6 pb-4">
                      <div className="ml-12">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1320"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Call 1320
                </a>
                <a
                  href="/complaints"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
