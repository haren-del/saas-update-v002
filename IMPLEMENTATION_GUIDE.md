# Features Implementation Guide

## ✅ COMPLETED: Feature #1 - PDF Watermark

### What Was Done:
1. Modified `/src/app/api/invoices/pdf/route.ts`
   - Added user plan checking
   - Added conditional watermark for free users
   - Watermark shows: "⚡ Generated with InvoiceGen - Free Plan"

2. Modified `/src/app/api/invoices/send/route.ts`
   - Added same watermark logic
   - Watermark appears on emailed PDFs

### Result:
✅ Free plan PDFs now show professional watermark
✅ Paid plans don't show watermark
✅ Encourages upgrades

---

## 🔄 IN PROGRESS: Feature #2 - Password Reset Flow

### What's Ready:
1. **Database Schema Updated** ✅
   - Added `resetToken` field to User model
   - Added `resetTokenExpiry` field to User model
   - File: `prisma/schema.prisma`

### Files Created (Ready to Copy):

#### 1. API Route: Forgot Password
**Path:** `src/app/api/auth/forgot-password/route.ts`
**Status:** Code ready (see below)

#### 2. API Route: Reset Password  
**Path:** `src/app/api/auth/reset-password/route.ts`
**Status:** Code ready (see below)

#### 3. Page: Forgot Password
**Path:** `src/app/forgot-password/page.tsx`
**Status:** Code ready (see below)

#### 4. Page: Reset Password
**Path:** `src/app/reset-password/[token]/page.tsx`
**Status:** Code ready (see below)

---

## 📋 MANUAL STEPS REQUIRED

Due to system limitations, I cannot create new folders. Here are the manual steps:

### Step 1: Update Database Schema
```bash
cd "C:\Users\Sampath\Desktop\new cloads app\invoice-saas"
npx prisma generate
npx prisma db push
```

### Step 2: Create Folders
```bash
mkdir src\app\forgot-password
mkdir src\app\reset-password
mkdir src\app\reset-password\[token]
mkdir src\app\api\auth\forgot-password
mkdir src\app\api\auth\reset-password
```

### Step 3: Create Files

I'll provide all the code below. You need to manually create these files:

---

## 📄 FILE CONTENTS

### File 1: `src/app/api/auth/forgot-password/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ 
        message: 'If that email is registered, you will receive a reset link shortly' 
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

      await resend.emails.send({
        from: 'InvoiceGen <onboarding@resend.dev>',
        to: email,
        subject: 'Reset Your Password - InvoiceGen',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #fcc425; padding: 30px; text-align: center;">
              <h1 style="color: #464646; margin: 0;">Password Reset</h1>
            </div>
            <div style="background: #fff; padding: 40px; border: 1px solid #e9eaea;">
              <p style="color: #464646;">Hi ${user.name || 'there'},</p>
              <p>We received a request to reset your password. Click the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: #fcc425; color: #464646; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              <p style="color: #bebebf; font-size: 14px;">This link expires in 1 hour.</p>
              <p style="color: #bebebf; font-size: 14px;">If you didn't request this, ignore this email.</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ 
      message: 'If that email is registered, you will receive a reset link shortly' 
    });

  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### File 2: `src/app/api/auth/reset-password/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ 
      message: 'Password reset successfully' 
    });

  } catch (error: unknown) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### File 3: `src/app/forgot-password/page.tsx`

```typescript
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
```

### File 4: `src/app/reset-password/[token]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    params.then(({ token }) => setToken(token));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e9eaea] text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-600 font-semibold text-lg">Password Reset Successful!</p>
              <p className="text-sm text-green-600 mt-2">Redirecting to login...</p>
            </div>
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
          <h1 className="text-3xl font-bold text-[#464646]">Reset Password</h1>
          <p className="text-[#bebebf] mt-2">Enter your new password</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e9eaea]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#464646] mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#464646] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fcc425] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#fae29b] transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-[#bebebf] hover:text-[#fcc425] transition text-sm">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### File 5: Add "Forgot Password" link to login page

Update `src/app/login/page.tsx` - Add this after the password input:

```typescript
<div className="flex justify-end">
  <Link href="/forgot-password" className="text-sm text-[#fcc425] hover:underline">
    Forgot password?
  </Link>
</div>
```

---

## 🎯 NEXT STEPS

1. Run database migration:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. Create all folders and files as listed above

3. Test the password reset flow:
   - Visit `/forgot-password`
   - Enter email
   - Check email for reset link
   - Click link (goes to `/reset-password/[token]`)
   - Enter new password
   - Login with new password

4. **Feature #2 will be COMPLETE!** ✅

Then we can move to Feature #3: Payment Methods on Invoice

---

_Would you like me to continue with Feature #3 implementation or help you test Features #1 and #2 first?_
