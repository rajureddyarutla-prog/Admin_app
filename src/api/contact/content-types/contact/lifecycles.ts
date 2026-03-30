import { Core } from '@strapi/strapi';

export default {
    async afterCreate(event) {
        const { result } = event;
        const { strapi } = event.model as any; // Access strapi instance if needed, or use global

        try {
            await (strapi as any).plugins['email'].services.email.send({
                to: 'info@matteralifesystems.com',
                from: 'info@matteralifesystems.com',
                subject: `New Enquiry from ${result.name}`,
                text: `
          New enquiry received:
          Name: ${result.name}
          Email: ${result.email}
          Organisation: ${result.organisation}
          Type: ${result.type}
          Message: ${result.message}
        `,
            });
            console.log('Email sent successfully for entry:', result.id);
        } catch (err) {
            console.error('Email Error:', err);
        }
    },
};
