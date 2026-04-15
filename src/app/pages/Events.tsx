import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Users, Tag, X, CheckCircle, ArrowRight } from 'lucide-react';
import { fetchEvents, saveSubmission } from '../data/api';
import { Link } from 'react-router';

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  Upcoming: { bg: '#dcfce7', text: '#15803d' },
  'Almost Full': { bg: '#fef3c7', text: '#d97706' },
  Completed: { bg: '#f3f4f6', text: '#6b7280' },
};

const TYPE_COLORS: Record<string, string> = {
  Workshop: '#4A0000',
  Competition: '#1a4a7a',
  Training: '#2d6a4f',
  'Science Fair': '#6b2d5e',
};

export function Events() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [regForm, setRegForm] = useState({ name: '', email: '' });
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  const filters = ['All', 'Upcoming', 'Completed', 'Workshop', 'Competition', 'Training', 'Science Fair'];
  const filtered = activeFilter === 'All' ? events
    : ['Upcoming', 'Completed', 'Almost Full'].includes(activeFilter)
      ? events.filter(e => e.status === activeFilter)
      : events.filter(e => e.type === activeFilter);

  const handleRegister = async () => {
    if (!regForm.name || !regForm.email) {
      setRegError('Please fill in all fields.');
      return;
    }
    
    try {
      await saveSubmission('application', {
        eventId: selectedEvent!._id || selectedEvent!.customId || selectedEvent!.id,
        date: new Date().toISOString(),
        name: regForm.name,
        email: regForm.email,
        type: 'event_registration'
      });
      setRegSuccess(true);
      setRegError('');
    } catch (err: any) {
      setRegError(err.message || 'Failed to register');
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582774907432-bf1bc986cf47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,0,5,0.6) 0%, rgba(10,0,5,0.95) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#ffaaaa' }}>Community</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              Events & Workshops
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Hackathons, workshops, competitions, and training sessions — where RSIC members come together to learn, compete, and innovate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 px-4 sticky top-20 z-30" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
              style={{ background: activeFilter === f ? '#4A0000' : '#F5F5F5', color: activeFilter === f ? '#fff' : '#374151' }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((event, i) => {
                const statusStyle = STATUS_STYLES[event.status] || { bg: '#f3f4f6', text: '#6b7280' };
                return (
                  <motion.div
                    key={event._id || event.customId || event.id}
                    className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                    style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                    onClick={() => { setSelectedEvent(event); setRegSuccess(false); setRegError(''); setRegForm({ name: '', email: '' }); }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: TYPE_COLORS[event.type] || '#4A0000' }}>
                          {event.type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: statusStyle.bg, color: statusStyle.text }}>
                          {event.status}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white font-medium text-sm flex items-center gap-1.5">
                          <Calendar size={14} />
                          {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-xl mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

                      <div className="flex flex-col gap-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} style={{ color: '#4A0000' }} /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={14} style={{ color: '#4A0000' }} /> {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users size={14} style={{ color: '#4A0000' }} /> {event.registered}/{event.capacity} registered
                        </div>
                      </div>

                      {/* Capacity bar */}
                      <div className="mb-4">
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%`, background: event.registered / event.capacity > 0.8 ? '#d97706' : '#4A0000' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{event.capacity - event.registered} spots remaining</div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="font-bold" style={{ color: '#4A0000', fontSize: '1.1rem' }}>{event.price}</span>
                        {event.status !== 'Completed' && (
                          <span className="text-sm font-semibold" style={{ color: '#4A0000' }}>Register →</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
          >
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{ background: '#fff' }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-white font-bold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <Calendar size={16} />, label: 'Date', value: new Date(selectedEvent.date).toLocaleDateString('en-US', { dateStyle: 'full' }) },
                    { icon: <Clock size={16} />, label: 'Time', value: selectedEvent.time },
                    { icon: <MapPin size={16} />, label: 'Location', value: selectedEvent.location },
                    { icon: <Tag size={16} />, label: 'Price', value: selectedEvent.price },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-xl" style={{ background: '#F5F5F5' }}>
                      <div className="flex items-center gap-2 mb-1" style={{ color: '#4A0000' }}>
                        {item.icon}
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.label}</span>
                      </div>
                      <div className="font-semibold text-gray-900 text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{selectedEvent.description}</p>

                {selectedEvent.status !== 'Completed' ? (
                  regSuccess ? (
                    <div className="p-6 rounded-2xl text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                      <CheckCircle size={40} className="mx-auto mb-3" style={{ color: '#15803d' }} />
                      <h3 className="font-bold text-green-800 text-xl mb-2">Successfully Registered!</h3>
                      <p className="text-green-700">You're confirmed for <strong>{selectedEvent.title}</strong>. We'll send details to your email.</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-4">Register for This Event</h3>
                      {regError && <div className="p-3 rounded-lg mb-4 text-sm" style={{ background: '#fff5f7', color: '#4A0000', border: '1px solid #fecdd3' }}>{regError}</div>}
                      <div className="flex flex-col gap-4 mb-5">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={regForm.name}
                          onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] text-gray-900"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={regForm.email}
                          onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0000] text-gray-900"
                        />
                      </div>
                      <button
                        onClick={handleRegister}
                        className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                        style={{ background: '#4A0000' }}
                      >
                        Confirm Registration <ArrowRight size={18} className="inline ml-2" />
                      </button>
                    </div>
                  )
                ) : (
                  <div className="p-4 rounded-xl text-center text-gray-600" style={{ background: '#F5F5F5' }}>
                    This event has concluded. Check out upcoming events!
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#4A0000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>Never Miss an Event</h2>
          <p className="text-white/80 text-lg mb-8">Join RSIC to get early access and priority registration for all events.</p>
          <Link to="/join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: '#fff', color: '#4A0000' }}>
            Join RSIC <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}