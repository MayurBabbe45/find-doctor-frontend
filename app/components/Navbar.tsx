"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">DoctorFinder</Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          <Link href="/results?search=" className="hover:text-blue-500 transition">All Doctors</Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button id="menu-btn" className="text-2xl text-blue-600 focus:outline-none">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
      {/* Mobile menu (hidden by default, can be toggled with JS if needed) */}
      <div className="md:hidden px-4 pb-3 hidden" id="mobile-menu">
        <Link href="/" className="block py-2 hover:text-blue-500">Home</Link>
        <Link href="/results?search=" className="block py-2 hover:text-blue-500">Results</Link>
      </div>
    </nav>
  );
}
