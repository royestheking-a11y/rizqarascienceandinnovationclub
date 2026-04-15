import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Trash2, Globe, Mail, BookOpen, Calendar, Filter, X } from 'lucide-react';
import { type Member } from '../../data/mockData';
import { fetchMembers, deleteDoc } from '../../data/api';

export function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchMembers();
      setMembers(data);
    } catch(err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { reload() }, []);

  const countries = ['All', ...Array.from(new Set(members.map(m => m.country)))];

  const filtered = members.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || m.country === filter;
    return matchSearch && matchFilter;
  });

  const handleDelete = async (id: string) => {
    await deleteDoc('members', id);
    setDeleteConfirm(null);
    setSelectedMember(null);
    reload();
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Members</h1>
          <p className="text-gray-500 text-sm">{members.length} registered members total</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search members..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0000] bg-white w-56"
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white text-gray-700"
            >
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Members', value: members.length, color: '#4A0000' },
          { label: 'Countries', value: new Set(members.map(m => m.country)).size, color: '#1a4a7a' },
          { label: 'Total Enrollments', value: members.reduce((s, m) => s + m.enrolledCourses.length, 0), color: '#2d6a4f' },
          { label: 'New This Month', value: members.filter(m => new Date(m.joinDate) > new Date(Date.now() - 30 * 86400000)).length, color: '#6b2d5e' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#f8f9fc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Member</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Country</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden lg:table-cell">School</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Enrolled</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Joined</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="text-center py-16 text-gray-400">Loading members...</td></tr> : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <Users size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="font-medium">{search ? 'No members match your search' : 'No members registered yet'}</p>
                  </td>
                </tr>
              ) : (
                filtered.map((member: any, i) => (
                  <motion.tr
                    key={member._id || member.customId || member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: '#4A0000' }}>
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                          <div className="text-gray-400 text-xs flex items-center gap-1">
                            <Mail size={10} /> {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Globe size={13} className="text-gray-400" /> {member.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-600 max-w-32 truncate">{member.school}</div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-sm">
                        <BookOpen size={13} className="text-gray-400" />
                        <span className="font-semibold" style={{ color: '#4A0000' }}>{member.enrolledCourses.length}</span>
                        <span className="text-gray-400">courses</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={11} />
                        {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'rgba(128,0,32,0.08)', color: '#800020' }}
                        >
                          View
                        </button>
                        {deleteConfirm === (member._id || member.customId || member.id) ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(member._id || member.customId || member.id)}
                              className="px-2 py-1 rounded-lg text-xs font-bold bg-red-500 text-white"
                            >Sure?</button>
                            <button onClick={() => setDeleteConfirm(null)} className="p-1 text-gray-400"><X size={14} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(member._id || member.customId || member.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <motion.div
            className="w-full max-w-lg rounded-3xl p-8 relative"
            style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:bg-gray-100">
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white" style={{ background: '#4A0000' }}>
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-gray-900 text-xl font-bold">{selectedMember.name}</h3>
                <p className="text-gray-500 text-sm">{selectedMember.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Country', value: selectedMember.country },
                { label: 'School', value: selectedMember.school },
                { label: 'WhatsApp', value: selectedMember.whatsapp || 'N/A' },
                { label: 'Joined', value: new Date(selectedMember.joinDate).toLocaleDateString() },
                { label: 'Enrolled Courses', value: selectedMember.enrolledCourses.length.toString() },
                { label: 'Role', value: selectedMember.role },
              ].map(field => (
                <div key={field.label} className="p-3 rounded-xl" style={{ background: '#f8f9fc' }}>
                  <div className="text-xs text-gray-400 mb-1">{field.label}</div>
                  <div className="text-sm font-semibold text-gray-800">{field.value}</div>
                </div>
              ))}
            </div>
            {selectedMember.interests.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-700 mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.interests.map(i => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(74,0,0,0.08)', color: '#4A0000' }}>{i}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</div>
            <div className="flex flex-col gap-2">
              {[...selectedMember.activityLog].reverse().slice(0, 4).map(entry => (
                <div key={entry.id} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: '#f8f9fc' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4A0000' }} />
                  <div className="text-xs text-gray-600">{entry.description}</div>
                  <div className="text-xs text-gray-400 ml-auto">{new Date(entry.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}