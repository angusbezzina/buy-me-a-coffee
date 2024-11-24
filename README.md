# Buy Me A Coffee

This is a monorepo that contains a simple "Buy Me A Coffee" dApp built with [Astro](https://astro.build/) and [Hardhat](https://hardhat.org/).

### Apps and Packages

- `astro`: a [Astro](https://astro.build/) app
- `web3`: a [Hardhat](https://hardhat.org/) project
- `@repo/ui`: a stub React component library that can be used across the monorepo
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Getting started

Install the dependencies with the command:

```sh
npm install
```

### Development

To run all the apps and packages in development mode, run the command:

```sh
turbo dev
```

To run the Astro app on it's own, just run:

```sh
turbo dev --filter={apps/astro}
```

### Build

To build all apps and packages, run the command:

```
turbo build
```

### Deploy

TBD
