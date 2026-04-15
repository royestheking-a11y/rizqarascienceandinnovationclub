import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Code2, Cpu, Brain, Palette, FlaskConical, Clock, BarChart2, Award, Users, ChevronDown, ArrowRight } from 'lucide-react';
import { fetchPrograms } from '../data/api';
import { type Program } from '../data/mockData';

const ICONS: Record<string, React.ReactNode> = {
  'Programming': <Code2 size={24} />,
  'Robotics & IoT': <Cpu size={24} />,
  'Artificial Intelligence': <Brain size={24} />,
  'Design & Innovation': <Palette size={24} />,
  'Research & STEM': <FlaskConical size={24} />,
};

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#2d6a4f',
  Intermediate: '#1a4a7a',
  Advanced: '#4A0000',
};

export function Programs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetchPrograms().then(setPrograms).catch(console.error);
  }, []);

  useEffect(() => {
    if (location.hash && programs.length > 0) {
      const catId = location.hash.replace('#', '');
      const exists = programs.some(p => p.id === catId);
      if (exists) {
        setActiveCategory(catId);
        setTimeout(() => {
          document.getElementById(catId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash, programs]);

  const filtered = activeCategory === 'all' ? programs : programs.filter(p => p.id === activeCategory);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1723987135977-ae935608939e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')`, mixBlendMode: 'multiply' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Learning Hub</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              World-Class Programs & Courses
            </h1>
            <p className="text-white/80 text-xl leading-relaxed">
              From beginner to advanced — practical, certificate-backed programs designed to transform you into a technology innovator.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[{ value: '5', label: 'Program Categories' }, { value: '13', label: 'Total Courses' }, { value: '100%', label: 'Certificate Rate' }].map((s, i) => (
              <motion.div key={i} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}>
                <div className="text-white text-2xl font-black">{s.value}</div>
                <div className="text-white/70 text-xs mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sticky top-20 z-30" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: activeCategory === 'all' ? '#4A0000' : '#F5F5F5', color: activeCategory === 'all' ? '#fff' : '#374151' }}
            >
              All Programs
            </button>
            {programs.map((p, i) => (
              <button
                key={p._id || p.customId || p.id || i}
                onClick={() => setActiveCategory(p.id)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{ background: activeCategory === p.id ? '#4A0000' : '#F5F5F5', color: activeCategory === p.id ? '#fff' : '#374151' }}
              >
                <span>{ICONS[p.category]}</span>
                {p.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-16"
            >
              {filtered.map((program, pi) => (
                <div
                  key={program._id || program.customId || program.id}
                  id={program.id}
                >
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                    <div className="flex-shrink-0 relative w-full md:w-72 h-48 rounded-2xl overflow-hidden">
                      <img src={program.image} alt={program.category} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${program.color}cc` }}>
                        <div className="text-white">{ICONS[program.category]}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: program.color }}>
                          {ICONS[program.category]}
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>{program.category}</h2>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-4">{program.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700">
                          <BarChart2 size={14} /> {program.courses.length} Courses
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-700">
                          <Award size={14} /> Certificate Included
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {program.courses.map((course: any, ci) => (
                      <motion.div
                        key={course._id || course.id || `${program.id}-course-${ci}`}
                        className="rounded-2xl overflow-hidden cursor-pointer group/card"
                        style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}
                        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ci * 0.1 }}
                        onClick={() => navigate(course.id === 'learn-ai' ? `/courses/${course.id}/quiz` : "/join")}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{course.name}</h3>
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: LEVEL_COLORS[course.level] || '#4A0000' }}>
                                {course.level}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-yellow-500 justify-end mb-1">
                                {'★'.repeat(Math.floor(course.rating || 0))}
                              </div>
                              <div className="text-sm font-bold text-gray-900">{course.rating || 'N/A'}</div>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.description}</p>

                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration || 'Flexible'}</span>
                            <span className="flex items-center gap-1.5"><Users size={14} /> {(course.students || 0).toLocaleString()} students</span>
                          </div>

                          {/* Skills */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedCourse(expandedCourse === course.id ? null : course.id); }}
                            className="flex items-center gap-2 text-sm font-medium w-full justify-between mb-3 hover:opacity-70 transition-opacity"
                            style={{ color: program.color }}
                          >
                            <span>Skills You'll Learn</span>
                            <ChevronDown size={16} className={`transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {expandedCourse === course.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {course.skills.map((skill: string) => (
                                    <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${program.color}15`, color: program.color }}>
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            {course.certificate && (
                              <span className="flex items-center gap-1.5 text-xs font-medium text-green-700">
                                <Award size={13} /> Certificate
                              </span>
                            )}
                            <Link
                              to={course.id === 'learn-ai' ? `/courses/${course.id}/quiz` : "/join"}
                              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                              style={{ background: program.color }}
                            >
                              {course.id === 'learn-ai' ? 'Start Learning' : 'Enroll Now'} <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#4A0000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>Ready to Start Learning?</h2>
          <p className="text-white/80 text-lg mb-8">Join RSIC and access all programs, workshops, and resources — many completely free for members.</p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: '#fff', color: '#4A0000' }}>
            Join RSIC Today <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}