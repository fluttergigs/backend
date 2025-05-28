import { Broadcast, Contact, Mail, MailService, SendBroadcastOptions } from "./mailService";

/**
 * ResendMailService is a concrete implementation of the MailService interface.
 * It uses the Resend API to send emails and save contacts.
 */
import { Resend, SendBroadcastResponse } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');


export class ResendMailService implements MailService {

  async createBroadcast<T extends Broadcast>(data: T): Promise<SendBroadcastResponse> {
    try {
      strapi.log.info(`Creating broadcast with subject: ${data.subject} for audience ${data.audienceId}`);
      return await resend.broadcasts.create({
        from: data.from || 'FlutterGigs <team@fluttergigs.com>',
        audienceId: data.audienceId,
        html: data.html,
        subject: data.subject,
        name: data.name || data.subject,
      });
    } catch (e) {
      strapi.log.error(`Error creating broadcast`, e);
    }
  }

  async sendBroadcast(data: SendBroadcastOptions<string, string>): Promise<void> {
    try {
      strapi.log.info(`Sending broadcast ${data.id} in ${data.scheduledAt}`);
      await resend.broadcasts.send(data.id, {
        scheduledAt: data.scheduledAt,
      })
    } catch (e) {
      strapi.log.error(`Error sending broadcast`, e);
    }
  }

  async dispatchBroadcast<T extends Broadcast, U extends SendBroadcastOptions<string, string>>(broadcast: T, sendOptions: U) {
    const { data } = await this.createBroadcast(broadcast)

    sendOptions.id = data.id;

    await this.sendBroadcast(sendOptions)
  }

  async saveContact<T extends Contact>(data: T): Promise<void> {
    try {
      await resend.contacts.create({
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        unsubscribed: false,
        audienceId: data.audienceId
      });

      strapi.log.info(`Saved contact ${data.email}`);
    } catch (e) {
      strapi.log.error(`Error saving contact`, e);
    }
  }

  async sendEmail<T extends Mail>(data: T): Promise<void> {
    try {
      await resend.emails.send({
        from: data.from || 'FlutterGigs <team@fluttergigs.com>',
        to: data.to,
        subject: data.subject,
        html: data.text || data.html,
      });

      strapi.log.info(`Sent email with subject ${data.subject} to ${data.to}`);

    } catch (e) {
      strapi.log.error(`Error sending email with subject: ${data.subject}`, e);
    }
  }

  async sendBulkEmail<T extends Mail>(data: T[]): Promise<void> {
    strapi.log.info("Sending bookmark email using Resend API", data);

    const payload = data.map(item => ({
      from: item.from || 'FlutterGigs <team@fluttergigs.com>',
      to: item.to,
      subject: item.subject,
      html: item.text || item.html,
    }));

    try {
      await resend.batch.send(payload)
    } catch (e) {
      strapi.log.error(`Error sending batch emails`, e);
    }
  }
}
