export interface Job {
  id: string
  title: string
  location: string
  validityStart: string
  validityEnd: string
  status: 'open' | 'closed'
  department: string
  description: string
  purpose: string
  responsibilities: string[]
  requirements: {
    education: string[]
    experience: string[]
    skills: string[]
    languages: string[]
    other: string[]
  }
  applicationProcedure: {
    documents: string[]
    email: string
    deadline: string
    note: string
  }
}

export const jobsData: Job[] = [
  {
    id: 'senior-hr-2023',
    title: 'Senior HR At Prime Insurance',
    location: 'Head Quarter',
    validityStart: 'May 04, 2023',
    validityEnd: 'May 09, 2023',
    status: 'closed',
    department: 'Human Resources',
    description: 'Prime Insurance Limited is an insurance company, established in 1995 by Rwandan investors, a licensed general and life insurance company authorized by the National Bank of Rwanda (BNR). The Company is seeking to recruit a highly skilled, self-motivated and experienced person to fill the position of HR SENIOR OFFICER.',
    purpose: 'We are looking for an HR SENIOR OFFICER to join our growing team and support the day-to-day activities of our Human Resources and Administration department. HR Senior Officer\'s responsibilities include processing employee data, updating employee files and assist in arranging all required documents for hiring process, stock & fleet management. To be successful in this role, you should have solid organizational skills and be familiar with HR functions.',
    responsibilities: [
      'Track leave database, eligibility and closing balances for each staff at the end of every month and provide this information to the management',
      'Maintain the employee personal files, recruitment file and performance management related documents',
      'Schedule job interviews and contact candidates as required',
      'Keep training and on boarding material',
      'Filing of all staff documents and memos',
      'Keep records and track all services provider\'s contract renewal dates example (all insurances contracts, telephone contracts and so on)',
      'Writing requested letters and Processing of documents required',
      'Stock management and record keeping',
      'Fleet management',
      'Any other job that might be assigned by the company authorities'
    ],
    requirements: {
      education: [
        'Bachelor\'s degree in Human resource, social science or related field',
        'Having an HR professional qualification such as PHRi, HRCI or other related professional qualification is an added advantage'
      ],
      experience: [
        'A minimum of consecutive three (3) years working in HR & Administration department',
        'A career in profit organizations will be an asset'
      ],
      skills: [
        'Familiarity with Human Resources Information Systems (HRIS)',
        'Basic knowledge of labor legislation & procurement',
        'Organizational skills',
        'Integrity',
        'Good verbal and written communication skills',
        'Good knowledge of computer - Windows and Microsoft Office applications (Word, Excel, etc)'
      ],
      languages: [
        'Being fluent in English, French, and Kinyarwanda'
      ],
      other: [
        'Rwandan Nationals of age between 25-35 years are only eligible Candidates'
      ]
    },
    applicationProcedure: {
      documents: [
        'Application letter addressed to Chief Executive Officer',
        'Recent Curriculum Vitae (CV) with proven work Experience (work certificate)',
        'Notarized education certificates',
        'A copy of National Identification',
        'Three professional referees'
      ],
      email: 'hrm@prime.rw',
      deadline: 'April 09th, 2023 at 5pm local time',
      note: 'Only candidates who fulfil the requirements will be contacted'
    }
  },
  {
    id: 'legal-senior-officer-2023',
    title: 'Legal Senior Officer',
    location: 'Head Quarter',
    validityStart: 'Apr 06, 2023',
    validityEnd: 'Apr 14, 2023',
    status: 'closed',
    department: 'Legal',
    description: 'Prime Insurance Limited is seeking a qualified Legal Senior Officer to join our legal department and provide comprehensive legal support to our operations.',
    purpose: 'We are looking for a Legal Senior Officer to provide legal advice, ensure regulatory compliance, and support the company\'s legal affairs across all business units.',
    responsibilities: [
      'Provide legal advice on insurance matters and regulatory compliance',
      'Draft and review contracts, agreements, and legal documents',
      'Handle litigation matters and coordinate with external legal counsel',
      'Ensure compliance with insurance laws and regulations',
      'Support business units with legal guidance on operational matters',
      'Maintain corporate legal records and documentation',
      'Assist in regulatory reporting and communications with regulators'
    ],
    requirements: {
      education: [
        'Bachelor\'s degree in Law (LLB) from a recognized institution',
        'Admission to the Rwanda Bar Association',
        'Master\'s degree in Law or related field is an advantage'
      ],
      experience: [
        'Minimum of 5 years of legal experience, preferably in insurance or financial services',
        'Experience in regulatory compliance and commercial law'
      ],
      skills: [
        'Strong analytical and problem-solving skills',
        'Excellent written and verbal communication skills',
        'Knowledge of insurance laws and regulations',
        'Proficiency in legal research and documentation',
        'Strong attention to detail and organizational skills'
      ],
      languages: [
        'Fluency in English, French, and Kinyarwanda'
      ],
      other: [
        'Rwandan Nationals preferred',
        'Age between 28-40 years'
      ]
    },
    applicationProcedure: {
      documents: [
        'Application letter addressed to Chief Executive Officer',
        'Detailed Curriculum Vitae',
        'Certified copies of academic transcripts and certificates',
        'Copy of National ID',
        'Three professional references'
      ],
      email: 'hrm@prime.rw',
      deadline: 'April 14th, 2023 at 5pm local time',
      note: 'Only shortlisted candidates will be contacted'
    }
  },
  {
    id: 'finance-director-2023',
    title: 'Finance Director',
    location: 'Head Office',
    validityStart: 'Mar 17, 2023',
    validityEnd: 'Mar 28, 2023',
    status: 'closed',
    department: 'Finance',
    description: 'Prime Insurance Limited is seeking an experienced Finance Director to lead our finance department and drive financial strategy across the organization.',
    purpose: 'We are looking for a Finance Director to oversee all financial operations, provide strategic financial leadership, and ensure the company\'s financial health and compliance.',
    responsibilities: [
      'Develop and implement financial strategies and policies',
      'Oversee financial planning, budgeting, and forecasting',
      'Ensure accurate financial reporting and compliance with accounting standards',
      'Manage relationships with external auditors and regulatory bodies',
      'Lead the finance team and provide strategic guidance',
      'Monitor cash flow, investments, and risk management',
      'Support business decision-making with financial analysis'
    ],
    requirements: {
      education: [
        'Bachelor\'s degree in Finance, Accounting, or related field',
        'Professional accounting qualification (CPA, ACCA, or equivalent)',
        'Master\'s degree in Finance or MBA is preferred'
      ],
      experience: [
        'Minimum of 10 years of progressive finance experience',
        'At least 5 years in a senior finance leadership role',
        'Experience in insurance or financial services industry preferred'
      ],
      skills: [
        'Strong leadership and team management skills',
        'Excellent financial analysis and strategic planning abilities',
        'Knowledge of insurance accounting and regulatory requirements',
        'Proficiency in financial management systems',
        'Strong communication and presentation skills'
      ],
      languages: [
        'Fluency in English, French, and Kinyarwanda'
      ],
      other: [
        'Rwandan Nationals preferred',
        'Age between 35-50 years'
      ]
    },
    applicationProcedure: {
      documents: [
        'Application letter addressed to Chief Executive Officer',
        'Comprehensive Curriculum Vitae',
        'Certified academic and professional certificates',
        'Copy of National ID',
        'Three professional references from senior positions'
      ],
      email: 'hrm@prime.rw',
      deadline: 'March 28th, 2023 at 5pm local time',
      note: 'Only qualified candidates will be contacted for interviews'
    }
  },
  {
    id: 'actuarial-analyst-2023',
    title: 'ACTUARIAL ANALYST SENIOR OFFICER POSITION',
    location: 'HEADQUARTER',
    validityStart: 'Mar 01, 2023',
    validityEnd: 'Mar 10, 2023',
    status: 'closed',
    department: 'Actuarial',
    description: 'Prime Insurance Limited is seeking a qualified Actuarial Analyst Senior Officer to join our actuarial department and support our risk assessment and pricing activities.',
    purpose: 'We are looking for an Actuarial Analyst to perform actuarial analysis, support product development, and contribute to the company\'s risk management and pricing strategies.',
    responsibilities: [
      'Perform actuarial analysis for insurance products',
      'Support product development and pricing activities',
      'Conduct risk assessment and reserving calculations',
      'Prepare actuarial reports and presentations',
      'Assist in regulatory actuarial reporting',
      'Support underwriting guidelines development',
      'Monitor and analyze claims experience'
    ],
    requirements: {
      education: [
        'Bachelor\'s degree in Actuarial Science, Mathematics, Statistics, or related field',
        'Progress towards actuarial professional qualifications (SOA, CAS, or similar)',
        'Master\'s degree is an advantage'
      ],
      experience: [
        'Minimum of 3-5 years of actuarial experience',
        'Experience in life or general insurance',
        'Knowledge of actuarial software and modeling'
      ],
      skills: [
        'Strong mathematical and statistical skills',
        'Proficiency in actuarial software (Prophet, Moses, etc.)',
        'Advanced Excel and database management skills',
        'Knowledge of insurance principles and practices',
        'Strong analytical and problem-solving abilities'
      ],
      languages: [
        'Fluency in English, French, and Kinyarwanda'
      ],
      other: [
        'Rwandan Nationals preferred',
        'Age between 25-35 years'
      ]
    },
    applicationProcedure: {
      documents: [
        'Application letter addressed to Chief Executive Officer',
        'Detailed Curriculum Vitae',
        'Academic transcripts and certificates',
        'Copy of National ID',
        'Three professional references'
      ],
      email: 'hrm@prime.rw',
      deadline: 'March 10th, 2023 at 5pm local time',
      note: 'Only candidates meeting the requirements will be considered'
    }
  },
  {
    id: 'customer-care-officer-2023',
    title: 'CUSTOMER CARE OFFICER',
    location: 'HEAD QUARTER',
    validityStart: 'Feb 17, 2023',
    validityEnd: 'Feb 22, 2023',
    status: 'closed',
    department: 'Customer Service',
    description: 'Prime Insurance Limited is seeking a dedicated Customer Care Officer to provide excellent customer service and support to our valued clients.',
    purpose: 'We are looking for a Customer Care Officer to handle customer inquiries, resolve complaints, and ensure high levels of customer satisfaction.',
    responsibilities: [
      'Handle customer inquiries via phone, email, and in-person',
      'Process insurance applications and policy changes',
      'Resolve customer complaints and issues',
      'Provide information about insurance products and services',
      'Maintain accurate customer records and documentation',
      'Follow up on customer requests and ensure resolution',
      'Support sales team with customer-related activities'
    ],
    requirements: {
      education: [
        'Bachelor\'s degree in Business Administration, Marketing, or related field',
        'Diploma in Customer Service or related field acceptable'
      ],
      experience: [
        'Minimum of 2 years in customer service role',
        'Experience in insurance or financial services preferred'
      ],
      skills: [
        'Excellent communication and interpersonal skills',
        'Strong problem-solving abilities',
        'Patience and empathy in dealing with customers',
        'Computer literacy and data entry skills',
        'Ability to work under pressure'
      ],
      languages: [
        'Fluency in English, French, and Kinyarwanda'
      ],
      other: [
        'Rwandan Nationals preferred',
        'Age between 22-30 years'
      ]
    },
    applicationProcedure: {
      documents: [
        'Application letter addressed to Chief Executive Officer',
        'Current Curriculum Vitae',
        'Academic certificates',
        'Copy of National ID',
        'Two professional references'
      ],
      email: 'hrm@prime.rw',
      deadline: 'February 22nd, 2023 at 5pm local time',
      note: 'Only shortlisted candidates will be contacted'
    }
  }
]

export const getJobById = (id: string): Job | undefined => {
  return jobsData.find(job => job.id === id)
}

export const getActiveJobs = (): Job[] => {
  return jobsData.filter(job => job.status === 'open')
}

export const getJobsByDepartment = (department: string): Job[] => {
  return jobsData.filter(job => job.department.toLowerCase() === department.toLowerCase())
}
