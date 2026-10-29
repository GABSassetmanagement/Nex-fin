import React, { useState } from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  LockKey,
  Users,
  Buildings,
  CheckCircle,
  ArrowRight,
  Clock,
  Car,
  CreditCard,
  Medal,
  PhoneCall,
  WhatsappLogo,
  EnvelopeSimple,
  X,
  Check,
} from '@phosphor-icons/react';
import { LeadershipSection } from './LeadershipSection';
import { ProductBento } from './ProductBento';
import { TrustMarquee } from './TrustMarquee';

interface AboutUsPageProps {
  onOpenApply: (productName?: string) => void;
  onNavigate: (view: string, productId?: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenApply, onNavigate }) => {
  const [advisoryModalOpen, setAdvisoryModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    facilityInterest: 'Suremoney Loan',
    notes: '',
  });

  const handleAdvisorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setAdvisoryModalOpen(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        facilityInterest: 'Suremoney Loan',
        notes: '',
      });
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20 bg-[#07090e] text-white font-sans min-h-screen">
      {/* Contact Advisory Desk Modal */}
      {advisoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setAdvisoryModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-gradient-to-b from-[#0f1422] to-[#080b12] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left font-sans overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setAdvisoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Advisory Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#00e575]">
                Direct Advisory &amp; VIP Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                Speak With an Executive Advisor
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Prefer immediate direct contact? Call or WhatsApp our Abuja central desk right away, or transmit your briefing details below.
              </p>
            </div>

            {/* Direct Instant Channels: Call & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href="tel:+2348091212224"
                className="p-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white flex items-center gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00e575] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" weight="bold" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Instant Phone Call</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#00e575]">+234 809-1212-224</div>
                </div>
              </a>

              <a
                href="https://wa.me/2348091212224?text=Hello%20Nexus%20Finance,%20I%20would%20like%20to%20consult%20with%20an%20Executive%20Advisor."
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white flex items-center gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsappLogo className="w-5 h-5" weight="fill" />
                </div>
                <div>
                  <div className="text-[10px] text-[#25D366] uppercase font-semibold">Direct WhatsApp Chat</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#25D366]">Chat with Advisor</div>
                </div>
              </a>
            </div>

            {/* Form Divider */}
            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Or Transmit Briefing Request
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#00e575] text-black flex items-center justify-center mx-auto mb-2 font-bold">
                  <Check className="w-6 h-6" weight="bold" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">Advisory Request Transmitted</h4>
                <p className="text-xs text-slate-300">
                  Data dispatched to support@nexusfinance.com. A senior underwriting advisor will contact you within operational hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAdvisorySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Henrietta Okolo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00e575]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1">
                      Phone Number (Calls &amp; WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00e575]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00e575]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1">
                      Facility of Interest
                    </label>
                    <select
                      value={formData.facilityInterest}
                      onChange={(e) => setFormData({ ...formData, facilityInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1422] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
                    >
                      <option value="Suremoney Loan">Suremoney Loan (15-Min Disbursal)</option>
                      <option value="Nexus Credit">Nexus Credit (Remita Payroll)</option>
                      <option value="Car-for-Cash">Car-for-Cash (Insured Depot Storage)</option>
                      <option value="Travel Financing">Travel Financing &amp; Proof of Capability</option>
                      <option value="NWEL">Women Empowerment (NWEL)</option>
                      <option value="Invoice Discounting">Invoice Discounting Facility</option>
                      <option value="Shop-Owned Loan">Shop-Owned-Based Loan (SOBL)</option>
                      <option value="Gold-for-Cash">Gold-for-Cash (GFC)</option>
                      <option value="Fixed Deposit">Fixed Deposit Wealth Vault (15.5% APY)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1">
                    Specific Inquiries or Timelines
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Briefly state your liquidity requirement, amount, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00e575]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer"
                >
                  Submit Advisory Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden py-16 sm:py-20 border-b border-white/10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#00e575] font-bold font-sans">
              About Nexus Finance
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display mt-3 mb-6 leading-[1.1]">
              Redefining credit with speed, <span className="text-gradient-emerald">integrity &amp; empathy.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Established under the Nigerian cooperative finance regulatory architecture, Nexus Finance bridges the critical liquidity gap for civil servants, paramilitary officers, entrepreneurs, and forward-thinking enterprises across Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Partners Marquee as requested on About Us page */}
      <div id="partners" className="border-b border-white/5 py-4">
        <TrustMarquee />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mandate & Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#00e575]">
              <ShieldCheck className="w-4 h-4" />
              <span>Regulated Financial Cooperative Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              A dependable financial safety net when it matters most.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Traditional commercial banking often leaves hardworking Nigerians stranded in bureaucratic cycles when urgent capital is required. For public servants facing unexpected hospital bills, merchants seizing bulk seasonal inventory, or families preparing for international study, delayed credit is as damaging as denied credit.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Nexus Finance was founded to deliver ethical, transparent, and ultra-responsive liquidity solutions. By combining state-of-the-art fintech infrastructure (direct IPPIS and Remita payroll integration, NIBSS interbank clearing, and automated credit scoring) with seasoned institutional underwriters, we disburse verified funds in as little as 15 minutes.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply()}
                className="px-6 py-3.5 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-sm transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer flex items-center gap-2"
              >
                <span>Access Immediate Liquidity</span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </button>
              <button
                onClick={() => setAdvisoryModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-sm font-semibold transition-colors cursor-pointer"
              >
                Contact Advisory Desk
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00e575]/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-xl font-bold text-white font-display mb-6">
                Institutional Mandate Highlights
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#00e575] border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">15-Minute Turnaround Standard</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Automated credit checks and swift underwriting ensure you receive funds in minutes, not weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct IPPIS and Remita Payroll Integration</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Automated salary deductions eliminate manual repayments, penalties, and awkward third-party visits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Insured Depot Asset Custody</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Under Car-for-Cash, the customer does not keep and drive the car; vehicles are safely held in our 24/7 insured climate depot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5" weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Women Empowerment (NWEL)</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Subsidized concessionary capital and executive mentorship designed to scale female-led commerce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Core Values - Exact user specifications with tags removed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VISION */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#00e575] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2">VISION</h3>
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed font-sans">
                To be the foremost and most efficient financial services provider in Africa.
              </p>
            </div>
          </div>

          {/* MISSION STATEMENT */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-2">MISSION STATEMENT</h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                We will deliver Exceptional financial service, foster a thriving and satisfied human resources, and collaborate with stakeholders to achieve joint success.
              </p>
            </div>
          </div>

          {/* CORE VALUES */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Medal className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-3">CORE VALUES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>AMBITION</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>BOLDNESS</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>CUSTOMERS</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>GENUINENESS</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>RESPECT</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>SERVICE</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] col-span-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e575]"></span>
                  <span>VALUE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Governance & Accreditation */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-cyan-950/30 border border-white/10 shadow-2xl">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4">
              Statutory Governance &amp; Regulatory Oversight
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Nexus Finance operates under rigorous statutory compliance and auditing protocols governed by:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs uppercase font-bold text-[#00e575] mb-1">Affiliation 01</div>
                <div className="font-bold text-white text-sm">National Cooperative Societies</div>
                <div className="text-xs text-slate-400 mt-1">Federal Republic of Nigeria</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs uppercase font-bold text-cyan-400 mb-1">Affiliation 02</div>
                <div className="font-bold text-white text-sm">National Cooperative Financing Agency</div>
                <div className="text-xs text-slate-400 mt-1">Apex Microfinance Oversight</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs uppercase font-bold text-amber-400 mb-1">Affiliation 03</div>
                <div className="font-bold text-white text-sm">Abuja Cooperative Federation</div>
                <div className="text-xs text-slate-400 mt-1">Federal Capital Territory Council</div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT PORTFOLIO OVERVIEW */}
        <div id="about-products" className="pt-6">
          <ProductBento onSelectProduct={(prodId) => onNavigate('product-detail', prodId)} />
        </div>

        {/* EMBEDDED MANAGEMENT & LEADERSHIP SECTION */}
        <div id="leadership" className="pt-6">
          <LeadershipSection />
        </div>

        {/* Physical Headquarters Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00e575] shrink-0">
              <Buildings className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-display">Visit Our National Headquarters</h4>
              <p className="text-sm text-slate-300 mt-1">
                2nd Floor, Right Wing, NICON Insurance Building, Central Business District (CBD), Abuja, Nigeria.
              </p>
              <div className="text-xs text-slate-400 mt-1">Open Monday – Friday: 8:00 AM – 5:00 PM WAT</div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              Open Google Maps &rarr;
            </a>
            <button
              onClick={() => setAdvisoryModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-[#00e575]/25"
            >
              Contact Advisory Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
