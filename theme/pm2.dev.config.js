module.exports = {
  apps: [
    {
      name: "dev:@markus-morische/theme",
      script: "yarn workspace @markus-morische/theme run watch",
      watch: ["package.json", "../../../.pnp.cjs"],
      instances: 1,
      env: {
        NODE_ENV: "development",
        DEBUG: "",
      },
    },
  ],
};
