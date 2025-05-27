/**
 * snippet service
 */

import { factories } from '@strapi/strapi';

import utils from "@strapi/utils";

const { ApplicationError } = utils.errors;

export default factories.createCoreService('api::snippet.snippet', ({ strapi }) => ({
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

      strapi.log.info(`Creating snippet with tags: ${tags}`);

      //check if the tags exist using document service
      const tagsCheck = await strapi.db.query("api::tag.tag").findMany({
        where: {
          slug: {
            $in: tags,
          }
        }
      });

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

      return { data: snippet };
    } catch (e) {
      // @ts-ignore
      strapi.log.error('Failed to create snippet:', e);
      throw new ApplicationError("Failed to create snippet");
    }
  },


  async findByDocumentId(documentId: string): Promise<any> {
    strapi.log.info(`Finding snippet by documentId: ${documentId}`);
    try {
      const snippet = await strapi.db.query("api::snippet.snippet").findOne({
        where: { documentId },
        populate: ['tags', 'user'],
      });

      if (!snippet) {
        throw new ApplicationError("Snippet not found");
      }

      strapi.log.info('Snippet found: : ' + JSON.stringify(snippet));

      return { data: snippet };
    } catch (e) {
      // @ts-ignore
      strapi.log.error('Failed to find snippet by documentId:', e);
      throw new ApplicationError("Failed to find snippet");
    }

  },

  async findBySlug(slug: string): Promise<any> {
    try {
      const snippet = await strapi.db.query("api::snippet.snippet").findOne({
        where: { slug },
        populate: ['tags', 'user'],
      });

      if (!snippet) {
        throw new ApplicationError("Snippet not found");
      }

      return { data: snippet };
    } catch (e) {
      // @ts-ignore
      strapi.log.error('Failed to find snippet by slug:', e);
      throw new ApplicationError("Failed to find snippet");
    }
  },


  // async findBySlug(slug: string): Promise<any> 
}));
