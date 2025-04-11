'use strict';

/**
 * job-offer service
 */
import {factories} from "@strapi/strapi";
import utils from "@strapi/utils";
import {JobOfferCreateSchema} from "../validation/index";
import slugify from "slugify";

const {ApplicationError, ValidationError} = utils.errors;

export default factories.createCoreService('api::job-offer.job-offer', ({strapi}) => ({

  /**
   * Create a new job offer
   * @param ctx
   * @returns {Promise<*>}
   */
  async customCreateJobOffer(ctx) {
    try {
      const {
        company,
        title,
      } = await JobOfferCreateSchema.validate(
        ctx.request.body.data,
        {
          stripUnknown: true,
          abortEarly: true,
        }
      );

      const {username} = ctx.state.user;

      //get the company relation
      //count all the job offers for the company
      //if the count is greater than 0, then mark the hasFreeJobOffer as false

      const companyCheck = await strapi.query("api::company.company").findOne({
        where: {id: company},
      });

      if (!companyCheck) {
        throw new ApplicationError("This company does not exist");
      }

      const jobOffersCount = await strapi.query("api::job-offer.job-offer").count({
        where: {company},
      });

      if (jobOffersCount > 0) {
        await strapi.query("api::company.company").update({
          where: {id: company},
          data: {hasFreeJobOffer: false},
        });
      }

      return await strapi.query("api::job-offer.job-offer").create({
        data: {
          ...ctx.request.body.data,
          slug: slugify(title + companyCheck.name),
        },
      });
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError")
        throw new ValidationError("An Error occurred", error.errors);
      throw new ApplicationError("An Error occurred");
    }
  },

}));
