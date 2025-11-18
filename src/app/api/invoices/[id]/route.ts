import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch single invoice by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    // Find the invoice
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    // Check if invoice exists and belongs to the user
    if (!invoice || invoice.userId !== user.id) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error: unknown) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update existing invoice
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const data = await req.json();

    // Check if invoice exists and belongs to user
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!existingInvoice || existingInvoice.userId !== user.id) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Update the invoice
    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
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

    // Send email if status is 'sent'
    if (data.status === 'sent' && process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'InvoiceGen <onboarding@resend.dev>',
          to: data.toEmail,
          subject: `Updated Invoice ${data.invoiceNumber} from ${data.fromName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #464646;">Updated Invoice from ${data.fromName}</h2>
              <p>Your invoice has been updated.</p>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
                <p><strong>Amount:</strong> $${data.total.toFixed(2)}</p>
                <p><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString()}</p>
              </div>
              <p style="color: #666;">This invoice was generated using InvoiceGen.</p>
            </div>
          `,
        });
        console.log('Email sent successfully!');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }

    return NextResponse.json(invoice);
  } catch (error: unknown) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete invoice
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    // Check if invoice belongs to user
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice || invoice.userId !== user.id) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Delete the invoice
    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}