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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * job-offer service
 */
const strapi_1 = require("@strapi/strapi");
const utils_1 = __importDefault(require("@strapi/utils"));
const index_1 = require("../validation/index");
const slugify_1 = __importDefault(require("slugify"));
const { ApplicationError, ValidationError } = utils_1.default.errors;
exports.default = strapi_1.factories.createCoreService('api::job-offer.job-offer', ({ strapi }) => ({
    /**
     * Create a new job offer
     * @param ctx
     * @returns {Promise<*>}
     */
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { company, title, } = yield index_1.JobOfferCreateSchema.validate(ctx.request.body.data, {
                    stripUnknown: true,
                    abortEarly: true,
                });
                const { username } = ctx.state.user;
                //get the company relation
                //count all the job offers for the company
                //if the count is greater than 0, then mark the hasFreeJobOffer as false
                const companyCheck = yield strapi.query("api::company.company").findOne({
                    where: { id: company },
                });
                if (!companyCheck) {
                    throw new ApplicationError("This company does not exist");
                }
                const jobOffersCount = yield strapi.query("api::job-offer.job-offer").count({
                    where: { company },
                });
                if (jobOffersCount > 0) {
                    yield strapi.query("api::company.company").update({
                        where: { id: company },
                        data: { hasFreeJobOffer: false },
                    });
                }
                return yield strapi.query("api::job-offer.job-offer").create({
                    data: Object.assign(Object.assign({}, ctx.request.body.data), { slug: (0, slugify_1.default)(title + companyCheck.name) }),
                });
            }
            catch (error) {
                console.log(error);
                if (error.name === "ValidationError")
                    throw new ValidationError("An Error occurred", error.errors);
                throw new ApplicationError("An Error occurred");
            }
        });
    },
}));
