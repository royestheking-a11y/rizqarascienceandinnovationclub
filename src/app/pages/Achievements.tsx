import { motion } from 'motion/react';
import { Trophy, Calendar, MapPin, Award, Star } from 'lucide-react';
import { fetchAchievements } from '../data/api';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

export function Achievements() {
  const [achievements, setAchievements] = useState<any[]>([]);
  useEffect(() => {
    fetchAchievements().then(setAchievements).catch(console.error);
  }, []);
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ rotate: [0, 360] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: 'linear' }}>
              <Star size={Math.random() * 20 + 8} className="text-yellow-400" />
            </motion.div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Trophy size={56} className="mx-auto mb-6 text-yellow-400" />
            <h1 className="text-white mt-2 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Awards & Achievements
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              Recognition that validates our commitment to innovation, excellence, and real-world impact. Every award tells the story of hundreds of hours of dedicated student work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Summary */}
      <section className="py-12 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '3+', label: 'Awards Won', icon: <Trophy size={24} /> },
              { value: '2', label: 'National Level', icon: <Award size={24} /> },
              { value: '1', label: '1st Prize', icon: <Star size={24} /> },
              { value: '2026', label: 'Latest Award', icon: <Calendar size={24} /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <div className="flex justify-center mb-3" style={{ color: '#ff9999' }}>{stat.icon}</div>
                <div className="text-white text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements List */}
      <section className="py-20 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-12">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach._id || ach.customId || ach.id}
                className="rounded-3xl overflow-hidden"
                style={{ background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className={`grid lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden ${i % 2 !== 0 ? 'lg:order-2' : ''}`} style={{ minHeight: '400px' }}>
                    <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" style={{ minHeight: '400px' }} />
                    <div className="absolute inset-0" style={{ background: 'rgba(128,0,32,0.4)' }} />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      <div className="px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm" style={{ background: 'rgba(255,215,0,0.95)', color: '#3A0000' }}>
                        <Trophy size={16} /> {ach.category}
                      </div>
                      <div className="px-4 py-2 rounded-full font-bold text-sm" style={{ background: 'rgba(128,0,32,0.9)', color: '#fff' }}>
                        {ach.level} Recognition
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-10 flex flex-col justify-center ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-2 text-sm mb-4" style={{ color: '#4A0000' }}>
                      <Calendar size={15} />
                      <span className="font-semibold">{ach.date}</span>
                    </div>
                    <h2 className="mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 800, lineHeight: 1.3 }}>
                      {ach.title}
                    </h2>
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <Award size={15} style={{ color: '#4A0000' }} />
                      <span><strong>Project:</strong> {ach.project}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <MapPin size={15} style={{ color: '#4A0000' }} />
                      <span>{ach.event} — {ach.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                      <span className="text-gray-500">Organized by:</span>
                      <span className="font-medium text-gray-800">{ach.organizer}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{ach.description}</p>

                    <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(74,0,0,0.08), rgba(74,0,0,0.03))', border: '1px solid rgba(74,0,0,0.15)' }}>
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#4A0000' }}>Prize / Recognition</div>
                      <div className="font-semibold text-gray-900">{ach.prize}</div>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="border-t border-gray-100 p-8">
                  <h3 className="font-bold text-gray-900 mb-4">Certificate & Documentation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer">
                      <img src={ach.certificateImage} alt="Certificate" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(128,0,32,0.7)' }}>
                        <span className="text-white font-semibold">View Certificate</span>
                      </div>
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                        Certificate
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer">
                      <img src={(ach as any).eventImage || ach.image} alt="Award" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(128,0,32,0.7)' }}>
                        <span className="text-white font-semibold">View Photo</span>
                      </div>
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                        Event Photo
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4" style={{ background: '#3A0000' }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-center text-white mb-12"
            style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Achievement Timeline
          </motion.h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'rgba(128,0,32,0.4)' }} />
            <div className="flex flex-col gap-8">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach._id || ach.customId || ach.id}
                  className="flex gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10" style={{ background: '#4A0000' }}>
                    <Trophy size={20} className="text-yellow-400" />
                  </div>
                  <div className="p-6 rounded-2xl flex-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#ffaaaa' }}>{ach.date}</div>
                    <h3 className="text-white font-bold mb-1">{ach.title}</h3>
                    <p className="text-white/60 text-sm">{ach.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>
            Be Part of Award-Winning Innovation
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join RSIC and work on projects that get recognized at national and international levels.
          </p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: '#fff', color: '#4A0000' }}>
            Join RSIC Today
          </Link>
        </div>
      </section>
    </div>
  );
}