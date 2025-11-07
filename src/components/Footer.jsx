import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>Built for eco‑friendly, NFT‑free digital art management.</p>
        <p className="text-gray-500">Use strong passwords and unique image URLs to protect your work.</p>
      </div>
    </footer>
  );
}
