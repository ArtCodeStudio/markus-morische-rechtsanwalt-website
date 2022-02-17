module.exports = {
  apps: [
    {
      name: "dev:@markus-morische/backend",
      script: "deno run --allow-run scripts.ts start",
      instances: 1,
      env: {
        DENO_ENV: "./.env.dev",
      },
    },
  ],
};

