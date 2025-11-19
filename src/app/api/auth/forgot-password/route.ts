
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
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

        console.log('Attempting to send password reset email to:', email);
        console.log('Reset URL:', resetUrl);
        console.log('API Key present:', !!process.env.RESEND_API_KEY);

        const result = await resend.emails.send({
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

        console.log('Resend API response:', result);

        if (result.error) {
          console.error('Resend API error:', result.error);
        } else {
          console.log('Email sent successfully! ID:', result.data?.id);
        }
      } catch (emailError: unknown) {
        console.error('Email sending error:', emailError);
      }
    } else {
      console.error('RESEND_API_KEY not found in environment variables');
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
