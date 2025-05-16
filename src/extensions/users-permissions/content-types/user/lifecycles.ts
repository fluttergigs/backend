import {ResendMailService} from "../../../../services/emails/resendMailService";
import getWelcomeEmailTemplate from "../../../../services/emails/templates/welcome";

export default {
  async afterCreate(event: any) {
    try {
      const {result} = event;
      const mailService = new ResendMailService();
      await Promise.all(
        [
          mailService.saveContact({
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            audienceId: process.env.GENERAL_RESEND_AUDIENCE_ID,
          }),

          await mailService.sendEmail({
            to: result.email,
            subject: 'Advance your career with FlutterGigs - Welcome',
            html: getWelcomeEmailTemplate(),
          })
        ]
      )
    } catch (err) {
      //@ts-ignore
      strapi.log.error(`Failed to handle afterCreate for User: ${event.result?.email ?? ''}`, err);
    }
  },
};
