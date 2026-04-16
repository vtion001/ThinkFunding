using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using ThinkFunding.Api.Data;
using ThinkFunding.Api.Models;
using ThinkFunding.Api.Services;
using Xunit;

namespace ThinkFunding.Api.Tests;

public class MerchantServiceTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly MerchantService _service;

    public MerchantServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);
        _service = new MerchantService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    [Fact]
    public async Task CreateWithBusinessIdAsync_ShouldGenerateBusinessId()
    {
        var merchant = new Merchant
        {
            LegalName = "Test Business LLC",
            Email = "test@business.com",
            Phone = "555-123-4567",
            BusinessType = "LLC"
        };

        var result = await _service.CreateWithBusinessIdAsync(merchant);

        result.BusinessId.Should().NotBeNullOrEmpty();
        result.BusinessId.Should().StartWith("TF-");
        result.LegalName.Should().Be("Test Business LLC");
    }

    [Fact]
    public async Task CreateWithBusinessIdAsync_ShouldIncrementSequenceNumber()
    {
        var merchant1 = new Merchant { LegalName = "Business 1", Email = "test1@business.com" };
        var merchant2 = new Merchant { LegalName = "Business 2", Email = "test2@business.com" };

        var result1 = await _service.CreateWithBusinessIdAsync(merchant1);
        var result2 = await _service.CreateWithBusinessIdAsync(merchant2);

        var num1 = int.Parse(result1.BusinessId!.Split('-').Last());
        var num2 = int.Parse(result2.BusinessId!.Split('-').Last());
        num2.Should().BeGreaterThan(num1);
    }

    [Fact]
    public async Task GetByBusinessIdAsync_ShouldReturnCorrectMerchant()
    {
        var merchant = new Merchant
        {
            LegalName = "Find Me LLC",
            Email = "find@business.com",
            BusinessId = "TF-2026-00099"
        };
        _context.Merchants.Add(merchant);
        await _context.SaveChangesAsync();

        var result = await _service.GetByBusinessIdAsync("TF-2026-00099");

        result.Should().NotBeNull();
        result!.LegalName.Should().Be("Find Me LLC");
    }

    [Fact]
    public async Task GetByEmailAsync_ShouldReturnCorrectMerchant()
    {
        var merchant = new Merchant
        {
            LegalName = "Email Test LLC",
            Email = "unique@business.com"
        };
        await _service.CreateAsync(merchant);

        var result = await _service.GetByEmailAsync("unique@business.com");

        result.Should().NotBeNull();
        result!.LegalName.Should().Be("Email Test LLC");
    }

    [Fact]
    public async Task GetByStatusAsync_ShouldReturnFilteredMerchants()
    {
        _context.Merchants.AddRange(
            new Merchant { LegalName = "Active 1", Email = "a1@b.com", MerchantStatus = "Active" },
            new Merchant { LegalName = "Active 2", Email = "a2@b.com", MerchantStatus = "Active" },
            new Merchant { LegalName = "Pending 1", Email = "p1@b.com", MerchantStatus = "Pending" }
        );
        await _context.SaveChangesAsync();

        var result = await _service.GetByStatusAsync("Active");

        result.Should().HaveCount(2);
        result.Should().OnlyContain(m => m.MerchantStatus == "Active");
    }

    [Fact]
    public async Task DeleteAsync_ShouldSoftDelete()
    {
        var merchant = new Merchant { LegalName = "Delete Test", Email = "delete@test.com" };
        await _service.CreateAsync(merchant);

        var deleted = await _service.DeleteAsync(merchant.Id);

        deleted.Should().BeTrue();
        
        var inDb = await _context.Merchants.IgnoreQueryFilters().FirstOrDefaultAsync(m => m.Id == merchant.Id);
        inDb.Should().NotBeNull();
        inDb!.IsDeleted.Should().BeTrue();
    }

    [Fact]
    public async Task UpdateAsync_ShouldSetUpdatedAt()
    {
        var merchant = new Merchant { LegalName = "Original Name", Email = "original@test.com" };
        await _service.CreateAsync(merchant);

        await Task.Delay(10);
        merchant.LegalName = "Updated Name";
        var result = await _service.UpdateAsync(merchant);

        result.UpdatedAt.Should().NotBeNull();
        result.LegalName.Should().Be("Updated Name");
    }
}
