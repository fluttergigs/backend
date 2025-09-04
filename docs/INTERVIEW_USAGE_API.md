# Interview Usage API Documentation

This API provides endpoints for managing interview usage tracking with plan-based access control.

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
    "planName": "Free Plan",
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
    "planName": "Free Plan",
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
    "isPaid": false,
    "plan": {
      "name": "free",
      "displayName": "Free Plan",
      "interviewsPerMonth": 3,
      "features": ["3 interview sessions per month", "Basic question bank", "Progress tracking"]
    }
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
    "planName": "paid",
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
    "plan": {
      "name": "paid",
      "displayName": "Premium Plan",
      "interviewsPerMonth": 20,
      "features": ["20 interview sessions per month", "Full question bank", "Advanced analytics", "Priority support"]
    }
  }
}
```

## Available Plans

### Free Plan
- **Name**: `free`
- **Display Name**: Free Plan
- **Interviews per month**: 3
- **Features**: 
  - 3 interview sessions per month
  - Basic question bank
  - Progress tracking

### Premium Plan
- **Name**: `paid`
- **Display Name**: Premium Plan
- **Interviews per month**: 20
- **Features**: 
  - 20 interview sessions per month
  - Full question bank
  - Advanced analytics
  - Priority support

## Plan Management

Plans are now stored in a dedicated `Plan` model for better scalability and flexibility. This allows for:
- Easy addition of new plans
- Dynamic plan features and limits
- Better data modeling separation
- Centralized plan configuration

## Usage Tracking

- Usage resets automatically on the 1st of each month
- Each month gets its own usage record
- Historical usage data is preserved
- Limits are dynamically fetched from the associated plan

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

### 400 Bad Request (Invalid plan)
```json
{
  "error": {
    "status": 400,
    "message": "Plan 'invalid-plan' not found or inactive"
  }
}
```