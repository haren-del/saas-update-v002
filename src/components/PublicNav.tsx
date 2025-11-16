'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

interface PublicNavProps {
  currentPage?: string;
}

export default function PublicNav({ currentPage }: PublicNavProps) {
  return (
    <nav className="border-b border-[#e9eaea] sticky top-0 bg-[#fcfcfc] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-[#fcc425]" />
            <span className="text-2xl font-bold text-[#464646]">InvoiceGen</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              href="/#features" 
              className="text-[#464646] hover:text-[#fcc425] transition hidden md:block"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className={`hover:text-[#fcc425] transition ${currentPage === 'pricing' ? 'text-[#fcc425] font-semibold' : 'text-[#464646]'}`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`hover:text-[#fcc425] transition ${currentPage === 'about' ? 'text-[#fcc425] font-semibold' : 'text-[#464646]'}`}
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className={`hover:text-[#fcc425] transition hidden md:block ${currentPage === 'blog' ? 'text-[#fcc425] font-semibold' : 'text-[#464646]'}`}
            >
              Blog
            </Link>
            <Link 
              href="/login" 
              className="text-[#464646] hover:text-[#fcc425] transition"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#fcc425] text-[#464646] px-6 py-2 rounded-lg font-semibold hover:bg-[#fae29b] transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}