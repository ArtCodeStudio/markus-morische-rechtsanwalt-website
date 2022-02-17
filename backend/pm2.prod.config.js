module.exports = {
  apps: [
    {
      name: "prod:@markus-morische/backend",
      script: "deno run --allow-run scripts.ts start",
      instances: 1,
      // args: "./app.ts",
      // interpreter: "deno",
      // interpreter_args: "run --allow-net --allow-read --importmap=imports.json --allow-env --config ./tsconfig.json",
      env: {
        DENO_ENV: "./.env.prod",
      },
    },
  ],
};

