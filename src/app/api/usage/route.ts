import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUserUsage } from '@/lib/usage';
import { getPlanLimits } from '@/lib/plans';

export async function GET() {
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

    const usage = await getUserUsage(user.id);
    const limits = getPlanLimits(user.plan);

    return NextResponse.json({
      invoicesCount: usage.invoicesCount,
      invoicesLimit: limits.invoicesPerMonth,
      quotationsCount: usage.quotationsCount,
      quotationsLimit: limits.quotationsPerMonth,
      plan: user.plan,
      planName: limits.name,
      currentMonth: usage.currentMonth,
      lastReset: usage.lastResetDate,
    });
  } catch (error: unknown) {
    console.error('Error fetching usage:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}