import React, { useState } from 'react';
import { BlogPost } from '../data/blogData';
import { X, Plus, PencilSimple, Trash, Check, ArrowCounterClockwise } from '@phosphor-icons/react';

interface BlogCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onSavePosts: (posts: BlogPost[]) => void;
  onResetDefaults: () => void;
}

export const BlogCmsModal: React.FC<BlogCmsModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSavePosts,
  onResetDefaults,
}) => {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('Fintech & Credit');
  const [author, setAuthor] = useState('Nexus Editorial Board');
  const [authorRole, setAuthorRole] = useState('Senior Financial Analyst');
  const [readTime, setReadTime] = useState('4 min read');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('./assets/nexus/naira_1000_stacks.jpg');

  if (!isOpen) return null;

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setCategory('Fintech & Credit');
    setAuthor('Nexus Editorial Board');
    setAuthorRole('Senior Financial Analyst');
    setReadTime('4 min read');
    setExcerpt('');
    setContent('');
    setImage('./assets/nexus/naira_1000_stacks.jpg');
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreatingNew(false);
    setTitle(post.title);
    setSlug(post.slug || '');
    setCategory(post.category);
    setAuthor(post.author);
    setAuthorRole(post.authorRole);
    setReadTime(post.readTime);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImage(post.image);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setIsCreatingNew(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = posts.filter((p) => p.id !== id);
      onSavePosts(updated);
      if (editingPost?.id === id) {
        cancelEdit();
      }
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const autoSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (isCreatingNew) {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        slug: autoSlug,
        title,
        excerpt,
        content,
        category,
        author,
        authorRole,
        date: formattedDate,
        readTime,
        image: image || './assets/nexus/naira_1000_stacks.jpg',
      };
      onSavePosts([newPost, ...posts]);
    } else if (editingPost) {
      const updated = posts.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              title,
              slug: autoSlug,
              excerpt,
              content,
              category,
              author,
              authorRole,
              readTime,
              image,
            }
          : p
      );
      onSavePosts(updated);
    }
    cancelEdit();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto max-h-[90vh] flex flex-col bg-[#0b0f19] border border-white/15 rounded-3xl shadow-2xl text-left font-sans overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e575] animate-pulse" />
            <h2 className="text-lg font-bold text-white font-display">
              Nexus Finance CMS — Article &amp; Media Manager
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset sample articles to default"
            >
              <ArrowCounterClockwise className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isCreatingNew || editingPost ? (
            /* Create / Edit Form */
            <form onSubmit={handleSaveForm} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-[#00e575]">
                  {isCreatingNew ? 'Create New Article' : `Editing: ${editingPost?.title}`}
                </h3>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. How Remita Payroll Speeds Up Personal Loan Approvals"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e575]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e575] cursor-pointer"
                  >
                    <option value="Fintech & Credit">Fintech &amp; Credit</option>
                    <option value="SME Growth">SME Growth</option>
                    <option value="Payroll & Remita">Payroll &amp; Remita</option>
                    <option value="Travel & POF">Travel &amp; POF</option>
                    <option value="Cooperative Governance">Cooperative Governance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                    Author Designation
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                    Read Time (e.g. 4 min read)
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="./assets/nexus/naira_1000_stacks.jpg"
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono"
                  />
                  <div className="flex gap-1">
                    {[
                      { label: 'Naira', path: './assets/nexus/naira_1000_stacks.jpg' },
                      { label: 'Executive', path: './assets/nexus/corporate_salary_exec.jpg' },
                      { label: 'Car', path: './assets/nexus/hero_car.jpg' },
                      { label: 'Travel', path: './assets/nexus/travel_documents.jpg' },
                      { label: 'Gold', path: './assets/nexus/gold_vault.jpg' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImage(preset.path)}
                        className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-slate-300"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Short Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 1-2 sentence preview for the card..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e575] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
                  Full Article Body (Markdown / Plain Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full comprehensive article body here..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#00e575] font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" weight="bold" />
                  <span>{isCreatingNew ? 'Publish Article' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Post List Table */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">All Published Articles ({posts.length})</h3>
                  <p className="text-xs text-slate-400">Manage or publish news, loan tutorials, and announcements</p>
                </div>
                <button
                  onClick={startCreate}
                  className="px-4 py-2 rounded-xl bg-[#00e575] hover:bg-[#15f38a] text-black text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" weight="bold" />
                  <span>New Article</span>
                </button>
              </div>

              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold text-[#00e575] uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-slate-500">&middot;</span>
                          <span className="text-[10px] text-slate-400">{post.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate max-w-lg">{post.title}</h4>
                        <p className="text-xs text-slate-400 truncate max-w-xl">{post.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(post)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit article"
                      >
                        <PencilSimple className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete article"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
