<template>
    <div>
        <el-form label-width="0" class="login-box " >
            <el-link type="primary" @click="back" class="backbtn">
                <i class="el-icon-back"></i>返回
            </el-link>

            <el-form-item >
                <h3>以太币单位转换</h3>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Wei</label>
                <el-input type="number" v-model="content.inputWei" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputWei"
                id="copytextWei"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Kwei</label>
                <el-input type="number" v-model="content.inputKwei" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputKwei"
                id="copytextKwei"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Mwei</label>
                <el-input type="number" v-model="content.inputMwei" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputMwei"
                id="copytextMwei"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Gwei</label>
                <el-input type="number" v-model="content.inputGwei" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputGwei"
                id="copytextGwei"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Szabo</label>
                <el-input type="number" v-model="content.inputSzabo" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputSzabo"
                id="copytextSzabo"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Finney</label>
                <el-input type="number" v-model="content.inputFinney" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputFinney"
                id="copytextFinney"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Ether</label>
                <el-input type="number" v-model="content.inputEther" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputEther"
                id="copytextEther"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Kether</label>
                <el-input type="number" v-model="content.inputKether" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputKether"
                id="copytextKether"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <label class="labeltitle">Mether</label>
                <el-input type="number" v-model="content.inputMether" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputMether"
                id="copytextMether"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

                <el-form-item >
                <label class="labeltitle">Gether</label>
                <el-input type="number" v-model="content.inputGether" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputGether"
                id="copytextGether"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

                <el-form-item >
                <label type="number" class="labeltitle">Tether</label>
                <el-input v-model="content.inputTether" style="width:300px;" ></el-input>
                <el-button plain
                type="primary"
                :data-clipboard-text="content.inputTether"
                id="copytextTether"
                @click="copy"
                class="btn">复制</el-button>
            </el-form-item>

            <el-form-item >
                <span>以太币的最小单位是Wei，1个ETH等于10的18次方Wei。在支付Gas费时大家习惯使用Gwei作为展示单位，日常使用的单位是ETH、Gwei 和 Wei；</span>
                <span>以太坊 Ethereum 和以太币 Ether 的区别：</span>
                <span>以太坊 Ethereum 是一个允许任何人在其上创建和使用分布式应用的开放的区块链平台。</span>
                <span>以太币 Ether 是以太坊 Ethereum 中通用的货币，它主要用于支付转账及执行智能合约所消耗的汽油(Gas)，在交易中以太币被缩写为ETH；</span>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { ethers } from 'ethers'
import Clipboard from 'clipboard'
// eslint-disable-next-line
/* eslint-disable */
export default {
    name: 'unitconvert',
    data() {
        return {
            // 对用户输入的数据初始化
            content: {
                inputWei: '',
                inputKwei: '',
                inputMwei: '',
                inputGwei: '',
                inputSzabo: '',
                inputFinney: '',
                inputEther: '',
                inputKether: '',
                inputMether: '',
                inputGether: '',
                inputTether: '',
            },
        }
    },

    methods: {
        copy(e) {
            const copyparam = '#' + e.currentTarget.id
            const clipboard = new Clipboard(copyparam)
            clipboard.on('success', () => {
                const h = this.$createElement;
                this.$message({
                message: h('span',null,'复制成功')
                });
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                // 不支持复制
                console.log('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
            })
        },
        deldempoint(weiString){
            if(weiString.indexOf(".0") === weiString.length -2){
                    return weiString.replace(".0","")
                }
                else {
                    return weiString
                }
        },
        convertWei(inputAmount ,inputIndex){
            if(inputIndex != 'inputwei'){
                const wei = ethers.utils.formatUnits(inputAmount, 0)
                this.content.inputWei = this.deldempoint(wei)
            }

            if(inputIndex != 'inputkwei'){
                const kwei = ethers.utils.formatUnits(inputAmount, 3)
                this.content.inputKwei = this.deldempoint(kwei)
            }

            if(inputIndex != 'inputmwei'){
                const mwei = ethers.utils.formatUnits(inputAmount, 6)
                this.content.inputMwei = this.deldempoint(mwei)
            }

            if(inputIndex != 'inputgwei'){
                const gwei = ethers.utils.formatUnits(inputAmount, 9)
                this.content.inputGwei = this.deldempoint(gwei)
            }

            if(inputIndex != 'inputszabo'){
                const szabo = ethers.utils.formatUnits(inputAmount, 12)
                this.content.inputSzabo = this.deldempoint(szabo)
            }

            if(inputIndex != 'inputfinney'){
                const finney = ethers.utils.formatUnits(inputAmount, 15)
                this.content.inputFinney = this.deldempoint(finney)
            }

            if(inputIndex != 'inputether'){
                const ether = ethers.utils.formatUnits(inputAmount, 18)
                this.content.inputEther = this.deldempoint(ether)
            }

            if(inputIndex != 'inputkether'){
                const kether = ethers.utils.formatUnits(inputAmount, 21)
                this.content.inputKether = this.deldempoint(kether)
            }

            if(inputIndex != 'inputmether'){
                const mether = ethers.utils.formatUnits(inputAmount, 24)
                this.content.inputMether = this.deldempoint(mether)
            }

            if(inputIndex != 'inputgether'){
                const gether = ethers.utils.formatUnits(inputAmount, 27)
                this.content.inputGether = this.deldempoint(gether)
            }

            if(inputIndex != 'inputtether'){
                const tether = ethers.utils.formatUnits(inputAmount, 30)
                this.content.inputTether = this.deldempoint(tether)
            }
        },
        back(){
            if (window.history.length <= 1) {
                this.$router.push({path:'/home'})
                return false
            } else {
                this.$router.go(-1)
            }
        },
    },
    watch: {
        'content.inputWei': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputWei, 0)
                this.convertWei((this.content.inputWei),'inputwei')
            },
        },
        'content.inputKwei': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputKwei, 3)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputkwei')
            },
        },
        'content.inputMwei': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputMwei, 6)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputmwei')
            },
        },
        'content.inputGwei': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputGwei, 9)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputgwei')
            },
        },
        'content.inputSzabo': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputSzabo, 12)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputszabo')
            },
        },
        'content.inputFinney': {
            handler() {
                let weiAmount = ethers.utils.parseUnits(this.content.inputFinney, 15)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputfinney')
            },
        },
        'content.inputEther': {
            handler() {
                // console.log("7 ->"+this.content.inputFinney)
                let weiAmount = ethers.utils.parseUnits(this.content.inputEther, 18)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputether')
            },
        },
        'content.inputKether': {
            handler() {
                // console.log("8 ->"+this.content.inputKether)
                let weiAmount = ethers.utils.parseUnits(this.content.inputKether, 21)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputkether')
            },
        },
        'content.inputMether': {
            handler() {
                // console.log("9 ->"+this.content.inputKether)
                let weiAmount = ethers.utils.parseUnits(this.content.inputMether, 24)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputmether')
            },
        },
        'content.inputGether': {
            handler() {
                // console.log("10 ->"+this.content.inputGether)
                let weiAmount = ethers.utils.parseUnits(this.content.inputGether, 27)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputgether')
            },
        },
        'content.inputTether': {
            handler() {
                // console.log("11 ->"+this.content.inputTether)
                let weiAmount = ethers.utils.parseUnits(this.content.inputTether, 30)
                this.convertWei(ethers.BigNumber.from(weiAmount),'inputtether')
            },
        },
    },
}
</script>

<style scoped>
.login-box {
    border: 1px solid #DCDFE6;
    width: 750px;
    margin: 100px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .btn{
      margin-left:15px;
  }

  .labeltitle{
      display:inline-block;width:50px;
  }

  .backbtn{
      margin:10px,10px
  }
</style>
