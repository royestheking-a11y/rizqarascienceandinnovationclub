import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Mail, Trash2, CheckCircle, Search, X, Clock } from 'lucide-react';
import { fetchSubmissions, updateDoc, deleteDoc } from '../../data/api';
import { toast } from 'sonner';
export interface ContactMessage {
  id: string | number;
  _id?: string;
  customId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read?: boolean;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const reload = async () => {
    try {
      const data = await fetchSubmissions();
      const flattened = data.map((d: any) => ({
        ...d,
        ...(d.data || {}),
        _id: d._id,
        type: d.type
      }));
      // Only keep form messages
      const msgs = flattened.filter((m: any) => m.type === 'contact' || (!m.option && m.message));
      setMessages(msgs);
    } catch(e) { console.error(e); }
  };
  useEffect(() => { reload(); }, []);

  const handleRead = async (id: string) => {
    try {
      await updateDoc('submissions', id, { ...messages.find(m => (m as any)._id === id || m.id === id) as any, read: true });
      if (selected && ((selected as any)._id || selected.id) === id) setSelected(m => m ? { ...m, read: true } : null);
      toast.success('Message marked as read');
      reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc('submissions', id);
      toast.success('Message deleted');
      setDeleteConfirm(null);
      if (selected && ((selected as any)._id || selected.id) === id) setSelected(null);
      reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete message');
    }
  };

  const filtered = messages.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'unread' && !m.read) || (filter === 'read' && m.read);
    return matchSearch && matchFilter;
  });

  const unread = messages.filter(m => !m.read).length;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Contact Messages</h1>
          <p className="text-gray-500 text-sm">{messages.length} total messages — <span style={{ color: '#4A0000', fontWeight: 600 }}>{unread} unread</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white w-48" />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            {(['all', 'unread', 'read'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="px-3 py-2 text-xs font-semibold capitalize transition-all" style={{ background: filter === f ? '#4A0000' : '#fff', color: filter === f ? '#fff' : '#6b7280' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className={`${selected ? 'hidden lg:block lg:col-span-2' : 'lg:col-span-5'}`}>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">No messages found</p>
                <p className="text-gray-400 text-sm mt-1">Messages from the contact form will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {[...filtered].reverse().map((msg, i) => (
                  <motion.div
                    key={(msg as any)._id || msg.customId || msg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-start gap-4 p-5 cursor-pointer transition-all hover:bg-gray-50 ${((selected as any)?._id || selected?.id) === ((msg as any)._id || msg.id) ? 'bg-gray-50' : ''}`}
                    onClick={() => { setSelected(msg); if (!msg.read) handleRead((msg as any)._id || msg.customId || msg.id as string); }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: !msg.read ? '#4A0000' : '#e5e7eb', color: !msg.read ? '#fff' : '#9ca3af' }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className={`text-sm truncate ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.name}</div>
                        <div className="text-xs text-gray-400 flex-shrink-0">{new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>
                      <div className={`text-sm truncate mb-1 ${!msg.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{msg.subject}</div>
                      <div className="text-xs text-gray-400 truncate">{msg.message}</div>
                    </div>
                    {!msg.read && <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: '#4A0000' }} />}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        {selected && (
          <motion.div
            className="lg:col-span-3 rounded-2xl p-6"
            style={{ background: '#fff', border: '1px solid #e5e7eb' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white" style={{ background: '#800020' }}>
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{selected.name}</div>
                  <div className="text-gray-500 text-sm flex items-center gap-1"><Mail size={12} /> {selected.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!selected.read && (
                  <button onClick={() => handleRead((selected as any)._id || selected.customId || selected.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(45,106,79,0.1)', color: '#2d6a4f' }}>
                    <CheckCircle size={13} /> Mark Read
                  </button>
                )}
                {deleteConfirm === ((selected as any)._id || selected.customId || selected.id) ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete((selected as any)._id || selected.customId || selected.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500 text-white">Delete</button>
                    <button onClick={() => setDeleteConfirm(null)} className="p-1 text-gray-400"><X size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm((selected as any)._id || selected.customId || selected.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 size={16} />
                  </button>
                )}
                <button onClick={() => setSelected(null)} className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="mb-5 pb-5 border-b border-gray-100">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Subject</div>
              <div className="text-gray-900 font-bold text-lg">{selected.subject}</div>
            </div>

            <div className="mb-5">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Message</div>
              <div className="text-gray-700 leading-relaxed p-4 rounded-xl" style={{ background: '#f8f9fc' }}>{selected.message}</div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1"><Clock size={12} /> Received {new Date(selected.date).toLocaleString()}</div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${selected.read ? 'bg-green-500' : 'bg-orange-500'}`} />
                {selected.read ? 'Read' : 'Unread'}
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: '#800020' }}>
                <Mail size={15} /> Reply via Email
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}