import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, Home, Search } from 'lucide-react';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #3A0000 0%, #2D0000 100%)', fontFamily: 'Inter, sans-serif' }}>
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-10"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-2 border-white/15" style={{ background: '#fff', padding: '4px' }}>
            <img src={logoImage} alt="RSIC" className="w-full h-full object-contain rounded-full opacity-80" />
          </div>
          <div
            className="text-white/10 font-black leading-none select-none mb-6"
            style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontFamily: 'Playfair Display, serif' }}
          >
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-white mb-4" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
            Page Not Found
          </h1>
          <p className="text-white/60 text-xl mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: '#800020', color: '#fff' }}
            >
              <Home size={20} />
              Go Home
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Search size={20} />
              Explore Projects
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {['About', 'Programs', 'Contact', 'Join'].map(link => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-white/50 hover:text-white text-sm font-medium transition-colors"
              >
                {link} →
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}