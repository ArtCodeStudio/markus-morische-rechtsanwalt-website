module.exports = {
  apps: [
    {
      name: "prod:@markus-morische/theme",
      script: "yarn run watch:prod",
      watch: ["package.json", "../../../.pnp.cjs"],
      instances: 1,
      env: {
        NODE_ENV: "production",
        DEBUG: "",
      },
    },
  ],
};
