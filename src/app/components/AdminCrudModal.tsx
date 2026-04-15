import { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export function AdminModal({ open, title, onClose, children, width = 'max-w-2xl' }: AdminModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={ref}
            className={`relative w-full ${width} max-h-[90vh] overflow-y-auto rounded-2xl`}
            style={{ background: '#fff', boxShadow: '0 40px 100px rgba(0,0,0,0.25)', fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
              <h2 className="font-bold text-gray-900" style={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, serif' }}>{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AdminConfirmProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AdminConfirm({ open, message, onConfirm, onCancel }: AdminConfirmProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onCancel}
          />
          <motion.div
            className="relative w-full max-w-sm rounded-2xl p-8 text-center"
            style={{ background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,0.2)', fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <AlertTriangle size={26} style={{ color: '#dc2626' }} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Confirm Delete</h3>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#dc2626' }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Shared form field components
export function FormField({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm outline-none focus:border-[#4A0000] focus:ring-2 focus:ring-[#4A0000]/10 transition-all";

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={props.rows ?? 3} className={`${inputClass} resize-none ${props.className ?? ''}`} />;
}

export function FormSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} ${props.className ?? ''}`}>
      {props.children}
    </select>
  );
}

export function FormActions({ onCancel, submitLabel = 'Save Changes' }: { onCancel: () => void; submitLabel?: string }) {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
        style={{ background: '#4A0000' }}
      >
        {submitLabel}
      </button>
    </div>
  );
}