'use strict';

/**
 * job-offer controller
 */

import {factories} from "@strapi/strapi";


export default factories.createCoreController('api::job-offer.job-offer', ({strapi}) => ({

  async create(ctx) {
    await strapi.service('api::job-offer.job-offer').customCreateJobOffer(ctx);
  },

  async find(ctx) {
    // some logic here
    const { data, meta } = await super.find(ctx);
    // some more logic

    return { data, meta };
  },

  async findOne(ctx) {
    // some logic here
    const response = await super.findOne(ctx);
    // some more logic

    return response;
  },

  async update(ctx) {
    // some logic here
    const response = await super.update(ctx);
    // some more logic

    return response;
  },

  async delete(ctx) {
    // some logic here
    const response = await super.delete(ctx);
    // some more logic

    return response;
  }


}));
