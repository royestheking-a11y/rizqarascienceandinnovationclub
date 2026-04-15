import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, BookOpen, Users, Star, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { getMembers, type Program } from '../../data/mockData';
import { fetchPrograms, createDoc, updateDoc, deleteDoc } from '../../data/api';
import { AdminModal, AdminConfirm, FormField, FormActions } from '../../components/AdminCrudModal';
import { ImageUpload } from '../../components/ImageUpload';

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 transition-all";

type Course = Program['courses'][0];

const EMPTY_PROGRAM: Program = {
  id: '', category: '', icon: 'BookOpen', color: '#800020',
  image: '', description: '', courses: [],
};

const EMPTY_COURSE: Course = {
  id: '', name: '', duration: '8 Weeks', level: 'Beginner',
  skills: [], certificate: true, description: '', students: 0, rating: 4.8,
};

export function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const members = getMembers();
  const allCourses = programs.flatMap(p => p.courses);
  const getEnrollmentCount = (courseId: string) => members.filter(m => m.enrolledCourses.includes(courseId)).length;

  // Program modal
  const [programModal, setProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programForm, setProgramForm] = useState<Program>({ ...EMPTY_PROGRAM });
  const [deleteProgId, setDeleteProgId] = useState<string | null>(null);

  // Course modal
  const [courseModal, setCourseModal] = useState(false);
  const [courseParentId, setCourseParentId] = useState<string>('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Course>({ ...EMPTY_COURSE });
  const [deleteCourse, setDeleteCourse] = useState<{ progId: string; courseId: string } | null>(null);

  // Expand state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await fetchPrograms();
      setPrograms(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh() }, []);
  const setP = (k: string, v: unknown) => setProgramForm(f => ({ ...f, [k]: v }));
  const setC = (k: string, v: unknown) => setCourseForm(f => ({ ...f, [k]: v }));

  // Program CRUD
  const openAddProgram = () => { setEditingProgram(null); setProgramForm({ ...EMPTY_PROGRAM }); setProgramModal(true); };
  const openEditProgram = (p: Program) => { setEditingProgram(p); setProgramForm({ ...p }); setProgramModal(true); };

  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = { ...programForm, customId: editingProgram ? editingProgram.customId || editingProgram.id : `prog_${Date.now()}` };
    try {
      if (editingProgram) { 
        await updateDoc('programs', (editingProgram._id || editingProgram.customId || editingProgram.id) as string, data); 
        toast.success('Program updated');
      } else { 
        await createDoc('programs', data); 
        toast.success('Program created');
      }
      refresh(); setProgramModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save program');
    }
  };

  const handleDeleteProgram = async () => {
    if (deleteProgId) { 
      try {
        await deleteDoc('programs', deleteProgId); 
        toast.success('Program deleted');
        refresh(); setDeleteProgId(null); 
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete program');
      }
    }
  };

  // Course CRUD
  const openAddCourse = (progId: string) => {
    setCourseParentId(progId); setEditingCourse(null);
    setCourseForm({ ...EMPTY_COURSE }); setCourseModal(true);
  };

  const openEditCourse = (progId: string, course: Course) => {
    setCourseParentId(progId); setEditingCourse(course);
    setCourseForm({ ...course }); setCourseModal(true);
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prog = programs.find(p => p._id === courseParentId || p.customId === courseParentId);
    if (!prog) return;
    const courseData: any = {
      ...courseForm,
      customId: editingCourse ? editingCourse.customId || editingCourse.id : `course_${Date.now()}`,
      skills: typeof courseForm.skills === 'string'
        ? (courseForm.skills as unknown as string).split(',').map(s => s.trim()).filter(Boolean)
        : courseForm.skills,
    };
    const updatedCourses = editingCourse
      ? prog.courses.map((c: any) => (c._id === editingCourse._id || c.customId === editingCourse.customId) ? courseData : c)
      : [...prog.courses, courseData];
    try {
      await updateDoc('programs', (prog._id || prog.customId || prog.id) as string, { courses: updatedCourses });
      toast.success(editingCourse ? 'Course updated' : 'Course added');
      refresh(); setCourseModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save course');
    }
  };

  const handleDeleteCourse = async () => {
    if (!deleteCourse) return;
    const prog = programs.find(p => p._id === deleteCourse.progId || p.customId === deleteCourse.progId);
    if (!prog) return;
    await updateDoc('programs', (prog._id || prog.customId || prog.id) as string, { courses: prog.courses.filter((c: any) => c._id !== deleteCourse.courseId && c.customId !== deleteCourse.courseId && c.id !== deleteCourse.courseId) });
    refresh(); setDeleteCourse(null);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1" style={{ fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>Programs & Courses</h1>
          <p className="text-gray-500 text-sm">{programs.length} programs · {allCourses.length} courses total</p>
        </div>
        <button onClick={openAddProgram} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: '#800020' }}>
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Programs', value: programs.length, color: '#800020' },
          { label: 'Total Courses', value: allCourses.length, color: '#1a4a7a' },
          { label: 'Total Enrollments', value: members.reduce((s, m) => s + m.enrolledCourses.length, 0), color: '#2d6a4f' },
          { label: 'Certificate Courses', value: allCourses.filter(c => c.certificate).length, color: '#d97706' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Program Accordion */}
      <div className="flex flex-col gap-4">
        {programs.map((program, pi) => (
          <motion.div
            key={program.id}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e5e7eb' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.08 }}
          >
            {/* Program Header */}
            <div className="flex items-center gap-4 p-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={program.image} alt={program.category} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{program.category}</h3>
                <p className="text-gray-500 text-sm truncate">{program.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right mr-2">
                  <div className="text-2xl font-black" style={{ color: program.color }}>{program.courses.length}</div>
                  <div className="text-gray-400 text-xs">courses</div>
                </div>
                {/* Edit/Delete program */}
                <button onClick={() => openEditProgram(program)} className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => setDeleteProgId(program._id || program.customId || program.id)} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={15} />
                </button>
                {/* Add course */}
                <button
                  onClick={() => openAddCourse(program._id || program.customId || program.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                  style={{ background: program.color }}
                >
                  <Plus size={13} /> Course
                </button>
                {/* Toggle */}
                <button
                  onClick={() => setExpanded(ex => ({ ...ex, [program.id]: !ex[program.id] }))}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
                >
                  {expanded[program.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {/* Courses Table */}
            {expanded[program.id] && (
              <div className="border-t border-gray-100 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#f8f9fc' }}>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Course</th>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Level</th>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Duration</th>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Enrolled</th>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Rating</th>
                      <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Cert.</th>
                      <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.courses.map(course => {
                      const enrolled = getEnrollmentCount(course.id);
                      return (
                        <tr key={course.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900 text-sm">{course.name}</div>
                            <div className="text-gray-400 text-xs line-clamp-1 max-w-60">{course.description}</div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{
                              background: course.level === 'Beginner' ? '#dcfce7' : course.level === 'Intermediate' ? '#fef3c7' : '#fee2e2',
                              color: course.level === 'Beginner' ? '#15803d' : course.level === 'Intermediate' ? '#d97706' : '#dc2626',
                            }}>
                              {course.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600"><Clock size={13} /> {course.duration}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: program.color }}>
                              <Users size={13} /> {enrolled}
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center gap-1 text-sm">
                              <Star size={13} fill="#d97706" className="text-yellow-500" />
                              <span className="font-semibold text-gray-800">{course.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            {course.certificate ? (
                              <div className="flex items-center gap-1 text-xs" style={{ color: '#2d6a4f' }}><Award size={13} /> Yes</div>
                            ) : <span className="text-gray-300 text-xs">No</span>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openEditCourse(program._id || program.customId || program.id, course)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                <Pencil size={14} />
                              </button>
                              <button onClick={() => setDeleteCourse({ progId: (program._id || program.customId || program.id), courseId: (course as any)._id || (course as any).customId || course.id })} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {program.courses.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-sm">
                          No courses yet.{' '}
                          <button onClick={() => openAddCourse(program.id)} className="font-semibold underline" style={{ color: '#800020' }}>Add the first course</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Program Add/Edit Modal */}
      <AdminModal open={programModal} title={editingProgram ? 'Edit Program' : 'Add Program'} onClose={() => setProgramModal(false)} width="max-w-lg">
        <form onSubmit={handleProgramSubmit} className="flex flex-col gap-4">
          <FormField label="Program Name" required>
            <input required value={programForm.category} onChange={e => setP('category', e.target.value)} placeholder="e.g. Programming" className={inp} />
          </FormField>
          <FormField label="Description" required>
            <textarea required value={programForm.description} onChange={e => setP('description', e.target.value)} rows={3} className={`${inp} resize-none`} placeholder="Program description..." />
          </FormField>
          <ImageUpload 
            label="Program Image" 
            value={programForm.image} 
            onChange={url => setP('image', url)} 
          />
          <FormField label="Accent Color">
            <div className="flex items-center gap-3">
              <input type="color" value={programForm.color} onChange={e => setP('color', e.target.value)} className="h-10 w-14 rounded-lg border border-gray-200 cursor-pointer" />
              <input value={programForm.color} onChange={e => setP('color', e.target.value)} placeholder="#800020" className={`flex-1 ${inp}`} />
            </div>
          </FormField>
          <FormActions onCancel={() => setProgramModal(false)} submitLabel={editingProgram ? 'Save Changes' : 'Add Program'} />
        </form>
      </AdminModal>

      {/* Course Add/Edit Modal */}
      <AdminModal open={courseModal} title={editingCourse ? 'Edit Course' : 'Add Course'} onClose={() => setCourseModal(false)} width="max-w-lg">
        <form onSubmit={handleCourseSubmit} className="flex flex-col gap-4">
          <FormField label="Course Name" required>
            <input required value={courseForm.name} onChange={e => setC('name', e.target.value)} placeholder="e.g. Python Fundamentals" className={inp} />
          </FormField>
          <FormField label="Description">
            <textarea value={courseForm.description} onChange={e => setC('description', e.target.value)} rows={2} className={`${inp} resize-none`} placeholder="What students will learn..." />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Duration">
              <input value={courseForm.duration} onChange={e => setC('duration', e.target.value)} placeholder="8 Weeks" className={inp} />
            </FormField>
            <FormField label="Level">
              <select value={courseForm.level} onChange={e => setC('level', e.target.value)} className={inp}>
                {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Rating">
              <input type="number" min="1" max="5" step="0.1" value={courseForm.rating} onChange={e => setC('rating', +e.target.value)} className={inp} />
            </FormField>
            <FormField label="Certificate">
              <div className="flex items-center gap-3 h-10">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={courseForm.certificate} onChange={e => setC('certificate', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
                  <span className="ml-3 text-sm font-medium text-gray-600">{courseForm.certificate ? 'Certificate' : 'No certificate'}</span>
                </label>
              </div>
            </FormField>
          </div>
          <FormField label="Skills (comma-separated)">
            <input
              value={Array.isArray(courseForm.skills) ? courseForm.skills.join(', ') : courseForm.skills}
              onChange={e => setC('skills', e.target.value)}
              placeholder="Python, OOP, APIs"
              className={inp}
            />
          </FormField>
          <FormActions onCancel={() => setCourseModal(false)} submitLabel={editingCourse ? 'Save Changes' : 'Add Course'} />
        </form>
      </AdminModal>

      {/* Delete Program Confirm */}
      <AdminConfirm
        open={!!deleteProgId}
        message="This program and all its courses will be permanently removed."
        onConfirm={handleDeleteProgram}
        onCancel={() => setDeleteProgId(null)}
      />

      {/* Delete Course Confirm */}
      <AdminConfirm
        open={!!deleteCourse}
        message="This course will be permanently removed from the program."
        onConfirm={handleDeleteCourse}
        onCancel={() => setDeleteCourse(null)}
      />
    </div>
  );
}
