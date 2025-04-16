'use strict';

/**
 * bookmarked-joboffer controller
 */

import {factories} from "@strapi/strapi";

export default factories.createCoreController('api::bookmarked-joboffer.bookmarked-joboffer', ({strapi}) => ({

  /**
   * Find all bookmarked job offers for a user
   * @param ctx
   * @returns {Promise<*>}
   */
  async find(ctx) {
    return await strapi.service('api::bookmarked-joboffer.bookmarked-joboffer').find({user: ctx.state.user});
  },

  /**
   * Find a bookmarked job offer by ID
   * @param ctx
   */
  async findOne(ctx) {
    return await super.findOne(ctx);
  },


  /**
   * Create a new bookmarked job offer
   * @param ctx
   * @returns {Promise<*>}
   */
  async create(ctx): Promise<any> {

    return await strapi.service('api::bookmarked-joboffer.bookmarked-joboffer').create({
      user: ctx.state.user,
      data: ctx.request.body.data
    });
  },

  /**
   * Delete a bookmarked job offer
   * @param ctx
   */
  async delete(ctx): Promise<any> {

    return await strapi.service('api::bookmarked-joboffer.bookmarked-joboffer').delete({
      params: ctx.params,
      user: ctx.state.user
    });
  },


  /**
   *  Update a bookmarked job offer
   * @param ctx
   */
  async update(ctx) {
    return await super.update(ctx);
  },

}));
