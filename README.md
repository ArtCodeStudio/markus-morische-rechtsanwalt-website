# markus-morische-rechtsanwalt-website

Monorepo of website project for [markusmorische.de](https://markusmorische.de/) build with Deno + Alosaur + Riba.js + Strapi.

![Screenshot](https://user-images.githubusercontent.com/1073989/141288178-949b138d-c1f7-44fb-b729-f67a72e3d17c.png)

## Licence

This project is licensed under the AGPL license, except for the assets (logo, font, etc), which are private and the use of which is prohibited in all respects.

## Backend

Tested with Deno v1.18.2, you can use [DVM](https://opensourcelibs.com/lib/dvm) to switch between different Deno versions:

```bash
dvm install 1.18.2
dvm use 1.18.2
```

### Start

```bash
cd backend
deno run --allow-run scripts.ts start
```

### Watch

```bash
cd backend
deno run --allow-run scripts.ts watch
```
## Strapi

Tested with Node.js v16, you can use [NVM](https://github.com/nvm-sh/nvm) to switch between different Node.js versions:

```bash
nvm install 16
nvm use 16
```

### Build

```bash
cd strapi
npm run build
```
### Start

```bash
cd strapi
npm run start
```

## Frontend

Uses Node.js and Yarn to build:

```bash
npm install --global yarn
```

### Build

```bash
cd theme
npm run build
```
## Development

### Generate OpenAPI file

```bash
deno run --allow-read --importmap=imports.json --allow-write --config tsconfig.json openapi.ts
```
