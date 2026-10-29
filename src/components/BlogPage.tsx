import React, { useState } from 'react';
import { BlogPost, INITIAL_BLOG_POSTS } from '../data/blogData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ShareNetwork,
  Check,
  Tag,
  Sparkle,
  Calculator,
  WhatsappLogo,
  LinkedinLogo,
  XLogo,
  FacebookLogo,
} from '@phosphor-icons/react';

interface BlogPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenApply: (productName?: string) => void;
}

const STORAGE_KEY = 'nexus_blog_posts_v1';

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenApply }) => {
  const [posts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_BLOG_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories = [
    'All',
    'Fintech & Credit',
    'Payroll & Remita',
    'Travel & POF',
    'SME Growth',
    'Cooperative Governance',
  ];

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  // Articles suggested in the sidebar (excluding current selected post)
  const suggestedPosts = selectedPost
    ? posts.filter((p) => p.id !== selectedPost.id).slice(0, 4)
    : [];

  return (
    <div className="pt-24 pb-20 bg-[#07090e] text-white font-sans min-h-screen">
      {/* Main Content Area: List View vs Reader View */}
      {selectedPost ? (
        /* Full Article Reader with Dedicated Sticky Sidebar */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
          {/* Top Return and Share Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <button
              onClick={() => {
                setSelectedPost(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Articles</span>
            </button>

            {/* Top Return and Social Share Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="p-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 transition-colors cursor-pointer"
              >
                <WhatsappLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-2 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#388bfd] border border-[#0A66C2]/30 transition-colors cursor-pointer"
              >
                <LinkedinLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <XLogo className="w-3.5 h-3.5" weight="bold" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
                className="p-2 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#4595ff] border border-[#1877F2]/30 transition-colors cursor-pointer"
              >
                <FacebookLogo className="w-3.5 h-3.5" weight="fill" />
              </a>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10 ml-1"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00e575]" />
                    <span className="text-[#00e575]">Copied</span>
                  </>
                ) : (
                  <>
                    <ShareNetwork className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Article Content Column (8 cols) */}
            <article className="lg:col-span-8 space-y-6">
              {/* Category & Title */}
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-md text-xs uppercase tracking-wider font-bold text-[#00e575] bg-emerald-500/10 border border-emerald-500/20">
                  {selectedPost.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-[1.15]">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Author & Publishing Metadata */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 py-3 border-y border-white/10 font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00e575]/10 border border-[#00e575]/20 flex items-center justify-center text-[#00e575]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{selectedPost.author}</span>
                    <span className="text-[10px] text-slate-400">{selectedPost.authorRole}</span>
                  </div>
                </div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00e575]" />
                  <span>{selectedPost.date}</span>
                </div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Featured Cover Image */}
              <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Excerpt Lead */}
              <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic border-l-2 border-[#00e575] pl-4 py-1">
                "{selectedPost.excerpt}"
              </p>

              {/* Unabridged Article Body */}
              <div className="space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed pt-2 font-sans">
                {selectedPost.content.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags Strip */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#00e575]" />
                    Tags:
                  </span>
                  {selectedPost.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Dedicated Social Media Sharing Strip */}
              <div className="pt-6 pb-2 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Share this Article
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Circulate to colleagues, business partners, and social networks:
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <WhatsappLogo className="w-4 h-4" weight="fill" />
                      <span>WhatsApp</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#388bfd] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LinkedinLogo className="w-4 h-4" weight="fill" />
                      <span>LinkedIn</span>
                    </a>

                    {/* Twitter / X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <XLogo className="w-4 h-4" weight="bold" />
                      <span>X</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#4595ff] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FacebookLogo className="w-4 h-4" weight="fill" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom In-Article CTA Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 mt-10">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-white font-display">Need urgent emergency liquidity?</h4>
                  <p className="text-xs text-slate-300">
                    Apply for Suremoney or Nexus Credit and receive disbursement in 15 minutes flat.
                  </p>
                </div>
                <button
                  onClick={() => onOpenApply('Suremoney Loan')}
                  className="px-6 py-3 rounded-full bg-[#00e575] hover:bg-[#15f38a] text-black font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg shadow-[#00e575]/25 cursor-pointer"
                >
                  Apply in 15 Mins
                </button>
              </div>
            </article>

            {/* Sidebar Column (4 cols) - Suggests Other Articles */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Suggested Other Articles Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0e1320] to-[#07090e] border border-white/10 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkle className="w-4 h-4 text-[#00e575]" weight="bold" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                      Read More Articles
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">Nexus Insights</span>
                </div>

                <div className="space-y-4">
                  {suggestedPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group p-3 rounded-2xl hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-all cursor-pointer flex gap-3.5 items-start"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-[#00e575]">
                          {post.category}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#00e575] transition-colors leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                          <span>{post.readTime}</span>
                          <span>&middot;</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator Quick Widget */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00e575] flex items-center justify-center">
                  <Calculator className="w-5 h-5" weight="bold" />
                </div>
                <h4 className="text-base font-bold text-white font-display">Instant Repayment Calculator</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Calculate real monthly installments across Suremoney, Nexus Credit, and Car-for-Cash with zero guesswork.
                </p>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Launch Loan Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category Quick Cloud */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                  Topic Archives
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedPost(null);
                        setActiveCategory(cat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        /* Blog Article Feed / List View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Header */}
          <div className="relative overflow-hidden py-10 border-b border-white/10">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest text-[#00e575] font-bold">
                News &amp; Media Insights
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display mt-2 mb-4 leading-[1.1]">
                Financial intelligence for <span className="text-gradient-emerald">modern Nigeria.</span>
              </h1>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                Deep dives into public sector payroll dynamics, travel proof of capability frameworks, Remita integrations, and responsible credit expansion.
              </p>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-sans">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#00e575] text-black shadow-lg shadow-[#00e575]/20'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post Hero Card (Only on 'All') */}
          {activeCategory === 'All' && featuredPost && (
            <div
              onClick={() => {
                setSelectedPost(featuredPost);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0e1320] via-[#090d16] to-[#07090e] border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl"
            >
              <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold text-[#00e575] bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    Featured Analysis
                  </span>
                  <span className="text-xs text-slate-400">{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display group-hover:text-[#00e575] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                  <span className="font-semibold text-white">{featuredPost.author}</span>
                  <span>&middot;</span>
                  <span>{featuredPost.date}</span>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#00e575] group-hover:translate-x-1 transition-transform">
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-3xl p-6 bg-gradient-to-br from-[#0e1320] to-[#07090e] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between cursor-pointer shadow-lg hover:-translate-y-1 duration-200"
              >
                <div>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[11px] font-bold uppercase text-[#00e575]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-[#00e575] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span className="text-[#00e575] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
