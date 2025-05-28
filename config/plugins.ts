export default ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'), // Required
      },
      settings: {
        defaultFrom: 'team@fluttergigs.com',
        defaultReplyTo: 'team@fluttergigs.com',
      },
    }
  },
})
