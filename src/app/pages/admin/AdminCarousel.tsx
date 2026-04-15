import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, Image as ImageIcon, ExternalLink, ArrowRight } from 'lucide-react';
import { fetchCarousel, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { toast } from 'sonner';

const EMPTY = {
  image: '',
  badge: '',
  heading: '',
  description: '',
  cta1Label: 'Join RSIC — Free',
  cta1Href: '/join',
  cta2Label: 'Explore Projects',
  cta2Href: '/projects',
  order: 0,
  active: true,
};

export function AdminCarousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await fetchCarousel();
      setSlides(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load slides');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (slide: any) => {
    setEditing(slide);
    setForm({
      image: slide.image,
      badge: slide.badge || '',
      heading: slide.heading,
      description: slide.description || '',
      cta1Label: slide.cta1Label || 'Join RSIC — Free',
      cta1Href: slide.cta1Href || '/join',
      cta2Label: slide.cta2Label || 'Explore Projects',
      cta2Href: slide.cta2Href || '/projects',
      order: slide.order || 0,
      active: slide.active ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateDoc('carousel', editing._id, form);
        toast.success('Slide updated');
      } else {
        await createDoc('carousel', form);
        toast.success('Slide created');
      }
      setModalOpen(false);
      refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save slide');
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteDoc('carousel', deleteId);
        toast.success('Slide deleted');
        refresh();
        setDeleteId(null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete slide');
      }
    }
  };

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 800 }}>Carousel Management</h1>
          <p className="text-gray-500 text-sm">{slides.length} slides active on homepage</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105"
          style={{ background: '#4A0000' }}
        >
          <Plus size={16} /> Add New Slide
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? <div className="text-center py-12">Loading...</div> :
          slides.map((slide, i) => (
            <motion.div
              key={slide._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center group"
            >
              <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                <img src={slide.image} alt={slide.heading} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase">
                  Order: {slide.order}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {slide.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#4A0000] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {slide.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{slide.heading}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{slide.description}</p>
                
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <ArrowRight size={10} /> {slide.cta1Label || 'N/A'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <ArrowRight size={10} /> {slide.cta2Label || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(slide)}
                  className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-[#4A0000] hover:bg-red-50 transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => setDeleteId(slide._id)}
                  className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}

        {!loading && slides.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ImageIcon className="mx-auto mb-4 text-gray-200" size={64} />
            <h3 className="text-lg font-bold text-gray-400">No Custom Slides</h3>
            <p className="text-gray-400 text-sm">Homepage is currently showing default branded content.</p>
          </div>
        )}
      </div>

      <AdminModal
        open={modalOpen}
        title={editing ? 'Edit Slide' : 'New Slide'}
        onClose={() => setModalOpen(false)}
        width="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Hero Heading" required>
              <input 
                required 
                value={form.heading} 
                onChange={e => set('heading', e.target.value)} 
                placeholder="e.g. Building Future Innovators" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4A0000] focus:ring-2 focus:ring-[#4A0000]/10 transition-all" 
              />
            </FormField>
            <FormField label="Badge Text (optional)">
              <input 
                value={form.badge} 
                onChange={e => set('badge', e.target.value)} 
                placeholder="e.g. 🏆 NATIONAL WINNERS" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4A0000] focus:ring-2 focus:ring-[#4A0000]/10 transition-all" 
              />
            </FormField>
          </div>

          <FormField label="Hero Description" required>
            <textarea 
              required 
              value={form.description} 
              onChange={e => set('description', e.target.value)} 
              rows={3} 
              placeholder="Tell your story in 1-2 powerful sentences..." 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4A0000] focus:ring-2 focus:ring-[#4A0000]/10 transition-all resize-none" 
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload 
              label="Hero Background Image" 
              value={form.image} 
              onChange={url => set('image', url)} 
            />
            <div className="space-y-4">
              <FormField label="Display Order">
                <input 
                  type="number" 
                  value={form.order} 
                  onChange={e => set('order', +e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4A0000] focus:ring-2 focus:ring-[#4A0000]/10 transition-all" 
                />
              </FormField>
              
              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTA 1 Text">
                  <input value={form.cta1Label} onChange={e => set('cta1Label', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs" />
                </FormField>
                <FormField label="CTA 1 Link">
                  <input value={form.cta1Href} onChange={e => set('cta1Href', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs" />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="CTA 2 Text">
                  <input value={form.cta2Label} onChange={e => set('cta2Label', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs" />
                </FormField>
                <FormField label="CTA 2 Link">
                  <input value={form.cta2Href} onChange={e => set('cta2Href', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs" />
                </FormField>
              </div>
            </div>
          </div>

          <FormActions 
            onCancel={() => setModalOpen(false)} 
            submitLabel={editing ? 'Save Changes' : 'Create Slide'} 
          />
        </form>
      </AdminModal>

      <AdminConfirm
        open={!!deleteId}
        message="This carousel slide will be permanently removed from the homepage gallery."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
