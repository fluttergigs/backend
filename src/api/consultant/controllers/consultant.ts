'use strict';

/**
 * consultant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController('api::consultant.consultant', ({ strapi }) => ({
  async find(ctx) {
    try {
      const user = ctx.state.user;
      
      // Get user's subscription status to determine access level
      let userTier = 'free';
      if (user) {
        const userInfo = await strapi.query("plugin::users-permissions.user").findOne({
          where: { id: user.id },
          select: ['subscriptionStatus']
        });
        userTier = userInfo?.subscriptionStatus || 'free';
      }

      const consultants = await strapi.service('api::consultant.consultant').findWithAccess(userTier, ctx.query);
      return { data: consultants };
    } catch (error) {
      console.error('Error fetching consultants:', error);
      return ctx.internalServerError('Unable to fetch consultants');
    }
  },

  async findOne(ctx) {
    try {
      const user = ctx.state.user;
      
      // Get user's subscription status to determine access level
      let userTier = 'free';
      if (user) {
        const userInfo = await strapi.query("plugin::users-permissions.user").findOne({
          where: { id: user.id },
          select: ['subscriptionStatus']
        });
        userTier = userInfo?.subscriptionStatus || 'free';
      }

      const consultant = await strapi.service('api::consultant.consultant').findOneWithAccess(ctx.params.id, userTier);
      
      if (!consultant) {
        return ctx.notFound('Consultant not found or access denied');
      }

      return { data: consultant };
    } catch (error) {
      console.error('Error fetching consultant:', error);
      return ctx.internalServerError('Unable to fetch consultant');
    }
  },

  async create(ctx) {
    return await super.create(ctx);
  },

  async update(ctx) {
    return await super.update(ctx);
  },

  async delete(ctx) {
    return await super.delete(ctx);
  }
}));