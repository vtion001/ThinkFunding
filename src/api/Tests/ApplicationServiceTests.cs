using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using ThinkFunding.Api.Data;
using ThinkFunding.Api.Models;
using ThinkFunding.Api.Services;
using Xunit;

namespace ThinkFunding.Api.Tests;

public class ApplicationServiceTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly ApplicationService _service;
    private readonly MerchantService _merchantService;

    public ApplicationServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);
        _service = new ApplicationService(_context);
        _merchantService = new MerchantService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    private async Task<Merchant> CreateTestMerchant()
    {
        var merchant = new Merchant
        {
            LegalName = "Test Merchant",
            Email = "test@merchant.com"
        };
        return await _merchantService.CreateAsync(merchant);
    }

    [Fact]
    public async Task CreateWithNumberAsync_ShouldGenerateApplicationNumber()
    {
        var merchant = await CreateTestMerchant();
        var application = new Application
        {
            MerchantId = merchant.Id,
            LoanAmountRequested = 50000,
            UseOfFunds = "Equipment purchase"
        };

        var result = await _service.CreateWithNumberAsync(application);

        result.ApplicationNumber.Should().NotBeNullOrEmpty();
        result.ApplicationNumber.Should().StartWith("APP-");
    }

    [Fact]
    public async Task SubmitAsync_ShouldSetStatusToSubmitted()
    {
        var merchant = await CreateTestMerchant();
        var application = new Application
        {
            MerchantId = merchant.Id,
            ApplicationStatus = "Draft"
        };
        await _service.CreateWithNumberAsync(application);

        var submitted = await _service.SubmitAsync(application.Id);

        submitted.ApplicationStatus.Should().Be("Submitted");
        submitted.SubmittedAt.Should().NotBeNull();
    }

    [Fact]
    public async Task ApproveAsync_ShouldSetStatusToApproved()
    {
        var merchant = await CreateTestMerchant();
        var application = new Application
        {
            MerchantId = merchant.Id,
            ApplicationStatus = "Submitted"
        };
        await _service.CreateWithNumberAsync(application);

        var approved = await _service.ApproveAsync(application.Id, "Looks good");

        approved.ApplicationStatus.Should().Be("Approved");
        approved.DecisionNotes.Should().Be("Looks good");
    }

    [Fact]
    public async Task DeclineAsync_ShouldSetStatusToDeclined()
    {
        var merchant = await CreateTestMerchant();
        var application = new Application
        {
            MerchantId = merchant.Id,
            ApplicationStatus = "Submitted"
        };
        await _service.CreateWithNumberAsync(application);

        var declined = await _service.DeclineAsync(application.Id, "Insufficient revenue");

        declined.ApplicationStatus.Should().Be("Declined");
        declined.DecisionNotes.Should().Be("Insufficient revenue");
    }

    [Fact]
    public async Task GetFilteredAsync_ShouldFilterByStatus()
    {
        var merchant = await CreateTestMerchant();
        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant.Id, ApplicationStatus = "Draft" });
        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant.Id, ApplicationStatus = "Draft" });
        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant.Id, ApplicationStatus = "Submitted" });

        var result = await _service.GetFilteredAsync(new Api.DTOs.ApplicationFilterRequest { Status = "Draft" });

        result.Should().HaveCount(2);
        result.Should().OnlyContain(a => a.ApplicationStatus == "Draft");
    }

    [Fact]
    public async Task GetByMerchantIdAsync_ShouldReturnOnlyMerchantApplications()
    {
        var merchant1 = new Merchant { LegalName = "Merchant 1", Email = "m1@test.com" };
        var merchant2 = new Merchant { LegalName = "Merchant 2", Email = "m2@test.com" };
        await _context.Merchants.AddRangeAsync(merchant1, merchant2);
        await _context.SaveChangesAsync();

        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant1.Id });
        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant1.Id });
        await _service.CreateWithNumberAsync(new Application { MerchantId = merchant2.Id });

        var result = await _service.GetByMerchantIdAsync(merchant1.Id);

        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task SubmitAsync_ShouldThrowForNonExistentApplication()
    {
        var act = () => _service.SubmitAsync(99999);

        await act.Should().ThrowAsync<InvalidOperationException>()
            .WithMessage("Application not found");
    }
}
