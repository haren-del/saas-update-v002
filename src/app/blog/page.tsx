import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: "10 Tips for Getting Paid Faster",
      excerpt: "Learn the best practices for creating invoices that get paid quickly.",
      date: "January 15, 2025",
      category: "Tips & Tricks"
    },
    {
      title: "Understanding Invoice Terms and Conditions",
      excerpt: "A complete guide to writing effective terms and conditions for your invoices.",
      date: "January 10, 2025",
      category: "Guide"
    },
    {
      title: "How to Handle Late Payments Professionally",
      excerpt: "Best practices for following up on overdue invoices without damaging relationships.",
      date: "January 5, 2025",
      category: "Business"
    }
  ];

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
              <Link href="/blog" className="text-[#fcc425] font-semibold">
                Blog
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-[#464646] mb-6">Blog</h1>
        <p className="text-xl text-[#bebebf] mb-12">
          Tips, guides, and insights to help you manage your invoicing better.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#e9eaea] hover:shadow-md transition">
              <span className="text-sm text-[#fcc425] font-semibold">{post.category}</span>
              <h2 className="text-2xl font-bold text-[#464646] mt-2 mb-3">{post.title}</h2>
              <p className="text-[#bebebf] mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#bebebf]">{post.date}</span>
                <Link href="#" className="text-[#fcc425] font-semibold hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#fcc425] to-[#fae29b] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#464646] mb-4">Want to be notified of new posts?</h2>
          <p className="text-[#464646] mb-6">Subscribe to our newsletter for the latest tips and updates.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#464646]"
            />
            <button className="bg-[#464646] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#333333] transition">
              Subscribe
            </button>
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