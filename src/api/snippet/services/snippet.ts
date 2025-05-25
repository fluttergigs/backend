/**
 * snippet service
 */

import {factories} from '@strapi/strapi';

import utils from "@strapi/utils";

const {ApplicationError} = utils.errors;

export default factories.createCoreService('api::snippet.snippet', ({strapi}) => ({
  /**
   * Create a new snippet
   * @returns {Promise<*>}
   * @param payload
   */
  async create(payload): Promise<any> {
    try {
      const {
        tags,
        title,
        description,
        code
      } = payload.data;

      strapi.log.info(`Creating snippet :${tags}`);

      //check if the tags exist using document service
      const tagsCheck = await strapi.db.query("api::tag.tag").findMany({
        where: {
          slug: {
            $in: tags,
          }
        }
      });

      console.log('tagsCheck', tagsCheck)

      if (tagsCheck.length !== tags.length) {
        throw new ApplicationError("Some of the tags do not exist");
      }

      const snippet = await strapi.db.query("api::snippet.snippet").create({
        data: {
          title,
          description,
          code,
          tags: tagsCheck.map(tag => tag.id),
        },
      })

      strapi.log.debug('Snippet created:', snippet);

      return snippet;

    } catch (e) {
      // @ts-ignore
      strapi.log.error('Failed to create snippet:', e);
      throw new ApplicationError("Failed to create snippet");
    }

  },
}));
