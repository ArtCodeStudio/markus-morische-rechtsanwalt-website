module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3002),
  url: env('URL', 'https://markusmorische.de/api'),
  admin: {
    url: env('ADMIN_URL', 'https://markusmorische.de/admin'),
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f3f41f5e46327525ee93a8ae2279bc5c'),
    },
  },
});
