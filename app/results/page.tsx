'use client';
export const dynamic = 'force-dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '../../lib/axios';

type Doctor = {
  name: string;
  specialization: string;
  location: string;
  rating: number;
  fee: number;
  email: string;
  phone: string;
  experienceYears?: number;
  patientStories?: number;
  availability?: string;
  availableToday?: boolean;
};

export default function Results() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [flipped, setFlipped] = useState<{[key:number]:boolean}>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const res = await axios.get(`/doctors?search=${search}`);
        setDoctors(res.data);
      } finally {
        setLoading(false);
      }
    }, 600); // 600ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Search Results</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">No doctors found.</div>
          ) : (
            doctors.map((doc, idx) => {
              const isFlipped = flipped[idx];
              return (
                <div
                  key={idx}
                  className="group relative"
                  style={{ perspective: '1200px' }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{ transformStyle: 'preserve-3d', minHeight: '340px', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg border border-blue-100 flex flex-col items-center transition-opacity duration-700"
                      style={{ backfaceVisibility: 'hidden', zIndex: isFlipped ? 1 : 2, opacity: isFlipped ? 0 : 1 }}
                    >
                      <div className="w-20 h-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shadow-lg">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#2563eb" className="w-12 h-12">
                          <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
                          <path strokeWidth="1.5" d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-blue-700 mb-1 group-hover:text-blue-900 transition">{doc.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{doc.specialization}</p>
                      <p className="text-sm text-gray-400 mb-2">{doc.location}</p>
                      {doc.experienceYears && (
                        <p className="text-xs text-gray-500 mb-1">{doc.experienceYears} years experience</p>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="font-semibold text-gray-700">{doc.rating}</span>
                      </div>
                      <p className="font-semibold text-blue-600 mb-2">₹{doc.fee} <span className="text-xs text-gray-500">Consultation Fee</span></p>
                      
                      {doc.availableToday && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-600 text-sm font-semibold">Available Today</span>
                        </div>
                      )}
                      {doc.availability && (
                        <div className="text-xs text-gray-400 mb-2">{doc.availability}</div>
                      )}
                      <button
                        className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                        onClick={() => setFlipped(f => ({ ...f, [idx]: true }))}
                      >
                        Book Appointment
                      </button>
                    </div>
                    {/* Back Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg border border-blue-100 flex flex-col items-center justify-center transition-opacity duration-700"
                      style={{ backfaceVisibility: 'hidden', zIndex: isFlipped ? 2 : 1, opacity: isFlipped ? 1 : 0, transform: 'rotateY(180deg)' }}
                    >
                      <h3 className="text-xl font-bold text-blue-700 mb-2">Contact Details</h3>
                      <p className="mb-2 text-gray-700"><span className="font-semibold">Email:</span> {doc.email}</p>
                      <p className="mb-4 text-gray-700"><span className="font-semibold">Phone:</span> {doc.phone}</p>
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-blue-700 font-medium shadow hover:bg-gray-300 transition"
                        onClick={() => setFlipped(f => ({ ...f, [idx]: false }))}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
