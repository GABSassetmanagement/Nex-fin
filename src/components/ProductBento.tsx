import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NEXUS_PRODUCTS } from '../data/content';
import { ArrowUpRight, Check } from '@phosphor-icons/react';

interface ProductBentoProps {
  onSelectProduct: (productName: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const ProductBento: React.FC<ProductBentoProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mda' | 'individual' | 'business' | 'investment'>('all');

  const mainProducts = [
    {
      id: 'suremoney-loan',
      name: 'Suremoney Loan',
      category: 'mda',
      tag: '15 Mins',
      badge: 'Prompt Emergency Credit',
      image: '/assets/nexus/naira_1000_stacks.jpg',
      imageAlt: 'Authentic crisp stacks of ₦1,000 Nigerian Central Bank notes with official wrappers',
      description: 'A flexible, no-collateral personal and business loan designed for prompt access to funds during emergencies with flexible tenures up to 24 months.',
      bullets: [
        'No collateral required with rapid settlement',
        'Up to ₦10,000,000 facility limit',
      ],
      buttonText: 'View Suremoney Details',
    },
    {
      id: 'nexus-credit',
      name: 'Nexus Credit',
      category: 'mda',
      tag: 'Instant Remita',
      badge: 'Salary-Based Remita Facility',
      image: '/assets/nexus/corporate_salary_exec.jpg',
      imageAlt: 'Senior Nigerian professional in corporate boardroom managing salary-backed credit',
      description: 'A quick, non-collateral, salary-based credit facility offering competitive interest rates with ultra-fast Remita payroll disbursement and automatic deductions.',
      bullets: [
        'Direct Remita salary integration with zero stress',
        'Up to ₦5,000,000 facility limit',
      ],
      buttonText: 'View Nexus Credit Details',
    },
    {
      id: 'car-for-cash',
      name: 'Car-for-Cash (CFC)',
      category: 'individual',
      tag: '2hr Disbursal',
      badge: 'Insured Depot Storage',
      image: '/assets/nexus/hero_car.jpg',
      imageAlt: 'Car-for-Cash Asset Depot Storage with 24/7 insured protection',
      description: 'Unlock urgent capital leveraging your vehicle value. The customer does not keep and drive the car; vehicle is safely held in our 24/7 insured climate-controlled depot.',
      bullets: [
        'Customer does not keep or drive the vehicle',
        'Up to ₦25,000,000 facility limit (70% value)',
      ],
      buttonText: 'View Car-for-Cash Details',
    },
    {
      id: 'travel-financing',
      name: 'Travel Financing',
      category: 'individual',
      tag: '12–24hr Issuance',
      badge: 'Visa, Study & Relocation',
      image: '/assets/nexus/travel_documents.jpg',
      imageAlt: 'Nigerian passport, verified bank financial statement and international flight documents',
      description: 'Certified, bank-verified proof of capability and travel documentation for international visa applications, university study permits, relocation, and contracts.',
      bullets: [
        'Embassy-accepted for UK, US, Canada & Schengen',
        'Up to ₦100,000,000+ verification capacity',
      ],
      buttonText: 'View Travel Financing Details',
    },
    {
      id: 'high-yield-investments',
      name: 'Fixed Deposit Vaults',
      category: 'investment',
      tag: 'Guaranteed Yield',
      badge: '15.5% Annualized APY',
      image: '/assets/nexus/gold_vault.jpg',
      imageAlt: 'Pure 1kg fine gold bullion bars stacked inside bank safety deposit box vault',
      description: 'Capital preservation and inflation-hedged yields designed for high-net-worth members, cooperative societies, and corporate reserves.',
      bullets: [
        'Monthly cash-flow distributions available',
        'Over 3x the yield of commercial bank accounts',
      ],
      buttonText: 'View Wealth Vault Details',
    },
    {
      id: 'women-empowerment',
      name: 'Women Empowerment (NWEL)',
      category: 'business',
      tag: 'Subsidized Terms',
      badge: 'Women in Enterprise',
      image: '/assets/nexus/entrepreneur.webp',
      imageAlt: 'Nigerian female entrepreneur in her commercial fashion boutique and design studio',
      description: 'Closing the female entrepreneurship credit gap. Customized working capital with advisory support, flexible tenures, and growth coaching.',
      bullets: [
        'Concessionary interest rate and flexible tenure',
        'Up to ₦5,000,000 facility limit',
      ],
      buttonText: 'View NWEL Facility Details',
    },
  ];

  const filteredProducts = activeCategory === 'all'
    ? mainProducts
    : mainProducts.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 relative bg-[#07090e] io-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filter Tabs (Optimized for desktop, tablet, and mobile) */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
              Tailored liquidity for every <span className="text-gradient-emerald">financial frontier.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
              Discover dedicated credit, asset-backed liquidity, and concessionary facilities structured for Nigeria's workforce.
            </p>
          </div>

          {/* Category Filter Tabs - clean wrapping without cut-off */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit max-w-full font-sans">
            {[
              { id: 'all', label: 'All Facilities' },
              { id: 'mda', label: 'MDA & Paramilitary' },
              { id: 'individual', label: 'Asset-Backed' },
              { id: 'business', label: 'SME & Corporate' },
              { id: 'investment', label: 'Wealth Vaults' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staggered Animated Bento Grid via Framer Motion */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              variants={cardItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl p-6 bg-gradient-to-br from-[#0e1320] to-[#07090e] border border-white/10 hover:border-emerald-500/40 transition-colors duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Image asset container with overlay badge */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-5 border border-white/10 bg-black">
                  <img
                    src={prod.image}
                    alt={prod.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-sans font-medium text-[#00e575] border border-white/10">
                    {prod.badge}
                  </div>
                </div>

                {/* Title & Tag header row */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white font-display">{prod.name}</h3>
                  <span className="text-xs font-sans text-cyan-400 font-semibold">{prod.tag}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                  {prod.description}
                </p>

                {/* Feature bullets */}
                <div className="space-y-1.5 text-xs text-slate-300 mb-6 font-sans">
                  {prod.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00e575] shrink-0" weight="bold" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectProduct(prod.id)}
                className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-semibold font-sans flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{prod.buttonText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Products Row (Shop-Owned Loan, Invoice Discounting, Gold-for-Cash) with staggered motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans"
        >
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-sans font-semibold text-[#00e575] mb-1">SOBL SME</div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Shop-Owned Loan</h4>
              <p className="text-xs text-slate-300 mb-4 font-sans leading-relaxed">
                Capital support for registered retail shopkeepers and market stall owners with matching cash-flow collections.
              </p>
            </div>
            <button
              onClick={() => onSelectProduct('shop-owned-sme')}
              className="text-xs font-semibold text-[#00e575] hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-sans"
            >
              <span>View Requirements &rarr;</span>
            </button>
          </motion.div>

          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-sans font-semibold text-cyan-400 mb-1">IDF Receivables</div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Invoice Discounting</h4>
              <p className="text-xs text-slate-300 mb-4 font-sans leading-relaxed">
                Convert verified purchase orders and invoices into immediate working cash without waiting 60–90 days for client payout.
              </p>
            </div>
            <button
              onClick={() => onSelectProduct('invoice-discounting')}
              className="text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-sans"
            >
              <span>Discount Your Invoices &rarr;</span>
            </button>
          </motion.div>

          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-sans font-semibold text-amber-400 mb-1">Precious Asset Facility</div>
              <h4 className="text-lg font-bold text-white mb-2 font-display">Gold-for-Cash (GFC)</h4>
              <p className="text-xs text-slate-300 mb-4 font-sans leading-relaxed">
                Instant credit backed by physical bullion and certified gold, safeguarded in insured high-security vaults until redemption.
              </p>
            </div>
            <button
              onClick={() => onSelectProduct('gold-for-cash')}
              className="text-xs font-semibold text-amber-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-sans"
            >
              <span>Secure Gold Facility &rarr;</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
