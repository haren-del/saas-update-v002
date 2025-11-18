import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/email';
import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { invoiceId, recipientEmail } = await req.json();

    if (!invoiceId || !recipientEmail) {
      return NextResponse.json(
        { error: 'Invoice ID and recipient email are required' },
        { status: 400 }
      );
    }

    // Get invoice from database
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { user: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Check if user owns this invoice
    if (invoice.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Generate PDF using React.createElement (avoid JSX in API routes)
    const ReactPDF = await import('@react-pdf/renderer');
    const { Document, Page, Text, View, StyleSheet, pdf } = ReactPDF;

    const items = invoice.items as InvoiceItem[];

    const pdfDoc = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'A4', style: styles.page },
        React.createElement(
          View,
          { style: styles.header },
          React.createElement(Text, { style: styles.title }, 'INVOICE'),
          React.createElement(Text, { style: styles.invoiceNumber }, `#${invoice.invoiceNumber}`)
        ),
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.col },
              React.createElement(Text, { style: styles.label }, 'From:'),
              React.createElement(Text, { style: styles.text }, invoice.fromName),
              React.createElement(Text, { style: styles.text }, invoice.fromEmail),
              invoice.fromAddress && React.createElement(Text, { style: styles.text }, invoice.fromAddress),
              invoice.fromCity && React.createElement(Text, { style: styles.text }, invoice.fromCity)
            ),
            React.createElement(
              View,
              { style: styles.col },
              React.createElement(Text, { style: styles.label }, 'To:'),
              React.createElement(Text, { style: styles.text }, invoice.toName),
              React.createElement(Text, { style: styles.text }, invoice.toEmail),
              invoice.toAddress && React.createElement(Text, { style: styles.text }, invoice.toAddress),
              invoice.toCity && React.createElement(Text, { style: styles.text }, invoice.toCity)
            )
          )
        ),
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.col },
              React.createElement(Text, { style: styles.label }, 'Invoice Date:'),
              React.createElement(Text, { style: styles.text }, new Date(invoice.invoiceDate).toLocaleDateString())
            ),
            React.createElement(
              View,
              { style: styles.col },
              React.createElement(Text, { style: styles.label }, 'Due Date:'),
              React.createElement(Text, { style: styles.text }, new Date(invoice.dueDate).toLocaleDateString())
            )
          )
        ),
        React.createElement(
          View,
          { style: styles.table },
          React.createElement(
            View,
            { style: styles.tableHeader },
            React.createElement(Text, { style: [styles.tableCell, styles.descriptionCell] }, 'Description'),
            React.createElement(Text, { style: styles.tableCell }, 'Quantity'),
            React.createElement(Text, { style: styles.tableCell }, 'Rate'),
            React.createElement(Text, { style: styles.tableCell }, 'Amount')
          ),
          ...items.map((item, index) =>
            React.createElement(
              View,
              { key: index, style: styles.tableRow },
              React.createElement(Text, { style: [styles.tableCell, styles.descriptionCell] }, item.description),
              React.createElement(Text, { style: styles.tableCell }, item.quantity.toString()),
              React.createElement(Text, { style: styles.tableCell }, `$${item.rate.toFixed(2)}`),
              React.createElement(Text, { style: styles.tableCell }, `$${item.amount.toFixed(2)}`)
            )
          )
        ),
        React.createElement(
          View,
          { style: styles.totals },
          React.createElement(
            View,
            { style: styles.totalRow },
            React.createElement(Text, { style: styles.totalLabel }, 'Subtotal:'),
            React.createElement(Text, { style: styles.totalValue }, `$${invoice.subtotal.toFixed(2)}`)
          ),
          invoice.tax > 0 && React.createElement(
            View,
            { style: styles.totalRow },
            React.createElement(Text, { style: styles.totalLabel }, 'Tax:'),
            React.createElement(Text, { style: styles.totalValue }, `$${invoice.tax.toFixed(2)}`)
          ),
          invoice.discount > 0 && React.createElement(
            View,
            { style: styles.totalRow },
            React.createElement(Text, { style: styles.totalLabel }, 'Discount:'),
            React.createElement(Text, { style: styles.totalValue }, `-$${invoice.discount.toFixed(2)}`)
          ),
          React.createElement(
            View,
            { style: [styles.totalRow, styles.grandTotal] },
            React.createElement(Text, { style: styles.totalLabel }, 'Total:'),
            React.createElement(Text, { style: styles.totalValue }, `$${invoice.total.toFixed(2)}`)
          )
        ),
        invoice.notes && React.createElement(
          View,
          { style: styles.notes },
          React.createElement(Text, { style: styles.label }, 'Notes:'),
          React.createElement(Text, { style: styles.text }, invoice.notes)
        )
      )
    );

    // Generate PDF buffer
    const pdfBlob = await pdf(pdfDoc).toBlob();
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

    // Send email with PDF attachment
    const emailResult = await sendInvoiceEmail({
      to: recipientEmail,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: new Date(invoice.invoiceDate).toLocaleDateString(),
      total: `$${invoice.total.toFixed(2)}`,
      pdfBuffer,
      fromName: invoice.fromName,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Invoice sent successfully',
    });

  } catch (error: unknown) {
    console.error('Send invoice error:', error);
    return NextResponse.json(
      { error: 'Failed to send invoice' },
      { status: 500 }
    );
  }
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#667eea',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  invoiceNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 8,
  },
  tableCell: {
    width: '20%',
    fontSize: 10,
  },
  descriptionCell: {
    width: '40%',
  },
  totals: {
    marginLeft: 'auto',
    width: '40%',
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 11,
  },
  grandTotal: {
    borderTopWidth: 2,
    borderTopColor: '#333',
    paddingTop: 10,
    marginTop: 10,
  },
  notes: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});