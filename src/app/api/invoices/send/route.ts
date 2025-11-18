import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/email';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

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

    // Generate PDF
    const pdfDoc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.text}>{invoice.fromName}</Text>
                <Text style={styles.text}>{invoice.fromEmail}</Text>
                {invoice.fromAddress && <Text style={styles.text}>{invoice.fromAddress}</Text>}
                {invoice.fromCity && <Text style={styles.text}>{invoice.fromCity}</Text>}
              </View>

              <View style={styles.col}>
                <Text style={styles.label}>To:</Text>
                <Text style={styles.text}>{invoice.toName}</Text>
                <Text style={styles.text}>{invoice.toEmail}</Text>
                {invoice.toAddress && <Text style={styles.text}>{invoice.toAddress}</Text>}
                {invoice.toCity && <Text style={styles.text}>{invoice.toCity}</Text>}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Invoice Date:</Text>
                <Text style={styles.text}>
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Due Date:</Text>
                <Text style={styles.text}>
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.descriptionCell]}>Description</Text>
              <Text style={styles.tableCell}>Quantity</Text>
              <Text style={styles.tableCell}>Price</Text>
              <Text style={styles.tableCell}>Amount</Text>
            </View>

            {(invoice.items as any[]).map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>${item.price}</Text>
                <Text style={styles.tableCell}>${item.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>${invoice.subtotal.toFixed(2)}</Text>
            </View>
            {invoice.tax > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax:</Text>
                <Text style={styles.totalValue}>${invoice.tax.toFixed(2)}</Text>
              </View>
            )}
            {invoice.discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount:</Text>
                <Text style={styles.totalValue}>-${invoice.discount.toFixed(2)}</Text>
              </View>
            )}
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${invoice.total.toFixed(2)}</Text>
            </View>
          </View>

          {invoice.notes && (
            <View style={styles.notes}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.text}>{invoice.notes}</Text>
            </View>
          )}
        </Page>
      </Document>
    );

    // Generate PDF buffer
    const pdfBuffer = await pdf(pdfDoc).toBuffer();

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

  } catch (error) {
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