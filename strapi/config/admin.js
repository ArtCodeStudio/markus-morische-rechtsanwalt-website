module.exports = ({ env }) => ({
  url: env('ADMIN_URL', 'https://markusmorische.de/admin'),
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f3f41f5e46327525ee93a8ae2279bc5c'),
  },
});
