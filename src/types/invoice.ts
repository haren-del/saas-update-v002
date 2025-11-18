export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id?: string;
  invoiceNumber: string;
  userId?: string;
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
  invoiceDate: string | Date;
  dueDate: string | Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  terms?: string;
  status?: string;
  pdfUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateInvoiceRequest {
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
  status?: string;
}

export interface UpdateInvoiceRequest extends CreateInvoiceRequest {
  id: string;
}

export interface SendInvoiceRequest {
  invoiceId: string;
  recipientEmail: string;
}
