import { motion, Variants } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Target, Eye, Heart, Zap, Users, Globe, Award, BookOpen } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const VALUES = [
  { icon: <Zap size={24} />, title: 'Innovation', desc: 'We challenge the status quo and continuously seek creative solutions to complex problems.' },
  { icon: <Target size={24} />, title: 'Creativity', desc: 'We nurture imaginative thinking and encourage bold, original ideas.' },
  { icon: <Users size={24} />, title: 'Collaboration', desc: 'We believe in the power of teamwork, shared knowledge, and collective growth.' },
  { icon: <Heart size={24} />, title: 'Integrity', desc: 'We operate with transparency, honesty, and ethical responsibility in all our work.' },
  { icon: <Globe size={24} />, title: 'Impact', desc: 'Every project we build aims to create meaningful, lasting change in society.' },
];

export function About() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() }} />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Who We Are</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              About Rizqara Science & Innovation Club
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              We are a student-led innovation community dedicated to bridging the gap between academic learning and real-world technological impact through hands-on projects, research, and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="p-10 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/20">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-white mb-4" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Our Mission</h2>
              <p className="text-white/85 text-lg leading-relaxed">
                To empower students worldwide through science, technology, and innovation — providing them with the skills, tools, and opportunities to build real digital products that solve real-world problems.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {['Practical, project-based education', 'Global student collaboration', 'Real-world technology impact', 'Research & innovation culture'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="p-10 rounded-3xl"
              style={{ background: '#3A0000' }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#4A0000' }}>
                <Eye size={28} className="text-white" />
              </div>
              <h2 className="text-white mb-4" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Our Vision</h2>
              <p className="text-white/85 text-lg leading-relaxed">
                To become the leading global student innovation and technology learning community — recognized worldwide for developing the next generation of technology leaders, researchers, and innovators.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[{ label: 'Projects Built', value: '10+' }, { label: 'Students Impacted', value: '500+' }, { label: 'Countries', value: '5+' }, { label: 'Awards', value: '3+' }].map(stat => (
                  <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Our Journey</span>
              <h2 className="mt-3 mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
                The Story Behind RSIC
              </h2>
              <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">RSIC was born from a simple frustration:</strong> talented students with brilliant ideas but no platform, resources, or guidance to bring them to life. Our founder, Md. Rizqul Islam, recognized that traditional education was preparing students for exams — not for innovation.
                </p>
                <p>
                  In 2023, a small group of passionate students came together with a bold mission: <em>build real technology that solves real problems.</em> What started as informal coding sessions quickly evolved into a structured innovation club with programs, mentorship, and a portfolio of actual digital products.
                </p>
                <p>
                  Today, RSIC is recognized nationally for our work. Our project Admission Bondu won <strong style={{ color: '#4A0000' }}>1st Prize at the National Science & Technology Fair 2026</strong>, proving that student-led innovation can match — and exceed — professional standards.
                </p>
                <p>
                  We are different because we don't just teach — <strong>we build together.</strong> Every student who joins RSIC works on real projects, gains real experience, and contributes to real impact.
                </p>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: '#4A0000', color: '#fff' }}
              >
                See Our Projects <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="/about/story_team.png" alt="Collaborative Team" className="rounded-2xl w-full h-52 object-cover shadow-lg" />
                <img src="/about/story_coding.png" alt="Late night coding hackathon" className="rounded-2xl w-full h-52 object-cover mt-8 shadow-lg" />
                <img src="/about/story_robotics.png" alt="Robotics Development" className="rounded-2xl w-full h-52 object-cover -mt-8 shadow-lg" />
                <img src="/about/story_award.png" alt="Award Winning Recognition" className="rounded-2xl w-full h-52 object-cover shadow-lg" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl text-center" style={{ background: '#4A0000', boxShadow: '0 20px 40px rgba(74,0,0,0.4)', minWidth: '200px' }}>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Founded</div>
                <div className="text-white text-2xl font-black">2023</div>
                <div className="text-white/70 text-sm">Dhaka, Bangladesh</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#ff9999' }}>What We Stand For</span>
            <h2 className="mt-3 text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif' }}>
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="p-6 rounded-2xl text-center group hover:-translate-y-2 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 30, background: 'rgba(255,255,255,0.04)' }}
                whileInView={{ opacity: 1, y: 0, background: 'rgba(255,255,255,0.04)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: '#4A0000', background: 'rgba(74,0,0,0.25)' }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white" style={{ background: '#4A0000' }}>
                  {value.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 px-4" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Our Advantage</span>
            <h2 className="mt-3" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
              What Makes RSIC Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BookOpen size={28} />, title: 'Project-First Learning', desc: 'Every program is anchored in real project work. You don\'t just learn concepts — you apply them to build actual products.' },
              { icon: <Award size={28} />, title: 'Award Recognition', desc: 'National-level recognition validates the quality of our work and opens doors for our members in the professional world.' },
              { icon: <Globe size={28} />, title: 'Global Perspective', desc: 'Our programs are designed for worldwide applicability, connecting students with global tech communities and opportunities.' },
              { icon: <Users size={28} />, title: 'Strong Mentorship', desc: 'Experienced professors, industry professionals, and successful alumni guide every step of our members\' journeys.' },
              { icon: <Zap size={28} />, title: 'Cutting-Edge Curriculum', desc: 'From AI and robotics to design and research, our programs stay ahead of industry trends and job market demands.' },
              { icon: <Heart size={28} />, title: 'Community & Culture', desc: 'RSIC isn\'t just a club — it\'s a family. We foster an inclusive, supportive community where everyone can thrive.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl group hover:shadow-xl transition-all"
                style={{ border: '1px solid #e5e7eb' }}
                whileHover={{ borderColor: '#4A0000', transform: 'translateY(-4px)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white" style={{ background: '#4A0000' }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontFamily: 'Playfair Display, serif' }}>
            Be Part of Our Story
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join RSIC and help us write the next chapter of innovation. Your skills, your ideas — our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105" style={{ background: '#fff', color: '#4A0000' }}>
              Join RSIC <ArrowRight size={20} />
            </Link>
            <Link to="/team" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/40 text-white hover:bg-white/10 transition-all">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}