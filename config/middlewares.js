module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://[::]:3000',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:4000',
        'http://localhost:4001',
        'http://localhost:4002',
        'https://fluttergigs.com',
        'fluttergigs.com',
        'https://89e6-2c0f-f0f8-853-4700-34c4-da4e-f47c-1864.ngrok-free.app'
      ],
      headers: '*',
      // credentials: true,
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
