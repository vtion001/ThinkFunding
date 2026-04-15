# DEVELOPER HANDOFF - QUICK REFERENCE
## Think Funding LLC - Phase 1A MVP

**Version:** 1.0  
**Date:** April 14, 2026  
**Purpose:** One-page developer reference for Phase 1A implementation

---

## 🚀 QUICK START

### Tech Stack (LOCKED - DO NOT CHANGE)
| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Backend | ASP.NET Core 8 |
| Database | Azure SQL Database |
| Storage | Azure Blob Storage |
| Auth | Microsoft Entra ID |
| Workflow | n8n (Azure-hosted) |
| AI Services | Python 3.11+ |
| Work Queue | Microsoft Lists |
| Notifications | Power Automate + n8n |
| Hosting | Azure App Service |

### Key Constraints
- All work in **Client's Azure environment** (not developer infrastructure)
- Azure SQL = **System of Record ONLY** (Lists is NOT a SoR)
- Change Orders required for **any scope changes**
- Technical Documentation is a **material Deliverable**
- Pre-existing Developer materials must be **listed in writing**

---

## 🎨 BRAND COLORS

```
Navy:      #0B2D4E  (Primary - Trust)
Navy Dark: #061A2C  (Headers/Footers)
Teal:      #199B93  (Accent - Growth)
Teal Light:#E6F5F4  (Backgrounds)
White:     #FFFFFF

Status:
Success:   #10B981 | Warning: #F59E0B | Danger: #EF4444 | Info: #3B82F6
```

**Font:** Inter (Google Fonts) - weights 400, 500, 600, 700

---

## 📁 PROJECT STRUCTURE

```
thinkfunding/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route pages
│   │   ├── public/          # Public website
│   │   ├── merchant/         # Merchant portal
│   │   └── operations/       # Internal UI
│   ├── api/                 # API clients
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React context providers
│   ├── utils/               # Utility functions
│   └── styles/             # Global styles, CSS variables
├── api/                     # ASP.NET Core API project
├── workflows/              # n8n workflow exports
├── docs/                    # Technical documentation (SharePoint)
└── tests/                   # Test files
```

---

## 📋 PHASE 1A DELIVERABLES CHECKLIST

### Public Website
- [ ] Header with sticky navigation
- [ ] Hero section with CTAs
- [ ] Value propositions (4 cards)
- [ ] How It Works (4 steps)
- [ ] Requirements section
- [ ] FAQ accordion
- [ ] Footer with links
- [ ] Dark mode toggle
- [ ] Mobile responsive

### Merchant Portal
- [ ] Login page
- [ ] Registration page
- [ ] Dashboard with sidebar
- [ ] Application wizard (4 steps)
- [ ] Document upload with drag-drop
- [ ] Profile management
- [ ] Status tracking

### Internal Operations UI
- [ ] Application list with filters
- [ ] Application detail view (8 tabs)
- [ ] Deal management view
- [ ] Collections dashboard
- [ ] Role-based access control

### Backend/API
- [ ] Entra authentication
- [ ] Merchant CRUD endpoints
- [ ] Application CRUD + workflow
- [ ] Document upload/download
- [ ] Deal management
- [ ] Audit logging

### Infrastructure
- [ ] Azure App Service setup
- [ ] Azure SQL Database + schema
- [ ] Blob Storage configuration
- [ ] Entra app registrations
- [ ] n8n instance
- [ ] CI/CD pipeline

---

## 🔌 API ENDPOINTS

```
Authentication:
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me

Merchants:
GET    /api/merchants
GET    /api/merchants/{id}
POST   /api/merchants
PUT    /api/merchants/{id}
GET    /api/merchants/{id}/owners

Applications:
GET    /api/applications
GET    /api/applications/{id}
POST   /api/applications
PUT    /api/applications/{id}
POST   /api/applications/{id}/submit
POST   /api/applications/{id}/approve
POST   /api/applications/{id}/decline

Documents:
GET    /api/documents
POST   /api/documents/upload
GET    /api/documents/{id}/download

Deals:
GET    /api/deals
GET    /api/deals/{id}
POST   /api/deals
PUT    /api/deals/{id}
POST   /api/deals/{id}/fund
```

---

## 🗄️ DATABASE TABLES

```
Core Tables:
- Merchants       (MerchantId, BusinessId, LegalName, ...)
- Persons         (PersonId, PersonType, FirstName, LastName, ...)
- Applications    (ApplicationId, ApplicationNumber, MerchantId, ...)
- Deals           (DealId, DealNumber, ApplicationId, ...)
- Documents       (DocumentId, DocumentType, BlobPath, ...)
- ComplianceChecks
- ACHAuthorizations
- PaymentAttempts
- PaymentEvents
- Brokers
- AuditLogs

Required Indexes:
- IX_Applications_Merchant
- IX_Applications_Status
- IX_Deals_Merchant
- IX_Deals_Status
- IX_Documents_Application
```

---

## ⚙️ ENVIRONMENT VARIABLES

```bash
# API
AZURE_SQL_CONNECTION_STRING=
AZURE_BLOB_CONNECTION_STRING=
ENTRA_CLIENT_ID=
ENTRA_CLIENT_SECRET=
ENTRA_TENANT_ID=
JWT_SECRET=

# Frontend
ENTRA_CLIENT_ID=
API_BASE_URL=
```

---

## 📝 N8N WORKFLOWS (Phase 1A)

1. **New Application Submission** - Creates Lists task + sends notifications
2. **Document Uploaded** - Updates document status
3. **Application Status Change** - Routes notifications based on status
4. **Missing Document Alert** - Daily check + reminder emails
5. **Daily Underwriting Reminder** - Summary to underwriting channel

**Lists Columns:**
- Task ID, Task Type, Functional Area, Priority, Status
- Assigned To, Backup Owner, Due Date, SLA Target
- Related Entity Type, Related Entity ID
- Source System, Source Event, Escalation Flag

---

## 🎯 ACCEPTANCE CRITERIA (Exhibit B-1 Summary)

### Milestone 1 - Foundation (May 2)
- Azure resources provisioned
- Source code repository created
- Entra ID authentication functional
- n8n instance accessible
- SharePoint documentation folder created
- Environment configuration documented

### Milestone 2 - Core Platform (May 17)
- Website loads with no JS errors; dark mode works
- Merchant application form submits to Azure SQL
- Document upload stores to Blob Storage
- Admin interface shows submissions with search/filter
- n8n submission intake workflow triggers
- Outlook/Teams notifications sent
- Technical Documentation (M1-M2) uploaded

### Milestone 3 - Testing & Launch (June 1)
- End-to-end workflow test passes
- Production deployment verified; SSL active
- Client UAT completed
- Complete handoff package delivered
- Full Technical Documentation uploaded
- Deployment runbook documented

---

## ⚠️ IMPORTANT REMINDERS

### DO ✅
- Use the brand colors exactly as specified
- Follow the CSS variable naming convention
- Implement dark mode toggle on website
- Store credentials in Azure Key Vault
- Write Technical Documentation as you build
- Use Change Orders for scope changes
- Log everything to AuditLogs table
- Use UTC for all datetime fields

### DON'T ❌
- Change the tech stack without approval
- Use your own infrastructure for any Client work
- Store secrets in code
- Make assumptions about scope - ask
- Skip the Change Order process
- Treat Microsoft Lists as a system of record
- Hard delete any records (use IsDeleted flag)
- Proceed without client acceptance sign-off

---

## 📞 CONTACTS

| Role | Name | Email |
|------|------|-------|
| Client/Business | Aia Labja | aia.labja@thinkfundinggroup.com |
| Tech Architect | Edwin | (to be added) |
| Developer | Vincent Rodriguez | vjrodriguez1994@gmail.com |

---

## 📂 REFERENCE DOCUMENTS

| Document | Location |
|----------|----------|
| Full Context | `/development_files/01_LLM_CONTEXT.md` |
| Implementation Guide | `/development_files/02_IMPLEMENTATION_GUIDELINES.md` |
| Figma Prompts | `/development_files/03_FIGMA_PROMPTS.md` |
| This Document | `/development_files/04_DEVELOPER_HANDOFF.md` |
| Original MSA | `/Documentations Agreements/Vincent John Rodriguez - Phase1A-MSA-SOW_encrypted_.pdf` |
| Acceptance Criteria | `/Documentations Agreements/Exhibit_B-1_Milestone_Acceptance_Criteria.md` |

---

## 🔗 USEFUL LINKS

- Azure Portal: https://portal.azure.com
- Microsoft Entra: https://entra.microsoft.com
- SharePoint: https://thinkfunding.sharepoint.com
- n8n: (to be provided)
- GitHub Repo: (to be provided)

---

**Last Updated:** April 14, 2026  
**Next Review:** Weekly during active development