export default {
    routes: [
        {
            method: "GET",
            path: "/analytics/stats",
            handler: "analytics.getStats",
            config: {
                auth: false, // Temporarily allow public access for testing
                policies: [],
                middlewares: [],
            },
        },
    ],
};
