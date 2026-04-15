import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, BookOpen, FolderOpen, Trophy,
  CalendarDays, FileText, Image, MessageSquare, Heart,
  Settings, LogOut, Menu, X, ChevronRight, Bell, Shield,
} from 'lucide-react';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';
import { getAdminSession, logoutAdmin, getContactMessages, getDonations, getMembers } from '../data/mockData';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { icon: Users, label: 'Members', path: '/admin/members' },
      { icon: BookOpen, label: 'Programs & Courses', path: '/admin/programs' },
      { icon: FolderOpen, label: 'Projects', path: '/admin/projects' },
      { icon: Trophy, label: 'Achievements', path: '/admin/achievements' },
      { icon: CalendarDays, label: 'Events', path: '/admin/events' },
      { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
      { icon: Image, label: 'Gallery', path: '/admin/gallery' },
    ],
  },
  {
    label: 'Communications',
    items: [
      { icon: MessageSquare, label: 'Contact Messages', path: '/admin/messages' },
      { icon: Heart, label: 'Donations', path: '/admin/donations' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
  },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(getAdminSession());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const s = getAdminSession();
    if (!s) { navigate('/admin/login'); return; }
    setSession(s);
    const msgs = getContactMessages().filter(m => !m.read).length;
    setUnreadCount(msgs);
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  if (!session) return null;

  const Sidebar = () => (
    <div className="flex flex-col h-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-white/25" style={{ background: '#fff', padding: '2px' }}>
          <img src={logoImage} alt="RSIC" className="w-full h-full object-contain rounded-full" />
        </div>
        <div>
          <div className="text-white font-black text-sm tracking-wide">RIZQARA</div>
          <div className="text-white/50 text-xs tracking-widest">ADMIN PANEL</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
          <Shield size={10} style={{ color: '#ffd700' }} />
          <span style={{ color: '#ffd700', fontSize: '0.6rem', fontWeight: 700 }}>ADMIN</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            <div className="px-3 mb-2 text-xs font-bold uppercase tracking-widest text-white/30">{group.label}</div>
            {group.items.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group relative"
                  style={{
                    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: '#fff' }} />
                  )}
                  <item.icon size={17} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.label === 'Contact Messages' && unreadCount > 0 && (
                    <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#4A0000', color: '#fff' }}>
                      {unreadCount}
                    </span>
                  )}
                  {!active && <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: '#4A0000', color: '#fff' }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold truncate">Super Admin</div>
            <div className="text-white/40 text-xs truncate">{session.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
            title="Sign Out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f8f9fc', fontFamily: 'Inter, sans-serif' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #4A0000 0%, #3A0000 100%)' }}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-72 lg:hidden overflow-hidden flex flex-col"
              style={{ background: 'linear-gradient(180deg, #4A0000 0%, #3A0000 100%)' }}
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{ background: '#fff', borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">RSIC Admin Panel</div>
              <div className="text-gray-800 font-bold capitalize text-sm">
                {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/admin/')[1]?.replace(/-/g, ' ')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all">
                <Bell size={18} />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{ background: '#4A0000', fontSize: '0.6rem' }}>
                  {unreadCount}
                </span>
              )}
            </div>
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(74,0,0,0.08)', color: '#4A0000' }}
            >
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }}
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}