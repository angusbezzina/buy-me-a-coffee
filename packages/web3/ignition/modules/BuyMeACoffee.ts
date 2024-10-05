// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BuyMeACoffeeModule = buildModule("BuyMeACoffeeModule", (m) => {
  const buyMeACoffee = m.contract("BuyMeACoffee");

  return { buyMeACoffee };
});

export default BuyMeACoffeeModule;
