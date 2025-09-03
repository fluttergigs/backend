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
      select: ['subscriptionStatus', 'interviewUsageCount', 'lastUsageReset']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    // Check if we need to reset usage (monthly reset)
    const now = new Date();
    const lastReset = user.lastUsageReset ? new Date(user.lastUsageReset) : new Date();
    const shouldReset = this.shouldResetUsage(lastReset, now);

    let currentUsage = user.interviewUsageCount || 0;
    
    if (shouldReset) {
      currentUsage = 0;
      await strapi.query("plugin::users-permissions.user").update({
        where: { id: userId },
        data: {
          interviewUsageCount: 0,
          lastUsageReset: now
        }
      });
    }

    const limits = this.getUsageLimits(user.subscriptionStatus);

    return {
      currentUsage,
      monthlyLimit: limits.monthlyLimit,
      subscriptionTier: user.subscriptionStatus || 'free',
      canUseInterview: currentUsage < limits.monthlyLimit,
      resetDate: this.getNextResetDate(shouldReset ? now : lastReset)
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

    const newUsageCount = currentUsage.currentUsage + 1;

    await strapi.query("plugin::users-permissions.user").update({
      where: { id: userId },
      data: {
        interviewUsageCount: newUsageCount
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

    // Reset usage limits when subscription changes
    const limits = this.getUsageLimits(subscriptionStatus);
    await strapi.query("plugin::users-permissions.user").update({
      where: { id: userId },
      data: {
        interviewUsageCount: 0,
        lastUsageReset: new Date()
      }
    });

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
  shouldResetUsage(lastReset: Date, now: Date): boolean {
    const lastResetMonth = lastReset.getMonth();
    const lastResetYear = lastReset.getFullYear();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return (currentYear > lastResetYear) || 
           (currentYear === lastResetYear && currentMonth > lastResetMonth);
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
  getNextResetDate(lastReset: Date): Date {
    const nextReset = new Date(lastReset);
    nextReset.setMonth(nextReset.getMonth() + 1);
    nextReset.setDate(1);
    nextReset.setHours(0, 0, 0, 0);
    return nextReset;
  }
}));