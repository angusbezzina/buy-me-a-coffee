# Buy Me A Coffee

This is a monorepo built around a simple "Buy Me A Coffee" smart contract that is written in Solidity and built with [Hardhat](https://hardhat.org/). The idea here is that this could be used as a starting point for any other future dApps that you're interested in building.

If you're less technical and just want to know how to make your own version of this project, you can find the instructions [here](https://angusbezzina.github.io/buy-me-a-coffee/).

## Monorepo Structure

### Apps

- `astro`: an [Astro](https://astro.build/) powered web app that enables interaction with the smart contract

### Packages

- `web3`: an [Hardhat](https://hardhat.org/) project that contains the smart contract alongside deployment scripts and logic.
- `@repo/ui`: a React component library derived from ShadCN
- `@repo/types`: TypeScript types used throughout the monorepo
- `@repo/styles`: TailwindCSS styles used throughout the monorepo

#### Config packages

- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Getting started

We're using good old `npm` as the package manager here, so install dependencies with the command:

```sh
npm install
```

## Development

To run all the apps and packages in development mode, leverage turbo and run the command:

```sh
turbo dev
```

To run the Astro app on it's own, you can also run:

```sh
turbo dev --filter={apps/astro}
```

## Build

To build all apps and packages, run the command:

```
turbo build
```

## Deploy

The deployment process is separated into two parts, the first is the deployment of the smart contract and the second is the deployment of the Astro app.

### Smart Contract

The smart contract is currently set up to be deployed to the Sepolia testnet or the Ethereum mainnet. For further instructions on how to deploy the smart contract, please refer to the [web3 README](packages/web3/README.md).

### Astro App

The Astro app is currently configured to be deployed to Vercel. For further instructions on how to deploy the Astro app, please refer to the [astro README](apps/astro/README.md).
