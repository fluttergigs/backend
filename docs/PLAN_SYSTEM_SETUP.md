# Plan System Setup Guide

This guide explains how to set up and use the new plan-based interview usage system.

## Overview

The plan system replaces the simple `subscriptionStatus` enum with a flexible plan model that allows for:
- Dynamic plan configuration
- Easy addition of new plans
- Better scalability and maintainability
- Centralized plan feature management

## Database Migration

### 1. Update Schema
The User model now has a relation to the Plan model instead of a `subscriptionStatus` field:

**Before:**
```json
"subscriptionStatus": {
  "type": "enumeration",
  "enum": ["free", "paid"],
  "default": "free"
}
```

**After:**
```json
"plan": {
  "type": "relation",
  "relation": "manyToOne",
  "target": "api::plan.plan"
}
```

### 2. Run Setup Scripts
After updating your schema, run the following to set up plans and migrate existing data:

```bash
# Start Strapi in development mode to run the bootstrap
npm run develop

# In your Strapi console or admin panel, run:
# - Plan seeder to create default plans
# - Migration script to assign plans to existing users
```

Alternatively, you can run the bootstrap manually:
```javascript
// In your Strapi application
const { bootstrap } = require('./database/bootstrap');
await bootstrap();
```

## Plan Configuration

### Default Plans

#### Free Plan
- **Name**: `free`
- **Display Name**: Free Plan
- **Interviews per month**: 3
- **Features**: Basic interview functionality

#### Premium Plan
- **Name**: `paid`
- **Display Name**: Premium Plan
- **Interviews per month**: 20
- **Features**: Full interview functionality with advanced features

### Adding New Plans

To add a new plan, create it through the Strapi admin panel or programmatically:

```javascript
const newPlan = await strapi.entityService.create('api::plan.plan', {
  data: {
    name: 'enterprise',
    displayName: 'Enterprise Plan',
    interviewsPerMonth: 100,
    isActive: true,
    description: 'Enterprise plan for large teams',
    features: [
      '100 interview sessions per month',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support'
    ]
  }
});
```

## API Changes

### Request Format Changes

**Before:**
```json
{
  "data": {
    "subscriptionStatus": "paid",
    "subscriptionId": "sub_123"
  }
}
```

**After:**
```json
{
  "data": {
    "planName": "paid",
    "subscriptionId": "sub_123"
  }
}
```

### Response Format Changes

**Before:**
```json
{
  "subscriptionStatus": "paid",
  "isPaid": true
}
```

**After:**
```json
{
  "subscriptionStatus": "paid",
  "isPaid": true,
  "plan": {
    "name": "paid",
    "displayName": "Premium Plan",
    "interviewsPerMonth": 20,
    "features": [...]
  }
}
```

## Migration Checklist

- [ ] Update User schema to use plan relation
- [ ] Create Plan model and API
- [ ] Run plan seeder to create default plans
- [ ] Run migration script to assign plans to existing users
- [ ] Update frontend code to use new API format
- [ ] Update validation schemas
- [ ] Test the new plan system
- [ ] Update documentation

## Troubleshooting

### Common Issues

1. **"Default free plan not found" error**
   - Ensure you've run the plan seeder first
   - Check that the free plan exists and is active

2. **Users without plans**
   - Run the migration script to assign default plans
   - New users should automatically get the free plan

3. **API validation errors**
   - Update API calls to use `planName` instead of `subscriptionStatus`
   - Ensure plan names are valid ('free' or 'paid')

### Verification

To verify the migration was successful:

1. Check that plans exist:
```javascript
const plans = await strapi.entityService.findMany('api::plan.plan');
console.log('Available plans:', plans);
```

2. Check that users have plans assigned:
```javascript
const users = await strapi.query('plugin::users-permissions.user').findMany({
  populate: ['plan']
});
console.log('Users with plans:', users.filter(u => u.plan).length);
```

3. Test the API endpoints to ensure they work correctly