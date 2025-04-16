export default {
  routes: [
    {
      method: 'GET',
      path: '/job-offers/find-by-slug/:slug',
      handler: 'api::job-offer.job-offer.findOneBySlug', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
    },
  ],
}
