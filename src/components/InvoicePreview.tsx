'use client';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromCity: string;
  fromCountry: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  toCity: string;
  toCountry: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  tax: number;
  discount: number;
  notes: string;
  terms: string;
}

export default function InvoicePreview({ invoiceData }: { invoiceData: InvoiceData }) {
  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * invoiceData.tax) / 100;
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    return subtotal + taxAmount - discountAmount;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#e9eaea] p-8 min-h-[800px]">
      {/* Header */}
      <div className="border-b-2 border-[#fcc425] pb-6 mb-6">
        <h1 className="text-4xl font-bold text-[#464646] mb-2">INVOICE</h1>
        <p className="text-[#bebebf]">{invoiceData.invoiceNumber}</p>
      </div>

      {/* From & To Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-[#bebebf] mb-2">FROM</h3>
          <div className="text-[#464646]">
            <p className="font-semibold">{invoiceData.fromName || 'Your Name'}</p>
            <p className="text-sm">{invoiceData.fromEmail || 'your@email.com'}</p>
            {invoiceData.fromAddress && <p className="text-sm">{invoiceData.fromAddress}</p>}
            {(invoiceData.fromCity || invoiceData.fromCountry) && (
              <p className="text-sm">
                {invoiceData.fromCity}
                {invoiceData.fromCity && invoiceData.fromCountry && ', '}
                {invoiceData.fromCountry}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#bebebf] mb-2">BILL TO</h3>
          <div className="text-[#464646]">
            <p className="font-semibold">{invoiceData.toName || 'Client Name'}</p>
            <p className="text-sm">{invoiceData.toEmail || 'client@email.com'}</p>
            {invoiceData.toAddress && <p className="text-sm">{invoiceData.toAddress}</p>}
            {(invoiceData.toCity || invoiceData.toCountry) && (
              <p className="text-sm">
                {invoiceData.toCity}
                {invoiceData.toCity && invoiceData.toCountry && ', '}
                {invoiceData.toCountry}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-[#fcfcfc] p-4 rounded-lg">
        <div>
          <p className="text-sm text-[#bebebf]">Invoice Date</p>
          <p className="font-semibold text-[#464646]">
            {invoiceData.invoiceDate ? new Date(invoiceData.invoiceDate).toLocaleDateString() : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#bebebf]">Due Date</p>
          <p className="font-semibold text-[#464646]">
            {invoiceData.dueDate ? new Date(invoiceData.dueDate).toLocaleDateString() : '-'}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#e9eaea]">
              <th className="text-left py-3 text-sm font-semibold text-[#bebebf]">DESCRIPTION</th>
              <th className="text-right py-3 text-sm font-semibold text-[#bebebf]">QTY</th>
              <th className="text-right py-3 text-sm font-semibold text-[#bebebf]">RATE</th>
              <th className="text-right py-3 text-sm font-semibold text-[#bebebf]">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-[#e9eaea]">
                <td className="py-3 text-[#464646]">{item.description || 'Item description'}</td>
                <td className="py-3 text-right text-[#464646]">{item.quantity}</td>
                <td className="py-3 text-right text-[#464646]">${item.rate.toFixed(2)}</td>
                <td className="py-3 text-right text-[#464646] font-semibold">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#bebebf]">Subtotal:</span>
            <span className="text-[#464646] font-semibold">${calculateSubtotal().toFixed(2)}</span>
          </div>
          {invoiceData.tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#bebebf]">Tax ({invoiceData.tax}%):</span>
              <span className="text-[#464646] font-semibold">
                ${((calculateSubtotal() * invoiceData.tax) / 100).toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#bebebf]">Discount ({invoiceData.discount}%):</span>
              <span className="text-[#464646] font-semibold">
                -${((calculateSubtotal() * invoiceData.discount) / 100).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-[#fcc425]">
            <span className="text-[#464646]">Total:</span>
            <span className="text-[#fcc425]">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#bebebf] mb-2">NOTES</h3>
          <p className="text-sm text-[#464646] whitespace-pre-wrap">{invoiceData.notes}</p>
        </div>
      )}

      {/* Terms */}
      {invoiceData.terms && (
        <div>
          <h3 className="text-sm font-semibold text-[#bebebf] mb-2">TERMS & CONDITIONS</h3>
          <p className="text-sm text-[#464646] whitespace-pre-wrap">{invoiceData.terms}</p>
        </div>
      )}
    </div>
  );
}