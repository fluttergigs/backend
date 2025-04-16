'use strict';

/**
 * company controller
 */

import {factories} from "@strapi/strapi";


export default factories.createCoreController('api::company.company', ({strapi}) => ({
  async find(ctx) {
    const {data, meta} = await super.find(ctx);
    return {data, meta};
  },

  async findOne(ctx) {
    return await super.findOne(ctx);
  },
  async create(ctx) {
    return await strapi.service('api::company.company').create(ctx.request.body.data);
  },
  async update(ctx) {
    return await strapi.service('api::company.company').update({
      data: ctx.request.body.data,
      user: ctx.state.user,
      params: ctx.params
    });
  },

  async delete(ctx) {
    return await super.delete(ctx);
  }
}));
