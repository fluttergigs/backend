'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * job-offer controller
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::job-offer.job-offer', ({ strapi }) => ({
    find(ctx) {
        const _super = Object.create(null, {
            find: { get: () => super.find }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // some logic here
            const { data, meta } = yield _super.find.call(this, ctx);
            // some more logic
            return { data, meta };
        });
    },
    findOne(ctx) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // some logic here
            const response = yield _super.findOne.call(this, ctx);
            // some more logic
            return response;
        });
    },
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield strapi.service('api::job-offer.job-offer').create(ctx);
        });
    },
    update(ctx) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // some logic here
            const response = yield _super.update.call(this, ctx);
            // some more logic
            return response;
        });
    },
    delete(ctx) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // some logic here
            const response = yield _super.delete.call(this, ctx);
            // some more logic
            return response;
        });
    }
}));
