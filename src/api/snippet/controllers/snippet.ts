/**
 * snippet controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::snippet.snippet', ({ strapi }) => ({

  async create(ctx) {
    strapi.log.info(ctx.request.body);
    return await strapi.service('api::snippet.snippet').create(ctx.request.body);
  },

  async findByDocumentId(ctx) {
    return await strapi.service('api::snippet.snippet').findByDocumentId(ctx.params.documentId);
  },

  async findBySlug(ctx) {
    return await strapi.service('api::snippet.snippet').findBySlug(ctx.params.slug);
  },

  async update(ctx) {
    return await strapi.service('api::snippet.snippet').update(ctx.request.body);
  },

  async updateViews(ctx) {
    return await strapi.service('api::snippet.snippet').updateViews(ctx.params);
  },
}));
