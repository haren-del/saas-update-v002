'use client';

import { useEffect, useState } from 'react';
import { FileText, FileCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface UsageData {
  invoicesCount: number;
  invoicesLimit: number;
  quotationsCount: number;
  quotationsLimit: number;
  plan: string;
  planName: string;
}

export default function UsageWidget() {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await fetch('/api/usage');
      const data = await response.json();
      setUsage(data);
    } catch (error) {
      console.error('Error fetching usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#e9eaea] p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-[#e9eaea] rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-[#e9eaea] rounded mb-2"></div>
          <div className="h-8 bg-[#e9eaea] rounded"></div>
        </div>
      </div>
    );
  }

  if (!usage) return null;

  const invoicePercentage = usage.invoicesLimit === -1 
    ? 0 
    : (usage.invoicesCount / usage.invoicesLimit) * 100;
    
  const quotationPercentage = usage.quotationsLimit === -1 
    ? 0 
    : (usage.quotationsCount / usage.quotationsLimit) * 100;

  const isInvoiceLimitReached = usage.invoicesLimit !== -1 && usage.invoicesCount >= usage.invoicesLimit;
  const isQuotationLimitReached = usage.quotationsLimit !== -1 && usage.quotationsCount >= usage.quotationsLimit;
  const isNearLimit = invoicePercentage >= 80 || quotationPercentage >= 80;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e9eaea] p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#464646]">Usage This Month</h3>
        <span className="text-xs px-3 py-1 bg-[#fae29b] text-[#464646] rounded-full font-semibold">
          {usage.planName}
        </span>
      </div>

      {/* Invoices Usage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#fcc425]" />
            <span className="text-sm text-[#464646]">Invoices</span>
          </div>
          <span className="text-sm font-semibold text-[#464646]">
            {usage.invoicesCount} / {usage.invoicesLimit === -1 ? '∞' : usage.invoicesLimit}
          </span>
        </div>
        {usage.invoicesLimit !== -1 && (
          <div className="w-full bg-[#e9eaea] rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isInvoiceLimitReached
                  ? 'bg-red-500'
                  : invoicePercentage >= 80
                  ? 'bg-yellow-500'
                  : 'bg-[#fcc425]'
              }`}
              style={{ width: `${Math.min(invoicePercentage, 100)}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Quotations Usage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-[#fcc425]" />
            <span className="text-sm text-[#464646]">Quotations</span>
          </div>
          <span className="text-sm font-semibold text-[#464646]">
            {usage.quotationsCount} / {usage.quotationsLimit === -1 ? '∞' : usage.quotationsLimit}
          </span>
        </div>
        {usage.quotationsLimit !== -1 && (
          <div className="w-full bg-[#e9eaea] rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isQuotationLimitReached
                  ? 'bg-red-500'
                  : quotationPercentage >= 80
                  ? 'bg-yellow-500'
                  : 'bg-[#fcc425]'
              }`}
              style={{ width: `${Math.min(quotationPercentage, 100)}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Warning Messages */}
      {(isInvoiceLimitReached || isQuotationLimitReached) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-600 font-semibold">
            ⚠️ Limit Reached!
          </p>
          <p className="text-xs text-red-600 mt-1">
            You've used all your {isInvoiceLimitReached && 'invoices'}{isInvoiceLimitReached && isQuotationLimitReached && ' and '}{isQuotationLimitReached && 'quotations'} for this month.
          </p>
        </div>
      )}

      {isNearLimit && !isInvoiceLimitReached && !isQuotationLimitReached && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-600 font-semibold">
            ⚡ Almost at limit!
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            You're running low on this month's quota.
          </p>
        </div>
      )}

      {/* Upgrade CTA */}
      {usage.plan === 'free' && (
        <Link
          href="/dashboard/pricing"
          className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-[#fcc425] to-[#fae29b] text-[#464646] py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Upgrade Plan</span>
        </Link>
      )}

      {/* Reset Info */}
      <p className="text-xs text-[#bebebf] text-center mt-4">
        Usage resets on the 1st of each month
      </p>
    </div>
  );
}