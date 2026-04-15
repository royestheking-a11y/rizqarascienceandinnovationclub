import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, FileText, Clock, Star, User } from 'lucide-react';
import { type BlogPost } from '../../data/mockData';
import { fetchBlog, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { toast } from 'sonner';

const CATEGORY_COLORS: Record<string, string> = {
  Technology: '#1a4a7a', Education: '#2d6a4f', 'Success Story': '#800020',
  Career: '#7d4e00', Design: '#6b2d5e', Research: '#0f766e',
};

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all";

const EMPTY: BlogPost = {
  id: '', title: '', excerpt: '', content: '', author: '', authorRole: '', authorImage: '',
  date: new Date().toISOString().split('T')[0], category: 'Technology', image: '',
  tags: [], readTime: '5 min read', featured: false,
};

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPost>({ ...EMPTY });

  const refresh = async () => { try { const data = await fetchBlog(); setPosts(data); } catch(e){ console.error(e); } };
  useEffect(() => { refresh(); }, []);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const categories = [...new Set(posts.map(p => p.category))];

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setModalOpen(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm({ ...p }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: BlogPost = {
      ...form,
      tags: typeof form.tags === 'string'
        ? (form.tags as unknown as string).split(',').map(t => t.trim()).filter(Boolean)
        : form.tags,
    };
    const theId = editing ? (editing._id || editing.customId || editing.id) : '';
    try {
      if (editing) { 
        await updateDoc('blog', theId!, data); 
        toast.success('Blog post updated');
      } else { 
        await createDoc('blog', data); 
        toast.success('Blog post published');
      }
      refresh(); setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save blog post');
    }
  };

  const handleDelete = async () => {
    if (deleteId) { 
      try {
        await deleteDoc('blog', deleteId); 
        toast.success('Post deleted');
        refresh(); setDeleteId(null); 
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Blog Posts</h1>
          <p className="text-gray-500 text-sm">{posts.length} articles — {posts.filter(p => p.featured).length} featured</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: '#800020' }}>
          <Plus size={16} /> Add Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Posts', value: posts.length, color: '#374151' },
          { label: 'Featured', value: posts.filter(p => p.featured).length, color: '#800020' },
          { label: 'Categories', value: categories.length, color: '#1a4a7a' },
          { label: 'Authors', value: new Set(posts.map(p => p.author)).size, color: '#2d6a4f' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Post Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post, i) => (
          <motion.div
            key={post._id || post.customId || post.id}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e5e7eb' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="relative h-40 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
              {post.featured && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,215,0,0.95)', color: '#5a0015' }}>
                  <Star size={10} fill="currentColor" /> Featured
                </div>
              )}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/40 transition-all backdrop-blur-sm">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteId(post._id || post.customId || post.id)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-red-500/80 transition-all backdrop-blur-sm">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: CATEGORY_COLORS[post.category] || '#800020', color: '#fff' }}>
                {post.category}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1"><User size={11} /> {post.author}</div>
                <div className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</div>
                <div className="flex items-center gap-1"><FileText size={11} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: '#f3f4f6', color: '#6b7280' }}>#{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} title={editing ? 'Edit Blog Post' : 'Add Blog Post'} onClose={() => setModalOpen(false)} width="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Title" required>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Article title" className={inp} />
          </FormField>
          <FormField label="Excerpt" required>
            <textarea required value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} className={`${inp} resize-none`} placeholder="Short summary shown in cards..." />
          </FormField>
          <FormField label="Content">
            <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={4} className={`${inp} resize-none`} placeholder="Full article content..." />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Author" required>
              <input required value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author name" className={inp} />
            </FormField>
            <FormField label="Author Role">
              <input value={form.authorRole} onChange={e => set('authorRole', e.target.value)} placeholder="President, RSIC" className={inp} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category">
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
                {['Technology', 'Education', 'Success Story', 'Career', 'Design', 'Research'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Read Time">
              <input value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="5 min read" className={inp} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Publish Date">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inp} />
            </FormField>
            <FormField label="Featured">
              <div className="flex items-center gap-3 h-10">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-600">{form.featured ? 'Featured' : 'Not featured'}</span>
                </label>
              </div>
            </FormField>
          </div>
          <ImageUpload 
            label="Post Cover Image" 
            value={form.image} 
            onChange={url => set('image', url)} 
          />
          <FormField label="Tags (comma-separated)">
            <input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, Education, Innovation" className={inp} />
          </FormField>
          <FormActions onCancel={() => setModalOpen(false)} submitLabel={editing ? 'Save Changes' : 'Publish Post'} />
        </form>
      </AdminModal>

      <AdminConfirm
        open={!!deleteId}
        message="This blog post will be permanently deleted."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
