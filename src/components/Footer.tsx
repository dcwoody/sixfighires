'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-white py-8"> {/* Changed background from darkgray to navy-blue */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Contact */}
          <div>
            <img
              src="/logo-white.png" // Use a white/light version of your logo for dark footer
              alt="SixFigHires Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm">244 Fifth Avenue, New York, N.Y. 10001</p>
            <p className="text-sm">800-874-0818</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-2">Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-sm hover:underline transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm hover:underline transition">
                  Search Jobs
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm hover:underline transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/terms" className="text-sm hover:underline transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:underline transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm">
          &copy; {new Date().getFullYear()} SixFigHires. All rights reserved.
        </div>
      </div>
    </footer>
  );
}