export interface Product {
  id: string;
  name: string;
  category: 'mda' | 'individual' | 'business' | 'investment';
  badge?: string;
  tagline: string;
  description: string;
  turnaroundTime: string;
  rateInfo: string;
  requirements: string[];
  keyBenefit: string;
  maxAmount?: string;
  tenure?: string;
  featured?: boolean;
}

export interface LeadershipMember {
  name: string;
  role: string;
  department?: string;
  bio: string;
  fullBio: string;
  education: string[];
  careerHighlights: string[];
  coreResponsibilities: string[];
  certifications: string[];
  formerBackground: string;
  image?: string;
}

export interface Partner {
  name: string;
  acronym: string;
  category: string;
  description: string;
}

export interface LoanCalculation {
  loanAmount: number;
  tenureMonths: number;
  monthlyInterestRate: number;
  processingFeePercent: number;
  monthlyInterestAmount: number;
  processingFeeAmount: number;
  monthlyPrincipal: number;
  totalMonthlyInstallment: number;
  totalRepayment: number;
}
