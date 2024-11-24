import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BuyMeACoffee } from "../typechain-types";

describe("BuyMeACoffee", function () {
  async function deployBuyMeACoffeeFixture() {
    const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();

    return { buyMeACoffee, owner, tipper1, tipper2, tipper3 };
  }

  it("Should deploy the contract", async function () {
    const { buyMeACoffee } = await loadFixture(deployBuyMeACoffeeFixture);
    expect(await buyMeACoffee.getAddress()).to.be.properAddress;
  });

  it("Should allow buying a coffee", async function () {
    const { buyMeACoffee, tipper1 } = await loadFixture(deployBuyMeACoffeeFixture);
    const tip = ethers.parseEther("1");

    const txPromise = buyMeACoffee
      .connect(tipper1)
      .buyCoffee("Alice", "Great job!", { value: tip });

    await txPromise;

    const memos = await buyMeACoffee.getMemos();
    expect(memos.length).to.equal(1);
    expect(memos[0].from).to.equal(tipper1.address);
    expect(memos[0].name).to.equal("Alice");
    expect(memos[0].message).to.equal("Great job!");

    // Check if the timestamp is a number and within a reasonable range
    const currentTimestamp = Math.floor(Date.now() / 1000);
    expect(Number(memos[0].timestamp)).to.be.a("number");
    expect(Number(memos[0].timestamp)).to.be.closeTo(currentTimestamp, 60); // Within 60 seconds

    // Verify the event was emitted
    await expect(txPromise)
      .to.emit(buyMeACoffee, "NewMemo")
      .withArgs(tipper1.address, memos[0].timestamp, "Alice", "Great job!");
  });

  it("Should not allow buying a coffee for free", async function () {
    const { buyMeACoffee, tipper1 } = await loadFixture(deployBuyMeACoffeeFixture);

    await expect(
      buyMeACoffee.connect(tipper1).buyCoffee("Bob", "Nice work!", { value: 0 }),
    ).to.be.revertedWith("Can't buy coffee for free!");
  });

  it("Should allow owner to withdraw tips", async function () {
    const { buyMeACoffee, owner, tipper1, tipper2 } = await loadFixture(deployBuyMeACoffeeFixture);
    const tip = ethers.parseEther("1");

    await buyMeACoffee.connect(tipper1).buyCoffee("Tipper1", "First coffee", { value: tip });
    await buyMeACoffee.connect(tipper2).buyCoffee("Tipper2", "Second coffee", { value: tip });

    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    await buyMeACoffee.connect(owner).withdrawTips();
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
  });

  it("Should store and retrieve memos correctly", async function () {
    const { buyMeACoffee, tipper1, tipper2, tipper3 } =
      await loadFixture(deployBuyMeACoffeeFixture);
    const tip = ethers.parseEther("1");

    await buyMeACoffee.connect(tipper1).buyCoffee("Carolina", "You're the best!", { value: tip });
    await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing teacher", { value: tip });
    await buyMeACoffee
      .connect(tipper3)
      .buyCoffee("Kay", "I love my Proof of Knowledge", { value: tip });

    const memos = await buyMeACoffee.getMemos();
    expect(memos.length).to.equal(3);
    expect(memos[0].name).to.equal("Carolina");
    expect(memos[1].name).to.equal("Vitto");
    expect(memos[2].name).to.equal("Kay");
    expect(memos[0].message).to.equal("You're the best!");
    expect(memos[1].message).to.equal("Amazing teacher");
    expect(memos[2].message).to.equal("I love my Proof of Knowledge");
  });
});
