
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
},
  networks: {
    Sepolia: {
      url: `https://sepolia.infura.io/v3/e5887c2141934ba7adbc485fdcb1c08a`,
      accounts: ["prvate key"]
    }
  }
};
export default config;
