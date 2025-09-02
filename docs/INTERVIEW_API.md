# Interview Usage & Consultant API Documentation

## Overview
This API provides endpoints for managing interview usage tracking and consultant data with tier-based access control.

## User Subscription Model

### Subscription Tiers
- **Free Tier**: 5 interviews per month, access to free consultants only
- **Paid Tier**: 50 interviews per month, access to all consultants (free + paid)

### User Model Extensions
The User model has been extended with the following fields:
- `subscriptionStatus`: enum ('free', 'paid') - default: 'free'
- `subscriptionId`: string - Stripe subscription ID (private field)
- `interviewUsageCount`: integer - current month's usage count - default: 0
- `lastUsageReset`: datetime - last time usage was reset - default: now

## API Endpoints

### Interview Usage Management

#### GET /api/interview-usage/current
Get current interview usage and limits for authenticated user.

**Authentication**: Required
**Response**:
```json
{
  "data": {
    "currentUsage": 3,
    "monthlyLimit": 5,
    "subscriptionTier": "free",
    "canUseInterview": true,
    "resetDate": "2024-10-01T00:00:00.000Z"
  }
}
```

#### POST /api/interview-usage/increment
Increment interview usage count for authenticated user.

**Authentication**: Required
**Response**:
```json
{
  "data": {
    "currentUsage": 4,
    "monthlyLimit": 5,
    "subscriptionTier": "free",
    "canUseInterview": true,
    "resetDate": "2024-10-01T00:00:00.000Z"
  }
}
```

**Error Response** (when limit exceeded):
```json
{
  "error": {
    "status": 400,
    "message": "Monthly interview limit exceeded"
  }
}
```

### Subscription Management

#### GET /api/subscription-status
Get subscription status for authenticated user.

**Authentication**: Required
**Response**:
```json
{
  "data": {
    "subscriptionStatus": "free",
    "subscriptionId": null,
    "isPaid": false
  }
}
```

#### PUT /api/subscription-status
Update subscription status for authenticated user (typically called by webhook).

**Authentication**: Required
**Request Body**:
```json
{
  "data": {
    "subscriptionStatus": "paid",
    "subscriptionId": "sub_1234567890"
  }
}
```

**Response**:
```json
{
  "data": {
    "subscriptionStatus": "paid",
    "subscriptionId": "sub_1234567890",
    "isPaid": true,
    "newLimits": {
      "monthlyLimit": 50
    }
  }
}
```

### Consultant Management

#### GET /api/consultants
Get list of consultants with access control based on user's subscription tier.

**Authentication**: Optional (affects access level)
**Query Parameters**:
- `filters`: object - additional filters
- `sort`: object - sorting options
- `start`: number - pagination start (default: 0)
- `limit`: number - pagination limit (default: 25, max: 100)

**Response for Free User**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "bio": "Senior Flutter developer...",
      "yearsOfExperience": 8,
      "specialties": ["Flutter", "Dart", "State Management"],
      "isAvailable": true,
      "isPaidConsultant": false,
      "rating": 4.8,
      "totalSessions": 145,
      "accessLevel": {
        "tier": "free",
        "accessible": true,
        "upgradeRequired": false
      },
      "isAccessible": true
    }
  ]
}
```

**Response for Paid User** (includes both free and paid consultants):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "isPaidConsultant": false,
      "accessLevel": {
        "tier": "free",
        "accessible": true,
        "upgradeRequired": false
      },
      "isAccessible": true
    },
    {
      "id": 2,
      "name": "Bob Chen",
      "hourlyRate": 150,
      "isPaidConsultant": true,
      "calendlyUrl": "https://calendly.com/bob-chen",
      "accessLevel": {
        "tier": "paid",
        "accessible": true,
        "upgradeRequired": false
      },
      "isAccessible": true
    }
  ]
}
```

#### GET /api/consultants/:id
Get single consultant details with access control.

**Authentication**: Optional (affects access level)
**Response**: Same structure as individual consultant from list endpoint

**Error Response** (when paid consultant accessed by free user):
```json
{
  "error": {
    "status": 400,
    "message": "Access denied. This consultant requires a paid subscription."
  }
}
```

## Consultant Model

### Consultant Attributes
- `name`: string (required)
- `email`: email (required, unique)
- `bio`: text
- `avatar`: string (URL)
- `yearsOfExperience`: integer (default: 0)
- `hourlyRate`: decimal
- `specialties`: json array
- `isAvailable`: boolean (default: true)
- `isPaidConsultant`: boolean (required, default: false)
- `linkedinProfile`: string
- `githubProfile`: string
- `portfolioUrl`: string
- `calendlyUrl`: string
- `timezone`: string (default: "UTC")
- `rating`: decimal (default: 0.0)
- `totalSessions`: integer (default: 0)

## Business Logic

### Usage Reset Logic
- Usage counters reset monthly on the 1st of each month at 00:00 UTC
- Reset is automatic and triggered when usage is checked/incremented
- When subscription status changes, usage is immediately reset

### Access Control Logic
- **Free users**: Can only see and access consultants with `isPaidConsultant: false`
- **Paid users**: Can see and access all consultants
- **Unauthenticated users**: Same access as free users

### Monthly Limits
- **Free tier**: 5 interviews per month
- **Paid tier**: 50 interviews per month
- Limits are enforced when incrementing usage

## Integration with Frontend/Nuxt

### Webhook Integration
The `PUT /api/subscription-status` endpoint is designed to be called by Stripe webhooks managed by the Nuxt frontend server.

### Typical Flow
1. User registers → starts with free tier (5 interviews/month)
2. User attempts interview → check current usage via GET `/api/interview-usage/current`
3. If allowed, conduct interview → increment usage via POST `/api/interview-usage/increment`
4. User upgrades subscription → Nuxt handles Stripe, then calls PUT `/api/subscription-status`
5. User browses consultants → GET `/api/consultants` returns appropriate consultants based on tier

### Error Handling
All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (validation errors, limit exceeded)
- `401`: Unauthorized (authentication required)
- `404`: Not found
- `500`: Internal server error

## Security Notes
- All endpoints require authentication except consultant browsing (which affects access level)
- Subscription ID is stored as a private field and not exposed in API responses
- Access control is enforced at the service level for security