module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      enabled: false,
        origin: ['http://localhost:3000','http://localhost:3001','https://fluttergigs.com', 'fluttergigs.com'],
        headers: '*',
        credentials: true,
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
