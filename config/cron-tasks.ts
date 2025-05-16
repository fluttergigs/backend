export default {
  'jobEmailQueue:process-instant': {
    task: async ({strapi}) => {
      await strapi.service('api::job-email-queue.job-email-queue').processEmailQueues();
    },
    options: {
      rule: '*/10 * * * *', // every 5 minutes
      //once a day at
    },
  },
  'jobEmailQueue:process-daily': {
    task: async ({strapi}) => {
      // await strapi.service('api::job-email-queue.job-email-cron').processPendingEmails('daily');
    },
    options: {
      rule: '0 8 * * *', // every day at 08:00 AM server time
    },
  },
  'jobEmailQueue:process-weekly': {
    task: async ({strapi}) => {
      // await strapi.service('api::job-email-queue.job-email-cron').processPendingEmails('weekly');
    },
    options: {
      rule: '0 9 * * 1', // every Monday at 09:00 AM server time
    },
  },
}
