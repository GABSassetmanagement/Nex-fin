import React, { useState, useEffect, useRef } from 'react';
import {
  List,
  X,
  CaretDown,
  Sun,
  Moon,
  Sparkle,
  ShieldCheck,
  CreditCard,
  Bank,
  Car,
  AirplaneTilt,
  Users,
  Storefront,
  Receipt,
  Coins,
  NewspaperClipping,
  Image as ImageIcon,
  Briefcase,
  LockKey,
} from '@phosphor-icons/react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  onOpenApply: (productName?: string) => void;
  onNavigate: (view: string, productId?: string) => void;
  currentView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply, onNavigate, currentView = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'who' | 'products' | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: string, productId?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(view, productId);
  };

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-black/92 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-white font-extrabold text-2xl tracking-tighter shrink-0 font-display group focus-visible:outline-none cursor-pointer"
          >
            <img
              src="./assets/nexus/NEXUS-mark-coloured-1x1.png"
              alt="Nexus Icon"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="tracking-tighter lowercase text-2xl font-black font-display">nexus</span>
          </button>

          {/* Desktop & Tablet Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-neutral-300 font-sans shrink-0">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'home' ? 'text-[#00e575] font-semibold' : ''
              }`}
            >
              Home
            </button>

            {/* Who We Are (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('who')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'who' ? null : 'who')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.05] hover:text-white transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                  ['about', 'blog', 'gallery', 'careers'].includes(currentView)
                    ? 'text-[#00e575] font-semibold'
                    : ''
                }`}
              >
                <span>Who We Are</span>
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ml-0.5 mr-0.5 ${
                    activeDropdown === 'who' ? 'rotate-180 text-[#00e575]' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'who' && (
                <div className="absolute top-full left-0 w-72 pt-2 -mt-1 z-50">
                  <div className="rounded-2xl bg-neutral-950/98 border border-white/15 p-2.5 shadow-2xl backdrop-blur-2xl space-y-1">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#00e575] shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">About Us</div>
                        <div className="text-[10px] text-neutral-400">Institutional mandate &amp; vision</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('leadership')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">Leadership Team</div>
                        <div className="text-[10px] text-neutral-400">Led by veterans of Tier-1 banking</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('blog')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <NewspaperClipping className="w-4 h-4 text-cyan-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Blog &amp; News
                        </div>
                        <div className="text-[10px] text-neutral-400">Financial insights &amp; guides</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('gallery')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">Gallery</div>
                        <div className="text-[10px] text-neutral-400">Headquarters &amp; office highlights</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('careers')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 text-pink-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Careers
                        </div>
                        <div className="text-[10px] text-neutral-400">Join our high-performing team</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('partners')}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer border-t border-white/5 pt-2"
                    >
                      <Bank className="w-4 h-4 text-sky-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">Institutional Partners</div>
                        <div className="text-[10px] text-neutral-400">National commands &amp; MDAs</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Products (Dropdown linking to dedicated Product Pages) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.05] hover:text-white transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                  currentView === 'product-detail' ? 'text-[#00e575] font-semibold' : ''
                }`}
              >
                <span>Products</span>
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ml-0.5 mr-0.5 ${
                    activeDropdown === 'products' ? 'rotate-180 text-[#00e575]' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute top-full -left-16 w-84 pt-2 -mt-1 z-50">
                  <div className="rounded-2xl bg-neutral-950/98 border border-white/15 p-3 shadow-2xl backdrop-blur-2xl max-h-[480px] overflow-y-auto space-y-1">
                    <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-[#00e575] tracking-wider font-sans">
                      Core Credit Facilities
                    </div>

                    <button
                      onClick={() => handleNavClick('product-detail', 'suremoney-loan')}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <Sparkle className="w-4 h-4 text-[#00e575] shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          Suremoney Loan
                          <span className="text-[9px] bg-[#00e575]/20 text-[#00e575] px-1.5 py-0.2 rounded">15 Mins</span>
                        </div>
                        <div className="text-[10px] text-neutral-400">Quick personal &amp; business emergency loan</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('product-detail', 'nexus-credit')}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          Nexus Credit
                          <span className="text-[9px] bg-emerald-500/20 text-[#00e575] px-1.5 py-0.2 rounded font-mono">Remita</span>
                        </div>
                        <div className="text-[10px] text-neutral-400">Salary-based instant payroll credit</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('product-detail', 'car-for-cash')}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-amber-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          Car-for-Cash (CFC)
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">2hr Disbursal</span>
                        </div>
                        <div className="text-[10px] text-neutral-400">Urgent cash · Insured depot storage</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('product-detail', 'travel-financing')}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <AirplaneTilt className="w-4 h-4 text-sky-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">Travel Financing</div>
                        <div className="text-[10px] text-neutral-400">Embassy visa &amp; study proof of funds</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('product-detail', 'women-empowerment')}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-pink-400 shrink-0" weight="bold" />
                      <div>
                        <div className="text-xs font-semibold text-white">Women Empowerment (NWEL)</div>
                        <div className="text-[10px] text-neutral-400">Concessionary capital for female enterprise</div>
                      </div>
                    </button>

                    <div className="border-t border-white/10 my-1 pt-1">
                      <button
                        onClick={() => handleNavClick('product-detail', 'shop-owned-sme')}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                      >
                        <Storefront className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Shop-Owned Loan</div>
                          <div className="text-[10px] text-neutral-400">SME &amp; retail merchant inventory</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('product-detail', 'invoice-discounting')}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                      >
                        <Receipt className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Invoice Discounting</div>
                          <div className="text-[10px] text-neutral-400">Unlock 60–90 day receivables</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('product-detail', 'gold-for-cash')}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                      >
                        <Coins className="w-4 h-4 text-amber-300 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Gold-for-Cash (GFC)</div>
                          <div className="text-[10px] text-neutral-400">Appraised physical precious assets</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('product-detail', 'high-yield-investments')}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer"
                      >
                        <LockKey className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                            Fixed Deposit Vaults
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">15.5% APY</span>
                          </div>
                          <div className="text-[10px] text-neutral-400">Guaranteed wealth preservation</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Loan Calculator */}
            <button
              onClick={() => handleNavClick('calculator')}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'calculator' ? 'text-[#00e575] font-semibold' : ''
              }`}
            >
              Loan Calculator
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'contact' ? 'text-[#00e575] font-semibold' : ''
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Action cluster: Theme Toggle + CTA Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle Button (Light/Dark mode) */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-medium"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300" weight="bold" />
                  <span className="hidden sm:inline text-[11px] font-sans">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" weight="bold" />
                  <span className="hidden sm:inline text-[11px] font-sans">Dark</span>
                </>
              )}
            </button>

            {/* Apply Now Button */}
            <button
              onClick={() => onOpenApply()}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-black bg-[#00e575] hover:bg-[#15f38a] active:scale-95 rounded-full transition-all duration-200 shadow-md shadow-[#00e575]/25 cursor-pointer whitespace-nowrap font-sans"
            >
              Apply Now
            </button>

            {/* Mobile / Tablet menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-neutral-300 hover:text-white focus:outline-none rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-black/98 border-b border-white/10 px-6 py-6 backdrop-blur-2xl max-h-[85vh] overflow-y-auto font-sans">
          <nav className="flex flex-col gap-3 text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-1.5 text-base font-semibold text-white hover:text-[#00e575]"
            >
              Home
            </button>

            {/* Mobile Who We Are Accordion */}
            <div className="border-t border-white/10 pt-2">
              <button
                onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
                className="w-full flex items-center justify-between py-1.5 text-base font-semibold text-white"
              >
                <span>Who We Are</span>
                <CaretDown className={`w-4 h-4 transition-transform ${mobileWhoOpen ? 'rotate-180 text-[#00e575]' : ''}`} />
              </button>
              {mobileWhoOpen && (
                <div className="pl-4 space-y-2 py-2 text-xs text-neutral-300">
                  <button
                    onClick={() => handleNavClick('about')}
                    className="block text-left w-full py-1 hover:text-[#00e575]"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => handleNavClick('leadership')}
                    className="block text-left w-full py-1 hover:text-[#00e575]"
                  >
                    Leadership Team
                  </button>
                  <button
                    onClick={() => handleNavClick('blog')}
                    className="block text-left w-full py-1 hover:text-[#00e575] font-semibold"
                  >
                    Blog &amp; News
                  </button>
                  <button
                    onClick={() => handleNavClick('gallery')}
                    className="block text-left w-full py-1 hover:text-[#00e575]"
                  >
                    Gallery &amp; Office Highlights
                  </button>
                  <button
                    onClick={() => handleNavClick('careers')}
                    className="block text-left w-full py-1 hover:text-[#00e575]"
                  >
                    Careers
                  </button>
                  <button
                    onClick={() => handleNavClick('partners')}
                    className="block text-left w-full py-1 hover:text-[#00e575]"
                  >
                    Institutional Partners
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Products Accordion */}
            <div className="border-t border-white/10 pt-2">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between py-1.5 text-base font-semibold text-white"
              >
                <span>Products</span>
                <CaretDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180 text-[#00e575]' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 space-y-2 py-2 text-xs text-neutral-300">
                  <button
                    onClick={() => handleNavClick('product-detail', 'suremoney-loan')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575] font-semibold"
                  >
                    Suremoney Loan (15-Min Disbursal)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'nexus-credit')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575] font-semibold"
                  >
                    Nexus Credit (Remita Salary)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'car-for-cash')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575] font-semibold"
                  >
                    Car-for-Cash (2hr Disbursal · Depot)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'travel-financing')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575] font-semibold"
                  >
                    Travel Financing (Visa &amp; Study)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'women-empowerment')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575]"
                  >
                    Women Empowerment (NWEL)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'shop-owned-sme')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575]"
                  >
                    Shop-Owned Loan (SOBL)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'invoice-discounting')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575]"
                  >
                    Invoice Discounting Facility (IDF)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'gold-for-cash')}
                    className="block text-left w-full py-1 text-white hover:text-[#00e575]"
                  >
                    Gold-for-Cash (GFC)
                  </button>
                  <button
                    onClick={() => handleNavClick('product-detail', 'high-yield-investments')}
                    className="block text-left w-full py-1 text-cyan-400 hover:text-white"
                  >
                    Fixed Deposit Vaults (15.5% APY)
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('calculator')}
              className="text-left py-1.5 text-base font-semibold text-white hover:text-[#00e575] border-t border-white/10 pt-2"
            >
              Loan Calculator
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-1.5 text-base font-semibold text-white hover:text-[#00e575]"
            >
              Contact Us
            </button>

            {/* Mobile Theme Toggle Row */}
            <div className="pt-3 flex items-center justify-between border-t border-white/10 text-sm">
              <span className="text-neutral-400">Appearance</span>
              <button
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" weight="bold" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" weight="bold" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-sm rounded-full text-center shadow-lg shadow-[#00e575]/25 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
