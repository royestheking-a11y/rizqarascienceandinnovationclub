import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  User, BookOpen, Award, Activity, LogOut, ChevronRight,
  CheckCircle, Clock, Edit3, Eye, EyeOff, Mail, Lock,
  Globe, Shield, Star, ArrowRight, AlertCircle, Settings, 
  HelpCircle, Layout, Grid, PieChart, Bell, Phone, Send,
  Menu, X
} from 'lucide-react';
import { fetchPrograms, updateDoc, saveSubmission } from '../data/api';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../data/mockData';

export function Dashboard() {
  const { user, login, logout, updateUser, loading: authLoading } = useAuth();
  
  // Login State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState('overview');
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', school: '', whatsapp: '' });

  // Support State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '' });
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  
  // Mobile UI State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  useEffect(() => {
    fetchPrograms().then(setAllPrograms).catch(console.error);
    if (user) {
      setEditForm({ name: user.name, school: user.school, whatsapp: user.whatsapp || '' });
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    const enrolled = [...(user.enrolledCourses || []), courseId];
    const log = [{ id: Date.now().toString(), date: new Date().toISOString(), description: `Enrolled in course ${courseId}` }, ...(user.activityLog || [])];
    
    const updated = { ...user, enrolledCourses: enrolled, activityLog: log };
    updateUser(updated);
    
    try {
      await updateDoc('members', user._id || user.customId || user.id, updated);
    } catch(e) { console.error('Failed to sync to DB', e); }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const updated = { ...user, name: editForm.name, school: editForm.school, whatsapp: editForm.whatsapp };
    updateUser(updated);
    setEditMode(false);
    try {
      await updateDoc('members', user._id || user.customId || user.id, updated);
    } catch(e) { console.error('Failed to sync profile', e); }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setTicketLoading(true);
    try {
      await saveSubmission('contact', {
        name: user.name,
        email: user.email,
        subject: `[STUDENT HELP] ${ticketForm.subject}`,
        message: ticketForm.message,
      });
      setTicketSent(true);
      setTicketForm({ subject: '', message: '' });
      setTimeout(() => setTicketSent(false), 5000);
    } catch (err) {
      console.error('Support ticket failed', err);
    } finally {
      setTicketLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-[#4A0000] border-t-transparent rounded-full animate-spin" /></div>;
  }

  // --- LOGGED OUT VIEW ---
  if (!user) {
    return (
      <div className="min-h-screen flex overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-between w-5/12 xl:w-1/2 relative overflow-hidden p-12" style={{ background: 'linear-gradient(160deg, #4A0000 0%, #3A0000 40%, #2D0000 100%)' }}>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full border border-white/5" style={{ width: `${200 + i * 120}px`, height: `${200 + i * 120}px`, right: `${-80 + i * -40}px`, top: '50%', transform: 'translateY(-50%)' }} animate={{ rotate: [0, 360] }} transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }} />
            ))}
          </div>
          <div className="relative z-10 mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
              <Star size={12} fill="#ffd700" style={{ color: '#ffd700' }} />
              <span style={{ color: '#ffd700', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>MEMBER PORTAL</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Start Your Innovation Journey</h1>
            <p className="text-white/60 text-lg max-w-md">Access world-class courses, track your progress, and earn certificates from the comfort of your dashboard.</p>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-4">
             {[{ label: 'Users', value: '500+' }, { label: 'Courses', value: '13+' }, { label: 'Certified', value: '100%' }].map((s,i) => (
               <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
                 <div className="text-white font-bold text-xl">{s.value}</div>
                 <div className="text-white/40 text-xs">{s.label}</div>
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#f8f9fc]">
          <motion.div className="w-full max-w-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-100">
               <div className="mb-8">
                 <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Sign In</h2>
                 <p className="text-gray-500">Welcome back! Please enter your details.</p>
               </div>

               {loginError && <div className="p-4 rounded-2xl mb-6 bg-red-50 text-red-700 text-sm flex items-center gap-2 border border-red-100"><AlertCircle size={16}/> {loginError}</div>}

               <form onSubmit={handleLogin} className="space-y-6">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                   <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input type="email" required value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4A0000] transition-all" placeholder="your@email.com" />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                   <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input type={showPassword ? 'text' : 'password'} required value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4A0000] transition-all" placeholder="••••••••" />
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                   </div>
                 </div>
                 <button type="submit" disabled={loginLoading} className="w-full py-4 bg-[#4A0000] text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#4A0000]/20 flex items-center justify-center gap-2">
                   {loginLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight size={18}/></>}
                 </button>
               </form>

               <div className="mt-8 text-center pt-8 border-t border-gray-50">
                 <p className="text-gray-500 text-sm mb-4">Don't have an account? <Link to="/join" className="text-[#4A0000] font-bold hover:underline">Join RSIC Free</Link></p>
                 <Link to="/" className="text-sm text-gray-400 hover:text-[#4A0000] transition-colors inline-flex items-center gap-2">
                   ← Back to Main Website
                 </Link>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN VIEW (SIDEBAR LAYOUT) ---
  const allCourses = allPrograms.flatMap(p => (p.courses || []).map((c: any) => ({ ...c, category: p.category, color: p.color, programId: p.id })));
  const userEnrolled = Array.isArray(user.enrolledCourses) ? user.enrolledCourses : [];
  const enrolledCourses = allCourses.filter(c => userEnrolled.includes(c.id));

  const MENU_ITEMS = [
    { id: 'overview', label: 'Overview', icon: <Layout size={20}/> },
    { id: 'courses', label: 'My Learning', icon: <BookOpen size={20}/> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20}/> },
    { id: 'profile', label: 'Profile', icon: <User size={20}/> },
    { id: 'support', label: 'Help & Support', icon: <HelpCircle size={20}/> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 fixed left-0 top-0 bottom-0 hidden lg:flex flex-col p-6 z-40">
        <div className="mt-8 mb-10 text-center px-4">
          <div className="w-20 h-20 bg-[#4A0000] text-white text-3xl font-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#4A0000]/20">
            {user.name.charAt(0)}
          </div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{user.name}</h3>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{user.role}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold ${activeTab === item.id ? 'bg-[#4A0000] text-white shadow-xl shadow-[#4A0000]/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeTab === item.id && <motion.div layoutId="nav-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white"/>}
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-gray-50">
            <Link to="/" className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:text-[#4A0000] hover:bg-gray-50 transition-all font-semibold">
              <Globe size={20}/>
              <span>Back to Website</span>
            </Link>
          </div>
        </nav>

        <button onClick={logout} className="mt-auton flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all font-semibold">
          <LogOut size={20}/>
          <span>Sign Out</span>
        </button>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileMenuOpen(false)}
               className="fixed inset-0 bg-[#4A0000]/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside 
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-[60] flex flex-col p-6 shadow-2xl lg:hidden"
            >
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#4A0000] text-white text-lg font-black rounded-xl flex items-center justify-center">
                        {user.name.charAt(0)}
                     </div>
                     <div className="text-sm font-bold text-gray-900">Student Portal</div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                     <X size={20} />
                  </button>
               </div>

               <nav className="flex-1 space-y-1">
                 {MENU_ITEMS.map(item => (
                   <button
                     key={item.id}
                     onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                     className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold ${activeTab === item.id ? 'bg-[#4A0000] text-white shadow-xl shadow-[#4A0000]/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                   >
                     {item.icon}
                     <span>{item.label}</span>
                   </button>
                 ))}
               </nav>

               <button onClick={logout} className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all font-semibold border-t border-gray-50">
                 <LogOut size={20}/>
                 <span>Sign Out</span>
               </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10 flex flex-col gap-8">
       {/* TOP BAR */}
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle */}
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#4A0000] border border-gray-100 shadow-sm"
             >
                <Menu size={24}/>
             </button>
             <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {MENU_ITEMS.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="hidden xs:block text-gray-500 text-sm mt-1">Hello, {user.name.split(' ')[0]}! Explore your dashboard.</p>
             </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 relative">
             <button 
                onClick={() => { setShowNotifications(!showNotifications); setHasNewNotifications(false); }}
                className={`relative w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border transition-all ${showNotifications ? 'bg-[#4A0000] text-white border-[#4A0000]' : 'bg-white text-gray-400 border-gray-100 hover:text-gray-900'}`}
             >
                <Bell size={20}/>
                {hasNewNotifications && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />}
             </button>

             {/* Notifications Dropdown */}
             <AnimatePresence>
               {showNotifications && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 10 }}
                     className="absolute top-full right-0 mt-4 w-80 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 z-20 overflow-hidden"
                   >
                     <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                       <h3 className="font-bold text-gray-900">Notifications</h3>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Latest</span>
                     </div>
                     <div className="max-h-[350px] overflow-y-auto">
                       {(user.activityLog || []).length === 0 ? (
                         <div className="p-8 text-center text-gray-400 text-sm">No new notifications</div>
                       ) : (
                         [...(user.activityLog || [])].reverse().slice(0, 10).map((log, i) => (
                           <div key={i} className="p-4 flex gap-3 hover:bg-gray-50 transition-all cursor-pointer border-b border-gray-50 last:border-0">
                             <div className="w-8 h-8 rounded-lg bg-[#4A0000]/5 flex items-center justify-center text-[#4A0000] flex-shrink-0">
                               <Activity size={12} />
                             </div>
                             <div>
                               <div className="text-sm font-semibold text-gray-800 leading-tight">{log.description}</div>
                               <div className="text-[10px] text-gray-400 mt-1 font-medium">{new Date(log.date).toLocaleDateString()}</div>
                             </div>
                           </div>
                         ))
                       )}
                     </div>
                     {(user.activityLog || []).length > 0 && (
                       <button 
                         onClick={() => { setActiveTab('overview'); setShowNotifications(false); }}
                         className="w-full py-3 text-center text-xs font-bold text-[#4A0000] hover:bg-gray-50 transition-all border-t border-gray-50"
                       >
                         View All Activity
                       </button>
                     )}
                   </motion.div>
                 </>
               )}
             </AnimatePresence>
             <div className="hidden md:block text-right">
               <div className="text-sm font-bold text-gray-900">{user.name}</div>
               <div className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                 <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 Online
               </div>
             </div>
          </div>
       </div>

        <div className="flex flex-col gap-8">
          {/* TABS CONTENT */}
          {activeTab === 'overview' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Enrolled Courses', value: (user.enrolledCourses || []).length, icon: <BookOpen size={20}/>, color: '#4A0000' },
                  { label: 'Certificates Earned', value: (user.certificates || []).length, icon: <Award size={20}/>, color: '#d97706' },
                  { label: 'Completed Lessons', value: (user.completedCourses || []).length, icon: <CheckCircle size={20}/>, color: '#15803d' },
                  { label: 'Global Rank', value: '#12', icon: <Globe size={20}/>, color: '#1a4a7a' },
                ].map((s,i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ background: s.color }}>{s.icon}</div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">{s.value}</div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8">
                   <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Activity History</h3>
                   <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                     {(user.activityLog || []).length === 0 ? (
                       <div className="text-center py-10 text-gray-400">No activity yet. Start learning today!</div>
                     ) : (
                       [...(user.activityLog || [])].reverse().map((log, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#4A0000] border border-gray-100 shadow-sm"><Activity size={16}/></div>
                           <div className="flex-1">
                             <div className="text-sm font-bold text-gray-900">{log.description}</div>
                             <div className="text-[0.7rem] text-gray-400 font-medium uppercase mt-0.5">{new Date(log.date).toLocaleDateString('en-US', { dateStyle: 'medium' })} · {new Date(log.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                           </div>
                         </div>
                       ))
                     )}
                   </div>
                </div>
                {/* Promo Card */}
                <div className="bg-[#4A0000] rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%]" />
                   <div>
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6"><Star size={24} fill="#ffd700" className="text-[#ffd700]" /></div>
                     <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Ready for more?</h4>
                     <p className="text-white/60 text-sm leading-relaxed mb-6">Explore our Artificial Intelligence program and earn your first certificate today.</p>
                     <Link to="/programs" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#4A0000] rounded-xl font-bold transition-all hover:scale-105">Browse AI <ArrowRight size={18}/></Link>
                   </div>
                   <div className="mt-12 text-white/30 text-xs font-bold uppercase tracking-widest leading-loose">RSIC PREMIUM HUB v2.0</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-10">
               {enrolledCourses.length > 0 && (
                 <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Learning in Progress</h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                       {enrolledCourses.map(c => (
                         <div key={c.id} className="bg-white p-6 rounded-3xl border-2 border-[#4A0000]/10 hover:border-[#4A0000] transition-all group">
                            <div className="flex items-center justify-between mb-4">
                               <div className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-white" style={{ background: c.color }}>{c.category}</div>
                               <div className="text-green-600 font-bold text-xs flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/> Enrolled</div>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-[#4A0000] transition-all">{c.name}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                               <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#4A0000]"/> {c.duration}</div>
                               <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#4A0000]"/> {(user.completedCourses || []).includes(c.id) ? 'Completed' : 'In Progress'}</div>
                            </div>
                            
                            {(user.completedCourses || []).includes(c.id) ? (
                              <Link 
                                to={`/certificates/claim/${c.id}?score=100`} 
                                className="w-full py-3 bg-[#4A0000] text-white rounded-xl font-bold text-center block hover:scale-105 transition-all shadow-lg shadow-[#4A0000]/10"
                              >
                                Claim Certificate
                              </Link>
                            ) : (
                              <Link 
                                to={`/courses/${c.id}/quiz`} 
                                className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-center block hover:bg-[#4A0000] hover:text-white transition-all"
                              >
                                Take Quiz & Certify
                              </Link>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Explore New Programs</h3>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {allCourses.filter(c => !(user.enrolledCourses || []).includes(c.id)).map(c => (
                       <div key={c.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                          <div className="flex items-center justify-between mb-4">
                             <div className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-white" style={{ background: c.color }}>{c.category}</div>
                             <div className="text-gray-400 font-bold text-xs">Available</div>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 transition-all">{c.name}</h4>
                          <p className="text-gray-500 text-xs mb-6 line-clamp-2">{c.description}</p>
                          <button onClick={() => handleEnroll(c.id)} className="w-full py-3 border-2 border-[#4A0000] text-[#4A0000] rounded-xl font-bold hover:bg-[#4A0000] hover:text-white transition-all">Enroll Free</button>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-8">
               {(user.certificates || []).length === 0 ? (
                 <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-gray-200"><Award size={48}/></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">My Certifications</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">You haven't earned any certificates yet. Complete the quizzes in your enrolled courses to build your portfolio!</p>
                    <button onClick={() => setActiveTab('courses')} className="px-8 py-4 bg-[#4A0000] text-white rounded-2xl font-bold shadow-xl shadow-[#4A0000]/20 hover:scale-105 active:scale-[0.98] transition-all">Start Learning Now</button>
                 </div>
               ) : (
                 <div className="grid md:grid-cols-2 gap-6">
                    {user.certificates.map((certSlug: string, i: number) => (
                      <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center gap-6 group hover:shadow-2xl hover:shadow-[#4A0000]/5 transition-all">
                         <div className="w-16 h-16 bg-[#4A0000]/5 rounded-2xl flex items-center justify-center text-[#4A0000] group-hover:scale-110 transition-all"><Award size={32}/></div>
                         <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">Official Completion Certificate</h4>
                            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Ref: {certSlug}</p>
                            <Link to={`/certificates/v/${certSlug}`} className="inline-flex items-center gap-2 text-[#4A0000] font-bold text-sm mt-4 hover:underline">View Certificate <ArrowRight size={14}/></Link>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-3xl">
               <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A0000]/5 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%]" />
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Account Settings</h3>
                    <button onClick={() => setEditMode(!editMode)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${editMode ? 'bg-gray-100 text-gray-700' : 'bg-[#4A0000] text-white'}`}>
                      {editMode ? 'Cancel' : <><Edit3 size={16}/> Edit Profile</>}
                    </button>
                  </div>

                  <div className="space-y-6">
                    {editMode ? (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Display Name</label>
                            <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4A0000] transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Institution</label>
                            <input type="text" value={editForm.school} onChange={e => setEditForm(f => ({ ...f, school: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4A0000] transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">WhatsApp Contact</label>
                          <input type="text" value={editForm.whatsapp} onChange={e => setEditForm(f => ({ ...f, whatsapp: e.target.value }))} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4A0000] transition-all" />
                        </div>
                        <button onClick={handleSaveProfile} className="px-8 py-4 bg-[#4A0000] text-white rounded-2xl font-bold">Update Profile</button>
                      </>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                         {[
                           { label: 'Full Name', value: user.name, icon: <User size={16}/> },
                           { label: 'Email Address', value: user.email, icon: <Mail size={16}/> },
                           { label: 'Institution', value: user.school, icon: <Globe size={16}/> },
                           { label: 'Location', value: user.country, icon: <Globe size={16}/> },
                           { label: 'Contact', value: user.whatsapp || 'Not provided', icon: <Activity size={16}/> },
                           { label: 'Member Since', value: new Date(user.joinDate).toLocaleDateString('en-US', { dateStyle: 'long' }), icon: <Clock size={16}/> },
                         ].map((item,i) => (
                           <div key={i} className="flex flex-col gap-1.5 pb-4 border-b border-gray-50">
                             <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">{item.icon} {item.label}</div>
                             <div className="text-gray-900 font-bold">{item.value}</div>
                           </div>
                         ))}
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left Side: FAQs & Direct Contact */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                {/* FAQ Section */}
                <div className="bg-white rounded-[2rem] border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {[
                      { q: 'How do I download my certificate?', a: 'Once you complete all lessons in a course and pass the final quiz with at least 80%, a "Claim Certificate" button will appear in your course view. You can then download it as a high-quality PDF or share the verification link.' },
                      { q: 'Is membership really free?', a: 'Yes! RSIC membership is 100% free for students worldwide. Our mission is to democratize innovation and STEM learning.' },
                      { q: 'How can I participate in club projects?', a: 'Keep an eye on the "Projects" page and your dashboard notifications. We periodically open applications for student contributors to work on products like Admission Bondu and Elevate CV.' },
                      { q: 'Can I change my institution after joining?', a: 'Absolutely. You can update your school, WhatsApp number, and other details anytime in the "Profile" tab of your dashboard.' },
                      { q: 'What if I forget my password?', a: 'Since we currently use a simplified session system, please contact our support team via WhatsApp or Email if you encounter login issues, and we will help you reset it.' },
                    ].map((faq, i) => (
                      <div key={i} className="border border-gray-50 rounded-2xl overflow-hidden">
                        <button 
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-5 text-left bg-gray-50/30 hover:bg-gray-50 transition-all"
                        >
                          <span className="font-bold text-gray-900 text-sm">{faq.q}</span>
                          <ChevronRight size={18} className={`text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 text-gray-500 text-sm leading-relaxed bg-white">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Support Hub */}
                <div className="bg-[#4A0000] rounded-[2rem] p-8 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] translate-x-1/2 translate-y-[-50%]" />
                   <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Direct Student Support</h3>
                   <div className="grid sm:grid-cols-2 gap-4">
                      <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#4A0000]"><Mail size={18}/></div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-white/50">Official Email</div>
                          <div className="text-sm font-bold truncate">{BRAND.email}</div>
                        </div>
                      </a>
                      <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all">
                         <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white"><Phone size={18}/></div>
                         <div>
                           <div className="text-xs font-bold uppercase tracking-wider text-white/50">WhatsApp Group</div>
                           <div className="text-sm font-bold">Join Community</div>
                         </div>
                      </a>
                   </div>
                </div>
              </div>

              {/* Right Side: Help Ticket Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[2rem] border border-gray-100 p-8 sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#4A0000]/5 flex items-center justify-center text-[#4A0000]"><Send size={18}/></div>
                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Submit a Ticket</h3>
                  </div>
                  
                  {ticketSent ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                       <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4"><CheckCircle size={32}/></div>
                       <h4 className="text-lg font-bold text-gray-900 mb-2">Ticket Submitted!</h4>
                       <p className="text-gray-500 text-sm">We've received your request and will get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Subject</label>
                        <input 
                          type="text" 
                          required 
                          value={ticketForm.subject} 
                          onChange={e => setTicketForm(f => ({ ...f, subject: e.target.value }))}
                          placeholder="e.g. Certificate issue" 
                          className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4A0000] transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">How can we help? *</label>
                        <textarea 
                          required 
                          rows={6}
                          value={ticketForm.message} 
                          onChange={e => setTicketForm(f => ({ ...f, message: e.target.value }))}
                          placeholder="Describe your issue or question in detail..." 
                          className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4A0000] transition-all resize-none" 
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={ticketLoading}
                        className="w-full py-4 bg-[#4A0000] text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#4A0000]/20 flex items-center justify-center gap-2"
                      >
                        {ticketLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Request <ArrowRight size={18}/></>}
                      </button>
                    </form>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><HelpCircle size={20}/></div>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">Standard response time is within 1 business day.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}