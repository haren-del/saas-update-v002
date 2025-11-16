"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
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
              onClick={(e) => handleScroll(e, "features")}
              className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
            >
              Features
            </a>

            <Link href="/pricing" className="text-[#464646] hover:text-[#fcc425] transition">
              Pricing
            </Link>

            <a
              href="/#how-it-works"
              onClick={(e) => handleScroll(e, "how-it-works")}
              className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
            >
              How It Works
            </a>

            <a
              href="/#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="text-[#464646] hover:text-[#fcc425] transition cursor-pointer"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-[#464646] hover:text-[#fcc425] transition">
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
