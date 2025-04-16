'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * setting router
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::setting.setting');
