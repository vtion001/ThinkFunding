# AGENTS.md - Think Funding LLC Phase 1A MVP
## Development Guidelines for AI Agents

**Version:** 1.0
**Date:** April 15, 2026
**Contract:** Vincent John Rodriguez - Phase1A-MSA-SOW
**Client:** Think Funding LLC (Aia Labja)
**Developer:** Vincent John Rodriguez

---

## CONTRACT OVERVIEW

### Payment Structure
| Milestone | Due Date | USD | PHP |
|-----------|----------|-----|-----|
| M1: Foundation | May 2, 2026 | $600 | 36,114 |
| M2: Core Platform | May 17, 2026 | $900 | 54,171 |
| M3: Completion | June 1, 2026 | $1,500 | 90,285 |
| **Total** | | **$3,000** | **180,570** |

### Critical Contract Clauses
1. **Section 9.4:** All work happens in **Client's Azure environment** - NOT developer infrastructure
2. **Section 10:** Technical Documentation is a **MATERIAL deliverable** - milestone can be rejected if incomplete
3. **Section 6:** Change Orders required for **ANY scope changes**
4. **Section 11:** All IP transfers to Client upon payment

### Order of Precedence
1. Agreement body
2. Exhibit A (SOW)
3. Exhibit B (Milestones)
4. Exhibit C (Out of Scope)

---

## TECHNICAL DOCUMENTATION REQUIREMENTS

**Per Contract Section 10.3 - ALL 10 ITEMS ARE REQUIRED**

| # | Document | Deliverable | Milestone | SharePoint Path |
|---|---------|-------------|-----------|-----------------|
| 1 | Solution overview and architecture summary | Architecture diagram, system overview | M1 | `/TechDocs/Architecture/` |
| 2 | Repository/codebase structure summary | File/folder structure, module purposes | M1 | `/TechDocs/Codebase/` |
| 3 | Environment/configuration notes (excl. secrets) | Config values, env vars (no secrets) | M1 | `/TechDocs/Configuration/` |
| 4 | Azure services used and their role in MVP | Service list with purposes | M1 | `/TechDocs/Architecture/` |
| 5 | Azure SQL schema/object overview | Tables, columns, relationships | M1 | `/TechDocs/Database/` |
| 6 | n8n workflow descriptions, trigger logic, purpose | Workflow docs for each | M2 | `/TechDocs/Workflows/` |
| 7 | Deployment notes and update steps | Deploy procedures | M2 | `/TechDocs/Deployment/` |
| 8 | Dependency list and third-party component summary | All NuGet/NPM packages | M2 | `/TechDocs/Dependencies/` |
| 9 | Troubleshooting/runbook notes | Error resolution, operational tasks | M2/M3 | `/TechDocs/Runbook/` |
| 10 | Known limitations, deferred items, assumptions | What works, what doesn't, what's deferred | M3 | `/TechDocs/Limitations/` |

**IMPORTANT:** Incomplete documentation can result in milestone rejection per Section 10.4.

---

## TECH STACK

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | React 18 SPA | TypeScript, Vite |
| Backend | ASP.NET Core 8 | C#, Entity Framework Core |
| Database | Azure SQL | System of Record per Section 10.1A |
| Storage | Azure Blob Storage | Documents, uploads |
| Auth (Internal) | Microsoft Entra ID | Employee login |
| Auth (Merchants) | ASP.NET Core Identity | Email/password |
| Workflow | n8n (Azure VM) | Azure-hosted |
| Tasks | Microsoft Lists | NOT a system of record |
| Notifications | Power Automate + n8n | Teams, Outlook |

---

## BRAND DESIGN SYSTEM

### Colors
```css
--color-navy: #0B2D4E;        /* Primary - Trust/Stability */
--color-navy-dark: #061A2C;   /* Headers/Footers */
--color-navy-light: #1A4A7A;  /* Hover states */
--color-teal: #199B93;         /* Accent - Growth/Motion */
--color-teal-light: #E6F5F4;   /* Light backgrounds */
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

--color-success: #10B981;
--color-warning: #F59E0B;
--color-danger: #EF4444;
--color-info: #3B82F6;
```

### Typography
- Font: Inter (Google Fonts)
- Weights: 400, 500, 600, 700
- Base size: 16px

### Spacing (4px base)
space-1: 4px, space-2: 8px, space-3: 12px, space-4: 16px, space-5: 20px, space-6: 24px, space-8: 32px, space-10: 40px, space-12: 48px, space-16: 64px

---

## DATABASE ARCHITECTURE

### System of Record
**Azure SQL Database is the authoritative system of record** per Contract Section 10.1A.

**Microsoft Lists is NOT a system of record** - it's a human task surface only.

### Core Tables

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
    Source NVARCHAR(100),
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
    ApplicationStatus NVARCHAR(50) DEFAULT 'Draft',
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
    DealStatus NVARCHAR(50) DEFAULT 'Pending',
    AdvanceAmount DECIMAL(18,2),
    FactorRate DECIMAL(5,3),
    PurchasePrice DECIMAL(18,2),
    DailyPaymentAmount DECIMAL(18,2),
    PaymentMethod NVARCHAR(50),
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

-- ComplianceChecks
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

-- ACHAuthorizations
CREATE TABLE ACHAuthorizations (
    ACHAuthorizationId INT IDENTITY(1,1) PRIMARY KEY,
    DealId INT NOT NULL,
    MerchantId INT NOT NULL,
    BankName NVARCHAR(100),
    RoutingNumber NVARCHAR(20),
    AccountNumberLast4 NVARCHAR(4),
    AccountType NVARCHAR(20),
    AuthorizationType NVARCHAR(50),
    AuthorizedBy NVARCHAR(255),
    AuthorizationDate DATE,
    StripeMandateId NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    RevokedAt DATETIME2
);

-- PaymentAttempts
CREATE TABLE PaymentAttempts (
    PaymentAttemptId INT IDENTITY(1,1) PRIMARY KEY,
    DealId INT NOT NULL,
    AttemptNumber INT NOT NULL,
    ScheduledDate DATE NOT NULL,
    Amount DECIMAL(18,2),
    Status NVARCHAR(50) DEFAULT 'Scheduled',
    FailureReason NVARCHAR(100),
    ReturnCategory NVARCHAR(50),
    StripePaymentIntentId NVARCHAR(255)
);

-- PaymentEvents
CREATE TABLE PaymentEvents (
    PaymentEventId INT IDENTITY(1,1) PRIMARY KEY,
    PaymentAttemptId INT NOT NULL,
    EventType NVARCHAR(100) NOT NULL,
    EventData NVARCHAR(MAX),
    StripeEventId NVARCHAR(255),
    OccurredAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Brokers
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

-- AuditLogs (Append-only)
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

### Required Indexes
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

### Design Principles
- Use UTC consistently
- Avoid hard deletes (use IsDeleted flags)
- Preserve audit history
- Keep PII access tightly restricted
- Every table includes: ingested_utc, updated_utc, source_system, created_by_principal_guid, updated_by_principal_guid

---

## AUTHENTICATION

### Hybrid Approach
| User Type | Auth Method | Implementation |
|-----------|------------|----------------|
| Internal Employees | Microsoft Entra ID | AzureAD authentication |
| Merchants | ASP.NET Core Identity | Email/password with JWT |

### Entra Configuration
- Single tenant (Think Funding tenant)
- RBAC with roles: Admin, Underwriter, Viewer
- Conditional Access policies for production

### API Endpoints

```
Authentication:
POST   /api/auth/login           - Merchant login
POST   /api/auth/register        - Merchant registration
POST   /api/auth/refresh         - Refresh token
POST   /api/auth/logout          - Logout
GET    /api/auth/me              - Current user

Merchants:
GET    /api/merchants                    - List merchants (internal)
GET    /api/merchants/{id}              - Get merchant details
POST   /api/merchants                    - Create merchant
PUT    /api/merchants/{id}              - Update merchant

Applications:
GET    /api/applications                  - List applications
GET    /api/applications/{id}            - Get application details
POST   /api/applications                  - Create application
PUT    /api/applications/{id}            - Update application
POST   /api/applications/{id}/submit      - Submit application
POST   /api/applications/{id}/approve    - Approve application
POST   /api/applications/{id}/decline    - Decline application
POST   /api/applications/{id}/request-info - Request more info

Documents:
GET    /api/documents                     - List documents
POST   /api/documents/upload              - Upload document
GET    /api/documents/{id}/download       - Get download URL
DELETE /api/documents/{id}               - Delete document

Deals:
GET    /api/deals                         - List deals
GET    /api/deals/{id}                   - Get deal details
POST   /api/deals                         - Create deal
PUT    /api/deals/{id}                   - Update deal
POST   /api/deals/{id}/fund              - Fund deal
POST   /api/deals/{id}/close             - Close deal
```

---

## FRONTEND STRUCTURE

### Public Website
```
/                   - Home page
/how-it-works       - How It Works
/about              - About page
/faq                - FAQ page
/contact            - Contact page
/apply              - Redirect to merchant portal
```

### Merchant Portal
```
/merchant/login                 - Login
/merchant/register              - Registration
/merchant/dashboard            - Dashboard
/merchant/application           - Application wizard (4 steps)
/merchant/application/step/1   - Business Information
/merchant/application/step/2   - Owner Information
/merchant/application/step/3   - Financial Information
/merchant/application/step/4   - Review & Submit
/merchant/documents            - Document upload
/merchant/profile              - Profile management
```

### Internal Operations UI
```
/ops/login                     - Employee login (Entra)
/ops/dashboard                - Dashboard
/ops/applications             - Application list
/ops/applications/{id}        - Application detail
/ops/deals                    - Deal list
/ops/deals/{id}               - Deal detail
/ops/collections              - Collections dashboard
/ops/merchants                - Merchant list
/ops/reports                  - Reports
/ops/settings                  - Settings
```

---

## N8N WORKFLOWS

### Core Workflows (M2 Deliverables)

1. **New Application Submission**
   - Trigger: Application Submitted via API
   - Create Microsoft Lists task
   - Send Teams notification
   - Send email confirmation

2. **Document Uploaded**
   - Trigger: Document uploaded to blob
   - Update document status in SQL
   - Notify if complete

3. **Application Status Change**
   - Trigger: Status changed
   - Route notification based on status
   - Update Lists task

4. **Missing Document Alert**
   - Trigger: Scheduled daily
   - Query incomplete applications
   - Send reminder emails

5. **Daily Underwriting Reminder**
   - Trigger: Scheduled 9 AM
   - Summary to underwriting channel

---

## IN-SCOPE FEATURES (Per Contract Exhibit A)

### Public Website
- [ ] Professional landing page
- [ ] Dark mode option (default: light)
- [ ] Hero, Value Props, How It Works
- [ ] Requirements, FAQ sections
- [ ] Footer with links

### Merchant Portal
- [ ] Login/Registration
- [ ] 4-step application wizard
- [ ] Save-and-return capability
- [ ] Document upload with drag-drop
- [ ] Status tracking dashboard

### Internal Operations
- [ ] Application list with filters
- [ ] Application detail (8 tabs)
- [ ] Deal management
- [ ] Collections dashboard
- [ ] Role-based access

### Infrastructure
- [ ] Azure App Service setup
- [ ] Azure SQL Database
- [ ] Azure Blob Storage
- [ ] Entra authentication
- [ ] n8n instance
- [ ] CI/CD pipeline

---

## OUT-OF-SCOPE (Per Contract Exhibit A Section A.5)

These are NOT included and require a Change Order if requested:
- [x] ~~AI, OCR, bank statement extraction~~ (Deferred to Phase 1B)
- [x] ~~Broker/ISO portal~~
- [x] ~~Full underwriting workbench, servicing, collections~~
- [x] ~~Advanced dashboards, BI, Power BI~~
- [x] ~~Mobile applications~~
- [x] ~~Penetration testing~~
- [x] ~~Any feature not expressly in Exhibit A~~

---

## TESTING REQUIREMENTS

### M3 Testing Deliverables
- Unit tests for API controllers
- Unit tests for services
- Integration tests for key flows
- E2E tests for critical user paths:
  - Merchant registration → application submission
  - Document upload flow
  - Internal review → approval workflow

### Test Coverage Minimum
- API: 80% coverage on business logic
- Frontend: Key user interactions tested

---

## SECURITY REQUIREMENTS

1. **No secrets in code** - Use Azure Key Vault or environment variables
2. **No developer infrastructure** - All work in Client's Azure environment
3. **Audit logging** - All state changes logged to AuditLogs table
4. **PII protection** - SSN, DOB encrypted at rest
5. **HTTPS only** - TLS 1.2+ enforced
6. **Input validation** - All user inputs sanitized

---

## DEPLOYMENT

### Environments
- **Development:** Developer sandbox (NOT client data)
- **Staging:** Azure App Service staging slot
- **Production:** Azure App Service production

### Deployment Steps
1. Build and test in development
2. Deploy to staging
3. Run integration tests
4. Client review in staging
5. Swap staging → production
6. Verify production

---

## CHANGE ORDER TEMPLATE

```markdown
# Change Order

**Date:** [Date]
**Requested By:** [Name]
**Affected Milestone:** [M1/M2/M3]

## Description
[Detailed description of requested change]

## Impact Assessment
**Fees:** $[Amount] increase/decrease
**Timeline:** [+/-] days to milestone [X]

## Acceptance Criteria
[How we verify this is complete]

## Signatures
Client: _________________ Date: ___
Developer: _____________ Date: ___
```

---

## CHECKLIST: PRE-MILESTONE REVIEW

### M1 Checklist
- [ ] Azure resources provisioned
- [ ] Database schema deployed
- [ ] API running with auth
- [ ] SharePoint docs uploaded:
  - [ ] Architecture overview
  - [ ] Codebase structure
  - [ ] Configuration notes
  - [ ] Azure services
  - [ ] Database schema

### M2 Checklist
- [ ] Public website complete
- [ ] Merchant portal functional
- [ ] Internal ops UI working
- [ ] n8n workflows operational
- [ ] Notifications sending
- [ ] SharePoint docs uploaded:
  - [ ] Workflow documentation
  - [ ] Deployment steps
  - [ ] Dependencies list
  - [ ] Runbook draft

### M3 Checklist
- [ ] All tests passing
- [ ] Production deployed
- [ ] Client UAT complete
- [ ] Sign-off received
- [ ] SharePoint docs complete:
  - [ ] Final runbook
  - [ ] Limitations
  - [ ] All previous docs updated

---

## REFERENCES

| Document | Location |
|----------|----------|
| Contract | `/Documentation/Vincent John Rodriguez - Phase1A-MSA-SOW_encrypted_.pdf` |
| LLM Context | `/Documentation/01_LLM_CONTEXT.md` |
| Implementation Guide | `/Documentation/02_IMPLEMENTATION_GUIDELINES.md` |
| Figma Prompts | `/Documentation/03_FIGMA_PROMPTS.md` |
| Developer Handoff | `/Documentation/04_DEVELOPER_HANDOFF.md` |
| Process Flow | `/Documentation/PROCESS_FLOW_EXTRACTED.md` |

---

*This AGENTS.md is the source of truth for Phase 1A MVP development. All agents must follow these guidelines.*
*Contract compliance is mandatory - deviation requires a signed Change Order.*
