using System.ComponentModel.DataAnnotations;

namespace ThinkFunding.Api.DTOs;

// Auth DTOs
public record LoginRequest(
    [Required][EmailAddress] string Email,
    [Required] string Password
);

public record LoginResponse(
    string Token,
    string RefreshToken,
    UserDto User
);

public record RefreshTokenRequest(string RefreshToken);

public record UserDto(
    int Id,
    string Email,
    string Role,
    string? BusinessName,
    string? BusinessId
);

// Merchant DTOs
public record MerchantDto(
    int Id,
    string BusinessId,
    string LegalName,
    string? DBAName,
    string? EIN,
    string? BusinessType,
    string? Industry,
    string? AddressLine1,
    string? City,
    string? State,
    string? ZipCode,
    string? Phone,
    string? Email,
    decimal? MonthlyRevenue,
    decimal? AverageDailyBalance,
    int NSFCount,
    string MerchantStatus,
    string? Source,
    int? BrokerId,
    DateTime CreatedAt
);

public record CreateMerchantRequest(
    [Required] string LegalName,
    string? DBAName,
    string? EIN,
    string? BusinessType,
    string? Industry,
    string? AddressLine1,
    string? City,
    string? State,
    string? ZipCode,
    string? Phone,
    [Required][EmailAddress] string Email,
    decimal? MonthlyRevenue,
    decimal? AverageDailyBalance,
    string? Source,
    int? BrokerId
);

public record UpdateMerchantRequest(
    string? LegalName,
    string? DBAName,
    string? EIN,
    string? BusinessType,
    string? Industry,
    string? AddressLine1,
    string? City,
    string? State,
    string? ZipCode,
    string? Phone,
    string? Email,
    decimal? MonthlyRevenue,
    decimal? AverageDailyBalance,
    int? NSFCount,
    string? MerchantStatus
);

// Application DTOs
public record ApplicationDto(
    int Id,
    string ApplicationNumber,
    int MerchantId,
    string? MerchantName,
    string ApplicationStatus,
    decimal? LoanAmountRequested,
    string? UseOfFunds,
    DateTime? SubmittedAt,
    int? ReviewedBy,
    string? ReviewedByName,
    string? DecisionNotes,
    DateTime CreatedAt,
    List<PersonDto>? Principals,
    List<DocumentDto>? Documents
);

public record CreateApplicationRequest(
    [Required] int MerchantId,
    decimal? LoanAmountRequested,
    string? UseOfFunds
);

public record UpdateApplicationRequest(
    decimal? LoanAmountRequested,
    string? UseOfFunds
);

public record SubmitApplicationRequest(
    List<int>? PrincipalIds
);

public record ReviewApplicationRequest(
    [Required] string Decision,
    string? DecisionNotes
);

// Person/Principal DTOs
public record PersonDto(
    int Id,
    string PersonType,
    decimal? OwnershipPercentage,
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    DateTime? DateOfBirth,
    string? SSNLast4,
    bool IsPEP,
    bool IsSanctionsMatch,
    int? MerchantId
);

public record CreatePersonRequest(
    [Required] string PersonType,
    decimal? OwnershipPercentage,
    [Required] string FirstName,
    [Required] string LastName,
    string? Email,
    string? Phone,
    DateTime? DateOfBirth,
    string? SSNLast4
);

// Deal DTOs
public record DealDto(
    int Id,
    string DealNumber,
    int ApplicationId,
    string? ApplicationNumber,
    int MerchantId,
    string? MerchantName,
    int? PrincipalId,
    string? PrincipalName,
    string DealStatus,
    decimal? AdvanceAmount,
    decimal? FactorRate,
    decimal? PurchasePrice,
    decimal? DailyPaymentAmount,
    string? PaymentMethod,
    DateTime? StartDate,
    DateTime? ExpectedEndDate,
    DateTime CreatedAt,
    ACHAuthorizationDto? ACHAuthorization
);

public record CreateDealRequest(
    [Required] int ApplicationId,
    [Required] decimal AdvanceAmount,
    [Required] decimal FactorRate,
    string? PaymentMethod,
    DateTime? StartDate
);

public record UpdateDealRequest(
    decimal? AdvanceAmount,
    decimal? FactorRate,
    decimal? DailyPaymentAmount,
    string? PaymentMethod,
    DateTime? StartDate,
    DateTime? ExpectedEndDate,
    string? DealStatus
);

public record FundDealRequest(
    [Required] int PrincipalId,
    [Required] ACHAuthorizationRequest ACHAuthorization
);

public record CloseDealRequest(
    string? Reason
);

// Document DTOs
public record DocumentDto(
    int Id,
    string DocumentType,
    string? DocumentSubType,
    int? ApplicationId,
    int? MerchantId,
    int? DealId,
    string? FileName,
    string? BlobPath,
    string? ContentType,
    long? FileSizeBytes,
    DateTime? UploadedAt,
    string ReviewStatus
);

public record UploadDocumentRequest(
    [Required] string DocumentType,
    string? DocumentSubType,
    int? ApplicationId,
    int? MerchantId,
    int? DealId
);

public record UpdateDocumentReviewRequest(
    [Required] string ReviewStatus,
    string? Notes
);

// ACH Authorization DTOs
public record ACHAuthorizationDto(
    int Id,
    int DealId,
    int MerchantId,
    string? BankName,
    string? RoutingNumber,
    string? AccountNumberLast4,
    string? AccountType,
    string? AuthorizationType,
    string? AuthorizedBy,
    DateTime? AuthorizationDate,
    string? StripeMandateId,
    bool IsActive
);

public record ACHAuthorizationRequest(
    [Required] string BankName,
    [Required] string RoutingNumber,
    [Required] string AccountNumberLast4,
    [Required] string AccountType,
    [Required] string AuthorizationType,
    [Required] string AuthorizedBy,
    DateTime? AuthorizationDate
);

// Payment DTOs
public record PaymentAttemptDto(
    int Id,
    int DealId,
    int AttemptNumber,
    DateTime ScheduledDate,
    decimal? Amount,
    string Status,
    string? FailureReason,
    string? ReturnCategory,
    DateTime CreatedAt
);

public record PaymentEventDto(
    int Id,
    int PaymentAttemptId,
    string EventType,
    string? EventData,
    string? StripeEventId,
    DateTime OccurredAt
);

// Broker DTOs
public record BrokerDto(
    int Id,
    string BrokerNumber,
    string CompanyName,
    string? ContactName,
    string? Email,
    decimal? CommissionRate,
    string BrokerStatus,
    DateTime CreatedAt
);

// Compliance DTOs
public record ComplianceCheckDto(
    int Id,
    int? ApplicationId,
    int? MerchantId,
    string CheckType,
    string CheckStatus,
    DateTime? CheckedAt,
    string? ResultData,
    string? Notes
);

// Pagination DTOs
public record PagedResult<T>(
    List<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages
);

public record PaginationRequest(
    int Page = 1,
    int PageSize = 20,
    string? SortBy = null,
    bool SortDescending = false
);

// Filter DTOs
public record ApplicationFilterRequest(
    string? Status = null,
    int? MerchantId = null,
    DateTime? FromDate = null,
    DateTime? ToDate = null
);

public record DealFilterRequest(
    string? Status = null,
    int? MerchantId = null,
    DateTime? FromDate = null,
    DateTime? ToDate = null
);

// API Response Wrappers
public record ApiResponse<T>(
    bool Success,
    T? Data,
    string? Message = null,
    List<string>? Errors = null
);

public record ApiErrorResponse(
    bool Success = false,
    string Message = "An error occurred",
    List<string>? Errors = null
);
