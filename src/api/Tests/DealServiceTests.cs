using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using ThinkFunding.Api.Data;
using ThinkFunding.Api.Models;
using ThinkFunding.Api.Services;
using Xunit;

namespace ThinkFunding.Api.Tests;

public class DealServiceTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly DealService _service;
    private readonly MerchantService _merchantService;
    private readonly ApplicationService _applicationService;

    public DealServiceTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);
        _service = new DealService(_context);
        _merchantService = new MerchantService(_context);
        _applicationService = new ApplicationService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    private async Task<(Merchant merchant, Application application)> CreateTestMerchantAndApplication()
    {
        var merchant = new Merchant
        {
            LegalName = "Test Merchant",
            Email = "test@merchant.com"
        };
        await _merchantService.CreateAsync(merchant);

        var application = new Application
        {
            MerchantId = merchant.Id,
            ApplicationStatus = "Approved"
        };
        await _applicationService.CreateWithNumberAsync(application);

        return (merchant, application);
    }

    [Fact]
    public async Task CreateWithNumberAsync_ShouldGenerateDealNumber()
    {
        var (merchant, application) = await CreateTestMerchantAndApplication();
        var deal = new Deal
        {
            ApplicationId = application.Id,
            MerchantId = merchant.Id,
            AdvanceAmount = 100000,
            FactorRate = 1.25m
        };

        var result = await _service.CreateWithNumberAsync(deal);

        result.DealNumber.Should().NotBeNullOrEmpty();
        result.DealNumber.Should().StartWith("DEAL-");
    }

    [Fact]
    public async Task CreateWithNumberAsync_ShouldCalculatePurchasePrice()
    {
        var (merchant, application) = await CreateTestMerchantAndApplication();
        var deal = new Deal
        {
            ApplicationId = application.Id,
            MerchantId = merchant.Id,
            AdvanceAmount = 100000,
            FactorRate = 1.25m
        };

        var result = await _service.CreateWithNumberAsync(deal);

        result.PurchasePrice.Should().Be(125000);
    }

    [Fact]
    public async Task FundAsync_ShouldActivateDealAndSetPrincipal()
    {
        var (merchant, application) = await CreateTestMerchantAndApplication();
        var deal = new Deal
        {
            ApplicationId = application.Id,
            MerchantId = merchant.Id,
            AdvanceAmount = 50000,
            FactorRate = 1.20m,
            DealStatus = "Pending"
        };
        await _service.CreateWithNumberAsync(deal);

        var person = new Person
        {
            MerchantId = merchant.Id,
            FirstName = "John",
            LastName = "Doe",
            PersonType = "Principal"
        };
        _context.Persons.Add(person);
        await _context.SaveChangesAsync();

        var authorization = new ACHAuthorization
        {
            BankName = "Chase Bank",
            RoutingNumber = "021000021",
            AccountNumberLast4 = "1234",
            AccountType = "Checking",
            AuthorizationType = "ACH",
            AuthorizedBy = "John Doe"
        };

        var result = await _service.FundAsync(deal.Id, person.Id, authorization);

        result.DealStatus.Should().Be("Active");
        result.PrincipalId.Should().Be(person.Id);
        result.StartDate.Should().NotBeNull();
    }

    [Fact]
    public async Task CloseAsync_ShouldSetStatusToCompleted()
    {
        var (merchant, application) = await CreateTestMerchantAndApplication();
        var deal = new Deal
        {
            ApplicationId = application.Id,
            MerchantId = merchant.Id,
            AdvanceAmount = 75000,
            FactorRate = 1.30m,
            DealStatus = "Active"
        };
        await _service.CreateWithNumberAsync(deal);

        var result = await _service.CloseAsync(deal.Id, "Paid in full");

        result.DealStatus.Should().Be("Completed");
    }

    [Fact]
    public async Task GetByMerchantIdAsync_ShouldReturnOnlyMerchantDeals()
    {
        var merchant1 = new Merchant { LegalName = "Merchant 1", Email = "m1@test.com" };
        var merchant2 = new Merchant { LegalName = "Merchant 2", Email = "m2@test.com" };
        await _context.Merchants.AddRangeAsync(merchant1, merchant2);
        await _context.SaveChangesAsync();

        var app1 = new Application { MerchantId = merchant1.Id };
        var app2 = new Application { MerchantId = merchant2.Id };
        await _context.Applications.AddRangeAsync(app1, app2);
        await _context.SaveChangesAsync();

        await _service.CreateWithNumberAsync(new Deal { ApplicationId = app1.Id, MerchantId = merchant1.Id, AdvanceAmount = 10000, FactorRate = 1.25m });
        await _service.CreateWithNumberAsync(new Deal { ApplicationId = app2.Id, MerchantId = merchant2.Id, AdvanceAmount = 20000, FactorRate = 1.25m });

        var result = await _service.GetByMerchantIdAsync(merchant1.Id);

        result.Should().HaveCount(1);
        result.First().MerchantId.Should().Be(merchant1.Id);
    }

    [Fact]
    public async Task GetByStatusAsync_ShouldReturnFilteredDeals()
    {
        var (merchant, application) = await CreateTestMerchantAndApplication();
        await _service.CreateWithNumberAsync(new Deal { ApplicationId = application.Id, MerchantId = merchant.Id, AdvanceAmount = 10000, FactorRate = 1.25m, DealStatus = "Active" });
        await _service.CreateWithNumberAsync(new Deal { ApplicationId = application.Id, MerchantId = merchant.Id, AdvanceAmount = 20000, FactorRate = 1.25m, DealStatus = "Pending" });
        await _service.CreateWithNumberAsync(new Deal { ApplicationId = application.Id, MerchantId = merchant.Id, AdvanceAmount = 30000, FactorRate = 1.25m, DealStatus = "Active" });

        var result = await _service.GetByStatusAsync("Active");

        result.Should().HaveCount(2);
        result.Should().OnlyContain(d => d.DealStatus == "Active");
    }
}
