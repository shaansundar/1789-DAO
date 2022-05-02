require('@nomiclabs/hardhat-waffle');
require('dotenv').config()
const secret = require("./env/secrets.json");

// 0xE74386ddDdd842440AAefb545B7f717D5DA0d109
module.exports = {
  solidity: "0.8.4",
  paths:{
    sources: "./blockchain/contracts",
    tests: "./blockchain/tests",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts",
  },
  networks:{
    localhost:{
      privateKey: [process.env.PRIVATE_KEY],
      accountsBalance: "10000000000000000000000"
    },
    mumbai:{
      url: secret.MUMBAI_RPC || process.env.MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    bsctestnet:{
      url: process.env.BSCTESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
