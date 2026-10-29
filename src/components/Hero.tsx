import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  CheckCircle,
  CaretLeft,
  CaretRight,
  Pause,
  Play,
} from '@phosphor-icons/react';

interface HeroProps {
  onOpenApply: (productName?: string, amount?: number, tenure?: number) => void;
  onScrollToCalculator: () => void;
  onNavigateProduct?: (productId: string) => void;
}

interface SlideData {
  id: string;
  targetProductId: string;
  headlineLine1: string;
  headlineLine2Prefix?: string;
  headlineLine2Highlight: string;
  description: string;
  features: [string, string, string, string];
  primaryCtaText: string;
  primaryProduct: string;
  defaultAmount: number;
  defaultTenure: number;
  secondaryCtaText: string;
  image: string;
  imageAlt: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'car-for-cash',
    targetProductId: 'car-for-cash',
    headlineLine1: 'Turn your',
    headlineLine2Prefix: 'Car ',
    headlineLine2Highlight: 'into Cash!',
    description:
      'A short-term collateralized loan that allows vehicle owners to access urgent funds using their fully paid, registered car as security — safely parked, inspected, and protected in our 24/7 insured, climate-controlled depot.',
    features: [
      'Insured 24/7 climate depot storage',
      'Immediate same-day payout up to 70%',
      'Up to ₦25,000,000 vehicle equity',
      'Pristine vehicle return upon payoff',
    ],
    primaryCtaText: 'Apply for Car for Cash',
    primaryProduct: 'Car-for-Cash (CFC)',
    defaultAmount: 5000000,
    defaultTenure: 1,
    secondaryCtaText: 'Estimate Vehicle Equity',
    image: './assets/nexus/hero_car.jpg',
    imageAlt: 'Luxury executive sports car in dark studio representing Car for Cash loan',
  },
  {
    id: 'suremoney',
    targetProductId: 'suremoney-loan',
    headlineLine1: 'Get ₦1 Million',
    headlineLine2Highlight: 'in Minutes!',
    description:
      'Your trusted financial partner specializing in providing quick and flexible loan options to meet your personal and business needs with prompt disbursement directly to your account.',
    features: [
      'No collateral required',
      'Disbursement in 15 mins',
      'Up to ₦10,000,000 instant credit',
      'Competitive monthly rates from 3% to 5%',
    ],
    primaryCtaText: 'Apply for Suremoney Loan',
    primaryProduct: 'Suremoney Loan',
    defaultAmount: 1000000,
    defaultTenure: 1,
    secondaryCtaText: 'Estimate Repayments',
    image: './assets/nexus/naira_1000_stacks.jpg',
    imageAlt: 'Authentic crisp stacks of ₦1,000 Nigerian Naira banknotes with official wrappers symbolizing instant liquidity',
  },
  {
    id: 'travel-financing',
    targetProductId: 'travel-financing',
    headlineLine1: 'Need Travel',
    headlineLine2Highlight: 'Financing?',
    description:
      'Our Travel Financing & Proof of Capability service delivers a professional, bank-verified statement that confirms your financial standing for visa applications, international study, contracts, or major overseas travel.',
    features: [
      '100% legally recognized & certified',
      'Bank-verified & embassy-accepted',
      'Fast confidential 12–24hr turnaround',
      'Accepted for UK, US, Canada & Schengen',
    ],
    primaryCtaText: 'Apply for Travel Financing',
    primaryProduct: 'Travel Financing',
    defaultAmount: 15000000,
    defaultTenure: 1,
    secondaryCtaText: 'Verify Travel Criteria',
    image: './assets/nexus/travel_documents.jpg',
    imageAlt: 'International passport and verified financial certificate on dark slate',
  },
];

const AUTO_SLIDE_DURATION = 6500; // 6.5s per slide

export const Hero: React.FC<HeroProps> = ({
  onOpenApply,
  onScrollToCalculator,
  onNavigateProduct,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Subtle scroll parallax tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  const handleNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  // Timer interval for auto sliding
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const increment = (intervalStep / AUTO_SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, handleNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      className="relative bg-black text-white overflow-hidden select-none font-body pt-28 pb-12 md:pt-36 md:pb-16 min-h-[660px] lg:min-h-[720px] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Nexus Finance Featured Products"
    >
      {/* FULL-BLEED CINEMATIC BACKGROUND IMAGE (RIGHT 60% WITH DARK VIGNETTE & SUBTLE PARALLAX) */}
      <div className="absolute top-0 right-0 w-full lg:w-[62%] h-full pointer-events-none select-none overflow-hidden z-0">
        <motion.div
          className="w-full h-full relative"
          animate={{
            x: mouseOffset.x * 18,
            y: Math.min(scrollY * 0.16, 90) + mouseOffset.y * 14,
            scale: 1.06,
          }}
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 26,
            mass: 0.5,
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={activeSlide.id}
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center lg:object-right"
              loading="eager"
              fetchPriority="high"
            />
          </AnimatePresence>
        </motion.div>

        {/* Seamless Dark Gradients blending into the black content area */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/90 lg:from-black lg:via-black/75 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* FOREGROUND HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl text-left">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Massive Main Display Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight text-white font-display leading-[1.05] mb-6">
                {activeSlide.headlineLine1}
                <br />
                {activeSlide.headlineLine2Prefix && (
                  <span>{activeSlide.headlineLine2Prefix}</span>
                )}
                <span className="text-[#00e575] drop-shadow-[0_0_35px_rgba(0,229,117,0.45)]">
                  {activeSlide.headlineLine2Highlight}
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl mb-8">
                {activeSlide.description}
              </p>

              {/* 2x2 Feature Checkmarks matching Screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 max-w-xl mb-10 font-sans">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <span className="text-[#00e575] shrink-0">
                    <CheckCircle className="w-4 h-4" weight="bold" />
                  </span>
                  <span className="font-medium">{activeSlide.features[0]}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <span className="text-[#00e575] shrink-0">
                    <CheckCircle className="w-4 h-4" weight="bold" />
                  </span>
                  <span className="font-medium">{activeSlide.features[1]}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <span className="text-[#00e575] shrink-0">
                    <CheckCircle className="w-4 h-4" weight="bold" />
                  </span>
                  <span className="font-medium">{activeSlide.features[2]}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                  <span className="text-[#00e575] shrink-0">
                    <CheckCircle className="w-4 h-4" weight="bold" />
                  </span>
                  <span className="font-medium">{activeSlide.features[3]}</span>
                </div>
              </div>

              {/* Action Buttons matching Screenshot */}
              <div className="flex flex-wrap items-center gap-4 font-sans">
                <button
                  onClick={() => {
                    if (onNavigateProduct) {
                      onNavigateProduct(activeSlide.targetProductId);
                    } else {
                      onOpenApply(
                        activeSlide.primaryProduct,
                        activeSlide.defaultAmount,
                        activeSlide.defaultTenure
                      );
                    }
                  }}
                  className="px-8 py-4 bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-sm sm:text-base rounded-full transition-all duration-200 shadow-xl shadow-[#00e575]/25 cursor-pointer flex items-center gap-2 group active:scale-95"
                >
                  <span>{activeSlide.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onScrollToCalculator}
                  className="px-7 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white font-medium text-sm sm:text-base rounded-full border border-white/10 transition-all duration-200 cursor-pointer flex items-center gap-1.5 backdrop-blur-md hover:border-white/20 active:scale-95"
                >
                  <span>{activeSlide.secondaryCtaText}</span>
                  <span className="text-xs">↓</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* SLIDE CONTROLS & BOTTOM NAVIGATION BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Slide Indicator Tabs with Auto-Play Progress Fill */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full md:w-auto font-sans">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-neutral-900/90 border-white/20 shadow-lg'
                      : 'bg-neutral-950/40 border-white/5 hover:border-white/15 text-neutral-400 hover:text-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.headlineLine1} ${slide.headlineLine2Highlight}`}
                  aria-selected={isActive}
                >
                  {/* Progress Line for Active Slide */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 top-0 opacity-15 pointer-events-none transition-all"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: '#00e575',
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[11px] font-sans mb-1">
                      <span className={isActive ? 'font-bold text-white' : 'text-neutral-500'}>
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e575]" />
                      )}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isActive ? 'text-white' : 'text-neutral-400'
                      }`}
                    >
                      {idx === 0 && 'Car into Cash'}
                      {idx === 1 && '₦1M in Minutes'}
                      {idx === 2 && 'Travel Financing'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Prev/Next & Play/Pause */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
              aria-label={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Previous Arrow */}
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <CaretLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <CaretRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROOF PANEL METRICS STRIP FROM USER SITE */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums">
                29 <span className="text-base sm:text-lg font-normal text-neutral-400">years</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Combined 29 years of leadership experience in lending.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums">
                50,000<span className="text-[#00e575]">+</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Loans impacted over 50k people and institutions nationwide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums">
                ₦15<span className="text-base sm:text-lg font-normal text-neutral-400">bn</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Successfully managed over ₦15 billion in transactions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00e575] font-display tabular-nums">
                15 <span className="text-base sm:text-lg font-normal text-neutral-400">mins</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Prompt loan disbursement in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
