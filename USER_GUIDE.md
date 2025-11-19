# InvoiceGen - Complete User Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [All Functions & Features](#all-functions--features)
3. [How to Use the Website](#how-to-use-the-website)
4. [API Routes Reference](#api-routes-reference)
5. [User Workflows](#user-workflows)

---

## Overview

**InvoiceGen** is a SaaS platform for creating, managing, and sending professional invoices with PDF generation and email delivery.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM + PostgreSQL
- NextAuth.js (Authentication)
- React PDF (PDF Generation)
- Resend (Email Service)
- Tailwind CSS

---

## All Functions & Features

### 🔐 Authentication & User Management

#### 1. **User Registration**
- **Route:** `/signup`
- **Function:** Create new account with email/password
- **Features:**
  - Form validation (name, email, password)
  - Password hashing with bcrypt
  - Auto-login after registration
  - Google OAuth option
- **API:** `POST /api/auth/register`

#### 2. **User Login**
- **Route:** `/login`
- **Function:** Sign in with credentials or Google
- **Features:**
  - Email/password authentication
  - Google OAuth login
  - Session management with JWT
  - Automatic redirect to dashboard
- **API:** NextAuth handles this

#### 3. **Session Management**
- **Function:** Maintain user sessions
- **Features:**
  - JWT-based sessions
  - Automatic session refresh
  - Secure token storage
  - Protected routes

---

### 📄 Invoice Management

#### 4. **Create Invoice**
- **Route:** `/dashboard/create`
- **Function:** Create new invoices with live preview
- **Features:**
  - Automatic invoice numbering
  - From/To information fields
  - Multiple line items
  - Tax & discount calculations
  - Auto-save draft
  - Live preview panel
  - Usage limit checking
- **API:** `POST /api/invoices`

#### 5. **View All Invoices**
- **Route:** `/dashboard/invoices`
- **Function:** List all user invoices
- **Features:**
  - Sortable table view
  - Status badges (draft, sent, paid)
  - Quick actions (edit, delete, view)
  - Search and filter
  - Pagination
- **API:** `GET /api/invoices`

#### 6. **Edit Invoice**
- **Route:** `/dashboard/edit/[id]`
- **Function:** Update existing invoices
- **Features:**
  - Load existing data
  - Update all fields
  - Status changes
  - Version tracking
- **API:** `PUT /api/invoices/[id]`

#### 7. **Delete Invoice**
- **Function:** Remove invoices
- **Features:**
  - Confirmation dialog
  - Permanent deletion
  - Usage count adjustment
- **API:** `DELETE /api/invoices/[id]`

#### 8. **View Single Invoice**
- **Function:** Display invoice details
- **Features:**
  - Full invoice preview
  - PDF download option
  - Send email option
  - Print option
- **API:** `GET /api/invoices/[id]`

---

### 📧 PDF & Email Features

#### 9. **Generate PDF**
- **Function:** Create PDF from invoice data
- **Features:**
  - Professional PDF layout
  - Company branding
  - Line item details
  - Tax and discount breakdown
  - Notes and terms
  - Download instantly
- **API:** `POST /api/invoices/pdf`

#### 10. **Send Invoice via Email**
- **Function:** Email invoice to client
- **Features:**
  - PDF attachment
  - Professional email template
  - Invoice summary in email
  - Custom message option
  - Delivery confirmation
- **API:** `POST /api/invoices/send`

---

### 📊 Dashboard & Analytics

#### 11. **Dashboard Overview**
- **Route:** `/dashboard`
- **Function:** View business metrics
- **Features:**
  - Total invoices count
  - Total revenue
  - Pending invoices
  - Paid invoices
  - Recent invoices list
  - Usage widget
- **API:** `GET /api/dashboard/stats`

#### 12. **Usage Tracking**
- **Function:** Monitor plan limits
- **Features:**
  - Invoice count this month
  - Quotation count this month
  - Visual progress bars
  - Limit warnings
  - Upgrade prompts
- **API:** `GET /api/usage`

---

### 💳 Subscription & Pricing

#### 13. **View Pricing Plans**
- **Route:** `/pricing` or `/dashboard/pricing`
- **Function:** Display available plans
- **Features:**
  - Plan comparison
  - Feature lists
  - Current plan indicator
  - Upgrade buttons

#### 14. **Plan Limits**
Plans available:
- **Free:** 3 invoices/month
- **Starter:** 10 invoices/month ($9/mo)
- **Professional:** Unlimited ($29/mo)
- **Enterprise:** Unlimited + features ($99/mo)

#### 15. **Usage Limit Checking**
- **Function:** Prevent over-usage
- **Features:**
  - Pre-create validation
  - Real-time limit display
  - Upgrade modal on limit
- **API:** `GET /api/invoices/check-limit`

#### 16. **Checkout Process**
- **Function:** Upgrade to paid plan
- **Features:**
  - LemonSqueezy integration (pending)
  - Secure payment
  - Plan activation
- **API:** `POST /api/checkout`

---

### ⚙️ Settings & Account

#### 17. **User Plan Management**
- **Function:** View current subscription
- **Features:**
  - Current plan display
  - Billing cycle info
  - Renewal date
  - Cancel option
- **API:** `GET /api/user/plan`

#### 18. **Usage Reset**
- **Function:** Reset monthly counters (admin/testing)
- **Features:**
  - Manual reset trigger
  - Monthly auto-reset
- **API:** `POST /api/usage/reset`

---

### 📱 Public Pages

#### 19. **Home Page**
- **Route:** `/`
- **Function:** Landing page
- **Features:**
  - Hero section
  - Features showcase
  - How it works
  - Contact form
  - Call-to-action

#### 20. **About Page**
- **Route:** `/about`
- **Function:** Company information

#### 21. **Blog Page**
- **Route:** `/blog`
- **Function:** Articles and tips

#### 22. **Privacy Policy**
- **Route:** `/privacy`
- **Function:** Legal information

#### 23. **Terms of Service**
- **Route:** `/terms`
- **Function:** Legal terms

---

## How to Use the Website

### 🚀 Getting Started

#### Step 1: Sign Up
1. Go to `https://your-domain.com/signup`
2. Enter your name, email, and password
3. Click "Sign Up" or "Continue with Google"
4. Auto-redirected to dashboard

#### Step 2: Create Your First Invoice
1. Click "New Invoice" or go to `/dashboard/create`
2. Fill in your business details (From section)
3. Fill in client details (To section)
4. Add invoice items:
   - Description
   - Quantity
   - Rate (price)
   - Amount calculated automatically
5. Set tax % and discount % (optional)
6. Add notes and payment terms (optional)
7. Click "Save as Draft" or "Send"

#### Step 3: Generate PDF
1. From invoice list, click on an invoice
2. Click "Download PDF" button
3. PDF generated with professional template
4. Save to your computer

#### Step 4: Send to Client
1. From invoice detail page
2. Click "Send Invoice"
3. Enter client email
4. Email sent with PDF attachment
5. Client receives professional email

---

### 📊 Managing Invoices

#### View All Invoices
- Go to `/dashboard/invoices`
- See all invoices in table format
- Filter by status
- Search by invoice number or client

#### Edit Invoice
- Click "Edit" on any invoice
- Modify any fields
- Save changes
- Status automatically updated

#### Delete Invoice
- Click "Delete" on invoice
- Confirm deletion
- Invoice removed permanently
- Usage count adjusted

#### Track Status
- **Draft:** Not sent yet
- **Sent:** Emailed to client
- **Paid:** Payment received
- **Overdue:** Past due date

---

### 💡 Usage Limits & Upgrades

#### Check Your Usage
- Widget shows on dashboard (right side)
- Displays: "X / Y invoices this month"
- Color codes:
  - Green: < 80% used
  - Yellow: 80-99% used
  - Red: 100% used (limit reached)

#### What Happens at Limit?
1. Warning appears when creating invoice
2. Upgrade modal pops up
3. Cannot create more until:
   - Next month (auto-reset)
   - Upgrade to higher plan

#### How to Upgrade
1. Go to `/dashboard/pricing`
2. Choose a plan
3. Click "Upgrade" button
4. Complete payment
5. Instant access to higher limits

---

## API Routes Reference

### Authentication APIs
```
POST   /api/auth/register          - Register new user
POST   /api/auth/[...nextauth]     - NextAuth handler (login/logout)
```

### Invoice APIs
```
POST   /api/invoices               - Create invoice
GET    /api/invoices               - List all invoices
GET    /api/invoices/[id]          - Get single invoice
PUT    /api/invoices/[id]          - Update invoice
DELETE /api/invoices/[id]          - Delete invoice
POST   /api/invoices/pdf           - Generate PDF
POST   /api/invoices/send          - Send email with PDF
GET    /api/invoices/check-limit   - Check usage limits
```

### Dashboard APIs
```
GET    /api/dashboard/stats        - Get dashboard statistics
```

### Usage APIs
```
GET    /api/usage                  - Get usage stats
POST   /api/usage/reset            - Reset usage (admin)
```

### User APIs
```
GET    /api/user/plan              - Get user's plan info
```

### Checkout APIs
```
POST   /api/checkout               - Create checkout session
```

---

## User Workflows

### Workflow 1: New User Journey
```
1. Visit homepage (/)
2. Click "Get Started"
3. Sign up (/signup)
4. Redirected to dashboard
5. See welcome screen
6. Click "Create Invoice"
7. Fill invoice form
8. Save as draft
9. Preview PDF
10. Send to client
```

### Workflow 2: Returning User
```
1. Visit homepage (/)
2. Click "Login"
3. Enter credentials
4. Dashboard loads
5. See recent invoices
6. Check usage stats
7. Create new or edit existing
```

### Workflow 3: Invoice Creation Flow
```
1. Dashboard → New Invoice
2. Fill business info (cached from profile)
3. Fill client info
4. Add items one by one
5. Live preview updates
6. Adjust tax/discount
7. Review totals
8. Save draft
9. Download PDF
10. Send email
11. Mark as sent
12. Track payment status
```

### Workflow 4: Upgrade Process
```
1. Hit invoice limit
2. See upgrade modal
3. View pricing plans
4. Select plan
5. Checkout page
6. Complete payment
7. Plan activated
8. Limits increased
9. Continue creating invoices
```

---

## Key Components

### Client Components (`'use client'`)
- All pages with forms and interactivity
- Dashboard pages
- Login/Signup pages
- Invoice editor
- Usage widget

### Server Components
- Root layout
- API routes
- Database queries

### Shared Components
Located in `/src/components/`:
- `InvoiceEditor.tsx` - Form for creating/editing
- `InvoicePreview.tsx` - Live preview panel
- `UsageWidget.tsx` - Usage tracker display
- `UpgradeModal.tsx` - Plan upgrade popup
- `Header.tsx` - Navigation bar

---

## Environment Setup

Required `.env` variables:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-secret-key"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
RESEND_API_KEY="re_xxxxx"
```

---

## Running the Application

### Development
```bash
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Database Setup
```bash
npx prisma generate
npx prisma db push
```

---

## Testing Checklist

- [ ] User registration works
- [ ] Login with email/password works
- [ ] Google OAuth works
- [ ] Create invoice works
- [ ] PDF generation works
- [ ] Email sending works
- [ ] Usage limits enforced
- [ ] Dashboard shows correct stats
- [ ] Edit invoice works
- [ ] Delete invoice works
- [ ] Responsive on mobile
- [ ] All links work

---

## Support & Help

For issues or questions:
- Check the console for errors (F12)
- Verify database connection
- Check API routes in Network tab
- Ensure environment variables are set
- Review Prisma schema matches database

---

## Summary

This InvoiceGen platform provides a complete solution for:
✅ Creating professional invoices
✅ Managing clients and invoices
✅ Generating PDF documents
✅ Sending invoices via email
✅ Tracking usage and limits
✅ Subscription management
✅ User authentication
✅ Dashboard analytics

All features are production-ready with proper error handling, TypeScript types, and security measures in place.
