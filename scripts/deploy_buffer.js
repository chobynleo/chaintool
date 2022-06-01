// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { writeAddr } = require('./artifact_log.js');
const { ethers } = require("hardhat");

async function main() {

  //Deploy MyToken contract(ERC20 contract)
  const MyToken = await ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.deploy();
  console.log("-------MyToken deploying------------");
  let token = await mytoken.deployed();
  console.log("-------------");
  await writeAddr(token.address, "MyToken")
  console.log("MyToken address:", mytoken.address);
  
  // Deploy BulkTransfer contract
  const BulkSender = await ethers.getContractFactory("BulkSender");
  const bulkSender = await BulkSender.deploy();
  console.log("-------BulkSender deploying------------");
  let bT= await bulkSender.deployed();
  console.log("-------------");
  await writeAddr(bT.address, "BulkSender");
  console.log("BulkSender address:", bulkSender.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
