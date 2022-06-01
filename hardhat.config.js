require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const ALCHEMY_API_KEY = "GWmy_TbSbZnzj7bXtprOXD8IwqnMastX";
const INFURA_API_KEY = "eef56774b0204e9abc23fef1847db296"
const ROPSTEN_PRIVATE_KEY = "e511e46bc9d3eec795534c8c49eb89ea3f46d862886be6e600d5121c5b472ba3";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.26"
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },
  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      //accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
      chainId: 31337
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      //https://ropsten.infura.io/v3/eef56774b0204e9abc23fef1847db296
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    local: {
      url: `HTTP://127.0.0.1:7545/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  },
  abiExporter: {
    path: './deployments/abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  },
};
