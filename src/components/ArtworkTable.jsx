import React, { useMemo, useState } from 'react';
import { Pencil, Trash2, Search, ShieldCheck } from 'lucide-react';

export default function ArtworkTable({ data, onEdit, onDelete }) {
  const [query, setQuery] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(item => {
      const matchesQuery = [item.title, item.artist, item.licenseType, item.licensee]
        .filter(Boolean)
        .some(v => v.toLowerCase().includes(q));
      const matchesLicense = licenseFilter === 'all' || item.licenseType === licenseFilter;
      return matchesQuery && matchesLicense;
    });
  }, [data, query, licenseFilter]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, artist, licensee…"
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select value={licenseFilter} onChange={(e)=>setLicenseFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Licenses</option>
          <option value="personal">Personal</option>
          <option value="commercial">Commercial</option>
          <option value="exclusive">Exclusive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artwork</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signature</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.title} className="h-12 w-12 rounded object-cover border" onError={(e)=>{e.currentTarget.src='https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=200&auto=format&fit=crop';}} />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">by {item.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="capitalize font-medium">{item.licenseType}</span>
                    {item.licensee && <span className="text-gray-500">Licensed to: {item.licensee}</span>}
                    {item.expiresAt && <span className="text-gray-500">Expires: {item.expiresAt}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-600">
                    <ShieldCheck size={16} />
                    <span className="truncate max-w-[220px]" title={item.signature}>{item.signature.slice(0, 16)}…</span>
                  </div>
                  <div className="text-[10px] text-gray-500">{new Date(item.timestamp).toLocaleString()}</div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button onClick={() => onEdit(item)} className="inline-flex items-center gap-1 rounded border px-2 py-1 text-sm"><Pencil size={16}/>Edit</button>
                    <button onClick={() => onDelete(item)} className="inline-flex items-center gap-1 rounded border px-2 py-1 text-sm text-red-600 border-red-200"><Trash2 size={16}/>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
