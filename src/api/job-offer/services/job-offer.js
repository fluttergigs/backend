'use strict';

const {AxiosService} = require("../../../core/services/axiosService");
/**
 * job-offer service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-offer.job-offer', ({strapi}) => ({

  async scrape(ctx) {
    try {
      // Your code here

      console.log('HANDLE SCRAPING HERE');

      return []
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred");
    }
  }
}));
