import {ResendMailService} from "../../../../services/emails/resendMailService";

export default {
  async afterCreate(event: any) {
    try {
      const {result} = event;
      const mailService = new ResendMailService();

      await mailService.saveContact({
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        audienceId: process.env.GENERAL_RESEND_AUDIENCE_ID,
      })
    } catch (err) {

      //@ts-ignore
      strapi.log.error('Failed to save contact to Resend:', err);
    }
  },
};
