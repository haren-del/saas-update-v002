'use client';

import { Plus, Trash2, Save, Send, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

interface InvoiceEditorProps {
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
  isEditing?: boolean;
  invoiceId?: string;
}

export default function InvoiceEditor({ 
  invoiceData, 
  setInvoiceData,
  isEditing = false,
  invoiceId = ''
}: InvoiceEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const updateField = (field: string, value: any) => {
    setInvoiceData({ ...invoiceData, [field]: value });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * invoiceData.tax) / 100;
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    return subtotal + taxAmount - discountAmount;
  };

  // ⭐ UPDATED FUNCTION WITH LIMIT CHECK
  const handleSave = async (status: string = 'draft') => {
    setLoading(true);
    setMessage('');

    try {
      // Choose URL and method based on whether we're editing or creating
      const url = isEditing ? `/api/invoices/${invoiceId}` : '/api/invoices';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...invoiceData,
          subtotal: calculateSubtotal(),
          total: calculateTotal(),
          status,
        }),
      });

      const data = await response.json();

      // ⭐ CHECK IF LIMIT REACHED
      if (!response.ok) {
        if (data.limitReached) {
          setMessage(data.error || 'You have reached your invoice limit for this month.');
          
          // Show upgrade prompt
          const shouldUpgrade = confirm(
            `${data.error}\n\nWould you like to upgrade your plan to create unlimited invoices?`
          );
          
          if (shouldUpgrade) {
            router.push('/dashboard/pricing');
          }
          return;
        }
        throw new Error('Failed to save invoice');
      }
      
      // Success messages
      if (isEditing) {
        setMessage('Invoice updated successfully!');
        if (status === 'sent') {
          setMessage('Invoice updated and sent via email!');
        }
      } else {
        setMessage('Invoice saved successfully!');
        if (status === 'sent') {
          setMessage('Invoice saved and sent via email!');
        }
      }

      setTimeout(() => {
        router.push('/dashboard/invoices');
      }, 1500);
    } catch (error) {
      setMessage('Error saving invoice');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      // ⭐ NEW: Check if user can download (check plan)
      const userResponse = await fetch('/api/user/plan');
      const userData = await userResponse.json();
      
      // Free users must save invoice first (counts against limit)
      if (userData.plan === 'free' && !isEditing) {
        setMessage('Free plan users must save the invoice before downloading. Click "Save Draft" first.');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/invoices/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...invoiceData,
          subtotal: calculateSubtotal(),
          total: calculateTotal(),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceData.invoiceNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setMessage('PDF downloaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error generating PDF');
      console.error('PDF error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* From Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#464646] mb-3">From</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={invoiceData.fromName}
            onChange={(e) => updateField('fromName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={invoiceData.fromEmail}
            onChange={(e) => updateField('fromEmail', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <input
            type="text"
            placeholder="Address"
            value={invoiceData.fromAddress}
            onChange={(e) => updateField('fromAddress', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              value={invoiceData.fromCity}
              onChange={(e) => updateField('fromCity', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
            <input
              type="text"
              placeholder="Country"
              value={invoiceData.fromCountry}
              onChange={(e) => updateField('fromCountry', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
          </div>
        </div>
      </div>

      {/* To Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#464646] mb-3">Bill To</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Client Name"
            value={invoiceData.toName}
            onChange={(e) => updateField('toName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <input
            type="email"
            placeholder="Client Email"
            value={invoiceData.toEmail}
            onChange={(e) => updateField('toEmail', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <input
            type="text"
            placeholder="Address"
            value={invoiceData.toAddress}
            onChange={(e) => updateField('toAddress', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              value={invoiceData.toCity}
              onChange={(e) => updateField('toCity', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
            <input
              type="text"
              placeholder="Country"
              value={invoiceData.toCountry}
              onChange={(e) => updateField('toCountry', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div>
        <h3 className="text-lg font-semibold text-[#464646] mb-3">Invoice Details</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceData.invoiceNumber}
            onChange={(e) => updateField('invoiceNumber', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#bebebf] mb-1">Invoice Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#bebebf] mb-1">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-[#464646]">Items</h3>
          <button
            onClick={addItem}
            className="flex items-center space-x-1 text-[#fcc425] hover:text-[#fae29b] transition"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-semibold">Add Item</span>
          </button>
        </div>
        <div className="space-y-3">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="bg-[#fcfcfc] p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-[#464646]">Item {index + 1}</span>
                {invoiceData.items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={item.amount}
                  readOnly
                  className="w-full px-3 py-2 rounded border border-[#e9eaea] bg-[#e9eaea] cursor-not-allowed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Discount */}
      <div>
        <h3 className="text-lg font-semibold text-[#464646] mb-3">Additional</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-[#bebebf] mb-1">Tax (%)</label>
            <input
              type="number"
              value={invoiceData.tax}
              onChange={(e) => updateField('tax', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#bebebf] mb-1">Discount (%)</label>
            <input
              type="number"
              value={invoiceData.discount}
              onChange={(e) => updateField('discount', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
            />
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      <div>
        <h3 className="text-lg font-semibold text-[#464646] mb-3">Notes & Terms</h3>
        <div className="space-y-3">
          <textarea
            placeholder="Notes (visible to client)"
            value={invoiceData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
          <textarea
            placeholder="Terms & Conditions"
            value={invoiceData.terms}
            onChange={(e) => updateField('terms', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-[#e9eaea] focus:outline-none focus:border-[#fcc425]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-[#e9eaea]">
        <button
          onClick={() => handleSave('draft')}
          disabled={loading}
          className="flex-1 bg-[#e9eaea] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#bebebf] transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Update Draft' : 'Save Draft'}</span>
        </button>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="flex-1 bg-[#fae29b] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#fcc425] transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={() => handleSave('sent')}
          disabled={loading}
          className="flex-1 bg-[#fcc425] text-[#464646] py-3 rounded-lg font-semibold hover:bg-[#fae29b] transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{isEditing ? 'Update & Send' : 'Save & Send'}</span>
        </button>
      </div>

      {/* Summary */}
      <div className="bg-[#fcfcfc] p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#bebebf]">Subtotal:</span>
          <span className="text-[#464646] font-semibold">${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#bebebf]">Tax ({invoiceData.tax}%):</span>
          <span className="text-[#464646] font-semibold">${((calculateSubtotal() * invoiceData.tax) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#bebebf]">Discount ({invoiceData.discount}%):</span>
          <span className="text-[#464646] font-semibold">-${((calculateSubtotal() * invoiceData.discount) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#e9eaea]">
          <span className="text-[#464646]">Total:</span>
          <span className="text-[#fcc425]">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}