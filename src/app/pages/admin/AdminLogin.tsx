import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';
import { loginAdmin, isAdminLoggedIn, ADMIN_CREDENTIALS } from '../../data/mockData';

export function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) navigate('/admin');
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = loginAdmin(form.email, form.password);
      setLoading(false);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 50%, #2D0000 100%)' }}
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                background: 'rgba(255,255,255,0.03)',
                left: `${[10, 60, 30, 70, 20, 50][i]}%`,
                top: `${[20, 10, 60, 50, 80, 35][i]}%`,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,100,50,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)' }} />
        </div>

        {/* Top: Logo */}
        <motion.div
          className="relative z-10 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden border-2 border-white/30" style={{ background: '#fff', padding: '3px' }}>
            <img src={logoImage} alt="RSIC" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <div className="text-white font-black text-xl tracking-wide">RIZQARA</div>
            <div className="text-white/50 text-xs tracking-widest font-medium">SCIENCE & INNOVATION CLUB</div>
          </div>
        </motion.div>

        {/* Center: Content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
            <Shield size={14} style={{ color: '#ffd700' }} />
            <span style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>SECURED ADMIN ACCESS</span>
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800, lineHeight: 1.2 }}>
            RSIC Control<br />Center
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Manage all aspects of the Rizqara Science & Innovation Club — members, programs, events, content, and communications from one unified dashboard.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Sections', value: '11', sub: 'Admin panels' },
              { label: 'Data Modules', value: '8+', sub: 'Connected' },
              { label: 'Live Metrics', value: 'Real-time', sub: 'Dashboard' },
              { label: 'Access Level', value: 'Full', sub: 'Control' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="text-white font-black text-xl mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom: Security note */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Lock size={16} className="text-white/40 flex-shrink-0" />
            <p className="text-white/40 text-xs leading-relaxed">
              This is a secured admin area. Unauthorized access attempts are monitored and logged. All actions are recorded for security purposes.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#f8f9fc' }}>
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 shadow-md">
              <img src={logoImage} alt="RSIC" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-black text-gray-900">RIZQARA</div>
              <div className="text-gray-400 text-xs">Admin Panel</div>
            </div>
          </div>

          <div className="p-10 rounded-3xl" style={{ background: '#fff', boxShadow: '0 20px 80px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4A0000, #3A0000)' }}>
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-gray-900" style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Admin Sign In</h2>
                <p className="text-gray-400 text-sm">Enter your admin credentials</p>
              </div>
            </div>


            {error && (
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl mb-6"
                style={{ background: '#fff5f7', border: '1px solid #fecdd3' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={18} style={{ color: '#4A0000', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: '#4A0000' }}>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="admin@rizqara.org"
                    className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none transition-all text-gray-900 bg-gray-50"
                    style={{ '--tw-ring-color': '#4A0000' } as React.CSSProperties}
                    onFocus={e => e.target.style.borderColor = '#4A0000'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
                <div className="relative">
                  <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter admin password"
                    className="w-full pl-11 pr-12 py-4 rounded-xl border border-gray-200 focus:outline-none transition-all text-gray-900 bg-gray-50"
                    onFocus={e => e.target.style.borderColor = '#4A0000'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-lg text-white transition-all mt-2"
                style={{ background: loading ? '#aaa' : 'linear-gradient(135deg, #4A0000, #3A0000)' }}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <Shield size={20} />
                    Access Admin Panel
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to RSIC Website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}