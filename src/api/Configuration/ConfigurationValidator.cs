using Microsoft.Extensions.Configuration;

namespace ThinkFunding.Api.Configuration;

public static class ConfigurationValidator
{
    public static void Validate(IConfiguration configuration, bool isDevelopment = false)
    {
        var errors = new List<string>();

        var connectionString = configuration["ConnectionStrings:DefaultConnection"]
            ?? configuration["Azure:Sql:ConnectionString"];

        if (string.IsNullOrEmpty(connectionString) && !isDevelopment)
        {
            errors.Add("Database connection string is required");
        }

        var jwtSecret = configuration["Jwt:Secret"];
        if (string.IsNullOrEmpty(jwtSecret) && !isDevelopment)
        {
            errors.Add("JWT secret is required");
        }
        else if (!string.IsNullOrEmpty(jwtSecret) && jwtSecret.Length < 32)
        {
            errors.Add("JWT secret must be at least 32 characters");
        }

        var jwtIssuer = configuration["Jwt:Issuer"];
        if (string.IsNullOrEmpty(jwtIssuer) && !isDevelopment)
        {
            errors.Add("JWT issuer is required");
        }

        var jwtAudience = configuration["Jwt:Audience"];
        if (string.IsNullOrEmpty(jwtAudience) && !isDevelopment)
        {
            errors.Add("JWT audience is required");
        }

        if (errors.Any())
        {
            throw new InvalidOperationException(
                $"Configuration validation failed:\n{string.Join("\n", errors)}");
        }
    }

    public static IConfiguration GetRequiredConfig(IConfiguration configuration, string key)
    {
        var value = configuration[key];
        if (string.IsNullOrEmpty(value))
        {
            throw new InvalidOperationException($"Configuration key '{key}' is required but not set");
        }
        return configuration;
    }
}

public class AppSettings
{
    public string JwtSecret { get; set; } = string.Empty;
    public string JwtIssuer { get; set; } = "ThinkFunding";
    public string JwtAudience { get; set; } = "ThinkFundingAPI";
    public int JwtExpirationHours { get; set; } = 24;
    public string AzureStorageConnectionString { get; set; } = string.Empty;
    public string AzureStorageDocumentsContainer { get; set; } = "documents";
    public List<string> CorsAllowedOrigins { get; set; } = new();
}

public static class ConfigurationExtensions
{
    public static AppSettings GetAppSettings(this IConfiguration configuration)
    {
        return new AppSettings
        {
            JwtSecret = configuration["Jwt:Secret"] ?? string.Empty,
            JwtIssuer = configuration["Jwt:Issuer"] ?? "ThinkFunding",
            JwtAudience = configuration["Jwt:Audience"] ?? "ThinkFundingAPI",
            JwtExpirationHours = int.TryParse(configuration["Jwt:ExpirationHours"], out var hours) ? hours : 24,
            AzureStorageConnectionString = configuration["AzureStorage:ConnectionString"] ?? string.Empty,
            AzureStorageDocumentsContainer = configuration["AzureStorage:DocumentsContainer"] ?? "documents",
            CorsAllowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<List<string>>() ?? new List<string>()
        };
    }
}
