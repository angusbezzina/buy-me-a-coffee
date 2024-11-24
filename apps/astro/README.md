# Astro App

The face of the "Buy Me A Coffee" dApp.

## Project Structure

React components are located in the `src/components` directory, layout components are located in the `src/layouts` directory, and pages are located in the `src/pages` directory.

## Web 3 Integration

This project leverages several tools and libraries to provide a robust and seamless Web3 experience:

- Wagmi & TanStack Query: Wagmi exposes Web3 methods via a series of React hooks, while TanStack Query simplifies fetching, caching, synchronizing, and updating server state in web applications.
- Viem: A TypeScript-based interface for interacting with Ethereum and other EVM-compatible blockchains, ensuring a type-safe and developer-friendly experience.
- RainbowKit: Provides a polished wallet connection UI/UX, making it easier for users to connect their wallets and interact with the dApp. The RainbowKit docs are also a good place to start for an idea on how the client side stuff is handled.

**Note:** Web3 functionality is handled entirely within the web3 package, isolating blockchain-specific logic from the rest of the application.
