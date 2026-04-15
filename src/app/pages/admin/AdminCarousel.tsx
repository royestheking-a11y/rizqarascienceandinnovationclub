import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { fetchCarousel, createDoc, updateDoc, deleteDoc } from '../../data/api';

export function AdminCarousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      const data = await fetchCarousel();
      setSlides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      image: formData.get('image'),
      badge: formData.get('badge'),
      heading1: formData.get('heading1'),
      cta1Label: formData.get('cta1Label'),
      cta1Href: formData.get('cta1Href'),
      cta2Label: formData.get('cta2Label'),
      cta2Href: formData.get('cta2Href'),
      order: Number(formData.get('order')),
      active: true,
    };

    try {
      if (editingSlide) {
        await updateDoc('carousel', editingSlide._id, data);
      } else {
        await createDoc('carousel', data);
      }
      setShowForm(false);
      setEditingSlide(null);
      loadSlides();
    } catch (err) {
      alert('Error saving slide');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      await deleteDoc('carousel', id);
      loadSlides();
    } catch (err) {
      alert('Error deleting slide');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading slides...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Carousel Management</h1>
          <p className="text-gray-500 text-sm">Manage the hero slides on your homepage.</p>
        </div>
        <button
          onClick={() => { setEditingSlide(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#4A0000] text-white rounded-xl font-semibold hover:bg-[#3A0000] transition-colors"
        >
          <Plus size={18} /> Add New Slide
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editingSlide ? 'Edit Slide' : 'New Slide'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                  <input name="image" defaultValue={editingSlide?.image} required className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Badge Text</label>
                  <input name="badge" defaultValue={editingSlide?.badge} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" placeholder="🏆 Winner of..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Heading</label>
                  <input name="heading1" defaultValue={editingSlide?.heading1} required className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" placeholder="Building Future" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CTA 1 Label</label>
                    <input name="cta1Label" defaultValue={editingSlide?.cta1Label || 'Join RSIC — Free'} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CTA 1 Link</label>
                    <input name="cta1Href" defaultValue={editingSlide?.cta1Href || '/join'} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CTA 2 Label</label>
                    <input name="cta2Label" defaultValue={editingSlide?.cta2Label || 'Explore Projects'} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CTA 2 Link</label>
                    <input name="cta2Href" defaultValue={editingSlide?.cta2Href || '/projects'} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Display Order</label>
                  <input type="number" name="order" defaultValue={editingSlide?.order || 0} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A0000]/20" />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-top border-gray-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-[#4A0000] text-white font-bold hover:shadow-lg transition-all"><Save size={18} /> {editingSlide ? 'Update Slide' : 'Create Slide'}</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {slides.map((slide, i) => (
          <motion.div
            key={slide._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative group">
              <img src={slide.image} alt={slide.heading1} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="text-white" size={24} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">Order: {slide.order}</span>
                {slide.active ? (
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-[10px] font-bold text-green-600 uppercase">Active</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-[10px] font-bold text-red-600 uppercase">Inactive</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{slide.heading1}</h3>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => { setEditingSlide(slide); setShowForm(true); }}
                className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-[#4A0000] hover:text-white transition-all"
                title="Edit Slide"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDelete(slide._id)}
                className="p-3 rounded-xl bg-gray-100 text-gray-300 hover:bg-red-500 hover:text-white transition-all"
                title="Delete Slide"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}

        {slides.length === 0 && !showForm && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ImageIcon className="mx-auto mb-4 text-gray-300" size={48} />
            <h3 className="text-lg font-bold text-gray-400">No slides managed in database</h3>
            <p className="text-gray-400 text-sm mb-6">The website is currently using hardcoded fallback slides.</p>
            <button
              onClick={() => { setEditingSlide(null); setShowForm(true); }}
              className="px-6 py-2.5 bg-[#4A0000] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Add First Slide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
