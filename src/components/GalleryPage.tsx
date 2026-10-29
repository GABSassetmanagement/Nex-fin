import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem, INITIAL_GALLERY_ITEMS, GalleryFolder } from '../data/galleryData';
import {
  MapPin,
  Calendar,
  X,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  FolderSimple,
  Sparkle,
  ArrowRight,
  ShieldCheck,
} from '@phosphor-icons/react';

interface GalleryPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_gallery_items_v1';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenApply }) => {
  const [items] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_GALLERY_ITEMS;
  });

  const [activeFolder, setActiveFolder] = useState<string>('All');
  const [slideshowIndex, setSlideshowIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const folders: (string | GalleryFolder)[] = [
    'All',
    'Office',
    'CSR',
    'Store Marketing',
    'Store Operations',
    'Executive Summits',
  ];

  const filteredItems =
    activeFolder === 'All'
      ? items
      : items.filter((item) => item.category === activeFolder);

  // Slideshow navigation
  const handlePrev = useCallback(() => {
    if (slideshowIndex === null) return;
    setSlideshowIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [slideshowIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (slideshowIndex === null) return;
    setSlideshowIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredItems.length
    );
  }, [slideshowIndex, filteredItems.length]);

  // Auto-play timer for slideshow
  useEffect(() => {
    if (slideshowIndex === null || !isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [slideshowIndex, isPlaying, handleNext]);

  // Keyboard navigation & escape for slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slideshowIndex === null) return;
      if (e.key === 'Escape') setSlideshowIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideshowIndex, handleNext, handlePrev]);

  const activeItem = slideshowIndex !== null ? filteredItems[slideshowIndex] : null;

  return (
    <div className="pt-24 pb-20 bg-[#07090e] text-white font-sans min-h-screen">
      {/* FULLSCREEN SLIDESHOW MODAL */}
      {activeItem && slideshowIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSlideshowIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0b0f19] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0b0f19]/90 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-[#00e575] bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Folder: {activeItem.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {slideshowIndex + 1} of {filteredItems.length}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Auto Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isPlaying
                      ? 'bg-emerald-500/20 text-[#00e575] border-[#00e575]/40'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                  }`}
                  title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" weight="bold" />
                      <span className="hidden sm:inline">Auto-Playing (4.5s)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" weight="bold" />
                      <span className="hidden sm:inline">Play Slideshow</span>
                    </>
                  )}
                </button>

                {/* Prev */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <CaretLeft className="w-4 h-4" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <CaretRight className="w-4 h-4" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setSlideshowIndex(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors cursor-pointer ml-1"
                  aria-label="Close slideshow"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slideshow Image Area */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />

              {/* Prev Overlay Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105"
                aria-label="Previous slide"
              >
                <CaretLeft className="w-5 h-5" />
              </button>

              {/* Next Overlay Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105"
                aria-label="Next slide"
              >
                <CaretRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slideshow Metadata Footer */}
            <div className="p-5 sm:p-6 bg-gradient-to-t from-[#080b12] to-[#0b0f19] space-y-2 shrink-0 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {activeItem.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#00e575]" />
                  <span>{activeItem.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {activeItem.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-[#00e575]" />
                <span>{activeItem.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden py-14 sm:py-16 border-b border-white/10 bg-gradient-to-b from-[#0e1320] via-[#090d16] to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#00e575] font-bold">
              Visual Archives &amp; Office Highlights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display mt-2 mb-4 leading-[1.1]">
              Inside Nexus: Our <span className="text-gradient-emerald">Spaces &amp; Field Milestones.</span>
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-sans">
              Explore our operations across 5 curated folders: Office Headquarters, CSR Community Drives, Store Marketing, Store Operations, and Executive Summits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* 5 Folder Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none font-sans">
          {folders.map((fld) => {
            const count =
              fld === 'All'
                ? items.length
                : items.filter((it) => it.category === fld).length;
            const isSelected = activeFolder === fld;
            return (
              <button
                key={fld}
                onClick={() => setActiveFolder(fld)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00e575] text-black shadow-lg shadow-[#00e575]/20'
                    : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                <FolderSimple className="w-4 h-4 shrink-0" weight={isSelected ? 'fill' : 'regular'} />
                <span>{fld}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid with Slideshow Launcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setSlideshowIndex(idx);
                setIsPlaying(true);
              }}
              className="group rounded-3xl bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 hover:border-emerald-500/40 p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-[#00e575] border border-white/10 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-[#00e575] text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-black/50">
                      <Play className="w-3.5 h-3.5" weight="fill" />
                      <span>Open Slideshow</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#00e575]" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 group-hover:text-[#00e575] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-[#00e575] shrink-0" />
                  <span className="truncate">{item.location}</span>
                </span>
                <span className="text-[#00e575] font-semibold text-[11px] shrink-0">
                  View Full &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">
              Schedule an in-person visit to our Abuja headquarters
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              2nd Floor, Right Wing, NICON Insurance Building, Central Business District, Abuja. Meet with our executive underwriting team in private consultation.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=NICON+Insurance+Building,+Central+Business+District,+Abuja,+Nigeria"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer shrink-0"
          >
            Locate on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};
