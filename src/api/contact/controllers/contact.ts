import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
    async submit(ctx) {
        try {
            const { name, email, organisation, type, message } = ctx.request.body;

            console.log("Contact form data received:", {
                name,
                email,
                organisation,
                type,
                message,
            });

            // Save to database
            const entry = await strapi.entityService.create('api::contact.contact', {
                data: {
                    name,
                    email,
                    organisation,
                    type,
                    message,
                    publishedAt: new Date(),
                },
            });

            ctx.send({
                success: true,
                message: "Form submitted and saved successfully",
                data: entry,
            });
        } catch (error) {
            console.error("Submission error:", error);
            ctx.throw(500, "Failed to submit form");
        }
    },
}));