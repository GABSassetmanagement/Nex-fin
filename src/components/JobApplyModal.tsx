import React, { useState } from 'react';
import { JobOpening } from '../data/careersData';
import { X, CheckCircle, PaperPlaneTilt, UploadSimple } from '@phosphor-icons/react';

interface JobApplyModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#0f1422] to-[#080b12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00e575]">
              Job Application Form
            </span>
            <h3 className="text-xl font-bold text-white font-display mt-0.5">
              {job.title}
            </h3>
            <p className="text-xs text-slate-400">{job.department} &middot; {job.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#00e575] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" weight="bold" />
            </div>
            <h4 className="text-2xl font-bold text-white font-display">
              Application Transmitted
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. Your application for <strong className="text-[#00e575]">{job.title}</strong> has been logged with our Human Capital &amp; Operations desk. We will review your credentials and contact you directly.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinelo Okonkwo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                Resume / CV Link (Google Drive / Dropbox) *
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/your-cv-file"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575]"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Ensure share permissions are set to "Anyone with the link can view".
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                Why Are You a Great Fit for Nexus Finance?
              </label>
              <textarea
                rows={3}
                placeholder="Briefly state your core banking/fintech achievements or leadership qualities..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575] resize-none"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <PaperPlaneTilt className="w-4 h-4" weight="bold" />
                <span>{submitting ? 'Submitting Application...' : 'Send Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
