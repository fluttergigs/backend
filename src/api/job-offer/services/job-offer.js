'use strict';

/**
 * job-offer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-offer.job-offer');
