# markus-morische-rechtsanwalt-website

Monorepo of website project for [markusmorische.de](https://markusmorische.de/) build with Deno + Alosaur + Riba.js + Strapi.

![Screenshot](https://user-images.githubusercontent.com/1073989/141288178-949b138d-c1f7-44fb-b729-f67a72e3d17c.png)


## Backend

Tested with Deno v1.15.2, you can use [DVM](https://opensourcelibs.com/lib/dvm) to switch between different Deno versions:

```
dvm install 1.15.2
dvm use 1.15.2
```

### Start

```
cd backend
deno run --allow-net --allow-read --importmap=imports.json --allow-env --config ./tsconfig.json --watch app.ts
```
## Strapi

Tested with Node.js v16, you can use [NVM](https://github.com/nvm-sh/nvm) to switch between different Node.js versions:

```
nvm install 16
nvm use 16
```

### Build

```
cd strapi
npm run build
```
### Start

```
cd strapi
npm run start
```

## Frontend

Uses Node.js and Yarn to build:

```
npm install --global yarn
```

### Build

```
cd theme
npm run build
```
## Development

### Generate OpenAPI file

```
deno run --allow-read --allow-write --config ./src/tsconfig.lib.json openapi.ts
```
