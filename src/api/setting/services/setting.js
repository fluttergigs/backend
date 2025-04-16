'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * setting service
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService('api::setting.setting');
