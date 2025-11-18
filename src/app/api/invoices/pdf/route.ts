import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface PDFInvoiceData {
  invoiceNumber: string;
  fromName: string;
  fromEmail: string;
  fromAddress?: string;
  fromCity?: string;
  fromCountry?: string;
  toName: string;
  toEmail: string;
  toAddress?: string;
  toCity?: string;
  toCountry?: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  terms?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: PDFInvoiceData = await req.json();

    // Validation
    if (!data.invoiceNumber || !data.fromName || !data.toName || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required invoice data' },
        { status: 400 }
      );
    }

    // Dynamically import react-pdf/renderer
    const ReactPDF = await import('@react-pdf/renderer');
    const { Document, Page, Text, View, StyleSheet, pdf } = ReactPDF;

    const styles = StyleSheet.create({
      page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
      },
      header: {
        fontSize: 24,
        marginBottom: 20,
        color: '#464646',
      },
      subheader: {
        marginBottom: 20,
        color: '#bebebf',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      column: {
        width: '48%',
      },
      sectionTitle: {
        marginBottom: 5,
      },
      dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
      },
      dateBox: {
        width: '45%',
      },
      dateLabel: {
        color: '#bebebf',
        fontSize: 10,
        marginBottom: 3,
      },
      table: {
        marginTop: 20,
        marginBottom: 20,
      },
      tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#fcc425',
        paddingBottom: 5,
        marginBottom: 10,
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e9eaea',
        paddingVertical: 8,
      },
      col1: { width: '50%' },
      col2: { width: '15%', textAlign: 'right' },
      col3: { width: '15%', textAlign: 'right' },
      col4: { width: '20%', textAlign: 'right' },
      totalSection: {
        marginTop: 20,
        alignItems: 'flex-end',
      },
      totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
      },
      totalAmount: {
        fontSize: 16,
        color: '#fcc425',
      },
      totalDivider: {
        borderTopWidth: 2,
        borderTopColor: '#fcc425',
        paddingTop: 5,
      },
      notesSection: {
        marginTop: 30,
      },
      termsSection: {
        marginTop: 15,
      },
      sectionHeader: {
        marginBottom: 5,
      },
    });

    // Create the PDF document using React.createElement instead of JSX
    const InvoicePDF = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'A4', style: styles.page },
        // Header
        React.createElement(Text, { style: styles.header }, 'INVOICE'),
        React.createElement(Text, { style: styles.subheader }, data.invoiceNumber),

        // From and To Section
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(
            View,
            { style: styles.column },
            React.createElement(Text, { style: styles.sectionTitle }, 'FROM'),
            React.createElement(Text, null, data.fromName),
            React.createElement(Text, null, data.fromEmail),
            data.fromAddress && React.createElement(Text, null, data.fromAddress),
            (data.fromCity || data.fromCountry) &&
              React.createElement(
                Text,
                null,
                `${data.fromCity}${data.fromCity && data.fromCountry ? ', ' : ''}${data.fromCountry}`
              )
          ),
          React.createElement(
            View,
            { style: styles.column },
            React.createElement(Text, { style: styles.sectionTitle }, 'BILL TO'),
            React.createElement(Text, null, data.toName),
            React.createElement(Text, null, data.toEmail),
            data.toAddress && React.createElement(Text, null, data.toAddress),
            (data.toCity || data.toCountry) &&
              React.createElement(
                Text,
                null,
                `${data.toCity}${data.toCity && data.toCountry ? ', ' : ''}${data.toCountry}`
              )
          )
        ),

        // Date Section
        React.createElement(
          View,
          { style: styles.dateSection },
          React.createElement(
            View,
            { style: styles.dateBox },
            React.createElement(Text, { style: styles.dateLabel }, 'Invoice Date'),
            React.createElement(Text, null, new Date(data.invoiceDate).toLocaleDateString())
          ),
          React.createElement(
            View,
            { style: styles.dateBox },
            React.createElement(Text, { style: styles.dateLabel }, 'Due Date'),
            React.createElement(Text, null, new Date(data.dueDate).toLocaleDateString())
          )
        ),

        // Items Table
        React.createElement(
          View,
          { style: styles.table },
          React.createElement(
            View,
            { style: styles.tableHeader },
            React.createElement(Text, { style: styles.col1 }, 'DESCRIPTION'),
            React.createElement(Text, { style: styles.col2 }, 'QTY'),
            React.createElement(Text, { style: styles.col3 }, 'RATE'),
            React.createElement(Text, { style: styles.col4 }, 'AMOUNT')
          ),
          ...data.items.map((item: any, index: number) =>
            React.createElement(
              View,
              { key: index, style: styles.tableRow },
              React.createElement(Text, { style: styles.col1 }, item.description),
              React.createElement(Text, { style: styles.col2 }, item.quantity.toString()),
              React.createElement(Text, { style: styles.col3 }, `$${item.rate.toFixed(2)}`),
              React.createElement(Text, { style: styles.col4 }, `$${item.amount.toFixed(2)}`)
            )
          )
        ),

        // Totals Section
        React.createElement(
          View,
          { style: styles.totalSection },
          React.createElement(
            View,
            { style: styles.totalRow },
            React.createElement(Text, null, 'Subtotal:'),
            React.createElement(Text, null, `$${data.subtotal.toFixed(2)}`)
          ),
          data.tax > 0 &&
            React.createElement(
              View,
              { style: styles.totalRow },
              React.createElement(Text, null, `Tax (${data.tax}%):`),
              React.createElement(Text, null, `$${((data.subtotal * data.tax) / 100).toFixed(2)}`)
            ),
          data.discount > 0 &&
            React.createElement(
              View,
              { style: styles.totalRow },
              React.createElement(Text, null, `Discount (${data.discount}%):`),
              React.createElement(Text, null, `-$${((data.subtotal * data.discount) / 100).toFixed(2)}`)
            ),
          React.createElement(
            View,
            { style: { ...styles.totalRow, ...styles.totalDivider } },
            React.createElement(Text, null, 'Total:'),
            React.createElement(Text, { style: styles.totalAmount }, `$${data.total.toFixed(2)}`)
          )
        ),

        // Notes
        data.notes &&
          React.createElement(
            View,
            { style: styles.notesSection },
            React.createElement(Text, { style: styles.sectionHeader }, 'NOTES'),
            React.createElement(Text, null, data.notes)
          ),

        // Terms
        data.terms &&
          React.createElement(
            View,
            { style: styles.termsSection },
            React.createElement(Text, { style: styles.sectionHeader }, 'TERMS & CONDITIONS'),
            React.createElement(Text, null, data.terms)
          )
      )
    );

    // Generate PDF
    const pdfBlob = await pdf(InvoicePDF).toBlob();
    const buffer = await pdfBlob.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${data.invoiceNumber}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}