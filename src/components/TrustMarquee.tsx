import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
  { id: 'nscdc', name: 'CIVIL DEFENCE', fullName: 'Nigeria Security & Civil Defence' },
  { id: 'customs', name: 'CUSTOMS', fullName: 'Nigeria Customs Service' },
  { id: 'icpc', name: 'ICPC', fullName: 'Independent Corrupt Practices Commission' },
  { id: 'aedc', name: 'AEDC', fullName: 'Abuja Electricity Distribution' },
  { id: 'nis', name: 'IMMIGRATION', fullName: 'Nigeria Immigration Service' },
  { id: 'fire', name: 'FIRE SERVICE', fullName: 'Federal Fire Service' },
  { id: 'fcta', name: 'FCTA ABUJA', fullName: 'Federal Capital Territory Administration' },
];

export const TrustMarquee: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = INSTITUTIONAL_PARTNERS.length;

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

  return (
    <section
      className="py-10 border-y border-white/[0.08] bg-black relative overflow-hidden select-none io-reveal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Magnifying Glass Lens Stage: Pure sliding names */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Central Magnifying Glass Lens Frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] h-[76px] rounded-2xl border-2 border-[#00e575]/40 bg-[#00e575]/[0.03] shadow-[0_0_40px_rgba(0,229,117,0.18)] pointer-events-none z-20 flex items-center justify-between px-3">
          {/* Magnifying Glass Ticks */}
          <div className="w-1.5 h-3 border-l-2 border-t-2 border-[#00e575]/70" />
          <div className="w-1.5 h-3 border-r-2 border-t-2 border-[#00e575]/70" />
        </div>

        {/* Outer vignette fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-30" />

        {/* Carousel Row */}
        <div className="relative flex items-center justify-center min-h-[80px]">
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
              scale = 1.25;
              blurAmount = '0px';
              opacity = 1;
              zIndex = 25;
              textColor = 'text-white';
            } else if (absDist === 1) {
              scale = 0.95;
              blurAmount = '1.8px';
              opacity = 0.55;
              zIndex = 10;
              textColor = 'text-neutral-400';
            } else if (absDist === 2) {
              scale = 0.85;
              blurAmount = '3px';
              opacity = 0.35;
              zIndex = 5;
              textColor = 'text-neutral-500';
            } else {
              scale = 0.75;
              blurAmount = '4.5px';
              opacity = 0.15;
              zIndex = 1;
              textColor = 'text-neutral-600';
            }

            // Approximate horizontal positioning offset from center
            const xOffset = dist * 280;

            return (
              <motion.div
                key={partner.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-300"
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
                {/* Consistent font: font-sans font-black tracking-tight (identical to FRSC) */}
                <div
                  className={`font-sans font-black tracking-tight text-2xl sm:text-3xl uppercase whitespace-nowrap transition-colors duration-300 ${textColor} ${
                    isCenter ? 'drop-shadow-[0_0_20px_rgba(0,229,117,0.4)]' : ''
                  }`}
                >
                  {partner.name}
                </div>

                {/* Subtitle displayed directly beneath center focused item */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-sans font-medium text-[#00e575] mt-1 tracking-wide"
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
