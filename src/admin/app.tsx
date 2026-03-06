import type { StrapiApp } from '@strapi/strapi/admin';
import { AnalyticsPage } from './pages/AnalyticsPage';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    // Add Analytics to the main menu (use lazy import to avoid deprecation warning)
    app.addMenuLink({
      to: 'analytics-dashboard', // relative path
      icon: 'chartLine',
      intlLabel: {
        id: 'analytics.plugin.name',
        defaultMessage: 'Analytics',
      },
      Component: () => import('./pages/AnalyticsPage').then(m => m.AnalyticsPage),
      permissions: [],
    });
  }
};