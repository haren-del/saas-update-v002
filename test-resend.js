// Test script to verify Resend API is working
// Run with: node test-resend.js

const { Resend } = require('resend');

// Your API key from .env
const RESEND_API_KEY = 're_G4JeDSo9_AyMUg1TVbWCntPxsHLjYyjS1';

const resend = new Resend(RESEND_API_KEY);

async function testEmail() {
  try {
    console.log('🚀 Testing Resend API...\n');
    
    // IMPORTANT: Change this to an email verified in your Resend dashboard
    // OR the email you used to sign up for Resend
    const testEmail = 'cloudmine123@gmail.com'; // Change this!
    
    console.log(`📧 Sending test email to: ${testEmail}`);
    console.log(`📤 From: onboarding@resend.dev\n`);
    
    const { data, error } = await resend.emails.send({
      from: 'InvoiceGen Test <onboarding@resend.dev>',
      to: testEmail,
      subject: 'Test Email from InvoiceGen',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h1 style="color: #fcc425;">🎉 Email Test Successful!</h1>
          <p>This is a test email from your InvoiceGen application.</p>
          <p>If you received this, your Resend configuration is working correctly!</p>
          <hr>
          <p style="color: #888; font-size: 12px;">
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ ERROR sending email:', error);
      console.log('\n💡 Common issues:');
      console.log('   1. Email address not verified in Resend');
      console.log('   2. Invalid API key');
      console.log('   3. Free plan restrictions');
      console.log('\n📋 Next steps:');
      console.log('   - Go to https://resend.com/emails');
      console.log('   - Check if email appears in logs');
      console.log('   - Verify recipient email in Resend dashboard');
      return;
    }

    console.log('✅ Email sent successfully!');
    console.log(`📨 Email ID: ${data.id}`);
    console.log('\n🔍 Check:');
    console.log(`   - Gmail inbox: ${testEmail}`);
    console.log('   - Spam folder');
    console.log('   - Promotions tab');
    console.log('   - Resend dashboard: https://resend.com/emails');
    console.log('\n⏰ Email should arrive within 1-2 minutes');
    
  } catch (err) {
    console.error('❌ Exception:', err);
  }
}

// Run the test
testEmail();
