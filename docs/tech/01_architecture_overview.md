# Architecture Overview

## System Architecture

Think Funding LLC Phase 1A MVP uses a modern cloud-native architecture on Microsoft Azure.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Azure Cloud                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Azure App Service                              │   │
│  │  ┌─────────────────────────┐    ┌─────────────────────────────────┐ │   │
│  │  │     React 18 SPA        │    │      ASP.NET Core 8 Web API     │ │   │
│  │  │   (Merchant Portal)     │    │   (Internal Ops + Merchants)      │ │   │
│  │  │                         │    │                                  │ │   │
│  │  │  Public Website         │    │  - Auth (JWT + Entra)           │ │   │
│  │  │  Merchant Portal        │    │  - Merchants CRUD                │ │   │
│  │  │  Ops Internal UI        │    │  - Applications                  │ │   │
│  │  └─────────────────────────┘    │  - Deals                        │ │   │
│  │                                 │  - Documents                    │ │   │
│  │                                 └─────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │   Azure SQL      │  │  Azure Blob     │  │    n8n (Azure VM)        │ │
│  │   Database      │  │  Storage        │  │    - Workflows           │ │
│  │   (System of    │  │  - Documents    │  │    - Notifications       │ │
│  │    Record)      │  │  - Uploads      │  │    - Teams/Email        │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘ │
│                                      │                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ Microsoft Entra  │  │ Azure Key Vault  │  │   Microsoft Lists        │ │
│  │ ID              │  │  (Secrets)       │  │   (Tasks only)          │ │
│  │ - Internal Auth │  │                  │  │                          │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 SPA | TypeScript, Vite, Tailwind CSS |
| Backend | ASP.NET Core 8 | C#, Entity Framework Core |
| Database | Azure SQL | System of Record |
| Storage | Azure Blob Storage | Document uploads |
| Auth (Internal) | Microsoft Entra ID | Employee SSO |
| Auth (Merchants) | ASP.NET Core Identity | JWT tokens |
| Workflow | n8n (Azure VM) | Automation |
| Notifications | Power Automate + n8n | Teams, Email |
| Hosting | Azure App Service | Web hosting |

## Application Tiers

### Public Website
- Landing page with marketing content
- How It Works, About, FAQ pages
- Contact form
- Redirects to merchant portal for applications

### Merchant Portal (React SPA)
- Login/Registration with email/password
- 4-step application wizard
- Document upload with drag-and-drop
- Application status tracking
- Profile management

### Internal Operations UI (React SPA)
- Dashboard with KPIs
- Application list and detail views
- Deal management
- Collections monitoring
- Merchant management
- Settings and configuration

## API Architecture

### RESTful Endpoints

```
Authentication:
POST   /api/auth/login           - Merchant login
POST   /api/auth/register        - Merchant registration
POST   /api/auth/refresh         - Refresh token
POST   /api/auth/logout          - Logout
GET    /api/auth/me              - Current user

Merchants:
GET    /api/merchants                    - List merchants (internal)
GET    /api/merchants/{id}              - Get merchant details
POST   /api/merchants                    - Create merchant
PUT    /api/merchants/{id}              - Update merchant

Applications:
GET    /api/applications                  - List applications
GET    /api/applications/{id}            - Get application details
POST   /api/applications                  - Create application
PUT    /api/applications/{id}            - Update application
POST   /api/applications/{id}/submit      - Submit application
POST   /api/applications/{id}/approve    - Approve application
POST   /api/applications/{id}/decline    - Decline application

Documents:
GET    /api/documents                     - List documents
POST   /api/documents/upload              - Upload document
GET    /api/documents/{id}/download       - Get download URL

Deals:
GET    /api/deals                         - List deals
GET    /api/deals/{id}                   - Get deal details
POST   /api/deals                         - Create deal
PUT    /api/deals/{id}                   - Update deal
POST   /api/deals/{id}/fund              - Fund deal
POST   /api/deals/{id}/close             - Close deal
```

### Security
- JWT tokens for merchant authentication
- Microsoft Entra ID for internal employee authentication
- Role-based access control (Admin, Underwriter, Viewer)
- HTTPS/TLS 1.2+ enforced
- PII data encrypted at rest
- No secrets in code (Azure Key Vault)

## Data Flow

1. **Application Submission**
   - Merchant submits application via React SPA
   - API validates and stores in Azure SQL
   - n8n webhook triggered for workflow
   - Teams notification sent to underwriting

2. **Document Upload**
   - File uploaded to Azure Blob Storage
   - Document record created in SQL
   - n8n triggered to update statuses

3. **Deal Funding**
   - Underwriter approves application
   - Deal created with ACH authorization
   - Payment schedule generated
   - Stripe ACH mandate created

## Deployment

- **Development**: Local development environment
- **Staging**: Azure App Service staging slot
- **Production**: Azure App Service production

See [DEPLOYMENT.md](../deployment/DEPLOYMENT.md) for detailed deployment steps.
