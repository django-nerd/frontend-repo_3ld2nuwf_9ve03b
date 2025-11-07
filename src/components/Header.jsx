import React from 'react';
import { Shield, Image as ImageIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white">
            <ImageIcon size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Digital Art Portfolio</h1>
            <p className="text-xs text-gray-500">NFT‑free • Eco‑friendly • Verifiable Ownership</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-indigo-600">
          <Shield size={18} />
          <span className="text-sm font-medium">License Tracker</span>
        </div>
      </div>
    </header>
  );
}
