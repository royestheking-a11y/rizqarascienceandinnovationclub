import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function RootLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {!isDashboard && <Navbar />}
      <main className={`flex-1 ${!isDashboard ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}
