'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FileText, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <div className="text-[#464646]">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#e9eaea] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-[#fcc425]" />
              <span className="text-2xl font-bold text-[#464646]">InvoiceGen</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="text-[#464646] hover:text-[#fcc425] transition"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/invoices" 
                className="text-[#464646] hover:text-[#fcc425] transition"
              >
                Invoices
              </Link>
              <Link 
                href="/dashboard/create" 
                className="bg-[#fcc425] text-[#464646] px-4 py-2 rounded-lg font-semibold hover:bg-[#fae29b] transition flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Invoice</span>
              </Link>
              <div className="flex items-center space-x-4 border-l border-[#e9eaea] pl-6">
                <span className="text-sm text-[#bebebf]">{session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-[#464646] hover:text-[#fcc425] transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-[#464646]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#e9eaea]">
            <div className="px-4 py-4 space-y-3">
              <Link 
                href="/dashboard" 
                className="block text-[#464646] hover:text-[#fcc425] transition"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/invoices" 
                className="block text-[#464646] hover:text-[#fcc425] transition"
              >
                Invoices
              </Link>
              <Link 
                href="/dashboard/create" 
                className="block bg-[#fcc425] text-[#464646] px-4 py-2 rounded-lg font-semibold text-center hover:bg-[#fae29b] transition"
              >
                New Invoice
              </Link>
              <div className="pt-3 border-t border-[#e9eaea]">
                <span className="block text-sm text-[#bebebf] mb-2">{session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-[#464646] hover:text-[#fcc425] transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}