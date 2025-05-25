/**
 * snippet controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::snippet.snippet', ({ strapi }) => ({

  async create(ctx) {

    strapi.log.info(ctx.request.body);
     return await strapi.service('api::snippet.snippet').create(ctx.request.body);
  },
}));
