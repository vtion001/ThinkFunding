using Microsoft.AspNetCore.Mvc;
using ThinkFunding.Api.DTOs;

namespace ThinkFunding.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class BaseApiController : ControllerBase
{
    protected IActionResult Success<T>(T data, string? message = null)
    {
        return Ok(new ApiResponse<T>(true, data, message));
    }
    
    protected IActionResult Created<T>(T data, string? message = null)
    {
        return StatusCode(201, new ApiResponse<T>(true, data, message));
    }
    
    protected IActionResult Error(string message, List<string>? errors = null)
    {
        return BadRequest(new ApiErrorResponse(false, message, errors));
    }
    
    protected IActionResult NotFoundError(string message)
    {
        return NotFound(new ApiErrorResponse(false, message));
    }
}

[Route("api/[controller]")]
[ApiController]
public class MerchantsController : BaseApiController
{
    private readonly IMerchantService _merchantService;
    
    public MerchantsController(IMerchantService merchantService)
    {
        _merchantService = merchantService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status = null)
    {
        List<Merchant> merchants;
        if (!string.IsNullOrEmpty(status))
        {
            merchants = await _merchantService.GetByStatusAsync(status);
        }
        else
        {
            merchants = await _merchantService.GetAllAsync();
        }
        
        var dtos = merchants.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var merchant = await _merchantService.GetByIdAsync(id);
        if (merchant == null)
            return NotFoundError("Merchant not found");
        
        return Success(MapToDto(merchant));
    }
    
    [HttpGet("businessId/{businessId}")]
    public async Task<IActionResult> GetByBusinessId(string businessId)
    {
        var merchant = await _merchantService.GetByBusinessIdAsync(businessId);
        if (merchant == null)
            return NotFoundError("Merchant not found");
        
        return Success(MapToDto(merchant));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMerchantRequest request)
    {
        var merchant = new Merchant
        {
            LegalName = request.LegalName,
            DBAName = request.DBAName,
            EIN = request.EIN,
            BusinessType = request.BusinessType,
            Industry = request.Industry,
            AddressLine1 = request.AddressLine1,
            City = request.City,
            State = request.State,
            ZipCode = request.ZipCode,
            Phone = request.Phone,
            Email = request.Email,
            MonthlyRevenue = request.MonthlyRevenue,
            AverageDailyBalance = request.AverageDailyBalance,
            Source = request.Source,
            BrokerId = request.BrokerId
        };
        
        var created = await _merchantService.CreateWithBusinessIdAsync(merchant);
        return Created(MapToDto(created), "Merchant created successfully");
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateMerchantRequest request)
    {
        var merchant = await _merchantService.GetByIdAsync(id);
        if (merchant == null)
            return NotFoundError("Merchant not found");
        
        if (request.LegalName != null) merchant.LegalName = request.LegalName;
        if (request.DBAName != null) merchant.DBAName = request.DBAName;
        if (request.EIN != null) merchant.EIN = request.EIN;
        if (request.BusinessType != null) merchant.BusinessType = request.BusinessType;
        if (request.Industry != null) merchant.Industry = request.Industry;
        if (request.AddressLine1 != null) merchant.AddressLine1 = request.AddressLine1;
        if (request.City != null) merchant.City = request.City;
        if (request.State != null) merchant.State = request.State;
        if (request.ZipCode != null) merchant.ZipCode = request.ZipCode;
        if (request.Phone != null) merchant.Phone = request.Phone;
        if (request.Email != null) merchant.Email = request.Email;
        if (request.MonthlyRevenue.HasValue) merchant.MonthlyRevenue = request.MonthlyRevenue;
        if (request.AverageDailyBalance.HasValue) merchant.AverageDailyBalance = request.AverageDailyBalance;
        if (request.NSFCount.HasValue) merchant.NSFCount = request.NSFCount.Value;
        if (request.MerchantStatus != null) merchant.MerchantStatus = request.MerchantStatus;
        
        var updated = await _merchantService.UpdateAsync(merchant);
        return Success(MapToDto(updated), "Merchant updated successfully");
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _merchantService.DeleteAsync(id);
        if (!result)
            return NotFoundError("Merchant not found");
        
        return Success<object>(new { }, "Merchant deleted successfully");
    }
    
    private static MerchantDto MapToDto(Merchant merchant) => new(
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

[Route("api/[controller]")]
[ApiController]
public class ApplicationsController : BaseApiController
{
    private readonly IApplicationService _applicationService;
    private readonly IMerchantService _merchantService;
    
    public ApplicationsController(IApplicationService applicationService, IMerchantService merchantService)
    {
        _applicationService = applicationService;
        _merchantService = merchantService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ApplicationFilterRequest? filter = null)
    {
        var applications = await _applicationService.GetFilteredAsync(filter);
        var dtos = applications.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var application = await _applicationService.GetByIdAsync(id);
        if (application == null)
            return NotFoundError("Application not found");
        
        return Success(MapToDto(application));
    }
    
    [HttpGet("number/{applicationNumber}")]
    public async Task<IActionResult> GetByNumber(string applicationNumber)
    {
        var application = await _applicationService.GetByApplicationNumberAsync(applicationNumber);
        if (application == null)
            return NotFoundError("Application not found");
        
        return Success(MapToDto(application));
    }
    
    [HttpGet("merchant/{merchantId}")]
    public async Task<IActionResult> GetByMerchant(int merchantId)
    {
        var applications = await _applicationService.GetByMerchantIdAsync(merchantId);
        var dtos = applications.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateApplicationRequest request)
    {
        var merchant = await _merchantService.GetByIdAsync(request.MerchantId);
        if (merchant == null)
            return Error("Merchant not found");
        
        var application = new Application
        {
            MerchantId = request.MerchantId,
            LoanAmountRequested = request.LoanAmountRequested,
            UseOfFunds = request.UseOfFunds
        };
        
        var created = await _applicationService.CreateWithNumberAsync(application);
        return Created(MapToDto(created), "Application created successfully");
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateApplicationRequest request)
    {
        var application = await _applicationService.GetByIdAsync(id);
        if (application == null)
            return NotFoundError("Application not found");
        
        if (request.LoanAmountRequested.HasValue)
            application.LoanAmountRequested = request.LoanAmountRequested;
        if (request.UseOfFunds != null)
            application.UseOfFunds = request.UseOfFunds;
        
        var updated = await _applicationService.UpdateAsync(application);
        return Success(MapToDto(updated), "Application updated successfully");
    }
    
    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(int id, [FromBody] SubmitApplicationRequest? request = null)
    {
        try
        {
            var updated = await _applicationService.SubmitAsync(id);
            return Success(MapToDto(updated), "Application submitted successfully");
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(int id, [FromBody] ReviewApplicationRequest request)
    {
        try
        {
            var updated = await _applicationService.ApproveAsync(id, request.DecisionNotes);
            return Success(MapToDto(updated), "Application approved");
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    [HttpPost("{id}/decline")]
    public async Task<IActionResult> Decline(int id, [FromBody] ReviewApplicationRequest request)
    {
        try
        {
            var updated = await _applicationService.DeclineAsync(id, request.DecisionNotes);
            return Success(MapToDto(updated), "Application declined");
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _applicationService.DeleteAsync(id);
        if (!result)
            return NotFoundError("Application not found");
        
        return Success<object>(new { }, "Application deleted successfully");
    }
    
    private static ApplicationDto MapToDto(Application application) => new(
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
        null,
        null
    );
}

[Route("api/[controller]")]
[ApiController]
public class DealsController : BaseApiController
{
    private readonly IDealService _dealService;
    
    public DealsController(IDealService dealService)
    {
        _dealService = dealService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] DealFilterRequest? filter = null)
    {
        var deals = await _dealService.GetFilteredAsync(filter);
        var dtos = deals.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var deal = await _dealService.GetByIdAsync(id);
        if (deal == null)
            return NotFoundError("Deal not found");
        
        return Success(MapToDto(deal));
    }
    
    [HttpGet("number/{dealNumber}")]
    public async Task<IActionResult> GetByNumber(string dealNumber)
    {
        var deal = await _dealService.GetByDealNumberAsync(dealNumber);
        if (deal == null)
            return NotFoundError("Deal not found");
        
        return Success(MapToDto(deal));
    }
    
    [HttpGet("merchant/{merchantId}")]
    public async Task<IActionResult> GetByMerchant(int merchantId)
    {
        var deals = await _dealService.GetByMerchantIdAsync(merchantId);
        var dtos = deals.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDealRequest request)
    {
        var deal = new Deal
        {
            ApplicationId = request.ApplicationId,
            AdvanceAmount = request.AdvanceAmount,
            FactorRate = request.FactorRate,
            PaymentMethod = request.PaymentMethod,
            StartDate = request.StartDate
        };
        
        var created = await _dealService.CreateWithNumberAsync(deal);
        return Created(MapToDto(created), "Deal created successfully");
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDealRequest request)
    {
        var deal = await _dealService.GetByIdAsync(id);
        if (deal == null)
            return NotFoundError("Deal not found");
        
        if (request.AdvanceAmount.HasValue) deal.AdvanceAmount = request.AdvanceAmount;
        if (request.FactorRate.HasValue) deal.FactorRate = request.FactorRate;
        if (request.DailyPaymentAmount.HasValue) deal.DailyPaymentAmount = request.DailyPaymentAmount;
        if (request.PaymentMethod != null) deal.PaymentMethod = request.PaymentMethod;
        if (request.StartDate.HasValue) deal.StartDate = request.StartDate;
        if (request.ExpectedEndDate.HasValue) deal.ExpectedEndDate = request.ExpectedEndDate;
        if (request.DealStatus != null) deal.DealStatus = request.DealStatus;
        
        var updated = await _dealService.UpdateAsync(deal);
        return Success(MapToDto(updated), "Deal updated successfully");
    }
    
    [HttpPost("{id}/fund")]
    public async Task<IActionResult> Fund(int id, [FromBody] FundDealRequest request)
    {
        try
        {
            var authorization = new ACHAuthorization
            {
                BankName = request.ACHAuthorization.BankName,
                RoutingNumber = request.ACHAuthorization.RoutingNumber,
                AccountNumberLast4 = request.ACHAuthorization.AccountNumberLast4,
                AccountType = request.ACHAuthorization.AccountType,
                AuthorizationType = request.ACHAuthorization.AuthorizationType,
                AuthorizedBy = request.ACHAuthorization.AuthorizedBy,
                AuthorizationDate = request.ACHAuthorization.AuthorizationDate
            };
            
            var updated = await _dealService.FundAsync(id, request.PrincipalId, authorization);
            return Success(MapToDto(updated), "Deal funded successfully");
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    [HttpPost("{id}/close")]
    public async Task<IActionResult> Close(int id, [FromBody] CloseDealRequest? request = null)
    {
        try
        {
            var updated = await _dealService.CloseAsync(id, request?.Reason);
            return Success(MapToDto(updated), "Deal closed successfully");
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    private static DealDto MapToDto(Deal deal) => new(
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
        deal.ACHAuthorization != null ? new ACHAuthorizationDto(
            deal.ACHAuthorization.Id,
            deal.ACHAuthorization.DealId,
            deal.ACHAuthorization.MerchantId,
            deal.ACHAuthorization.BankName,
            deal.ACHAuthorization.RoutingNumber,
            deal.ACHAuthorization.AccountNumberLast4,
            deal.ACHAuthorization.AccountType,
            deal.ACHAuthorization.AuthorizationType,
            deal.ACHAuthorization.AuthorizedBy,
            deal.ACHAuthorization.AuthorizationDate,
            deal.ACHAuthorization.StripeMandateId,
            deal.ACHAuthorization.IsActive
        ) : null
    );
}

[Route("api/[controller]")]
[ApiController]
public class DocumentsController : BaseApiController
{
    private readonly IDocumentService _documentService;
    
    public DocumentsController(IDocumentService documentService)
    {
        _documentService = documentService;
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var document = await _documentService.GetByIdAsync(id);
        if (document == null)
            return NotFoundError("Document not found");
        
        return Success(MapToDto(document));
    }
    
    [HttpGet("application/{applicationId}")]
    public async Task<IActionResult> GetByApplication(int applicationId)
    {
        var documents = await _documentService.GetByApplicationIdAsync(applicationId);
        var dtos = documents.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpGet("merchant/{merchantId}")]
    public async Task<IActionResult> GetByMerchant(int merchantId)
    {
        var documents = await _documentService.GetByMerchantIdAsync(merchantId);
        var dtos = documents.Select(MapToDto).ToList();
        return Success(dtos);
    }
    
    [HttpPost]
    public async Task<IActionResult> Upload([FromForm] UploadDocumentRequest request, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return Error("No file uploaded");
        
        var document = new Document
        {
            DocumentType = request.DocumentType,
            DocumentSubType = request.DocumentSubType,
            ApplicationId = request.ApplicationId,
            MerchantId = request.MerchantId,
            DealId = request.DealId,
            FileName = file.FileName,
            ContentType = file.ContentType,
            FileSizeBytes = file.Length
        };
        
        using var stream = file.OpenReadStream();
        var created = await _documentService.UploadAsync(document, stream);
        
        return Created(MapToDto(created), "Document uploaded successfully");
    }
    
    [HttpGet("{id}/download")]
    public async Task<IActionResult> GetDownloadUrl(int id)
    {
        try
        {
            var url = await _documentService.GetDownloadUrlAsync(id);
            return Success(new { Url = url });
        }
        catch (InvalidOperationException ex)
        {
            return Error(ex.Message);
        }
    }
    
    private static DocumentDto MapToDto(Document document) => new(
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

[Route("api/health")]
[ApiController]
public class HealthController : BaseApiController
{
    [HttpGet]
    public IActionResult Get()
    {
        return Success(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
    }
}
