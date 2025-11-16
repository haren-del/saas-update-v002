'use client';

import { X, Check } from 'lucide-react';
import Link from 'next/link';
import { PLANS } from '@/lib/plans';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  reason?: string;
}

export default function UpgradeModal({ isOpen, onClose, currentPlan, reason }: UpgradeModalProps) {
  if (!isOpen) return null;

  const recommendedPlans = Object.entries(PLANS).filter(([key]) => key !== 'free');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e9eaea] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#464646]">Upgrade Your Plan</h2>
            {reason && <p className="text-sm text-[#bebebf] mt-1">{reason}</p>}
          </div>
          <button onClick={onClose} className="text-[#bebebf] hover:text-[#464646]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedPlans.map(([key, plan]) => (
              <div
                key={key}
                className={`rounded-xl p-6 border-2 ${
                  key === 'professional'
                    ? 'border-[#fcc425] bg-[#fffef9]'
                    : 'border-[#e9eaea]'
                }`}
              >
                {key === 'professional' && (
                  <span className="text-xs bg-[#fcc425] text-[#464646] px-3 py-1 rounded-full font-semibold">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#464646] mt-4">{plan.name}</h3>
                <div className="mt-2 mb-6">
                  <span className="text-4xl font-bold text-[#464646]">{plan.price}</span>
                  <span className="text-[#bebebf]">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-[#fcc425] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-[#464646]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard/pricing"
                  onClick={onClose}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition ${
                    key === 'professional'
                      ? 'bg-[#fcc425] text-[#464646] hover:bg-[#fae29b]'
                      : 'bg-[#e9eaea] text-[#464646] hover:bg-[#bebebf]'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e9eaea] p-6 bg-[#fcfcfc]">
          <p className="text-sm text-[#bebebf] text-center">
            All plans include 14-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}