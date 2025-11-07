import React, { useEffect, useMemo, useState } from 'react';
import { Save, FileSignature, RefreshCcw } from 'lucide-react';

const initialState = {
  id: '',
  title: '',
  artist: '',
  imageUrl: '',
  description: '',
  licenseType: 'personal',
  licensee: '',
  expiresAt: '',
};

function generateSignature(payload) {
  // Simple browser-side hash for demo UX (SHA-256 via SubtleCrypto). Backend should validate.
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  return crypto.subtle.digest('SHA-256', data).then(buf =>
    Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  );
}

export default function ArtworkForm({ onSubmit, editing }) {
  const [form, setForm] = useState(initialState);
  const isEditing = Boolean(editing?.id);

  useEffect(() => {
    if (editing) {
      setForm({ ...initialState, ...editing });
    }
  }, [editing]);

  const canSubmit = useMemo(() => {
    return form.title.trim() && form.artist.trim() && form.imageUrl.trim();
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, timestamp: new Date().toISOString() };
    const signature = await generateSignature(payload);
    onSubmit({ ...payload, signature });
    if (!isEditing) handleReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="E.g., Aurora Dreams" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Artist</label>
          <input name="artist" value={form.artist} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://…" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Short story about this artwork" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">License Type</label>
          <select name="licenseType" value={form.licenseType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="personal">Personal</option>
            <option value="commercial">Commercial</option>
            <option value="exclusive">Exclusive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Licensee</label>
          <input name="licensee" value={form.licensee} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Client or company (optional)" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expires At</label>
          <input type="date" name="expiresAt" value={form.expiresAt} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={!canSubmit} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">
          <Save size={18} />
          {isEditing ? 'Update Record' : 'Add Artwork'}
        </button>
        <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-gray-700">
          <RefreshCcw size={18} /> Reset
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <FileSignature size={16} />
          <span>Client-side signature added. Backend will verify.</span>
        </div>
      </div>
    </form>
  );
}
