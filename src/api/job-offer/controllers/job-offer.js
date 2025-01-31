'use strict';

/**
 * job-offer controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job-offer.job-offer', ({strapi}) => ({

  async scrape(ctx) {
    try {
      // Your code here

      return await strapi.service('api::job-offer.job-offer').scrape(ctx)

    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred");
    }
  }
}));
