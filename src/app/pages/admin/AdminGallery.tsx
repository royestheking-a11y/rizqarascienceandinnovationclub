import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, Calendar, Image } from 'lucide-react';
export interface GalleryItem {
  id: string | number;
  _id?: string;
  customId?: string;
  title: string;
  category: string;
  date: string;
  image: string;
}
import { fetchGallery, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { toast } from 'sonner';

const CATEGORIES = ['All', 'Workshops', 'Projects', 'Events', 'Achievements', 'Team'];

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all";

const EMPTY: GalleryItem = {
  id: '', title: '', category: 'Workshops', date: '', image: '',
};

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [form, setForm] = useState<GalleryItem>({ ...EMPTY });

  const refresh = async () => { try { const data = await fetchGallery(); setItems(data); } catch(e){ console.error(e); } };
  useEffect(() => { refresh(); }, []);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setModalOpen(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm({ ...item }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: GalleryItem = {
      ...form,
    };
    const theId = String(editing ? (editing._id || editing.customId || editing.id) : '');
    try {
      if (editing) { 
        await updateDoc('gallery', theId, data); 
        toast.success('Gallery updated');
      } else { 
        await createDoc('gallery', data); 
        toast.success('Photo added to gallery');
      }
      refresh(); setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save photo');
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) { 
      try {
        await deleteDoc('gallery', String(deleteId)); 
        toast.success('Photo deleted');
        refresh(); setDeleteId(null); 
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete photo');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Gallery</h1>
          <p className="text-gray-500 text-sm">{items.length} items in gallery</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: '#800020' }}>
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {CATEGORIES.slice(1).map(cat => (
          <div key={cat} className="p-4 rounded-2xl text-center" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black text-gray-900 mb-1">{items.filter(i => i.category === cat).length}</div>
            <div className="text-gray-500 text-xs">{cat}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: filter === cat ? '#800020' : '#fff', color: filter === cat ? '#fff' : '#374151', border: '1px solid', borderColor: filter === cat ? '#800020' : '#e5e7eb' }}
          >
            {cat} {cat !== 'All' && `(${items.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item._id || item.customId || item.id}
            className="rounded-2xl overflow-hidden group"
            style={{ border: '1px solid #e5e7eb' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setDeleteId(item._id || item.customId || item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-xl bg-white text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-3" style={{ background: '#fff' }}>
              <div className="text-gray-900 font-semibold text-xs line-clamp-1">{item.title}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(128,0,32,0.08)', color: '#800020' }}>
                  {item.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Image size={40} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-400">No items in this category</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} title={editing ? 'Edit Gallery Item' : 'Add Gallery Photo'} onClose={() => setModalOpen(false)} width="max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Title" required>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Photo title" className={inp} />
          </FormField>
          <FormField label="Category">
            <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
              {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Date (YYYY-MM)">
            <input value={form.date} onChange={e => set('date', e.target.value)} placeholder="2026-04" className={inp} />
          </FormField>
          <ImageUpload 
            label="Photo" 
            value={form.image} 
            onChange={url => set('image', url)} 
          />
          <FormActions onCancel={() => setModalOpen(false)} submitLabel={editing ? 'Save Changes' : 'Add Photo'} />
        </form>
      </AdminModal>

      <AdminConfirm
        open={deleteId !== null}
        message="This gallery item will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
