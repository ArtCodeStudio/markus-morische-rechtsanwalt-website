
module.exports = {
    apps: [
      {
        name: "local:@markus-morische/strapi",
        script: "npm run start:local",
	      instances: 1,
        env: {
          // Yarn 2 automatically injects the .pnp file over NODE_OPTIONS, this causes problems with packages that do not belong to the workspace
          NODE_OPTIONS: "",
          NODE_ENV: "production",
          ENV_PATH: "./.env.local"
        }
      },
    ],
};
