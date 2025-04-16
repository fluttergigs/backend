"use strict";
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
const strapi_1 = require("@strapi/strapi");
const slugify_1 = __importDefault(require("slugify"));
const index_1 = require("../validation/index");
const utils_1 = __importDefault(require("@strapi/utils"));
const { ApplicationError, ValidationError } = utils_1.default.errors;
exports.default = strapi_1.factories.createCoreService('api::company.company', ({ strapi }) => ({
    /**
     * Create a new company
     * @param ctx
     * @returns {Promise<*>}
     */
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, slug, name, } = yield index_1.CompanyCreateSchema.validate(ctx.request.body.data, // Validating the request body against BlogCreateSchema
                {
                    stripUnknown: true, // Removing unknown fields
                    abortEarly: true, // Returning all errors
                });
                //check if a company with the same email already exists
                const companyCheck = yield strapi.query("api::company.company").findOne({
                    where: { email },
                });
                const userCheck = yield strapi.query("plugin::users-permissions.user").findOne({
                    where: { email },
                });
                if (companyCheck || userCheck) {
                    throw new ApplicationError("This email is already in use");
                }
                const { username } = ctx.state.user;
                return yield strapi.query("api::company.company").create({
                    // Creating the blog post
                    data: Object.assign(Object.assign({}, ctx.request.body.data), { slug: (0, slugify_1.default)(username + name) }),
                });
            }
            catch (error) {
                console.log(error);
                if (error.name === "ValidationError")
                    throw new ValidationError("An Error occurred", error.errors); // Throwing validation error
                throw new ApplicationError("An Error occurred"); // Throwing validation error
            }
        });
    },
}));
