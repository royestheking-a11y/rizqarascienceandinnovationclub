import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  ArrowRight, Trophy, Globe, Users, FolderOpen,
  Code2, Cpu, Brain, Palette, FlaskConical,
  Zap, Target, Award, Heart, ChevronRight, ChevronLeft, Star,
} from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { STATS } from '../data/mockData';
import { fetchProjects, fetchPrograms, fetchAchievements } from '../data/api';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  'Programming': <Code2 size={28} />,
  'Robotics & IoT': <Cpu size={28} />,
  'Artificial Intelligence': <Brain size={28} />,
  'Design & Innovation': <Palette size={28} />,
  'Research & STEM': <FlaskConical size={28} />,
};

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🏆 1st Prize Winners — Science & Technology Fair 2026',
    heading1: 'Building Future',
    heading2: 'Innovators',
    accent: 'Through Science & Technology',
    sub: 'A global student innovation community focused on real-world projects, digital skills, and research-driven learning.',
    cta1: { label: 'Join the Club', href: '/join' },
    cta2: { label: 'Explore Projects', href: '/projects' },
  },
  {
    image: 'https://images.unsplash.com/photo-1636979648933-6d06b1ce9ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '💻 World-Class Programming & AI Programs',
    heading1: 'Master Cutting-Edge',
    heading2: 'Technology & AI',
    accent: 'From Code to Innovation',
    sub: 'From Python to Machine Learning — learn through real projects, expert mentors, and industry-grade curriculum designed for tomorrow\'s leaders.',
    cta1: { label: 'Start Learning', href: '/programs' },
    cta2: { label: 'View Programs', href: '/programs' },
  },
  {
    image: 'https://images.unsplash.com/photo-1768796371633-ba921e535c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🤖 Robotics & IoT Excellence Center',
    heading1: 'Build Intelligent',
    heading2: 'Robots & Devices',
    accent: 'Powering the Physical World',
    sub: 'Explore the frontier of robotics, embedded systems, and IoT — build smart devices that solve real problems for real communities.',
    cta1: { label: 'Join Robotics Lab', href: '/programs' },
    cta2: { label: 'See Projects', href: '/projects' },
  },
  {
    image: 'https://images.unsplash.com/photo-1766297248122-5957c51b1f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🌍 500+ Members Across the Globe',
    heading1: 'Join a Worldwide',
    heading2: 'Innovation Movement',
    accent: 'Students. Builders. Leaders.',
    sub: 'Connect with brilliant students, researchers, and innovators from across Bangladesh and around the world. Your journey starts here.',
    cta1: { label: 'Join Now — Free', href: '/join' },
    cta2: { label: 'Meet the Team', href: '/team' },
  },
  {
    image: 'https://images.unsplash.com/photo-1767561070418-cbb62b952a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🎖️ National Award-Winning Excellence',
    heading1: 'Award-Winning',
    heading2: 'Innovation Hub',
    accent: 'Recognition That Matters',
    sub: 'Our projects have won national recognition and positively impacted thousands of students across Bangladesh and beyond.',
    cta1: { label: 'Our Achievements', href: '/achievements' },
    cta2: { label: 'View Projects', href: '/projects' },
  },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [projects, setProjects] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([fetchProjects(), fetchPrograms(), fetchAchievements()])
      .then(([prjs, prgs, achs]) => {
        setProjects(prjs); setPrograms(prgs); setAchievements(achs);
      })
      .catch(console.error);
  }, []);
  // Removed duplicate hooks

  const goToSlide = useCallback((idx: number, dir = 1) => {
    setDirection(dir);
    setCurrentSlide(idx);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length, 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, -1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* ══════════════════ HERO CAROUSEL ══════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Backgrounds */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(74,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.22) 100%)' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: 'rgba(255,255,255,0.4)',
                left: `${5 + i * 6.5}%`,
                top: `${10 + (i * 13) % 80}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -20, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Side decorative lines */}
        <div className="absolute left-0 top-0 bottom-0 w-1 opacity-30" style={{ background: 'linear-gradient(to bottom, transparent, #fff, transparent)' }} />

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {slide.badge}
              </motion.div>

              {/* Heading */}
              <h1
                className="text-white mb-3"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontFamily: 'Playfair Display, serif', lineHeight: 1.1, fontWeight: 800 }}
              >
                {slide.heading1}
                <br />
                <span style={{ color: '#fff' }}>{slide.heading2}</span>
              </h1>

              <div className="text-center mb-5">
                <span className="inline-block px-6 py-2 rounded-full text-base font-semibold" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffb3c1', border: '1px solid rgba(255,179,193,0.3)', backdropFilter: 'blur(8px)' }}>
                  {slide.accent}
                </span>
              </div>

              {/* Sub */}
              <p
                className="text-white/75 max-w-2xl mx-auto mb-10"
                style={{ fontSize: '1.15rem', lineHeight: 1.85 }}
              >
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={slide.cta1.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ background: '#fff', color: '#4A0000' }}
                >
                  Join RSIC — Free <ArrowRight size={20} />
                </Link>
                <Link
                  to={slide.cta2.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <div className="w-1.5 h-3 rounded-full bg-white/60" />
            </div>
          </motion.div>
        </div>



        {/* Dot Indicators */}
        <div className="absolute bottom-10 right-6 md:right-12 z-20 flex flex-col gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i, i > currentSlide ? 1 : -1)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: '6px',
                height: i === currentSlide ? '28px' : '6px',
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>



        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            className="h-full"
            style={{ background: '#fff' }}
            key={currentSlide}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: isHovered ? 0 : 6, ease: 'linear' }}
          />
        </div>
      </section>

      {/* ══════════════════ STATS SECTION ══════════════════ */}
      <section style={{ background: '#4A0000' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-white mb-1" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ACHIEVEMENT HIGHLIGHT ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)', boxShadow: '0 40px 80px rgba(74,0,0,0.4)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.4)' }}>
                  <Trophy size={16} style={{ color: '#ffd700' }} />
                  <span style={{ color: '#ffd700', fontSize: '0.85rem', fontWeight: 700 }}>AWARD-WINNING INNOVATION</span>
                </div>
                <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                  1st Prize — Science & Technology Fair 2026
                </h2>
                <p className="text-white/80 mb-6 text-lg leading-relaxed">
                  Our project <strong style={{ color: '#ffd700' }}>Admission Bondu</strong> was recognized as the most innovative digital solution among 200+ competing projects at the National Science & Technology Fair 2026.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {['Innovation', 'Impact', 'Excellence', 'Technology'].map((tag: string) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                      ✦ {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/achievements"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 w-fit"
                  style={{ background: '#fff', color: '#4A0000' }}
                >
                  View Full Details <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative overflow-hidden min-h-80">
                <img
                  src="/rsic-club/office-room.png"
                  alt="Award Ceremony"
                  className="w-full h-full object-cover"
                  style={{ minHeight: '400px' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(128,0,32,0.5) 0%, transparent 100%)' }} />
                <div className="absolute top-6 right-6 p-4 rounded-2xl text-center" style={{ background: 'rgba(255,215,0,0.95)', backdropFilter: 'blur(10px)' }}>
                  <Trophy size={32} style={{ color: '#4A0000', margin: '0 auto 4px' }} />
                  <div style={{ color: '#4A0000', fontWeight: 800, fontSize: '0.9rem' }}>1st PRIZE</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ WHAT WE DO (PROGRAMS) ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Our Programs</span>
            <h2 className="mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
              What We Do
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive programs designed to transform passionate students into skilled innovators, researchers, and technology leaders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {programs.map((program, i) => (
              <Link key={program._id || program.customId || program.id} to={`/programs#${program.id}`}>
                <motion.div
                  className="group rounded-2xl overflow-hidden cursor-pointer h-full"
                  style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                >
                  <div className="h-36 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${program.image}')` }}>
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${program.color}dd 0%, ${program.color}99 100%)` }} />
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {PROGRAM_ICONS[program.category]}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-2 text-gray-900" style={{ fontSize: '0.95rem' }}>{program.category}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{program.description}</p>
                    <div className="text-xs font-semibold" style={{ color: program.color }}>
                      {program.courses?.length || 0} Courses →
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: '#4A0000', color: '#fff' }}
            >
              Explore All Programs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ PROJECTS SHOWCASE ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Our Portfolio</span>
            <h2 className="mt-3 mb-4 text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif' }}>
              Real Projects, Real Impact
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              We don't just learn — we build. Explore our portfolio of digital products that are solving real-world problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id || project.customId || project.id}
                className="group rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                  {project.award && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,215,0,0.9)', color: '#3A0000' }}>
                      <Trophy size={12} />
                      Award Winner
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(128,0,32,0.8)', color: '#fff' }}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{project.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(128,0,32,0.3)', color: '#ffb3c1' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: '#ff6b8a' }}
                  >
                    View Project <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/20 text-white hover:bg-white/10 transition-all"
            >
              View All Projects <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Why Choose RSIC</span>
              <h2 className="mt-3 mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
                More Than a Club — It's a Movement
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                RSIC bridges the gap between classroom learning and real-world innovation. We equip students with practical skills, global connections, and the confidence to build technology that matters.
              </p>

              <div className="grid grid-cols-1 gap-5">
                {[
                  { icon: <FolderOpen size={22} />, title: 'Real Digital Products', desc: 'We build actual products like Admission Bondu, Elevate CV, and Jeevita — not just academic exercises.' },
                  { icon: <Zap size={22} />, title: 'Hands-on Learning', desc: 'Learn by doing with project-based curricula, live workshops, and mentored innovation sessions.' },
                  { icon: <Award size={22} />, title: 'Award-Winning Projects', desc: 'National recognition validates our approach. Our 1st Prize win proves the quality of our work.' },
                  { icon: <Globe size={22} />, title: 'Global Community', desc: 'Connect with students, mentors, and professionals from across Bangladesh and around the world.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 p-5 rounded-xl group hover:shadow-lg transition-all"
                    style={{ border: '1px solid rgba(128,0,32,0.1)' }}
                    initial={{ background: 'rgba(128,0,32,0)' }}
                    whileHover={{ borderColor: '#4A0000', background: 'rgba(128,0,32,0.02)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: '#4A0000' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ height: '550px' }}>
                <img
                  src="/rsic-club/po3.png"
                  alt="RSIC Students"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(128,0,32,0.6) 0%, transparent 60%)' }} />
              </div>
              {/* Floating Cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 p-5 rounded-2xl"
                style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', minWidth: '200px' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: '#4A0000' }}>
                    <Trophy size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Award Won</div>
                    <div className="text-gray-500 text-xs">Science Fair 2026</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 p-5 rounded-2xl"
                style={{ background: '#4A0000', boxShadow: '0 20px 60px rgba(74,0,0,0.3)', minWidth: '180px' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-white/80" />
                    <span className="text-xs font-semibold text-white/80">Members</span>
                  </div>
                  <div className="text-2xl font-black">500+</div>
                  <div className="text-xs text-white/70">Worldwide</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SUPPORT SECTION ══════════════════ */}
      <section className="py-24 px-4" style={{ background: 'linear-gradient(135deg, #3A0000 0%, #2D0000 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Support Innovation</span>
            <h2 className="mt-3 mb-4 text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif' }}>
              Help Us Build the Next Generation of Innovators
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Your support powers innovation, education, and real-world solutions that benefit communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'Fund a Student Project', desc: 'Help students develop real-world digital solutions and innovative technology.', amount: '৳5,000+' },
              { title: 'Become a Sponsor', desc: 'Partner with us to support innovation, education, and digital transformation.', amount: 'Custom' },
              { title: 'Make a Contribution', desc: 'Support our mission and help us build tools that impact communities.', amount: '৳500+' },
            ].map((opt, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl text-center group hover:-translate-y-2 transition-all cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, y: 20, background: 'rgba(255,255,255,0.05)' }}
                whileInView={{ opacity: 1, y: 0, background: 'rgba(255,255,255,0.05)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: '#4A0000', background: 'rgba(74,0,0,0.2)' }}
              >
                <Heart size={32} className="mx-auto mb-4" style={{ color: '#ff6b8a' }} />
                <h3 className="text-white font-bold mb-2 text-lg">{opt.title}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{opt.desc}</p>
                <div className="font-black text-2xl mb-4" style={{ color: '#ff6b8a' }}>{opt.amount}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #4A0000, #3A0000)', color: '#fff' }}
            >
              <Heart size={20} />
              Support Innovation <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ LATEST ACHIEVEMENTS ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Recognition</span>
            <h2 className="mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
              Award-Winning Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.slice(0, 3).map((ach, i) => (
              <motion.div
                key={ach._id || ach.customId || ach.id}
                className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all"
                style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={ach.image} alt={ach.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'rgba(128,0,32,0.5)' }} />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ background: 'rgba(255,215,0,0.95)', color: '#3A0000' }}>
                    <Trophy size={12} /> {ach.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#4A0000' }}>{ach.date}</div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{ach.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{ach.description}</p>
                  <div className="flex items-center gap-2">
                    <Target size={14} style={{ color: '#4A0000' }} />
                    <span className="text-sm font-medium text-gray-700">{ach.project}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA SECTION ══════════════════ */}
      <section className="py-24 px-4" style={{ background: '#4A0000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Star size={48} className="mx-auto mb-6 text-yellow-400" />
            <h2 className="text-white mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Join the Innovation Community Today
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Be part of a global movement of young innovators building real solutions for real problems. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: '#fff', color: '#4A0000' }}
              >
                Register Now <ArrowRight size={22} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}