# Think Funding LLC - Phase 1A MVP

A lean, launch-oriented Merchant Cash Advance (MCA) platform built on Azure.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 SPA |
| Backend | ASP.NET Core 8 Web API |
| Database | Azure SQL Database |
| Document Storage | Azure Blob Storage |
| Auth (Internal) | Microsoft Entra ID |
| Auth (Merchants) | ASP.NET Core Identity |
| Workflow | n8n (Azure-hosted) |
| Hosting | Azure App Service |

## Project Structure

```
ThinkFunding/
├── src/
│   ├── api/           # ASP.NET Core 8 Web API
│   └── web/           # React 18 SPA
├── infrastructure/
│   ├── azure/         # ARM templates
│   ├── sql/           # Database schema
│   └── n8n/          # Workflow exports
├── docs/              # Technical documentation
├── tests/             # Test projects
├── init               # Quick start guide
└── AGENTS.md          # Development guidelines
```

## Quick Start

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (local dev)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd ThinkFunding
```

### 2. Set Up Backend

```bash
cd src/api

# Restore packages
dotnet restore

# Update appsettings.Development.json with your local connection strings
# Then run migrations (when ready)
dotnet ef database update

# Run API
dotnet run
```

API runs at: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### 3. Set Up Frontend

```bash
cd src/web

# Install dependencies
npm install

# Copy .env.example to .env and configure
cp .env.example .env

# Run development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Milestones

| Milestone | Due | Payment |
|-----------|-----|---------|
| M1: Foundation & Environment Setup | May 2, 2026 | PHP 36,114 |
| M2: Core Platform Build & Workflow Integration | May 17, 2026 | PHP 54,171 |
| M3: Testing, Launch Readiness & Completion | June 1, 2026 | PHP 90,285 |

## Documentation

All technical documentation is organized in `/docs`:

- [Architecture](./docs/architecture/)
- [Codebase](./docs/codebase/)
- [Configuration](./docs/configuration/)
- [Database](./docs/database/)
- [Workflows](./docs/workflows/)
- [Deployment](./docs/deployment/)
- [Dependencies](./docs/dependencies/)
- [Runbook](./docs/runbook/)
- [Limitations](./docs/limitations/)

## Contract

This project is developed under the terms of the **Phase 1A MSA-SOW** between Think Funding LLC and Vincent John Rodriguez.

**Key Clauses:**
- All work in Client's Azure environment
- Technical Documentation is a material deliverable
- Change Orders required for scope changes
- IP transfers to Client upon payment

## Contact

| Role | Name | Email |
|------|------|-------|
| Client | Aia Labja | aia.labja@thinkfundinggroup.com |
| Developer | Vincent Rodriguez | vjrodriguez1994@gmail.com |

---

*Last Updated: April 15, 2026*
