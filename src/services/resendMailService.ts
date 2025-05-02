import {Contact, Mail, MailService} from "./mailService";

/**
 * ResendMailService is a concrete implementation of the MailService interface.
 * It uses the Resend API to send emails and save contacts.
 */
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');


export class ResendMailService implements MailService {


  async saveContact<T extends Contact>(data: T): Promise<void> {
    await resend.contacts.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      unsubscribed: false,
      audienceId: '0c8b3169-95bb-4473-a93d-a778ec9d8bac',
    });

  }

  async sendEmail<T extends Mail>(data: T): Promise<void> {

    await resend.emails.send({
      from: data.from || 'hello@fluttergigs.com',
      to: data.to,
      subject: data.subject,
      html: data.text || data.html,
    });
  }

  async sendBulkEmail<T>(data: T): Promise<void> {
    // Implement the logic to send bookmark email using Resend API
    console.log("Sending bookmark email using Resend API", data);
  }
}
