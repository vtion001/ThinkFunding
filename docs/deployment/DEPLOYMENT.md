# Think Funding LLC - Deployment Guide

This guide covers deployment to Azure App Service.

## Prerequisites

- Azure CLI (`az`)
- .NET 8 SDK
- Node.js 20+
- Azure subscription with contributor access

## Azure Resources

Create the following resources in Azure:

```bash
# Resource Group
az group create --name thinkfunding-rg --location eastus

# App Service Plan
az appservice plan create \
    --name thinkfunding-plan \
    --resource-group thinkfunding-rg \
    --sku B1

# Web App (Frontend)
az webapp create \
    --name thinkfunding-web \
    --resource-group thinkfunding-rg \
    --plan thinkfunding-plan \
    --runtime "NODE|20-lts"

# API App
az webapp create \
    --name thinkfunding-api \
    --resource-group thinkfunding-rg \
    --plan thinkfunding-plan \
    --runtime "DOTNET|8.0"

# SQL Database
az sql server create \
    --name thinkfunding-sql \
    --resource-group thinkfunding-rg \
    --admin-user sqladmin \
    --admin-password <your-password>

az sql db create \
    --name ThinkFunding \
    --resource-group thinkfunding-rg \
    --server thinkfunding-sql \
    --service-objective S0

# Blob Storage
az storage account create \
    --name thinkfundingstore \
    --resource-group thinkfunding-rg \
    --sku Standard_LRS

# Get connection strings
az sql server show-connection-string \
    --name thinkfunding-sql \
    --server-name thinkfunding-sql

az storage account show-connection-string \
    --name thinkfundingstore
```

## Environment Configuration

### API App Settings

```bash
az webapp config appsettings set \
    --resource-group thinkfunding-rg \
    --name thinkfunding-api \
    --settings \
    AZURE_SQL_CONNECTION_STRING="Server=tcp:thinkfunding-sql.database.windows.net;Database=ThinkFunding;User Id=sqladmin;Password=<password>;Trusted_Connection=False;Encrypt=True;" \
    AZURE_BLOB_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=thinkfundingstore;AccountKey=<key>;EndpointSuffix=core.windows.net" \
    JWT_SECRET="<your-32-char-secret>"
```

### Web App Settings

```bash
az webapp config appsettings set \
    --resource-group thinkfunding-rg \
    --name thinkfunding-web \
    --settings \
    REACT_APP_API_URL="https://thinkfunding-api.azurewebsites.net" \
    REACT_APP_ENTRA_CLIENT_ID="<entra-client-id>"
```

## Deploy

### Build

```bash
# API
cd src/api
dotnet publish -c Release -o ../publish/api

# Web
cd ../web
npm install
npm run build
mv dist ../publish/web
```

### Deploy via ZIP

```bash
# API
az webapp deployment source config-zip \
    --resource-group thinkfunding-rg \
    --name thinkfunding-api \
    --src ../publish/api.zip

# Web
az webapp deployment source config-zip \
    --resource-group thinkfunding-rg \
    --name thinkfunding-web \
    --src ../publish/web.zip
```

## Database Migrations

Run migrations on Azure SQL:

```bash
cd src/api
dotnet ef database update \
    --connection "Server=tcp:thinkfunding-sql.database.windows.net;Database=ThinkFunding;User Id=sqladmin;Password=<password>;Trusted_Connection=False;Encrypt=True;"
```

## Verify Deployment

1. Check API: `https://thinkfunding-api.azurewebsites.net/swagger`
2. Check Web: `https://thinkfunding-web.azurewebsites.net`
3. Test authentication flows
4. Verify database connections

---

*For detailed troubleshooting, see docs/runbook/README.md*
