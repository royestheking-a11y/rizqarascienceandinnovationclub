import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, EyeOff, CheckCircle, Copy, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ADMIN_CREDENTIALS, BRAND, getAdminSession } from '../../data/mockData';
import logoImage from 'figma:asset/bac42d13b84e12cddb6edae6b1d9c6dbc65eac8f.png';

export function AdminSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const session = getAdminSession();

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ value, id }: { value: string; id: string }) => (
    <button onClick={() => copyToClipboard(value, id)} className="p-1.5 rounded-lg transition-all" style={{ color: copied === id ? '#2d6a4f' : '#9ca3af' }}>
      {copied === id ? <CheckCircle size={14} /> : <Copy size={14} />}
    </button>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Settings</h1>
        <p className="text-gray-500 text-sm">Admin credentials, site info, and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Credentials */}
        <motion.div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e5e7eb' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #800020, #5a0015)' }}>
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Admin Credentials</h3>
              <p className="text-gray-400 text-xs">Current admin login information</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl" style={{ background: '#f8f9fc', border: '1px solid #e5e7eb' }}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Email</div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">{ADMIN_CREDENTIALS.email}</span>
                <CopyBtn value={ADMIN_CREDENTIALS.email} id="email" />
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#f8f9fc', border: '1px solid #e5e7eb' }}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Password</div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm font-mono">
                  {showPassword ? ADMIN_CREDENTIALS.password : '•'.repeat(ADMIN_CREDENTIALS.password.length)}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <CopyBtn value={ADMIN_CREDENTIALS.password} id="password" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#f8f9fc', border: '1px solid #e5e7eb' }}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Login URL</div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">/admin/login</span>
                <div className="flex items-center gap-1">
                  <a href="/admin/login" target="_blank" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 transition-all">
                    <ExternalLink size={14} />
                  </a>
                  <CopyBtn value={window.location.origin + '/admin/login'} id="url" />
                </div>
              </div>
            </div>

            {session && (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(45,106,79,0.06)', border: '1px solid rgba(45,106,79,0.15)' }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#2d6a4f' }}>Current Session</div>
                <div className="text-sm text-gray-700">
                  Logged in as <span className="font-semibold">{session.name}</span><br />
                  Since: <span className="font-semibold">{new Date(session.loginTime).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(128,0,32,0.04)', border: '1px solid rgba(128,0,32,0.1)' }}>
            <p className="text-xs text-gray-500 leading-relaxed">
              <span style={{ color: '#800020', fontWeight: 600 }}>Security Note:</span> These credentials are stored in the application for demo purposes. In a production environment, credentials should be managed securely through a proper authentication system.
            </p>
          </div>
        </motion.div>

        {/* Brand Info */}
        <motion.div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e5e7eb' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-gray-200" style={{ background: '#fff', padding: '2px' }}>
              <img src={logoImage} alt="RSIC" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Site Information</h3>
              <p className="text-gray-400 text-xs">RSIC brand details and contact info</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: 'Organization', value: BRAND.name, icon: Globe },
              { label: 'Email', value: BRAND.email, icon: Mail },
              { label: 'Phone', value: BRAND.phone, icon: Phone },
              { label: 'Location', value: BRAND.location, icon: MapPin },
              { label: 'Founded', value: BRAND.founded, icon: CheckCircle },
            ].map(field => (
              <div key={field.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f8f9fc' }}>
                <field.icon size={16} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs text-gray-400">{field.label}</div>
                  <div className="text-sm font-semibold text-gray-800">{field.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e5e7eb' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-bold text-gray-900 text-lg mb-5">Social Media Links</h3>
          <div className="flex flex-col gap-3">
            {Object.entries(BRAND.social).map(([platform, url]) => (
              <div key={platform} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f8f9fc' }}>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 w-20 capitalize">{platform}</div>
                <div className="flex-1 text-sm text-gray-700 truncate">{url}</div>
                <a href={url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 transition-all flex-shrink-0">
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Storage Info */}
        <motion.div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e5e7eb' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-bold text-gray-900 text-lg mb-5">Data Storage</h3>
          <div className="flex flex-col gap-3">
            {[
              { key: 'rsic_members', label: 'Members Database' },
              { key: 'rsic_current_user', label: 'Active Session' },
              { key: 'rsic_event_registrations', label: 'Event Registrations' },
              { key: 'rsic_donations', label: 'Donation Records' },
              { key: 'rsic_contact_messages', label: 'Contact Messages' },
              { key: 'rsic_admin_session', label: 'Admin Session' },
            ].map(item => {
              const data = localStorage.getItem(item.key);
              const count = data ? (Array.isArray(JSON.parse(data)) ? JSON.parse(data).length : 1) : 0;
              return (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#f8f9fc' }}>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                    <div className="text-xs text-gray-400 font-mono">{item.key}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: data ? '#2d6a4f' : '#9ca3af' }}>{data ? (Array.isArray(JSON.parse(data)) ? `${count} records` : 'Active') : 'Empty'}</div>
                    <div className="text-xs text-gray-400">localStorage</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}