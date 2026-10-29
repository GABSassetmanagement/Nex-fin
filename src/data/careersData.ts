export interface JobOpening {
  id: string;
  title: string;
  department: 'Credit Risk & Underwriting' | 'Operations & Branch' | 'Fintech & Engineering' | 'Institutional Sales' | 'Legal & Compliance';
  location: 'Abuja Head Office (NICON Insurance Building)' | 'Abuja FCT / Hybrid';
  type: 'Full-Time';
  experience: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Credit Risk Underwriter',
    department: 'Credit Risk & Underwriting',
    location: 'Abuja Head Office (NICON Insurance Building)',
    type: 'Full-Time',
    experience: '4+ Years Tier-1 Bank / MFB Experience',
    salaryRange: 'Competitive + Quarterly Disbursal Bonus',
    description: 'Lead underwriting decisions for high-velocity public sector and asset-backed credit facilities. Work closely with our Chief Risk Officer to maintain sub-1.5% Non-Performing Loan (NPL) rates while upholding our 15-minute turnaround SLA.',
    responsibilities: [
      'Appraise loan applications across Suremoney, Nexus Credit, and Car-for-Cash products.',
      'Review Remita mandate validity, payslip deductions, and BVN credit bureau ratings.',
      'Formulate risk mitigation strategies for corporate invoice discounting portfolios.',
      'Liaise with federal command liaison desks for institutional payroll alignment.',
    ],
    requirements: [
      'B.Sc. or HND in Banking, Finance, Economics, or related quantitative field.',
      'Minimum 4 years active credit underwriting experience in a commercial bank or licensed cooperative.',
      'Expert proficiency in Nigerian credit bureau interfaces (CRC, FirstCentral) and Remita payment architecture.',
    ],
  },
  {
    id: 'job-2',
    title: 'Branch Operations & Client Experience Lead',
    department: 'Operations & Branch',
    location: 'Abuja Head Office (NICON Insurance Building)',
    type: 'Full-Time',
    experience: '3–5 Years Banking Operations',
    salaryRange: 'Competitive + Health (HMO) & Pension',
    description: 'Ensure world-class concierge client experience at our flagship Central Business District branch. Oversee daily teller operations, customer onboarding, document verifications, and VIP loan documentation.',
    responsibilities: [
      'Manage front-office operations and ensure zero customer wait times exceeding 10 minutes.',
      'Supervise documentation intake for Car-for-Cash and Travel Financing facilities.',
      'Coordinate with the National Cooperative Financing Agency liaison desk.',
      'Drive customer NPS scores and resolution of client inquiries.',
    ],
    requirements: [
      'Demonstrated experience leading customer service or operations in an Abuja financial institution.',
      'Impeccable communication, emotional intelligence, and professional presentation.',
      'High integrity with zero history of disciplinary infractions.',
    ],
  },
  {
    id: 'job-3',
    title: 'Institutional Sales Manager (Federal MDAs & Paramilitary)',
    department: 'Institutional Sales',
    location: 'Abuja Head Office (NICON Insurance Building)',
    type: 'Full-Time',
    experience: '5+ Years Relationship Management',
    salaryRange: 'Attractive Base + High Commission Structure',
    description: 'Expand our institutional payroll partnerships across Federal Ministries, Departments, Agencies (MDAs), and paramilitary commands (NPF, EFCC, FRSC, NSCDC, NCS).',
    responsibilities: [
      'Cultivate high-trust institutional relationships with command welfare directors and staff cooperatives.',
      'Structure bespoke bulk credit and welfare facility packages for state commands.',
      'Present Nexus credit products to executive councils and labor union stakeholders.',
    ],
    requirements: [
      'Established network across Abuja civil service secretariats and national security commands.',
      'Proven track record exceeding annual loan disbursement targets.',
      'Strong negotiation, contract structuring, and presentation capabilities.',
    ],
  },
  {
    id: 'job-4',
    title: 'Full-Stack Fintech Software Engineer',
    department: 'Fintech & Engineering',
    location: 'Abuja FCT / Hybrid',
    type: 'Full-Time',
    experience: '3+ Years Modern Web & API Systems',
    salaryRange: 'Competitive Equity + High Tech Compensation',
    description: 'Build and maintain our core digital loan application engine, Remita direct debit hooks, automated risk scoring microservices, and mobile companion app.',
    responsibilities: [
      'Develop secure, high-availability web and mobile financial workflows in TypeScript, React, and Node.js.',
      'Integrate NIBSS instant payment gateways, BVN identity APIs, and Remita mandate webhooks.',
      'Implement stringent Nigerian Data Protection Regulation (NDPR) security controls and encryption.',
    ],
    requirements: [
      'Proficiency in React, TypeScript, Tailwind CSS, REST/GraphQL APIs, and relational databases.',
      'Prior background in fintech, payment gateways, or cooperative micro-lending software.',
      'Strong emphasis on clean code, automated unit testing, and sub-100ms response latencies.',
    ],
  },
];
