# FIGMA PROMPTS - PHASE 1A MVP
## Think Funding LLC - Design System & Wireframe Prompts

**Version:** 1.0  
**Date:** April 14, 2026  
**Purpose:** Detailed Figma prompts for UI/UX design across all phases

---

## TABLE OF CONTENTS

1. [Brand System Setup](#1-brand-system-setup)
2. [Phase 1A Public Website](#2-phase-1a-public-website)
3. [Phase 1A Merchant Portal](#3-phase-1a-merchant-portal)
4. [Phase 1A Internal Operations UI](#4-phase-1a-internal-operations-ui)
5. [Phase 1B Features](#5-phase-1b-features)
6. [Phase 2 & 3 Features](#6-phase-2--3-features)
7. [Component Library](#7-component-library)

---

## 1. BRAND SYSTEM SETUP

### Color Palette (Exact Hex Codes)

```
PRIMARY COLORS:
Navy (Trust/Stability): #0B2D4E
Navy Dark: #061A2C
Navy Light: #1A4A7A

Teal (Growth/Motion): #199B93
Teal Dark: #147A74
Teal Light: #E6F5F4

White: #FFFFFF

NEUTRAL COLORS:
Gray-50: #F9FAFB
Gray-100: #F3F4F6
Gray-200: #E5E7EB
Gray-300: #D1D5DB
Gray-400: #9CA3AF
Gray-500: #6B7280
Gray-600: #4B5563
Gray-700: #374151
Gray-800: #1F2937
Gray-900: #111827

STATUS COLORS:
Success: #10B981
Success Light: #D1FAE5
Warning: #F59E0B
Warning Light: #FEF3C7
Danger: #EF4444
Danger Light: #FEE2E2
Info: #3B82F6
Info Light: #DBEAFE
```

### Typography Settings

```
FONT FAMILY: Inter (Google Fonts)
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

FONT WEIGHTS:
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)

TYPE SCALE:
- text-xs: 12px / 16px line-height
- text-sm: 14px / 20px line-height
- text-base: 16px / 24px line-height
- text-lg: 18px / 28px line-height
- text-xl: 20px / 28px line-height
- text-2xl: 24px / 32px line-height
- text-3xl: 30px / 36px line-height
- text-4xl: 36px / 40px line-height
- text-5xl: 48px / 1 line-height
- text-6xl: 60px / 1 line-height

LETTER SPACING:
- Uppercase labels: 0.05em
- Body: 0
```

### Spacing System (4px Base)

```
- space-1: 4px
- space-2: 8px
- space-3: 12px
- space-4: 16px
- space-5: 20px
- space-6: 24px
- space-8: 32px
- space-10: 40px
- space-12: 48px
- space-16: 64px
- space-20: 80px
- space-24: 96px
```

### Border Radius

```
- radius-sm: 4px
- radius-md: 8px
- radius-lg: 12px
- radius-xl: 16px
- radius-2xl: 24px
- radius-full: 9999px (pills/circles)
```

### Shadows

```
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

---

## 2. PHASE 1A PUBLIC WEBSITE

### FIGMA PROMPT: Public Website Home Page

```
Create a professional landing page for Think Funding LLC, a merchant cash advance company.

BRAND:
- Primary Color: Navy #0B2D4E
- Secondary Color: Teal #199B93
- Font: Inter
- Style: Clean, modern, fintech, trustworthy

SECTIONS TO DESIGN:

1. HEADER (sticky, 72px height)
   - Logo (TF shield with upward arrow + "Think Funding" text)
   - Nav links: How It Works | About | FAQ | Contact (gray-600, hover navy)
   - CTA Button: "Apply Now" (navy bg, white text, radius-md)

2. HERO SECTION (min-height 600px)
   - Background: Gradient from #0B2D4E to #1A4A7A
   - Headline (centered, white, text-5xl, bold): "Smarter Funding for Growing Businesses"
   - Subheadline (white/gray-200, text-xl): "Fast, disciplined merchant cash advances that help established businesses access the capital they need."
   - Two buttons centered:
     * Primary: "Get Started" (teal #199B93, white text, text-lg, px-32 py-16)
     * Secondary: "Learn More" (transparent, white border, white text)
   - Hero image below: Professional business meeting, max-width 600px, radius-xl, shadow-xl

3. VALUE PROPS (white bg, py-20)
   - Section title: "Why Choose Think Funding" (navy, text-3xl, centered)
   - 4 cards in grid (desktop 4-col, tablet 2-col, mobile 1-col):
     * Each card: icon in teal-light circle (64px), teal icon (32px)
     * Card 1: ⚡ Fast Decisions - "Decisions in as little as 24 hours"
     * Card 2: 📋 Transparent Terms - "No hidden fees or surprise charges"
     * Card 3: 🛡️ Trusted Partner - "We're here when you need us"
     * Card 4: 🤝 Simple Process - "Four easy steps to funding"
   - Card text: title text-xl semibold navy, description text-base gray-500

4. HOW IT WORKS (gray-50 bg, py-20)
   - Section title: "How It Works" (navy, text-3xl, centered)
   - 4 step circles (80px diameter, navy bg, white text-3xl bold numbers)
   - Connecting arrows between circles (60px teal arrows, hidden mobile)
   - 4 cards below circles:
     * 1: Apply - "Complete our simple online application"
     * 2: Review - "We review your application and bank statements"
     * 3: Fund - "Funds deposited directly into your account"
     * 4: Repay - "Daily ACH payments based on your schedule"
   - Cards: white bg, radius-lg, shadow-md, padding-24

5. REQUIREMENTS (white bg, py-20)
   - Section title: "Are You Eligible?" (navy, text-3xl, centered)
   - Centered box (max-width 800px, teal-light bg, 4px teal left border):
     * ✓ 2+ Years in Business
     * ✓ $30,000+ Monthly Revenue
     * ✓ Low NSF History (fewer than 3 per month)
     * ✓ Active Bank Account
     * ✓ U.S.-Based Business
   - Each item: teal checkmark, text-lg, gray-800
   - CTA button centered below: "Check Your Eligibility" (teal bg, white text)

6. FAQ (gray-50 bg, py-20)
   - Section title: "Frequently Asked Questions" (navy, text-3xl, centered)
   - Accordion items (white bg, gray-200 border, radius-md):
     * Question: text-base medium navy, chevron right
     * Answer: text-sm gray-600, initially hidden
   - Questions:
     * What is a merchant cash advance?
     * How quickly can I get funded?
     * What documents do I need?
     * How does repayment work?
     * What happens if I can't make a payment?
     * Is my information secure?

7. FOOTER (navy bg)
   - 4 columns (desktop), 2 (tablet), 1 (mobile):
     * Col 1: Logo + tagline "Smarter Funding for Growing Businesses"
     * Col 2: Company - About Us, How It Works, FAQ, Contact
     * Col 3: Legal - Privacy Policy, Terms, Licenses
     * Col 4: Contact - info@thinkfundinggroup.com, phone
   - Bottom bar (navy-dark bg): Copyright + disclaimer (text-xs gray-500)

RESPONSIVE BREAKPOINTS:
- Desktop: 1280px
- Tablet: 1024px
- Mobile: 640px
```

---

### FIGMA PROMPT: Apply Page (CTA Landing)

```
Create a simplified apply page that redirects to merchant portal.

LAYOUT:
- Clean page matching website header/footer
- Centered content (max-width 600px)
- Hero text: "Ready to Get Started?"
- Subtext: "Apply now and get a decision in as little as 24 hours"
- CTA: "Start Your Application" button (large, teal)
- Trust indicators below:
  * 🔒 Secure & Confidential
  * ⚡ Quick & Easy
  * ✓ No Obligation
```

---

## 3. PHASE 1A MERCHANT PORTAL

### FIGMA PROMPT: Login Page

```
DESIGN a merchant login page for Think Funding LLC portal.

LAYOUT:
- Centered card on gray-50 background
- Card: white bg, max-width 400px, padding-40, radius-xl, shadow-lg
- Centered logo above form (140px)

FORM:
- Title: "Welcome Back" (text-2xl bold navy, centered)
- Email input: full width, 48px height, radius-md, border gray-300
- Password input: full width, 48px height, radius-md, border gray-300
- "Remember me" checkbox (teal when checked)
- "Forgot password?" link (teal, text-sm, centered)
- "Sign In" button: 100% width, 48px height, navy bg, white text, radius-md
- Error state: red border, red helper text below input

FOOTER TEXT:
"Don’t have an account?" + "Apply now" link (teal)
```

### FIGMA PROMPT: Registration Page

```
Similar to login, ADDITIONAL:
- Business Name input
- Password with requirements hint below: "At least 8 characters, including one number" (text-xs gray-500)
- Confirm Password
- Terms checkbox: "I agree to Terms and Privacy Policy" with links
- Button: "Create Account"
- Footer: "Already have an account? Sign in" (teal link)
```

### FIGMA PROMPT: Dashboard Layout

```
CREATE the main dashboard layout for merchant portal.

HEADER (64px, white bg, border-bottom):
- Logo left
- Right side: Notifications bell (badge "2"), Help icon, User avatar dropdown
- Dropdown: Profile, Settings, Sign Out

SIDEBAR (240px width, gray-50 bg, collapsible mobile):
- Menu items (44px height, icons 20px):
  * Dashboard (icon: home)
  * Application (icon: document) - with status badge if in progress
  * Documents (icon: upload)
  * Profile (icon: user)
- Active state: teal-light bg, teal text
- Hover: gray-100 bg

MAIN CONTENT (gray-50 bg, padding-24):
- Welcome banner card: "Welcome back, [Business Name]" + Last login
- Application Status card: status badge, submitted date, view details link
- Quick Actions cards:
  * Continue Application (if draft)
  * Upload Documents
  * View Documents
- Recent Activity feed: timestamps, descriptions
- Messages section: notification items

MOBILE: Sidebar becomes hamburger menu overlay
```

### FIGMA PROMPT: Application Wizard - 4 Steps

```
DESIGN a multi-step application wizard.

PROGRESS INDICATOR (above form):
- 4 circles connected by lines
- Completed: teal fill + white checkmark
- Current: navy fill + white number
- Upcoming: gray-200 fill + gray number
- Progress bar: 4px, teal for completed portion
- Labels below circles: Business, Owners, Financial, Review

STEP 1: Business Information
Card with fields:
- Legal Business Name* (text input)
- DBA/Operating Name (optional)
- Business Type* (dropdown: LLC, Corporation, Partnership, Sole Proprietorship)
- Years in Business* (dropdown: 1, 2, 3, 4, 5, 6+)
- Industry* (dropdown with MCA-appropriate industries)
- EIN / Tax ID*
- Business Address (Street, City, State dropdown, ZIP)
- Phone Number*
- Email Address*
- Website (optional)
- 2 buttons bottom: "Save & Exit" (outline), "Save & Continue" (primary)

STEP 2: Owner/Principal Information
- Dynamic list - can add/remove owners
- Each owner card:
  * First Name, Last Name
  * Email, Phone
  * Date of Birth
  * SSN (last 4 digits)
  * Ownership Percentage (%)
  * Address
- "Add Another Owner" button (outline, plus icon)
- Minimum 1 owner required
- 2 buttons: "Save & Exit", "Save & Continue"

STEP 3: Financial Information
- Average Monthly Revenue*
- Average Daily Balance*
- Bank Name*
- Last 4 of Account Number*
- Routing Number*
- Requested Funding Amount* (currency input)
- Use of Funds (textarea)
- 2 buttons: "Save & Exit", "Save & Continue"

STEP 4: Review & Submit
- Summary sections (each with "Edit" link):
  * Business Information
  * Owner(s)
  * Financial Information
- Disclosure checkboxes:
  * "I authorize Think Funding to verify the information provided"
  * "I acknowledge receipt of disclosures"
- Submit button (full width, teal, large)
- Success state: confirmation message + application number

FORM VALIDATION:
- Red border on required empty fields
- Error messages below fields
- Prevent "Save & Continue" if required fields empty
```

### FIGMA PROMPT: Document Upload Page

```
DESIGN document upload interface.

LAYOUT:
- Header: "Required Documents"
- Checklist of required docs:
  * Business Formation Documents (optional based on entity type)
  * EIN Verification
  * Owner ID (Driver's License or Passport)
  * 3-6 Months Bank Statements
  * Voided Check or Bank Letter
  * ACH Authorization (will be e-signed)
  * Personal Guaranty (if applicable)

UPLOAD AREA:
- Dashed border box (gray-300, radius-lg, padding-16)
- Upload cloud icon (48px, gray-400)
- Text: "Drag and drop files here or click to browse"
- Subtext: "PDF, DOC, DOCX, JPG, PNG up to 10MB"
- Hover state: teal border, teal-light bg

UPLOADED FILES LIST (table):
Columns:
- Document Name
- Upload Date
- Status (badge: Pending=yellow, Verified=green, Rejected=red)
- Actions (View, Delete)

UPLOAD PROGRESS:
- Progress bar (teal fill)
- File name
- Cancel button

STATUS INDICATORS:
- Pending: Yellow badge "Pending Review"
- Verified: Green badge "Verified"
- Rejected: Red badge "Rejected" + reason tooltip
```

---

## 4. PHASE 1A INTERNAL OPERATIONS UI

### FIGMA PROMPT: Application List View

```
DESIGN internal operations application list.

LAYOUT:
- Header bar: "Applications" title, global search, user avatar
- Filter bar:
  * Status dropdown (All, Draft, Submitted, Under Review, Approved, Declined, Withdrawn)
  * Date range picker
  * Source dropdown (All, Direct, Broker, ISO)
  * "Clear Filters" text button
- Data table:
  Columns (sortable headers with arrows):
  * Application ID (e.g., APP-2026-00001)
  * Business Name
  * Submitted Date
  * Status (badge)
  * Source
  * Amount Requested (currency formatted)
  * Actions (View button)
- Row hover: gray-50 bg
- Pagination bar:
  * "Showing 1-25 of 156"
  * Items per page dropdown
  * Page numbers with prev/next

STATUS BADGES:
- Draft: gray bg, gray text
- Submitted: info-blue bg, blue text
- Under Review: warning-yellow bg, yellow text
- Approved: success-green bg, green text
- Declined: danger-red bg, red text
- Withdrawn: gray bg, gray text

ROW ACTIONS:
- "View" primary button
- Overflow menu: Quick Approve, Quick Decline, Request Info
```

### FIGMA PROMPT: Application Detail View

```
DESIGN full application detail page.

HEADER:
- Back arrow + "← Back to Applications"
- Breadcrumb: Applications > APP-2026-00001
- Business Name (text-2xl bold navy)
- Application ID (gray-500)
- Status badge (large)
- Submitted date
- Quick action buttons: "Approve" (green), "Decline" (red outline), "Request More Info" (blue outline)

TABS (horizontal, underline style):
1. Overview
2. Business
3. Owners
4. Bank Statements
5. Compliance
6. Underwriting
7. Documents
8. Notes

TAB CONTENT:

OVERVIEW TAB:
- Key metrics cards (4-col grid):
  * Requested Amount
  * Business Age
  * Monthly Revenue
  * NSF Count
- Submission timeline (vertical):
  * Application created
  * Documents uploaded
  * Submitted
  * Under review

BUSINESS TAB:
- Read-only form with all business fields
- "Edit" button (if status allows)

OWNERS TAB:
- Cards for each owner
- Contact info, ownership %, status badges

BANK STATEMENTS TAB:
- List of uploaded statements
- Preview thumbnails
- Download buttons
- "Upload Statement" button

COMPLIANCE TAB:
- Checklist items:
  * KYC Verified (badge)
  * OFAC Cleared (badge)
  * Identity Verified (badge)
  * Bank Statements Complete (badge)

UNDERWRITING TAB (Phase 1: mostly manual):
- Notes textarea
- "Add Note" button
- Decision history

DOCUMENTS TAB:
- All documents organized by type
- Upload button
- Preview/download actions

NOTES TAB:
- Chronological feed
- Each note: author avatar, name, timestamp, content
- "Add Note" form at top

ACTION BUTTONS (sticky bottom bar):
- "Approve" (green filled)
- "Decline" (red filled)
- "Request More Information" (blue outlined)
- "Add Note" (gray outline)
```

### FIGMA PROMPT: Deal Detail View

```
DESIGN deal management view.

HEADER:
- Back arrow
- Deal Number (DEAL-2026-00001)
- Status badge (Funded, Active, Paid Off, Defaulted)
- Merchant name (linked)

METRICS CARDS (4-col grid):
- Advance Amount: $XX,XXX
- Factor Rate: X.XX
- Purchase Price: $XX,XXX
- Daily Payment: $XXX
- Start Date: MM/DD/YYYY
- Expected End: MM/DD/YYYY
- Remaining Balance: $XX,XXX
- Total Recovered: $XX,XXX

TABS:
1. Overview
2. Payment Schedule
3. Payments
4. Documents
5. Activity

PAYMENT SCHEDULE TAB:
- Table: Expected Date | Amount | Status
- Status: Scheduled, Paid, Partial, Skipped

PAYMENTS TAB:
- All payment attempts
- Success (green), Failed (red), Pending (yellow)
- Failure reason if failed

ACTIVITY TAB:
- Full audit log
- All status changes, notes, payments
- Timestamps and user attribution
```

### FIGMA PROMPT: Collections Dashboard

```
DESIGN collections management view.

HEADER:
- "Collections" title
- Date range filter
- "Export" button

SECTION 1: Failed Payments Today
- Table:
  * Merchant Name (linked)
  * Deal ID (linked)
  * Amount
  * Failure Type (NSF/Admin/Unauthorized badge)
  * Failed Date
  * Actions: Contact, Retry, Escalate

SECTION 2: Overdue Deals
- Cards with:
  * Merchant name
  * Days overdue (red/yellow/green badge)
  * Amount owed
  * Last payment date
  * "Take Action" dropdown

SECTION 3: Quick Actions
- Buttons: Send Email Template, Log Call, Create Task, Escalate to Agency

PRIORITY BADGES:
- >7 days: Red "Critical"
- 3-7 days: Yellow "Warning"
- <3 days: Green "Monitor"
```

---

## 5. PHASE 1B FEATURES

### FIGMA PROMPT: Underwriting Workbench (Phase 1B)

```
ENHANCED application detail with underwriting features.

ADDITIONS:
- Risk Score gauge (0-100)
- Red flags list (highlighted in red)
- Bank statement analysis summary card:
  * Average monthly deposits
  * NSF count
  * Negative balance days
  * Stacking indicators
- AI-generated summary box
- "Approve with Conditions" button (creates stipulation)
```

### FIGMA PROMPT: Document Analysis View (Phase 1B)

```
NEW view for AI-assisted document review.

BANK STATEMENT ANALYSIS VIEW:
- Extracted data table:
  * Month
  * Total Deposits
  * NSF Count
  * Avg Daily Balance
  * Negative Days
- Visual chart: Monthly deposits trend line
- Red flags highlighted in yellow
- "Regenerate Analysis" button
```

---

## 6. PHASE 2 & 3 FEATURES

### FIGMA PROMPT: Broker/ISO Portal (Phase 3)

```
DESIGN broker-facing interface.

BROKER DASHBOARD:
- Pipeline summary cards: Submitted, In Review, Approved, Funded
- Table of broker's submissions
- Commission tracker
- "Submit New Deal" button

SUBMISSION FORM (simplified):
- Streamlined 3-step wizard for brokers
- Quick merchant data entry
- Upload documents
- Submit for review
- Track status
```

### FIGMA PROMPT: Servicing Dashboard (Phase 2)

```
DESIGN payment servicing view.

MERCHANT SERVICING VIEW:
- Payment status cards: Current, Past Due, Critical
- Payment schedule calendar
- Recent payments list
- "Record Payment" button
- "Create Adjustment" button
- ACH management section
```

---

## 7. COMPONENT LIBRARY

### Design System Components to Create in Figma

```
BASICS:
- Button (Primary, Secondary, Outline, Ghost, Disabled)
- Input (Text, Email, Password, Number, Textarea)
- Select/Dropdown
- Checkbox
- Radio
- Toggle
- Date Picker
- File Upload
- Modal/Dialog
- Toast/Notification
- Tooltip
- Badge (Success, Warning, Danger, Info, Gray)
- Card
- Avatar
- Progress Bar
- Spinner/Loader
- Empty State
- Error State
- Loading Skeleton

NAVIGATION:
- Header
- Sidebar
- Tab Bar
- Breadcrumb
- Pagination
- Dropdown Menu

DATA DISPLAY:
- Table
- Data Card
- Stat Card
- Timeline
- List
- Feed
- Chart (Line, Bar, Pie - for Phase 2+)

FORMS:
- Form Field
- Form Section
- Wizard/Stepper
- Dynamic Form List (add/remove items)
```

### Icon Set Recommendations

```
Use Lucide Icons or Heroicons (outline style)

Recommended icons for the app:
- home
- document / document-text
- user / users
- upload / download
- check-circle
- x-circle
- clock
- calendar
- phone
- mail
- lock
- shield
- chart-bar
- trending-up
- dollar-sign
- file-text
- search
- filter
- plus
- minus
- chevron-down
- chevron-right
- bell
- settings
- logout
- eye
- trash
- edit
- download
- external-link
```

---

## FIGMA ORGANIZATION RECOMMENDATIONS

```
Think Funding LLC/
├── Brand System/
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Icons
├── Components/
│   ├── Buttons
│   ├── Forms
│   ├── Cards
│   ├── Navigation
│   └── Data Display
├── Public Website/
│   ├── Home Page
│   ├── How It Works
│   ├── FAQ
│   └── Apply
├── Merchant Portal/
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Application/
│   │   ├── Step 1
│   │   ├── Step 2
│   │   ├── Step 3
│   │   └── Step 4
│   ├── Documents
│   └── Profile
├── Internal Operations/
│   ├── Applications List
│   ├── Application Detail/
│   │   ├── Overview
│   │   ├── Business
│   │   ├── Owners
│   │   └── ...
│   ├── Deals List
│   ├── Deal Detail
│   └── Collections
├── Phase 1B/
│   └── (Phase 1B wireframes)
├── Phase 2/
│   └── (Phase 2 wireframes)
└── Phase 3/
    └── (Phase 3 wireframes)
```

---

## MOBILE CONSIDERATIONS

```
All designs should include mobile variants:

BREAKPOINTS:
- Desktop: 1280px+
- Tablet: 768px - 1279px
- Mobile: < 768px

MOBILE PATTERNS:
- Sidebar → Hamburger menu / Bottom tab bar
- Tables → Cards with expandable details
- Multi-column → Single column stack
- Large touch targets (min 44px)
- Simplified navigation
- Mobile-optimized forms
```

---

*End of Figma Prompts Document*
*For implementation guidelines, see 02_IMPLEMENTATION_GUIDELINES.md*
*For complete context, see 01_LLM_CONTEXT.md*