# API Documentation

## Base URL

```
Production: https://thinkfunding-api.azurewebsites.net
Staging: https://thinkfunding-api-staging.azurewebsites.net
Development: https://localhost:5001
```

## Authentication

### Merchant Authentication
Merchants use email/password authentication with JWT tokens.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "merchant@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "random-refresh-token",
    "user": {
      "id": 1,
      "email": "merchant@example.com",
      "role": "merchant",
      "businessName": "ABC Business LLC",
      "businessId": "TF-2026-00001"
    }
  }
}
```

### Internal Authentication
Internal employees use Microsoft Entra ID SSO.

## Common Headers

```http
Authorization: Bearer {token}
Content-Type: application/json
```

## API Endpoints

### Auth Controller

#### POST /api/auth/login
Login for merchants.

**Request:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "string",
    "refreshToken": "string",
    "user": {
      "id": "number",
      "email": "string",
      "role": "string",
      "businessName": "string",
      "businessId": "string"
    }
  }
}
```

#### POST /api/auth/register
Register new merchant.

**Request:**
```json
{
  "businessName": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "phone": "string (optional)",
  "businessType": "string (optional)"
}
```

#### POST /api/auth/refresh
Refresh access token.

**Request:**
```json
{
  "refreshToken": "string"
}
```

#### GET /api/auth/me
Get current user (requires auth).

### Merchants Controller

#### GET /api/merchants
List all merchants (internal only).

**Query Parameters:**
- `status` - Filter by status (Active, Pending, etc.)

#### GET /api/merchants/{id}
Get merchant by ID.

#### POST /api/merchants
Create new merchant.

**Request:**
```json
{
  "legalName": "string (required)",
  "dbaName": "string (optional)",
  "ein": "string (optional)",
  "businessType": "string (optional)",
  "industry": "string (optional)",
  "addressLine1": "string (optional)",
  "city": "string (optional)",
  "state": "string (optional)",
  "zipCode": "string (optional)",
  "phone": "string (optional)",
  "email": "string (required)",
  "monthlyRevenue": "number (optional)",
  "averageDailyBalance": "number (optional)"
}
```

#### PUT /api/merchants/{id}
Update merchant.

### Applications Controller

#### GET /api/applications
List applications with optional filters.

**Query Parameters:**
- `status` - Filter by status
- `merchantId` - Filter by merchant
- `fromDate` - Filter from date
- `toDate` - Filter to date

#### GET /api/applications/{id}
Get application by ID with details.

#### POST /api/applications
Create new application.

**Request:**
```json
{
  "merchantId": "number (required)",
  "loanAmountRequested": "number (optional)",
  "useOfFunds": "string (optional)"
}
```

#### PUT /api/applications/{id}
Update application.

#### POST /api/applications/{id}/submit
Submit application for review.

#### POST /api/applications/{id}/approve
Approve application.

**Request:**
```json
{
  "decision": "Approved",
  "decisionNotes": "string (optional)"
}
```

#### POST /api/applications/{id}/decline
Decline application.

**Request:**
```json
{
  "decision": "Declined",
  "decisionNotes": "string (required)"
}
```

### Deals Controller

#### GET /api/deals
List deals with optional filters.

#### GET /api/deals/{id}
Get deal by ID with payment history.

#### POST /api/deals
Create new deal from approved application.

**Request:**
```json
{
  "applicationId": "number (required)",
  "advanceAmount": "number (required)",
  "factorRate": "number (required)",
  "paymentMethod": "string (optional)",
  "startDate": "date (optional)"
}
```

#### POST /api/deals/{id}/fund
Fund deal and activate ACH.

**Request:**
```json
{
  "principalId": "number (required)",
  "achAuthorization": {
    "bankName": "string (required)",
    "routingNumber": "string (required)",
    "accountNumberLast4": "string (required)",
    "accountType": "string (required)",
    "authorizationType": "string (required)",
    "authorizedBy": "string (required)",
    "authorizationDate": "date (required)"
  }
}
```

#### POST /api/deals/{id}/close
Close/complete deal.

**Request:**
```json
{
  "reason": "string (optional)"
}
```

### Documents Controller

#### POST /api/documents/upload
Upload document (multipart/form-data).

**Form Fields:**
- `file` - File binary (required)
- `documentType` - Type (required)
- `documentSubType` - Subtype (optional)
- `applicationId` - Application ID (optional)
- `merchantId` - Merchant ID (optional)
- `dealId` - Deal ID (optional)

#### GET /api/documents/{id}/download
Get download URL for document.

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.
