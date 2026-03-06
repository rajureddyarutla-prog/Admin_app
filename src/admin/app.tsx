import type { StrapiApp } from '@strapi/strapi/admin';
import { ChartPie } from '@strapi/icons';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    app.addMenuLink({
      to: 'analytics-dashboard',
      icon: ChartPie,
      intlLabel: {
        id: 'analytics.plugin.name',
        defaultMessage: 'Analytics',
      },
      Component: () => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })),
      permissions: [],
    });
  }
};