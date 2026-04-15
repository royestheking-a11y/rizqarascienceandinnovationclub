import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Shield, Target, Users, DollarSign, CheckCircle, ArrowRight, CreditCard, Lock, Smartphone } from 'lucide-react';
import { saveSubmission } from '../data/api';
import { AnimatedCounter } from '../components/AnimatedCounter';

const DONATION_OPTIONS = [
  { id: 'project', title: 'Fund a Student Project', desc: 'Help students develop real-world digital solutions and innovative technology.', icon: <Target size={28} />, color: '#800020' },
  { id: 'sponsor', title: 'Become a Sponsor', desc: 'Partner with us to support innovation, education, and digital transformation.', icon: <Shield size={28} />, color: '#1a4a7a' },
  { id: 'contribution', title: 'Make a Contribution', desc: 'Support our mission and help us build tools that impact communities.', icon: <Heart size={28} />, color: '#2d6a4f' },
];

const PRESET_AMOUNTS = [
  { value: 500, label: '৳500', desc: 'Supports learning materials' },
  { value: 1000, label: '৳1,000', desc: 'Supports project development' },
  { value: 5000, label: '৳5,000', desc: 'Supports innovation tools' },
  { value: 10000, label: '৳10,000', desc: 'Sponsors a workshop' },
];

const PAYMENT_METHODS = ['bKash', 'Nagad', 'Rocket', 'Visa/Mastercard', 'PayPal'];

const TRANSPARENCY = [
  { icon: <Target size={20} />, item: 'Software development tools & licenses', percent: 30 },
  { icon: <Shield size={20} />, item: 'Project hosting & infrastructure', percent: 25 },
  { icon: <Users size={20} />, item: 'Student training resources', percent: 25 },
  { icon: <Heart size={20} />, item: 'Research & development', percent: 15 },
  { icon: <DollarSign size={20} />, item: 'Community programs & events', percent: 5 },
];

export function Support() {
  const [selectedOption, setSelectedOption] = useState(DONATION_OPTIONS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({ name: '', email: '', country: '', message: '' });
  const [paymentStep, setPaymentStep] = useState<'form' | 'gateway' | 'success'>('form');
  const [gatewayStep, setGatewayStep] = useState(1);
  const [gatewayData, setGatewayData] = useState({ account: '', otp: '', cardNum: '', expiry: '', cvv: '' });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !finalAmount || !paymentMethod) {
      setError('Please fill all required fields and select an amount.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentStep('gateway');
      setGatewayStep(1);
      setGatewayData({ account: '', otp: '', cardNum: '', expiry: '', cvv: '' });
    }, 1000);
  };

  const handleFinalPayment = async () => {
    setLoading(true);
    try {
      await saveSubmission('donation', {
        name: form.name,
        email: form.email,
        country: form.country,
        amount: finalAmount,
        currency: 'BDT',
        message: form.message,
        option: selectedOption,
        date: new Date().toISOString(),
        paymentMethod,
        type: 'donation'
      });
      setPaymentStep('success');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getGatewayColor = (method: string) => {
    switch(method) {
      case 'bKash': return '#df146e';
      case 'Nagad': return '#f37021';
      case 'Rocket': return '#8c1564';
      case 'PayPal': return '#003087';
      default: return '#1a1f36';
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/rsic-club/work-1.png')` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,0,5,0.8) 0%, rgba(10,0,5,0.97) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heart size={56} className="mx-auto mb-6" style={{ color: '#800020' }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#800020' }}>Support Innovation</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Support Our Innovation Mission
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto">
              Help students build real digital products and create solutions that make a difference. Every contribution — big or small — moves innovation forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-10 px-4" style={{ background: '#800020' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 10, suffix: '+', label: 'Digital Projects Built' },
              { value: 500, suffix: '+', label: 'Students Impacted' },
              { value: 1, suffix: '+', label: 'National Award Won' },
              { value: 5, suffix: '+', label: 'Countries Reached' },
            ].map((stat, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}>
                <div className="text-white mb-1" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Support Us */}
      <section className="py-20 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#800020' }}>Our Mission</span>
              <h2 className="mt-3 mb-6" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}>
                Why Your Support Matters
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We are building real digital products to solve real problems. From education platforms to communication tools, our work requires resources, tools, and infrastructure.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Your contribution helps us continue this mission and empower the next generation of innovators.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Develop innovative technology solutions',
                  'Support student-led projects from idea to launch',
                  'Provide learning opportunities for underprivileged students',
                  'Build tools that benefit entire communities',
                  'Organize competitions and innovation challenges',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#800020' }} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="p-8 rounded-3xl" style={{ background: '#0a0005' }}>
                <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <Shield size={20} className="inline mr-2" style={{ color: '#800020' }} />
                  Where Your Contribution Goes
                </h3>
                <div className="flex flex-col gap-5">
                  {TRANSPARENCY.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 text-white/80 text-sm">
                          <span style={{ color: '#800020' }}>{item.icon}</span>
                          {item.item}
                        </div>
                        <span className="text-white font-bold text-sm">{item.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: '#800020' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/60 text-xs italic">
                    100% of contributions are used to support student innovation, project development, and educational programs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 px-4" style={{ background: '#2D0000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-center mb-12"
            style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a0005' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Support Type
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {DONATION_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.id}
                className="p-8 rounded-2xl cursor-pointer transition-all group"
                style={{
                  background: selectedOption === opt.id ? opt.color : '#F5F5F5',
                  border: `2px solid ${selectedOption === opt.id ? opt.color : 'transparent'}`,
                  boxShadow: selectedOption === opt.id ? `0 20px 60px ${opt.color}30` : 'none',
                }}
                onClick={() => setSelectedOption(opt.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: selectedOption === opt.id ? 'rgba(255,255,255,0.2)' : opt.color }}>
                  <span className={selectedOption === opt.id ? 'text-white' : 'text-white'}>
                    {opt.icon}
                  </span>
                </div>
                <h3 className={`font-bold text-xl mb-3 ${selectedOption === opt.id ? 'text-white' : 'text-gray-900'}`}>{opt.title}</h3>
                <p className={`leading-relaxed ${selectedOption === opt.id ? 'text-white/80' : 'text-gray-600'}`}>{opt.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Donation Form Area */}
          <AnimatePresence mode="wait">
            {paymentStep === 'success' && (
              <motion.div
                key="success"
                className="max-w-2xl mx-auto p-12 rounded-3xl text-center"
                style={{ background: '#f0fdf4', border: '2px solid #bbf7d0' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring' }}
              >
                <CheckCircle size={64} className="mx-auto mb-5" style={{ color: '#15803d' }} />
                <h3 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', color: '#166534' }} className="mb-3">
                  Payment Successful! 🙏
                </h3>
                <p className="text-green-700 mb-6 text-lg leading-relaxed">
                  Your secure contribution of <strong>৳{finalAmount.toLocaleString()}</strong> has been processed via {paymentMethod}. A receipt has been sent to {form.email}.
                </p>
                <button
                  onClick={() => { setPaymentStep('form'); setSelectedAmount(null); setCustomAmount(''); setForm({ name: '', email: '', country: '', message: '' }); }}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                  style={{ background: '#800020' }}
                >
                  Make Another Contribution
                </button>
              </motion.div>
            )}

            {paymentStep === 'gateway' && (
              <motion.div
                key="gateway"
                className="max-w-md mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-3xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #e5e7eb' }}>
                  {/* Gateway Header */}
                  <div className="p-6 text-center relative transition-colors duration-300" style={{ background: getGatewayColor(paymentMethod), color: '#fff' }}>
                    <button onClick={() => setPaymentStep('form')} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 text-sm font-semibold">
                      ← Back
                    </button>
                    <div className="font-black tracking-widest uppercase text-[10px] mb-2 opacity-90 text-white flex items-center justify-center gap-1.5">
                      <Lock size={12} /> SECURE CHECKOUT
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{paymentMethod}</h3>
                  </div>

                  {/* Gateway Details */}
                  <div className="p-5 bg-gray-50 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-bold text-gray-500">Merchant Name</span>
                       <span className="text-sm font-bold text-gray-900">RSIC Foundation</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-bold text-gray-500">Amount Due</span>
                       <span className="text-lg font-black transition-colors duration-300" style={{ color: getGatewayColor(paymentMethod) }}>৳ {finalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Gateway Body */}
                  <div className="p-8">
                    {(paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket') ? (
                      <div>
                        {gatewayStep === 1 ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="text-center mb-6">
                              <Smartphone size={36} className="mx-auto mb-4 transition-colors duration-300" style={{ color: getGatewayColor(paymentMethod) }} />
                              <p className="text-sm font-bold text-gray-700 mb-3 block">Your {paymentMethod} Account Number</p>
                              <input 
                                type="text" 
                                placeholder="e.g 017XXXXXXXX"
                                maxLength={11} 
                                value={gatewayData.account}
                                onChange={(e) => setGatewayData({...gatewayData, account: e.target.value.replace(/\D/g, '')})}
                                className="w-full text-center tracking-[0.2em] px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-opacity-50 font-mono text-lg transition-all"
                              />
                            </div>
                            <button
                              disabled={gatewayData.account.length < 11}
                              onClick={() => setGatewayStep(2)}
                              className="w-full py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
                              style={{ background: getGatewayColor(paymentMethod) }}
                            >
                              PROCEED
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="text-center mb-6">
                              <Lock size={36} className="mx-auto mb-4 transition-colors duration-300" style={{ color: getGatewayColor(paymentMethod) }} />
                              <p className="text-sm font-bold text-gray-700 mb-1 block">Enter Verification Code</p>
                              <p className="text-xs text-gray-500 mb-4 font-medium">Sent to +88 {gatewayData.account}</p>
                              <input 
                                type="password" 
                                placeholder="- - - - - -" 
                                maxLength={6}
                                value={gatewayData.otp}
                                onChange={(e) => setGatewayData({...gatewayData, otp: e.target.value})}
                                className="w-full text-center tracking-[0.5em] px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-opacity-50 font-mono text-2xl transition-all"
                              />
                            </div>
                            <button
                              disabled={gatewayData.otp.length < 4 || loading}
                              onClick={handleFinalPayment}
                              className="flex justify-center items-center gap-2 w-full py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
                              style={{ background: getGatewayColor(paymentMethod) }}
                            >
                              {loading ? <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'VERIFY & PAY'}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex flex-col gap-5 mb-8">
                          <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Card Number</label>
                            <div className="relative">
                              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input 
                                type="text" 
                                placeholder="XXXX XXXX XXXX XXXX" 
                                value={gatewayData.cardNum}
                                onChange={(e) => setGatewayData({...gatewayData, cardNum: e.target.value})}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#1a1f36] focus:outline-none font-mono tracking-widest transition-all" 
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Expiry</label>
                               <input 
                                 type="text" 
                                 placeholder="MM/YY" 
                                 value={gatewayData.expiry}
                                 onChange={(e) => setGatewayData({...gatewayData, expiry: e.target.value})}
                                 className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#1a1f36] focus:outline-none font-mono text-center tracking-widest transition-all" 
                               />
                             </div>
                             <div>
                               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">CVV</label>
                               <input 
                                 type="password" 
                                 placeholder="***" 
                                 maxLength={3} 
                                 value={gatewayData.cvv}
                                 onChange={(e) => setGatewayData({...gatewayData, cvv: e.target.value})}
                                 className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#1a1f36] focus:outline-none font-mono text-center tracking-widest transition-all" 
                               />
                             </div>
                          </div>
                        </div>
                        <button
                          disabled={!gatewayData.cardNum || loading}
                          onClick={handleFinalPayment}
                          className="flex justify-center items-center gap-2 w-full py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
                          style={{ background: getGatewayColor(paymentMethod) }}
                        >
                          {loading ? <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : `PAY ৳${finalAmount.toLocaleString()}`}
                        </button>
                      </motion.div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50 text-center border-t border-gray-100 flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-gray-400">
                    <Lock size={12} className="text-green-600" /> 256-bit SSL Encrypted Payment
                  </div>
                </div>
              </motion.div>
            )}

            {paymentStep === 'form' && (
              <motion.div
                key="form"
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="p-10 rounded-3xl" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                  <h3 className="mb-6" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 700 }}>
                    Complete Your Contribution
                  </h3>

                  {error && <div className="p-4 rounded-xl mb-5 text-sm" style={{ background: '#fff5f7', color: '#800020', border: '1px solid #fecdd3' }}>{error}</div>}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Amount Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Select Amount *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        {PRESET_AMOUNTS.map(preset => (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => { setSelectedAmount(preset.value); setCustomAmount(''); }}
                            className="p-3 rounded-xl text-center transition-all"
                            style={{
                              background: selectedAmount === preset.value ? '#800020' : '#F5F5F5',
                              color: selectedAmount === preset.value ? '#fff' : '#374151',
                              border: `2px solid ${selectedAmount === preset.value ? '#800020' : 'transparent'}`,
                            }}
                          >
                            <div className="font-black">{preset.label}</div>
                            <div className="text-xs mt-1 opacity-80">{preset.desc}</div>
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">৳</span>
                        <input
                          type="number"
                          placeholder="Custom Amount"
                          value={customAmount}
                          onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                          className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-gray-900"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Payment Method *</label>
                      <div className="flex flex-wrap gap-2">
                        {PAYMENT_METHODS.map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                            style={{
                              background: paymentMethod === method ? '#800020' : '#F5F5F5',
                              color: paymentMethod === method ? '#fff' : '#374151',
                            }}
                          >
                            <CreditCard size={14} /> {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-gray-900" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                      <input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="Your country" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-gray-900" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                      <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Share a message of encouragement..." className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-gray-900 resize-none" />
                    </div>

                    {/* Summary */}
                    {finalAmount > 0 && (
                      <div className="p-4 rounded-xl" style={{ background: '#F5F5F5' }}>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Contribution Amount</span>
                          <span className="text-gray-900 font-black text-xl">৳{finalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full py-5 rounded-xl font-bold text-xl text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #800020, #5a0015)' }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Heart size={22} />
                          {finalAmount > 0 ? `Contribute ৳${finalAmount.toLocaleString()}` : 'Contribute Now'}
                          <ArrowRight size={22} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-500 font-medium flex items-center justify-center">
                      <Lock size={12} className="inline mr-1" /> Your contribution implies agreeing to our secure payment terms.
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ background: '#0a0005' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-white mb-10" style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { q: 'How is my contribution used?', a: '100% of contributions go directly to student projects, learning resources, infrastructure, and innovation programs. We publish annual transparency reports.' },
              { q: 'Is my contribution tax-deductible?', a: 'Tax treatment depends on your country of residence. We recommend consulting with your local tax advisor for specific guidance.' },
              { q: 'Can I contribute anonymously?', a: 'Yes. Simply leave the name field as "Anonymous" in the form. Your privacy is fully respected.' },
              { q: 'Are there sponsorship packages for organizations?', a: 'Yes! Organizations can partner with RSIC through custom sponsorship packages. Contact us at info@rizqara.org for details.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                <p className="text-white/65 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}