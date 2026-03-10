import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => ({
    connection: {
        client: 'postgres',
        connection: {
            connectionString: env('DATABASE_URL'),
            ssl: env.bool('DATABASE_SSL', true) && {
                rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
            },
        },
        pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
});
