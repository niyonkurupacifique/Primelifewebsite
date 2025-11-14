'use client';

import { JSX, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroFAQS from './HeroFAQ';
import { Fragment } from 'react'; // Add this to allow conditional rendering

interface FAQItem {
  id: number;
  question: string;
  answer: string | JSX.Element;
}

interface FAQSection {
  section: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    section: "About Prime Life Insurance Ltd",
    items: [
      {
        id: 1,
        question: "What is Prime Life Insurance Ltd?",
        answer: "Prime Life Insurance Ltd is a licensed life insurance company in Rwanda, regulated by the National Bank of Rwanda (BNR). The company provides a wide range of life insurance and savings solutions designed to protect individuals, families, and businesses against financial risks such as death, disability, and loss of income."
      },
      {
        id: 2,
        question: "How long has Prime Life been operating?",
        answer: "Prime Life Insurance Ltd has been in operation since 2011, proudly serving Rwandans for over a decade with trusted, customer-centered insurance services."
      },
      {
        id: 3,
        question: "Is Prime Life a local or international company?",
        answer: "Prime Life is a Rwandan-registered company with local and international ownership and governance. It operates under national insurance laws and regulations set by the National Bank of Rwanda."
      },
      {
        id: 4,
        question: "Where is Prime Life Insurance Ltd located?",
        answer: "Head Office: MIC Building, KN 2 Av, Nyarugenge, Kigali-Rwanda. You can contact Prime Life Insurance Ltd via phone number +250 788 150 100 | Toll-Free 1320 or email info@prime.rw"
      },
      {
        id: 5,
        question: "Is Prime Life regulated by the Government?",
        answer: "Yes. Prime Life operates under the supervision of the National Bank of Rwanda (BNR), which regulates all insurance activities in the country to ensure financial soundness and consumer protection."
      },
    ],
  },
  {
    section: "Understanding Life Insurance",
    items: [
      {
        id: 6,
        question: "What is life insurance?",
        answer: "Life insurance is a financial protection contract between you (the policyholder) and the insurer. In exchange for regular premium payments, the insurer guarantees payment of a sum of money to your chosen beneficiary upon your death or under specific conditions such as disability, critical illness, or retirement."
      },
      {
        id: 7,
        question: "Why do I need life insurance?",
        answer: "Life insurance provides peace of mind by ensuring that your loved ones or business are financially secure in case of your death or inability to earn an income. It helps cover daily living expenses, loans, education, and other financial obligations."
      },
      {
        id: 8,
        question: "Who can buy life insurance?",
        answer: "Anyone between the ages of 18 and 65 who meets the medical and financial underwriting requirements can buy life insurance from Prime Life Insurance."
      },
      {
        id: 9,
        question: "How much life insurance do I need?",
        answer: "The ideal amount depends on your financial responsibilities, such as debts, children's education, or income replacement needs. Our financial advisors can help you calculate an appropriate coverage level."
      },
    ],
  },
  {
    section: "Products and Services",
    items: [
      {
        id: 10,
        question: "What types of products does Prime Life Insurance offer?",
        answer: "Prime Life offers a range of life insurance and savings products, including: Education Insurance, Umurage w'Amashuri, Intego, Nkunganire-Shoferi, Ikimina Cyacu, Family Insurance, Employee Protection Insurance, Group Credit Insurance, and Group Life Insurance."
      },
      {
        id: 11,
        question: "What is Group Life Insurance?",
        answer: "Group Life Insurance covers a group of people, such as employees of a company or members of a cooperative. It provides financial benefits to the family in the event of death or disability of a member."
      },
      {
        id: 12,
        question: "What is Group Credit Insurance?",
        answer: "Group Credit Insurance ensures that your outstanding loan balance is paid off if you pass away or become permanently disabled before the loan is fully repaid. This protects both your family and the lending institution."
      },
      {
        id: 13,
        question: "What is an Education Insurance?",
        answer: "It is a savings-oriented insurance policy designed to help parents and future parents to accumulate funds for their children's future education while providing life protection during the saving period."
      },
      {
        id: 14,
        question: "What is a Funeral Cover?",
        answer: "Funeral Cover provides immediate financial support to cover funeral expenses in the unfortunate event of the death of the policyholder or a covered family member."
      },
    ],
  },
  {
    section: "Premiums and Payments",
    items: [
      {
        id: 15,
        question: "How do I pay my insurance premiums?",
        answer: "You can pay your premiums through: Bank transfer to Prime Life Insurance Ltd accounts (BK: 100004871698, BPR: 4410743392, I&M: 25042928001, Equity: 4002200202910), Mobile money (MTN Mobile Money: *182*8*1*002211#), or Standing orders from your bank account."
      },
      {
        id: 16,
        question: "What happens if I miss a premium payment?",
        answer: "You will have a grace period (typically 30–60 days) to make up for missed payments. After this, your policy may lapse or convert to a 'paid-up' policy depending on the terms. You can also reinstate it upon fulfilling specific requirements."
      },
      {
        id: 17,
        question: "Can I change my payment frequency?",
        answer: "Yes. You can choose monthly, quarterly, semi-annual, or annual premium payment schedules based on your convenience. If you wish to change your premium payment frequency, you can submit a written request or email info@prime.rw to request the adjustment."
      },
      {
        id: 18,
        question: "Are premiums refundable?",
        answer: "Premiums are generally non-refundable. However, if you have a savings or investment component, you can receive your policy's cash value if you surrender before maturity."
      },
    ],
  },
  {
    section: "Policy Management",
    items: [
      {
        id: 19,
        question: "Can I change my beneficiary?",
        answer: "Yes. You may change your beneficiary at any time by submitting a written request along with a completed beneficiary change form."
      },
      {
        id: 20,
        question: "Can I increase or decrease my coverage amount?",
        answer: "Yes, subject to underwriting approval and depending on your policy type."
      },
      {
        id: 21,
        question: "What happens if I lose my policy document?",
        answer: "If you lose your policy document, you can request a copy by submitting a written request or you can also check your policy status anytime by dialing *177# or view and download your statement through the Prime Life Insurance website at www.prime.rw."
      },
      {
        id: 22,
        question: "How do I cancel (surrender) my policy?",
        answer: "You may surrender your policy before maturity; however, this may result in reduced benefits. We recommend consulting with your financial advisor before making this decision. It's not advisable to surrender your policy within the first three years of subscription."
      },
    ],
  },
  {
    section: "Claims and Benefits",
    items: [
      {
        id: 23,
        question: "How do I make a claim?",
        answer: "You can claim by filling out an online claims form available on Prime Life Insurance website at www.prime.rw, or submit the following: Completed claim form, Certified copy of the death certificate or relevant proof of event, National ID of the claimant and beneficiary, and Any additional documents requested."
      },
      {
        id: 24,
        question: "How long does it take to process a claim?",
        answer: "Prime Life Insurance strives to process valid claims within 1 to 30 working days after receiving all required documents. However, digital claims submitted via *177# are processed automatically for eligible cases."
      },
      {
        id: 25,
        question: "Who receives the claim payment?",
        answer: "The claim is paid to the beneficiary(ies) named in the policy or as per legal succession if no beneficiary was named."
      },
      {
        id: 26,
        question: "Are claims taxable?",
        answer: "In most cases, life insurance claim proceeds are not subject to income tax under Rwandan tax laws."
      },
    ],
    
  },
  {
  section: "Critical Illness & Dread Disease Cover",
  items: [
    {
      id: 46,
      question: "How is a 'Critical Illness' defined under Loan Protection and Group Life policies ?",
     answer: "A Critical Illness is defined as a serious medical condition from a pre-defined list within the policy that triggers a benefit payout. The coverage is designed to help policyholders manage expenses, such as covering medical costs, and allowing them to focus on recovery with financial confidence.."
      
    },
     {
      id: 47,
      question: "What is Prime Life Insurance's Critical Illness Cover and how does it work ?",
     answer: "Prime Life Insurance's Critical Illness Cover is an optional benefit or rider attached to a core life insurance policy (e.g., Loan Protection or Group Life Insurance). Its mechanism is straightforward: upon diagnosis of one of the specific, serious conditions listed in the policy, it triggers a single, lump sum cash benefit payment. This payment is intended to provide financial support for medical expenses, income replacement, and overall financial peace of mind during recovery."
      },
       {
      id: 48,
      question: "What specific critical illnesses are covered by the policy? ",
       answer: (
    <div className="space-y-3 text-gray-700">
      <p>
        The policy covers a pre-defined list of serious medical conditions, which generally include:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Heart Attack (Myocardial Infarction)</li>
        <li>Stroke (Cerebrovascular incident)</li>
        <li>
          Cancer (Malignant tumor with uncontrolled growth, subject to specific exclusions)
        </li>
        <li>Coronary Artery Surgery or Heart Valve Replacement</li>
        <li>Renal Failure (End-Stage Renal Disease)</li>
        <li>Major Organ Transplant</li>
        <li>Multiple Sclerosis</li>
        <li>Paraplegia / Paralysis</li>
        <li>Coma</li>
        <li>Blindness</li>
        <li>Parkinson’s Disease (under 60)</li>
        <li>Alzheimer’s Disease (under 60)</li>
        <li>Aorta Surgery</li>
        <li>Muscular Dystrophy</li>
        <li>Accidental Brain Damage</li>
        <li>Rheumatoid Arthritis (under 60)</li>
        <li>Motor Neurone Disease</li>
        <li>Burns</li>
      </ul>
    </div>
  ),
      },
      {
  id: 49,
  question: "Are there any conditions or exclusions under which a Critical Illness claim will not be paid?",
  answer: (
    <div className="space-y-3 text-gray-700">
      <p>
        Yes, the policy has specific exclusions. No benefit is payable if the illness is caused by or relates to:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Suicide or self-inflicted injury</li>
        <li>Alcohol or drug abuse, or misuse of medication</li>
        <li>
          Willful law violations, riots, or hazardous sports (for paralysis & blindness)
        </li>
        <li>Failure to follow medical advice</li>
        <li>Pre-existing conditions</li>
        <li>AIDS or HIV</li>
        <li>Diagnosis within 6 months of policy start</li>
      </ul>
      <p className="italic text-gray-600">
        <strong>Note:</strong> The Bank, MFI, or SACCO shall not be able to claim more than one defined critical illness
        for any life assured following a positive diagnosis. The cover for that life assured will automatically lapse
        immediately after a claim is paid.
      </p>
    </div>
  ),
},
{
      id: 50,
      question: "If a life assured is diagnosed with a second Critical Illness after the first one, will the Bank/MFI/SACCO be able to claim again ?",
     answer: "The Bank/MFI/SACCO shall not be able to claim more than one defined Critical illness, for any life assured, following a positive diagnosis, and the cover for the life assured will automatically lapse immediately following a claim."
},
{
  id: 51,
  question: "What is the process for making a Critical Illness claim?",
  answer: (
    <div className="space-y-3 text-gray-700">
      <p>
        To make a Critical Illness claim, you or your authorised representative must follow these general steps:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Notify Prime Life Insurance</strong> as soon as possible after the diagnosis.
        </li>
        <li>
          <strong>Complete the claim form</strong> available in the “Make a Claim” section of the policy or on the website.
        </li>
        <li>
          <strong>Provide all necessary medical documentation,</strong> including reports confirming the diagnosis and severity of the critical illness from a qualified medical doctor.
        </li>
      </ol>
      <p className="text-sm text-gray-600">
        Note: Additional documents or steps may be required depending on the nature of the claim and the policy terms. Always check the policy wording or contact our claims team for guidance.
      </p>
    </div>
  ),
},


  ],
},

  {
    section: "Digital Services and Support",
    items: [
      {
        id: 27,
        question: "Can I manage my policy online?",
        answer: "Yes. Prime Life offers digital platforms (Website www.prime.rw and USSD *177#) that allow you to view your policy details, check payment status, and download statements."
      },
      {
        id: 28,
        question: "Does Prime Life have a mobile app or USSD service?",
        answer: "Yes. You can access selected services via USSD *177# or our upcoming mobile app for policy management and premium payments."
      },
      {
        id: 29,
        question: "Can I receive notifications or statements by email/SMS?",
        answer: "Yes. You can opt in to receive all updates electronically through email or SMS alerts."
      },
    ],
  },
  {
    section: "Partnerships and Group Coverage",
    items: [
      {
        id: 30,
        question: "Does Prime Life work with employers and cooperatives?",
        answer: "Yes. Prime Life partners with companies, cooperatives, SACCOs, and microfinance institutions to provide group and credit life coverage."
      },
      {
        id: 31,
        question: "Can my institution or cooperative join Prime Life's insurance network?",
        answer: "Absolutely. We provide customized insurance solutions for various institutions, cooperatives, and community groups to enhance financial protection and inclusion."
      },
    ],
  },
  {
    section: "Customer Service",
    items: [
      {
        id: 32,
        question: "How can I contact Prime Life for support?",
        answer: "Call: Toll-Free 1320 or +250 788 150 100, Email: info@prime.rw, Visit: Prime HQ or Any Prime Life Franchise, Website: www.prime.rw"
      },
      {
        id: 33,
        question: "What are your working hours?",
        answer: "Monday – Friday: 8:00 AM – 5:00 PM (Closed Saturdays, Sundays and public holidays)"
      },
      {
        id: 34,
        question: "How can I provide feedback or complaints?",
        answer: "You can reach us by email at info@prime.rw or call our helpline 1320. For complaints, please email complaints@prime.rw, call our dedicated complaints line at +250 783 990 335, or submit your complaint through our website. All complaints are handled in accordance with Prime Life Insurance's Customer Protection Policy."
      },
    ],
  },
  {
    section: "Corporate and Regulatory",
    items: [
      {
        id: 35,
        question: "How financially strong is Prime Life Insurance Ltd?",
        answer: "Prime Life maintains a strong solvency position, audited annually and supervised by the National Bank of Rwanda. We consistently meet all regulatory capital and solvency requirements."
      },
      {
        id: 36,
        question: "Is my money safe with Prime Life?",
        answer: "Yes. Prime Life invests customer funds prudently in approved financial instruments under strict supervision by the BNR."
      },
      {
        id: 37,
        question: "Does Prime Life participate in community development?",
        answer: "Yes. The company supports financial literacy programs, youth training, and social welfare initiatives aligned with Rwanda's National Strategy for Transformation (NST2)."
      },
    ],
  },
  {
    section: "Special Topics",
    items: [
      {
        id: 38,
        question: "What is 'Lapsation' and how can I prevent it?",
        answer: "Lapsation occurs when a policy terminates due to non-payment of premiums. To prevent lapsation, pay premiums regularly or activate automatic payment options."
      },
      {
        id: 39,
        question: "What is a 'Never-Lapse' feature?",
        answer: "This feature ensures your policy remains active even if you miss a premium, by using your policy's cash value to cover the unpaid amount. Terms and conditions apply."
      },
      {
        id: 40,
        question: "Can I take a loan on my policy?",
        answer: "Yes. If your policy has accumulated cash value, you may borrow against it at an agreed interest rate."
      },
      {
        id: 41,
        question: "Does Prime Life provide savings products?",
        answer: "Yes. We offer both individual and group saving solutions to help you save for the future plans."
      },
      {
        id: 42,
        question: "Can I transfer my insurance from another company to Prime Life?",
        answer: "In most cases, yes, depending on the product and underwriting assessment."
      },
    ],
  },
  {
    section: "Vision and Commitment",
    items: [
      {
        id: 43,
        question: "What is Prime Life's vision?",
        answer: "To be the leading and most admired financial institution in Rwanda by all customers and employees."
      },
      {
        id: 44,
        question: "What makes Prime Life different from others?",
        answer: "Professional service delivery, Innovative digital platforms, Strong financial discipline, Customer-first culture, and Inclusive and affordable insurance solutions."
      },
      {
        id: 45,
        question: "What is Prime Life's commitment to customers?",
        answer: "To ensure every client receives transparent, timely, and fair service while building lasting financial security and confidence."
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
    setOpenItems([]); // Reset open questions when opening another section
  };

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isItemOpen = (id: number) => openItems.includes(id);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroFAQS />
        <div className="container mx-auto px-4 py-16" data-aos="fade-up">
          {/* Section two-column grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqSections.map((sectionItem) => (
              <div key={sectionItem.section}>
                {/* Section Accordion with HelpCircle icon */}
                <button
                  onClick={() => toggleSection(sectionItem.section)}
                  className="w-full flex items-center text-left justify-between py-2 px-4 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition mb-2"
                >
                  <span className="flex items-center gap-4  text-xl font-bold text-[#003366]">
                    <span className="w-10 h-10  flex items-center justify-center flex-shrink-0">
                      {/* <HelpCircle className="w-5 h-5 text-white" /> */}
                      <svg  viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00">
                        <path fill="#00b0ef" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 19,29L 47,29L 47,57L 19,57L 19,29 Z M 43,33L 23,33.0001L 23,53L 43,53L 43,33 Z M 39,41L 39,45L 35,45L 35,49L 31,49L 31,45L 27,45L 27,41L 31,41L 31,37L 35,37L 35,41L 39,41 Z M 24,24L 51.9999,24.0001L 51.9999,52L 48.9999,52.0001L 48.9999,27.0001L 24,27.0001L 24,24 Z M 53.9999,47L 53.9999,22.0001L 29,22L 29,19L 56.9999,19.0001L 57,47L 53.9999,47 Z " />
                      </svg>
                    </span>
                    {sectionItem.section}
                  </span>
                  {openSection === sectionItem.section ? (
                    <ChevronUp className="w-7 h-7 text-[#00b0ef]" />
                  ) : (
                    <ChevronDown className="w-7 h-7 text-[#00b0ef]" />
                  )}
                </button>
                {/* Questions, shown only if section is expanded */}
                {openSection === sectionItem.section && (
                  <div className="mt-6">
                    <div className="space-y-6">
                      {sectionItem.items.map((item) => (
                        <div key={item.id} className="rounded-lg border border-gray/10 overflow-hidden">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-[#00b0ef] rounded-full flex items-center justify-center flex-shrink-0">
                                <HelpCircle className="w-5 h-5 text-white" />
                              </div>
                              <span className={`font-medium ${isItemOpen(item.id) ? 'text-blue-600' : 'text-gray-900'}`}>
                                {item.question}
                              </span>
                            </div>
                            {isItemOpen(item.id) ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {isItemOpen(item.id) && (
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
                )}
              </div>
            ))}
          </div>
          {/* Contact Section (as before) */}
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
