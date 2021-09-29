require("dotenv").config();

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "solidity-coverage";

require("./scripts/deploy");

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

const optimizeSettings = {
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    bsctest: {
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    ganache: {
      allowUnlimitedContractSize: true,
      gasLimit: 6721975 * 10, // increase the gas limit by 10
      url: "http://127.0.0.1:7545",
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        ...optimizeSettings,
      },
      {
        version: "0.6.2",
        ...optimizeSettings,
      },
    ],
  },
  gasReporter: {
    currency: "EUR",
  },
};
