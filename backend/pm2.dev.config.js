module.exports = {
    apps: [
      {
        name: "dev:@markus-morische/backend",
        script: "deno run --allow-run scripts.ts watch",
        env: {
          SERVER_PORT: "4001",
          STRAPI_REMOTE_URL: "http://localhost:4002/api",
          STRAPI_LOCAL_URL: "http://localhost:4002/api",
        },
      },
    ],
  };
  
