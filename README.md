# markus-morische-rechtsanwalt-website

Monorepo of website project for [markusmorische.de](https://markusmorische.de/) build with Deno + Alosaur + Riba.js + Strapi.

![Screenshot](https://user-images.githubusercontent.com/1073989/141288178-949b138d-c1f7-44fb-b729-f67a72e3d17c.png)

## Licence

This project is licensed under the AGPL license, except for the assets (logo, font, etc), which are private and the use of which is prohibited in all respects.

## Submodules

This repository has submodules, so you need to clone this repository including this submodules:

```bash
git clone --recursive https://github.com/ArtCodeStudio/markus-morische-rechtsanwalt-website.git
```

You can also clone the submodules afterwards:

```bash
git clone https://github.com/ArtCodeStudio/markus-morische-rechtsanwalt-website.git
cd markus-morische-rechtsanwalt-website
git submodule update --init --recursive
```

If you want to pull updates from this repository you should also pull the submodules:

```bash
git pull --recurse-submodules
```

## Backend

Tested with Deno v1.19.1, you can use [DVM](https://opensourcelibs.com/lib/dvm) to switch between different Deno versions:

```bash
dvm install 1.19.1
dvm use 1.19.1
```

### Start

```bash
cd backend
DENO_ENV=./.env.local deno run --allow-run scripts.ts start
```

### Watch

```bash
cd backend
DENO_ENV=./.env.local deno run --allow-run scripts.ts watch
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
npm run build:local
```
### Start

```bash
cd strapi
npm run start:local
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
