import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Admin-only endpoint to reset usage for testing
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Reset usage for the current month
    const currentMonth = new Date().toISOString().slice(0, 7);
    
    const usage = await prisma.usage.upsert({
      where: { userId: user.id },
      update: {
        invoicesCount: 0,
        quotationsCount: 0,
        currentMonth,
        lastResetDate: new Date(),
      },
      create: {
        userId: user.id,
        invoicesCount: 0,
        quotationsCount: 0,
        currentMonth,
        lastResetDate: new Date(),
      },
    });

    return NextResponse.json({ 
      message: 'Usage reset successfully',
      usage 
    });
  } catch (error: unknown) {
    console.error('Error resetting usage:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}