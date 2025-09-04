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
      populate: ['plan']
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

    const plan = user.plan || await this.getDefaultPlan();
    const currentUsage = currentUsageRecord.count || 0;

    return {
      currentUsage,
      monthlyLimit: plan.interviewsPerMonth,
      subscriptionTier: plan.name,
      planName: plan.displayName,
      canUseInterview: currentUsage < plan.interviewsPerMonth,
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
      populate: ['plan']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    const plan = user.plan || await this.getDefaultPlan();

    return {
      subscriptionStatus: plan.name,
      subscriptionId: user.subscriptionId,
      isPaid: plan.name !== 'free',
      plan: {
        name: plan.name,
        displayName: plan.displayName,
        interviewsPerMonth: plan.interviewsPerMonth,
        features: plan.features
      }
    };
  },

  /**
   * Update subscription status for a user
   */
  async updateSubscriptionStatus(userId: number, planName: string, subscriptionId?: string): Promise<any> {
    // Find the plan by name
    const plan = await strapi.query('api::plan.plan').findOne({
      where: { name: planName, isActive: true }
    });

    if (!plan) {
      throw new ApplicationError(`Plan '${planName}' not found or inactive`);
    }

    const updateData: any = {
      plan: plan.id
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

    return {
      subscriptionStatus: plan.name,
      subscriptionId,
      isPaid: plan.name !== 'free',
      plan: {
        name: plan.name,
        displayName: plan.displayName,
        interviewsPerMonth: plan.interviewsPerMonth,
        features: plan.features
      }
    };
  },

  /**
   * Get the default plan (free plan)
   */
  async getDefaultPlan(): Promise<any> {
    const freePlan = await strapi.query('api::plan.plan').findOne({
      where: { name: 'free', isActive: true }
    });

    if (!freePlan) {
      throw new ApplicationError("Default free plan not found");
    }

    return freePlan;
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
    // Get user with plan information
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: userId },
      populate: ['plan']
    });

    if (!user) {
      throw new ApplicationError("User not found");
    }

    const plan = user.plan || await this.getDefaultPlan();
    
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
      limit: plan.interviewsPerMonth,
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