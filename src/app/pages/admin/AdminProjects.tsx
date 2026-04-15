import {
  AdminModal, AdminConfirm, FormField, FormActions,
} from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, ExternalLink, Trophy } from 'lucide-react';
import { fetchProjects, createDoc, updateDoc, deleteDoc } from '../../data/api';
import type { Project } from '../../data/mockData';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Live: { bg: '#dcfce7', color: '#15803d' },
  Beta: { bg: '#dbeafe', color: '#1d4ed8' },
  Development: { bg: '#fef3c7', color: '#d97706' },
  Pilot: { bg: '#ede9fe', color: '#7c3aed' },
};

const EMPTY: Omit<Project, 'screenshots' | 'features' | 'team' | 'problem' | 'solution' | 'impact' | 'description'> & {
  screenshots: string[]; features: string[]; team: string[]; problem: string; solution: string; impact: string; description: string;
} = {
  id: '', name: '', tagline: '', shortDesc: '', description: '', problem: '', solution: '',
  features: [], impact: '', category: '', tags: [], status: 'Development',
  year: new Date().getFullYear(), award: '', image: '', screenshots: [], team: [], link: '', color: '#800020',
};

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
       const data = await fetchProjects();
       setProjects(data);
    } catch(err) {
       console.error("Fetch DB error:", err);
    } finally { setLoading(false); }
  };
  
  useEffect(() => { refresh() }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      id: p.id, name: p.name, tagline: p.tagline, shortDesc: p.shortDesc,
      description: p.description ?? '', problem: p.problem ?? '', solution: p.solution ?? '',
      features: p.features ?? [], impact: p.impact ?? '', category: p.category,
      tags: p.tags, status: p.status, year: p.year, award: p.award ?? '',
      image: p.image, screenshots: p.screenshots ?? [], team: p.team ?? [], link: p.link, color: p.color,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      ...form,
      customId: editing ? editing.customId || editing.id : `project_${Date.now()}`,
      tags: typeof form.tags === 'string' ? (form.tags as unknown as string).split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      features: typeof form.features === 'string' ? (form.features as unknown as string).split('\n').map(t => t.trim()).filter(Boolean) : form.features,
    };
    try {
      if (editing) { 
        await updateDoc('projects', (editing._id || editing.customId || editing.id) as string, data); 
        toast.success('Project updated');
      } else { 
        await createDoc('projects', data); 
        toast.success('Project created');
      }
      refresh();
      setModalOpen(false);
    } catch(err) {
      console.error(err);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async () => {
    if (deleteId) { 
       try {
         await deleteDoc('projects', deleteId); 
         toast.success('Project deleted');
         refresh(); 
         setDeleteId(null); 
       } catch (err) {
         console.error(err);
         toast.error('Failed to delete project');
       }
    }
  };

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} projects — {projects.filter(p => p.status === 'Live').length} live</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105"
          style={{ background: '#800020' }}
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(STATUS_COLORS).map(([status, style]) => (
          <div key={status} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: style.color }}>{projects.filter(p => p.status === status).length}</div>
            <div className="text-sm" style={{ color: style.color }}>{status}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#f8f9fc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Project</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Year</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Award</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Link</th>
                <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr> : 
               projects.map((project: any, i) => (
                <motion.tr key={project._id || project.customId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{project.name}</div>
                        <div className="text-gray-400 text-xs line-clamp-1 max-w-48">{project.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell"><span className="text-sm text-gray-600">{project.category}</span></td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: STATUS_COLORS[project.status]?.bg, color: STATUS_COLORS[project.status]?.color }}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell"><span className="text-sm text-gray-600">{project.year}</span></td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {project.award ? (
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#d97706' }}><Trophy size={12} /> Winner</div>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    {project.link && project.link !== '#' ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all inline-flex">
                        <ExternalLink size={15} />
                      </a>
                    ) : <span className="text-gray-300 text-xs px-2">N/A</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(project)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteId(project._id || project.customId || project.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AdminModal open={modalOpen} title={editing ? 'Edit Project' : 'Add New Project'} onClose={() => setModalOpen(false)} width="max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Project Name" required>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Admission Bondu" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
            <FormField label="Tagline" required>
              <input required value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Short tagline" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
          </div>
          <FormField label="Short Description" required>
            <textarea required value={form.shortDesc} onChange={e => set('shortDesc', e.target.value)} rows={2} placeholder="Brief description shown in cards" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all resize-none" />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Category" required>
              <input required value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Education Technology" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
            <FormField label="Status" required>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all">
                {['Live', 'Beta', 'Development', 'Pilot'].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Year">
              <input type="number" value={form.year} onChange={e => set('year', +e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUpload 
              label="Project Cover Image" 
              value={form.image} 
              onChange={url => set('image', url)} 
            />
            <FormField label="Project Link">
              <input value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Tags (comma-separated)">
              <input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, Education, Web App" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
            <FormField label="Award (optional)">
              <input value={form.award} onChange={e => set('award', e.target.value)} placeholder="1st Prize — ..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Accent Color">
              <div className="flex items-center gap-3">
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="h-10 w-14 rounded-lg border border-gray-200 cursor-pointer" />
                <input value={form.color} onChange={e => set('color', e.target.value)} placeholder="#800020" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all" />
              </div>
            </FormField>
          </div>
          <FormActions onCancel={() => setModalOpen(false)} submitLabel={editing ? 'Save Changes' : 'Add Project'} />
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <AdminConfirm
        open={!!deleteId}
        message="This project will be permanently removed. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}