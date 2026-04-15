import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Users, BookOpen, CalendarDays, Heart, MessageSquare,
  FileText, FolderOpen, Trophy, TrendingUp, ArrowRight,
  Activity, Clock, Mail, Globe
} from 'lucide-react';
import {
  fetchMembers, fetchEvents, fetchBlog, fetchAchievements, fetchPrograms, fetchProjects, fetchSubmissions
} from '../../data/api';

export function AdminDashboard() {
  const [members, setMembers] = useState<any[]>([]);
  const [eventRegs, setEventRegs] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetchMembers(), fetchEvents(), fetchBlog(),
      fetchAchievements(), fetchPrograms(), fetchProjects(), fetchSubmissions()
    ]).then(([mems, evts, blgs, achs, progs, projs, subs]) => {
      setMembers(mems); setEvents(evts); setBlogs(blgs); 
      setAchievements(achs); setPrograms(progs); setProjects(projs);
      
      const regs = subs.filter((s:any) => s.eventId);
      const dons = subs.filter((s:any) => s.type === 'donation' || s.option);
      const msgs = subs.filter((s:any) => s.type === 'contact' || (!s.option && s.message));
      setEventRegs(regs); setDonations(dons); setMessages(msgs);
    }).catch(console.error);
  }, []);

  const totalEnrollments = members.reduce((sum, m) => sum + (m.enrolledCourses?.length || 0), 0);
  const totalDonationAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const unreadMessages = messages.filter(m => !m.read).length;
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').length;
  const allCourses = programs.flatMap(p => p.courses || []);

  const STAT_CARDS = [
    { label: 'Total Members', value: members.length, icon: Users, color: '#4A0000', bg: 'rgba(74,0,0,0.08)', sub: `${members.filter(m => new Date(m.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} new this month`, link: '/admin/members' },
    { label: 'Course Enrollments', value: totalEnrollments, icon: BookOpen, color: '#1a4a7a', bg: 'rgba(26,74,122,0.08)', sub: `Across ${allCourses.length} courses`, link: '/admin/programs' },
    { label: 'Event Registrations', value: eventRegs.length, icon: CalendarDays, color: '#2d6a4f', bg: 'rgba(45,106,79,0.08)', sub: `${upcomingEvents} upcoming events`, link: '/admin/events' },
    { label: 'Total Donations', value: `৳${totalDonationAmount.toLocaleString()}`, icon: Heart, color: '#b45309', bg: 'rgba(180,83,9,0.08)', sub: `${donations.length} contributions`, link: '/admin/donations' },
    { label: 'Contact Messages', value: messages.length, icon: MessageSquare, color: unreadMessages > 0 ? '#4A0000' : '#6b7280', bg: unreadMessages > 0 ? 'rgba(74,0,0,0.08)' : 'rgba(107,114,128,0.08)', sub: `${unreadMessages} unread messages`, link: '/admin/messages' },
    { label: 'Blog Posts', value: blogs.length, icon: FileText, color: '#6b2d5e', bg: 'rgba(107,45,94,0.08)', sub: '1 featured post', link: '/admin/blog' },
    { label: 'Active Projects', value: projects.length, icon: FolderOpen, color: '#0f766e', bg: 'rgba(15,118,110,0.08)', sub: `${projects.filter(p => p.status === 'Live').length} live products`, link: '/admin/projects' },
    { label: 'Achievements', value: achievements.length, icon: Trophy, color: '#d97706', bg: 'rgba(217,119,6,0.08)', sub: '1 national award', link: '/admin/achievements' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Welcome Banner */}
      <motion.div
        className="rounded-3xl p-8 mb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #4A0000 0%, #3A0000 100%)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: `${100 + i * 50}px`, height: `${100 + i * 50}px`, right: `-${50 + i * 25}px`, top: '50%', transform: 'translateY(-50%)' }} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-white/60" />
            <span className="text-white/60 text-sm font-medium">Live Overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-white mb-2" style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
            Welcome to RSIC Admin Panel
          </h1>
          <p className="text-white/70 max-w-xl">
            You have full control over all website content, member data, and communications. All changes reflect on the live website instantly.
          </p>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to={card.link}
              className="block p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg group"
              style={{ background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors mt-1" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{card.value}</div>
              <div className="text-gray-600 text-sm font-semibold mb-1">{card.label}</div>
              <div className="text-gray-400 text-xs">{card.sub}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Row: Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members */}
        <motion.div
          className="p-6 rounded-2xl"
          style={{ background: '#fff', border: '1px solid #e5e7eb' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Members</h3>
            <Link to="/admin/members" className="text-xs font-semibold hover:underline" style={{ color: '#4A0000' }}>View All →</Link>
          </div>
          {members.length === 0 ? (
            <div className="text-center py-8">
              <Users size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-400 text-sm">No members yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...members].reverse().slice(0, 5).map((member,i) => (
                <div key={member._id || member.id || i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: '#4A0000' }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-semibold text-sm truncate">{member.name}</div>
                    <div className="text-gray-400 text-xs truncate flex items-center gap-1">
                      <Globe size={10} />
                      {member.country}
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs flex-shrink-0">
                    <Clock size={11} className="inline mr-1" />
                    {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          className="p-6 rounded-2xl"
          style={{ background: '#fff', border: '1px solid #e5e7eb' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Messages</h3>
            <Link to="/admin/messages" className="text-xs font-semibold hover:underline" style={{ color: '#4A0000' }}>View All →</Link>
          </div>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-400 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...messages].reverse().slice(0, 5).map((msg,i) => (
                <div key={msg._id || msg.id || i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: !msg.read ? 'rgba(74,0,0,0.04)' : '#f9fafb' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: !msg.read ? '#4A0000' : '#e5e7eb' }}>
                    <Mail size={14} style={{ color: !msg.read ? '#fff' : '#9ca3af' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 text-sm font-semibold truncate">{msg.name}</div>
                    <div className="text-gray-500 text-xs truncate">{msg.subject}</div>
                  </div>
                  {!msg.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#4A0000' }} />}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Donations */}
        <motion.div
          className="p-6 rounded-2xl"
          style={{ background: '#fff', border: '1px solid #e5e7eb' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Donations</h3>
            <Link to="/admin/donations" className="text-xs font-semibold hover:underline" style={{ color: '#4A0000' }}>View All →</Link>
          </div>
          {donations.length === 0 ? (
            <div className="text-center py-8">
              <Heart size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-400 text-sm">No donations yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...donations].reverse().slice(0, 5).map((don,i) => (
                <div key={don._id || don.id || i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,106,79,0.1)' }}>
                    <Heart size={15} style={{ color: '#2d6a4f' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-semibold text-sm truncate">{don.name}</div>
                    <div className="text-gray-400 text-xs">{don.paymentMethod}</div>
                  </div>
                  <div className="font-black text-sm" style={{ color: '#2d6a4f' }}>
                    {don.currency}{don.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <motion.div
        className="mt-6 p-6 rounded-2xl"
        style={{ background: '#fff', border: '1px solid #e5e7eb' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="font-bold text-gray-900 text-lg mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Site Content Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Programs', value: programs.length, icon: BookOpen, color: '#4A0000' },
            { label: 'Courses', value: allCourses.length, icon: TrendingUp, color: '#1a4a7a' },
            { label: 'Projects', value: projects.length, icon: FolderOpen, color: '#2d6a4f' },
            { label: 'Events', value: events.length, icon: CalendarDays, color: '#6b2d5e' },
            { label: 'Blog Posts', value: blogs.length, icon: FileText, color: '#7d4e00' },
            { label: 'Achievements', value: achievements.length, icon: Trophy, color: '#d97706' },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 rounded-xl" style={{ background: '#f8f9fc' }}>
              <item.icon size={20} className="mx-auto mb-2" style={{ color: item.color }} />
              <div className="text-2xl font-black text-gray-900">{item.value}</div>
              <div className="text-gray-500 text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}