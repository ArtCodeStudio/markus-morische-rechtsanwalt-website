module.exports = {
    apps: [
      {
        name: "@markus-morische/backend",
        script: "deno run --allow-net --allow-read --importmap=imports.json --unstable --allow-env --config tsconfig.json app.ts",
	      // args: "./app.ts",
        // interpreter: "deno",
	      // interpreter_args: "run --allow-net --allow-read --importmap=imports.json --allow-env --config ./tsconfig.json",
        // env: {},
      },
    ],
  };
  
