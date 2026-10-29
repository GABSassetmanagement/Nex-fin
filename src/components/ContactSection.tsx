import React, { useState } from 'react';
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  CheckCircle,
  ChatCircleDots,
  WhatsappLogo,
  CaretDown,
  ArrowSquareOut,
} from '@phosphor-icons/react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Suremoney Loan (MDA & Paramilitary)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API dispatch to support@nexusfinance.com
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-[#07090e] border-t border-white/5 relative font-body io-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Headquarters, Direct Contacts & Google Map */}
          <div className="lg:col-span-5 flex flex-col justify-between font-sans">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-balance font-display">
                Ping us, <br />
                <span className="text-gradient-emerald">we’re here for you.</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed mb-8 font-sans">
                Our team at the Federal Capital Territory is on standby. Reach out with questions about your loan schedule, car appraisal, proof of funds, or investment vault.
              </p>

              <div className="space-y-6 text-sm text-slate-300 font-sans mb-8">
                {/* Head Office with Google Map link */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00e575] shrink-0 mt-0.5 group-hover:border-[#00e575] transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-slate-400">Head Office</div>
                    <a
                      href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium mt-0.5 hover:text-[#00e575] transition-colors flex items-center gap-1.5"
                    >
                      <span>2nd Floor, Right Wing, NICON Insurance Building,</span>
                      <ArrowSquareOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00e575]" />
                    </a>
                    <div className="text-slate-400">Central Business District (CBD), Abuja, Nigeria.</div>
                  </div>
                </div>

                {/* Direct Phone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00e575] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-slate-400">Direct Officer Lines &amp; WhatsApp</div>
                    <div className="text-white font-medium mt-0.5 flex flex-wrap items-center gap-2">
                      <a href="tel:+2348091212224" className="hover:text-[#00e575] transition-colors font-semibold">
                        +234 809 121 2224
                      </a>
                      <span className="text-slate-600">|</span>
                      <a
                        href="https://wa.me/2348091212224"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00e575] hover:bg-emerald-500/20 text-xs border border-emerald-500/20 transition-colors"
                      >
                        <WhatsappLogo className="w-3.5 h-3.5" weight="fill" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">Mon–Fri: 8:00 AM – 5:00 PM WAT</div>
                  </div>
                </div>

                {/* Electronic Mail */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00e575] shrink-0 mt-0.5">
                    <EnvelopeSimple className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-semibold text-slate-400">Electronic Mail</div>
                    <div className="text-white font-medium mt-0.5">
                      <a href="mailto:support@nexusfinance.com" className="hover:text-[#00e575] transition-colors font-semibold">
                        support@nexusfinance.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps Container */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-[16/9] w-full bg-slate-900 relative">
                <iframe
                  title="Nexus Finance Head Office - NICON Insurance Building Abuja"
                  src="https://maps.google.com/maps?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-lg bg-black/80 hover:bg-black text-[11px] font-semibold text-[#00e575] border border-white/20 backdrop-blur-md transition-colors flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowSquareOut className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with properly spaced Dropdown */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 shadow-2xl font-sans flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#00e575] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" weight="bold" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Inquiry Transmitted to Support</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formState.name}</span>. Your priority message has been dispatched to <strong className="text-[#00e575]">support@nexusfinance.com</strong>. A dedicated credit desk officer will respond to your provided contact within minutes.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:support@nexusfinance.com?subject=Inquiry%20from%20${encodeURIComponent(formState.name)}%20-%20${encodeURIComponent(formState.topic)}&body=${encodeURIComponent(`Name: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nTopic: ${formState.topic}\n\nMessage:\n${formState.message}`)}`}
                    className="px-6 py-2.5 rounded-xl bg-[#00e575] text-black text-xs font-bold hover:bg-[#15f38a] transition-all cursor-pointer shadow-md"
                  >
                    Open in Your Email Client
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', phone: '', topic: 'Suremoney Loan (MDA & Paramilitary)', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Abubakar"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00e575] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 000 0000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00e575] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.gov.ng"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00e575] transition-colors"
                    />
                  </div>

                  {/* Dropdown with generous right padding (pr-11) and custom Chevron icon to prevent touching the edge */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Facility of Interest *
                    </label>
                    <div className="relative">
                      <select
                        value={formState.topic}
                        onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                        className="w-full appearance-none pl-4 pr-11 py-3.5 rounded-xl bg-[#090d17] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00e575] transition-colors cursor-pointer truncate"
                      >
                        <option value="Suremoney Loan (MDA & Paramilitary)">Suremoney Loan (15-Min Disbursal)</option>
                        <option value="Nexus Credit (Salary-Based)">Nexus Credit (Remita Salary-Based)</option>
                        <option value="Car-for-Cash (CFC)">Car-for-Cash (2hr Disbursal · Depot Stored)</option>
                        <option value="Travel Financing">Travel Financing (Visa &amp; Study POF)</option>
                        <option value="Nexus Women Empowerment (NWEL)">Women Empowerment Loan (NWEL)</option>
                        <option value="Shop-Owned Loan (SOBL SME)">Shop-Owned Loan (SOBL SME)</option>
                        <option value="Invoice Discounting Facility">Invoice Discounting (IDF)</option>
                        <option value="Gold-for-Cash (GFC)">Gold-for-Cash (GFC)</option>
                        <option value="Institutional Fixed Deposit Vault">High-Yield Fixed Deposit (15.5%)</option>
                        <option value="Other Corporate Inquiry">General Corporate Partnership</option>
                      </select>
                      <CaretDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                    How Can We Assist You?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details on your desired facility amount, command/agency, or specific timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00e575] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#00e575] hover:bg-[#15f38a] active:scale-[0.98] text-black font-semibold text-sm rounded-xl transition-all duration-200 shadow-xl shadow-[#00e575]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{submitting ? 'Transmitting to support@nexusfinance.com...' : 'Submit Priority Inquiry'}</span>
                    <PaperPlaneTilt className="w-4 h-4" weight="bold" />
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-3 font-sans">
                    Submissions are transmitted directly to <span className="text-[#00e575]">support@nexusfinance.com</span> under NDPR encryption protocols.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
