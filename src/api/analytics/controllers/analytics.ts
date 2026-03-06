import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID;
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
});

export default {
    async getStats(ctx) {
        if (!propertyId || !process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
            return ctx.badRequest("Google Analytics configuration is missing in .env");
        }
        try {
            console.log('Fetching GA data for property:', propertyId);

            // Fetch Real-time Active Users
            let totalActiveUsers = '0';
            try {
                const [realtimeReport] = await analyticsDataClient.runRealtimeReport({
                    property: `properties/${propertyId}`,
                    metrics: [{ name: 'activeUsers' }],
                });
                totalActiveUsers = realtimeReport.rows?.[0]?.metricValues?.[0]?.value || '0';
                console.log(`Real-time active users fetched: ${totalActiveUsers}`);
            } catch (rtError) {
                console.error('Real-time API error:', rtError.message);
            }

            const [visitorReport] = await analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'date' }],
                metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
            });

            const [pageReport] = await analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
                metrics: [
                    { name: 'activeUsers' },
                    { name: 'averageSessionDuration' },
                    { name: 'screenPageViews' }
                ],
                limit: 10,
                orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
            });

            const dailyStats = visitorReport.rows?.map(row => ({
                date: row.dimensionValues?.[0].value,
                visitors: parseInt(row.metricValues?.[0].value || '0'),
                pageViews: parseInt(row.metricValues?.[1].value || '0'),
            })) || [];

            const topPages = pageReport.rows?.map(row => ({
                path: row.dimensionValues?.[0].value,
                title: row.dimensionValues?.[1].value,
                visitors: parseInt(row.metricValues?.[0].value || '0'),
                avgDuration: parseFloat(row.metricValues?.[1].value || '0'),
                views: parseInt(row.metricValues?.[2].value || '0'),
            })) || [];

            return {
                dailyStats: dailyStats.sort((a, b) => (a.date > b.date ? 1 : -1)),
                topPages,
                totalActiveUsers: totalActiveUsers,
            };

        } catch (error) {
            // Return real error message instead of generic 500
            console.error('GA Data API error:', error.message);
            return ctx.internalServerError(error.message);
        }
    },
};
