module.exports = ({ env }) => ({
  url: env('ADMIN_URL', 'https://markusmorische.de/admin'),
  auth: {
    secret: env('ADMIN_JWT_SECRET', '04ee02cb9d9003f036f921d71c6102e7'),
  },
});
