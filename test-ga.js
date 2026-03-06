console.log('Starting GA Test...');

try {
    const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    console.log('Import successful: @google-analytics/data');
} catch (e) {
    console.error('Import failed: @google-analytics/data', e.message);
}

try {
    require('dotenv').config();
    console.log('Import successful: dotenv');
} catch (e) {
    console.error('Import failed: dotenv', e.message);
}

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const propertyId = process.env.GA_PROPERTY_ID;
const clientEmail = process.env.GA_CLIENT_EMAIL;
let privateKey = process.env.GA_PRIVATE_KEY;

console.log('Property ID:', propertyId);
console.log('Client Email:', clientEmail);

if (privateKey) {
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.substring(1, privateKey.length - 1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');
    console.log('Private Key length:', privateKey.length);
}

const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: clientEmail,
        private_key: privateKey,
    },
});

async function runReport() {
    try {
        console.log('Running report...');
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '365daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'date' }],
            metrics: [{ name: 'activeUsers' }],
        });

        console.log('Report result rows:', response.rows ? response.rows.length : 0);
    } catch (error) {
        console.error('Error in runReport:', error.message);
    }
}

runReport();
