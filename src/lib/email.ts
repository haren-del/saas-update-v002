import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendInvoiceEmailParams {
  to: string;
  invoiceNumber: string;
  invoiceDate: string;
  total: string;
  pdfUrl?: string;
  pdfBuffer?: Buffer;
  fromName: string;
}

export async function sendInvoiceEmail({
  to,
  invoiceNumber,
  invoiceDate,
  total,
  pdfUrl,
  pdfBuffer,
  fromName,
}: SendInvoiceEmailParams) {
  try {
    const attachments = [];
    
    if (pdfBuffer) {
      attachments.push({
        filename: `invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'InvoiceGen <onboarding@resend.dev>', // Change this after domain verification
      to: [to],
      subject: `Invoice ${invoiceNumber} from ${fromName}`,
      html: getInvoiceEmailTemplate({
        invoiceNumber,
        invoiceDate,
        total,
        fromName,
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending exception:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

function getInvoiceEmailTemplate({
  invoiceNumber,
  invoiceDate,
  total,
  fromName,
}: {
  invoiceNumber: string;
  invoiceDate: string;
  total: string;
  fromName: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${invoiceNumber}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Invoice Received</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            You have received a new invoice from <strong>${fromName}</strong>.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Invoice Number:</td>
                <td style="padding: 10px 0; text-align: right;">${invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Invoice Date:</td>
                <td style="padding: 10px 0; text-align: right;">${invoiceDate}</td>
              </tr>
              <tr style="border-top: 2px solid #eee;">
                <td style="padding: 15px 0; font-weight: bold; font-size: 18px; color: #667eea;">Total Amount:</td>
                <td style="padding: 15px 0; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">${total}</td>
              </tr>
            </table>
          </div>
          
          <p style="font-size: 16px; margin: 20px 0;">
            Please find the invoice attached to this email. If you have any questions, please contact ${fromName} directly.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 14px;">
            <p>This email was sent from InvoiceGen</p>
            <p style="margin-top: 10px;">
              <a href="https://yourdomain.com" style="color: #667eea; text-decoration: none;">Visit InvoiceGen</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Password reset email
interface SendPasswordResetEmailParams {
  to: string;
  resetToken: string;
  userName?: string;
}

export async function sendPasswordResetEmail({
  to,
  resetToken,
  userName,
}: SendPasswordResetEmailParams) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'InvoiceGen <onboarding@resend.dev>',
      to: [to],
      subject: 'Reset Your Password - InvoiceGen',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Reset Password</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Reset Your Password</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px;">Hello ${userName || 'there'},</p>
              
              <p style="font-size: 16px;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666;">
                Or copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
              </p>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 14px;">
                <p>InvoiceGen - Invoice Management Made Easy</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Password reset email error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Password reset email exception:', error);
    return { success: false, error: 'Failed to send email' };
  }
}