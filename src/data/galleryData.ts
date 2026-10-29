export type GalleryFolder =
  | 'Office'
  | 'CSR'
  | 'Store Marketing'
  | 'Store Operations'
  | 'Executive Summits';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryFolder;
  location: string;
  date: string;
  image: string;
  description: string;
}

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  // Office Folder
  {
    id: 'gal-office-1',
    title: 'Nexus National Headquarters — NICON Insurance Building, Abuja',
    category: 'Office',
    location: '2nd Floor, Right Wing, NICON Insurance Building, CBD, Abuja',
    date: '2026',
    image: '/assets/nexus/naira_1000_stacks.jpg',
    description: 'Our central operations nerve center in Abuja Central Business District, housing our executive board, algorithmic underwriting desk, and confidential client advisory suites.',
  },
  {
    id: 'gal-office-2',
    title: 'Executive Client Advisory & Wealth Management Suite',
    category: 'Office',
    location: 'NICON Insurance Building, Abuja',
    date: '2026',
    image: '/assets/nexus/travel_documents.jpg',
    description: 'Private concierge client meeting rooms designed for high-net-worth members, corporate treasurers, and confidential loan consultations.',
  },
  // CSR Folder
  {
    id: 'gal-csr-1',
    title: 'Nexus Women Financial Literacy & Grant Initiative',
    category: 'CSR',
    location: 'Abuja Municipal Council Hall, FCT',
    date: 'March 2026',
    image: '/assets/nexus/entrepreneur.webp',
    description: 'Community financial empowerment workshop distributing zero-interest grants and bookkeeping technology to over 250 female micro-traders.',
  },
  {
    id: 'gal-csr-2',
    title: 'Public Service Welfare Outreach & Medical Support Fund',
    category: 'CSR',
    location: 'Federal Staff Welfare Center, Abuja',
    date: 'January 2026',
    image: '/assets/nexus/corporate_salary_exec.jpg',
    description: 'Cooperative health insurance subsidy drive supporting retired civil servants and paramilitary veterans across the Federal Capital Territory.',
  },
  // Store Marketing Folder
  {
    id: 'gal-mkt-1',
    title: 'Wuse Market & Garki Merchant Retail Activation Drive',
    category: 'Store Marketing',
    location: 'Commercial Hubs, Abuja FCT',
    date: 'February 2026',
    image: '/assets/nexus/entrepreneur.webp',
    description: 'Field marketing teams introducing Shop-Owned-Based Loans (SOBL) and immediate POS merchant receivables financing to registered market traders.',
  },
  {
    id: 'gal-mkt-2',
    title: 'Federal Secretariat Nationwide Credit Awareness Campaign',
    category: 'Store Marketing',
    location: 'Federal Secretariat Complex, Phase 1 & 2, Abuja',
    date: 'February 2026',
    image: '/assets/nexus/corporate_salary_exec.jpg',
    description: 'Direct institutional engagement sessions demonstrating instant Remita payroll disbursement and Suremoney emergency funds for MDA staff.',
  },
  // Store Operations Folder
  {
    id: 'gal-ops-1',
    title: 'Car-for-Cash High-Security Climate Depot Facility',
    category: 'Store Operations',
    location: 'Nexus Secured Depot, Airport Road Industrial Area, Abuja',
    date: '2026',
    image: '/assets/nexus/hero_car.jpg',
    description: '24/7 guarded, biometric-access climate-controlled vehicle depot where customer vehicles are safely preserved without ever being driven during facility tenures.',
  },
  {
    id: 'gal-ops-2',
    title: 'Sovereign Bullion Safety Vaults & Gold Appraisal Lab',
    category: 'Store Operations',
    location: 'Nexus Physical Vault Facility, Abuja',
    date: '2026',
    image: '/assets/nexus/gold_vault.jpg',
    description: 'State-of-the-art metallurgical testing and dual-key safety deposit vaults securing bullion under Gold-for-Cash and high-yield fixed wealth deposits.',
  },
  // Executive Summits Folder
  {
    id: 'gal-summit-1',
    title: 'Annual Executive Leadership & Risk Underwriting Summit',
    category: 'Executive Summits',
    location: 'Nexus Executive Boardroom, Abuja',
    date: 'February 2026',
    image: '/assets/nexus/corporate_salary_exec.jpg',
    description: 'Board members and senior credit risk executives reviewing institutional liquidity allocations and statutory alignment with national cooperative apex bodies.',
  },
  {
    id: 'gal-summit-2',
    title: 'National Cooperative Financing Agency Regulatory Forum',
    category: 'Executive Summits',
    location: 'Transcorp Hilton Congress Hall, Abuja',
    date: 'March 2026',
    image: '/assets/nexus/naira_1000_stacks.jpg',
    description: 'High-level stakeholder symposium on automated Remita payroll integration, ethical credit caps, and 15-minute interbank settlement standards.',
  },
];
