'use strict';

/**
 * interview-usage router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/interview-usage/current',
      handler: 'interview-usage.getCurrentUsage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/interview-usage/increment',
      handler: 'interview-usage.incrementUsage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/subscription-status',
      handler: 'interview-usage.getSubscriptionStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/subscription-status',
      handler: 'interview-usage.updateSubscriptionStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};