/**
 * EmailService.js
 * 
 * Abstraction layer for sending transactional emails.
 * Designed to be future-ready for providers like Resend or SendGrid.
 */

class EmailService {
  constructor() {
    this.provider = import.meta.env.VITE_EMAIL_PROVIDER || 'mock';
  }

  /**
   * Sends an email using the configured provider.
   * @param {Object} options 
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.body - Email body (text or HTML)
   * @returns {Promise<boolean>} - Success status
   */
  async sendEmail({ to, subject, body }) {
    console.log(`[EmailService] Preparing to send email via ${this.provider}`);
    console.log(`To: ${to}\nSubject: ${subject}\nBody: ${body}`);

    try {
      if (this.provider === 'resend') {
        return await this._sendWithResend({ to, subject, body });
      } else if (this.provider === 'sendgrid') {
        return await this._sendWithSendGrid({ to, subject, body });
      } else {
        return await this._sendWithMock({ to, subject, body });
      }
    } catch (error) {
      console.error("[EmailService] Failed to send email:", error);
      throw error;
    }
  }

  async _sendWithResend({ to, subject, body }) {
    // Placeholder for Resend integration
    // Example: fetch('https://api.resend.com/emails', { ... })
    console.warn("Resend is not yet configured. Returning simulated success.");
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  }

  async _sendWithSendGrid({ to, subject, body }) {
    // Placeholder for SendGrid integration
    console.warn("SendGrid is not yet configured. Returning simulated success.");
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  }

  async _sendWithMock({ to, subject, body }) {
    // Mock implementation for development and testing
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("[EmailService] Mock email sent successfully.");
        resolve(true);
      }, 1000);
    });
  }
}

export const emailService = new EmailService();
