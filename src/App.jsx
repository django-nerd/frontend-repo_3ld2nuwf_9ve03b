import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ArtworkForm from './components/ArtworkForm';
import ArtworkTable from './components/ArtworkTable';
import Footer from './components/Footer';

// This demo wires the UI with a local state store. In a full app, connect to your PHP/PostgreSQL backend via API.

export default function App() {
  const [records, setRecords] = useState(() => {
    const cached = localStorage.getItem('art_records');
    return cached ? JSON.parse(cached) : [];
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem('art_records', JSON.stringify(records));
  }, [records]);

  const upsertRecord = (payload) => {
    if (editing?.id) {
      setRecords(prev => prev.map(r => r.id === editing.id ? { ...payload, id: editing.id } : r));
      setEditing(null);
    } else {
      const id = crypto.randomUUID();
      setRecords(prev => [{ ...payload, id }, ...prev]);
    }
  };

  const handleDelete = (item) => {
    if (confirm(`Delete "${item.title}"?`)) {
      setRecords(prev => prev.filter(r => r.id !== item.id));
      if (editing?.id === item.id) setEditing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 text-gray-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Add Artwork & License</h2>
          <ArtworkForm onSubmit={upsertRecord} editing={editing} />
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Portfolio & License Tracker</h2>
          <ArtworkTable data={records} onEdit={setEditing} onDelete={handleDelete} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
