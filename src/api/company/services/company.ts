import {factories} from "@strapi/strapi";
import slugify from "slugify";
import {CompanyCreateSchema} from "../validation/index";
import utils from "@strapi/utils";

const {ApplicationError, ValidationError} = utils.errors;

export default factories.createCoreService('api::company.company', ({strapi}) => ({
  /**
   * Create a new company
   * @param ctx
   * @returns {Promise<*>}
   */
  async customCreateCompany(ctx): Promise<any> {

    try {
      const {email, slug, name,} = await CompanyCreateSchema.validate(
        ctx.request.body.data, // Validating the request body against BlogCreateSchema
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

      const {username} = ctx.state.user;

      return await strapi.query("api::company.company").create({
        // Creating the blog post
        data: {
          ...ctx.request.body.data,
          slug: slugify(username + name)
        },
      });
    } catch (error) {

      console.log(error);
      if (error.name === "ValidationError")
        throw new ValidationError("An Error occurred", error.errors); // Throwing validation error
      throw new ApplicationError("An Error occurred"); // Throwing validation error
    }
  },

}));
