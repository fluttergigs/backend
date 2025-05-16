/**
 * job-email-queue service
 */
import {ResendMailService} from "../../../services/emails/resendMailService";
import {factories} from '@strapi/strapi';
import getInstantJobOffer from "../../../services/emails/templates/instantJobOffer"
import {JobFormatter} from "../../../../helpers/JobFormatter";

// const

export enum JobQueueEnum {
    pending = 'pending',
    sent = 'sent',
    failed = 'failed',
}

export enum JobNotificationPreferenceEnum {
    instant = 'instant',
    daily = 'daily',
    weekly = 'weekly'
}

export type JobQueueParams = {
    status: JobQueueEnum,
    notificationType: JobNotificationPreferenceEnum
}

export default factories.createCoreService('api::job-email-queue.job-email-queue', ({strapi}) => ({

    async processEmailQueues(params: JobQueueParams = {
        status: JobQueueEnum.pending,
        notificationType: JobNotificationPreferenceEnum.instant
    }) {

        strapi.log.info(`🔔 Starting ${params.notificationType} JobEmailQueue processing...`);


        const emailQueue = await strapi.db.query('api::job-email-queue.job-email-queue').findMany({
            where: {
                state: params.status,
                notificationType: params.notificationType,
            },
            populate: ['user', 'jobOffer'],
        });

        if (!emailQueue.length) {
            strapi.log.info('No pending job email notifications to process.');
            return;
        }

        if (params.notificationType == JobNotificationPreferenceEnum.instant) {
            await this.processIndividualEmails(emailQueue)
        }
    },


    async processIndividualEmails(pendingQueue: any[]) {

        const emailService = new ResendMailService()
        for (const queueItem of pendingQueue) {
            const {user, jobOffer, id} = queueItem;

            try {
                if (!user?.email || !jobOffer?.title) {
                    throw new Error('Missing user email or job data');
                }

                // Compose email
                const subject = `🚀 New Flutter Opportunity: ${jobOffer.title} at ${jobOffer.companyName}`;

                await emailService.sendEmail({
                    to: [user.email],
                    subject,
                    html: getInstantJobOffer({
                        username: user.username,
                        jobSlug: jobOffer.slug,
                        companyName: jobOffer.companyName,
                        jobTitle: jobOffer.title,
                        location: JobFormatter.formatWorkPermits(jobOffer.workPermits),
                        remoteFriendly: jobOffer.remoteOptions.includes('fullRemote') ? 'Yes' : 'No'
                    })
                });

                // Update queue status

                await strapi.db.query('api::job-email-queue.job-email-queue').update({
                    where: {id},
                    data: {state: 'sent'},
                })

                strapi.log.info(`✅ Email sent to ${user.email}`);
            } catch (error) {
                strapi.log.error(`❌ Failed to send email to user ${user?.email}:`, error);

                await strapi.db.query('api::job-email-queue.job-email-queue').update({
                    where: {id},
                    data: {state: 'failed'},
                })
            }
        }
    },

    async addJobToQueue(jobId: number) {
        if (!jobId) {
            throw new Error('Job ID is required to generate JobEmailQueue records.');
        }

        const users = await strapi.documents("plugin::users-permissions.user").findMany({
            filters: {
                jobNotificationPreference: {
                    $in: [
                        JobNotificationPreferenceEnum.instant,
                        JobNotificationPreferenceEnum.daily,
                        JobNotificationPreferenceEnum.weekly,
                    ],
                }
            },
            fields: ['id'],
        }) || await strapi.documents("plugin::users-permissions.user").findMany({fields: ['id'],});

        /* const users = await strapi.documents("plugin::users-permissions.user").findMany({
             filters: {
                 jobNotificationPreference: {
                     $in: [
                         JobNotificationPreferenceEnum.instant,
                         JobNotificationPreferenceEnum.daily,
                         JobNotificationPreferenceEnum.weekly,
                     ],
                 }
             },
             fields: ['id'],
         })*/

        if (!users.length) {
            strapi.log.info('No users eligible for job email notifications.');
            return;
        }


        // Créer les entrées individuellement pour gérer correctement les relations
        for (const user of users) {
            await strapi.db.query('api::job-email-queue.job-email-queue').create({
                data: {
                    user: user.id,
                    jobOffer: jobId,
                    state: JobQueueEnum.pending,
                    notificationType: user.jobNotificationPreference || JobNotificationPreferenceEnum.instant,
                }
            });
        }

        /* const queueEntries = users.map((user) => ({
           user: user.documentId,
           jobOffer: jobId,
           state: 'pending',
           notificationType: user.jobNotificationPreference || JobNotificationPreferenceEnum.instant,
         }));

         // Insert in batches if needed
         const chunkSize = 500;
         for (let i = 0; i < queueEntries.length; i += chunkSize) {
           const chunk = queueEntries.slice(i, i + chunkSize);

           await strapi.db.query('api::job-email-queue.job-email-queue').createMany({data: chunk,})


           //Update job email queue with the relations
         }*/

        strapi.log.info(`Generated ${users.length} JobEmailQueue records for job ID ${jobId}.`);
    }
}));
