
module.exports = {
    apps: [
      {
        name: "dev:@markus-morische/strapi",
        script: "npm run start:dev",
	      instances: 1,
        env: {
          // Yarn 2 automatically injects the .pnp file over NODE_OPTIONS, this causes problems with packages that do not belong to the workspace
          NODE_OPTIONS: "",
          NODE_ENV: "production",
          ENV_PATH: "./.env.prod"
        }
      },
    ],
};
