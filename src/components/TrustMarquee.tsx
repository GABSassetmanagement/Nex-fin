import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface Partner {
  id: string;
  name: string;
  fullName: string;
}

const INSTITUTIONAL_PARTNERS: Partner[] = [
  { id: 'frsc', name: 'FRSC', fullName: 'Federal Road Safety Corps' },
  { id: 'efcc', name: 'EFCC', fullName: 'Economic and Financial Crimes Commission' },
  { id: 'npf', name: 'NIGERIA POLICE', fullName: 'Nigeria Police Force' },
  { id: 'ndlea', name: 'NDLEA', fullName: 'National Drug Law Enforcement Agency' },
  { id: 'nscdc', name: 'CIVIL DEFENCE', fullName: 'Nigeria Security & Civil Defence Corps' },
  { id: 'customs', name: 'CUSTOMS', fullName: 'Nigeria Customs Service' },
  { id: 'icpc', name: 'ICPC', fullName: 'Independent Corrupt Practices Commission' },
  { id: 'aedc', name: 'AEDC', fullName: 'Abuja Electricity Distribution Company' },
  { id: 'nis', name: 'IMMIGRATION', fullName: 'Nigeria Immigration Service' },
  { id: 'fire', name: 'FIRE SERVICE', fullName: 'Federal Fire Service' },
  { id: 'fcta', name: 'FCTA ABUJA', fullName: 'Federal Capital Territory Administration' },
];

export const TrustMarquee: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const total = INSTITUTIONAL_PARTNERS.length;

  // Responsive mobile screen detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll through institutions
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Helper to compute circular distance from activeIndex
  const getDistance = (idx: number) => {
    let diff = (idx - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      className="py-8 sm:py-10 border-y border-white/[0.08] bg-black relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Institutional Partners"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e575] shrink-0 animate-pulse" />
            <span className="text-white font-medium text-balance">
              Institutional Payroll &amp; Credit Alignment Across National Commands
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span className="text-[#00e575] font-bold">{activeIndex + 1}</span>
            <span>/</span>
            <span>{total}</span>
          </div>
        </div>
      </div>

      {/* Magnifying Glass Lens Stage */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        {/* Central Magnifying Glass Lens Frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[340px] sm:max-w-[400px] h-[92px] sm:h-[86px] rounded-2xl border-2 border-[#00e575]/50 bg-gradient-to-b from-[#00e575]/[0.06] to-transparent shadow-[0_0_40px_rgba(0,229,117,0.2)] pointer-events-none z-20" />

        {/* Outer vignette fade edges - slimmed down on mobile so text is never occluded */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-28 md:w-44 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-28 md:w-44 bg-gradient-to-l from-black via-black/85 to-transparent pointer-events-none z-30" />

        {/* Prev / Next controls for quick interaction */}
        <button
          onClick={handlePrev}
          aria-label="Previous partner"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 transition-all cursor-pointer backdrop-blur-md"
        >
          <CaretLeft className="w-4 h-4" weight="bold" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next partner"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 transition-all cursor-pointer backdrop-blur-md"
        >
          <CaretRight className="w-4 h-4" weight="bold" />
        </button>

        {/* Carousel Row */}
        <div className="relative flex items-center justify-center min-h-[96px] sm:min-h-[90px]">
          {INSTITUTIONAL_PARTNERS.map((partner, idx) => {
            const dist = getDistance(idx);
            const isCenter = dist === 0;
            const absDist = Math.abs(dist);

            // Compute magnifying glass lens optical properties
            let blurAmount = '0px';
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            let textColor = 'text-white';

            if (isCenter) {
              scale = isMobile ? 1.08 : 1.2;
              blurAmount = '0px';
              opacity = 1;
              zIndex = 25;
              textColor = 'text-white';
            } else if (absDist === 1) {
              scale = isMobile ? 0.82 : 0.9;
              blurAmount = isMobile ? '1.5px' : '2px';
              opacity = isMobile ? 0.35 : 0.55;
              zIndex = 10;
              textColor = 'text-neutral-400';
            } else if (absDist === 2) {
              scale = 0.75;
              blurAmount = '3px';
              opacity = 0.2;
              zIndex = 5;
              textColor = 'text-neutral-500';
            } else {
              scale = 0.65;
              blurAmount = '4.5px';
              opacity = 0.08;
              zIndex = 1;
              textColor = 'text-neutral-600';
            }

            // Responsive horizontal offset from center
            const step = isMobile ? 210 : 280;
            const xOffset = dist * step;

            return (
              <motion.div
                key={partner.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-300 px-2"
                animate={{
                  x: xOffset,
                  scale: scale,
                  filter: `blur(${blurAmount})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 20,
                  mass: 0.8,
                }}
              >
                {/* Partner Name Acronym */}
                <div
                  className={`font-sans font-black tracking-tight text-xl sm:text-2xl md:text-3xl uppercase whitespace-nowrap transition-colors duration-300 ${textColor} ${
                    isCenter ? 'drop-shadow-[0_0_25px_rgba(0,229,117,0.45)]' : ''
                  }`}
                >
                  {partner.name}
                </div>

                {/* Subtitle displayed directly beneath center focused item */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] sm:text-xs font-sans font-semibold text-[#00e575] mt-1 tracking-wide text-center max-w-[280px] sm:max-w-[340px] leading-tight px-2"
                  >
                    {partner.fullName}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
