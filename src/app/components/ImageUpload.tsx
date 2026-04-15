import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '../data/config';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large (max 5MB)');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
      toast.success('Image uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      const msg = 'Failed to upload image. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const clearImage = () => {
    onChange('');
    setError(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative group">
        {value ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                title="Change Image"
              >
                <Upload size={18} />
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                title="Remove Image"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`w-full aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 p-4
              ${uploading ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-gray-50/50 border-gray-200 hover:border-[#800020]/30 hover:bg-[#800020]/5 cursor-pointer'}
            `}
          >
            {uploading ? (
              <>
                <Loader2 size={24} className="text-[#800020] animate-spin" />
                <span className="text-sm font-medium text-gray-500">Uploading image...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-700 block">Click to upload image</span>
                  <span className="text-xs text-gray-400">PNG, JPG, WEBP or GIF (max 5MB)</span>
                </div>
              </>
            )}
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500" /> {error}
        </p>
      )}
    </div>
  );
}
