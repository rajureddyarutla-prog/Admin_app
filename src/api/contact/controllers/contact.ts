export default {
    async submit(ctx) {
        try {
            const { name, email, organisation, type, message } = ctx.request.body;

            console.log("Contact form data:", {
                name,
                email,
                organisation,
                type,
                message,
            });

            ctx.send({
                success: true,
                message: "Form submitted successfully",
            });
        } catch (error) {
            ctx.throw(500, "Failed to submit form");
        }
    },
};