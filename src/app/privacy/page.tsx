import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function PrivacyPage() {
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
        <h1 className="text-5xl font-bold text-[#464646] mb-4">Privacy Policy</h1>
        <p className="text-[#bebebf] mb-12">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">1. Introduction</h2>
            <p className="text-[#464646] leading-relaxed">
              Welcome to InvoiceGen. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">2. Information We Collect</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Identity Data:</strong> First name, last name, username or similar identifier</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Contact Data:</strong> Email address and telephone numbers</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Financial Data:</strong> Payment card details</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Transaction Data:</strong> Details about payments and invoices you create</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Technical Data:</strong> IP address, browser type, time zone, and device information</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Usage Data:</strong> Information about how you use our website and services</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">3. How We Use Your Information</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your 
              personal data in the following circumstances:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To register you as a new customer and provide our services</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To process and deliver your invoices</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To manage payments, fees, and charges</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To communicate with you about our services</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To improve our website and services</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>To protect against fraud and maintain security</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">4. Data Security</h2>
            <p className="text-[#464646] leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We use 
              industry-standard encryption (SSL/TLS) to protect data in transit and at rest. Access to your 
              personal data is limited to employees and contractors who need to know such information.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">5. Data Retention</h2>
            <p className="text-[#464646] leading-relaxed">
              We will only retain your personal data for as long as necessary to fulfill the purposes we 
              collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
              requirements. When we no longer need your data, we will securely delete or anonymize it.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">6. Your Legal Rights</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to access:</strong> Request access to your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to correction:</strong> Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to erasure:</strong> Request deletion of your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to restrict processing:</strong> Request restriction of processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to data portability:</strong> Request transfer of your data</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Right to object:</strong> Object to processing of your data</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">7. Cookies</h2>
            <p className="text-[#464646] leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold 
              certain information. Cookies are files with small amount of data which may include an anonymous 
              unique identifier. You can instruct your browser to refuse all cookies or to indicate when a 
              cookie is being sent.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">8. Third-Party Services</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              We may employ third-party companies and individuals to facilitate our service:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Payment processors for handling transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Email service providers for communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Cloud hosting providers for data storage</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span>Analytics services to monitor and analyze usage</span>
              </li>
            </ul>
            <p className="text-[#464646] leading-relaxed mt-4">
              These third parties have access to your personal data only to perform these tasks on our behalf 
              and are obligated not to disclose or use it for any other purpose.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">9. International Transfers</h2>
            <p className="text-[#464646] leading-relaxed">
              Your information may be transferred to and maintained on computers located outside of your state, 
              province, country or other governmental jurisdiction where the data protection laws may differ. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">10. Children's Privacy</h2>
            <p className="text-[#464646] leading-relaxed">
              Our service does not address anyone under the age of 18. We do not knowingly collect personally 
              identifiable information from anyone under the age of 18. If you are a parent or guardian and you 
              are aware that your child has provided us with personal data, please contact us.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-[#464646] leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. You are advised to 
              review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e9eaea]">
            <h2 className="text-2xl font-bold text-[#464646] mb-4">12. Contact Us</h2>
            <p className="text-[#464646] leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-[#464646]">
              <li className="flex items-start">
                <span className="text-[#fcc425] mr-2">•</span>
                <span><strong>Email:</strong> privacy@invoicegen.com</span>
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
              Your privacy is important to us. Start using InvoiceGen today with confidence.
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