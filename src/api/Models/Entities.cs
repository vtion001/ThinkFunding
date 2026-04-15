using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThinkFunding.Api.Models;

public abstract class BaseEntity
{
    [Key]
    public int Id { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
    
    public bool IsDeleted { get; set; } = false;
    
    public string? CreatedBy { get; set; }
    
    public string? UpdatedBy { get; set; }
}

public class Merchant : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string BusinessId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string LegalName { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? DBAName { get; set; }
    
    [MaxLength(20)]
    public string? EIN { get; set; }
    
    [MaxLength(50)]
    public string? BusinessType { get; set; }
    
    [MaxLength(100)]
    public string? Industry { get; set; }
    
    [MaxLength(255)]
    public string? AddressLine1 { get; set; }
    
    [MaxLength(100)]
    public string? City { get; set; }
    
    [MaxLength(50)]
    public string? State { get; set; }
    
    [MaxLength(20)]
    public string? ZipCode { get; set; }
    
    [MaxLength(20)]
    public string? Phone { get; set; }
    
    [MaxLength(255)]
    public string? Email { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? MonthlyRevenue { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? AverageDailyBalance { get; set; }
    
    public int NSFCount { get; set; } = 0;
    
    [MaxLength(50)]
    public string MerchantStatus { get; set; } = "Active";
    
    [MaxLength(100)]
    public string? Source { get; set; }
    
    public int? BrokerId { get; set; }
    
    public Broker? Broker { get; set; }
    
    public ICollection<Application> Applications { get; set; } = new List<Application>();
    
    public ICollection<Person> Persons { get; set; } = new List<Person>();
    
    public ICollection<Document> Documents { get; set; } = new List<Document>();
}

public class Person : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string PersonType { get; set; } = string.Empty;
    
    [Column(TypeName = "decimal(5,2)")]
    public decimal? OwnershipPercentage { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Email { get; set; }
    
    [MaxLength(20)]
    public string? Phone { get; set; }
    
    public DateTime? DateOfBirth { get; set; }
    
    [MaxLength(4)]
    public string? SSNLast4 { get; set; }
    
    public bool IsPEP { get; set; } = false;
    
    public bool IsSanctionsMatch { get; set; } = false;
    
    public int? MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
}

public class Application : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string ApplicationNumber { get; set; } = string.Empty;
    
    public int MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
    
    [MaxLength(50)]
    public string ApplicationStatus { get; set; } = "Draft";
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? LoanAmountRequested { get; set; }
    
    [MaxLength(500)]
    public string? UseOfFunds { get; set; }
    
    public DateTime? SubmittedAt { get; set; }
    
    public int? ReviewedBy { get; set; }
    
    public string? DecisionNotes { get; set; }
    
    public ICollection<Document> Documents { get; set; } = new List<Document>();
    
    public ICollection<Deal> Deals { get; set; } = new List<Deal>();
    
    public ICollection<ComplianceCheck> ComplianceChecks { get; set; } = new List<ComplianceCheck>();
}

public class Deal : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string DealNumber { get; set; } = string.Empty;
    
    public int ApplicationId { get; set; }
    
    public Application? Application { get; set; }
    
    public int MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
    
    public int? PrincipalId { get; set; }
    
    public Person? Principal { get; set; }
    
    [MaxLength(50)]
    public string DealStatus { get; set; } = "Pending";
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? AdvanceAmount { get; set; }
    
    [Column(TypeName = "decimal(5,3)")]
    public decimal? FactorRate { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? PurchasePrice { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? DailyPaymentAmount { get; set; }
    
    [MaxLength(50)]
    public string? PaymentMethod { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? ExpectedEndDate { get; set; }
    
    public ICollection<PaymentAttempt> PaymentAttempts { get; set; } = new List<PaymentAttempt>();
    
    public ACHAuthorization? ACHAuthorization { get; set; }
}

public class Document : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string DocumentType { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? DocumentSubType { get; set; }
    
    public int? ApplicationId { get; set; }
    
    public Application? Application { get; set; }
    
    public int? MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
    
    public int? DealId { get; set; }
    
    public Deal? Deal { get; set; }
    
    [MaxLength(255)]
    public string? FileName { get; set; }
    
    [MaxLength(500)]
    public string? BlobPath { get; set; }
    
    [MaxLength(100)]
    public string? ContentType { get; set; }
    
    public long? FileSizeBytes { get; set; }
    
    public int? UploadedBy { get; set; }
    
    public DateTime? UploadedAt { get; set; }
    
    [MaxLength(50)]
    public string ReviewStatus { get; set; } = "Pending";
}

public class ComplianceCheck : BaseEntity
{
    public int? ApplicationId { get; set; }
    
    public Application? Application { get; set; }
    
    public int? MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string CheckType { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string CheckStatus { get; set; } = "Pending";
    
    public DateTime? CheckedAt { get; set; }
    
    public string? ResultData { get; set; }
    
    public string? Notes { get; set; }
}

public class ACHAuthorization : BaseEntity
{
    public int DealId { get; set; }
    
    public Deal? Deal { get; set; }
    
    public int MerchantId { get; set; }
    
    public Merchant? Merchant { get; set; }
    
    [MaxLength(100)]
    public string? BankName { get; set; }
    
    [MaxLength(20)]
    public string? RoutingNumber { get; set; }
    
    [MaxLength(4)]
    public string? AccountNumberLast4 { get; set; }
    
    [MaxLength(20)]
    public string? AccountType { get; set; }
    
    [MaxLength(50)]
    public string? AuthorizationType { get; set; }
    
    [MaxLength(255)]
    public string? AuthorizedBy { get; set; }
    
    public DateTime? AuthorizationDate { get; set; }
    
    [MaxLength(255)]
    public string? StripeMandateId { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime? RevokedAt { get; set; }
}

public class PaymentAttempt : BaseEntity
{
    public int DealId { get; set; }
    
    public Deal? Deal { get; set; }
    
    public int AttemptNumber { get; set; }
    
    public DateTime ScheduledDate { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? Amount { get; set; }
    
    [MaxLength(50)]
    public string Status { get; set; } = "Scheduled";
    
    [MaxLength(100)]
    public string? FailureReason { get; set; }
    
    [MaxLength(50)]
    public string? ReturnCategory { get; set; }
    
    [MaxLength(255)]
    public string? StripePaymentIntentId { get; set; }
    
    public ICollection<PaymentEvent> PaymentEvents { get; set; } = new List<PaymentEvent>();
}

public class PaymentEvent : BaseEntity
{
    public int PaymentAttemptId { get; set; }
    
    public PaymentAttempt? PaymentAttempt { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string EventType { get; set; } = string.Empty;
    
    public string? EventData { get; set; }
    
    [MaxLength(255)]
    public string? StripeEventId { get; set; }
    
    public DateTime OccurredAt { get; set; } = DateTime.UtcNow;
}

public class Broker : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string BrokerNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string CompanyName { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? ContactName { get; set; }
    
    [MaxLength(255)]
    public string? Email { get; set; }
    
    [Column(TypeName = "decimal(5,3)")]
    public decimal? CommissionRate { get; set; }
    
    [MaxLength(50)]
    public string BrokerStatus { get; set; } = "Active";
    
    public ICollection<Merchant> Merchants { get; set; } = new List<Merchant>();
}

public class AuditLog
{
    [Key]
    public long AuditLogId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string EntityType { get; set; } = string.Empty;
    
    public int EntityId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Action { get; set; } = string.Empty;
    
    public string? OldValue { get; set; }
    
    public string? NewValue { get; set; }
    
    public int? ChangedBy { get; set; }
    
    [MaxLength(255)]
    public string? ChangedByName { get; set; }
    
    [MaxLength(50)]
    public string? IPAddress { get; set; }
    
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
