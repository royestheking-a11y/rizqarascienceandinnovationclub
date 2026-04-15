import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send, CheckCircle } from 'lucide-react';
import { BRAND } from '../data/mockData';
import { saveSubmission } from '../data/api';
import { toast } from 'sonner';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveSubmission('contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
      toast.success('Your message has been sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const CONTACT_INFO = [
    { icon: <Mail size={24} />, label: 'Email Us', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: <Phone size={24} />, label: 'Call Us', value: BRAND.phone, href: `tel:${BRAND.phone}` },
    { icon: <MapPin size={24} />, label: 'Visit Us', value: BRAND.location, href: '#' },
  ];

  const SOCIALS = [
    { Icon: Facebook, href: BRAND.social.facebook, label: 'Facebook' },
    { Icon: Twitter, href: BRAND.social.twitter, label: 'Twitter' },
    { Icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
    { Icon: Linkedin, href: BRAND.social.linkedin, label: 'LinkedIn' },
    { Icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #800020 0%, #5a0015 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Get in Touch</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Contact Us
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
              Have a question, partnership proposal, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                className="p-8 rounded-3xl"
                style={{ background: '#0a0005' }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Let's Connect</h2>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Whether you're a student, educator, organization, or innovator — we want to connect with you.
                </p>

                <div className="flex flex-col gap-6">
                  {CONTACT_INFO.map((info, i) => (
                    <a
                      key={i}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white transition-all group-hover:scale-110" style={{ background: '#800020' }}>
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-4">Follow Us</div>
                  <div className="flex gap-3">
                    {SOCIALS.map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all"
                        style={{ background: 'rgba(255,255,255,0.07)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#800020'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                className="p-6 rounded-2xl"
                style={{ background: '#fff', border: '1px solid #e5e7eb' }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="flex flex-col gap-3 text-sm">
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                    { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-gray-600">{row.day}</span>
                      <span className="font-medium text-gray-900">{row.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  *All times in Bangladesh Standard Time (BST, UTC+6)
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3 p-10 rounded-3xl"
              style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <CheckCircle size={64} className="mb-6" style={{ color: '#2d6a4f' }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Message Sent!</h3>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for reaching out. We'll get back to you within 24-48 hours during business days.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#800020' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="mb-2" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>
                    Send a Message
                  </h2>
                  <p className="text-gray-600 mb-8 text-sm">We'll respond within 24-48 hours.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        placeholder="What is this regarding?"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us about your inquiry, idea, or partnership opportunity..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all text-gray-900 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg, #800020, #5a0015)' }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="px-4 pb-20" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ height: '400px', background: 'linear-gradient(135deg, #3A0000, #2D0000)', position: 'relative' }}
          >
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1765133469414-02f4e445df19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')` }} />
            <div className="relative z-10 text-center">
              <MapPin size={48} className="mx-auto mb-4" style={{ color: '#800020' }} />
              <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>RSIC Innovation Hub</h3>
              <p className="text-white/70">Dhaka, Bangladesh</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: '#800020', color: '#fff' }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}