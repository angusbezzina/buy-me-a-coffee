# Buy Me a Coffee Hardhat Project

This package includes a basic ETH contract to tip or 'Buy a Coffee' for the user. It also includes a test for the contract and a Hardhat Ignition module that deploys that contract.

## Installation

To get started, install the dependencies with the command:

```bash
npm install
```

## Development

#### Compile the contract

To compile the contract, run the command:

```bash
npm run compile
```

OR

```bash
npx hardhat compile
```

#### Test the contracts

To test the contracts, run the command:

```bash
npm run test
```

OR

```bash
npx hardhat test
```

**NOTE:** You can show gas usage with the `REPORT_GAS` flag, i.e. `REPORT_GAS=true npx hardhat test`

## Deploying the contract

This setup uses [Hardhat Ignition](https://hardhat.org/ignition) to manage smart contract deployments. To deploy the contract, run the command:

```bash
npx hardhat ignition deploy ./ignition/modules/<module-name>.ts --network <network-name>
```

Once deployed, make sure to save the contract address as you'll need it to interact with the contract.

#### Verifying the contract

To verify the contract, run the command:

```bash
npx hardhat verify --network <network-name> <contract-address>
```

**NOTE:** `<network-name>` can be one of the networks defined in `hardhat.config.ts`, i.e. `sepolia` or `mainnet`.

## Connecting a wallet or Dapp to the Hardhat network

To connect a wallet or Dapp to a local instance of the (Hardhat network)[https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network], you can use the following command:

```bash
npm run node
```

OR

```bash
npx hardhat node
```

This will expose a JSON-RPC interface to Hardhat Network. To use it, connect your wallet or application to http://127.0.0.1:8545.
