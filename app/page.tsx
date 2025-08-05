'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Debounce search
  useEffect(() => {
    if (!search) return;
    setLoading(true);
    const handler = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(handler);
  }, [search]);

  const handleSearch = () => {
    if (!loading) router.push(`/results?search=${search}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700 text-center">Find a Doctor</h1>
        <p className="mb-8 text-gray-500 text-center">Search for doctors by location or specialty and book appointments easily.</p>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Enter location or specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
          <button onClick={handleSearch} disabled={loading} className={`px-6 py-3 bg-blue-600 text-white rounded-lg shadow font-semibold transition ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
            Search
          </button>
        </div>
      </div>
    </main>
  );
}

