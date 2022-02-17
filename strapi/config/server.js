module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3002),
  url: env('URL', 'https://strapi.markusmorische.de'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
