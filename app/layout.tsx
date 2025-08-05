import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Load fonts with CSS variable support
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Metadata for the whole app
export const metadata: Metadata = {
  title: "Doctor Finder",
  description: "Search and book appointments with doctors easily.",
};

// App layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}> 
      <body className="antialiased bg-white text-gray-900">
        {/* Responsive Navbar */}
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="pt-16">{/* Add padding for navbar height */}
          {children}
        </div>
      </body>
    </html>
  );
}
