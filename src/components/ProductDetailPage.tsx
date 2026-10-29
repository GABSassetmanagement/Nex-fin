import React, { useState } from 'react';
import { NEXUS_PRODUCTS } from '../data/content';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  CurrencyNgn,
  ShieldCheck,
  FileText,
  Calculator,
  ArrowRight,
  Car,
  CreditCard,
  Sparkle,
  AirplaneTilt,
  Storefront,
  Receipt,
  Coins,
  Buildings,
  Info,
} from '@phosphor-icons/react';

interface ProductDetailPageProps {
  productId: string;
  onOpenApply: (productName: string, amount?: number, tenure?: number) => void;
  onNavigate: (view: string, productId?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onOpenApply,
  onNavigate,
}) => {
  // Normalize match
  const product =
    NEXUS_PRODUCTS.find(
      (p) =>
        p.id === productId ||
        p.name.toLowerCase().includes(productId.toLowerCase()) ||
        productId.toLowerCase().includes(p.name.toLowerCase().slice(0, 5))
    ) || NEXUS_PRODUCTS[0];

  // Specific simulation parameters per product
  const getProductDefaults = (prodId: string) => {
    switch (prodId) {
      case 'suremoney-loan':
        return { min: 100000, max: 10000000, step: 50000, defaultAmt: 1500000, defaultMo: 1, monthlyRate: 0.05 };
      case 'nexus-credit':
        return { min: 100000, max: 5000000, step: 50000, defaultAmt: 1000000, defaultMo: 1, monthlyRate: 0.045 };
      case 'car-for-cash':
        return { min: 500000, max: 25000000, step: 100000, defaultAmt: 5000000, defaultMo: 1, monthlyRate: 0.05 };
      case 'travel-financing':
        return { min: 1000000, max: 50000000, step: 500000, defaultAmt: 15000000, defaultMo: 1, monthlyRate: 0.04 };
      case 'women-empowerment':
        return { min: 100000, max: 5000000, step: 50000, defaultAmt: 1000000, defaultMo: 1, monthlyRate: 0.035 };
      case 'shop-owned-sme':
        return { min: 250000, max: 15000000, step: 100000, defaultAmt: 2500000, defaultMo: 1, monthlyRate: 0.055 };
      case 'invoice-discounting':
        return { min: 1000000, max: 50000000, step: 500000, defaultAmt: 10000000, defaultMo: 1, monthlyRate: 0.04 };
      case 'gold-for-cash':
        return { min: 300000, max: 20000000, step: 100000, defaultAmt: 2000000, defaultMo: 1, monthlyRate: 0.045 };
      case 'high-yield-investments':
        return { min: 250000, max: 20000000, step: 100000, defaultAmt: 2000000, defaultMo: 1, monthlyRate: 0.0129 }; // 15.5% annual
      default:
        return { min: 100000, max: 10000000, step: 50000, defaultAmt: 1500000, defaultMo: 1, monthlyRate: 0.05 };
    }
  };

  const config = getProductDefaults(product.id);
  const [simAmount, setSimAmount] = useState<number>(config.defaultAmt);
  const [simTenure, setSimTenure] = useState<number>(config.defaultMo);

  const monthlyPrincipal = simAmount / simTenure;
  const monthlyInterest = simAmount * config.monthlyRate;
  const monthlyInstallment = monthlyPrincipal + monthlyInterest;
  const totalRepayment = simAmount + monthlyInterest * simTenure;

  const isDeposit = product.id === 'high-yield-investments';

  return (
    <div className="pt-24 pb-20 bg-[#07090e] text-white font-sans min-h-screen">
      {/* Back to Products Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <button
          onClick={() => onNavigate('about-products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>
      </div>

      {/* Product Hero Banner */}
      <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-[#0e1320] via-[#090d16] to-[#07090e] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#00e575]/10 text-[#00e575] border border-[#00e575]/20">
                  {product.badge}
                </span>
                <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {product.turnaroundTime}
                </span>
                <span className="text-xs font-medium text-neutral-400 bg-white/[0.04] px-3 py-1 rounded-full border border-white/10">
                  Limit: {product.maxAmount}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
                {product.name}
              </h1>

              <p className="text-lg text-emerald-400 font-medium">
                {product.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {product.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenApply(product.name, simAmount, simTenure)}
                  className="px-8 py-3.5 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-sm transition-all shadow-xl shadow-[#00e575]/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for {product.name}</span>
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('product-simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Calculate Terms &darr;
                </button>
              </div>
            </div>

            {/* Quick Metrics Pillar */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-black/50 border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Facility Specifications
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Typical Turnaround</span>
                  <span className="font-semibold text-white">{product.turnaroundTime}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Interest / Placement Rate</span>
                  <span className="font-semibold text-[#00e575]">{product.rateInfo}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Allowed Tenure</span>
                  <span className="font-semibold text-white">{product.tenure}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Collateral Requirement</span>
                  <span className="font-semibold text-cyan-400">
                    {product.id === 'car-for-cash'
                      ? 'Depot Vehicle Storage'
                      : product.id === 'gold-for-cash'
                      ? 'Precious Metal Appraisal'
                      : 'Zero Collateral Required'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body: Requirements, Interactive Simulator & Application Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Requirements & Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Documentation & Eligibility */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#00e575]/10 text-[#00e575] flex items-center justify-center">
                  <FileText className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Required Documentation
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Please have the following documentation ready to expedite your 15-minute verification:
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                {product.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#00e575] shrink-0 mt-0.5" weight="bold" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00e575]" />
              <span>Verified under Nigerian Data Protection Regulation (NDPR)</span>
            </div>
          </div>

          {/* Key Advantage / Underwriting Doctrine */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Sparkle className="w-5 h-5" weight="bold" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Institutional Value Proposition
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Why professionals and enterprise owners prefer this facility:
              </p>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 text-sm text-slate-200 leading-relaxed font-medium">
                "{product.keyBenefit}"
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct interbank settlement to any commercial bank account</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Zero pre-payment penalties for early settlement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Transparent fee schedules with 0 hidden administrative charges</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-slate-400">
              Assisted by licensed credit underwriters at our Abuja NICON Insurance Building office.
            </div>
          </div>
        </div>

        {/* Dedicated Calculator for this facility */}
        <div id="product-simulator" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00e575] mb-2">
              <Calculator className="w-4 h-4" />
              <span>Dedicated Rate &amp; Installment Simulator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Simulate {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Adjust the slider and tenure to view exact repayment or yield commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase font-semibold text-slate-300">
                    Principal Amount
                  </label>
                  <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-1 focus-within:border-[#00e575] transition-colors">
                    <span className="text-sm font-bold text-[#00e575]">₦</span>
                    <input
                      type="text"
                      value={simAmount.toLocaleString('en-NG')}
                      onChange={(e) => {
                        const numeric = parseInt(e.target.value.replace(/[^0-9]/g, '') || '0', 10);
                        setSimAmount(numeric);
                      }}
                      className="w-32 sm:w-36 bg-transparent text-right font-display font-bold text-white text-lg focus:outline-none tabular-nums"
                      aria-label="Editable principal amount"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={simAmount}
                  onChange={(e) => setSimAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00e575]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₦{config.min.toLocaleString('en-NG')} (Min)</span>
                  <span>₦{config.max.toLocaleString('en-NG')} (Max)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-2">
                  Facility Tenure (Months)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 3, 6, 9, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSimTenure(m)}
                      className={`py-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        simTenure === m
                          ? 'bg-[#00e575] text-black border-[#00e575]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m} {m === 1 ? 'Month' : 'Months'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-4">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Estimated Breakdown
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-slate-400 mb-0.5">Estimated Monthly Installment:</div>
                <div className="text-3xl font-black font-display text-[#00e575] tabular-nums">
                  ₦{Math.round(monthlyInstallment).toLocaleString('en-NG')}
                  <span className="text-xs text-slate-400 font-sans">/mo</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Total Repayment:</span>
                  <span className="font-semibold text-white">₦{Math.round(totalRepayment).toLocaleString('en-NG')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Monthly Interest Rate:</span>
                  <span className="font-semibold text-emerald-400">{(config.monthlyRate * 100).toFixed(1)}% monthly</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Disbursement SLA:</span>
                  <span className="font-semibold text-white">{product.turnaroundTime}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenApply(product.name, simAmount, simTenure)}
                className="w-full py-3.5 bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer mt-2"
              >
                Apply for this ₦{simAmount.toLocaleString('en-NG')} Facility
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step Simple Application Flow */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display text-center mb-10">
            How It Works in 3 Quick Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00e575] mx-auto mb-4 font-bold font-display text-lg">
                1
              </div>
              <h4 className="text-base font-bold text-white mb-2">Apply Online in 2 Minutes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide your basic employment or business information, required facility amount, and government identification.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mx-auto mb-4 font-bold font-display text-lg">
                2
              </div>
              <h4 className="text-base font-bold text-white mb-2">Algorithmic Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our automated underwriting engine verifies BVN credentials and employment status with zero manual paperwork bottlenecks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mx-auto mb-4 font-bold font-display text-lg">
                3
              </div>
              <h4 className="text-base font-bold text-white mb-2">Prompt Bank Disbursement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Funds are routed via NIBSS directly into your Nigerian commercial bank account in as little as 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
