# Troubleshooting & Operations Runbook

## Common Issues

### API Issues

#### 1. Application Won't Start
**Symptoms:** API returns 502 or crashes on startup

**Resolution:**
```bash
# Check application logs
az webapp log tail --resource-group thinkfunding-rg --name thinkfunding-api

# Verify environment variables
az webapp config appsettings list --resource-group thinkfunding-rg --name thinkfunding-api

# Restart application
az webapp restart --resource-group thinkfunding-rg --name thinkfunding-api
```

#### 2. Database Connection Failed
**Symptoms:** "A network-related or instance-specific error occurred"

**Resolution:**
```bash
# Check SQL firewall
az sql server firewall-rule list --resource-group thinkfunding-rg --server thinkfunding-sql

# Allow Azure services
az sql server firewall-rule create --resource-group thinkfunding-rg \
  --server thinkfunding-sql -n AllowAzureServices \
  --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

# Test connection string
az sql db show-connection-string --server thinkfunding-sql \
  --database thinkfunding_db --client dotnet
```

#### 3. JWT Authentication Not Working
**Symptoms:** 401 Unauthorized on protected endpoints

**Resolution:**
```bash
# Check JWT secret in Key Vault matches appsettings
az keyvault secret show --vault-name thinkfunding-kv --name JwtSecret

# Verify token expiration
# Tokens expire after 24 hours - check clock skew
```

### Frontend Issues

#### 4. Build Fails
**Symptoms:** `npm run build` fails with errors

**Resolution:**
```bash
# Clear node_modules and reinstall
cd src/web
rm -rf node_modules package-lock.json
npm install

# Run lint fix
npm run lint -- --fix
```

#### 5. CORS Errors
**Symptoms:** "Access-Control-Allow-Origin" errors in browser console

**Resolution:**
```bash
# Check CORS settings in API
az webapp cors show --resource-group thinkfunding-rg --name thinkfunding-api

# Add allowed origins
az webapp cors add --resource-group thinkfunding-rg --name thinkfunding-api \
  --allowed-origins "https://thinkfunding-web.azurewebsites.net"
```

### Payment/ACH Issues

#### 6. Stripe Webhook Not Receiving Events
**Symptoms:** ACH mandates not being created

**Resolution:**
```bash
# Check Stripe webhook configuration
# Verify webhook URL is accessible
curl -I https://thinkfunding-api.azurewebsites.net/webhook/stripe

# Check Stripe dashboard for failed deliveries
```

### n8n Workflow Issues

#### 7. Workflow Not Triggering
**Symptoms:** Webhook called but workflow doesn't fire

**Resolution:**
```bash
# Check n8n execution logs
# Navigate to n8n dashboard > Workflow > Executions

# Verify webhook is active
# Check workflow is turned ON (not draft)
```

## Monitoring

### Application Insights

```kusto
// API Errors
requests
| where timestamp > ago(1d)
| where success == false
| summarize count() by name, resultCode

// Slow Requests
requests
| where timestamp > ago(1h)
| where duration > 5000
| order by duration desc

// Failed Payments
customEvents
| where name == "PaymentFailed"
| summarize count() by properties.Result
```

### Azure Monitor Alerts

| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | >5% errors in 5 min | Critical |
| Slow Response | >3s average for 10 min | Warning |
| Disk Usage | >80% disk used | Warning |
| CPU Usage | >90% for 15 min | Warning |

## Maintenance Tasks

### Daily
- [ ] Check deployment status
- [ ] Review error logs
- [ ] Monitor collections payments

### Weekly
- [ ] Review n8n workflow executions
- [ ] Check database performance
- [ ] Verify backup completion
- [ ] Review audit logs for anomalies

### Monthly
- [ ] Apply OS/app patches
- [ ] Review security logs
- [ ] Test disaster recovery
- [ ] Update documentation

## Disaster Recovery

### Database Restore
```bash
# Point-in-time restore
az sql db restore --name thinkfunding_db \
  --resource-group thinkfunding-rg \
  --server thinkfunding-sql \
  --dest-name thinkfunding_db_restored \
  --restore-point-in-time "2024-01-15T10:00:00Z"
```

### Application Restart
```bash
# Restart all services
az webapp restart --resource-group thinkfunding-rg --name thinkfunding-api
az webapp restart --resource-group thinkfunding-rg --name thinkfunding-web
```

## Security

### If Compromise Suspected
1. Immediately rotate all secrets in Key Vault
2. Disable affected user accounts
3. Review audit logs for unauthorized access
4. Contact Azure support if needed
5. Document incident in post-mortem

### Key Rotation
```bash
# Rotate JWT secret (requires app restart)
az keyvault secret set --vault-name thinkfunding-kv --name "JwtSecret" --value "new-secret-value"

# Rotate SQL password
az sql server update --resource-group thinkfunding-rg \
  --name thinkfunding-sql --admin-password "NewPassword123!"
```
