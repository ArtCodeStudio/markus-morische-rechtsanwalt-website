
module.exports = {
    apps: [
      {
        name: "dev:@markus-morische/strapi",
        script: "npm run develop",
        env: {
          // Yarn 2 automatically injects the .pnp file over NODE_OPTIONS, this causes problems with packages that do not belong to the workspace
          NODE_OPTIONS: "",
          HOST: "127.0.0.1",
          PORT: "4002",
          URL: "http://localhost:4002",
          ADMIN_URL: "http://localhost:4002/admin",
          NODE_ENV: "development"
        }
      },
    ],
};