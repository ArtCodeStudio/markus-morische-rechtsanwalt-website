module.exports = {
    apps: [
      {
        name: "dev:@markus-morische/backend",
        script: "deno run --allow-run scripts.ts start",
        instances: 1,
        env: {
          SERVER_PORT: "4001",
          STRAPI_REMOTE_URL: "https://dev.markusmorische.de/api",
          STRAPI_LOCAL_URL: "http://localhost:4002/api",
        },
      },
    ],
  };
  
