Congratulations! You're here and I can only assume that means you want to make your own version of the "Buy Me A Coffee" app. If not, try not to let the door hit you on the way out.

To make this as easy as possible for less technical folk, I've tried to make reproducing this project as simple as possible.

## Step 1: Clone the repo and create your accounts

The first thing you'll need to do is clone this repo, so go ahead and do that now. If you're not sure how to do that, feel free to use ChatGPT or if you're already familiar, use the CLI and run the following command:

```bash
git clone https://github.com/josh-works/buy-me-a-coffee.git
```

After that, you'll need to make sure you have a crypto wallet. I use MetaMask, which you can learn about [here](https://metamask.io/), but feel free to use whatever you want.

> ❗️ **IMPORTANT**
> Make sure you have enabled Testnet visibility in your MetaMask wallet, specifically for the Sepolia Testnet. For more information see [this article](https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask).

Once that's done, give yourself a high five and move onto the next step, subscribing to the [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia). Sepolia is the Ethereum testnet I'm using for this project, which allows me to test the contract I've built without having to spend any real ETH.

> ✍️ **NOTE**
> You can learn more about what Faucets are [here](https://cloud.google.com/application/web3/faucet) and how testnets work [here](https://www.hiro.so/blog/devnet-vs-testnet-vs-mainnet-what-do-they-mean-for-web3-developers#:~:text=A%20testnet%20is%20an%20independent,anyone%20can%20join%20and%20participate.).

Next, you'll need to create an account with Alchemy then create an app in there and get yourself an API key. [The docs for Alchemy](https://docs.alchemy.com/docs/alchemy-quickstart-guide) are quite good so I'll leave it up to you to figure out how to do that but if you need help, feel free to reach out.

Once this is done, you'll need to create a [WalletConnect Cloud](https://cloud.walletconnect.com/) account to get a `projectId` that is required in order for RainbowKit and the UI to function correctly.

After that, head to Giphy, create an account and get an API key. We use this to fetch a random GIF for each person who buys you a coffee, but you could also replace this call with any other random image API if you prefer.

Finally, I recommend you set up an account with Etherscan so that you can track your transactions and see any contract you setup in action. The instructions for how to set up an API key can be found [here](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics), but if you need assistance, again, just ping me and I'll get back you at my earliest convenience.

Ok, perfect! You're all set up and ready to go. Just to recap, you should now have the following:

- A crypto wallet that you've connected to the Sepolia Faucet
- An Alchemy account and an API key
- An Etherscan account and an associated API key

## Step 2: Install dependencies, plug in your variables

Now that you have all of that, let's get started!

First, you'll need to install the dependencies for the project. You can do that by running the following command:

```bash
npm install
```

Once that's done, you'll need to create a `.env` file in the each of the `astro` and `web3` directories. Thes file will contain all of the variables you need to run the project. You can copy the `.env.example` files I've provided and begin to fill in the values with the keys you collected in the previous step.

> ✍️ **NOTE:**
> You can create the `SEPOLIA_URL` and `MAINNET_URL` variables by replacing the following with your Alchemy API key:

    - `https://eth-mainnet.g.alchemy.com/v2/your-api-key`
    - `https://eth-sepolia.g.alchemy.com/v2/your-api-key`

## Step 3: Deploying the contracts

At this point you may be wondering why you don't have the `MAINNET_CONTRACT_ADDRESS` and `SEPOLIA_CONTRACT_ADDRESS` variables. This is because we need to deploy the contracts first.

To do this, simply use the CLI, navigate to the `web3` directory, and run the following command:

```bash
npx hardhat ignition deploy ./ignition/modules/BuyMeACoffee.ts --network <network-name>
```

Please not that you'll need to replace the `<network-name>` with either `sepolia` or `mainnet` depending on which network you want to deploy to.

I strongly recommend testing the deployment on the Sepolia testnet first and making sure everything is working as expected with the UI first, just to make sure everything is working as expected as **the cost of deploying the contract to mainnet is around US$70 at the time of writing**.

Once the contracts have finished deploying, you'll see the contract address in the terminal. Copy this address and paste it into the `.env` file in the `astro` and `web3` directories.

## Step 4: Spinning up and deploying the project

Once the contracts are deployed you can start playing with the UI. To do this, simply run the following command from the root of the project:

```bash
turbo dev --filter={apps/astro}
```

This will start the Astro server and you can then navigate to `http://localhost:4321` in your browser to see the UI.

If you're satisfied that everything is working as expected, you can then deploy the project to Vercel. The easiest way to do this is to create a new project in Vercel, connect your new Git repository and follow the instructions to deploy the app. There are some good instructions [here](https://docs.astro.build/en/guides/deploy/vercel) if you need them on deploying an Astro app to Vercel or you can lean on the tips I've left you in the README in the `astro` app directory.

> ✍️ **NOTE:**
> Vercel will provide you with a URL to your deployed app, which you can then share with the community that you're hoping will support you.
