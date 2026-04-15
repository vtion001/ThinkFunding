# IMPLEMENTATION GUIDELINES - PHASE 1 FRONTEND
## Think Funding LLC - Developer Prompts & Specifications

**Version:** 1.0  
**Date:** April 14, 2026  
**Purpose:** Detailed implementation prompts for Phase 1A frontend development

---

## TABLE OF CONTENTS

1. [Brand Implementation Guide](#1-brand-implementation-guide)
2. [Public Website Implementation](#2-public-website-implementation)
3. [Merchant Portal Implementation](#3-merchant-portal-implementation)
4. [Internal Operations UI Implementation](#4-internal-operations-ui-implementation)
5. [Component Specifications](#5-component-specifications)
6. [API Integration Guide](#6-api-integration-guide)
7. [Authentication Flow](#7-authentication-flow)

---

## 1. BRAND IMPLEMENTATION GUIDE

### CSS Variables Setup

```css
/* Copy this to your global styles or CSS variables file */

:root {
  /* Primary Colors - Navy (Trust/Stability) */
  --color-navy: #0B2D4E;
  --color-navy-dark: #061A2C;
  --color-navy-light: #1A4A7A;
  
  /* Primary Colors - Teal (Growth/Motion) */
  --color-teal: #199B93;
  --color-teal-dark: #147A74;
  --color-teal-light: #E6F5F4;
  
  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Status Colors */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-danger: #EF4444;
  --color-danger-light: #FEE2E2;
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
  
  /* Gradients */
  --gradient-navy-teal: linear-gradient(135deg, #0B2D4E 0%, #199B93 100%);
  --gradient-hero: linear-gradient(180deg, #0B2D4E 0%, #1A4A7A 100%);
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Spacing */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

### Font Loading

```html
<!-- Add to your HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 2. PUBLIC WEBSITE IMPLEMENTATION

### 2.1 Header Component

**Prompt for LLM/Developer:**
```
Create a sticky header component for Think Funding LLC with:
- Logo on the left (TF shield logo with "Think Funding" text)
- Navigation links: How It Works | About | FAQ | Contact
- CTA Button on right: "Apply Now" with navy background (#0B2D4E)
- Mobile: Hamburger menu with slide-out navigation
- Height: 72px desktop, 64px mobile
- Background: white with subtle shadow on scroll
- On scroll past 100px: add box-shadow

Use the brand colors:
- Navy: #0B2D4E
- Teal: #199B93

Implementation: React component with useState for mobile menu toggle and scroll detection.
```

### 2.2 Hero Section

**Prompt for LLM/Developer:**
```
Create a hero section for Think Funding LLC landing page:

CONTENT:
- Headline: "Smarter Funding for Growing Businesses"
- Subheadline: "Fast, disciplined merchant cash advances that help established businesses access the capital they need."
- Primary CTA Button: "Get Started" (teal #199B93 background, white text, 16px 32px padding)
- Secondary CTA Button: "Learn More" (transparent with white border)

DESIGN:
- Background: Gradient from #0B2D4E to #1A4A7A (navy gradient)
- Min-height: 600px desktop, 500px mobile
- Centered text with max-width 800px
- Add professional hero image placeholder below text
- Image: Business meeting photo, 600px max-width, rounded corners

RESPONSIVE:
- Stack CTAs vertically on mobile
- Reduce padding on mobile
- Adjust typography sizes
```

### 2.3 Value Props Section

**Prompt for LLM/Developer:**
```
Create a 4-column value props section:

COLUMNS (desktop 4, tablet 2, mobile 1):
1. ⚡ Fast Decisions
   - Icon: Lightning bolt
   - Text: "Decisions in as little as 24 hours"

2. 📋 Transparent Terms
   - Icon: Clipboard
   - Text: "No hidden fees or surprise charges"

3. 🛡️ Trusted Partner
   - Icon: Shield
   - Text: "We're here when you need us"

4. 🤝 Simple Process
   - Icon: Handshake
   - Text: "Four easy steps to funding"

DESIGN:
- Icon container: 64x64px, background #E6F5F4 (teal-light), border-radius 12px
- Icons: 32px, color #199B93 (teal)
- Card titles: 20px, font-weight 600, color #0B2D4E (navy)
- Card descriptions: 16px, color #6B7280 (gray-500)

WHITE SECTION WITH 80px VERTICAL PADDING
```

### 2.4 How It Works Section

**Prompt for LLM/Developer:**
```
Create a "How It Works" section with 4 horizontal steps:

STEPS:
1. Apply
   - Icon: Document
   - Description: "Complete our simple online application"

2. Review
   - Icon: Chart
   - Description: "We review your application and bank statements"

3. Fund
   - Icon: Money
   - Description: "Funds deposited directly into your account"

4. Repay
   - Icon: Calendar
   - Description: "Daily ACH payments based on your schedule"

DESIGN:
- Background: #F9FAFB (gray-50)
- Step circles: 80px diameter, navy background (#0B2D4E), white numbers
- Connector arrows between circles: 60px teal (#199B93) arrows (hidden on mobile)
- Step cards below circles: white background, rounded-lg, padding-24px, shadow-md
- Number circles should be connected by arrows/lines

MOBILE: Stack vertically, hide arrows
```

### 2.5 Requirements Section

**Prompt for LLM/Developer:**
```
Create an eligibility requirements section:

REQUIREMENTS (checklist style):
✓ 2+ Years in Business
✓ $30,000+ Monthly Revenue
✓ Low NSF History (fewer than 3 per month)
✓ Active Bank Account
✓ U.S.-Based Business

DESIGN:
- Container: max-width 800px, centered
- Background: #E6F5F4 (teal-light) with 4px left border in teal
- Checkmarks: teal color (#199B93), 18px text
- Each item: 16px font-weight 500, gray-800 color, 16px gap
- CTA button centered below: "Check Your Eligibility" (teal background)

PADDING: 32px on all sides
```

### 2.6 FAQ Section

**Prompt for LLM/Developer:**
```
Create an accordion FAQ section:

QUESTIONS:
1. What is a merchant cash advance?
2. How quickly can I get funded?
3. What documents do I need?
4. How does repayment work?
5. What happens if I can't make a payment?
6. Is my information secure?

DESIGN:
- Each FAQ item: white background, 1px gray-200 border, rounded-md
- Question: 16px font-weight 500, navy color, padding 16px 24px
- Chevron icon on right, rotates 180° when open, gray-400 color
- Answer: Initially hidden, 14px gray-600, padding 0 24px 16px
- Expanded: Border-top gray-100, answer slides down with animation

INITIALLY: First item expanded by default
```

### 2.7 Footer

**Prompt for LLM/Developer:**
```
Create a footer with 4 columns:

COLUMNS:
1. Logo + Tagline
   - "Smarter Funding for Growing Businesses"

2. Company Links
   - About Us
   - How It Works
   - FAQ
   - Contact

3. Legal Links
   - Privacy Policy
   - Terms of Service
   - Licenses

4. Contact Info
   - Email: info@thinkfundinggroup.com
   - Phone: (placeholder)

BOTTOM BAR:
- Background: #061A2C (navy-dark)
- Copyright: "© 2026 Think Funding LLC. All rights reserved."
- Disclaimer: "Think Funding LLC is not a lender. We purchase future receivables. This is not an offer to lend. All transactions subject to approval."

DESIGN:
- Footer top: Navy background (#0B2D4E), padding 64px vertical
- Footer bottom: Navy-dark background, padding 16px
- Links on hover: teal color (#199B93)
- Disclaimer: 12px, gray-500, centered
```

---

## 3. MERCHANT PORTAL IMPLEMENTATION

### 3.1 Login Page

**Prompt for LLM/Developer:**
```
Create a merchant login page:

LAYOUT:
- Centered card on gray-50 background
- Card: white background, max-width 400px, padding 40px, rounded-xl, shadow-lg
- Logo centered above form (140px width)
- Title: "Welcome Back" (24px bold navy)

FORM FIELDS:
- Email input: 48px height, full width
- Password input: 48px height, full width
- "Remember me" checkbox
- "Forgot password?" link (teal color)

BUTTON:
- "Sign In" button: 100% width, 48px height, navy background, white text
- Hover: darker navy

FOOTER:
- "Don't have an account? Apply now" with teal link

VALIDATION:
- Required field validation
- Email format validation
- Show error messages below inputs in red
```

### 3.2 Registration Page

**Prompt for LLM/Developer:**
```
Create merchant registration page:

ADDITIONAL FIELDS vs Login:
- Business Name
- Email
- Password (with requirements hint: "At least 8 characters")
- Confirm Password
- Terms checkbox with links to Terms and Privacy

BUTTON:
- "Create Account" instead of "Sign In"

FOOTER:
- "Already have an account? Sign in" with teal link

PASSWORD REQUIREMENTS DISPLAY:
- Show below password field
- "At least 8 characters, including one number"
- 12px gray-500 text
```

### 3.3 Dashboard Layout

**Prompt for LLM/Developer:**
```
Create merchant dashboard with sidebar navigation:

HEADER (64px height, white background, border-bottom):
- Logo left
- Notifications bell with badge (right)
- Help icon (right)
- User avatar + dropdown (right)

SIDEBAR (240px width, gray-50 background):
- Menu items: 44px height
- Icons 20px, margin-right 12px
- Active item: teal background, white text
- Hover: gray-100 background
- Items: Dashboard, Application, Documents, Profile

MAIN CONTENT AREA:
- Gray-50 background
- 24px padding
- Cards for: Welcome banner, Application Status, Quick Actions, Recent Activity, Messages

MOBILE: Sidebar becomes hamburger menu overlay
```

### 3.4 Application Wizard

**Prompt for LLM/Developer:**
```
Create multi-step application wizard:

PROGRESS INDICATOR:
- 4 steps: Business → Owners → Financial → Review
- Horizontal bar with circles
- Completed: teal with white checkmark
- Current: navy with white number
- Upcoming: gray-200 with gray number
- Progress bar: 4px height, teal fill for completed portion

STEP 1: Business Information
- Legal Business Name (required)
- DBA/Operating Name (optional)
- Business Type dropdown (required)
- Years in Business (required)
- Industry dropdown (required)
- EIN
- Business Address fields
- Phone (required)
- Email (required)
- Website (optional)

STEP 2: Owner Information
- Dynamic: Add/remove owners
- Each owner: Name, Email, Phone, DOB, SSN (last 4), Ownership %, Address
- "Add Another Owner" button

STEP 3: Financial Information
- Monthly Revenue
- Average Daily Balance
- Bank Name
- Account Number (last 4)
- Routing Number
- Requested Amount
- Use of Funds (textarea)

STEP 4: Review & Submit
- Summary of all entered data
- Edit links per section
- Submit button

BUTTONS:
- "Save & Continue" (primary, right)
- "Save & Exit" (secondary, left)

FORM VALIDATION:
- Required fields highlighted
- Inline error messages
- Prevent progression if required fields empty
```

### 3.5 Document Upload

**Prompt for LLM/Developer:**
```
Create document upload page:

REQUIRED DOCUMENTS LIST:
- Business Formation Documents
- EIN Verification
- Owner ID (Driver's License or Passport)
- 3-6 Months Bank Statements
- Voided Check or Bank Letter
- ACH Authorization (e-sign)
- Personal Guaranty (if applicable)

UPLOAD AREA:
- Drag-and-drop zone
- Dashed border, gray-300
- Hover: teal border, teal-light background
- Icon: upload cloud
- Text: "Drag and drop files here or click to browse"
- Accepted: PDF, DOC, DOCX, JPG, PNG
- Max file size display

UPLOADED FILES LIST:
- File name
- Upload date
- Status badge: Pending (yellow), Verified (green), Rejected (red)
- Actions: View, Delete

PROGRESS:
- Show upload progress bar
- Success checkmark animation on complete
```

---

## 4. INTERNAL OPERATIONS UI IMPLEMENTATION

### 4.1 Application List View

**Prompt for LLM/Developer:**
```
Create internal application list view:

FILTERS (top bar):
- Status dropdown: All, Draft, Submitted, Under Review, Approved, Declined, Withdrawn
- Date range picker
- Source dropdown: All, Direct, Broker, ISO
- Search by business name or application ID

TABLE:
Columns:
- Application ID (sortable)
- Business Name (sortable)
- Submitted Date (sortable)
- Status (badge)
- Source
- Amount Requested (sortable)
- Actions

STATUS BADGES:
- Draft: gray background
- Submitted: blue background
- Under Review: yellow background
- Approved: green background
- Declined: red background
- Withdrawn: gray background

ROW ACTIONS:
- View button → opens detail page
- Quick actions dropdown: Approve, Decline, Request Info

PAGINATION:
- 25/50/100 per page options
- Page numbers
- Total count display
```

### 4.2 Application Detail View

**Prompt for LLM/Developer:**
```
Create application detail view:

HEADER:
- Back button
- Business Name (large)
- Application ID
- Status badge
- Submitted date
- Quick actions: Approve, Decline, Request More Info

TABS:
1. Overview
   - Key metrics cards: Requested Amount, Business Age, Monthly Revenue, NSF Count
   - Submission timeline

2. Business
   - All business information fields
   - Edit capability

3. Owners
   - List of all owners/principals
   - Ownership percentages
   - Contact info

4. Bank Statements
   - List of uploaded statements
   - Preview capability
   - Download option

5. Compliance
   - KYC checklist status
   - OFAC screening results
   - Verification badges

6. Underwriting
   - Risk score (if available in Phase 2)
   - Underwriting notes
   - Decision history

7. Documents
   - All uploaded documents
   - Organized by type
   - Upload date, status

8. Notes
   - Chronological notes feed
   - Add note form
   - Author and timestamp

ACTION BUTTONS (bottom):
- "Approve" (green)
- "Decline" (red)
- "Request More Information" (blue)
- "Add Note" (gray outline)
```

### 4.3 Deal Management View

**Prompt for LLM/Developer:**
```
Create deal detail view:

HEADER:
- Deal Number (e.g., DEAL-2026-00001)
- Status badge: Pending, Funded, Active, Paid Off, Defaulted, Charged Off
- Merchant name linked

KEY METRICS CARDS:
- Advance Amount
- Factor Rate
- Purchase Price
- Daily Payment Amount
- Start Date
- Expected End Date
- Remaining Balance
- Total Recovered

TABS:
1. Overview
   - Deal timeline
   - Key dates

2. Payment Schedule
   - Table of expected payments
   - Actual payments received
   - Variance

3. Payments
   - All payment attempts
   - Status per attempt
   - Failure reasons if any

4. Documents
   - All deal-related documents
   - ACH authorization
   - Contracts

5. Activity
   - Audit log of all changes
   - Status changes
   - Notes

ACTION BUTTONS:
- "Record Manual Payment"
- "View Merchant"
- "View Application"
```

### 4.4 Collections Dashboard

**Prompt for LLM/Developer:**
```
Create collections dashboard:

SECTIONS:
1. Failed Payments Today
   - Table: Merchant, Deal, Amount, Failure Reason, NSF/Admin/Unauthorized
   - Action: Contact Merchant, Retry, Escalate

2. Overdue Deals
   - Cards per deal showing:
   - Days overdue
   - Total amount owed
   - Last payment date
   - Next action recommended

3. Collection Actions
   - Quick actions: Send Email, Log Call, Create Task, Escalate

FILTERS:
- Date range
- Failure type
- Amount range

PRIORITY INDICATORS:
- Red: >7 days overdue
- Yellow: 3-7 days overdue
- Green: <3 days overdue
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Button Component

```tsx
// Primary Button
<button className="btn btn-primary">
  Button Text
</button>

// CSS
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 150ms ease-in-out;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #0B2D4E;
  color: white;
}
.btn-primary:hover {
  background: #061A2C;
}

.btn-secondary {
  background: #199B93;
  color: white;
}
.btn-secondary:hover {
  background: #147A74;
}

.btn-outline {
  background: transparent;
  border: 2px solid #0B2D4E;
  color: #0B2D4E;
}

.btn:disabled {
  background: #D1D5DB;
  color: #6B7280;
  cursor: not-allowed;
}
```

### 5.2 Input Component

```tsx
// Input Field
<div className="input-group">
  <label className="input-label">Label Name *</label>
  <input 
    type="text" 
    className="input" 
    placeholder="Placeholder text"
  />
  <span className="input-error">Error message</span>
</div>

// CSS
.input-group {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 16px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  transition: all 150ms ease-in-out;
}

.input:focus {
  outline: none;
  border-color: #199B93;
  box-shadow: 0 0 0 3px #E6F5F4;
}

.input-error {
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
  display: block;
}
```

### 5.3 Card Component

```tsx
// Card
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
  </div>
  <div className="card-body">
    Card content here
  </div>
</div>

// CSS
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 150ms ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #0B2D4E;
}
```

### 5.4 Badge Component

```tsx
// Status Badge
<span className="badge badge-success">Approved</span>

// CSS
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
}

.badge-success {
  background: #D1FAE5;
  color: #059669;
}

.badge-warning {
  background: #FEF3C7;
  color: #D97706;
}

.badge-danger {
  background: #FEE2E2;
  color: #DC2626;
}

.badge-info {
  background: #DBEAFE;
  color: #2563EB;
}

.badge-gray {
  background: #F3F4F6;
  color: #6B7280;
}
```

### 5.5 Progress Indicator

```tsx
// Step Progress
<div className="progress-steps">
  <div className="step completed">
    <div className="step-circle">✓</div>
    <span className="step-label">Completed</span>
  </div>
  <div className="step-line"></div>
  <div className="step active">
    <div className="step-circle">2</div>
    <span className="step-label">Current</span>
  </div>
  <div className="step-line"></div>
  <div className="step upcoming">
    <div className="step-circle">3</div>
    <span className="step-label">Upcoming</span>
  </div>
</div>

// CSS
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.step.completed .step-circle {
  background: #199B93;
  color: white;
}

.step.active .step-circle {
  background: #0B2D4E;
  color: white;
}

.step.upcoming .step-circle {
  background: #E5E7EB;
  color: #6B7280;
}

.step-line {
  width: 60px;
  height: 4px;
  background: #E5E7EB;
  margin: 0 8px;
}

.step.completed + .step-line {
  background: #199B93;
}
```

---

## 6. API INTEGRATION GUIDE

### 6.1 API Base Configuration

```typescript
// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.thinkfundingllc.com';

// Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// API Response Types
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### 6.2 Authentication Hook

```typescript
// useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Validate token with API
      fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: getAuthHeaders()
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      setUser(data.user);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return { user, loading, login, logout };
};
```

### 6.3 Application API Hook

```typescript
// useApplication.ts
export const useApplication = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApplication = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setApplication(data);
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      setApplication(data);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}/submit`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return response.ok ? { success: true } : { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { application, loading, fetchApplication, updateApplication, submitApplication };
};
```

### 6.4 Document Upload Hook

```typescript
// useDocumentUpload.ts
export const useDocumentUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadDocument = async (file: File, applicationId: string, documentType: string) => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('applicationId', applicationId);
    formData.append('documentType', documentType);

    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, document: data };
      }
      
      return { success: false, message: 'Upload failed' };
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  return { uploadDocument, uploading, progress };
};
```

---

## 7. AUTHENTICATION FLOW

### 7.1 Login Flow

```
Merchant/Login Page
       │
       ▼
Enter email + password
       │
       ▼
POST /api/auth/login
       │
       ├── Success (200) ──────────────────┐
       │    │                               │
       │    ▼                               │
       │ Store token in localStorage        │
       │    │                               │
       │    ▼                               │
       │ Redirect to /dashboard             │
       │                                    │
       └── Failure (401) ──────────────────┘
            │
            ▼
       Show error message
       "Invalid email or password"
```

### 7.2 Protected Route

```tsx
// ProtectedRoute.tsx
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Usage
<ProtectedRoute allowedRoles={['merchant', 'employee']}>
  <Dashboard />
</ProtectedRoute>
```

### 7.3 Token Refresh

```typescript
// Token refresh interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`);
        const { access_token } = response.data;
        
        localStorage.setItem('access_token', access_token);
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

## IMPORTANT IMPLEMENTATION NOTES

### Dark Mode
- Public website: Light mode default, dark mode toggle available
- Implementation: CSS custom properties + toggle button
- Dark mode colors: Navy becomes lighter, text becomes white

### Responsive Breakpoints
```css
/* Mobile first */
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

### Accessibility
- All interactive elements focusable
- ARIA labels on icons and buttons
- Form labels associated with inputs
- Color contrast WCAG 2.1 AA compliant
- Keyboard navigation support

### Performance
- Lazy load images
- Code split by route
- Optimize font loading
- Minimize bundle size

---

*End of Implementation Guidelines*
*For Figma prompts, see 03_FIGMA_PROMPTS.md*