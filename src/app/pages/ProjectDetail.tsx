import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Trophy, CheckCircle, Users, Calendar, Tag } from 'lucide-react';
import { fetchProjects } from '../data/api';
import { useState, useEffect } from 'react';

export function ProjectDetail() {
  const { id } = useParams();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error);
  }, []);

  const project = projects.find(p => p.id === id || p.customId === id || p._id === id);

  if (projects.length === 0) return null;
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pb-24 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}cc 0%, rgba(10,0,5,0.9) 100%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Projects
              </Link>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {project.category}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {project.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {project.year}
                </span>
                {project.award && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,215,0,0.9)', color: '#5a0015' }}>
                    <Trophy size={12} /> {project.award}
                  </span>
                )}
              </div>

              <h1 className="text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                {project.name}
              </h1>
              <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-xl">{project.tagline}</p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.link !== '#' ? project.link : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 text-sm"
                  style={{ background: '#fff', color: project.color, opacity: project.link === '#' ? 0.5 : 1, cursor: project.link === '#' ? 'not-allowed' : 'pointer' }}
                >
                  <ExternalLink size={16} />
                  {project.link !== '#' ? 'Visit Live Project' : 'Coming Soon'}
                </a>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/30 text-white hover:bg-white/10 transition-all text-sm"
                >
                  <Users size={16} /> Join the Team
                </Link>
              </div>
            </motion.div>

            {/* Hero Image Side */}
            <motion.div
              className="relative hidden lg:block rounded-3xl overflow-hidden"
              style={{ height: '440px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Mobile Image Layer */}
            <motion.div
              className="relative lg:hidden rounded-3xl overflow-hidden mt-6"
              style={{ height: '300px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                {/* Description */}
                <div className="mb-12">
                  <h2 style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }} className="mb-4">About This Project</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
                </div>

                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 rounded-2xl" style={{ background: '#fff5f7', border: '1px solid #fecdd3' }}>
                    <h3 className="font-bold mb-3 text-lg" style={{ color: '#4A0000' }}>🔴 The Problem</h3>
                    <p className="text-gray-700 leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <h3 className="font-bold mb-3 text-lg" style={{ color: '#2d6a4f' }}>🟢 Our Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-12">
                  <h2 style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }} className="mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature: string, i: number) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: '#F5F5F5' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 + 0.3 }}
                      >
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#4A0000' }} />
                        <span className="text-gray-700 font-medium text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-12 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
                  <h2 className="text-white mb-4" style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>📊 Impact & Results</h2>
                  <p className="text-white/85 text-lg leading-relaxed">{project.impact}</p>
                </div>

                {/* Screenshots */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }} className="mb-6">Project Screenshots</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.screenshots.map((screenshot: string, i: number) => (
                        <div key={i} className="rounded-2xl overflow-hidden aspect-video">
                          <img src={screenshot} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                className="sticky top-28 flex flex-col gap-6"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Quick Info */}
                <div className="p-6 rounded-2xl" style={{ background: '#3A0000' }}>
                  <h3 className="text-white font-bold mb-5 text-lg">Project Details</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: <Tag size={16} />, label: 'Category', value: project.category },
                      { icon: <Calendar size={16} />, label: 'Year', value: project.year.toString() },
                      { icon: <CheckCircle size={16} />, label: 'Status', value: project.status },
                      { icon: <Users size={16} />, label: 'Team', value: project.team.join(', ') },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="mt-0.5" style={{ color: '#ff9999' }}>{item.icon}</div>
                        <div>
                          <div className="text-white/50 text-xs uppercase tracking-wider">{item.label}</div>
                          <div className="text-white text-sm font-medium mt-0.5">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="p-6 rounded-2xl" style={{ background: '#F5F5F5' }}>
                  <h3 className="font-bold text-gray-900 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#4A0000', color: '#fff' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Award */}
                {project.award && (
                  <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #ffd700, #ffb700)', boxShadow: '0 10px 30px rgba(255,215,0,0.3)' }}>
                    <Trophy size={28} className="mb-3" style={{ color: '#3A0000' }} />
                    <h3 className="font-bold mb-2" style={{ color: '#3A0000', fontSize: '0.9rem' }}>Award Recognition</h3>
                    <p style={{ color: '#2D0000', fontSize: '0.85rem', fontWeight: 600 }}>{project.award}</p>
                  </div>
                )}

                {/* CTA */}
                <Link
                  to="/join"
                  className="w-full text-center py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: '#4A0000', color: '#fff' }}
                >
                  Join This Team
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-20 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-8" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.filter(p => p.id !== id && p.customId !== id && p._id !== id).slice(0, 4).map((p, i) => (
              <motion.div
                key={p._id || p.customId || p.id}
                className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all"
                style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{p.name}</h4>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{p.shortDesc}</p>
                  <Link to={`/projects/${p.id}`} className="text-xs font-semibold" style={{ color: '#4A0000' }}>
                    View →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}