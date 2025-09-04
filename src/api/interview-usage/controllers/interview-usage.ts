'use strict';

/**
 * interview-usage controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController('api::interview-usage.interview-usage', ({ strapi }) => ({
  async getCurrentUsage(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const usage = await strapi.service('api::interview-usage.interview-usage').getCurrentUsage(user.id);
      return { data: usage };
    } catch (error) {
      console.error('Error getting current usage:', error);
      return ctx.internalServerError('Unable to get current usage');
    }
  },

  async incrementUsage(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const usage = await strapi.service('api::interview-usage.interview-usage').incrementUsage(user.id);
      return { data: usage };
    } catch (error) {
      console.error('Error incrementing usage:', error);
      if (error.message === 'Monthly limit exceeded') {
        return ctx.badRequest('Monthly interview limit exceeded');
      }
      return ctx.internalServerError('Unable to increment usage');
    }
  },

  async getUsageHistory(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const usageHistory = await strapi.service('api::interview-usage.interview-usage').getUsageHistory(user.id);
      return { data: usageHistory };
    } catch (error) {
      console.error('Error getting usage history:', error);
      return ctx.internalServerError('Unable to get usage history');
    }
  },

  async getSubscriptionStatus(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const status = await strapi.service('api::interview-usage.interview-usage').getSubscriptionStatus(user.id);
      return { data: status };
    } catch (error) {
      console.error('Error getting subscription status:', error);
      return ctx.internalServerError('Unable to get subscription status');
    }
  },

  async updateSubscriptionStatus(ctx) {
    try {
      const user = ctx.state.user;
      
      if (!user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const validatedData = await strapi.service('api::interview-usage.interview-usage').validateSubscriptionUpdate(ctx.request.body.data);
      
      const status = await strapi.service('api::interview-usage.interview-usage').updateSubscriptionStatus(
        user.id, 
        validatedData.planName, 
        validatedData.subscriptionId
      );
      return { data: status };
    } catch (error) {
      console.error('Error updating subscription status:', error);
      if (error.name === 'ValidationError') {
        return ctx.badRequest(`Invalid data provided: ${error.message}`);
      }
      return ctx.internalServerError('Unable to update subscription status');
    }
  }
}));