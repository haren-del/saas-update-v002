# Email Issues - Troubleshooting Guide

## ❌ PROBLEM: Emails Not Being Received

### Issues Identified:
1. Password reset emails not received
2. Welcome/confirmation emails not configured for new signups
3. Users go directly to dashboard without email verification

---

## 🔧 FIXES APPLIED

### 1. Enhanced Error Logging
**File:** `src/app/api/auth/forgot-password/route.ts`

Added detailed console logging:
- Email sending attempt
- Reset URL generated
- API key presence check
- Resend API response
- Error details if sending fails

### 2. Check Terminal Output
After requesting password reset, check your terminal/console for:
```
Attempting to send password reset email to: cloudmine123@gmail.com
Reset URL: http://localhost:3000/reset-password/[token]
API Key present: true
Resend API response: { data: { id: '...' }, error: null }
Email sent successfully! ID: ...
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue #1: Resend API Free Plan Limitations

**Problem:** Resend free plan only allows sending to **verified email addresses**

**Solution:**
1. Go to https://resend.com/dashboard
2. Navigate to "Domains" or "Email Addresses"  
3. Add and verify `cloudmine123@gmail.com`
4. Or add your domain and verify it

**Temporary Workaround:**
Use the email you signed up with Resend (it's automatically verified)

---

### Issue #2: API Key Configuration

**Your `.env` file has duplicate entries:**
```env
# Line 23
RESEND_API_KEY="re_your_resend_api_key"

# Line 31  
RESEND_API_KEY="re_G4JeDSo9_AyMUg1TVbWCntPxsHLjYyjS1"
```

**Fix:** Clean up `.env` file

```env
# Keep only one (the real one on line 31)
RESEND_API_KEY="re_G4JeDSo9_AyMUg1TVbWCntPxsHLjYyjS1"
```

**After fixing, restart your dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue #3: Email Going to Spam

**Check:**
1. Gmail Spam folder
2. Gmail "Promotions" tab  
3. Gmail "Updates" tab

**Mark as "Not Spam"** if found there

---

### Issue #4: Resend Domain Not Verified

**Current:** Sending from `onboarding@resend.dev` (Resend's test domain)

**Limitations:**
- Only works with verified recipient emails
- Limited sending volume
- May be blocked by some email providers

**Production Solution:**
1. Buy a domain (e.g., invoicegen.com)
2. Add domain to Resend
3. Add DNS records (SPF, DKIM, DMARC)
4. Verify domain
5. Update `.env`:
   ```env
   # Update from line
   from: 'InvoiceGen <onboarding@resend.dev>'
   # To
   from: 'InvoiceGen <noreply@yourdomain.com>'
   ```

---

## ✅ TESTING STEPS

### Test 1: Check if Resend is Working

1. Open terminal where `npm run dev` is running
2. Go to `/forgot-password`
3. Enter: `cloudmine123@gmail.com`
4. Click "Send Reset Link"
5. **Check terminal output** for:
   ```
   Attempting to send password reset email to: cloudmine123@gmail.com
   API Key present: true
   ```

### Test 2: Verify Email Sent

If you see in terminal:
```
Email sent successfully! ID: abc123...
```

Then email WAS sent! Check:
- All Gmail tabs (Primary, Promotions, Updates, Spam)
- Wait 1-2 minutes (email can be delayed)

### Test 3: Use Verified Email

1. Check what email you used to sign up for Resend
2. Create a test user with that email
3. Try password reset with that email
4. Should work immediately

---

## 🔑 RESEND FREE PLAN LIMITS

**What Free Plan Allows:**
- ✅ 100 emails/day
- ✅ 1 verified domain
- ⚠️ **ONLY sends to verified emails**
- ❌ No custom domains (uses onboarding@resend.dev)

**To Send to Any Email:**
- Upgrade to paid plan ($20/month for 50k emails)
- OR verify each recipient email in Resend dashboard

---

## 🚀 QUICK FIX: Test with Your Own Email

1. **Find your Resend signup email:**
   - Check the email you used to create Resend account
   - This email is automatically verified

2. **Test password reset with that email:**
   ```
   1. Create user with your Resend email
   2. Try forgot password
   3. Should receive email immediately
   ```

3. **If that works, the issue is:**
   - `cloudmine123@gmail.com` is not verified in Resend
   - Need to verify it or upgrade plan

---

## 📧 WELCOME EMAIL (Not Implemented Yet)

Currently, new signups don't send confirmation emails.

**To add welcome email:**

### Option A: Simple Welcome (No Verification)

Add to `/api/auth/register/route.ts` after user creation:

```typescript
// After user is created
if (process.env.RESEND_API_KEY) {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'InvoiceGen <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to InvoiceGen!',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Your account has been created successfully.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/login">Login now</a></p>
      `
    });
  } catch (err) {
    console.error('Welcome email error:', err);
  }
}
```

### Option B: Email Verification (Recommended)

Requires:
1. Add `emailVerified` field (already exists)
2. Generate verification token
3. Send verification email
4. Verify email before allowing login
5. Update 3-4 hours of work

---

## 🛠️ IMMEDIATE ACTION ITEMS

### Priority 1: Fix `.env` File
```bash
# Edit .env file
# Remove duplicate RESEND_API_KEY on line 23
# Keep only line 31
```

### Priority 2: Restart Server
```bash
# Terminal
Ctrl+C  # Stop server
npm run dev  # Restart
```

### Priority 3: Check Terminal Logs
```bash
# Try password reset again
# Watch terminal for:
# "Email sent successfully!"
# or error messages
```

### Priority 4: Verify Recipient Email in Resend
```bash
# Go to: https://resend.com/dashboard
# Add cloudmine123@gmail.com to verified emails
# OR
# Test with your Resend signup email
```

---

## 📊 EMAIL DELIVERY CHECK

### If Terminal Shows "Email sent successfully"

Email WAS sent! Check these locations:

**Gmail:**
1. Primary Inbox
2. Promotions Tab
3. Updates Tab  
4. Social Tab
5. Spam Folder
6. All Mail (search: "InvoiceGen")

**Wait Time:**
- Usually instant (< 10 seconds)
- Can take up to 2 minutes
- If > 5 minutes, likely spam/blocked

---

## 💡 DEBUGGING COMMANDS

### Check Environment Variables
```bash
# In project root
node -e "console.log(require('dotenv').config(); process.env.RESEND_API_KEY)"
```

### Test Resend API Directly
```bash
# Create test-email.js
const { Resend } = require('resend');
const resend = new Resend('re_G4JeDSo9_AyMUg1TVbWCntPxsHLjYyjS1');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'your-verified-email@gmail.com',
  subject: 'Test Email',
  html: '<p>Test</p>'
}).then(console.log).catch(console.error);
```

```bash
# Run test
node test-email.js
```

---

## 🎯 NEXT STEPS

1. ✅ Clean up `.env` (remove duplicate)
2. ✅ Restart dev server
3. ✅ Test password reset again
4. ✅ Check terminal logs
5. ⚠️ Verify email in Resend dashboard
6. ⚠️ Check all Gmail folders
7. ⚠️ Consider upgrading Resend plan
8. ⚠️ Add welcome emails for new users

---

## 📞 STILL NOT WORKING?

### Check Resend Dashboard
1. Go to https://resend.com/emails
2. See recent sent emails
3. Check delivery status
4. View error messages

### Check Resend Logs
- Shows if email was sent
- Shows if email was delivered
- Shows bounce/spam reports

### Contact Resend Support
- Free plan includes email support
- Usually respond within 24 hours

---

_Last Updated: 2025-11-18_
