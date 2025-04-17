/**
 * job-offer service
 */
import {factories} from "@strapi/strapi";
import utils from "@strapi/utils";
import {JobOfferCreateSchema} from "../validation";
import slugify from "slugify";
import {customAlphabet} from "nanoid";


const {ApplicationError, ValidationError} = utils.errors;

export default factories.createCoreService('api::job-offer.job-offer', ({strapi}) => ({

  /**
   * Create a new job offer
   * @returns {Promise<*>}
   * @param data
   */
  async create(data): Promise<any> {
    try {
      const {
        company,
        title,
      } = await JobOfferCreateSchema.validate(
        data,
        {
          stripUnknown: true,
          abortEarly: true,
        }
      );

      //get the company relation
      //count all the job offers for the company
      //if the count is greater than 0, then mark the hasFreeJobOffer as false

      const companyCheck = await strapi.db.query("api::company.company").findOne({
        where: {id: company},
      });

      if (!companyCheck) {
        throw new ApplicationError("This company does not exist");
      }

      const jobOffersCount = await strapi.db.query("api::job-offer.job-offer").count({
        where: {company},
      });

      if (jobOffersCount > 0) {
        await strapi.db.query("api::company.company").update({
          where: {id: company},
          data: {hasFreeJobPosts: false},
        });
      }

      const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);

      // @ts-ignore
      return await strapi.documents("api::job-offer.job-offer").create({
        data: {
          data,
          slug: slugify(`${title}-at-${companyCheck.name}-${nanoid()}`, {lower: true,}),
        },
        status: 'published',
      });
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError")
        throw new ValidationError("An Error occurred", error.errors);
      throw new ApplicationError("An Error occurred");
    }
  },

  /**
   * Find a job offer by slug
   * @param ctx
   * @returns {Promise<*>}
   */
  async findOneBySlug(slug) {

    // @ts-ignore
    const jobOffers = await strapi.documents("api::job-offer.job-offer").findMany({
      where: {slug},
      populate: "*",
    });

    if (!jobOffers || jobOffers.length === 0) {
      throw new ApplicationError("This job offer does not exist");
    }

    return {data: jobOffers[0]};
  }
}));
