# Database Schema Documentation

## Overview

Azure SQL Database is the authoritative **System of Record** for all business data per Contract Section 10.1A. Microsoft Lists is NOT a system of record - it's a human task surface only.

## Database Design Principles

- UTC timestamps for all datetime fields
- Soft deletes (IsDeleted flag) instead of hard deletes
- Audit trail preserved via AuditLogs table
- PII access tightly restricted (SSN, DOB encrypted at application level)
- Every table includes: CreatedAt, UpdatedAt, IsDeleted

## Tables

### Merchants
Primary entity representing business clients.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| BusinessId | NVARCHAR(50) | UNIQUE | Public ID (e.g., TF-2026-00001) |
| LegalName | NVARCHAR(255) | NOT NULL | Legal business name |
| DBAName | NVARCHAR(255) | | "Doing Business As" name |
| EIN | NVARCHAR(20) | | Employer Identification Number |
| BusinessType | NVARCHAR(50) | | LLC, Corporation, etc. |
| Industry | NVARCHAR(100) | | Business industry |
| AddressLine1 | NVARCHAR(255) | | Street address |
| City | NVARCHAR(100) | | City |
| State | NVARCHAR(50) | | State |
| ZipCode | NVARCHAR(20) | | ZIP code |
| Phone | NVARCHAR(20) | | Phone number |
| Email | NVARCHAR(255) | | Contact email |
| MonthlyRevenue | DECIMAL(18,2) | | Average monthly revenue |
| AverageDailyBalance | DECIMAL(18,2) | | Average daily balance |
| NSFCount | INT | DEFAULT 0 | NSF items in 6 months |
| MerchantStatus | NVARCHAR(50) | DEFAULT 'Active' | Active, Pending, etc. |
| Source | NVARCHAR(100) | | Lead source (Direct, ISO, etc.) |
| BrokerId | INT | FK | Referral broker |
| CreatedAt | DATETIME2 | DEFAULT GETUTCDATE() | Creation timestamp |
| UpdatedAt | DATETIME2 | | Last update timestamp |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### Persons
Owners, guarantors, and principals.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| PersonType | NVARCHAR(50) | NOT NULL | Owner, Guarantor, Principal |
| OwnershipPercentage | DECIMAL(5,2) | | Ownership % |
| FirstName | NVARCHAR(100) | NOT NULL | First name |
| LastName | NVARCHAR(100) | NOT NULL | Last name |
| Email | NVARCHAR(255) | | Contact email |
| Phone | NVARCHAR(20) | | Phone number |
| DateOfBirth | DATE | | Date of birth (PII) |
| SSNLast4 | NVARCHAR(4) | | Last 4 SSN (PII) |
| IsPEP | BIT | DEFAULT 0 | Politically Exposed Person |
| IsSanctionsMatch | BIT | DEFAULT 0 | OFAC sanctions match |
| MerchantId | INT | FK | Associated merchant |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### Applications
Merchant funding applications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| ApplicationNumber | NVARCHAR(50) | UNIQUE | Public ID (APP-2026-00001) |
| MerchantId | INT | FK, NOT NULL | Associated merchant |
| ApplicationStatus | NVARCHAR(50) | DEFAULT 'Draft' | Draft, Submitted, Approved, Declined |
| LoanAmountRequested | DECIMAL(18,2) | | Requested amount |
| UseOfFunds | NVARCHAR(500) | | Purpose of funds |
| SubmittedAt | DATETIME2 | | Submission timestamp |
| ReviewedBy | INT | | Reviewing user ID |
| DecisionNotes | NVARCHAR(MAX) | | Underwriting notes |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### Deals
Funded merchant agreements.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| DealNumber | NVARCHAR(50) | UNIQUE | Public ID (DEAL-2026-00001) |
| ApplicationId | INT | FK | Source application |
| MerchantId | INT | FK | Associated merchant |
| PrincipalId | INT | FK | Responsible principal |
| DealStatus | NVARCHAR(50) | DEFAULT 'Pending' | Pending, Active, Completed, Default |
| AdvanceAmount | DECIMAL(18,2) | | Amount advanced |
| FactorRate | DECIMAL(5,3) | | Factor rate (e.g., 1.25) |
| PurchasePrice | DECIMAL(18,2) | | Total purchase price |
| DailyPaymentAmount | DECIMAL(18,2) | | Daily ACH amount |
| PaymentMethod | NVARCHAR(50) | | ACH, etc. |
| StartDate | DATE | | Funding start date |
| ExpectedEndDate | DATE | | Expected payoff date |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### Documents
Uploaded files (stored in Azure Blob, metadata in SQL).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| DocumentType | NVARCHAR(100) | NOT NULL | ID, BankStatement, etc. |
| DocumentSubType | NVARCHAR(100) | | Specific type |
| ApplicationId | INT | FK | Associated application |
| MerchantId | INT | FK | Associated merchant |
| DealId | INT | FK | Associated deal |
| FileName | NVARCHAR(255) | | Original filename |
| BlobPath | NVARCHAR(500) | | Azure Blob path |
| ContentType | NVARCHAR(100) | | MIME type |
| FileSizeBytes | BIGINT | | File size |
| UploadedBy | INT | | Uploading user |
| UploadedAt | DATETIME2 | | Upload timestamp |
| ReviewStatus | NVARCHAR(50) | DEFAULT 'Pending' | Pending, Verified, Rejected |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### ACHAuthorizations
Bank account authorizations for ACH payments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| DealId | INT | FK, NOT NULL | Associated deal |
| MerchantId | INT | FK | Associated merchant |
| BankName | NVARCHAR(100) | | Bank name |
| RoutingNumber | NVARCHAR(20) | | ABA routing number |
| AccountNumberLast4 | NVARCHAR(4) | | Last 4 digits |
| AccountType | NVARCHAR(20) | | Checking, Savings |
| AuthorizationType | NVARCHAR(50) | | Type of auth |
| AuthorizedBy | NVARCHAR(255) | | Authorizing person |
| AuthorizationDate | DATE | | Auth date |
| StripeMandateId | NVARCHAR(255) | | Stripe ACH mandate |
| IsActive | BIT | DEFAULT 1 | Active authorization |
| RevokedAt | DATETIME2 | | Revocation timestamp |

### PaymentAttempts
Individual payment collection attempts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| DealId | INT | FK | Associated deal |
| AttemptNumber | INT | NOT NULL | Sequential attempt # |
| ScheduledDate | DATE | NOT NULL | Scheduled date |
| Amount | DECIMAL(18,2) | | Payment amount |
| Status | NVARCHAR(50) | DEFAULT 'Scheduled' | Scheduled, Received, Failed, Returned |
| FailureReason | NVARCHAR(100) | | Failure description |
| ReturnCategory | NVARCHAR(50) | | NSF, Account Closed, etc. |
| StripePaymentIntentId | NVARCHAR(255) | | Stripe payment ID |

### PaymentEvents
Immutable event log for payments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| PaymentAttemptId | INT | FK | Parent attempt |
| EventType | NVARCHAR(100) | NOT NULL | Event type |
| EventData | NVARCHAR(MAX) | | JSON event data |
| StripeEventId | NVARCHAR(255) | | Stripe event ID |
| OccurredAt | DATETIME2 | DEFAULT GETUTCDATE() | Event timestamp |

### ComplianceChecks
Results of compliance screening.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| ApplicationId | INT | FK | Associated application |
| MerchantId | INT | FK | Associated merchant |
| CheckType | NVARCHAR(100) | NOT NULL | PEP, Sanctions, etc. |
| CheckStatus | NVARCHAR(50) | DEFAULT 'Pending' | Status |
| CheckedAt | DATETIME2 | | Check timestamp |
| ResultData | NVARCHAR(MAX) | | JSON results |
| Notes | NVARCHAR(MAX) | | Review notes |

### Brokers
Broker/ISO referral partners.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | INT | PK, IDENTITY | Primary key |
| BrokerNumber | NVARCHAR(50) | UNIQUE | Public ID |
| CompanyName | NVARCHAR(255) | NOT NULL | Company name |
| ContactName | NVARCHAR(100) | | Contact person |
| Email | NVARCHAR(255) | | Contact email |
| CommissionRate | DECIMAL(5,3) | | Commission % |
| BrokerStatus | NVARCHAR(50) | DEFAULT 'Active' | Active, Inactive |
| IsDeleted | BIT | DEFAULT 0 | Soft delete flag |

### AuditLogs
Immutable audit trail (append-only).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| AuditLogId | BIGINT | PK, IDENTITY | Primary key |
| EntityType | NVARCHAR(100) | NOT NULL | Table/entity name |
| EntityId | INT | NOT NULL | Record ID |
| Action | NVARCHAR(100) | NOT NULL | Create, Update, Delete |
| OldValue | NVARCHAR(MAX) | | Previous value (JSON) |
| NewValue | NVARCHAR(MAX) | | New value (JSON) |
| ChangedBy | INT | | User ID |
| ChangedByName | NVARCHAR(255) | | User name |
| IPAddress | NVARCHAR(50) | | Client IP |
| Timestamp | DATETIME2 | DEFAULT GETUTCDATE() | Event timestamp |

## Indexes

```sql
-- Applications
CREATE INDEX IX_Applications_Merchant ON Applications(MerchantId);
CREATE INDEX IX_Applications_Status ON Applications(ApplicationStatus);

-- Deals
CREATE INDEX IX_Deals_Merchant ON Deals(MerchantId);
CREATE INDEX IX_Deals_Status ON Deals(DealStatus);

-- Documents
CREATE INDEX IX_Documents_Application ON Documents(ApplicationId);
CREATE INDEX IX_Documents_Merchant ON Documents(MerchantId);
CREATE INDEX IX_Documents_Type ON Documents(DocumentType);

-- PaymentAttempts
CREATE INDEX IX_PaymentAttempts_Deal ON PaymentAttempts(DealId);
CREATE INDEX IX_PaymentAttempts_Scheduled ON PaymentAttempts(ScheduledDate);

-- AuditLogs
CREATE INDEX IX_AuditLogs_Entity ON AuditLogs(EntityType, EntityId);
CREATE INDEX IX_AuditLogs_Timestamp ON AuditLogs(Timestamp);
```

## Relationships

```
Merchants (1) ─── (M) Persons
    │
    └── (1) ─── (M) Applications (1) ─── (M) Documents
                  │
                  └── (1) ─── (M) Deals (1) ─── (1) ACHAuthorizations
                                │
                                └── (1) ─── (M) PaymentAttempts (1) ─── (M) PaymentEvents
```
