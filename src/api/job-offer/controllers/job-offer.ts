'use strict';

/**
 * job-offer controller
 */

import {factories} from "@strapi/strapi";


export default factories.createCoreController('api::job-offer.job-offer', ({strapi}) => ({

  async find(ctx) {
    // some logic here
    const {data, meta} = await super.find(ctx);
    // some more logic
    return {data, meta};
  },

  async findOne(ctx) {
    // some logic here
    // some more logic

    console.log('CONTEXT', ctx);

    let joboffer = await super.findOne(ctx);

    console.log('data', joboffer);

    return await super.findOne(ctx);
  },

  async findOneBySlug(ctx) {
    return await strapi.service('api::job-offer.job-offer').findOneBySlug(ctx.params.slug);
  },

  async create(ctx) {
    return await strapi.service('api::job-offer.job-offer').create(ctx.request.body.data);
  },

  async update(ctx) {
    // some logic here
    // some more logic

    return await super.update(ctx);
  },

  async delete(ctx) {
    // some logic here
    // some more logic

    return await super.delete(ctx);
  }

}));
