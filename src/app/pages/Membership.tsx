import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Users, Award, Globe, Zap, ArrowRight } from 'lucide-react';
import { createDoc } from '../data/api';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

const COUNTRIES = ['Bangladesh', 'India', 'Pakistan', 'Sri Lanka', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'Malaysia', 'UAE', 'Saudi Arabia', 'Other'];
const INTERESTS = ['Programming', 'Robotics & IoT', 'Artificial Intelligence', 'Design & Innovation', 'Research & STEM', 'App Development', 'Cybersecurity', 'Data Science', 'Game Development', 'Entrepreneurship'];

const BENEFITS = [
  { icon: <Award size={22} />, title: 'Certificate Programs', desc: 'Access to all certified courses and earn verifiable digital certificates.' },
  { icon: <Users size={22} />, title: 'Global Community', desc: 'Connect with 500+ students and innovators from around the world.' },
  { icon: <Zap size={22} />, title: 'Real Project Experience', desc: 'Work on actual products like Admission Bondu, Elevate CV, and more.' },
  { icon: <Globe size={22} />, title: 'International Exposure', desc: 'Participate in global competitions, hackathons, and innovation challenges.' },
];

export function Membership() {
  const { updateUser } = useAuth();
  const [step, setStep] = useState<'benefits' | 'form' | 'success'>('form');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    school: '',
    whatsapp: '',
    interests: [] as string[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.country || !form.school) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const newMember = await createDoc('members', {
        customId: `MEM-${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password,
        country: form.country,
        school: form.school,
        interests: form.interests,
        whatsapp: form.whatsapp,
        joinDate: new Date().toISOString(),
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        activityLog: []
      });
      // Auto-login
      updateUser(newMember);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20" style={{ background: '#F5F5F5', fontFamily: 'Inter, sans-serif' }}>
        <motion.div
          className="max-w-lg w-full p-12 rounded-3xl text-center"
          style={{ background: '#fff', boxShadow: '0 20px 80px rgba(0,0,0,0.12)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#4A0000' }}>
              <CheckCircle size={40} className="text-white" />
            </div>
          </motion.div>
          <h2 className="mb-3" style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 800 }}>
            Welcome to RSIC, {form.name.split(' ')[0]}! 🎉
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your membership application has been received. You're now part of the Rizqara Science & Innovation Club community. Access your dashboard to explore programs and connect with innovators.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard" className="w-full py-4 rounded-xl font-bold text-lg text-center transition-all hover:opacity-90" style={{ background: '#4A0000', color: '#fff' }}>
              Go to My Dashboard <ArrowRight size={18} className="inline ml-2" />
            </Link>
            <Link to="/programs" className="w-full py-4 rounded-xl font-bold text-lg text-center border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-all">
              Explore Programs
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Global Membership</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Join the RSIC Community
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              Become part of a global student innovation movement. Free membership. Real projects. Certified learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Benefits */}
            <div className="lg:col-span-2">
              <motion.div
                className="sticky top-28"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>
                  Membership Benefits
                </h2>

                <div className="flex flex-col gap-5 mb-8">
                  {BENEFITS.map((benefit, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-4 p-5 rounded-2xl"
                      style={{ background: '#fff', border: '1px solid #e5e7eb' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: '#4A0000' }}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="p-6 rounded-2xl" style={{ background: '#3A0000' }}>
                  <p className="text-white/80 text-sm italic leading-relaxed mb-4">
                    "Joining RSIC changed my career trajectory. I went from a student who could only write basic code to leading a real product team in just 8 months."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1657551856874-d492ef8ecba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" alt="Member" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-white font-semibold text-sm">Ahmed Al-Rashid</div>
                      <div className="text-white/50 text-xs">RSIC Member, Jordan</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Registration Form */}
            <motion.div
              className="lg:col-span-3 p-10 rounded-3xl"
              style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="mb-2" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>
                Create Your Account
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Already a member? <Link to="/dashboard" style={{ color: '#4A0000', fontWeight: 600 }}>Login here</Link>
              </p>

              {error && (
                <div className="p-4 rounded-xl mb-6 text-sm" style={{ background: '#fff5f7', color: '#4A0000', border: '1px solid #fecdd3' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                    <select
                      required
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900 bg-white"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School / University *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your institution"
                      value={form.school}
                      onChange={e => setForm(f => ({ ...f, school: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Telegram (Optional)</label>
                  <input
                    type="text"
                    placeholder="+880 1700-000000"
                    value={form.whatsapp}
                    onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] transition-all text-gray-900"
                  />
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                        style={{
                          background: form.interests.includes(interest) ? '#4A0000' : '#F5F5F5',
                          color: form.interests.includes(interest) ? '#fff' : '#374151',
                          border: `2px solid ${form.interests.includes(interest) ? '#4A0000' : 'transparent'}`,
                        }}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed">
                  By joining, you agree to RSIC's community guidelines and privacy policy. Your data is used solely to improve your experience.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 hover:scale-[1.02] mt-2"
                  style={{ background: 'linear-gradient(135deg, #4A0000, #3A0000)' }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <>Join RSIC — It's Free <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}