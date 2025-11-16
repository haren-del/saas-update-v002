import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function TermsPage() {
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
              <Link href="/about" className="text-[#464646] hover:text-[#fcc425] transition hidden md:block">
                About
              </Link>
              <Link href="/pricing" className="text-[#464646] hover:text-[#fcc425] transition hidden md:block">
                Pricing
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
        <h1 className="text-5xl font-bold text-[#464646] mb-4">Terms of Service</h1>
        <p className="text-[#bebebf] mb-12">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">1. Agreement to Terms</h2>
            <p className="text-[#464646] leading-relaxed">
              By accessing and using InvoiceGen, you accept and agree to be bound by the terms and provision of 
              this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">2. Use License</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              Permission is granted to temporarily use InvoiceGen for personal or commercial invoice generation purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Modify or copy the materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Use the materials for any commercial purpose without authorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Attempt to decompile or reverse engineer any software</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Remove any copyright or proprietary notations</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Transfer the materials to another person or server</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">3. User Accounts</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. 
              Failure to do so constitutes a breach of the Terms. You are responsible for:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Safeguarding your password and account information</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>All activities that occur under your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Notifying us immediately of any unauthorized use</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">4. Subscription and Payment</h2>
            <p className="text-[#464646] leading-relaxed">
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a 
              recurring and periodic basis. Billing cycles are set on a monthly or annual basis. At the end of 
              each billing cycle, your subscription will automatically renew unless you cancel it or we cancel it.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">5. Refund Policy</h2>
            <p className="text-[#464646] leading-relaxed">
              We offer a 14-day money-back guarantee for all new subscriptions. If you are not satisfied with 
              our service, you may request a full refund within 14 days of your initial purchase. Refunds after 
              this period will be evaluated on a case-by-case basis.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">6. Prohibited Uses</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              You may not use InvoiceGen:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>For any unlawful purpose or to solicit others to perform unlawful acts</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To violate any international, federal, provincial or state regulations</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To infringe upon or violate our intellectual property rights</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To harass, abuse, insult, harm, defame, or discriminate</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To submit false or misleading information</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To upload or transmit viruses or any other type of malicious code</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">7. Intellectual Property</h2>
            <p className="text-[#464646] leading-relaxed">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of InvoiceGen. The Service is protected by copyright, trademark, and other laws. You retain 
              all rights to the invoices and data you create using our service.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">8. Termination</h2>
            <p className="text-[#464646] leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any 
              reason whatsoever, including without limitation if you breach the Terms. Upon termination, your 
              right to use the Service will immediately cease. You may cancel your subscription at any time.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">9. Limitation of Liability</h2>
            <p className="text-[#464646] leading-relaxed">
              In no event shall InvoiceGen, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">10. Disclaimer</h2>
            <p className="text-[#464646] leading-relaxed">
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" 
              basis. The Service is provided without warranties of any kind, whether express or implied.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">11. Governing Law</h2>
            <p className="text-[#464646] leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws, without regard to its 
              conflict of law provisions. Our failure to enforce any right or provision of these Terms will not 
              be considered a waiver of those rights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">12. Changes to Terms</h2>
            <p className="text-[#464646] leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will 
              provide notice of any significant changes by posting the new Terms on this page and updating the 
              "Last updated" date. Your continued use of the Service after any changes constitutes acceptance.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">13. Contact Us</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Email::</strong> support@invoicegen.com</span>
</li>
<li className="flex items-start">
<span className="text-[#fcc425] mr-2">•</span>
<span><strong>Contact Form:</strong> <Link href="/#contact" className="text-[#fcc425] hover:underline">Contact Page</Link></span>
</li>
</ul>
</div>
<div className="bg-gradient-to-r from-[#fcc425] to-[#fae29b] rounded-xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-[#464646] mb-4">Ready to Get Started?</h2>
        <p className="text-[#464646] mb-6">
          By signing up, you agree to our Terms of Service. Start creating invoices today!
        </p>
        <Link 
          href="/signup" 
          className="inline-block bg-[#464646] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#333333] transition"
        >
          Create Free Account
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
