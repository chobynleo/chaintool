<template>
  <div class="div-center">
    <el-form label-width="10" class="login-box">
      <el-link type="primary" @click="back" class="backbtn">
        <i class="el-icon-back"></i>返回
      </el-link>
      <br />
      <br />
      <el-form-item>
        <h3>批量转账工具</h3>
        <p>欢迎使用批量转账工具，请提供代币合约地址以及转账地址和数量</p>
      </el-form-item>

      <el-form-item>
        <div>
          <vue-metamask userMessage="msg" @onComplete="onComplete">
          </vue-metamask>
          <label class="labeltitle">代币合约地址</label>
          <el-input
            clearable
            v-model="tokenAddress"
            placeholder="请输入代币地址（默认ETH）"
            style="width: 400px; margin-top: 5px"
          ></el-input>
          <div v-if="approveNum > 0">
            <div
              style="
                color: #de3529;
                margin-top: 0px;
                margin-bottom: 0px;
                font-size: 14px;
              "
            >
              您已授权，无需授权！！！
            </div>
          </div>
          <div v-else>
            <el-button
              style="margin-top: 15px"
              type="primary"
              @click="tokenApproved()"
              class="btn"
              >授权代币合约</el-button
            >
          </div>
        </div>
      </el-form-item>

      <div class="width: 420px">输入转账数量和地址</div>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input
            v-model="toDiff"
            placeholder="请输入转账地址"
            type="textarea"
            style="margin-top: 10px"
            :rows="7"
          ></el-input>
          <div
            style="
              color: #de3529;
              margin-top: 10px;
              margin-bottom: 10px;
              font-size: 14px;
            "
          >
            多个数量及多个收款地址请换行！！！
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-input
              v-model="inputValue"
              type="textarea"
              placeholder="转账数量"
              style="margin-top: 10px"
              :rows="7"
            ></el-input>
          </div>
          <div style="margin-top: 10px; margin-bottom: 10px; font-size: 14px">
            <el-link sty
              >例子<i class="el-icon-view el-icon--right" @click="fill"></i>
            </el-link>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-form-item>
        <div>
          <div v-if="!tokenAddress">
            <div v-if="arrayValue.length >= 2">
              <el-button
                type="primary"
                class="btn"
                style="margin-top: 0px"
                @click="bulkSendETHDiff(toDiff, inputValue)"
                >发送不同数量Eth</el-button
              >
            </div>
            <div v-else>
              <el-button
                type="primary"
                class="btn"
                style="margin-top: 0px"
                @click="bulkSendETHSame(toDiff)"
                >发送相同数量Eth</el-button
              >
            </div>
          </div>
          <div v-else>
            <div v-if="arrayValue.length >= 2">
              <el-button
                type="primary"
                class="btn"
                style="margin-top: 0px"
                @click="bulkSendTokenDiff(toDiff, inputValue)"
                >发送不同数量Token</el-button
              >
            </div>
            <div v-else>
              <el-button
                type="primary"
                class="btn"
                style="margin-top: 0px"
                @click="bulkSendTokenSame(toDiff)"
                >发送相同数量Token</el-button
              >
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import { ethers } from "ethers";
import VueMetamask from "vue-metamask";
import { BigNumber } from "bignumber.js";

export default {
  name: "buffer",
  components: {
    VueMetamask,
  },
  data() {
    return {
      name: null,
      symbol: null,
      decimal: null,
      approveNum: "",
      arrayValue: [],
      inputValue: "",
      toDiff: null,
      tokenAddress: null,
      arrayValueSplit: [],
      msg: "This is demo net work",
    };
  },
  watch: {
    inputValue(inputValue) {
      this.arrayValue = inputValue.split(/[(\r\n)\r\n]+/);
      this.arrayValueSplit = inputValue.split(/[(\r\n)\r\n]+/);
    },
  },

  async created() {
    await this.initAccount();
    await this.initContract();
    await this.getContractInfo();
    await this.checkTokenApproved();
  },

  methods: {
    //--------import vue-metamask--------
    onComplete(data) {
      console.log("data:", data);
    },

    //---------自动填充例子-------------
    fill() {
      this.inputValue = "30\n20\n18";
      this.toDiff =
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

    // ----------初始化账户-------------
    async initAccount() {
      if (window.ethereum) {
        console.log(window.ethereum);
        try {
          this.accounts = await window.ethereum.enable();
          console.log("accounts:" + this.accounts);
          this.account = this.accounts[0];
          //  this.provider = new ethers.providers.Web3Provider(window.ethereum);
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

      const _addr_ = require(`../../deployments/${chainId}/BulkSender.json`);
      const _abi_ = require(`../../deployments/abi/BulkSender.json`);
      console.log("BulkSender's address", _addr_);
      console.log("BulkSender's abi", _abi_);

      this.myTokenContract = new ethers.Contract(
        _addr.address,
        _abi,
        new ethers.providers.Web3Provider(this.provider).getSigner()
      );
      this.bulkSenderContract = new ethers.Contract(
        _addr_.address,
        _abi_,
        new ethers.providers.Web3Provider(this.provider).getSigner()
      );
    },

    // ----------代币基本信息------------
    async getContractInfo() {
      this.name = await this.myTokenContract.name();
      this.symbol = await this.myTokenContract.symbol();
      this.decimal = await this.myTokenContract.decimals();
      console.log("What's the decimals of contract?", this.decimal);
    },

    // ----------给Token授权-----------
    async tokenApproved() {
      console.log(
        "Get TokenAddress approving...",
        this.bulkSenderContract.address,
        ethers.BigNumber.from(1000000).mul(
          ethers.BigNumber.from(10).pow(this.decimal)
        )
      );
      await this.myTokenContract.approve(
        this.bulkSenderContract.address,
        ethers.BigNumber.from(1000000).mul(
          ethers.BigNumber.from(10).pow(this.decimal)
        )
      );
      console.log("TokenAddress is approved!");
    },

    async checkTokenApproved() {
      console.log(
        "function check parameter",
        this.accounts,
        this.bulkSenderContract.address
      );
      let approveNum = await this.myTokenContract.allowance(
        this.accounts[0],
        this.bulkSenderContract.address
      );
      this.approveNum = ethers.BigNumber.from(approveNum).mul(
        ethers.BigNumber.from(10).pow(this.decimal)
      );
      console.log(
        "balance of approve for contract",
        ethers.BigNumber.from(approveNum)
          .mul(ethers.BigNumber.from(10).pow(this.decimal))
          .toString()
      );
    },

    //-----------Bulktransfer的四种方法---------
    //-------------发送不同数量的ETH-------------
    async bulkSendETHDiff(toDiff) {
      console.log("Diff ETH Transfering");

      // 遍历inputValueSplit判断数组是否都小于18位
      console.log("what's result of arrayValueSplit??", this.arrayValueSplit);
      this.arrayValueSplit.forEach((item, index) => {
        this.arrayValueSplit[index] = item.split(".");
        console.log("what's result of arrayValueSplit[index]??", this.arrayValueSplit[index]);
        console.log("what's result of arrayValueSplit??", this.arrayValueSplit);
        //遍历arrayAddress判断数组是否都没超过18;
        this.arrayValueSplit.every(() => {
          if (this.arrayValueSplit[index].length > 17) {
            this.$swal({
              title: "小数位超过18!",
              text: "请确保您在输入中设置了正确的位数",
              confirmButtonText: "好的",
            });
          }
          return true;
        });
      });

      let arrayAddress = toDiff.split(/[(\r\n)\r\n]+/);
      console.log("the split result is", toDiff);
      console.log("the split result of arrayValue", this.arrayValue);

      // if判断打款数量是否为空
      if (this.inputValue == "") {
        this.$swal({
          title: "转账数量为空!",
          text: "请确保您在输入中设置了正确的数量",
          confirmButtonText: "好的",
        });
      }
      // if判断地址和数量长度是否相等
      if (this.arrayValue.length !== arrayAddress.length) {
        this.$swal({
          title: "转账地址和数量不一致",
          text: "请重新输入!",
          confirmButtonText: "好的",
        });
      }
      // 遍历arrayAddress判断数组是否都是地址
      arrayAddress.every((arrayAddress) => {
        if (!ethers.utils.isAddress(arrayAddress)) {
          this.$swal({
            title: "转账地址为空或不是地址!",
            text: "请确保您在输入中设置了正确的地址",
            confirmButtonText: "好的",
          });
        }
        return true;
      });

      this.arrayValue.forEach((item, index) => {
        this.arrayValue[index] = ethers.BigNumber.from(
          new BigNumber(item).times(new BigNumber(10).pow(18)).toString()
        );
        console.log("what's result here??????");
      }),
        console.log("what's bigNum now?", this.arrayValue);

      let totalValue = this.sumArr(this.arrayValue);
      console.log("the result of sumArr", totalValue.toString());

      try {
        await this.bulkSenderContract.bulkSendETHWithDifferentValue(
          arrayAddress,
          this.arrayValue,
          {
            value: ethers.BigNumber.from(totalValue.toString()),
          }
        );
        console.log("Diff ETH Transfer successful!");
      } catch (error) {
        console.log("Diff ETH Transfer failed!", error);
      }
    },

    //-------------发送相同数量的ETH-------------
    async bulkSendETHSame(toDiff) {
      // if判断打款数量是否为空
      if (this.inputValue == "") {
        this.$swal({
          title: "转账数量为空!",
          text: "请确保您在输入中设置了正确的数量",
          confirmButtonText: "好的",
        });
      }
      console.log("Same ETH Transfering");
      let arrayAddress = toDiff.split(/[(\r\n)\r\n]+/);
      console.log("the split result is", toDiff);

      let totalValue = ethers.BigNumber.from(
        ethers.BigNumber.from(
          new BigNumber(arrayAddress.length).toString()
        ).mul(
          ethers.BigNumber.from(
            new BigNumber(this.inputValue)
              .times(new BigNumber(10).pow(18))
              .toString()
          )
        )
      );
      console.log("what's total now?", totalValue);

      // 遍历arrayAddress判断数组是否都是地址
      arrayAddress.every((arrayAddress) => {
        if (!ethers.utils.isAddress(arrayAddress)) {
          this.$swal({
            title: "转账地址为空或不是地址!",
            text: "请确保您在输入中设置了正确的地址",
            confirmButtonText: "好的",
          });
        }
        return true;
      });

      try {
        await this.bulkSenderContract.bulkSendETHWithSameValue(
          arrayAddress,
          ethers.BigNumber.from(
            new BigNumber(this.inputValue)
              .times(new BigNumber(10).pow(18))
              .toString()
          ),
          {
            value: ethers.BigNumber.from(totalValue.toString()),
          }
        );
        console.log("Same ETH Transfer successful!");
      } catch (error) {
        console.log("Same ETH Transfer failed!", error);
      }
    },

    //------------累加数组----------------
    sumArr(arr) {
      var sum = ethers.BigNumber.from(0);
      for (var i = 0; i < arr.length; i++) {
        sum = sum.add(arr[i]);
      }
      return sum;
    },

    //-------------发送不同数量的Token-------------
    async bulkSendTokenDiff(toDiff) {
      // if判断token地址是否正确且不为空
      if (
        this.tokenAddress == "" ||
        !ethers.utils.isAddress(this.tokenAddress)
      ) {
        this.$swal({
          title: "代币合约地址为空或不是地址!",
          text: "请确保您在输入中设置了正确的地址",
          confirmButtonText: "好的",
        });
      }
      console.log("Diff Token Transfering");
      let arrayAddress = toDiff.split(/[(\r\n)\r\n]+/);
      console.log("the split result is", toDiff);
      console.log("the string split result is", this.arrayValue);

      this.arrayValue.forEach((item, index) => {
        this.arrayValue[index] = ethers.BigNumber.from(
          new BigNumber(item)
            .times(new BigNumber(10).pow(this.decimal))
            .toString()
        );
        console.log("what's result here??????");
      });

      let totalValue = this.sumArr(this.arrayValue);
      console.log("the result of sumArr", totalValue);

      // if判断地址和数量长度是否相等
      if (this.arrayValue.length !== arrayAddress.length) {
        this.$swal({
          title: "地址和数量不一致",
          text: "请重新输入!",
          confirmButtonText: "好的",
        });
      }
      // 遍历arrayAddress判断数组是否都是地址
      arrayAddress.every((arrayAddress) => {
        if (!ethers.utils.isAddress(arrayAddress)) {
          this.$swal({
            title: "转账地址为空或不是地址!",
            text: "请确保您在输入中设置了正确的地址",
            confirmButtonText: "好的",
          });
        }
        return true;
      }),
        await this.bulkSenderContract.bulkSendCoinWithDifferentValue(
          this.tokenAddress,
          arrayAddress,
          this.arrayValue
        );
      console.log("Diff Token Transfer successful!");
    },

    //-------------发送相同数量的Token-------------
    async bulkSendTokenSame(toDiff) {
      // if判断token地址是否正确且不为空
      if (
        this.tokenAddress == "" ||
        !ethers.utils.isAddress(this.tokenAddress)
      ) {
        this.$swal({
          title: "代币合约地址为空或不是地址!",
          text: "请确保您在输入中设置了正确的地址",
          confirmButtonText: "好的",
        });
      }
      // if判断打款数量是否为空
      if (this.inputValue == "") {
        this.$swal({
          title: "转账数量为空!",
          text: "请确保您在输入中设置了正确的数量",
          confirmButtonText: "好的",
        });
      }
      console.log("Same Token Transfering");
      let arrayAddress = toDiff.split(/[(\r\n)\r\n]+/);
      console.log("the split result is", toDiff);
      // 遍历arrayAddress判断数组是否都是地址
      arrayAddress.every((arrayAddress) => {
        if (!ethers.utils.isAddress(arrayAddress)) {
          this.$swal({
            title: "转账地址为空或不是地址!",
            text: "请确保您在输入中设置了正确的地址",
            confirmButtonText: "好的",
          });
        }
        return true;
      });

      await this.bulkSenderContract.bulkSendCoinWithSameValue(
        this.tokenAddress,
        arrayAddress,
        ethers.BigNumber.from(
          new BigNumber(this.inputValue)
            .times(new BigNumber(10).pow(this.decimal))
            .toString()
        )
      );
      console.log("Same Token Transfer successful!");
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
  width: 100px;
}

.backbtn {
  margin: 10px, 10px;
}

.div-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-55%);
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
</style>