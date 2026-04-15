import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, TrendingUp, Search, Filter } from 'lucide-react';
import { fetchSubmissions } from '../../data/api';
import { type DonationRecord } from '../../data/mockData';

export function AdminDonations() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchSubmissions()
      .then(data => {
        const flattened = data.map((d: any) => ({
          ...d,
          ...(d.data || {}),
          _id: d._id,
          type: d.type
        }));
        const donationsOnly = flattened.filter((d: any) => d.type === 'donation' || d.option);
        setDonations(donationsOnly);
      })
      .catch(e => console.error(e));
  }, []);

  const options = ['All', 'Fund a Student Project', 'Become a Sponsor', 'Make a Contribution'];
  const filtered = donations.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || d.option === filter;
    return matchSearch && matchFilter;
  });

  const total = donations.reduce((s, d) => s + d.amount, 0);
  const byOption = options.slice(1).map(opt => ({
    label: opt, count: donations.filter(d => d.option === opt).length, amount: donations.filter(d => d.option === opt).reduce((s, d) => s + d.amount, 0)
  }));

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Donations</h1>
        <p className="text-gray-500 text-sm">{donations.length} donations received — total ৳{total.toLocaleString()}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #800020, #5a0015)', color: '#fff' }}>
          <div className="text-3xl font-black mb-1">৳{total.toLocaleString()}</div>
          <div className="text-white/70 text-sm">Total Raised</div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
          <div className="text-3xl font-black text-gray-900 mb-1">{donations.length}</div>
          <div className="text-gray-500 text-sm">Total Donations</div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
          <div className="text-3xl font-black text-gray-900 mb-1">৳{donations.length > 0 ? Math.round(total / donations.length).toLocaleString() : 0}</div>
          <div className="text-gray-500 text-sm">Average Amount</div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
          <div className="text-3xl font-black text-gray-900 mb-1">{new Set(donations.map(d => d.country)).size}</div>
          <div className="text-gray-500 text-sm">Countries</div>
        </div>
      </div>

      {/* By Option */}
      {byOption.some(b => b.count > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {byOption.map((b, i) => (
            <div key={i} className="p-4 rounded-2xl flex items-center gap-4" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(128,0,32,0.08)' }}>
                <Heart size={20} style={{ color: '#800020' }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-0.5 leading-tight">{b.label}</div>
                <div className="text-xs text-gray-400">{b.count} donations · ৳{b.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter + Table */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donations..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-700">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#f8f9fc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Donor</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Payment</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Country</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <Heart size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No donations yet</p>
                    <p className="text-sm mt-1 opacity-70">Donations from the Support page will appear here</p>
                  </td>
                </tr>
              ) : (
                [...filtered].reverse().map((don: any, i) => (
                  <motion.tr key={don._id || don.customId || don.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{don.name}</div>
                      <div className="text-gray-400 text-xs">{don.email}</div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(128,0,32,0.08)', color: '#800020' }}>
                        {don.option === 'Fund a Student Project' ? 'Project Fund' : don.option === 'Become a Sponsor' ? 'Sponsor' : 'Contribution'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black" style={{ color: '#2d6a4f' }}>{don.currency}{don.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-600">{don.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-600">{don.country}</div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-xs text-gray-500">{new Date(don.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
