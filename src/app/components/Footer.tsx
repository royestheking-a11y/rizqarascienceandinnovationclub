import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Github, ArrowRight } from 'lucide-react';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';
import { BRAND } from '../data/mockData';

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Projects', href: '/projects' },
    { label: 'Achievements', href: '/achievements' },
  ],
  'Programs': [
    { label: 'Programming', href: '/programs#programming' },
    { label: 'Robotics & IoT', href: '/programs#robotics-iot' },
    { label: 'Artificial Intelligence', href: '/programs#artificial-intelligence' },
    { label: 'Design & Innovation', href: '/programs#design-innovation' },
    { label: 'Research & STEM', href: '/programs#research-stem' },
  ],
  'Community': [
    { label: 'Join RSIC', href: '/join' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Support Us', href: '/support' },
  ],
};

const SOCIAL_ICONS = [
  { Icon: Facebook, href: BRAND.social.facebook, label: 'Facebook' },
  { Icon: Twitter, href: BRAND.social.twitter, label: 'Twitter' },
  { Icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
  { Icon: Linkedin, href: BRAND.social.linkedin, label: 'LinkedIn' },
  { Icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  { Icon: Github, href: BRAND.social.github, label: 'GitHub' },
];

export function Footer() {
  return (
    <footer style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* CTA Banner — deep maroon */}
      <div style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>
            Ready to Build the Future?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of students worldwide who are learning, building, and innovating with RSIC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: '#fff', color: '#4A0000' }}
            >
              Join RSIC Today <ArrowRight size={20} />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer — white */}
      <div className="py-16 px-4" style={{ background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#4A0000]/20 group-hover:border-[#4A0000]/60 transition-all" style={{ background: '#fff', padding: '3px', boxShadow: '0 2px 12px rgba(74,0,0,0.12)' }}>
                  <img src={logoImage} alt="RSIC Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <div className="font-black tracking-wider" style={{ fontSize: '1.2rem', color: '#4A0000' }}>RIZQARA</div>
                  <div className="tracking-widest" style={{ fontSize: '0.55rem', color: '#4A0000', opacity: 0.6 }}>SCIENCE & INNOVATION CLUB</div>
                </div>
              </Link>
              <p className="leading-relaxed mb-6 max-w-xs text-sm" style={{ color: '#555' }}>
                A global student innovation community focused on real-world projects, digital skills, and research-driven learning. Building future innovators through science and technology.
              </p>

              {/* Contact Info */}
              <div className="flex flex-col gap-3 mb-8">
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 transition-colors text-sm hover:opacity-80" style={{ color: '#555' }}>
                  <Mail size={16} style={{ color: '#4A0000' }} />
                  {BRAND.email}
                </a>
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 transition-colors text-sm hover:opacity-80" style={{ color: '#555' }}>
                  <Phone size={16} style={{ color: '#4A0000' }} />
                  {BRAND.phone}
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: '#555' }}>
                  <MapPin size={16} style={{ color: '#4A0000' }} />
                  {BRAND.location}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: '#f5f5f5', border: '1px solid #e8e8e8', color: '#555' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#4A0000'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#4A0000'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; (e.currentTarget as HTMLElement).style.color = '#555'; (e.currentTarget as HTMLElement).style.borderColor = '#e8e8e8'; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold mb-5 text-sm tracking-wider uppercase" style={{ color: '#4A0000' }}>
                  {title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm flex items-center gap-2 group transition-colors hover:opacity-80"
                        style={{ color: '#666' }}
                      >
                        <span className="w-0 group-hover:w-3 h-px transition-all duration-300" style={{ background: '#4A0000' }} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #eee' }}>
            <p className="text-sm" style={{ color: '#999' }}>
              © {new Date().getFullYear()} Rizqara Science & Innovation Club. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm" style={{ color: '#999' }}>
              <Link to="/privacy" className="transition-colors hover:opacity-70">Privacy Policy</Link>
              <Link to="/terms" className="transition-colors hover:opacity-70">Terms of Use</Link>
              <span style={{ color: '#4A0000', fontWeight: 700 }}>RSIC © {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
