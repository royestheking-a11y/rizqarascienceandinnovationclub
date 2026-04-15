import { motion } from 'motion/react';
import { Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { fetchTeam } from '../data/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Team() {
  const [team, setTeam] = useState<any[]>([]);
  useEffect(() => {
    fetchTeam().then(setTeam).catch(console.error);
  }, []);

  if (team.length === 0) return null;

  const president = team[0];
  const vp = team[1];
  const leadership = team.slice(0, 4);
  const members = team.slice(4);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')`, mixBlendMode: 'multiply' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">The People Behind RSIC</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Meet Our Team
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              A passionate collective of students, researchers, educators, and innovators united by a shared vision of transforming education through technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-4" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#4A0000' }}>Leadership</span>
            <h2 className="mt-3" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>Club Leadership</h2>
          </motion.div>

          {/* Featured Leaders */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {[president, vp].map((member, i) => (
              <motion.div
                key={member._id || member.customId || member.id}
                className="rounded-3xl overflow-hidden"
                style={{ background: '#3A0000', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" style={{ minHeight: '320px' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,0,5,0.8) 100%)' }} />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#ff9999' }}>{member.role}</div>
                    <h3 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{member.name}</h3>
                    <p className="text-white/65 text-sm leading-relaxed mb-6">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.expertise.map((skill: string) => (
                        <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(128,0,32,0.3)', color: '#ffb3c1' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {[
                        { Icon: Linkedin, href: member.social.linkedin },
                        { Icon: Github, href: member.social.github },
                        { Icon: Twitter, href: member.social.twitter },
                        { Icon: Mail, href: `mailto:${member.email}` },
                      ].map(({ Icon, href }, j) => (
                        <a
                          key={j}
                          href={href}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
                          style={{ background: 'rgba(255,255,255,0.08)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#4A0000'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
                        >
                          <Icon size={15} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {team.slice(2, 4).map((member, i) => (
              <motion.div
                key={member._id || member.customId || member.id}
                className="rounded-2xl overflow-hidden group hover:shadow-xl transition-all"
                style={{ background: '#F5F5F5', border: '1px solid #e5e7eb' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-6 p-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#4A0000' }}>{member.role}</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{member.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 2).map((skill: string) => (
                        <span key={skill} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(74,0,0,0.1)', color: '#4A0000' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Team Members */}
      <section className="py-24 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#ffaaaa' }}>Our People</span>
            <h2 className="mt-3 text-white" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif' }}>Core Team Members</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.slice(4).map((member, i) => (
              <motion.div
                key={member._id || member.customId || member.id}
                className="group rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 30, background: 'rgba(255,255,255,0.04)' }}
                whileInView={{ opacity: 1, y: 0, background: 'rgba(255,255,255,0.04)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: '#4A0000', background: 'rgba(74,0,0,0.25)' }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#4A0000' }}>{member.role}</div>
                  <h3 className="text-white font-bold mb-2">{member.name}</h3>
                  <p className="text-white/55 text-xs leading-relaxed mb-4 line-clamp-2">{member.bio}</p>
                  <div className="flex gap-2">
                    {[
                      { Icon: Linkedin, href: member.social.linkedin },
                      { Icon: Github, href: member.social.github },
                      { Icon: Mail, href: `mailto:${member.email}` },
                    ].map(({ Icon, href }, j) => (
                      <a
                        key={j}
                        href={href}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.07)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#4A0000'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}
                      >
                        <Icon size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>
            Want to Join Our Team?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            We're always looking for passionate students to contribute their skills and ideas to the RSIC mission.
          </p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: '#fff', color: '#4A0000' }}>
            Apply to Join
          </Link>
        </div>
      </section>
    </div>
  );
}