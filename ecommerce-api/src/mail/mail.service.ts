import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendEmail(to: string, subject: string, html: string) {
    const apiKey = process.env.BREVO_API_KEY;
    const from = process.env.MAIL_FROM;

    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not configured');
    }

    if (!from) {
      throw new Error('MAIL_FROM is not configured');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'ShopBasra',
          email: from,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      }),
    });

   if (!response.ok) {
     const error = await response.text();

     console.error('Brevo API error:', {
       status: response.status,
       statusText: response.statusText,
       body: error,
     });

     throw new InternalServerErrorException(`Brevo error: ${error}`);
   }
    return response.json();
  }
}
