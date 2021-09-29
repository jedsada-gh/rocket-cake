const fs = require("fs");
const path = require("path");

import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("deploy", "Rocket Contract", async (_, hre) => {
  const contracts = { rocketToken: "",  iterableMapping: ""};
  const IterableMapping = await hre.ethers.getContractFactory("IterableMapping");
  const iterableMapping = await IterableMapping.deploy();
  await iterableMapping.deployed();

  const RocketCake = await hre.ethers.getContractFactory("ROCKETCAKE", {
    libraries: {
      IterableMapping: iterableMapping.address,
    },
  });
  const rocketCake = await RocketCake.deploy();
  await rocketCake.deployed();

  contracts.rocketToken = rocketCake.address;
  contracts.iterableMapping = iterableMapping.address
  console.log("Rocket deployed to ✅");

  const resultPath = path.join(__dirname, `./constants/${hre.network.name}.json`);
  fs.writeFileSync(resultPath, JSON.stringify(contracts, null, 2));

  console.log(JSON.stringify(contracts, null, 2));
});
