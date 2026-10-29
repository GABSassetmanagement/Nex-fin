import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LEADERSHIP_TEAM } from '../data/content';
import { LeadershipMember } from '../types';
import {
  Medal,
  Briefcase,
  GraduationCap,
  CheckCircle,
  CaretRight,
  CaretLeft,
  X,
  Buildings,
  ShieldCheck,
  User,
  ArrowUpRight,
} from '@phosphor-icons/react';

export const LeadershipSection: React.FC = () => {
  const [selectedLeaderIndex, setSelectedLeaderIndex] = useState<number>(0);
  const [modalLeader, setModalLeader] = useState<LeadershipMember | null>(null);

  // Keyboard escape handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalLeader(null);
      }
    };
    if (modalLeader) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalLeader]);

  const handleOpenDossier = (leader: LeadershipMember) => {
    setModalLeader(leader);
  };

  const handleNextInModal = () => {
    if (!modalLeader) return;
    const currentIndex = LEADERSHIP_TEAM.findIndex((l) => l.name === modalLeader.name);
    const nextIndex = (currentIndex + 1) % LEADERSHIP_TEAM.length;
    setModalLeader(LEADERSHIP_TEAM[nextIndex]);
  };

  const handlePrevInModal = () => {
    if (!modalLeader) return;
    const currentIndex = LEADERSHIP_TEAM.findIndex((l) => l.name === modalLeader.name);
    const prevIndex = (currentIndex - 1 + LEADERSHIP_TEAM.length) % LEADERSHIP_TEAM.length;
    setModalLeader(LEADERSHIP_TEAM[prevIndex]);
  };

  const currentLeader = LEADERSHIP_TEAM[selectedLeaderIndex];

  return (
    <section id="leadership" className="py-24 bg-[#07090e] border-t border-white/5 relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 text-balance font-display">
            Led by veterans of <span className="text-gradient-emerald">Tier-1 banking.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans">
            Our multidisciplinary executive team brings decades of institutional excellence from FCMB, GTBank, Fidelity Bank, Access Bank, LAPO, and national defence technology architectures.
          </p>
          <div className="mt-3 text-xs text-slate-400 font-sans">
            Click any executive card below to view their comprehensive institutional dossier, full career trajectory, and credentials.
          </div>
        </div>

        {/* 5-EXECUTIVE FULL-CARD GRID (Fuller pictures & prominent interactive click) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 font-sans">
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenDossier(leader)}
              className="group rounded-3xl bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Fuller, Taller Executive Portrait */}
                <div className="relative aspect-[3/4] min-h-[360px] sm:min-h-[400px] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-slate-900 group-hover:border-emerald-500/40 transition-colors">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#121829] text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00e575] mb-4">
                        <User className="w-10 h-10" />
                      </div>
                      <span className="text-white font-bold font-display text-lg">{leader.name}</span>
                    </div>
                  )}

                  {/* Gradient shadow overlay for readable label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Role Badge in bottom left */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[#00e575] border border-white/10">
                      {leader.role}
                    </span>
                    <span className="text-[11px] font-medium text-slate-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#00e575]" />
                      Executive
                    </span>
                  </div>
                </div>

                {/* Name & Department */}
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-[#00e575] transition-colors">
                  {leader.name}
                </h3>
                <div className="text-xs text-slate-400 font-sans mb-3">
                  {leader.department || leader.role}
                </div>

                {/* Prior Institutional background pill */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Institutional Pedigree
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {leader.formerBackground}
                  </p>
                </div>
              </div>

              {/* Action: Click for Full Dossier */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDossier(leader);
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.06] group-hover:bg-[#00e575] group-hover:text-black text-white border border-white/10 group-hover:border-[#00e575] text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <span>View Full Executive Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" weight="bold" />
              </button>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 font-sans">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#00e575] shrink-0" weight="bold" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Statutory Governance</span>
              Licensed by National Cooperative Societies, National Cooperative Financing Agency &amp; Abuja Cooperative Federation.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#00e575] shrink-0" weight="bold" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Zero Bureaucratic Bottlenecks</span>
              Automated algorithmic credit risk screening combined with seasoned institutional credit underwriters.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#00e575] shrink-0" weight="bold" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Physical HQ in Capital</span>
              Operating out of 2nd Floor, Right Wing, NICON Insurance Building, Central Business District (CBD), Abuja.
            </div>
          </div>
        </div>
      </div>

      {/* FULL EXECUTIVE DOSSIER MODAL (Rendered into document.body via createPortal so it is never clipped) */}
      {modalLeader && typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
            onClick={() => setModalLeader(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] my-auto flex flex-col bg-gradient-to-b from-[#0f1422] to-[#080b12] border border-white/20 rounded-3xl shadow-2xl text-left font-sans overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header controls (Pinned top bar) */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0 bg-[#0f1422]/95 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00e575] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00e575]">
                    Executive Profile &amp; Credentials Dossier
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevInModal}
                    aria-label="Previous profile"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <CaretLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextInModal}
                    aria-label="Next profile"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <CaretRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLeader(null)}
                    aria-label="Close dossier modal"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-slate-300 hover:text-white border border-white/10 transition-colors ml-2 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Scrollable container for portrait + comprehensive info */}
              <div className="p-5 sm:p-8 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Col 1: Executive Portrait */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative aspect-[3/4] h-72 sm:h-80 md:h-[360px] w-full max-w-sm rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl mb-4">
                      {modalLeader.image ? (
                        <img
                          src={modalLeader.image}
                          alt={modalLeader.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-[#00e575]">
                          <User className="w-16 h-16" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00e575] bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                          {modalLeader.role}
                        </span>
                        <h3 className="text-2xl font-black text-white font-display mt-2">
                          {modalLeader.name}
                        </h3>
                      </div>
                    </div>

                    {/* Prior Institution Card */}
                    <div className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
                      <div className="flex items-center gap-2 text-slate-400 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                        <Buildings className="w-4 h-4 text-[#00e575]" />
                        <span>Prior Institutional Pedigree</span>
                      </div>
                      <p className="text-slate-200 font-medium">
                        {modalLeader.formerBackground}
                      </p>
                    </div>
                  </div>

                  {/* Col 2: Unabridged Biography & Comprehensive Credentials */}
                  <div className="md:col-span-7 space-y-6 text-slate-200 text-sm">
                    {/* Full Biography */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2 flex items-center gap-2">
                        <span>Executive Biography &amp; Track Record</span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                        {modalLeader.fullBio || modalLeader.bio}
                      </p>
                    </div>

                    {/* Education & Academic Credentials */}
                    {modalLeader.education && modalLeader.education.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#00e575]" />
                          <span>Academic Background &amp; Universities</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.education.map((edu, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-[#00e575] shrink-0 mt-0.5" />
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Career Milestones */}
                    {modalLeader.careerHighlights && modalLeader.careerHighlights.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                          <Medal className="w-4 h-4 text-[#00e575]" />
                          <span>Key Career Achievements &amp; Milestones</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.careerHighlights.map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-[#00e575] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Core Responsibilities at Nexus */}
                    {modalLeader.coreResponsibilities && modalLeader.coreResponsibilities.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#00e575]" />
                          <span>Nexus Finance Mandate &amp; Strategic Oversight</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {modalLeader.coreResponsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-[#00e575] shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Certifications & Fellowships */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00e575]" />
                        <span>Chartered Certifications &amp; Professional Fellowships</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modalLeader.certifications.map((cert, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-200 font-medium"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Close Button at bottom */}
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setModalLeader(null)}
                        className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#00e575] transition-colors cursor-pointer"
                      >
                        Close Dossier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
