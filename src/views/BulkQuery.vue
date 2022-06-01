<template>
  <div class="div-center" style="display: block">
    <el-form label-width="10" class="login-box">
      <el-link type="primary" @click="back" class="backbtn">
        <i class="el-icon-back"></i>返回
      </el-link>
      <br />
      <br />
      <el-form-item>
        <h3>批量查询工具</h3>
        <p>欢迎使用批量查询工具，请提供代币合约地址以及查询地址和数量</p>
      </el-form-item>
      <el-form-item>
        <div>
          <label class="labeltitle">网络地址</label>
          <el-select v-model="value" placeholder="请选择" style="width: 500px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          style="
            color: #de3529;
            margin-top: 0px;
            margin-bottom: 0px;
            font-size: 14px;
          "
        >
          <span class="el-icon-s-flag">
            钱包查询过程均在本地完成，无法获取到助记词及私钥！</span
          >
        </div>
        <div>
          <label class="labeltitle">代币合约地址</label>
          <el-input
            clearable
            v-model="tokenAddress"
            placeholder="请输入代币地址（默认ETH）"
            style="width: 400px; margin-top: 5px"
          ></el-input>
        </div>
      </el-form-item>
      <div class="width: 420px">请输入钱包地址</div>
      <el-row :gutter="20">
        <el-col :span="15">
          <div>
            <el-input
              v-model="walletlist"
              type="textarea"
              placeholder="请输入钱包地址，多个钱包地址请换行"
              style="margin-top: 10px"
              :rows="7"
            ></el-input>
          </div>
        </el-col>
        <el-col
          :span="5"
          style="margin-top: 100px; margin-bottom: 0px; font-size: 14px"
        >
          <div
            style="
              margin-top: -30px;
              margin-bottom: 10px;
              margin-left: 50px;
              font-size: 14px;
            "
          >
            <el-link
              >例子<i
                class="el-icon-view el-icon--right"
                style="margin-top: 15px"
                @click="fill"
              ></i>
            </el-link>
          </div>
          <div>
            <div v-if="!tokenAddress">
              <div v-if="wallet_arr.length == 0">
                <el-button
                  type="primary"
                  class="btn"
                  style="margin-top: 15px"
                  @click="searchWallet()"
                  >查询钱包Eth</el-button
                >
              </div>
              <div v-else>
                <el-button
                  type="primary"
                  class="btn"
                  style="margin-top: 15px"
                  @click="searchWallet()"
                  >查询钱包Eth</el-button
                >
              </div>
            </div>
            <div v-else>
              <div v-if="wallet_arr.length == 0">
                <el-button
                  type="primary"
                  class="btn"
                  style="margin-top: 15px"
                  @click="searchTokenWallet()"
                  >查询钱包Token</el-button
                >
              </div>
              <div v-else>
                <el-button
                  type="primary"
                  class="btn"
                  style="margin-top: 15px"
                  @click="searchTokenWallet()"
                  >查询钱包Token</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-col :span="20">
        <el-table
          v-if="wallet_arr.length !== 0"
          id="exportTab"
          :data="wallet_arr"
          height="800"
          border
          style="width: 100%; margin-top: 15px"
        >
          <template>
            <p v-if="tokenAddress == 0">
              <el-table-column prop="address" label="钱包地址" width="375">
              </el-table-column>
              <el-table-column prop="balance" label="账号余额">
              </el-table-column>
            </p>
            <p v-else>
              <el-table-column prop="address" label="钱包地址" width="375">
              </el-table-column>
              <el-table-column prop="balance" label="账号余额">
              </el-table-column>
            </p>
          </template>
        </el-table>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import Web3 from "web3";
import { ethers } from "ethers";
//import ExportExcel from './components/ExportExcel.vue'

export default {
  name: "WalletBalance",
  components: {
    //ExportExcel,
  },

  data() {
    return {
      walletnum: "",
      web3: "",
      wallet_arr: [],
      options: [
        {
          value:
            "https://ropsten.infura.io/v3/eef56774b0204e9abc23fef1847db296",
          label: "Ropsten测试网",
        },
        {
          value:
            "https://mainnet.infura.io/v3/eef56774b0204e9abc23fef1847db296",
          label: "Ethereum主网",
        },
        {
          value: "https://bsc-dataseed3.binance.org",
          label: "BNB Chain币安链",
        },
      ],
      value: "",
      walletlist: null,
      swallet: null,
      balance: null,
      humanread: null,
      tokenAddress: null,
    };
  },

  async created() {
    await this.initAccount();
    await this.initContract();
  },

  methods: {
    // ----------初始化账户-------------
    async initAccount() {
      if (window.ethereum) {
        console.log(window.ethereum);
        try {
          this.accounts = await window.ethereum.enable();
          console.log("accounts:" + this.accounts);
          this.account = this.accounts[0];
          this.provider = window.ethereum;
          this.signer = new ethers.providers.Web3Provider(
            this.provider
          ).getSigner();
          this.chainId = parseInt(
            await window.ethereum.request({ method: "eth_chainId" })
          );
        } catch (error) {
          console.log("User denied account access", error);
        }
      } else {
        console.log("Need install MetaMask");
      }
      console.log("Verify Accounts!");
      console.log(this.accounts.toString());
    },

    // ------------获取abi和地址--------------
    getContract(ContractName) {
      const addr = require(`../../deployments/${chainId}/${ContractName}.json`);
      const abi = require(`../../deployments/abi/${ContractName}.json`);

      console.log("getContract:_addr", addr);
      console.log("getContract:_abi", abi);

      return new ethers.Contract(
        addr.address,
        abi,
        new ethers.providers.Web3Provider(this.provider).getSigner()
      );
    },

    //  ---------初始化合约实例-------------
    async initContract() {
      console.log("===============initContract===========");

      const _addr = require(`../../deployments/${chainId}/MyToken.json`);
      const _abi = require(`../../deployments/abi/MyToken.json`);
      console.log("MyToken's address", _addr);
      console.log("MyToken's abi", _abi);

      this.myTokenContract = new ethers.Contract(
        _addr.address,
        _abi,
        new ethers.providers.Web3Provider(this.provider).getSigner()
      );
    },

    //-----------------自动填充例子------------------
    fill() {
      this.walletlist =
        "0x1154b7579156EcD9AE2b24DA931f6fD3b42D5A5B\n0x2da9d57C02C1Cd3520DA85caC1F85d8747Bf8474\n0x6cc67A6D136ED539d6505C545240Cf99aD1396fB";
    },

    // -------------返回主页-------------
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },

    // -----------------步骤条--------------
    next() {
      if (this.active++ > 2) this.active = 0;
    },

    // -------------select标签的change事件------------
    changeSelection(val) {
			let optionsImg = this.optionsImg,
				i = optionsImg.findIndex((item) => item.label == val);
			this.$refs["refSelect"]
			.$el.children[0]
			.children[0]
			.setAttribute(
				"style",
				`
				background: url(${optionsImg[i].valueImg}) no-repeat; 
				background-position: 10px center; 
				background-size: 20px 20px; 
				text-indent: 30px;
				`
			);
		},

    //---------------查询钱包余额---------------
    async searchWallet() {
      const web3provider = this.value;
      window.web3 = new Web3(web3provider);
      this.web3 = new Web3(web3provider);

      // eslint-disable-next-line no-empty
      if (this.walletlist === "") {
        this.$message.error("钱包地址不能为空");
      }

      // this.walletlist = this.walletlist.replace(/[\uFF0C]/g, ",");
      // const add_list = this.walletlist.split(",");
      const add_list = this.walletlist.split(/[(\r\n)\r\n]+/);

      for (const swallet of add_list) {
        const balance = await this.web3.eth.getBalance(swallet);
        const humanread = await this.web3.utils.fromWei(balance); // if want to return eth use fromWei(balance, 'ether')
        this.wallet_arr.push({
          address: swallet,
          balance: humanread,
        });
      }
    },
    //-----------查询代币余额-----------
    async searchTokenWallet() {
      const web3provider = this.value;
      window.web3 = new Web3(web3provider);
      this.web3 = new Web3(web3provider);

      var contractAbi = [
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "tokenOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          constant: false,
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "_totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "address",
              name: "tokenOwner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "remaining",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "address",
              name: "tokenOwner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "b",
              type: "uint256",
            },
          ],
          name: "safeAdd",
          outputs: [
            {
              internalType: "uint256",
              name: "c",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "b",
              type: "uint256",
            },
          ],
          name: "safeDiv",
          outputs: [
            {
              internalType: "uint256",
              name: "c",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "b",
              type: "uint256",
            },
          ],
          name: "safeMul",
          outputs: [
            {
              internalType: "uint256",
              name: "c",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              internalType: "uint256",
              name: "a",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "b",
              type: "uint256",
            },
          ],
          name: "safeSub",
          outputs: [
            {
              internalType: "uint256",
              name: "c",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ];

      //var contractAddress = "0x336ECdD42D6BD340b625aE2589b0070Fc1f7D072";
      var contractAddress = this.tokenAddress;
      console.log("contractAddress", contractAddress);
      var currentAccount = "0x57955d69d0e301370392d49fbFCD0122d3E0Ff4b";
      let myContract = new web3.eth.Contract(contractAbi, contractAddress, {
        from: currentAccount, // default from_address
      });
      console.log("My contract", myContract);

      this.add_list = this.walletlist.split(/[(\r\n)\r\n]+/);

      for (this.swallet of this.add_list) {
        console.log("what's the swallet??", this.swallet);
        this.balance = await myContract.methods
          .balanceOf(this.swallet)
          .call({ from: this.swallet });
        console.log("what's the balance?", this.balance);
        this.humanread = await this.web3.utils.fromWei(this.balance); // if want to return eth use fromWei(balance, 'ether')
        this.wallet_arr.push({
          address: this.swallet,
          balance: this.humanread,
        });
      }
    },
  },
};
</script>

<style>
.login-box {
  border: 2px solid #d0d3db;
  width: 750px;
  margin: 100px auto;
  padding: 35px 35px 35px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 15px;
  box-shadow: 0 0 25px #8b92a1;
}

.btn {
  margin-left: 15px;
}

.labeltitle {
  display: inline-block;
  width: 300px;
}

.backbtn {
  margin: 10px, 10px;
}

.div-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  padding: 10px 25px 25px 35px;
  border-radius: 10px;
}

::placeholder {
  font-size: 1.1em;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.option_box {
  display: flex;
  align-items: center;
}
.option_img {
  width: 25px;
  height: 25px;
  margin-right: 7px;
}
</style>