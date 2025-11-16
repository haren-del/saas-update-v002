import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canUserCreateInvoice, incrementInvoiceCount } from '@/lib/usage';

export async function POST(req: Request) {
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

    // ⭐ CHECK USAGE LIMITS
    const canCreate = await canUserCreateInvoice(user.id);
    if (!canCreate.allowed) {
      return NextResponse.json(
        { 
          error: canCreate.message,
          limitReached: true,
          upgradeRequired: true
        },
        { status: 403 }
      );
    }

    const data = await req.json();

    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        invoiceNumber: data.invoiceNumber,
        fromName: data.fromName,
        fromEmail: data.fromEmail,
        fromAddress: data.fromAddress || '',
        fromCity: data.fromCity || '',
        fromCountry: data.fromCountry || '',
        toName: data.toName,
        toEmail: data.toEmail,
        toAddress: data.toAddress || '',
        toCity: data.toCity || '',
        toCountry: data.toCountry || '',
        invoiceDate: new Date(data.invoiceDate),
        dueDate: new Date(data.dueDate),
        items: data.items,
        subtotal: data.subtotal,
        tax: data.tax,
        discount: data.discount,
        total: data.total,
        notes: data.notes || '',
        terms: data.terms || '',
        status: data.status || 'draft',
      },
    });

    // ⭐ INCREMENT USAGE COUNT
    await incrementInvoiceCount(user.id);

    // Send email if status is 'sent'
    if (data.status === 'sent' && process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'InvoiceGen <onboarding@resend.dev>',
          to: data.toEmail,
          subject: `Invoice ${data.invoiceNumber} from ${data.fromName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #464646;">New Invoice from ${data.fromName}</h2>
              <p>You have received a new invoice.</p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
                <p><strong>Amount:</strong> $${data.total.toFixed(2)}</p>
                <p><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</p>
              </div>
              <p style="color: #666;">This invoice was generated using InvoiceGen.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}