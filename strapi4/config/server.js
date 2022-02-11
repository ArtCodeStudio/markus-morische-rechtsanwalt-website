module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3002),
  url: env('URL', 'https://markusmorische.de/api'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
