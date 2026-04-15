import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, Trophy, MapPin, Calendar, Award } from 'lucide-react';
import { type Achievement } from '../../data/mockData';
import { fetchAchievements, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { toast } from 'sonner';

const LEVEL_STYLES: Record<string, { bg: string; color: string }> = {
  National: { bg: 'rgba(255,215,0,0.15)', color: '#b45309' },
  University: { bg: 'rgba(128,0,32,0.08)', color: '#800020' },
  International: { bg: 'rgba(26,74,122,0.08)', color: '#1a4a7a' },
};

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all";

const EMPTY: Achievement = {
  id: '', title: '', project: '', date: '', event: '', organizer: '', location: '',
  description: '', category: '', image: '', certificateImage: '', level: 'National', prize: '',
};

export function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Achievement>({ ...EMPTY });

  const refresh = async () => {
    try { const data = await fetchAchievements(); setItems(data); } catch(e) { console.error(e); }
  };
  useEffect(() => { refresh(); }, []);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setModalOpen(true); };
  const openEdit = (a: Achievement) => { setEditing(a); setForm({ ...a }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form };
    const theId = editing ? (editing._id || editing.customId || editing.id) : '';
    try {
      if (editing) { 
        await updateDoc('achievements', theId!, data); 
        toast.success('Achievement updated');
      } else { 
        await createDoc('achievements', data); 
        toast.success('Achievement created');
      }
      refresh(); setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save achievement');
    }
  };

  const handleDelete = async () => {
    if (deleteId) { 
      try {
        await deleteDoc('achievements', deleteId); 
        toast.success('Achievement deleted');
        refresh(); setDeleteId(null); 
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete achievement');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Achievements</h1>
          <p className="text-gray-500 text-sm">{items.length} awards and recognitions</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: '#800020' }}>
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Awards', value: items.length, color: '#d97706' },
          { label: 'National Awards', value: items.filter(a => a.level === 'National').length, color: '#800020' },
          { label: 'University Awards', value: items.filter(a => a.level === 'University').length, color: '#2d6a4f' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {items.map((ach, i) => (
          <motion.div
            key={ach._id || ach.customId || ach.id}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e5e7eb' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="grid md:grid-cols-3 gap-0">
              <div className="relative h-48 md:h-auto overflow-hidden">
                <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={LEVEL_STYLES[ach.level] || LEVEL_STYLES.National}>
                    <Trophy size={11} /> {ach.level}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,215,0,0.15)' }}>
                      <Trophy size={22} style={{ color: '#d97706' }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#800020' }}>{ach.category}</div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{ach.title}</h3>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(ach)} className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setDeleteId(ach._id || ach.customId || ach.id)} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{ach.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-500"><Calendar size={13} /> {ach.date}</div>
                  <div className="flex items-center gap-2 text-gray-500"><MapPin size={13} /> {ach.location}</div>
                  <div className="flex items-center gap-2 text-gray-600 col-span-2"><Award size={13} style={{ color: '#d97706' }} /><span className="font-semibold">{ach.prize}</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400">Project: <span className="font-semibold text-gray-700">{ach.project}</span> · Event: <span className="font-semibold text-gray-700">{ach.event}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} title={editing ? 'Edit Achievement' : 'Add Achievement'} onClose={() => setModalOpen(false)} width="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Title" required>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="1st Prize — ..." className={inp} />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category">
              <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="National Award" className={inp} />
            </FormField>
            <FormField label="Level">
              <select value={form.level} onChange={e => set('level', e.target.value)} className={inp}>
                {['National', 'University', 'International'].map(l => <option key={l}>{l}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Date">
              <input value={form.date} onChange={e => set('date', e.target.value)} placeholder="March 15, 2026" className={inp} />
            </FormField>
            <FormField label="Location">
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Dhaka, Bangladesh" className={inp} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Project">
              <input value={form.project} onChange={e => set('project', e.target.value)} placeholder="Project name" className={inp} />
            </FormField>
            <FormField label="Prize">
              <input value={form.prize} onChange={e => set('prize', e.target.value)} placeholder="1st Place Trophy + ৳50,000" className={inp} />
            </FormField>
          </div>
          <FormField label="Event Name">
            <input value={form.event} onChange={e => set('event', e.target.value)} placeholder="Event or competition name" className={inp} />
          </FormField>
          <FormField label="Organizer">
            <input value={form.organizer} onChange={e => set('organizer', e.target.value)} placeholder="Ministry of Education..." className={inp} />
          </FormField>
          <FormField label="Description">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inp} resize-none`} placeholder="Describe the achievement..." />
          </FormField>
          <ImageUpload 
            label="Achievement Image" 
            value={form.image} 
            onChange={url => set('image', url)} 
          />
          <FormActions onCancel={() => setModalOpen(false)} submitLabel={editing ? 'Save Changes' : 'Add Achievement'} />
        </form>
      </AdminModal>

      <AdminConfirm
        open={!!deleteId}
        message="This achievement will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
