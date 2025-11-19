'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSent(true);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-12 h-12 text-[#fcc425]" />
            </div>
            <h1 className="text-3xl font-bold text-[#464646]">Check Your Email</h1>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e9eaea]">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 font-semibold">Email Sent!</p>
              <p className="text-sm text-green-600 mt-1">
                Check <strong>{email}</strong> for reset link
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-[#fcc425] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-[#fcc425]" />
          </div>
          <h1 className="text-3xl font-bold text-[#464646]">Forgot Password?</h1>
          <p className="text-[#bebebf] mt-2">Enter your email for reset link</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e9eaea]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fcc425] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#fae29b] transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-[#bebebf] hover:text-[#fcc425] transition text-sm">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}