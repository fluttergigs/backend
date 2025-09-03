# Interview Usage API Documentation

This API provides endpoints for managing interview usage tracking with subscription-based access control.

## Endpoints

### Get Current Usage
```
GET /api/interview-usage/current
```
Returns the current month's usage and limits for the authenticated user.

**Response:**
```json
{
  "data": {
    "currentUsage": 2,
    "monthlyLimit": 3,
    "subscriptionTier": "free",
    "canUseInterview": true,
    "resetDate": "2025-02-01T00:00:00.000Z"
  }
}
```

### Increment Usage
```
POST /api/interview-usage/increment
```
Increments the interview usage count for the authenticated user.

**Response:**
```json
{
  "data": {
    "currentUsage": 3,
    "monthlyLimit": 3,
    "subscriptionTier": "free",
    "canUseInterview": false,
    "resetDate": "2025-02-01T00:00:00.000Z"
  }
}
```

### Get Usage History
```
GET /api/interview-usages
```
Returns interview usage records for the authenticated user (last 6 months).

**Response:**
```json
{
  "data": [
    {
      "month": "2024-12",
      "count": 5,
      "limit": 20,
      "sessions": 3
    },
    {
      "month": "2024-11", 
      "count": 2,
      "limit": 20,
      "sessions": 1
    }
  ]
}
```

### Get Subscription Status
```
GET /api/subscription-status
```
Returns the subscription status for the authenticated user.

**Response:**
```json
{
  "data": {
    "subscriptionStatus": "free",
    "subscriptionId": null,
    "isPaid": false
  }
}
```

### Update Subscription Status
```
PUT /api/subscription-status
```
Updates the subscription status for the authenticated user.

**Request:**
```json
{
  "data": {
    "subscriptionStatus": "paid",
    "subscriptionId": "sub_123456789"
  }
}
```

**Response:**
```json
{
  "data": {
    "subscriptionStatus": "paid",
    "subscriptionId": "sub_123456789",
    "isPaid": true,
    "newLimits": {
      "monthlyLimit": 20
    }
  }
}
```

## Usage Limits

- **Free tier**: 3 interviews per month
- **Paid tier**: 20 interviews per month
- Usage resets automatically on the 1st of each month

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": {
    "status": 401,
    "message": "You must be authenticated to access this resource"
  }
}
```

### 400 Bad Request (Monthly limit exceeded)
```json
{
  "error": {
    "status": 400,
    "message": "Monthly interview limit exceeded"
  }
}
```