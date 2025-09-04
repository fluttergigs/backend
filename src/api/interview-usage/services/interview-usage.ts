import { factories } from "@strapi/strapi";
import utils from "@strapi/utils";
import { SubscriptionUpdateSchema } from "../validation";

const { ApplicationError, ValidationError } = utils.errors;

export default factories.createCoreService('api::interview-usage.interview-usage', ({ strapi }) => ({
  /**
   * Get current interview usage for a user
   */
  async getCurrentUsage(userId: number): Promise<any> {
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: userId },
      select: ['subscriptionStatus']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    // Get current month usage from interview-usage records
    const currentMonth = this.getCurrentMonthString();
    let currentUsageRecord = await strapi.query('api::interview-usage.interview-usage').findOne({
      where: {
        userId: userId,
        month: currentMonth
      }
    });

    // If no record exists for current month, create it
    if (!currentUsageRecord) {
      currentUsageRecord = await strapi.query('api::interview-usage.interview-usage').create({
        data: {
          userId: userId,
          month: currentMonth,
          count: 0,
          sessions: []
        }
      });
    }

    const limits = this.getUsageLimits(user.subscriptionStatus);
    const currentUsage = currentUsageRecord.count || 0;

    return {
      currentUsage,
      monthlyLimit: limits.monthlyLimit,
      subscriptionTier: user.subscriptionStatus || 'free',
      canUseInterview: currentUsage < limits.monthlyLimit,
      resetDate: this.getNextResetDate()
    };
  },

  /**
   * Increment interview usage for a user
   */
  async incrementUsage(userId: number): Promise<any> {
    const currentUsage = await this.getCurrentUsage(userId);
    
    if (!currentUsage.canUseInterview) {
      throw new ApplicationError("Monthly limit exceeded");
    }

    const currentMonth = this.getCurrentMonthString();
    const newUsageCount = currentUsage.currentUsage + 1;

    // Update the current month's usage record
    await strapi.query('api::interview-usage.interview-usage').update({
      where: {
        userId: userId,
        month: currentMonth
      },
      data: {
        count: newUsageCount
      }
    });

    return {
      ...currentUsage,
      currentUsage: newUsageCount,
      canUseInterview: newUsageCount < currentUsage.monthlyLimit
    };
  },

  /**
   * Get subscription status for a user
   */
  async getSubscriptionStatus(userId: number): Promise<any> {
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: userId },
      select: ['subscriptionStatus', 'subscriptionId']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    return {
      subscriptionStatus: user.subscriptionStatus || 'free',
      subscriptionId: user.subscriptionId,
      isPaid: user.subscriptionStatus === 'paid'
    };
  },

  /**
   * Update subscription status for a user
   */
  async updateSubscriptionStatus(userId: number, subscriptionStatus: string, subscriptionId?: string): Promise<any> {
    const updateData: any = {
      subscriptionStatus
    };

    if (subscriptionId) {
      updateData.subscriptionId = subscriptionId;
    }

    await strapi.query("plugin::users-permissions.user").update({
      where: { id: userId },
      data: updateData
    });

    // Reset usage when subscription changes by creating/resetting current month record
    const currentMonth = this.getCurrentMonthString();
    const existingRecord = await strapi.query('api::interview-usage.interview-usage').findOne({
      where: {
        userId: userId,
        month: currentMonth
      }
    });

    if (existingRecord) {
      await strapi.query('api::interview-usage.interview-usage').update({
        where: {
          userId: userId,
          month: currentMonth
        },
        data: {
          count: 0,
          sessions: []
        }
      });
    } else {
      await strapi.query('api::interview-usage.interview-usage').create({
        data: {
          userId: userId,
          month: currentMonth,
          count: 0,
          sessions: []
        }
      });
    }

    const limits = this.getUsageLimits(subscriptionStatus);

    return {
      subscriptionStatus,
      subscriptionId,
      isPaid: subscriptionStatus === 'paid',
      newLimits: limits
    };
  },

  /**
   * Get usage limits based on subscription tier
   */
  getUsageLimits(subscriptionStatus: string) {
    const limits = {
      free: { monthlyLimit: 3 },
      paid: { monthlyLimit: 20 }
    };

    return limits[subscriptionStatus] || limits.free;
  },

  /**
   * Check if usage should be reset (monthly)
   */
  getCurrentMonthString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  },

  /**
   * Validate subscription update data
   */
  async validateSubscriptionUpdate(data: any): Promise<any> {
    try {
      return await SubscriptionUpdateSchema.validate(data, {
        stripUnknown: true,
        abortEarly: false
      });
    } catch (error) {
      throw new ValidationError("Validation failed", error.errors);
    }
  },

  /**
   * Get interview usage history for a user (last 6 months)
   */
  async getUsageHistory(userId: number): Promise<any[]> {
    // Get user subscription status to determine the limit
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: userId },
      select: ['subscriptionStatus']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    const limits = this.getUsageLimits(user.subscriptionStatus);
    
    // Query the interview-usage records for this user, last 6 months
    const usageRecords = await strapi.query('api::interview-usage.interview-usage').findMany({
      where: {
        userId: userId
      },
      orderBy: { month: 'desc' },
      limit: 6
    });

    return usageRecords.map(usage => ({
      month: usage.month,
      count: usage.count,
      limit: limits.monthlyLimit,
      sessions: usage.sessions?.length || 0,
    }));
  },

  /**
   * Get next reset date (next month)
   */
  getNextResetDate(): Date {
    const now = new Date();
    const nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    nextReset.setHours(0, 0, 0, 0);
    return nextReset;
  }
}));