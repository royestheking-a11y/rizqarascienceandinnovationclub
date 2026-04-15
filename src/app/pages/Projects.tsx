import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ExternalLink, Trophy, Filter, ArrowRight, ChevronRight } from 'lucide-react';
import { fetchProjects } from '../data/api';
import type { Project } from '../data/mockData';

const ALL_TAGS = ['All', 'AI', 'Education', 'Web App', 'Career', 'Gamification', 'Communication', 'Healthcare'];
const STATUS_COLORS: Record<string, string> = {
  Live: '#2d6a4f',
  Beta: '#1a4a7a',
  Development: '#6b2d5e',
  Pilot: '#7d4e00',
};

export function Projects() {
  const [activeTag, setActiveTag] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(data => { setProjects(data); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
  }, []);

  const filtered = activeTag === 'All' ? projects : projects.filter(p => p.tags.includes(activeTag));

  if (loading) return <div className="py-32 text-center text-gray-500">Loading projects...</div>;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1775185172785-4bbd6b0fc8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(58,0,0,0.7) 0%, rgba(58,0,0,0.95) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#ffaaaa' }}>Portfolio</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Our Digital Products
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Real solutions to real problems. Each project represents hundreds of hours of design, development, and innovation by RSIC student teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 px-4 sticky top-20 z-30" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-2 text-gray-500 flex-shrink-0 mr-2">
            <Filter size={16} />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
              style={{ background: activeTag === tag ? '#4A0000' : '#F5F5F5', color: activeTag === tag ? '#fff' : '#374151' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          {/* Award Winner Featured */}
          {projects[0] && (activeTag === 'All' || projects[0].tags.includes(activeTag)) && (
            <motion.div
              className="mb-12 rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)', boxShadow: '0 30px 80px rgba(74,0,0,0.3)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid lg:grid-cols-2 min-h-96">
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,215,0,0.9)', color: '#3A0000' }}>
                      <Trophy size={12} /> 1st Prize Winner
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      Featured Project
                    </span>
                  </div>
                  <h2 className="text-white mb-3" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                    {projects[0].name}
                  </h2>
                  <p className="text-white/80 text-lg mb-2 font-medium">{projects[0].tagline}</p>
                  <p className="text-white/65 mb-8 leading-relaxed">{projects[0].shortDesc}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {projects[0].tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to={`/projects/${projects[0].customId || projects[0]._id || projects[0].id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{ background: '#fff', color: '#4A0000' }}
                    >
                      View Details <ChevronRight size={18} />
                    </Link>
                    <a
                      href={projects[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/30 text-white hover:bg-white/10 transition-all"
                    >
                      Visit Live <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <div className="relative overflow-hidden min-h-80">
                  <img src={projects[0].image} alt={projects[0].name} className="w-full h-full object-cover" style={{ minHeight: '400px' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(128,0,32,0.4) 0%, transparent 50%)' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.slice(projects[0] && (activeTag === 'All' || projects[0].tags.includes(activeTag)) ? 1 : 0).map((project, i) => (
                <motion.div
                  key={project._id || project.customId || project.id}
                  className="group rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
                  style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                    {project.award && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,215,0,0.95)', color: '#3A0000' }}>
                        <Trophy size={12} /> Award
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: STATUS_COLORS[project.status] || '#4A0000' }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: project.color }}>{project.category}</div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{project.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{project.shortDesc}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#F5F5F5', color: '#374151' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{project.year}</span>
                      <Link
                        to={`/projects/${project.customId || project._id || project.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                        style={{ color: '#4A0000' }}
                      >
                        View Project <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>
            Want to Build Something Amazing?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join RSIC and work on real projects with a passionate team of student innovators.
          </p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: '#fff', color: '#4A0000' }}>
            Join the Team <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}