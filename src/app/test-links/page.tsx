'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TestLinksPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-8">
      <h1 className="text-3xl font-bold text-[#464646] mb-8">Test All Links</h1>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-[#e9eaea]">
          <h2 className="font-bold mb-2">Public Pages (Next.js Link):</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="text-[#fcc425] hover:underline">Home</Link>
            <Link href="/about" className="text-[#fcc425] hover:underline">About</Link>
            <Link href="/blog" className="text-[#fcc425] hover:underline">Blog</Link>
            <Link href="/pricing" className="text-[#fcc425] hover:underline">Pricing</Link>
            <Link href="/privacy" className="text-[#fcc425] hover:underline">Privacy</Link>
            <Link href="/terms" className="text-[#fcc425] hover:underline">Terms</Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#e9eaea]">
          <h2 className="font-bold mb-2">Auth Pages:</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="text-[#fcc425] hover:underline">Login</Link>
            <Link href="/signup" className="text-[#fcc425] hover:underline">Signup</Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#e9eaea]">
          <h2 className="font-bold mb-2">Dashboard (Need Login):</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="text-[#fcc425] hover:underline">Dashboard</Link>
            <Link href="/dashboard/create" className="text-[#fcc425] hover:underline">Create Invoice</Link>
            <Link href="/dashboard/invoices" className="text-[#fcc425] hover:underline">All Invoices</Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#e9eaea]">
          <h2 className="font-bold mb-2">Using Buttons (useRouter):</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => router.push('/about')}
              className="bg-[#fcc425] px-4 py-2 rounded hover:bg-[#fae29b] text-[#464646] font-semibold"
            >
              Go to About
            </button>
            <button 
              onClick={() => router.push('/blog')}
              className="bg-[#fcc425] px-4 py-2 rounded hover:bg-[#fae29b] text-[#464646] font-semibold"
            >
              Go to Blog
            </button>
            <button 
              onClick={() => router.push('/pricing')}
              className="bg-[#fcc425] px-4 py-2 rounded hover:bg-[#fae29b] text-[#464646] font-semibold"
            >
              Go to Pricing
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#e9eaea]">
          <h2 className="font-bold mb-2">Test Result:</h2>
          <p className="text-[#464646]">
            ✅ If Next.js Link works → Your navigation is fine<br/>
            ✅ If useRouter works → Links need 'use client'<br/>
            ❌ If nothing works → Check browser console (F12)
          </p>
        </div>
      </div>
    </div>
  );
}