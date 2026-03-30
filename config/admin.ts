import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'https://matteralifesystems.com')],
      async handler(uid, { documentId, locale, status }) {
        const baseUrl = env('CLIENT_URL', 'https://matteralifesystems.com');
        let path = '';
        if (uid.includes('company-page')) path = '/company';
        else if (uid.includes('technology-page')) path = '/technology';
        else if (uid.includes('platform-page')) path = '/platform';
        else if (uid.includes('applications-page')) path = '/applications';
        else if (uid.includes('research-page')) path = '/research';
        else if (uid.includes('investors-page')) path = '/investors';
        else if (uid.includes('contact-page')) path = '/contact';
        else if (uid.includes('research-collaboration-page')) path = '/research-collaboration';

        const query = new URLSearchParams();
        query.append('preview', 'true');
        if (documentId) query.append('documentId', documentId);
        if (locale) query.append('locale', locale);
        query.append('status', status);

        return `${baseUrl}${path}?${query.toString()}`;
      },
    },
  },
});
export default config;
