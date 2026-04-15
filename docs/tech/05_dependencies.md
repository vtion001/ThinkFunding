# Dependencies

## Frontend (React SPA)

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "zustand": "^4.4.7",
  "@tanstack/react-query": "^5.8.4",
  "axios": "^1.6.2"
}
```

### Styling & UI
```json
{
  "tailwindcss": "^3.3.5",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.3.2",
  "vite": "^5.0.3",
  "@types/react": "^18.2.42",
  "@types/react-dom": "^18.2.17",
  "@vitejs/plugin-react": "^4.2.1"
}
```

## Backend (ASP.NET Core 8)

### Entity Framework Core
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
```

### Authentication
```xml
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
<PackageReference Include="Microsoft.Identity.Web" Version="2.17.0" />
```

### Azure Services
```xml
<PackageReference Include="Azure.Storage.Blobs" Version="12.19.0" />
<PackageReference Include="Azure.Identity" Version="1.11.0" />
```

### API Documentation
```xml
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
```

### Security
```xml
<PackageReference Include="Microsoft.AspNetCore.DataProtection" Version="8.0.0" />
```

## Infrastructure

### n8n Workflows
- n8n version 1.0+
- Nodes used:
  - HTTP Request
  - Microsoft SQL
  - Microsoft Teams
  - Email (Send)
  - Azure Blob Storage
  - Schedule

### Azure Services
| Service | SKU/Tier | Purpose |
|---------|----------|---------|
| Azure App Service | B1 | Web hosting |
| Azure SQL | S0 | Database |
| Azure Blob Storage | Standard LRS | Document storage |
| Azure Key Vault | Standard | Secrets management |
| Microsoft Entra ID | Free | Authentication |
| Azure VM | B2s | n8n hosting |

## Third-Party Services

### Notifications
- Microsoft Teams (via n8n)
- SendGrid/Outlook (via n8n)

### Payment Processing
- Stripe ACH (future integration)

## Version Compatibility

| Component | Version | Notes |
|-----------|---------|-------|
| .NET | 8.0 | LTS version |
| Node.js | 18.x | LTS version |
| React | 18.x | Latest stable |
| TypeScript | 5.3.x | Latest stable |
| Tailwind CSS | 3.3.x | Latest stable |
| EF Core | 8.0 | Latest stable |
