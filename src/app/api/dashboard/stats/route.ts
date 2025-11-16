import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      totalInvoices: invoices.length,
      totalRevenue: invoices.reduce((sum: number, inv: { total: number }) => sum + inv.total, 0),
      pendingInvoices: invoices.filter((inv: { status: string }) => inv.status !== 'paid').length,
      paidInvoices: invoices.filter((inv: { status: string }) => inv.status === 'paid').length,
    };

    const recentInvoices = invoices.slice(0, 5);

    return NextResponse.json({ stats, recentInvoices });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}