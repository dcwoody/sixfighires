'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white text-primary-text shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo (assuming a dark logo for a white background) */}
        <Link href="/">
          <img
            src="/logo.png" // Ensure this is a dark/color logo for a white background
            alt="SixFigHires Logo"
            className="h-10 w-auto"
          />
        </Link>
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6 text-sm font-semibold uppercase">
          <Link href="/search" className="hover:text-accent-blue transition">
            Search Jobs
          </Link>
          <Link href="/signin" className="hover:text-accent-blue transition">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}