require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

const ALCHEMY_MUMBAI_URL = process.env.ALCHEMY_MUMBAI_URL
const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: ALCHEMY_MUMBAI_URL,
      accounts: [TEST_WALLET_PRIVATE_KEY],
    }
  }
};
