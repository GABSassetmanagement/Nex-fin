import React, { useState } from 'react';
import { CreditCard, Lock, Unlock, Shield, Bell, Sliders, CheckCircle, Wifi, Eye, EyeOff } from 'lucide-react';

export const CardShowcase: React.FC = () => {
  const [cardType, setCardType] = useState<'virtual' | 'physical'>('virtual');
  const [isFrozen, setIsFrozen] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(2500000);
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [showSecurityCode, setShowSecurityCode] = useState(false);

  return (
    <section id="security" className="py-24 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-slate-300 mb-4 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-[#00e575]" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Next-Gen Corporate &amp; Officer Cards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 text-balance">
            Total control of your capital. <br />
            <span className="text-gradient-emerald">Down to the second.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Link your Kiakia credit line, investment vault, or operating account to high-limit Nexus physical and virtual cards with zero unauthorized liability.
          </p>
        </div>

        {/* Card Management Interactive Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Card Mockup with 3D feel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Card Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-white/[0.05] border border-white/10 mb-6 text-xs">
              <button
                onClick={() => setCardType('virtual')}
                className={`px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  cardType === 'virtual' ? 'bg-[#00e575] text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Instant Virtual Card
              </button>
              <button
                onClick={() => setCardType('physical')}
                className={`px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  cardType === 'physical' ? 'bg-[#00e575] text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Titanium Physical Card
              </button>
            </div>

            {/* The Interactive Debit Card */}
            <div
              className={`w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between ${
                isFrozen
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700 opacity-75 grayscale'
                  : cardType === 'virtual'
                  ? 'bg-gradient-to-br from-[#0e1626] via-[#09101b] to-[#040810] border border-[#00e575]/40 shadow-emerald-500/10'
                  : 'bg-gradient-to-br from-[#1c1917] via-[#0c0a09] to-[#07090e] border border-amber-500/40 shadow-amber-500/10'
              }`}
            >
              {/* Shimmer holographic stripe */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_4s_infinite] pointer-events-none"
                style={{
                  backgroundSize: '200% 100%',
                }}
              />

              {/* Card Top */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e575] to-[#38bdf8] flex items-center justify-center font-bold text-black text-xs font-mono">
                    N
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase text-white font-mono">
                    NEXUS FINANCE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Wifi className="w-5 h-5 text-slate-300" />
                  <span className="text-[10px] font-mono border border-white/20 px-1.5 py-0.5 rounded text-white">
                    {cardType === 'virtual' ? 'VIRTUAL' : 'METAL'}
                  </span>
                </div>
              </div>

              {/* Card Chip & Status */}
              <div className="flex items-center justify-between my-auto relative z-10">
                <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-100 border border-amber-500/60 flex flex-col justify-around p-1 shadow-inner">
                  <div className="w-full h-px bg-amber-700/40" />
                  <div className="w-full h-px bg-amber-700/40" />
                </div>
                {isFrozen ? (
                  <span className="text-xs font-mono text-rose-400 bg-rose-500/20 px-2.5 py-1 rounded-md border border-rose-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    CARD FROZEN
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    ACTIVE · ₦{dailyLimit.toLocaleString('en-NG')} LIMIT
                  </span>
                )}
              </div>

              {/* Card Bottom */}
              <div className="relative z-10">
                <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-white mb-2 tabular-nums">
                  {showSecurityCode ? '5399 8240 1928 6641' : '5399 •••• •••• 6641'}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Cardholder</div>
                    <div className="text-xs font-semibold text-white tracking-wide">DR. OLUWASEUN ADEYEMI</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">CVV</div>
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      {showSecurityCode ? '884' : '•••'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Expires</div>
                    <div className="text-xs font-mono font-semibold text-white">10/29</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Card Action bar */}
            <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
              <button
                onClick={() => setShowSecurityCode(!showSecurityCode)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {showSecurityCode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showSecurityCode ? 'Hide Numbers' : 'Show Card Numbers'}</span>
              </button>
              <span>·</span>
              <button
                onClick={() => setIsFrozen(!isFrozen)}
                className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                  isFrozen ? 'text-emerald-400' : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                {isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isFrozen ? 'Unfreeze Card' : 'Freeze Card Instantly'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Controls Console */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00e575]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Live Security &amp; Limit Console
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">Zero Trust Protocol</span>
            </div>

            {/* Daily Limit Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Daily Spending Limit:</span>
                <span className="text-base font-bold font-mono text-white tabular-nums">
                  ₦{dailyLimit.toLocaleString('en-NG')}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00e575]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>₦100k</span>
                <span>₦5,000,000</span>
                <span>₦10M Limit</span>
              </div>
            </div>

            {/* Security Toggles */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-xs font-semibold text-white">Online E-commerce &amp; Web POS</div>
                  <div className="text-[11px] text-slate-400">Permit online card checkout and international billing</div>
                </div>
                <button
                  onClick={() => setOnlineEnabled(!onlineEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    onlineEnabled ? 'bg-[#00e575]' : 'bg-slate-700'
                  }`}
                  aria-label="Toggle online ecommerce"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      onlineEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-xs font-semibold text-white">Temporary Card Freeze</div>
                  <div className="text-[11px] text-slate-400">Instantly block all card debits without canceling the card</div>
                </div>
                <button
                  onClick={() => setIsFrozen(!isFrozen)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    isFrozen ? 'bg-rose-500' : 'bg-slate-700'
                  }`}
                  aria-label="Toggle card freeze"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      isFrozen ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Live Transaction Ledger Simulator */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
                <span>Recent Card Activities</span>
                <span className="text-[10px] text-[#00e575]">Live Sync</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'Supermarket POS · Abuja CBD', time: '14 mins ago', amount: '-₦18,400.00', status: 'Approved' },
                  { title: 'Kiakia Loan Disbursal', time: '2 hours ago', amount: '+₦1,500,000.00', status: 'Credited' },
                  { title: 'Monthly Fixed Deposit Yield', time: 'Yesterday', amount: '+₦42,500.00', status: 'Interest Payout' },
                ].map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] text-xs border border-white/5"
                  >
                    <div>
                      <div className="text-white font-medium">{tx.title}</div>
                      <div className="text-[10px] text-slate-400">{tx.time}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono font-semibold ${tx.amount.startsWith('+') ? 'text-[#00e575]' : 'text-slate-300'}`}>
                        {tx.amount}
                      </div>
                      <div className="text-[10px] text-slate-400">{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00e575] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">PCI DSS Level 1 Certified</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bank-grade encryption, encrypted cryptographic keys, and tokenized payments compliant with global monetary standards.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">24/7 Algorithmic Sentinel</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated heuristic fraud detection monitoring abnormal transaction patterns and shielding your balances round the clock.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Zero Personal Liability</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full customer protection. Any verified unauthorized transaction is instantly reimbursed with zero friction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
