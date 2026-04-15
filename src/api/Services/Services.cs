using Microsoft.EntityFrameworkCore;
using ThinkFunding.Api.Data;
using ThinkFunding.Api.DTOs;
using ThinkFunding.Api.Models;

namespace ThinkFunding.Api.Services;

public interface IEntityService<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<List<T>> GetAllAsync();
    Task<T> CreateAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(int id);
}

public abstract class EntityService<T> : IEntityService<T> where T : BaseEntity
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;
    
    protected EntityService(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }
    
    public virtual async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public virtual async Task<List<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }
    
    public virtual async Task<T> CreateAsync(T entity)
    {
        entity.CreatedAt = DateTime.UtcNow;
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
    
    public virtual async Task<T> UpdateAsync(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }
    
    public virtual async Task<bool> DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;
        
        entity.IsDeleted = true;
        entity.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }
    
    protected async Task LogAuditAsync(string entityType, int entityId, string action, 
        string? oldValue = null, string? newValue = null, string? userId = null, string? userName = null)
    {
        var auditLog = new AuditLog
        {
            EntityType = entityType,
            EntityId = entityId,
            Action = action,
            OldValue = oldValue,
            NewValue = newValue,
            ChangedByName = userName,
            Timestamp = DateTime.UtcNow
        };
        _context.AuditLogs.Add(auditLog);
        await _context.SaveChangesAsync();
    }
}

public interface IMerchantService : IEntityService<Merchant>
{
    Task<Merchant?> GetByBusinessIdAsync(string businessId);
    Task<Merchant?> GetByEmailAsync(string email);
    Task<List<Merchant>> GetByStatusAsync(string status);
    Task<Merchant> CreateWithBusinessIdAsync(Merchant merchant);
}

public class MerchantService : EntityService<Merchant>, IMerchantService
{
    public MerchantService(ApplicationDbContext context) : base(context) { }
    
    public async Task<Merchant?> GetByBusinessIdAsync(string businessId)
    {
        return await _dbSet.FirstOrDefaultAsync(m => m.BusinessId == businessId);
    }
    
    public async Task<Merchant?> GetByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(m => m.Email == email);
    }
    
    public async Task<List<Merchant>> GetByStatusAsync(string status)
    {
        return await _dbSet.Where(m => m.MerchantStatus == status).ToListAsync();
    }
    
    public async Task<Merchant> CreateWithBusinessIdAsync(Merchant merchant)
    {
        var year = DateTime.UtcNow.Year;
        var lastMerchant = await _dbSet
            .Where(m => m.BusinessId.StartsWith($"TF-{year}"))
            .OrderByDescending(m => m.BusinessId)
            .FirstOrDefaultAsync();
        
        int nextNum = 1;
        if (lastMerchant != null && lastMerchant.BusinessId.Contains($"TF-{year}"))
        {
            var lastNumStr = lastMerchant.BusinessId.Split('-').LastOrDefault();
            if (int.TryParse(lastNumStr, out int lastNum))
            {
                nextNum = lastNum + 1;
            }
        }
        
        merchant.BusinessId = $"TF-{year}-{nextNum:D5}";
        return await CreateAsync(merchant);
    }
}

public interface IApplicationService : IEntityService<Application>
{
    Task<Application?> GetByApplicationNumberAsync(string applicationNumber);
    Task<List<Application>> GetByMerchantIdAsync(int merchantId);
    Task<List<Application>> GetByStatusAsync(string status);
    Task<List<Application>> GetFilteredAsync(ApplicationFilterRequest? filter = null);
    Task<Application> CreateWithNumberAsync(Application application);
    Task<Application> SubmitAsync(int id);
    Task<Application> ApproveAsync(int id, string? notes);
    Task<Application> DeclineAsync(int id, string? notes);
}

public class ApplicationService : EntityService<Application>, IApplicationService
{
    public ApplicationService(ApplicationDbContext context) : base(context) { }
    
    public async Task<Application?> GetByApplicationNumberAsync(string applicationNumber)
    {
        return await _dbSet.Include(a => a.Merchant)
            .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);
    }
    
    public async Task<List<Application>> GetByMerchantIdAsync(int merchantId)
    {
        return await _dbSet.Where(a => a.MerchantId == merchantId).ToListAsync();
    }
    
    public async Task<List<Application>> GetByStatusAsync(string status)
    {
        return await _dbSet.Where(a => a.ApplicationStatus == status).ToListAsync();
    }
    
    public async Task<List<Application>> GetFilteredAsync(ApplicationFilterRequest? filter = null)
    {
        var query = _dbSet.Include(a => a.Merchant).AsQueryable();
        
        if (filter != null)
        {
            if (!string.IsNullOrEmpty(filter.Status))
                query = query.Where(a => a.ApplicationStatus == filter.Status);
            if (filter.MerchantId.HasValue)
                query = query.Where(a => a.MerchantId == filter.MerchantId.Value);
            if (filter.FromDate.HasValue)
                query = query.Where(a => a.CreatedAt >= filter.FromDate.Value);
            if (filter.ToDate.HasValue)
                query = query.Where(a => a.CreatedAt <= filter.ToDate.Value);
        }
        
        return await query.OrderByDescending(a => a.CreatedAt).ToListAsync();
    }
    
    public async Task<Application> CreateWithNumberAsync(Application application)
    {
        var year = DateTime.UtcNow.Year;
        var lastApp = await _dbSet
            .Where(a => a.ApplicationNumber.StartsWith($"APP-{year}"))
            .OrderByDescending(a => a.ApplicationNumber)
            .FirstOrDefaultAsync();
        
        int nextNum = 1;
        if (lastApp != null && lastApp.ApplicationNumber.Contains($"APP-{year}"))
        {
            var lastNumStr = lastApp.ApplicationNumber.Split('-').LastOrDefault();
            if (int.TryParse(lastNumStr, out int lastNum))
            {
                nextNum = lastNum + 1;
            }
        }
        
        application.ApplicationNumber = $"APP-{year}-{nextNum:D5}";
        return await CreateAsync(application);
    }
    
    public async Task<Application> SubmitAsync(int id)
    {
        var application = await GetByIdAsync(id);
        if (application == null) throw new InvalidOperationException("Application not found");
        
        application.ApplicationStatus = "Submitted";
        application.SubmittedAt = DateTime.UtcNow;
        return await UpdateAsync(application);
    }
    
    public async Task<Application> ApproveAsync(int id, string? notes)
    {
        var application = await GetByIdAsync(id);
        if (application == null) throw new InvalidOperationException("Application not found");
        
        application.ApplicationStatus = "Approved";
        application.DecisionNotes = notes;
        return await UpdateAsync(application);
    }
    
    public async Task<Application> DeclineAsync(int id, string? notes)
    {
        var application = await GetByIdAsync(id);
        if (application == null) throw new InvalidOperationException("Application not found");
        
        application.ApplicationStatus = "Declined";
        application.DecisionNotes = notes;
        return await UpdateAsync(application);
    }
}

public interface IDealService : IEntityService<Deal>
{
    Task<Deal?> GetByDealNumberAsync(string dealNumber);
    Task<List<Deal>> GetByMerchantIdAsync(int merchantId);
    Task<List<Deal>> GetByStatusAsync(string status);
    Task<List<Deal>> GetFilteredAsync(DealFilterRequest? filter = null);
    Task<Deal> CreateWithNumberAsync(Deal deal);
    Task<Deal> FundAsync(int id, int principalId, ACHAuthorization authorization);
    Task<Deal> CloseAsync(int id, string? reason);
}

public class DealService : EntityService<Deal>, IDealService
{
    public DealService(ApplicationDbContext context) : base(context) { }
    
    public async Task<Deal?> GetByDealNumberAsync(string dealNumber)
    {
        return await _dbSet.Include(d => d.Merchant)
            .Include(d => d.Principal)
            .Include(d => d.Application)
            .Include(d => d.ACHAuthorization)
            .FirstOrDefaultAsync(d => d.DealNumber == dealNumber);
    }
    
    public async Task<List<Deal>> GetByMerchantIdAsync(int merchantId)
    {
        return await _dbSet.Where(d => d.MerchantId == merchantId).ToListAsync();
    }
    
    public async Task<List<Deal>> GetByStatusAsync(string status)
    {
        return await _dbSet.Where(d => d.DealStatus == status).ToListAsync();
    }
    
    public async Task<List<Deal>> GetFilteredAsync(DealFilterRequest? filter = null)
    {
        var query = _dbSet.Include(d => d.Merchant).AsQueryable();
        
        if (filter != null)
        {
            if (!string.IsNullOrEmpty(filter.Status))
                query = query.Where(d => d.DealStatus == filter.Status);
            if (filter.MerchantId.HasValue)
                query = query.Where(d => d.MerchantId == filter.MerchantId.Value);
            if (filter.FromDate.HasValue)
                query = query.Where(d => d.CreatedAt >= filter.FromDate.Value);
            if (filter.ToDate.HasValue)
                query = query.Where(d => d.CreatedAt <= filter.ToDate.Value);
        }
        
        return await query.OrderByDescending(d => d.CreatedAt).ToListAsync();
    }
    
    public async Task<Deal> CreateWithNumberAsync(Deal deal)
    {
        var year = DateTime.UtcNow.Year;
        var lastDeal = await _dbSet
            .Where(d => d.DealNumber.StartsWith($"DEAL-{year}"))
            .OrderByDescending(d => d.DealNumber)
            .FirstOrDefaultAsync();
        
        int nextNum = 1;
        if (lastDeal != null && lastDeal.DealNumber.Contains($"DEAL-{year}"))
        {
            var lastNumStr = lastDeal.DealNumber.Split('-').LastOrDefault();
            if (int.TryParse(lastNumStr, out int lastNum))
            {
                nextNum = lastNum + 1;
            }
        }
        
        deal.DealNumber = $"DEAL-{year}-{nextNum:D5}";
        deal.PurchasePrice = deal.AdvanceAmount * deal.FactorRate;
        return await CreateAsync(deal);
    }
    
    public async Task<Deal> FundAsync(int id, int principalId, ACHAuthorization authorization)
    {
        var deal = await GetByIdAsync(id);
        if (deal == null) throw new InvalidOperationException("Deal not found");
        
        deal.DealStatus = "Active";
        deal.PrincipalId = principalId;
        deal.StartDate = DateTime.UtcNow;
        
        authorization.DealId = deal.Id;
        authorization.MerchantId = deal.MerchantId;
        _context.ACHAuthorizations.Add(authorization);
        
        await UpdateAsync(deal);
        return deal;
    }
    
    public async Task<Deal> CloseAsync(int id, string? reason)
    {
        var deal = await GetByIdAsync(id);
        if (deal == null) throw new InvalidOperationException("Deal not found");
        
        deal.DealStatus = "Completed";
        await UpdateAsync(deal);
        return deal;
    }
}

public interface IDocumentService : IEntityService<Document>
{
    Task<List<Document>> GetByApplicationIdAsync(int applicationId);
    Task<List<Document>> GetByMerchantIdAsync(int merchantId);
    Task<List<Document>> GetByDealIdAsync(int dealId);
    Task<Document> UploadAsync(Document document, Stream fileStream);
    Task<string> GetDownloadUrlAsync(int id);
}

public class DocumentService : EntityService<Document>, IDocumentService
{
    private readonly IConfiguration _configuration;
    
    public DocumentService(ApplicationDbContext context, IConfiguration configuration) : base(context)
    {
        _configuration = configuration;
    }
    
    public async Task<List<Document>> GetByApplicationIdAsync(int applicationId)
    {
        return await _dbSet.Where(d => d.ApplicationId == applicationId).ToListAsync();
    }
    
    public async Task<List<Document>> GetByMerchantIdAsync(int merchantId)
    {
        return await _dbSet.Where(d => d.MerchantId == merchantId).ToListAsync();
    }
    
    public async Task<List<Document>> GetByDealIdAsync(int dealId)
    {
        return await _dbSet.Where(d => d.DealId == dealId).ToListAsync();
    }
    
    public async Task<Document> UploadAsync(Document document, Stream fileStream)
    {
        var blobConnectionString = _configuration["AzureStorage:ConnectionString"];
        var containerName = _configuration["AzureStorage:DocumentsContainer"];
        
        document.UploadedAt = DateTime.UtcNow;
        document.BlobPath = $"documents/{document.DocumentType}/{Guid.NewGuid()}/{document.FileName}";
        
        return await CreateAsync(document);
    }
    
    public async Task<string> GetDownloadUrlAsync(int id)
    {
        var document = await GetByIdAsync(id);
        if (document == null) throw new InvalidOperationException("Document not found");
        
        return $"https://placeholder.blob.core.windows.net/{document.BlobPath}";
    }
}

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<LoginResponse?> RefreshTokenAsync(string refreshToken);
    Task<bool> LogoutAsync(string userId);
    Task<UserDto?> GetUserByIdAsync(int id);
}

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    
    public AuthService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    
    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var merchant = await _context.Merchants
            .FirstOrDefaultAsync(m => m.Email == request.Email);
        
        if (merchant == null)
            return null;
        
        var token = GenerateJwtToken(merchant.Id, merchant.Email, "merchant");
        var refreshToken = GenerateRefreshToken();
        
        return new LoginResponse(token, refreshToken, new UserDto(
            merchant.Id,
            merchant.Email ?? "",
            "merchant",
            merchant.LegalName,
            merchant.BusinessId
        ));
    }
    
    public async Task<LoginResponse?> RefreshTokenAsync(string refreshToken)
    {
        return null;
    }
    
    public Task<bool> LogoutAsync(string userId)
    {
        return Task.FromResult(true);
    }
    
    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var merchant = await _context.Merchants.FindAsync(id);
        if (merchant == null) return null;
        
        return new UserDto(
            merchant.Id,
            merchant.Email ?? "",
            "merchant",
            merchant.LegalName,
            merchant.BusinessId
        );
    }
    
    private string GenerateJwtToken(int userId, string email, string role)
    {
        var key = _configuration["Jwt:Secret"] ?? "default-secret-key-change-in-production";
        var issuer = _configuration["Jwt:Issuer"] ?? "ThinkFunding";
        var audience = _configuration["Jwt:Audience"] ?? "ThinkFundingAPI";
        
        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
        var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new[]
            {
                new System.Security.Claims.Claim("id", userId.ToString()),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, email),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, role)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(
                new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(keyBytes),
                Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    
    private string GenerateRefreshToken()
    {
        return Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
    }
}
