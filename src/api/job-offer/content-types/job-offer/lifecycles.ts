import {TwitterWrapperImpl} from "../../../../services/twitterApi";


export default {
  async afterCreate(event: any) {
    try {
      const {result} = event;

      const twitterService = new TwitterWrapperImpl();

      await twitterService.createTweet({
        text: twitterService.buildJobTweet(result)
      });

    } catch (err) {

      //@ts-ignore
      strapi.log.error('Failed to send new posted job tweet:', err);
    }
  }
};
