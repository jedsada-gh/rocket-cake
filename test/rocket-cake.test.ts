import { ethers } from "hardhat";
import { expect } from "chai";

describe("Rocket Cake", function () {
  it("Should return the new rocket cake once it's changed", async function () {
    const IterableMapping = await ethers.getContractFactory("IterableMapping");
    const iterableMapping = await IterableMapping.deploy();
    await iterableMapping.deployed();

    const RocketCake = await ethers.getContractFactory("ROCKETCAKE", {
      libraries: {
        IterableMapping: iterableMapping.address,
      },
    });
    const rocketCake = await RocketCake.deploy();
    await rocketCake.deployed();

    expect(await rocketCake.getClaimWait()).to.equal("3600");
  });
});
