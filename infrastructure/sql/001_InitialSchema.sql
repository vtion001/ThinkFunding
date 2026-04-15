-- Think Funding LLC - Phase 1A MVP Database Schema
-- Azure SQL Database
-- System of Record per Contract Section 10.1A

-- ============================================
-- Core Tables
-- ============================================

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
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER
);

-- Persons (Owners, Guarantors, Principals)
CREATE TABLE Persons (
    PersonId INT IDENTITY(1,1) PRIMARY KEY,
    MerchantId INT NOT NULL,
    PersonType NVARCHAR(50) NOT NULL,  -- Owner, Guarantor, Principal
    OwnershipPercentage DECIMAL(5,2),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(20),
    DateOfBirth DATE,
    SSNLast4 NVARCHAR(4),
    AddressLine1 NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(50),
    ZipCode NVARCHAR(20),
    IsPEP BIT DEFAULT 0,
    IsSanctionsMatch BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId)
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
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId)
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
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (ApplicationId) REFERENCES Applications(ApplicationId),
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId),
    FOREIGN KEY (PrincipalId) REFERENCES Persons(PersonId)
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
    ReviewStatus NVARCHAR(50) DEFAULT 'Pending',  -- Pending, Verified, Rejected
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (ApplicationId) REFERENCES Applications(ApplicationId),
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId),
    FOREIGN KEY (DealId) REFERENCES Deals(DealId)
);

-- ComplianceChecks
CREATE TABLE ComplianceChecks (
    ComplianceCheckId INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationId INT,
    MerchantId INT,
    CheckType NVARCHAR(100) NOT NULL,
    CheckStatus NVARCHAR(50) DEFAULT 'Pending',  -- Pending, Passed, Failed, Skipped
    CheckedAt DATETIME2,
    ResultData NVARCHAR(MAX),
    Notes NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (ApplicationId) REFERENCES Applications(ApplicationId),
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId)
);

-- ACHAuthorizations
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
    RevokedAt DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (DealId) REFERENCES Deals(DealId),
    FOREIGN KEY (MerchantId) REFERENCES Merchants(MerchantId)
);

-- PaymentAttempts
CREATE TABLE PaymentAttempts (
    PaymentAttemptId INT IDENTITY(1,1) PRIMARY KEY,
    DealId INT NOT NULL,
    AttemptNumber INT NOT NULL,
    ScheduledDate DATE NOT NULL,
    Amount DECIMAL(18,2),
    Status NVARCHAR(50) DEFAULT 'Scheduled',  -- Scheduled, Processing, Succeeded, Failed, Returned
    FailureReason NVARCHAR(100),
    ReturnCategory NVARCHAR(50),  -- NSF, Admin, Unauthorized
    StripePaymentIntentId NVARCHAR(255),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (DealId) REFERENCES Deals(DealId)
);

-- PaymentEvents
CREATE TABLE PaymentEvents (
    PaymentEventId INT IDENTITY(1,1) PRIMARY KEY,
    PaymentAttemptId INT NOT NULL,
    EventType NVARCHAR(100) NOT NULL,
    EventData NVARCHAR(MAX),
    StripeEventId NVARCHAR(255),
    OccurredAt DATETIME2 DEFAULT GETUTCDATE(),
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    FOREIGN KEY (PaymentAttemptId) REFERENCES PaymentAttempts(PaymentAttemptId)
);

-- Brokers (ISOs)
CREATE TABLE Brokers (
    BrokerId INT IDENTITY(1,1) PRIMARY KEY,
    BrokerNumber NVARCHAR(50) NOT NULL UNIQUE,
    CompanyName NVARCHAR(255) NOT NULL,
    ContactName NVARCHAR(100),
    Email NVARCHAR(255),
    Phone NVARCHAR(20),
    CommissionRate DECIMAL(5,3),
    BrokerStatus NVARCHAR(50) DEFAULT 'Active',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsDeleted BIT DEFAULT 0,
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER,
    UpdatedByPrincipalGuid UNIQUEIDENTIFIER
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
    Timestamp DATETIME2 DEFAULT GETUTCDATE(),
    IngestedUtc DATETIME2 DEFAULT GETUTCDATE(),
    SourceSystem NVARCHAR(50) DEFAULT 'System',
    CreatedByPrincipalGuid UNIQUEIDENTIFIER
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX IX_Applications_Merchant ON Applications(MerchantId);
CREATE INDEX IX_Applications_Status ON Applications(ApplicationStatus);
CREATE INDEX IX_Deals_Merchant ON Deals(MerchantId);
CREATE INDEX IX_Deals_Status ON Deals(DealStatus);
CREATE INDEX IX_Deals_Application ON Deals(ApplicationId);
CREATE INDEX IX_Documents_Application ON Documents(ApplicationId);
CREATE INDEX IX_Documents_Merchant ON Documents(MerchantId);
CREATE INDEX IX_Documents_Type ON Documents(DocumentType);
CREATE INDEX IX_Documents_Deal ON Documents(DealId);
CREATE INDEX IX_PaymentAttempts_Deal ON PaymentAttempts(DealId);
CREATE INDEX IX_PaymentAttempts_Scheduled ON PaymentAttempts(ScheduledDate);
CREATE INDEX IX_PaymentAttempts_Status ON PaymentAttempts(Status);
CREATE INDEX IX_PaymentEvents_Attempt ON PaymentEvents(PaymentAttemptId);
CREATE INDEX IX_AuditLogs_Entity ON AuditLogs(EntityType, EntityId);
CREATE INDEX IX_AuditLogs_Timestamp ON AuditLogs(Timestamp);
CREATE INDEX IX_Merchants_Status ON Merchants(MerchantStatus);
CREATE INDEX IX_Persons_Merchant ON Persons(MerchantId);
CREATE INDEX IX_ComplianceChecks_Application ON ComplianceChecks(ApplicationId);
CREATE INDEX IX_ACHAuthorizations_Deal ON ACHAuthorizations(DealId);

-- ============================================
-- Stored Procedures for Business IDs
-- ============================================

GO

CREATE OR ALTER PROCEDURE sp_GetNextBusinessId
AS
BEGIN
    DECLARE @Year NVARCHAR(4) = CAST(YEAR(GETUTCDATE()) AS NVARCHAR(4))
    DECLARE @Prefix NVARCHAR(10) = 'TF-' + @Year + '-'
    DECLARE @MaxId INT
    
    SELECT @MaxId = ISNULL(MAX(CAST(RIGHT(BusinessId, 5) AS INT)), 0)
    FROM Merchants
    WHERE BusinessId LIKE @Prefix + '%'
    
    SELECT @Prefix + RIGHT('00000' + CAST(@MaxId + 1 AS NVARCHAR(5)), 5) AS NextBusinessId
END

GO

CREATE OR ALTER PROCEDURE sp_GetNextApplicationNumber
AS
BEGIN
    DECLARE @Year NVARCHAR(4) = CAST(YEAR(GETUTCDATE()) AS NVARCHAR(4))
    DECLARE @Prefix NVARCHAR(10) = 'APP-' + @Year + '-'
    DECLARE @MaxId INT
    
    SELECT @MaxId = ISNULL(MAX(CAST(RIGHT(ApplicationNumber, 5) AS INT)), 0)
    FROM Applications
    WHERE ApplicationNumber LIKE @Prefix + '%'
    
    SELECT @Prefix + RIGHT('00000' + CAST(@MaxId + 1 AS NVARCHAR(5)), 5) AS NextApplicationNumber
END

GO

CREATE OR ALTER PROCEDURE sp_GetNextDealNumber
AS
BEGIN
    DECLARE @Year NVARCHAR(4) = CAST(YEAR(GETUTCDATE()) AS NVARCHAR(4))
    DECLARE @Prefix NVARCHAR(10) = 'DEAL-' + @Year + '-'
    DECLARE @MaxId INT
    
    SELECT @MaxId = ISNULL(MAX(CAST(RIGHT(DealNumber, 5) AS INT)), 0)
    FROM Deals
    WHERE DealNumber LIKE @Prefix + '%'
    
    SELECT @Prefix + RIGHT('00000' + CAST(@MaxId + 1 AS NVARCHAR(5)), 5) AS NextDealNumber
END

GO

CREATE OR ALTER PROCEDURE sp_GetNextBrokerNumber
AS
BEGIN
    DECLARE @Prefix NVARCHAR(10) = 'BRK-'
    DECLARE @MaxId INT
    
    SELECT @MaxId = ISNULL(MAX(CAST(RIGHT(BrokerNumber, 5) AS INT)), 0)
    FROM Brokers
    WHERE BrokerNumber LIKE @Prefix + '%'
    
    SELECT @Prefix + RIGHT('00000' + CAST(@MaxId + 1 AS NVARCHAR(5)), 5) AS NextBrokerNumber
END
