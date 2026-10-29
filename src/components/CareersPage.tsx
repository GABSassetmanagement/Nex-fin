import React, { useState } from 'react';
import { JobOpening, JOB_OPENINGS } from '../data/careersData';
import { JobApplyModal } from './JobApplyModal';
import {
  Briefcase,
  MapPin,
  Heart,
  CurrencyNgn,
  GraduationCap,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Buildings,
  Eye,
  X,
  FileText,
} from '@phosphor-icons/react';

interface CareersPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_career_openings_v1';

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenApply }) => {
  const [jobs] = useState<JobOpening[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return JOB_OPENINGS;
  });

  const [detailJob, setDetailJob] = useState<JobOpening | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string>('All');

  const departments = [
    'All',
    'Credit Risk & Underwriting',
    'Operations & Branch',
    'Fintech & Engineering',
    'Institutional Sales',
  ];

  const filteredJobs =
    activeDepartment === 'All'
      ? jobs
      : jobs.filter((j) => j.department === activeDepartment);

  return (
    <div className="pt-24 pb-20 bg-[#07090e] text-white font-sans min-h-screen">
      {/* Job Application Modal */}
      <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />

      {/* JOB DETAILS MODAL ("Read More" Modal) */}
      {detailJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setDetailJob(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-b from-[#0f1422] to-[#080b12] border border-white/20 rounded-3xl shadow-2xl overflow-hidden font-sans text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 shrink-0 flex items-start justify-between bg-[#0f1422]/90 backdrop-blur-md">
              <div className="space-y-2 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00e575] bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    {detailJob.department}
                  </span>
                  <span className="text-[11px] text-slate-300 bg-white/[0.05] px-2.5 py-0.5 rounded-md border border-white/10">
                    {detailJob.type}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  {detailJob.title}
                </h3>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-[#00e575]" />
                    {detailJob.location}
                  </span>
                  <span>&middot;</span>
                  <span className="text-[#00e575] font-semibold">{detailJob.salaryRange}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailJob(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Job Details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-300">
              {/* Role Overview */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Role Overview &amp; Mandate</span>
                </h4>
                <p className="leading-relaxed text-slate-200 sm:text-base font-normal">
                  {detailJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              {detailJob.responsibilities && detailJob.responsibilities.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Key Strategic Responsibilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {detailJob.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-slate-200">
                        <CheckCircle className="w-4 h-4 text-[#00e575] shrink-0 mt-0.5" weight="bold" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements & Qualifications */}
              {detailJob.requirements && detailJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#00e575] mb-2.5 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Candidate Profile &amp; Qualifications</span>
                  </h4>
                  <ul className="space-y-2">
                    {detailJob.requirements.map((req, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-2.5 text-slate-200">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" weight="bold" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience Badge */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 uppercase font-semibold">Seniority &amp; Experience:</span>
                <span className="font-bold text-white">{detailJob.experience}</span>
              </div>
            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#080b12] flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setDetailJob(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Openings
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = detailJob;
                  setDetailJob(null);
                  setApplyJob(target);
                }}
                className="px-7 py-3 rounded-xl bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer flex items-center gap-2"
              >
                <span>Apply for this Position</span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden py-14 sm:py-20 border-b border-white/10 bg-gradient-to-b from-[#0e1320] via-[#090d16] to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#00e575] font-bold">
              Careers at Nexus Finance
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display mt-2 mb-4 leading-[1.1]">
              Build the future of <span className="text-gradient-emerald">ethical financial technology.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Join an elite team of Tier-1 bankers, risk underwriters, and fintech innovators transforming credit access for millions across Nigeria.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Culture & Perks Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Why High-Performers Thrive at Nexus
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We reward initiative, intellectual rigor, and an uncompromising commitment to customer dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#00e575] flex items-center justify-center mb-4">
                <CurrencyNgn className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-1">
                Competitive Compensation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Benchmark-topping salary packages with performance-linked quarterly profit disbursements.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-1">
                Comprehensive Healthcare (HMO)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tier-1 private medical coverage including dental, optical, and dependent spouse/children benefits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Sparkle className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-1">
                Staff Welfare &amp; 0% Loans
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subsidized staff emergency facilities, home-ownership financing, and annual retreat allowances.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" weight="bold" />
              </div>
              <h3 className="text-base font-bold text-white font-display mb-1">
                Continuous Learning
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated annual executive development allowances, professional certification sponsorships, and technical masterclasses.
              </p>
            </div>
          </div>
        </div>

        {/* Active Openings Section */}
        <div id="openings">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#00e575] font-bold">
                Available Positions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                Active Job Openings ({filteredJobs.length})
              </h2>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-sans">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeDepartment === dept
                      ? 'bg-[#00e575] text-black shadow-md'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00e575] bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {job.department}
                    </span>
                    <span className="text-[11px] text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded-md border border-white/10">
                      {job.type}
                    </span>
                    <span className="text-[11px] text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-[#00e575] transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-sans">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#00e575]" />
                      {job.location}
                    </span>
                    <span>&middot;</span>
                    <span className="text-slate-200 font-medium">{job.salaryRange}</span>
                  </div>
                </div>

                {/* Read More Action Button as Requested */}
                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => setDetailJob(job)}
                    className="w-full lg:w-auto px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-[#00e575] text-white hover:text-black border border-white/15 hover:border-[#00e575] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <Eye className="w-4 h-4" weight="bold" />
                    <span>Read More</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speculative Application / Talents Pool */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/10 text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00e575] mx-auto">
            <Buildings className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Don't see your exact role listed?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            We are always scouting for top 1% credit analysts, enterprise sales directors, and senior developers. Transmit your CV and portfolio to our executive talent acquisition desk.
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@nexusfinance.com?subject=Speculative%20Application%20-%20Nexus%20Finance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold transition-colors"
            >
              <span>Email Your CV to support@nexusfinance.com</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
