module.exports = {
  apps: [
    {
      name: "local:@markus-morische/backend",
      script: "deno run --allow-run scripts.ts start",
      instances: 1,
      env: {
        DENO_ENV: "./.env.local",
      },
    },
  ],
};

