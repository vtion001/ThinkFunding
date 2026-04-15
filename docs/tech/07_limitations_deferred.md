# Known Limitations & Deferred Items

## Phase 1A Scope (Current)

### Working Features
- [x] Public website with marketing pages
- [x] Merchant registration and login (email/password)
- [x] 4-step application wizard
- [x] Document upload (UI only, blob storage integration partial)
- [x] Internal ops dashboard and list views
- [x] Application review workflow (UI only)
- [x] Deal management (UI only)
- [x] Collections monitoring (UI only)
- [x] REST API (core CRUD operations)
- [x] Database schema (Azure SQL)
- [x] n8n workflow templates (5 workflows)
- [x] Technical documentation (6 docs complete)

### Known Limitations

#### Authentication
- Microsoft Entra ID integration is **NOT implemented** - internal employees use placeholder login
- JWT tokens use symmetric keys (should use asymmetric in production)
- No refresh token rotation implemented

#### Frontend
- All pages are **placeholder UI** - no actual API integration
- State management uses local storage (should use secure httpOnly cookies)
- No offline support or PWA features
- Dark mode toggle exists but is non-functional

#### Backend
- No actual file upload to Azure Blob (stub implementation)
- No Stripe integration (ACH payments not functional)
- No email sending implementation
- No real compliance checks (PEP, sanctions screening)

#### Data
- Sample/seed data only in UI mocks
- No data migrations system (EF Core migrations not set up)
- No audit logging implementation

#### Infrastructure
- Azure resources not provisioned (docs only)
- CI/CD pipelines not functional (syntax only)
- n8n workflows are templates, not deployed

## Phase 1B (Deferred)

The following features were explicitly excluded from Phase 1A per Contract Section A.5:

### AI & Automation
- [ ] AI-powered underwriting decisions
- [ ] Bank statement OCR/document extraction
- [ ] Automated cash flow analysis
- [ ] Smart document classification

### Broker/ISO Portal
- [ ] Broker dashboard
- [ ] Commission tracking
- [ ] ISO partner management
- [ ] Broker portal login

### Underwriting & Servicing
- [ ] Full underwriting workbench
- [ ] Decision engine with rules
- [ ] Payment servicing system
- [ ] Collections automation

### Advanced Features
- [ ] BI dashboards / Power BI integration
- [ ] Advanced reporting
- [ ] Mobile applications
- [ ] Real-time notifications

### Security (Future)
- [ ] Penetration testing
- [ ] SOC 2 compliance
- [ ] Advanced threat detection

## Assumptions Made

1. **Azure Subscription** - Client will provide Azure subscription access
2. **Microsoft 365/Entra** - Client has Microsoft 365 tenant
3. **Stripe Account** - Client has Stripe account for ACH
4. **Domain** - Client owns `thinkfunding.com` domain
5. **Email** - SendGrid or Outlook for transactional emails

## Technical Debt

### High Priority
- [ ] Implement Entra ID authentication properly
- [ ] Add file upload to Azure Blob
- [ ] Set up EF Core migrations
- [ ] Implement audit logging

### Medium Priority
- [ ] Replace placeholder data with API calls
- [ ] Add proper error handling
- [ ] Implement Stripe ACH integration
- [ ] Set up monitoring/alerting

### Low Priority
- [ ] Add dark mode functionality
- [ ] Implement offline support
- [ ] Add unit tests (currently 0% coverage)
- [ ] Performance optimization

## Out of Scope (永远)

Per Contract Exhibit A Section A.5, these will never be in scope without a Change Order:

- AI/ML features
- White-labeling
- Multi-tenancy
- Mobile apps (iOS/Android)
- Desktop app
- Third-party integrations beyond documented

## Change Order Process

If any deferred feature is needed, follow the Change Order process in AGENTS.md:

```markdown
# Change Order Request
**Feature:** [Description]
**Estimated Impact:** [Fees + Timeline]
**Submitted By:** [Name]
**Date:** [Date]
```

Changes require client signature before implementation.
