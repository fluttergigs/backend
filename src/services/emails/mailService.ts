export interface Contact {
  email: string;
  firstName?: string;
  lastName?: string;

  [key: string]: any;
}

export interface Mail{
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

export abstract class MailService {

  abstract saveContact<T extends Contact>(data: T): Promise<void>;

  abstract sendEmail<T extends Mail>(data: T): Promise<void>;

  abstract sendBulkEmail<T>(data: T): Promise<void>;
}
