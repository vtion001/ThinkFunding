using Microsoft.EntityFrameworkCore;
using ThinkFunding.Api.Models;

namespace ThinkFunding.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Merchant> Merchants => Set<Merchant>();
    public DbSet<Person> Persons => Set<Person>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<Deal> Deals => Set<Deal>();
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<ComplianceCheck> ComplianceChecks => Set<ComplianceCheck>();
    public DbSet<ACHAuthorization> ACHAuthorizations => Set<ACHAuthorization>();
    public DbSet<PaymentAttempt> PaymentAttempts => Set<PaymentAttempt>();
    public DbSet<PaymentEvent> PaymentEvents => Set<PaymentEvent>();
    public DbSet<Broker> Brokers => Set<Broker>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Merchant
        modelBuilder.Entity<Merchant>(entity =>
        {
            entity.ToTable("Merchants");
            entity.HasIndex(e => e.BusinessId).IsUnique();
            entity.HasOne(e => e.Broker)
                .WithMany(b => b.Merchants)
                .HasForeignKey(e => e.BrokerId)
                .OnDelete(DeleteBehavior.SetNull);
        });
        
        // Person
        modelBuilder.Entity<Person>(entity =>
        {
            entity.ToTable("Persons");
            entity.HasOne(e => e.Merchant)
                .WithMany(m => m.Persons)
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // Application
        modelBuilder.Entity<Application>(entity =>
        {
            entity.ToTable("Applications");
            entity.HasIndex(e => e.ApplicationNumber).IsUnique();
            entity.HasIndex(e => e.MerchantId);
            entity.HasIndex(e => e.ApplicationStatus);
            entity.HasOne(e => e.Merchant)
                .WithMany(m => m.Applications)
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        // Deal
        modelBuilder.Entity<Deal>(entity =>
        {
            entity.ToTable("Deals");
            entity.HasIndex(e => e.DealNumber).IsUnique();
            entity.HasIndex(e => e.MerchantId);
            entity.HasIndex(e => e.DealStatus);
            entity.HasOne(e => e.Application)
                .WithMany(a => a.Deals)
                .HasForeignKey(e => e.ApplicationId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Merchant)
                .WithMany()
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Principal)
                .WithMany()
                .HasForeignKey(e => e.PrincipalId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.ACHAuthorization)
                .WithOne(a => a.Deal)
                .HasForeignKey<ACHAuthorization>(e => e.DealId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // Document
        modelBuilder.Entity<Document>(entity =>
        {
            entity.ToTable("Documents");
            entity.HasIndex(e => e.ApplicationId);
            entity.HasIndex(e => e.MerchantId);
            entity.HasIndex(e => e.DocumentType);
            entity.HasOne(e => e.Application)
                .WithMany(a => a.Documents)
                .HasForeignKey(e => e.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Merchant)
                .WithMany(m => m.Documents)
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Deal)
                .WithMany()
                .HasForeignKey(e => e.DealId)
                .OnDelete(DeleteBehavior.SetNull);
        });
        
        // ComplianceCheck
        modelBuilder.Entity<ComplianceCheck>(entity =>
        {
            entity.ToTable("ComplianceChecks");
            entity.HasOne(e => e.Application)
                .WithMany(a => a.ComplianceChecks)
                .HasForeignKey(e => e.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Merchant)
                .WithMany()
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // ACHAuthorization
        modelBuilder.Entity<ACHAuthorization>(entity =>
        {
            entity.ToTable("ACHAuthorizations");
            entity.HasOne(e => e.Deal)
                .WithOne(d => d.ACHAuthorization)
                .HasForeignKey<ACHAuthorization>(e => e.DealId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Merchant)
                .WithMany()
                .HasForeignKey(e => e.MerchantId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        // PaymentAttempt
        modelBuilder.Entity<PaymentAttempt>(entity =>
        {
            entity.ToTable("PaymentAttempts");
            entity.HasIndex(e => e.DealId);
            entity.HasIndex(e => e.ScheduledDate);
            entity.HasOne(e => e.Deal)
                .WithMany(d => d.PaymentAttempts)
                .HasForeignKey(e => e.DealId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // PaymentEvent
        modelBuilder.Entity<PaymentEvent>(entity =>
        {
            entity.ToTable("PaymentEvents");
            entity.HasOne(e => e.PaymentAttempt)
                .WithMany(p => p.PaymentEvents)
                .HasForeignKey(e => e.PaymentAttemptId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // Broker
        modelBuilder.Entity<Broker>(entity =>
        {
            entity.ToTable("Brokers");
            entity.HasIndex(e => e.BrokerNumber).IsUnique();
        });
        
        // AuditLog
        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.ToTable("AuditLogs");
            entity.HasIndex(e => new { e.EntityType, e.EntityId });
            entity.HasIndex(e => e.Timestamp);
        });
        
        // Query filters for soft delete
        modelBuilder.Entity<Merchant>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<Person>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<Application>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<Deal>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<Document>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<ComplianceCheck>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<ACHAuthorization>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<PaymentAttempt>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<PaymentEvent>().HasQueryFilter(e => !e.IsDeleted);
        modelBuilder.Entity<Broker>().HasQueryFilter(e => !e.IsDeleted);
    }
}
