
'use client';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      {/* Enhanced Navigation */}
   
      <nav className="border-b border-[#e9eaea] sticky top-0 bg-[#fcfcfc] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-[#fcc425]" />
              <span className="text-2xl font-bold text-[#464646]">InvoiceGen</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="/#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
              >
                Features
              </a>
              <Link href="/pricing" className="text-[#464646] hover:text-[#fcc425] transition">
                Pricing
              </Link>
              <a 
                href="/#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
              >
                How It Works
              </a>
              <a 
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#464646] mb-6">
            Create Professional Invoices
            <span className="block text-[#fcc425] mt-2">In Seconds</span>
          </h1>
          <p className="text-xl text-[#bebebf] mb-10 max-w-2xl mx-auto">
            The easiest way to generate, send, and track invoices. Get paid faster with our beautiful invoice generator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-[#fcc425] text-[#464646] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#fae29b] transition shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/pricing" 
              className="bg-[#fcfcfc] text-[#464646] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e9eaea] transition border-2 border-[#e9eaea]"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#bebebf]">No credit card required • Free forever</p>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e9eaea]">
            <div className="w-12 h-12 bg-[#fae29b] rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#fcc425]" />
            </div>
            <h3 className="text-xl font-semibold text-[#464646] mb-2">Easy to Use</h3>
            <p className="text-[#bebebf]">
              Create professional invoices in minutes with our intuitive interface and live preview.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e9eaea]">
            <div className="w-12 h-12 bg-[#fae29b] rounded-lg flex items-center justify-center mb-4">
              <svg 
                className="w-6 h-6 text-[#fcc425]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#464646] mb-2">Get Paid Faster</h3>
            <p className="text-[#bebebf]">
              Send invoices via email and download as PDF. Track payments and manage everything in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e9eaea]">
            <div className="w-12 h-12 bg-[#fae29b] rounded-lg flex items-center justify-center mb-4">
              <svg 
                className="w-6 h-6 text-[#fcc425]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#464646] mb-2">Secure & Reliable</h3>
            <p className="text-[#bebebf]">
              Your data is encrypted and secure. Focus on your business while we handle the rest.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-32">
          <h2 className="text-4xl font-bold text-[#464646] text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#fcc425] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#464646] mb-2">Sign Up</h3>
              <p className="text-[#bebebf]">Create your free account in seconds. No credit card required.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#fcc425] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#464646] mb-2">Create Invoice</h3>
              <p className="text-[#bebebf]">Fill in your details and see a live preview as you type.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#fcc425] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#464646] mb-2">Send & Track</h3>
              <p className="text-[#bebebf]">Download PDF or send via email. Track all your invoices in one place.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-32 bg-white rounded-2xl p-12 shadow-lg border border-[#e9eaea]">
          <h2 className="text-3xl font-bold text-[#464646] text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-center text-[#bebebf] mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
            <button className="w-full bg-[#fcc425] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#fae29b] transition">
              Send Message
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-gradient-to-r from-[#fcc425] to-[#fae29b] rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-[#464646] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[#464646] mb-8">
            Join thousands of businesses creating professional invoices
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-[#464646] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#333333] transition shadow-lg"
          >
            Create Your First Invoice
          </Link>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-[#464646] text-[#fcfcfc] py-12 mt-32">
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
                <li><a href="#features" className="hover:text-[#fcc425] transition">Features</a></li>
                <li><Link href="/pricing" className="hover:text-[#fcc425] transition">Pricing</Link></li>
                <li><a href="#how-it-works" className="hover:text-[#fcc425] transition">How It Works</a></li>
              </ul>
            </div>

            <div>
  <h4 className="font-semibold mb-4">Company</h4>
  <ul className="space-y-2 text-sm text-[#bebebf]">
    <li><Link href="/about" className="hover:text-[#fcc425] transition">About</Link></li>
    <li><Link href="/blog" className="hover:text-[#fcc425] transition">Blog</Link></li>
    <li><a href="#contact" className="hover:text-[#fcc425] transition">Contact</a></li>
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