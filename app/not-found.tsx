import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">Go Home</Link>
      </div>
    </main>
  );
}
