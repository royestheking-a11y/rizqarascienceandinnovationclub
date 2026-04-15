import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Programs', href: '/programs',
    dropdown: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Programming', href: '/programs#programming' },
      { label: 'Robotics & IoT', href: '/programs#robotics-iot' },
      { label: 'Artificial Intelligence', href: '/programs#artificial-intelligence' },
      { label: 'Design & Innovation', href: '/programs#design-innovation' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Events', href: '/events' },
  {
    label: 'More', href: '#',
    dropdown: [
      { label: 'Team', href: '/team' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Support Us', href: '/support' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
  };

  const isSolidBg = scrolled || location.pathname === '/dashboard';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full"
        style={{
          backgroundColor: 'rgba(74, 0, 0, 1)',
          boxShadow: '0 10px 50px rgba(0,0,0,0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group max-w-[75%] overflow-hidden">
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-white/30 group-hover:border-white/70 transition-all" style={{ background: '#fff', padding: '2px' }}>
                <img src={logoImage} alt="RSIC Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="text-white font-black tracking-[0.05em] leading-tight truncate uppercase" style={{ fontSize: '1.25rem', fontFamily: 'Inter, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>RIZQARA</div>
                <div className="text-white/90 tracking-widest text-[0.4rem] sm:text-[0.55rem] font-bold uppercase leading-tight truncate" style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>SCIENCE & INNOVATION CLUB</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </Link>
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 min-w-48 rounded-xl overflow-hidden"
                          style={{ background: 'rgba(20,0,5,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <User size={16} />
                    {user.name.split(' ')[0]}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all text-sm font-medium border border-white/20"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/join"
                    className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: '#fff', color: '#4A0000', fontFamily: 'Inter, sans-serif' }}
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center flex-shrink-0">
              <button
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-all z-[70]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 top-0 left-0 w-full h-full z-[110] lg:hidden overflow-hidden"
            style={{ background: 'rgba(74, 0, 0, 1)' }}
          >
            {/* Dedicated Mobile Menu Header - Left Aligned Branding */}
            <div className="flex items-center justify-between h-20 px-8 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden border border-white/20" style={{ background: '#fff', padding: '1px' }}>
                  <img src={logoImage} alt="RSIC Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-white font-black tracking-tight truncate" style={{ fontSize: '1.15rem', fontFamily: 'Inter, sans-serif' }}>RIZQARA</div>
                  <div className="text-white/40 tracking-widest text-[0.4rem] font-bold uppercase leading-tight mt-0.5 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>SCIENCE & INNOVATION CLUB</div>
                </div>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 text-white/70 hover:text-white transition-all flex-shrink-0"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col h-[calc(100%-80px)] px-10 pb-12 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col pt-8 gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="w-full border-b border-white/5 last:border-0">
                    {link.dropdown ? (
                      <div className="w-full flex flex-col items-start">
                        <button
                          onClick={() => setMobileAccordion(mobileAccordion === link.label ? null : link.label)}
                          className="flex items-center justify-between w-full py-5 text-white/90 text-[1.15rem] font-bold"
                        >
                          {link.label}
                          <ChevronDown size={18} className={`text-white/30 transition-transform duration-300 ${mobileAccordion === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white/5 rounded-2xl mb-4 w-full"
                            >
                              <div className="flex flex-col p-2 items-start">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full px-4 py-3.5 text-white/60 hover:text-white transition-all text-[1rem] font-medium flex items-center gap-3 border-b border-white/5 last:border-0"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block w-full py-5 text-white/90 hover:text-white text-[1.15rem] font-bold"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 mb-8 flex flex-col gap-4">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="w-full text-center py-4 rounded-xl font-bold text-lg border border-white/20 text-white hover:bg-white/10 transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                      My Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-center py-2 rounded-xl font-medium text-base text-white/50 hover:text-white transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="w-full text-center py-4 rounded-xl font-bold text-lg border border-white/20 text-white hover:bg-white/10 transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Login
                    </Link>
                    <Link to="/join" onClick={() => setMobileOpen(false)} className="w-full text-center py-4 rounded-xl font-bold text-lg transition-all shadow-2xl" style={{ background: '#fff', color: '#4A0000', fontFamily: 'Inter, sans-serif' }}>
                      Join Now — It's Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}