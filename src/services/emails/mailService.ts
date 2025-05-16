export interface Contact {
  email: string;
  firstName?: string;
  lastName?: string;
  audienceId?: string;

  [key: string]: any;
}

export interface Broadcast {
  audienceId: string,
  from?: string,
  subject: string,
  html: string,
}

export interface Mail {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string;
  bcc?: string;
  attachments?: Array<{ filename: string; path: string }>;

  [key: string]: any;
}

export interface SendBroadcastOptions<T, U> {
  scheduledAt: T,
  id?: U
}

export abstract class MailService {

  abstract saveContact<T extends Contact>(data: T): Promise<void>;

  abstract sendEmail<T extends Mail>(data: T): Promise<void>;

  abstract sendBulkEmail<T extends Mail>(data: T[]): Promise<void>;

  abstract createBroadcast<T extends Broadcast>(data: T): Promise<any>;

  abstract sendBroadcast<T extends SendBroadcastOptions<any, any>>(data: T): Promise<void>;
}
