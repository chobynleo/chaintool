
const { expect, assert } = require("chai");
const { ethers, waffle } = require("hardhat");
const provider = waffle.provider;

let accounts, owner, myToken, bulkSender, standardToken, contractAddr;

async function init() {
  accounts = await ethers.getSigners();
  owner = accounts[0];

  //Contract MyToken
  let name = 'MyToken';
  const Contract = await hre.ethers.getContractFactory(name);
  let params = [];
  myToken = await Contract.deploy(...params);
  await myToken.deployed();
  //await contract.connect(owner).mint()
  // console.log(`${name} deployed to: ${contract.address}`);
  
  contractAddr = myToken.address.toLowerCase();
  console.log('====contractAddr====', contractAddr);

  //Contract BulkSender
  let _name = 'BulkSender';
  const _Contract = await hre.ethers.getContractFactory(_name);
  let _params = [];
  bulkSender = await _Contract.deploy(..._params);
  await bulkSender.deployed();

  //Contract StandardToken
  let _name_ = 'StandardToken';
  const _Contract_ = await hre.ethers.getContractFactory(_name_);
  let _params_ = [];
  standardToken = await _Contract_.deploy(..._params_);
  await standardToken.deployed();
}

describe("Bulktransfer", function () {

  beforeEach(async function () {
    await init();
    //let new_contract = contract.connect( providerOrSigner )
    //new ethers.ContractFactory ( abi , bytecode [ , signer] ).deploy();
  });

  describe("transfer ethers and tokens to several accounts", function () {

    it("发送相同数量ether给几个账户", async function () {
      console.log('====ownerAddr====', owner.address);
      const initialOwnerBalance = await standardToken.provider.getBalance(owner.address)
      console.log("====What's the number of initial balance?====", initialOwnerBalance)
      const initalAddr1Balance = await provider.getBalance(accounts[1].address);
      const initalAddr2Balance = await provider.getBalance(accounts[2].address);

      // Transfer 100 tokens from owner to addr1,addr2,addr3
      await bulkSender.connect(owner).bulkSendETHWithSameValue([accounts[1].address, accounts[2].address], 100, {
        value: 200,
      });

      //Check owner'balance
      const finalOwnerBalance = await standardToken.provider.getBalance(owner.address)
      console.log("====What's the number of final balance?====", finalOwnerBalance)

      //Check addresses's balances
      const finalAddr1Balance = await standardToken.provider.getBalance(accounts[1].address);
      const finalAddr2Balance = await standardToken.provider.getBalance(accounts[2].address);
      expect(initalAddr1Balance).to.equal(finalAddr1Balance.sub(100));
      expect(initalAddr2Balance).to.equal(finalAddr2Balance.sub(100));
    });

    it("发送不同数量ether给几个账户", async function () {
      console.log('====ownerAddr====', owner.address);
      const initialOwnerBalance = await standardToken.provider.getBalance(owner.address)
      console.log("====What's the number of initial balance?====", initialOwnerBalance)
      const initalAddr1Balance = await standardToken.provider.getBalance(accounts[1].address);
      const initalAddr2Balance = await standardToken.provider.getBalance(accounts[2].address);

      // Transfer 100 tokens from owner to addr1,addr2,addr3
      await bulkSender.connect(owner).bulkSendETHWithDifferentValue([accounts[1].address, accounts[2].address], [100,200], {
        value: 300,
      });

      //Check owner'balance
      const finalOwnerBalance = await standardToken.provider.getBalance(owner.address)
      console.log("====What's the number of final balance?====", finalOwnerBalance)

      //Check addresses's balances
      const finalAddr1Balance = await standardToken.provider.getBalance(accounts[1].address);
      const finalAddr2Balance = await standardToken.provider.getBalance(accounts[2].address);
      expect(initalAddr1Balance).to.equal(finalAddr1Balance.sub(100));
      expect(initalAddr2Balance).to.equal(finalAddr2Balance.sub(200));
    });

    it ("发送相同数量tokens给几个账户", async function () {
      console.log('====ownerAddr====', owner.address);
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      console.log("====What's the number?====", initialOwnerBalance)
      const initalAddr1Balance = await myToken.balanceOf(accounts[1].address);
      const initalAddr2Balance = await myToken.balanceOf(accounts[2].address);

      // Transfer 100 tokens from owner to addr1,addr2
      await myToken.connect(owner).approve(bulkSender.address, 10000);
      console.log("====What's the bulkSender address?====", bulkSender.address)
      await bulkSender.connect(owner).bulkSendCoinWithSameValue(myToken.address, [accounts[1].address, accounts[2].address], 100, {
        value: 200
      });

      //Check owner'balance
      const finalOwnerBalance = await myToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(200));
      console.log("====What's the number of balance?====", finalOwnerBalance)

      //Check addresses's balances
      const finalAddr1Balance = await myToken.balanceOf(accounts[1].address);
      const finalAddr2Balance = await myToken.balanceOf(accounts[2].address);
      expect(initalAddr1Balance).to.equal(finalAddr1Balance.sub(100));
      expect(initalAddr2Balance).to.equal(finalAddr2Balance.sub(100));
    });
    
    it ("发送不同数量tokens给几个账户", async function () {
      console.log('====ownerAddr====', owner.address);
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      console.log("====What's the number?====", initialOwnerBalance)
      const initalAddr1Balance = await myToken.balanceOf(accounts[1].address);
      const initalAddr2Balance = await myToken.balanceOf(accounts[2].address);

      // Transfer 100 tokens from owner to addr1,addr2
      await myToken.connect(owner).approve(bulkSender.address, 10000);
      console.log("====What's the bulkSender address?====", bulkSender.address)
      await bulkSender.connect(owner).bulkSendCoinWithDifferentValue(myToken.address, [accounts[1].address, accounts[2].address], [100, 200], {
        value: 300
      });

      //Check owner'balance
      const finalOwnerBalance = await myToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(300));
      console.log("====What's the number of balance?====", finalOwnerBalance)

      //Check addresses's balances
      const finalAddr1Balance = await myToken.balanceOf(accounts[1].address);
      const finalAddr2Balance = await myToken.balanceOf(accounts[2].address);
      expect(initalAddr1Balance).to.equal(finalAddr1Balance.sub(100));
      expect(initalAddr2Balance).to.equal(finalAddr2Balance.sub(200));
    });
  })
})