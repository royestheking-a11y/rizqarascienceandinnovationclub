import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchGallery } from '../data/api';

const CATEGORIES = ['All', 'Workshops', 'Projects', 'Events', 'Achievements', 'Team'];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    fetchGallery().then(setGallery).catch(console.error);
  }, []);

  const filtered = activeCategory === 'All' ? gallery : gallery.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length);
  };
  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % filtered.length);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-4 h-full gap-1">
            {gallery.slice(0, 8).map(item => (
              <div key={item._id || item.customId || item.id} className="relative overflow-hidden">
                <img src={item.image} alt="" className="w-full h-full object-cover opacity-50" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,0,5,0.7) 0%, rgba(10,0,5,0.97) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#800020' }}>Visual Story</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Our Gallery
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              A visual journey through our workshops, projects, events, and community moments. Every image tells a story of innovation and passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 px-4 sticky top-20 z-30" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: activeCategory === cat ? '#800020' : '#F5F5F5', color: activeCategory === cat ? '#fff' : '#374151' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id || item.customId || item.id}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden ${i % 7 === 0 ? 'col-span-2 row-span-2' : i % 5 === 0 ? 'col-span-2' : ''}`}
                  style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', aspectRatio: i % 7 === 0 ? undefined : '4/3' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedIdx(i)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ minHeight: i % 7 === 0 ? '400px' : '200px' }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'linear-gradient(to top, rgba(128,0,32,0.85) 0%, transparent 60%)' }}>
                    <div className="text-white font-bold text-sm">{item.title}</div>
                    <div className="text-white/70 text-xs mt-1">{item.category} • {item.date}</div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all" style={{ background: '#800020', color: '#fff' }}>
                    {item.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-10"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <motion.div
              className="max-w-5xl max-h-full px-16 flex flex-col items-center"
              key={selectedIdx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[selectedIdx].image}
                alt={filtered[selectedIdx].title}
                className="max-h-[70vh] w-auto rounded-2xl object-contain"
              />
              <div className="mt-5 text-center">
                <h3 className="text-white text-xl font-bold mb-1">{filtered[selectedIdx].title}</h3>
                <div className="text-white/60 text-sm">{filtered[selectedIdx].category} • {filtered[selectedIdx].date}</div>
              </div>
              <div className="mt-3 text-white/40 text-sm">
                {selectedIdx + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}