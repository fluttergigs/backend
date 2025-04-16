'use strict';

/**
 * bookmarked-joboffer service
 */

import {factories} from "@strapi/strapi";

export default factories.createCoreService('api::bookmarked-joboffer.bookmarked-joboffer', ({strapi}) => {
  return ({

    /**
     * Create a new bookmarked job offer
     * @param payload
     * @returns {Promise<*>}
     */
    async create(payload): Promise<any> {
      const {user, data} = payload

      // Check if the user is authenticated
      if (!user) {
        throw new Error("You must be logged in to bookmark a job offer.");
      }

      //@ts-ignore
      return await strapi.documents("api::bookmarked-joboffer.bookmarked-joboffer").create({
        data: {
          user: user.id,
          jobOffer: data.jobOffer,
        },
        status: 'published',
      });
    },

    /**
     * Find all bookmarked job offers for a user
     * @param payload
     * @returns {Promise<*>}
     */
    async find(payload): Promise<any> {
      const {user} = payload


      // Check if the user is authenticated
      if (!user) {
        throw new Error("You must be logged in to view your bookmarks.");
      }

      const bookmarkedJobOffers = await strapi.db.query("api::bookmarked-joboffer.bookmarked-joboffer").findMany({
        where: {
          user: user.id,
        },
        populate: {
          jobOffer: {
            populate: true,
          },
          user: {
            populate: true,
          }
        }
      })

      let data = bookmarkedJobOffers.map((bookmarkedJobOffer) => ({
        ...bookmarkedJobOffer.jobOffer,
        bookmarkedJob: bookmarkedJobOffer.id,
      }))

      return {data}
    },

    /**
     * Delete a specific bookmarked job offer
     * @param payload
     */
    async delete(payload): Promise<any> {
      const {user, params} = payload


      // Check if the user is authenticated
      if (!user) {
        throw new Error("You must be logged in to delete a bookmark.");
      }

      let all = await strapi.db.query("api::bookmarked-joboffer.bookmarked-joboffer").findMany({
        where: {
          id: <number>params.id,
        },
      })

      console.log('all', all)

      return await strapi.db.query("api::bookmarked-joboffer.bookmarked-joboffer").delete({
        where: {
          id: <number>params.id,
        },
      })
    }
  });
})



