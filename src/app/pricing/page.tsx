// app/pricing/page.tsx
"use client";

import { useState } from "react";
import { Check, FileText } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header"; // <-- import Header

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

  // ... your plans object here ...
const plans = {
    monthly: [
      {
        name: "Starter",
        price: "$9",
        period: "/month",
        features: [
          "10 invoices per month",
          "PDF download",
          "Email sending",
          "Basic templates",
          "Email support"
        ],
      },
      {
        name: "Professional",
        price: "$29",
        period: "/month",
        features: [
          "Unlimited invoices",
          "PDF download",
          "Email sending",
          "Premium templates",
          "Priority support",
          "Custom branding",
          "Analytics dashboard"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "/month",
        features: [
          "Everything in Professional",
          "Multiple team members",
          "API access",
          "Custom integrations",
          "Dedicated support",
          "White-label solution"
        ],
      }
    ],
    yearly: [
      {
        name: "Starter",
        price: "$90",
        period: "/year",
        savings: "Save $18",
        features: [
          "10 invoices per month",
          "PDF download",
          "Email sending",
          "Basic templates",
          "Email support"
        ],
      },
      {
        name: "Professional",
        price: "$290",
        period: "/year",
        savings: "Save $58",
        features: [
          "Unlimited invoices",
          "PDF download",
          "Email sending",
          "Premium templates",
          "Priority support",
          "Custom branding",
          "Analytics dashboard"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: "$990",
        period: "/year",
        savings: "Save $198",
        features: [
          "Everything in Professional",
          "Multiple team members",
          "API access",
          "Custom integrations",
          "Dedicated support",
          "White-label solution"
        ],
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      {/* Use the Header component here */}
      <Header />
<div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#464646] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#bebebf] mb-8">
            Choose the perfect plan for your business
          </p>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* ... the rest of your pricing page content ... */}
 {/* Pricing Toggle */}
          <div className="inline-flex bg-[#e9eaea] rounded-lg p-1">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                selectedPlan === 'monthly' 
                  ? 'bg-[#fcc425] text-[#464646]' 
                  : 'text-[#bebebf]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                selectedPlan === 'yearly' 
                  ? 'bg-[#fcc425] text-[#464646]' 
                  : 'text-[#bebebf]'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans[selectedPlan].map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg p-8 relative ${
                plan.popular ? 'border-2 border-[#fcc425] transform scale-105' : 'border border-[#e9eaea]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fcc425] text-[#464646] px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#464646] mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#464646]">{plan.price}</span>
                <span className="text-[#bebebf]">{plan.period}</span>
                {'savings' in plan && plan.savings && (
                  <div className="text-sm text-[#fcc425] font-semibold mt-1">{plan.savings}</div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-[#fcc425] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-[#464646]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/signup"
                className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                  plan.popular 
                    ? 'bg-[#fcc425] text-[#464646] hover:bg-[#fae29b]' 
                    : 'bg-[#e9eaea] text-[#464646] hover:bg-[#bebebf]'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-[#464646] mb-4">All plans include:</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
            <div className="text-center">
              <div className="text-[#fcc425] text-3xl mb-2">✓</div>
              <p className="text-[#464646] font-semibold">Secure Storage</p>
            </div>
            <div className="text-center">
              <div className="text-[#fcc425] text-3xl mb-2">✓</div>
              <p className="text-[#464646] font-semibold">Mobile Access</p>
            </div>
            <div className="text-center">
              <div className="text-[#fcc425] text-3xl mb-2">✓</div>
              <p className="text-[#464646] font-semibold">24/7 Support</p>
            </div>
            <div className="text-center">
              <div className="text-[#fcc425] text-3xl mb-2">✓</div>
              <p className="text-[#464646] font-semibold">Free Updates</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#fcc425] to-[#fae29b] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#464646] mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-[#464646] mb-6">
            Start your free trial today. No credit card required.
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-[#464646] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#333333] transition shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Footer - Add this before </main> */}
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