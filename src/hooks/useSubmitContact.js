import { useMutation } from '@tanstack/react-query';
import { emailService } from '../services/email/EmailService';

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (data) => {
      // The contact form collects: fullName, email, phone, subject, message
      // We will map these into the EmailService structure
      const subject = data.subject || 'New Contact Inquiry';
      const body = `
        New inquiry received from the website.
        
        Name: ${data.fullName}
        Email: ${data.email}
        Phone: ${data.phone}
        
        Message:
        ${data.message}
      `;

      // Simulating routing notifications to configured institutional email workflow
      const to = import.meta.env.VITE_INSTITUTIONAL_EMAIL || 'incubator@nie.ac.in';

      const success = await emailService.sendEmail({ to, subject, body });
      if (!success) {
        throw new Error("Failed to send contact email.");
      }
      return success;
    },
  });
};
