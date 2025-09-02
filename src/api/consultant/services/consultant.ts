import { factories } from "@strapi/strapi";
import utils from "@strapi/utils";

const { ApplicationError } = utils.errors;

export default factories.createCoreService('api::consultant.consultant', ({ strapi }) => ({
  /**
   * Find consultants with access control based on user tier
   */
  async findWithAccess(userTier: string, query: any): Promise<any> {
    const isPaidUser = userTier === 'paid';

    // Build filters based on user access level
    const filters: any = {
      isAvailable: true
    };

    // Free users can only see free consultants
    if (!isPaidUser) {
      filters.isPaidConsultant = false;
    }

    // Merge with any additional filters from query
    const finalFilters = {
      ...filters,
      ...(query.filters || {})
    };

    //@ts-ignore
    const consultants = await strapi.documents("api::consultant.consultant").findMany({
      filters: finalFilters,
      sort: query.sort || { rating: 'desc', totalSessions: 'desc' },
      populate: query.populate || {},
      start: query.start || 0,
      limit: query.limit || 25
    });

    // Add access metadata to each consultant
    return consultants.map(consultant => ({
      ...consultant,
      accessLevel: this.getConsultantAccessLevel(consultant, isPaidUser),
      isAccessible: isPaidUser || !consultant.isPaidConsultant
    }));
  },

  /**
   * Find single consultant with access control
   */
  async findOneWithAccess(consultantId: string, userTier: string): Promise<any> {
    const isPaidUser = userTier === 'paid';

    //@ts-ignore
    const consultant = await strapi.documents("api::consultant.consultant").findFirst({
      filters: { 
        id: consultantId,
        isAvailable: true
      }
    });

    if (!consultant) {
      return null;
    }

    // Check if user has access to this consultant
    if (consultant.isPaidConsultant && !isPaidUser) {
      throw new ApplicationError("Access denied. This consultant requires a paid subscription.");
    }

    return {
      ...consultant,
      accessLevel: this.getConsultantAccessLevel(consultant, isPaidUser),
      isAccessible: true
    };
  },

  /**
   * Get consultant access level metadata
   */
  getConsultantAccessLevel(consultant: any, isPaidUser: boolean) {
    if (!consultant.isPaidConsultant) {
      return {
        tier: 'free',
        accessible: true,
        upgradeRequired: false
      };
    }

    return {
      tier: 'paid',
      accessible: isPaidUser,
      upgradeRequired: !isPaidUser,
      message: isPaidUser ? null : 'Upgrade to access premium consultants'
    };
  },

  /**
   * Get consultant statistics for admin/analytics
   */
  async getConsultantStats(): Promise<any> {
    const totalConsultants = await strapi.query("api::consultant.consultant").count();
    const freeConsultants = await strapi.query("api::consultant.consultant").count({
      where: { isPaidConsultant: false }
    });
    const paidConsultants = await strapi.query("api::consultant.consultant").count({
      where: { isPaidConsultant: true }
    });
    const availableConsultants = await strapi.query("api::consultant.consultant").count({
      where: { isAvailable: true }
    });

    return {
      total: totalConsultants,
      free: freeConsultants,
      paid: paidConsultants,
      available: availableConsultants,
      unavailable: totalConsultants - availableConsultants
    };
  }
}));