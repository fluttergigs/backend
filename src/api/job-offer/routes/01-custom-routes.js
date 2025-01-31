module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/job-offers/scrape',
      handler: 'api::job-offer.job-offer.scrape',
      config: {
        auth: false,
      }
    }
  ]
}
