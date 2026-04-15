# THINK FUNDING LLC - COMPLETE LLM DEVELOPMENT CONTEXT
## Phase 1A MVP Development Reference Document

**Version:** 1.0  
**Date:** April 14, 2026  
**Purpose:** Single source of truth for all development context, requirements, and specifications

---

## TABLE OF CONTENTS

1. [Company Overview](#1-company-overview)
2. [Business Model & Product](#2-business-model--product)
3. [Technology Stack](#3-technology-stack)
4. [Brand Design System](#4-brand-design-system)
5. [Database Architecture](#5-database-architecture)
6. [Phase 1A Scope (MVP)](#6-phase-1a-scope-mvp)
7. [UI/UX Wireframes](#7-uiux-wireframes)
8. [Use Cases (78 Total)](#8-use-cases-78-total)
9. [API Design](#9-api-design)
10. [n8n Workflows](#10-n8n-workflows)
11. [Development Sprints](#11-development-sprints)
12. [Future Phases](#12-future-phases)

---

## 1. COMPANY OVERVIEW

### 1.1 Executive Summary
Think Funding LLC is a small, disciplined, technology-enabled U.S. Merchant Cash Advance (MCA) company. The goal is to launch lean, protect downside risk, stay operationally and legally clean, and create a platform that can scale into automation-assisted funding without re-platforming.

### 1.2 Core Principles
1. **Strict underwriting and risk discipline** rather than aggressive growth
2. **Microsoft-first infrastructure** using Azure, Microsoft 365, Entra, and n8n
3. **True receivables-purchase model** rather than a loan model
4. **Phased build strategy** - practical and lean initially, but architecturally scalable

### 1.3 Target Future State
End-to-end operating platform covering: merchant acquisition, application intake, document collection, KYC/AML/compliance, underwriting, funding, ACH collections, servicing, collections, renewals, and portfolio reporting.

### 1.4 Entity Structure
- **Entity:** Wyoming LLC, foreign registered in Rhode Island
- **EIN obtained, operating agreement, certificate of good standing**
- **Default tax classification** (not S-corp until profit exceeds ~$60K/year)

### 1.5 Key Personnel
- **Aia Labja** - Founder, principal underwriter, risk manager, operator, early collections lead
- **Edwin** - Technology architect, continuous improvement, administrative support
- **External:** CPA/bookkeeping, legal counsel, collections partner, developers, brokers/ISOs

---

## 2. BUSINESS MODEL & PRODUCT

### 2.1 Product Structure
- **Product:** Commercial receivables purchase / merchant cash advance
- **Typical advance size:** $5,000 - $15,000
- **Typical factor rate:** ~1.35
- **Typical duration:** 90-120 days (potentially 5-6 months)
- **Repayment:** Daily ACH debits or processor splits

### 2.2 Capital Structure
- Initial deployment: ~$50,000 of business capital
- Source: personal savings, personal 401(k), ~$60,000 personal loan
- Target: cover ~$1,200/month personal debt service + ~$200/month surplus

### 2.3 Legal Framing (Critical)
- Must operate as a **true receivables purchase** (NOT a loan)
- Documentation must support: purchase-and-sale framing, reconciliation provisions
- NO fixed-interest framing
- Required: ACH authorization, UCC authorization, personal guaranty language
- State-specific compliance where applicable

### 2.4 Underwriting Philosophy

**Preferred Merchant Profile:**
- 2+ years in business (ideally 3+)
- $30,000-$40,000+ monthly deposits/revenue
- Low NSF activity (fewer than 3 per month)
- Stable average daily balances
- Limited or no stacking
- Lower-risk industries: service businesses, medical offices, auto repair, professional services

**Avoid/Decline Profile:**
- Less than 12 months in business
- Unstable or deteriorating revenue
- High NSF counts
- Many negative balance days
- Suspicious transfers or cash movement
- Obvious fraud signals
- Excessive active MCA positions / stacking
- Evasive or inconsistent borrower behavior

**Core Guardrail:**
```
Daily Payment / Average Daily Revenue <= 12%
```
- Hard rule, absolute caution above this range
- Practical ceiling: ~15% only in exceptional cases

**Underwriting Framework Categories:**
- Business Profile
- Industry Risk Assessment
- Bank Statement Analysis
- Cash Flow & Revenue Stability
- Revenue Consistency & Volatility
- Payment Capacity / Burden Analysis
- Banking Behavior & Deposit Quality
- Existing Debt / MCA Exposure
- Risk Indicators / Red Flags
- Recency & Deterioration Analysis
- Owner / Guarantor Review
- Compliance & KYC Checks
- Fraud / Data Integrity Review
- Deal Structure
- Recovery & Collectability Assessment
- Portfolio / Concentration Risk
- Final Decision

### 2.5 Compliance Requirements

**Minimum Viable Merchant File:**
- Business formation documents
- EIN proof
- Secretary of State verification
- Owner identification for 25%+ owners and guarantors
- Beneficial ownership certification
- OFAC screening for business and beneficial owners
- 3-6 months of business bank statements
- Voided check or bank letter
- ACH authorization
- Lease / utility / address support where needed
- Current MCA or loan statements and payoff letters where relevant
- Tax returns / P&Ls / supporting financials where needed

**Internal File Architecture:**
```
- Admin
- Compliance
- Templates
- Active Deals
- Paid Off
- Defaulted
- ISO Files
- Legal
- Financials

Each merchant/deal folder:
- Application
- KYC
- Underwriting
- Agreements
- Funding
- UCC
- ACH
- Post-Funding
- Collections
- Renewal
```

### 2.6 Banking, Treasury & Collections

**Bank Account Structure:**
- At least two institutions to reduce account-freeze risk
- Separate internal accounts: operating, funding, reserve

**Payment/Remittance Structure:**
- Company funds merchants directly (receivables-purchase)
- Collects remittances through ACH or processor-split mechanisms
- Does NOT hold third-party funds
- Does NOT transmit money on behalf of customers

**Default Escalation Path:**
1. Failed ACH detected → immediate same-day outreach (email + call)
2. Classify failure (NSF vs admin vs unauthorized) and decide
3. Internal servicing / soft collections (1-3 days)
4. Broker involvement where useful
5. Formal default notice + collections hold
6. Workout or settlement attempt
7. Escalate to collections agency (smaller balances) or legal (larger deals)

**Stripe ACH Direction:**
- Use Stripe as the **payment rail and asynchronous event source**
- Design around ACH Direct Debit as a **bank-debit rail**
- Treat webhook-driven status updates as **source of truth**
- Maintain **idempotent payment handling and auditability**
- Store **payment attempt history, exceptions, retries, reversals** at the attempt level

**Stripe Fees:**
- 0.8% per successful ACH Direct Debit (standard settlement), $5.00 cap
- 1.2% per transaction for two-day settlement
- $4.00 per failed ACH payment
- $15.00 per disputed ACH payment

**NACHA Compliance:**
- Monitor unauthorized return rate: 0.5% benchmark
- Monitor administrative return rate: 3.0% benchmark
- Monitor overall return rate: 15.0% benchmark
- ACH collections must comply with Nacha classification (MCA remittances are NOT consumer goods purchases)

---

## 3. TECHNOLOGY STACK

### 3.1 Core Decision (LOCKED)
**Microsoft-first, Azure-based** - This decision is locked and should not be reopened.

### 3.2 Tech Stack Summary

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Web Framework** | ASP.NET Core 8 + React 18 | Azure-native, strong typing, modern SPA |
| **Database** | Azure SQL Database | System of record, relational integrity |
| **Document Storage** | Azure Blob Storage | Scalable, secure file storage |
| **Identity** | Microsoft Entra ID | Single tenant, RBAC, M365 integration |
| **Orchestration** | n8n (Azure-hosted) | Event-driven workflows, automation |
| **Business Logic** | Python 3.11+ | Document AI, analysis services |
| **Work Queue** | Microsoft Lists | Human task layer, BAU operations |
| **Notifications** | Power Automate + n8n | Microsoft-native alerts |
| **BI/Reporting** | Power BI | Portfolio analytics |
| **Hosting** | Azure App Service | PaaS, auto-scaling |

### 3.3 Architecture Principles
- One primary system of record (Azure SQL Database)
- Modular but not fragmented
- Event-driven where it adds real value
- Secure by default
- Automation-friendly from day one
- Phase the build, not the architecture

### 3.4 Tenant Model
- **One Microsoft tenant** that supports multiple domains and aliases
- Microsoft 365 Business Standard + Teams Premium (leased from Think Media LLC)
- **Account structure:**
  - Backup Account (Fully licensed, Global admin)
  - Aia's Account (Fully licensed, No admin access)
  - Edwin's Account (Fully licensed, No admin access)
  - Admin Account (No license, all admin access except Global Administrator)
  - Developer (Guest Account, limited Azure and SharePoint access)
  - Legal (Guest Account, limited Legal SharePoint access)
  - Accounting (Guest Account, limited Accounting SharePoint access)

### 3.5 Email Domain Warm-up (Critical for Funding/Financial Services)

**Week 1:** 5-20 emails/day max, prioritize real human conversations
**Week 2:** 30-50/day, mix new messages with replies
**Week 3+:** Scale only after stable engagement

**Language Blacklist During Warm-up:**
- guaranteed, approval / pre-approved, instant funding
- no credit check, fast cash, loan / lending
- offer / special offer, limited time, act now
- risk-free, lowest rates, apply now, get funded
- qualify instantly, unsecured financing, click here
- free, urgent, final notice

---

## 4. BRAND DESIGN SYSTEM

### 4.1 Logo
- Shield-based TF logo with upward arrow motif
- Represents: protection, growth, trust

### 4.2 Color Palette

```css
:root {
  /* Primary Colors */
  --color-navy: #0B2D4E;        /* Trust/Stability */
  --color-navy-dark: #061A2C;   /* Darker navy */
  --color-navy-light: #1A4A7A;  /* Lighter navy */
  
  --color-teal: #199B93;        /* Growth/Motion */
  --color-teal-dark: #147A74;   /* Darker teal */
  --color-teal-light: #E6F5F4;  /* Light teal background */
  
  --color-white: #FFFFFF;
  
  /* Neutral Colors */
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
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --color-info: #3B82F6;
}
```

### 4.3 Typography

```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 4.4 Spacing System

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### 4.5 Component Styles

**Buttons:**
- Primary: Navy bg (#0B2D4E), white text, 8px radius
- Secondary: Teal bg (#199B93), white text, 8px radius
- Outline: Navy border, navy text, transparent bg
- Disabled: Gray bg, gray text, no pointer

**Forms:**
- Input: 40px height, 8px radius, 1px gray border
- Label: 12px, uppercase, gray
- Error: Red border, red helper text
- Focus: Teal border, light teal shadow

**Cards:**
- White background, 1px gray border
- 8px radius, 16px padding
- Subtle shadow on hover

---

## 5. DATABASE ARCHITECTURE

### 5.1 System of Record
**Azure SQL Database** is the authoritative system of record for all structured business, operational, financial, and compliance data.

**Microsoft Lists** is NOT a system of record - it's a human task surface only.

### 5.2 Design Principles
- Use UTC consistently
- Avoid hard deletes (use IsDeleted flags)
- Preserve audit history
- Use business-facing IDs separately from internal keys
- Keep PII access tightly restricted
- Design for both manual and automated ingestion
- Every table includes: guid (BIGINT), ingested_utc, updated_utc, source_system, created_by_principal_guid, updated_by_principal_guid

### 5.3 PII Domain Separation
**One restricted PII domain** made up of a few tightly controlled secret tables:
- Keeps design normalized
- Keeps data secure
- Gives n8n and internal services controlled way to read sensitive values

### 5.4 Core Tables

```sql
-- Merchants
CREATE TABLE Merchants (
    MerchantId INT IDENTITY(1,1) PRIMARY KEY,
    BusinessId NVARCHAR(50) NOT NULL UNIQUE,  -- e.g., TF-2026-00001
    LegalName NVARCHAR(255) NOT NULL,
    DBAName NVARCHAR(255),
    EIN NVARCHAR(20),
    BusinessType NVARCHAR(50),
    Industry NVARCHAR(100),
    AddressLine1 NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(50),
    ZipCode NVARCHAR(20),
    Phone NVARCHAR(20),
    Email NVARCHAR(255),
    MonthlyRevenue DECIMAL(18,2),
    AverageDailyBalance DECIMAL(18,2),
    NSFCount INT DEFAULT 0,
    MerchantStatus NVARCHAR(50) DEFAULT 'Active',
    Source NVARCHAR(100),  -- Direct, Broker, ISO
    BrokerId INT,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0
);

-- Persons (Owners, Guarantors, Principals)
CREATE TABLE Persons (
    PersonId INT IDENTITY(1,1) PRIMARY KEY,
    PersonType NVARCHAR(50) NOT NULL,  -- Owner, Guarantor, Principal
    OwnershipPercentage DECIMAL(5,2),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(20),
    DateOfBirth DATE,
    SSNLast4 NVARCHAR(4),
    IsPEP BIT DEFAULT 0,
    IsSanctionsMatch BIT DEFAULT 0,
    IsDeleted BIT DEFAULT 0
);

-- Applications
CREATE TABLE Applications (
    ApplicationId INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationNumber NVARCHAR(50) NOT NULL UNIQUE,  -- e.g., APP-2026-00001
    MerchantId INT NOT NULL,
    ApplicationStatus NVARCHAR(50) DEFAULT 'Draft',  -- Draft, Submitted, UnderReview, Approved, Declined, Withdrawn
    LoanAmountRequested DECIMAL(18,2),
    UseOfFunds NVARCHAR(500),
    SubmittedAt DATETIME2,
    ReviewedBy INT,
    DecisionNotes NVARCHAR(MAX),
    IsDeleted BIT DEFAULT 0
);

-- Deals
CREATE TABLE Deals (
    DealId INT IDENTITY(1,1) PRIMARY KEY,
    DealNumber NVARCHAR(50) NOT NULL UNIQUE,  -- e.g., DEAL-2026-00001
    ApplicationId INT NOT NULL,
    MerchantId INT NOT NULL,
    PrincipalId INT,
    DealStatus NVARCHAR(50) DEFAULT 'Pending',  -- Pending, Funded, Active, PaidOff, Defaulted, ChargedOff
    AdvanceAmount DECIMAL(18,2),
    FactorRate DECIMAL(5,3),
    PurchasePrice DECIMAL(18,2),
    DailyPaymentAmount DECIMAL(18,2),
    PaymentMethod NVARCHAR(50),  -- ACH, ProcessorSplit
    StartDate DATE,
    ExpectedEndDate DATE,
    IsDeleted BIT DEFAULT 0
);

-- Documents
CREATE TABLE Documents (
    DocumentId INT IDENTITY(1,1) PRIMARY KEY,
    DocumentType NVARCHAR(100) NOT NULL,
    DocumentSubType NVARCHAR(100),
    ApplicationId INT,
    MerchantId INT,
    DealId INT,
    FileName NVARCHAR(255),
    BlobPath NVARCHAR(500),
    ContentType NVARCHAR(100),
    FileSizeBytes BIGINT,
    UploadedBy INT,
    UploadedAt DATETIME2 DEFAULT GETUTCDATE(),
    ReviewStatus NVARCHAR(50) DEFAULT 'Pending',
    IsDeleted BIT DEFAULT 0
);

-- Compliance Checks
CREATE TABLE ComplianceChecks (
    ComplianceCheckId INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationId INT,
    MerchantId INT,
    CheckType NVARCHAR(100) NOT NULL,
    CheckStatus NVARCHAR(50) DEFAULT 'Pending',
    CheckedAt DATETIME2,
    ResultData NVARCHAR(MAX),
    Notes NVARCHAR(MAX)
);

-- ACH Authorizations
CREATE TABLE ACHAuthorizations (
    ACHAuthorizationId INT IDENTITY(1,1) PRIMARY KEY,
    DealId INT NOT NULL,
    MerchantId INT NOT NULL,
    BankName NVARCHAR(100),
    RoutingNumber NVARCHAR(20),
    AccountNumberLast4 NVARCHAR(4),
    AccountType NVARCHAR(20),  -- Checking, Savings
    AuthorizationType NVARCHAR(50),  -- Recurring, OneTime
    AuthorizedBy NVARCHAR(255),
    AuthorizationDate DATE,
    StripeMandateId NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    RevokedAt DATETIME2
);

-- Payment Attempts
CREATE TABLE PaymentAttempts (
    PaymentAttemptId INT IDENTITY(1,1) PRIMARY KEY,
    DealId INT NOT NULL,
    AttemptNumber INT NOT NULL,
    ScheduledDate DATE NOT NULL,
    Amount DECIMAL(18,2),
    Status NVARCHAR(50) DEFAULT 'Scheduled',
    FailureReason NVARCHAR(100),
    ReturnCategory NVARCHAR(50),  -- NSF, Admin, Unauthorized
    StripePaymentIntentId NVARCHAR(255)
);

-- Payment Events
CREATE TABLE PaymentEvents (
    PaymentEventId INT IDENTITY(1,1) PRIMARY KEY,
    PaymentAttemptId INT NOT NULL,
    EventType NVARCHAR(100) NOT NULL,
    EventData NVARCHAR(MAX),
    StripeEventId NVARCHAR(255),
    OccurredAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Brokers (ISOs)
CREATE TABLE Brokers (
    BrokerId INT IDENTITY(1,1) PRIMARY KEY,
    BrokerNumber NVARCHAR(50) NOT NULL UNIQUE,
    CompanyName NVARCHAR(255) NOT NULL,
    ContactName NVARCHAR(100),
    Email NVARCHAR(255),
    CommissionRate DECIMAL(5,3),
    BrokerStatus NVARCHAR(50) DEFAULT 'Active',
    IsDeleted BIT DEFAULT 0
);

-- Audit Logs (Append-only)
CREATE TABLE AuditLogs (
    AuditLogId BIGINT IDENTITY(1,1) PRIMARY KEY,
    EntityType NVARCHAR(100) NOT NULL,
    EntityId INT NOT NULL,
    Action NVARCHAR(100) NOT NULL,
    OldValue NVARCHAR(MAX),
    NewValue NVARCHAR(MAX),
    ChangedBy INT,
    ChangedByName NVARCHAR(255),
    IPAddress NVARCHAR(50),
    Timestamp DATETIME2 DEFAULT GETUTCDATE()
);
```

### 5.5 Indexes

```sql
CREATE INDEX IX_Applications_Merchant ON Applications(MerchantId);
CREATE INDEX IX_Applications_Status ON Applications(ApplicationStatus);
CREATE INDEX IX_Deals_Merchant ON Deals(MerchantId);
CREATE INDEX IX_Deals_Status ON Deals(DealStatus);
CREATE INDEX IX_Documents_Application ON Documents(ApplicationId);
CREATE INDEX IX_Documents_Merchant ON Documents(MerchantId);
CREATE INDEX IX_Documents_Type ON Documents(DocumentType);
CREATE INDEX IX_PaymentAttempts_Deal ON PaymentAttempts(DealId);
CREATE INDEX IX_PaymentAttempts_Scheduled ON PaymentAttempts(ScheduledDate);
CREATE INDEX IX_AuditLogs_Entity ON AuditLogs(EntityType, EntityId);
CREATE INDEX IX_AuditLogs_Timestamp ON AuditLogs(Timestamp);
```

---

## 6. PHASE 1A SCOPE (MVP)

### 6.1 Success Criteria
- ✅ Professional public website live
- ✅ Merchant can submit application online
- ✅ Documents can be uploaded securely
- ✅ Internal team can review applications
- ✅ Basic deal workflow operational
- ✅ Notifications routing through Microsoft 365
- ✅ Work queue visible in Microsoft Lists
- ✅ System supports 3-5 concurrent merchants

### 6.2 In-Scope Deliverables

(a) Professional public-facing website at www.thinkfundinggroup.com
- Dark mode option with default to light mode

(b) Secure merchant application intake flow

(c) Secure document upload capability

(d) Basic internal operations/admin interface

(e) Core Azure-hosted application setup

(f) Core database setup using Azure SQL

(g) Document storage using Azure Blob Storage

(h) Microsoft Entra-based authentication

(i) Baseline n8n workflow/orchestration for submission intake, file organization, notifications/alerts

(j) Microsoft 365 notification integration (Outlook/Teams)

(k) Structured handoff of code, configurations, workflows, and Technical Documentation

(l) Deployment and handoff sufficient for Client to understand delivered MVP

### 6.3 Out of Scope (Phase 1A)

(a) Advanced AI, OCR, bank statement extraction, automated risk scoring, underwriting intelligence, or automated fraud analysis

(b) Broker/ISO portal functionality

(c) Full underwriting workbench, servicing module, collections module, payment processing engine, ACH handling, reconciliation, renewal workflows, or portfolio analytics

(d) Advanced dashboards, BI reporting, KPI packs, or Power BI production reporting

(e) Full lifecycle automation beyond baseline MVP notifications and basic workflow routing

(f) Accounting integrations, advanced compliance engines, OFAC automation, or production-grade legal/compliance content authoring

(g) Custom mobile applications

(h) Penetration testing, formal security certification, or enterprise-grade disaster recovery beyond normal MVP setup

### 6.4 Technical Documentation Deliverables

(a) Solution overview and architecture summary
(b) Repository/codebase structure summary
(c) Environment/configuration documentation (excluding secrets)
(d) Azure services used and their role in the MVP
(e) Azure SQL schema/object overview for the MVP
(f) n8n workflow descriptions, trigger logic, and operational purpose
(g) Deployment notes and update steps
(h) Dependency list and third-party component summary
(i) Troubleshooting/runbook notes
(j) Known limitations, deferred items, and assumptions

---

## 7. UI/UX WIREFRAMES

### 7.1 Public Website Structure

```
/
├── Header (sticky)
│   ├── Logo
│   ├── Navigation: How It Works | About | FAQ | Contact
│   └── CTA Button: Apply Now
├── Hero Section
│   ├── Headline: "Smarter Funding for Growing Businesses"
│   ├── Subheadline: "Fast, disciplined merchant cash advances..."
│   ├── Primary CTA: Get Started
│   └── Secondary CTA: Learn More
├── Value Props Section
│   ├── Fast Decisions
│   ├── Transparent Terms
│   ├── Trusted Partner
│   └── Simple Process
├── How It Works Section
│   ├── Step 1: Apply
│   ├── Step 2: Review
│   ├── Step 3: Fund
│   └── Step 4: Repay
├── Requirements Section
│   ├── 2+ Years in Business
│   ├── $30K+ Monthly Revenue
│   ├── Low NSF History
│   └── Active Bank Account
├── FAQ Section (accordion)
└── Footer
    ├── Logo
    ├── Links
    ├── Contact Info
    └── Legal Links
```

### 7.2 Merchant Portal Structure

```
/login
├── Email Input
├── Password Input
├── Remember Me
├── Forgot Password
└── Sign In Button

/register
├── Business Name
├── Email
├── Password
├── Confirm Password
└── Create Account

/dashboard
├── Welcome Banner
├── Application Status Card
├── Quick Actions
│   ├── Continue Application
│   ├── Upload Documents
│   └── View Documents
├── Recent Activity
└── Notifications

/application
├── Progress Indicator (4 steps)
├── Step 1: Business Information
├── Step 2: Owner Information
├── Step 3: Financial Information
├── Step 4: Review & Submit
└── Save & Continue Later

/documents
├── Required Documents List
├── Upload Area (drag & drop)
├── Document Status
└── Upload History

/profile
├── Business Details
├── Owner/Principals
├── Bank Information
└── Settings
```

### 7.3 Internal Operations UI Structure

```
/operations
├── Sidebar Navigation
│   ├── Dashboard
│   ├── Applications
│   ├── Deals
│   ├── Merchants
│   ├── Payments
│   ├── Collections
│   ├── Brokers
│   ├── Reports
│   └── Settings
├── Application List
│   ├── Filters (Status, Date, Source)
│   ├── Sort (Date, Amount, Score)
│   └── Quick Actions
├── Application Detail
│   ├── Header (Merchant info, Status)
│   ├── Tabs: Overview, Business, Owners, Bank Statements, Compliance, Underwriting, Documents, Notes
│   └── Actions: Approve, Decline, Request More Info, Add Note
├── Deal Detail
│   ├── Header (Deal #, Status, Amounts)
│   ├── Tabs: Overview, Payment Schedule, Payments, Documents, Activity
│   └── Actions: View Merchant, View Application, Record Payment
└── Collections Dashboard
    ├── Failed Payments List
    ├── Overdue Deals
    └── Collection Actions
```

---

## 8. USE CASES (78 TOTAL)

### Phase 1 (Foundation) - High Priority Use Cases

| UC# | Capability | Phase | User Role |
|-----|-----------|-------|-----------|
| UC-001 | Public website | 1 | Merchant/Public |
| UC-002 | Merchant registration/login | 1 | Merchant |
| UC-003 | Merchant application intake | 1 | Merchant |
| UC-004 | Multi-step application flow | 1 | Merchant |
| UC-005 | Save-and-return application | 1 | Merchant |
| UC-006 | Conditional application logic | 1 | Merchant |
| UC-007 | Multi-owner/beneficial owner intake | 1 | Merchant |
| UC-008 | Merchant document upload | 1 | Merchant |
| UC-009 | Missing document request portal | 1 | Merchant |
| UC-010 | Merchant status view | 1 | Merchant |
| UC-012 | E-signature/online signing | 1 | Merchant |
| UC-013 | Internal employee login | 1 | Employee |
| UC-014 | Internal operations web UI | 1 | Employee |
| UC-015 | Central client profile | 1 | Employee |
| UC-016 | Central operational database | 1 | System |
| UC-017 | Structured application data storage | 1 | System |
| UC-018 | Document repository | 1 | System/Employee |
| UC-019 | Unique application/deal ID | 1 | System |
| UC-020 | Activity/audit log | 1 | System/Employee |
| UC-021 | Notes and comments logging | 1 | Employee |
| UC-022 | Internal task tracking | 1 | Employee |
| UC-023 | Webhook trigger to n8n | 1 | System |
| UC-024 | Workflow orchestration | 1 | System |
| UC-025 | Outlook/email notifications | 1 | Merchant/Employee |
| UC-026 | Teams notifications | 1 | Employee |
| UC-027 | Role-based access control | 1 | System/Employee |
| UC-028 | Entra identity/authentication | 1 | System |
| UC-029 | Encryption/secure transport | 1 | System |
| UC-030 | Backup and retention setup | 1 | System/Admin |
| UC-032 | KYC data capture | 1 | Merchant/Employee |
| UC-033 | Beneficial ownership capture | 1 | Merchant/Employee |
| UC-034 | Compliance evidence storage | 1 | Employee/System |
| UC-035 | Document completeness validation | 1 | System/Employee |
| UC-045 | Existing debt/stacking tracking | 1 | Merchant/Underwriter |
| UC-046 | Industry risk classification | 1 | System/Underwriter |
| UC-052 | ACH authorization capture | 1 | Merchant/Employee |
| UC-053 | Personal guarantee capture | 1 | Merchant/Employee |
| UC-056 | Funding status tracking | 1 | Employee/Merchant |
| UC-057 | Transaction recording | 1 | Employee |
| UC-068 | ISO attribution tracking | 1 | Employee/System |
| UC-071 | Internal dashboard/work queue | 1 | Employee |
| UC-077 | Business continuity/disaster recovery | 1 | System/Admin |
| UC-078 | Future integrations framework | 1 | System/Admin |

### Phase 2 (Automation) - Use Cases

| UC# | Capability |
|-----|-----------|
| UC-011 | Merchant account/funding status view |
| UC-036 | OFAC/sanctions workflow |
| UC-037 | AML/compliance checklist |
| UC-038 | Fraud/anomaly flagging |
| UC-039 | Bank statement extraction |
| UC-040 | Automated risk scoring |
| UC-041 | Underwriting rules engine |
| UC-042 | Underwriting workbench |
| UC-043 | Manual underwriting override |
| UC-044 | Underwriting summary generation |
| UC-047 | Missing-document chase automation |
| UC-048 | State-specific compliance flags |
| UC-049 | Approval/decline workflow |
| UC-050 | Stipulations management |
| UC-051 | Contract package generation |
| UC-055 | Funding checklist/pre-funding controls |
| UC-058 | Payment/servicing status tracking |
| UC-064 | Portfolio risk monitoring |
| UC-070 | Central communications log |
| UC-072 | Reporting/BI |
| UC-073 | Management KPI reporting |
| UC-075 | Document versioning |

### Phase 3 (Scale) - Use Cases

| UC# | Capability |
|-----|-----------|
| UC-011 | Merchant account/funding status view |
| UC-059 | ACH exception management |
| UC-060 | Reconciliation request tracking |
| UC-061 | Collections workflow |
| UC-062 | Renewal eligibility tracking |
| UC-063 | Portfolio management dashboard |
| UC-065 | ISO/broker login |
| UC-066 | ISO/broker submission portal |
| UC-067 | ISO/broker status tracking |
| UC-069 | ISO performance reporting |
| UC-074 | Accounting support/exports |
| UC-076 | Retention/archival workflow |

---

## 9. API DESIGN

### 9.1 Authentication Endpoints

```
POST   /api/auth/login           - Login with email/password
POST   /api/auth/register        - Register new merchant account
POST   /api/auth/refresh         - Refresh access token
POST   /api/auth/logout          - Logout
GET    /api/auth/me              - Get current user
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password with token
```

### 9.2 Merchant Endpoints

```
GET    /api/merchants                    - List merchants (internal)
GET    /api/merchants/{id}              - Get merchant details
POST   /api/merchants                    - Create merchant
PUT    /api/merchants/{id}              - Update merchant
GET    /api/merchants/{id}/owners        - Get merchant owners
POST   /api/merchants/{id}/owners        - Add owner
PUT    /api/merchants/{id}/owners/{oid}  - Update owner
```

### 9.3 Application Endpoints

```
GET    /api/applications                  - List applications
GET    /api/applications/{id}            - Get application details
POST   /api/applications                  - Create application
PUT    /api/applications/{id}            - Update application
POST   /api/applications/{id}/submit      - Submit application
POST   /api/applications/{id}/approve    - Approve application
POST   /api/applications/{id}/decline     - Decline application
POST   /api/applications/{id}/request-info - Request more info
```

### 9.4 Deal Endpoints

```
GET    /api/deals                         - List deals
GET    /api/deals/{id}                   - Get deal details
POST   /api/deals                         - Create deal from application
PUT    /api/deals/{id}                   - Update deal
POST   /api/deals/{id}/fund              - Fund deal
POST   /api/deals/{id}/close             - Close/paid off deal
GET    /api/deals/{id}/payments          - Get payment schedule
```

### 9.5 Document Endpoints

```
GET    /api/documents                     - List documents
GET    /api/documents/{id}              - Get document metadata
POST   /api/documents/upload              - Upload document
GET    /api/documents/{id}/download      - Get download URL
DELETE /api/documents/{id}              - Delete document
POST   /api/documents/{id}/verify        - Mark document verified
```

### 9.6 Payment Endpoints (Phase 1B)

```
GET    /api/payments                      - List payment attempts
GET    /api/payments/{id}              - Get payment details
POST   /api/payments/{id}/retry          - Retry failed payment
GET    /api/deals/{id}/payments/schedule - Get payment schedule
```

---

## 10. N8N WORKFLOWS

### 10.1 Core Workflows (Phase 1A)

**Workflow 1: New Application Submission**
```
Trigger: Application Submitted via API
Actions:
  1. Log workflow start
  2. Create Microsoft Lists task:
     - Title: "New Application - {MerchantName}"
     - Task Type: Underwriting Review
     - Priority: High (if complete) / Medium (if incomplete)
     - Due Date: Today + 1 day
     - Related Entity: Application #APP-2026-XXXXX
  3. Send Teams notification to Underwriting channel
  4. Send email confirmation to merchant
  5. Update application status in SQL
  6. Log workflow completion
```

**Workflow 2: Document Uploaded**
```
Trigger: Document uploaded to blob storage
Actions:
  1. Log workflow start
  2. Update document status in SQL
  3. If all required documents received:
     - Update application completeness status
     - Create Teams notification
  4. Log workflow completion
```

**Workflow 3: Application Status Change**
```
Trigger: Application status changed
Actions:
  1. Log status change
  2. Route notification based on new status:
     - Approved: Send congratulations email + Teams
     - Declined: Send decline email + Teams
     - Needs More Info: Send request email + Teams
  3. Update Microsoft Lists task status
  4. Log completion
```

**Workflow 4: Missing Document Alert**
```
Trigger: Scheduled (daily check) OR document request
Actions:
  1. Query applications with missing documents
  2. For each incomplete application:
     - Create or update reminder task in Lists
     - Send reminder email to merchant (max 1/week)
  3. If documents still missing after 7 days:
     - Escalate priority
     - Notify underwriting team
```

**Workflow 5: Daily Underwriting Reminder**
```
Trigger: Scheduled (daily at 9 AM)
Actions:
  1. Query pending applications older than 24 hours
  2. Send summary to underwriting channel
  3. Update Lists tasks with age indicators
```

### 10.2 Lists Task Types (Phase 1A)

| Task Type | Priority | SLA |
|-----------|----------|-----|
| Underwriting Review | High/Medium | 24 hours |
| Stipulation Follow-Up | High | 24 hours |
| Document Request | Medium | 48 hours |
| Compliance Review | High | 24 hours |
| Admin Task | Low | 72 hours |
| Sales Follow-Up | Medium | 48 hours |

### 10.3 Microsoft Lists Column Design

| Column | Type |
|--------|------|
| Task ID | Single line of text |
| Task Type | Choice |
| Functional Area | Choice |
| Priority | Choice |
| Status | Choice |
| Assigned To | Person |
| Backup Owner | Person |
| Created Date | Date/Time |
| Due Date | Date/Time |
| SLA Target | Date/Time |
| Related Entity Type | Single line |
| Related Entity ID | Single line |
| Source System | Single line |
| Source Event | Single line |
| Escalation Flag | Yes/No |
| Notes / Next Action | Multiple lines |

**Possible Task Types:** Underwriting Review, Stipulation Follow-Up, Collections Follow-Up, Failed Payment Exception, Sales Follow-Up, Marketing Task, Admin Task, Compliance Review, Renewal Review

**Possible Statuses:** New, In Progress, Waiting on Merchant, Waiting on Internal Review, Escalated, Completed, Cancelled

---

## 11. DEVELOPMENT SPRINTS

### Sprint 1: Foundation (Weeks 1-2)
- Azure infrastructure provisioned
- Database schema created
- Entra app registrations complete
- Base API project with auth

### Sprint 2: Public Website (Weeks 3-4)
- Professional landing page live
- Brand properly implemented
- SEO basics configured
- Contact/Apply CTAs functional

### Sprint 3: Merchant Portal - Core (Weeks 5-7)
- Merchant registration and login
- Application form (4 steps)
- Document upload
- Status dashboard

### Sprint 4: Internal Operations UI (Weeks 8-9)
- Internal team can view applications
- Can review documents
- Can approve/decline
- Can manage deals

### Sprint 5: Workflows & Integration (Week 10)
- n8n workflows operational
- Microsoft Lists integration
- Teams/email notifications
- Power Automate flows

### Sprint 6: Testing & Polish (Week 11)
- End-to-end testing complete
- Security review
- Performance optimization
- Bug fixes

### Sprint 7: Production Deployment (Week 12)
- Production environment ready
- Go-live successful
- Team trained and ready

---

## 12. FUTURE PHASES

### Phase 1B: Practical Upgrade Layer
- Bank statement extraction
- Automated risk scoring
- Underwriting report generation
- Missing-document chase automation
- Formal compliance checklisting
- Approval/stipulation workflow improvements
- Better dashboards and servicing visibility

### Phase 2: Automation and Intelligence
- Rules engine improvements
- Deeper fraud and risk models
- Stronger reporting/KPI frameworks
- More complete underwriting workbench

### Phase 3: Full Lifecycle Scale
- Broker/ISO portal
- Mature servicing
- Collections workflows
- ACH exception handling
- Reconciliation
- Renewals
- Portfolio analytics
- Accounting support
- Retention/archival/governance

---

## QUICK REFERENCE

### Key Decisions (LOCKED)
1. ✅ Microsoft-first, Azure-based architecture
2. ✅ Azure SQL Database as system of record
3. ✅ n8n for workflow orchestration
4. ✅ Microsoft Lists for human task layer (NOT system of record)
5. ✅ Python for document AI and analysis services
6. ✅ Stripe ACH for payment collection
7. ✅ True receivables purchase model (NOT a loan)

### Key Constraints
- Phase 1A MVP only - no advanced features
- Support 3-5 concurrent merchants initially
- All data in US Azure regions
- TDE enabled on Azure SQL
- Audit logging for all state changes

### Important Notes
- Do NOT deploy to Developer-controlled infrastructure
- All work happens in Client's Azure environment
- Change Orders required for any scope changes
- Technical Documentation is a material Deliverable
- Pre-existing Developer materials must be identified in writing

---

*End of LLM Context Document*
*Total: ~3,500 lines | For questions, refer to source documents in /Desktop/client/thinkfunding/*