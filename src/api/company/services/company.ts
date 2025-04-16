import {factories} from "@strapi/strapi";
import slugify from "slugify";
import {CompanyCreateSchema, CompanyUpdateSchema} from "../validation/index"
import utils from "@strapi/utils";
import {customAlphabet} from "nanoid";

const {ApplicationError, ValidationError} = utils.errors;

export default factories.createCoreService('api::company.company', ({strapi}) => ({
  /**
   * Create a new company
   * @returns {Promise<*>}
   * @param data
   */
  async create(data): Promise<any> {

    try {
      const {email, slug, name,} = await CompanyCreateSchema.validate(
        data, // Validating the request body against BlogCreateSchema
        {
          stripUnknown: true, // Removing unknown fields
          abortEarly: true, // Returning all errors
        }
      );

      //check if a company with the same email already exists
      const companyCheck = await strapi.query("api::company.company").findOne({
        where: {email},
      });

      const userCheck = await strapi.query("plugin::users-permissions.user").findOne({
        where: {email},
      });

      if (companyCheck || userCheck) {
        throw new ApplicationError("This email is already in use");
      }

      const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);

      //@ts-ignore
      return await strapi.documents("api::company.company").create({
        data: {
          ...data,
          slug: slugify(`${name}-${nanoid()}`, {lower: true}),
        },
        status: 'published'
      });
    } catch (error) {

      console.log(error);
      if (error.name === "ValidationError")
        throw new ValidationError("An Error occurred", error.errors); // Throwing validation error
      throw new ApplicationError("An Error occurred"); // Throwing validation error
    }
  },


  /**
   * Update a company
   * @returns {Promise<*>}
   * @param payload
   */
  async update(payload): Promise<any> {
    const {user, data, params} = payload

    try {
      await CompanyUpdateSchema.validate(
        data, // Validating the request body against BlogCreateSchema
        {
          stripUnknown: true, // Removing unknown fields
          abortEarly: true, // Returning all errors
        }
      );

      //@ts-ignore
      const company = await strapi.documents("api::company.company").findFirst({
        filters: {
          id: <number>params.id,
        },
        populate: ["user"],
      });

      if (company.user.id !== user.id) {
        throw new ApplicationError("You are not the owner of this company");
      }

      //@ts-ignore
      return await strapi.documents("api::company.company").update({
        documentId: company.documentId,
        data,
      });
    } catch (error) {

      console.log(error);
      if (error.name === "ValidationError")
        throw new ValidationError("An Error occurred", error.errors); // Throwing validation error
      throw new ApplicationError("An Error occurred"); // Throwing validation error
    }
  }

}));
