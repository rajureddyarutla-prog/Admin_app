export default {
    async afterCreate(event: any) {
        const { result } = event;

        try {
            await strapi.plugin('email').service('email').send({
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