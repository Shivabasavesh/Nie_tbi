import { useMutation } from '@tanstack/react-query';
import { createApplication } from '../services/applications.service';
import { emailService } from '../services/email/EmailService';

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: async (data) => {
      // Extract the application fields mapped to the database schema
      // We assume `data` contains:
      // startup_name, founder_name, email, phone, startup_stage, sector, city, message, pitch_deck_url, link_accessibility_confirmed
      
      const insertedData = await createApplication(data);

      // Optionally, we could send an email notification about the new application here
      try {
        const to = import.meta.env.VITE_INSTITUTIONAL_EMAIL || 'incubator@nie.ac.in';
        const subject = `New Startup Application: ${data.startup_name}`;
        const body = `A new startup incubation application has been submitted by ${data.founder_name} (${data.startup_name}). Please check the admin dashboard.`;
        await emailService.sendEmail({ to, subject, body });
      } catch (emailError) {
        console.warn("Could not send notification email for application, but database insertion succeeded.", emailError);
      }

      return insertedData;
    },
  });
};
