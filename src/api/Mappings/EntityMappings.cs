using System.Text.Json;
using ThinkFunding.Api.DTOs;
using ThinkFunding.Api.Models;

namespace ThinkFunding.Api.Mappings;

public static class EntityMappings
{
    public static MerchantDto ToDto(this Merchant merchant)
    {
        return new MerchantDto(
            merchant.Id,
            merchant.BusinessId,
            merchant.LegalName,
            merchant.DBAName,
            merchant.EIN,
            merchant.BusinessType,
            merchant.Industry,
            merchant.AddressLine1,
            merchant.City,
            merchant.State,
            merchant.ZipCode,
            merchant.Phone,
            merchant.Email,
            merchant.MonthlyRevenue,
            merchant.AverageDailyBalance,
            merchant.NSFCount,
            merchant.MerchantStatus,
            merchant.Source,
            merchant.BrokerId,
            merchant.CreatedAt
        );
    }

    public static ApplicationDto ToDto(this Application application, bool includeDetails = true)
    {
        return new ApplicationDto(
            application.Id,
            application.ApplicationNumber,
            application.MerchantId,
            application.Merchant?.LegalName,
            application.ApplicationStatus,
            application.LoanAmountRequested,
            application.UseOfFunds,
            application.SubmittedAt,
            application.ReviewedBy,
            null,
            application.DecisionNotes,
            application.CreatedAt,
            includeDetails ? application.Persons?.Select(p => p.ToDto()).ToList() : null,
            includeDetails ? application.Documents?.Select(d => d.ToDto()).ToList() : null
        );
    }

    public static DealDto ToDto(this Deal deal)
    {
        return new DealDto(
            deal.Id,
            deal.DealNumber,
            deal.ApplicationId,
            deal.Application?.ApplicationNumber,
            deal.MerchantId,
            deal.Merchant?.LegalName,
            deal.PrincipalId,
            deal.Principal != null ? $"{deal.Principal.FirstName} {deal.Principal.LastName}" : null,
            deal.DealStatus,
            deal.AdvanceAmount,
            deal.FactorRate,
            deal.PurchasePrice,
            deal.DailyPaymentAmount,
            deal.PaymentMethod,
            deal.StartDate,
            deal.ExpectedEndDate,
            deal.CreatedAt,
            deal.ACHAuthorization?.ToDto()
        );
    }

    public static DocumentDto ToDto(this Document document)
    {
        return new DocumentDto(
            document.Id,
            document.DocumentType,
            document.DocumentSubType,
            document.ApplicationId,
            document.MerchantId,
            document.DealId,
            document.FileName,
            document.BlobPath,
            document.ContentType,
            document.FileSizeBytes,
            document.UploadedAt,
            document.ReviewStatus
        );
    }

    public static ACHAuthorizationDto ToDto(this ACHAuthorization auth)
    {
        return new ACHAuthorizationDto(
            auth.Id,
            auth.DealId,
            auth.MerchantId,
            auth.BankName,
            auth.RoutingNumber,
            auth.AccountNumberLast4,
            auth.AccountType,
            auth.AuthorizationType,
            auth.AuthorizedBy,
            auth.AuthorizationDate,
            auth.StripeMandateId,
            auth.IsActive
        );
    }

    public static PersonDto ToDto(this Person person)
    {
        return new PersonDto(
            person.Id,
            person.PersonType,
            person.OwnershipPercentage,
            person.FirstName,
            person.LastName,
            person.Email,
            person.Phone,
            person.DateOfBirth,
            person.SSNLast4,
            person.IsPEP,
            person.IsSanctionsMatch,
            person.MerchantId
        );
    }

    public static BrokerDto ToDto(this Broker broker)
    {
        return new BrokerDto(
            broker.Id,
            broker.BrokerNumber,
            broker.CompanyName,
            broker.ContactName,
            broker.Email,
            broker.CommissionRate,
            broker.BrokerStatus,
            broker.CreatedAt
        );
    }

    public static ComplianceCheckDto ToDto(this ComplianceCheck check)
    {
        return new ComplianceCheckDto(
            check.Id,
            check.ApplicationId,
            check.MerchantId,
            check.CheckType,
            check.CheckStatus,
            check.CheckedAt,
            check.ResultData,
            check.Notes
        );
    }

    public static PaymentAttemptDto ToDto(this PaymentAttempt attempt)
    {
        return new PaymentAttemptDto(
            attempt.Id,
            attempt.DealId,
            attempt.AttemptNumber,
            attempt.ScheduledDate,
            attempt.Amount,
            attempt.Status,
            attempt.FailureReason,
            attempt.ReturnCategory,
            attempt.CreatedAt
        );
    }

    public static PaymentEventDto ToDto(this PaymentEvent evt)
    {
        return new PaymentEventDto(
            evt.Id,
            evt.PaymentAttemptId,
            evt.EventType,
            evt.EventData,
            evt.StripeEventId,
            evt.OccurredAt
        );
    }
}

public static class JsonExtensions
{
    public static string ToJson(this object obj)
    {
        return JsonSerializer.Serialize(obj, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
    }

    public static T? FromJson<T>(this string json)
    {
        return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
    }
}
