# Deployment Guide

## Prerequisites

- Azure subscription with contributor access
- Azure CLI installed (`az login`)
- .NET 8 SDK
- Node.js 18+
- Git

## Azure Resources

### Required Resources

1. **Resource Group:** `thinkfunding-rg`
2. **App Service Plan:** `thinkfunding-asp` (B1 tier minimum)
3. **App Service (API):** `thinkfunding-api`
4. **App Service (Web):** `thinkfunding-web`
5. **Azure SQL Database:** `thinkfunding-sql`
6. **Storage Account:** `thinkfundingstorage`
7. **Azure Key Vault:** `thinkfunding-kv`

### Deployment Steps

#### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name thinkfunding-rg --location eastus

# Create App Service Plan
az appservice plan create --name thinkfunding-asp --resource-group thinkfunding-rg --sku B1 --is-linux

# Create Web App (React)
az webapp create --name thinkfunding-web --resource-group thinkfunding-rg --plan thinkfunding-asp --runtime "NODE|18-lts"

# Create API App (ASP.NET Core)
az webapp create --name thinkfunding-api --resource-group thinkfunding-rg --plan thinkfunding-asp --runtime "DOTNET|8"

# Create SQL Database
az sql server create --name thinkfunding-sql --resource-group thinkfunding-rg --admin-user sqladmin --admin-password "YourPassword123!"

# Create database
az sql db create --name thinkfunding_db --resource-group thinkfunding-rg --server thinkfunding-sql --service-objective S0

# Create Storage Account
az storage account create --name thinkfundingstorage --resource-group thinkfunding-rg --sku Standard_LRS

# Create Key Vault
az keyvault create --name thinkfunding-kv --resource-group thinkfunding-rg
```

#### 2. Configure Secrets in Key Vault

```bash
# Add secrets
az keyvault secret set --vault-name thinkfunding-kv --name "SqlConnectionString" --value "Server=tcp:thinkfunding-sql.database.windows.net;Database=thinkfunding_db;User Id=sqladmin;Password=YourPassword123!;"

az keyvault secret set --vault-name thinkfunding-kv --name "JwtSecret" --value "your-super-secret-jwt-key-at-least-32-characters"

az keyvault secret set --vault-name thinkfunding-kv --name "AzureStorageConnectionString" --value "DefaultEndpointsProtocol=https;AccountName=thinkfundingstorage;AccountKey=..."
```

#### 3. Deploy Database Schema

```bash
# Get SQL connection string
SQL_CONNECTION=$(az sql show-connection-string --server thinkfunding-sql --database thinkfunding_db --client dotnet --output tsv)

# Run migrations or execute schema script
sqlcmd -S thinkfunding-sql.database.windows.net -d thinkfunding_db -U sqladmin -P "YourPassword123!" -i infrastructure/sql/001_InitialSchema.sql
```

#### 4. Deploy API

```bash
# Navigate to API project
cd src/api

# Publish API
dotnet publish -c Release -o ../publish/api

# Deploy using Azure CLI
az webapp deploy --resource-group thinkfunding-rg --name thinkfunding-api --src-path ../publish/api --type zip

# Or using GitHub Actions (see .github/workflows/)
```

#### 5. Deploy React Frontend

```bash
# Navigate to web project
cd src/web

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Azure Static Web Apps or App Service
az webapp deploy --resource-group thinkfunding-rg --name thinkfunding-web --src-path dist --type zip
```

### Environment Variables

#### API (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "@Microsoft.KeyVault(SecretUri=https://thinkfunding-kv.vault.azure.net/secrets/SqlConnectionString)"
  },
  "Jwt": {
    "Secret": "@Microsoft.KeyVault(SecretUri=https://thinkfunding-kv.vault.azure.net/secrets/JwtSecret)",
    "Issuer": "ThinkFunding",
    "Audience": "ThinkFundingAPI"
  },
  "AzureStorage": {
    "ConnectionString": "@Microsoft.KeyVault(SecretUri=https://thinkfunding-kv.vault.azure.net/secrets/AzureStorageConnectionString)",
    "DocumentsContainer": "documents"
  }
}
```

### n8n Setup

1. Deploy n8n on Azure VM or Container Instance
2. Import workflows from `infrastructure/n8n/workflows/`
3. Configure environment variables:
   - `API_BASE_URL`: Your API URL
   - `APP_URL`: Your frontend URL

## Staging vs Production

### Staging
- Use separate resource group: `thinkfunding-rg-staging`
- Deploy to staging slot first
- Run smoke tests
- Swap with production using slots

### Production
- Use production resource group: `thinkfunding-rg`
- Use deployment slots for zero-downtime deployments

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check firewall rules
   - Verify SQL credentials in Key Vault

2. **Blob Storage Upload Failed**
   - Verify CORS settings
   - Check SAS token validity

3. **API Returns 401**
   - Check JWT secret matches
   - Verify token expiration settings

### Logs

```bash
# View API logs
az webapp log tail --resource-group thinkfunding-rg --name thinkfunding-api

# View deployment logs
az webapp deployment log --resource-group thinkfunding-rg --name thinkfunding-api
```

## CI/CD with GitHub Actions

See `.github/workflows/` for automated deployment workflows.

### Required Secrets
- `AZURE_CREDENTIALS`: Azure service principal
- `PAT_TOKEN`: GitHub personal access token
