import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): any => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.hostinger.com'),
                port: env.int('SMTP_PORT', 587),
                auth: {
                    user: env('SMTP_USER'),
                    pass: env('SMTP_PASS'),
                },
            },
            settings: {
                defaultFrom: env('SMTP_USER'),
                defaultTo: env('CONTACT_RECEIVER_EMAIL', 'info@matteralifesystems.com'),
            },
        },
    },
});

export default config;
