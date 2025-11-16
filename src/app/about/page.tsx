
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      {/* Navigation */}
      <nav className="border-b border-[#e9eaea] sticky top-0 bg-[#fcfcfc] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-[#fcc425]" />
              <span className="text-2xl font-bold text-[#464646]">InvoiceGen</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/#features" className="text-[#464646] hover:text-[#fcc425] transition hidden md:block">
                Features
              </Link>
              <Link href="/pricing" className="text-[#464646] hover:text-[#fcc425] transition">
                Pricing
              </Link>
              <Link href="/about" className="text-[#fcc425] font-semibold">
                About
              </Link>
              <Link href="/login" className="text-[#464646] hover:text-[#fcc425] transition">
                Login
              </Link>
              <Link href="/signup" className="bg-[#fcc425] text-[#464646] px-6 py-2 rounded-lg font-semibold hover:bg-[#fae29b] transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-[#464646] mb-6">About InvoiceGen</h1>
        <p className="text-xl text-[#bebebf] mb-12">
          Making invoice creation simple, beautiful, and accessible for everyone.
        </p>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea] mb-8">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">Our Mission</h2>
            <p className="text-[#464646] leading-relaxed">
              At InvoiceGen, we believe that creating professional invoices shouldn't be complicated or expensive. 
              Our mission is to empower small businesses, freelancers, and entrepreneurs with a simple, beautiful, 
              and powerful invoicing solution that helps them get paid faster.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea] mb-8">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">Our Story</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              InvoiceGen was born out of frustration with existing invoicing tools that were either too complex, 
              too expensive, or simply didn't work well. We wanted to create something different – a tool that 
              anyone could use, regardless of their technical expertise.
            </p>
            <p className="text-[#464646] leading-relaxed">
              Today, we're proud to serve thousands of businesses worldwide, helping them create beautiful invoices 
              and get paid faster. Our commitment to simplicity, security, and user experience drives everything we do.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea] mb-8">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">✓</span>
                <span><strong>Simple & Intuitive:</strong> Create professional invoices in minutes</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">✓</span>
                <span><strong>Secure:</strong> Your data is encrypted and protected</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">✓</span>
                <span><strong>Affordable:</strong> Transparent pricing with no hidden fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">✓</span>
                <span><strong>Support:</strong> Dedicated customer support when you need it</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-[#fcc425] to-[#fae29b] rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-[#464646] mb-4">Ready to Get Started?</h2>
            <p className="text-[#464646] mb-6">Join thousands of businesses using InvoiceGen today.</p>
            <Link 
              href="/signup" 
              className="inline-block bg-[#464646] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#333333] transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#464646] text-[#fcfcfc] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-[#fcc425]" />
                <span className="text-xl font-bold">InvoiceGen</span>
              </Link>
              <p className="text-[#bebebf] text-sm">
                Professional invoice generation made simple and beautiful.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#bebebf]">
                <li><Link href="/#features" className="hover:text-[#fcc425] transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-[#fcc425] transition">Pricing</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-[#fcc425] transition">How It Works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#bebebf]">
                <li><Link href="/about" className="hover:text-[#fcc425] transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-[#fcc425] transition">Blog</Link></li>
                <li><Link href="/#contact" className="hover:text-[#fcc425] transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#bebebf]">
                <li><Link href="/privacy" className="hover:text-[#fcc425] transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#fcc425] transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#666666] pt-8 text-center">
            <p className="text-sm text-[#bebebf]">
              © 2025 InvoiceGen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}