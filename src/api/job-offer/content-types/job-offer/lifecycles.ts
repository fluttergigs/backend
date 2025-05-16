import {TwitterWrapperImpl} from "../../../../services/twitterApi";


export default {
  async afterCreate(event: any) {
    try {
      const {result} = event;

      const twitterService = new TwitterWrapperImpl();

      //wait 2 minutes before creating the tweet
      await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000));

      await twitterService.createTweet({
        text: twitterService.buildJobTweet(result)
      });
      //insert the job offer into the job queue to be sent to the users

      await strapi.service('api::job-email-queue.job-email-queue').addJobToQueue(result.id);
    } catch (err) {

      //@ts-ignore
      strapi.log.error('Failed to handle post job creation:', err);
    }
  }
};
