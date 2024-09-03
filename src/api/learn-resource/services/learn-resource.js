'use strict';

/**
 * learn-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::learn-resource.learn-resource');
