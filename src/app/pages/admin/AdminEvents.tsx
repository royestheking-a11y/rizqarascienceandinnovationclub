import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { getEventRegistrations, type RSICEvent } from '../../data/mockData';
import { fetchEvents, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { toast } from 'sonner';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Upcoming: { bg: '#dcfce7', color: '#15803d' },
  'Almost Full': { bg: '#fef3c7', color: '#d97706' },
  Completed: { bg: '#f3f4f6', color: '#6b7280' },
};

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all";

const EMPTY: RSICEvent = {
  id: '', title: '', type: 'Workshop', date: '', endDate: '', time: '9:00 AM - 5:00 PM',
  location: '', description: '', image: '', capacity: 100, registered: 0,
  speakers: [], tags: [], status: 'Upcoming', price: 'Free', color: '#800020',
};

export function AdminEvents() {
  const [events, setEvents] = useState<RSICEvent[]>([]);
  const registrations = getEventRegistrations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RSICEvent | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<RSICEvent>({ ...EMPTY });

  const refresh = async () => { try { const data = await fetchEvents(); setEvents(data); } catch(e) { console.error(e); } };
  useEffect(() => { refresh(); }, []);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const getRegs = (id: string) => registrations.filter(r => r.eventId === id);

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setModalOpen(true); };
  const openEdit = (e: RSICEvent) => {
    setEditing(e);
    setForm({
      ...e,
      speakers: e.speakers ?? [],
      tags: e.tags ?? [],
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: RSICEvent = {
      ...form,
      speakers: typeof form.speakers === 'string'
        ? (form.speakers as unknown as string).split(',').map(s => s.trim()).filter(Boolean)
        : form.speakers,
      tags: typeof form.tags === 'string'
        ? (form.tags as unknown as string).split(',').map(t => t.trim()).filter(Boolean)
        : form.tags,
    };
    const theId = editing ? (editing._id || editing.customId || editing.id) : '';
    try {
      if (editing) { 
        await updateDoc('events', theId!, data); 
        toast.success('Event updated');
      } else { 
        await createDoc('events', data); 
        toast.success('Event created');
      }
      refresh(); setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save event');
    }
  };

  const handleDelete = async () => {
    if (deleteId) { 
      try {
        await deleteDoc('events', deleteId); 
        toast.success('Event deleted');
        refresh(); setDeleteId(null); 
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Events</h1>
          <p className="text-gray-500 text-sm">{events.length} events — {events.filter(e => e.status === 'Upcoming').length} upcoming</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: '#800020' }}>
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Events', value: events.length, color: '#800020' },
          { label: 'Upcoming', value: events.filter(e => e.status === 'Upcoming').length, color: '#2d6a4f' },
          { label: 'Completed', value: events.filter(e => e.status === 'Completed').length, color: '#6b7280' },
          { label: 'Registrations', value: registrations.length, color: '#1a4a7a' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {events.map((event, i) => {
          const regs = getRegs(event.customId || event._id || event.id);
          const fillPct = Math.round((event.registered / event.capacity) * 100);
          return (
            <motion.div
              key={event._id || event.customId || event.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid #e5e7eb' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: STATUS_STYLES[event.status]?.bg || '#e5e7eb', color: STATUS_STYLES[event.status]?.color || '#374151' }}>
                    {event.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button onClick={() => openEdit(event)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/40 transition-all backdrop-blur-sm">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteId(event._id || event.customId || event.id)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-red-500/80 transition-all backdrop-blur-sm">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold leading-tight" style={{ fontSize: '1rem' }}>{event.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><CalendarDays size={13} className="text-gray-400" />{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div className="flex items-center gap-2"><Clock size={13} className="text-gray-400" />{event.time.split(' - ')[0]}</div>
                  <div className="flex items-center gap-2 col-span-2"><MapPin size={13} className="text-gray-400 flex-shrink-0" /><span className="truncate">{event.location}</span></div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-1.5 text-gray-600"><Users size={13} /> Capacity</div>
                    <div className="font-semibold text-gray-800">{event.registered}/{event.capacity} ({fillPct}%)</div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                    <div className="h-full rounded-full" style={{ width: `${fillPct}%`, background: fillPct >= 90 ? '#800020' : fillPct >= 70 ? '#d97706' : '#2d6a4f' }} />
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">{regs.length}</span> registered via website · Price: <span className="font-semibold" style={{ color: '#800020' }}>{event.price}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} title={editing ? 'Edit Event' : 'Add New Event'} onClose={() => setModalOpen(false)} width="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Event Title" required>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Event title" className={inp} />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Event Type">
              <select value={form.type} onChange={e => set('type', e.target.value)} className={inp}>
                {['Workshop', 'Competition', 'Training', 'Science Fair', 'Seminar', 'Conference'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inp}>
                {['Upcoming', 'Almost Full', 'Completed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Start Date" required>
              <input required type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inp} />
            </FormField>
            <FormField label="End Date">
              <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className={inp} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Time">
              <input value={form.time} onChange={e => set('time', e.target.value)} placeholder="9:00 AM - 5:00 PM" className={inp} />
            </FormField>
            <FormField label="Price">
              <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Free or ৳500" className={inp} />
            </FormField>
          </div>
          <FormField label="Location">
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Venue, City" className={inp} />
          </FormField>
          <FormField label="Description">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inp} resize-none`} placeholder="Event description..." />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Capacity">
              <input type="number" value={form.capacity} onChange={e => set('capacity', +e.target.value)} className={inp} />
            </FormField>
            <FormField label="Registered">
              <input type="number" value={form.registered} onChange={e => set('registered', +e.target.value)} className={inp} />
            </FormField>
          </div>
          <FormField label="Speakers (comma-separated)">
            <input value={Array.isArray(form.speakers) ? form.speakers.join(', ') : form.speakers} onChange={e => set('speakers', e.target.value)} placeholder="Speaker 1, Speaker 2" className={inp} />
          </FormField>
          <FormField label="Tags (comma-separated)">
            <input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={e => set('tags', e.target.value)} placeholder="Workshop, AI, Certificate" className={inp} />
          </FormField>
          <ImageUpload 
            label="Event Cover Image" 
            value={form.image} 
            onChange={url => set('image', url)} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Accent Color">
              <div className="flex items-center gap-3">
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="h-10 w-14 rounded-lg border border-gray-200 cursor-pointer" />
                <input value={form.color} onChange={e => set('color', e.target.value)} className={`flex-1 ${inp}`} />
              </div>
            </FormField>
          </div>
          <FormActions onCancel={() => setModalOpen(false)} submitLabel={editing ? 'Save Changes' : 'Add Event'} />
        </form>
      </AdminModal>

      <AdminConfirm
        open={!!deleteId}
        message="This event will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
