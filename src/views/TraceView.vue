<template>
  <div class="div-center">
      <el-link type="primary" @click="back" style="margin-bottom:22px;">
        <i class="el-icon-back"></i>返回
      </el-link>
      <div class="divItem">
        <h3>交易分析工具</h3>
        <p>欢迎使用交易分析工具，请填入区块链浏览器的URL</p>
      </div>
      <div class="divItem">
        <el-input clearable v-model="contractURL" placeholder="https://etherscan.io" style="width: 10px auto; margin-top: 5px"></el-input>
      </div>

      <div class="divItem">
        <div class="" style="font-size: 15px">Raw Traces</div>
        <el-input v-model="rawTraces" placeholder="请填入Raw traces " type="textarea" style="margin-top: 10px" :rows="7"></el-input>
      </div>

      <div class="MapArea divItem">
        <div>
          <div style="font-size: 15px">Address Map</div>
          <el-input v-model="addressMap" placeholder="请填入Address map" type="textarea" style="margin-top: 10px" :rows="7"></el-input>
          <el-link class="fill-linkbtn" @click="fillDemo0">例子1
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
          &emsp;&emsp;
          <el-link class="fill-linkbtn" @click="fillDemo1">例子2
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>

        <div>
          <div style="font-size: 15px">Function Map</div>
          <div>
            <el-input v-model="functionMap" type="textarea" placeholder="请填入Function map" style="margin-top: 10px" :rows="7"></el-input>
          </div>
          <div class="div-tracebtn">
            <el-button type="primary" @click="traceVisualization()" >Trace可视化</el-button>
          </div>
        </div>
      </div>

      <div class="tree-container divItem">
        <div style="font-size: 18px">Call Traces</div>
        <div class="sender"> 
          <template v-if="treeData">
            <a :href="contractURL +'/address/' + treeData[0].from" target="_blank">
              <span style="color: rgb(255 0 126);"> [Sender]:  </span>
              <span > {{ treeData[0].fromName }}</span>
            </a>
            </template>
        </div>
        <el-tree id="tree" ref="tree" node-key="id" :indent="0" :data="treeData">
          <span class="custom-tree-node" slot-scope="{ data }">
            <template v-if="data.init">
              <!-- 如果该交易为创建合约 -->
                <span class="inline-gas-block"> [{{ data.gasUsed }}] </span>
                <span class="inline-calltype-block"> &emsp;&emsp;{{ data.calltype }} </span>
                <span class="transfer-block" v-show="data.ETH">
                  &emsp;&emsp;{{ data.ETH }}ETH
                </span>
                <span class="addressName-block">  
                  &emsp;&emsp;
                  <a :href="contractURL +'/address/' + data.from" target="_blank" @click.stop> 
                    <span > {{ data.fromName }}</span>
                  </a>
                  .
                </span>
                <span class="methodName-block"> {{ data.function }} </span>
                <a :href="contractURL +'/address/' + data.output" target="_blank" @click.stop> 
                    <span class="outline-block" v-show="data.output">
                      &emsp;=>&emsp;({{ data.output }})
                    </span>
                </a>
            </template>

            <template v-else>
              <!-- 如果该交易为普通调用 -->
              <span class="inline-gas-block"> [{{ data.gasUsed }}] </span>
              <span class="inline-calltype-block"> &emsp;&emsp;{{ data.calltype }} </span>
              <span class="transfer-block" v-show="data.ETH">
                &emsp;&emsp;{{ data.ETH }}ETH
              </span>
              <span class="addressName-block">  
                &emsp;&emsp;
                <a :href="contractURL +'/address/' + data.to" target="_blank" @click.stop> 
                  <span > {{ data.toName }}</span>
                </a>
                .
              </span>
              <span class="methodName-block"> {{ data.function }} </span>
              <span>(</span>
              <span v-for="(item, index) of data.inputArg" :key="index">  
                <template v-if="index == 0">
                  <!-- 函数的第一个参数 -->
                  &emsp;

                  <template v-if="item[1] == null">
                    <!-- 如果item[0] == null表示无法解析abi，则直接输出item[2] -->
                    <template v-if="item[0] == 'address'">
                      <!-- 单个地址参数，带超链接 -->
                      <a :href="contractURL +'/address/' + item[3]" target="_blank" @click.stop>
                        <span > {{ item[2] }}</span>
                      </a>
                    </template>

                    <template v-else>
                      <!-- 其它类型参数，直接显示 -->
                      <span>{{item[2]}}</span>
                    </template>
                  </template>

                  <template v-else>
                    <!-- 能解析出abi -->
                    <template v-if="item[0] == 'address'">
                      <!-- 单个地址参数，带超链接 -->
                      <span class="arg-block">{{item[1]}}</span>
                      <span>:&emsp;</span>
                      <a :href="contractURL +'/address/' + item[3]" target="_blank" @click.stop>
                        <span > {{ item[2] }}</span>
                      </a>
                    </template>

                    <template v-else>
                      <!-- 其它类型参数，直接显示 -->
                      <span class="arg-block">{{item[1]}}</span>
                      <span>:&emsp;</span>
                      <span>{{item[2]}}</span>
                    </template>

                  </template>
                </template>

                <template v-else>
                  <!-- 函数的第n个参数，n >= 2 -->
                  <span>,&emsp;</span>
                  <!-- 能解析出abi -->
                    <template v-if="item[0] == 'address'">
                      <!-- 单个地址参数，带超链接 -->
                      <span class="arg-block">{{item[0]}}</span>
                      <span>:&emsp;</span>
                      <a :href="contractURL +'/address/' + item[3]" target="_blank" @click.stop>
                        <span > {{ item[2] }}</span>
                      </a>
                    </template>

                    <template v-else>
                      <!-- 其它类型参数，直接显示 -->
                      <span class="arg-block">{{item[1]}}</span>
                      <span>:&emsp;</span>
                      <span>{{item[2]}}</span>
                    </template>

                </template>
                </span>
                <span>&emsp;)</span>
                <!-- <span class="midline-block">  &emsp;&emsp;{{ data.functioncall }} </span> -->
                <span class="outline-block" v-show="data.output">
                  &emsp;=>&emsp;({{ data.output }})
                </span>
            </template>
          </span>
        </el-tree>
      </div>
    </div>
</template>

<script >
import { handleTreeStructure } from "../scripts/createObj";
import { generateTree } from "../scripts/generateTree";
import { contractURL, rawTracesStr_0, addressStr_0, functionStr_0, rawTracesStr_1 } from "../scripts/demoText";
import axios from 'axios';

export default {
  name: "buffer",
  data() {
    return {
      contractURL: null,
      rawTraces: null,
      addressMap: null,
      functionMap: null,
      treeData: null,
      senderLink:""
    };
  },

  methods: {
    // -------------------自动填充例子-------------------
    fillDemo0() {
      this.contractURL = contractURL;
      this.rawTraces = rawTracesStr_0;
      this.addressMap = addressStr_0;
      this.functionMap = functionStr_0;
    },

    fillDemo1() {
      this.contractURL = contractURL ;
      this.rawTraces = rawTracesStr_1;
      this.addressMap = "";
      this.functionMap = "";
    },

    // -------------------树的可视化-------------------
    async traceVisualization() {
      var rawTracesArea = this.rawTraces == null? "": String(this.rawTraces);
      var addressMapArea = this.addressMap == null? "": String(this.addressMap);
      var functionMapArea = this.functionMap == null? "": String(this.functionMap);

      if(
        this.checkRawTraces(rawTracesArea) && 
        this.checkMap("Address Map", addressMapArea) && 
        this.checkMap("Function Map", functionMapArea)
      ) {
        // 输入框检查通过
      } else {
        // 这里输入检查失败的场景
        return;
      }

      var resultRawTraces = JSON.parse('[' + this.rawTraces + ']');
      var resultAddressMap;
      var resultFunctionMap;

      try {
        await axios.post('/getMap', {data: JSON.stringify(resultRawTraces)}).then(res => {
          console.log(res)
          if(res.status == 200){
              this.$Message.success('成功');
              resultAddressMap = JSON.parse(res.data.resultAddressMap);
              resultFunctionMap = JSON.parse(res.data.resultFunctionMap);

              if(this.addressMap == null || this.addressMap == "") {
                this.addressMap = JSON.stringify(resultAddressMap);
              }

              if(this.functionMap == null || this.functionMap == "") {
                this.functionMap = JSON.stringify(resultFunctionMap);
              }

          } else {
              this.$Message.error('解析失败，请检查你的Raw Traces是否配置正确，请参考"例子"');
          }
        });
      } catch (error) {
        this.$Message.error('请求后台处理失败，程序进行本地解析...');
        console.log(error);
      }

      this.treeData = await generateTree(
            resultRawTraces,
            this.addressMap,
            this.functionMap,
            resultAddressMap,
            resultFunctionMap
      )

    },

    //--------------------返回主页---------------------
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },

    //--------------------检查RawTraces格式---------------------
    checkRawTraces(rawTracesArea) {
      if(!rawTracesArea.length) {
        this.$Message.error('Empty Raw Traces');
        return false;
      }
      var _rawTracesArea = '[' + rawTracesArea + ']'
      this.isJson("Raw Traces", _rawTracesArea)
      return true;
    },

    //--------------------检查Map格式---------------------
    checkMap(text, str) {
      if(str.length) {
        return this.isJson(text, str);
      }
      return true;
    },

    //--------------------检查是否为Json格式---------------------
    isJson(text, str) {
      if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                } else {
                    this.$Message.error(text + "不是有效的json格式");
                    return false;
                }
        
            } catch(e) {
                this.$Message.error(text + "不是有效的json格式");
                return false;
            }
        }
    }
   },
};
</script>

<style scoped>
.div-center {
  width: 250px auto;
  padding: 35px 35px 0 35px;
  box-sizing: border-box;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 15px;
  /* width:100%; */
  height:100%;
  overflow:scroll;
  overflow-x: hidden;
  overflow-y: scroll;
}
.div-tracebtn{
  margin-top:5px;
}

.sender {
  font-size: 16px;
  padding: 10px;
  margin-left: 30px;
}
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
.inline-gas-block {
  display: inline-block;
  font-style: italic;
  font-size: 16px;
}

.inline-calltype-block {
  display: inline-block;
  font-style: italic;
  color: rgb(229 0 238);
  font-size: 16px;
}

.transfer-block {
  display: inline-block;
  font-style: italic;
  color: rgb(169 70 70);
  font-size: 16px;
}
.methodName-block {
  display: inline-block;
  font-style: italic;
  color: darkorange;
  font-size: 16px;
}
.addressName-block {
  display: inline-block;
  font-style: italic;
  font-size: 16px;
}
.arg-block {
  display: inline-block;
  font-style: italic;
  color: darkgreen;
  font-size: 16px;
}
.midline-block {
  display: inline-block;
  font-style: italic;
  color: rgb(0, 208, 255);
  font-size: 16px;
}
.outline-block {
  font-size: 16px;
  float: right;
  font-style: italic;
  color: blue;
}
.tree-container /deep/ .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.tree-container /deep/ .el-icon-caret-right:before {
  content: "\e791";
  font-size: 18px;
}

.tree-container /deep/ .el-tree-node__expand-icon {
  margin-left: 15px;
  padding: 0px;
}

.tree-container /deep/ .el-tree-node__expand-icon.is-leaf {
  margin-left: 0px;
}

.tree-container /deep/ .el-tree-node {
  position: relative;
  padding-left: 16px;
}

.tree-container /deep/ .el-tree-node__children {
  padding-left: 16px;
}

.tree-container /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}
.tree-container /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree-container /deep/ .el-tree-node:before {
  content: "";
  left: 10px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree-container /deep/ .el-tree-node:after {
  content: "";
  left: 10px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree-container /deep/ .el-tree-node:before {
  border-left: 1px solid #e6e6e6;
  bottom: 0px;
  height: 100%;
  top: -19px;
  width: 1px;
}

.tree-container /deep/ .el-tree-node:after {
  border-top: 1px solid #e6e6e6;
  height: 25px;
  top: 20px;
  width: 20px;
}

.el-tree-node :last-child:before {
  height: 40px;
}

/* .tree-container {
  margin: 10px;
} */
.tree-container /deep/ .el-tree .el-tree-node {
  position: relative;
}
.tree-container /deep/ .el-tree-node .el-tree-node__content {
  height: 40px;
  padding-left: 18px;
}
.tree-container /deep/ .el-tree-node .el-tree-node__content::before {
  border-left: 1px solid #e6e6e6;
  height: 100%;
  top: 0;
  width: 1px;
  margin-left: 1px;
  margin-top: 0px;
  z-index: 8;
}
.tree-container
  /deep/
  .el-tree-node
  .el-tree-node__children
  .el-tree-node__content::before {
  border-left: 0px solid #e6e6e6;
  height: 100%;
  top: 0;
  width: 1px;
  margin-left: 1px;
  margin-top: 0px;
  z-index: 8;
}

.tree-container /deep/ .el-tree-node .el-tree-node__content::after {
  border-top: 1px solid #e6e6e6;
  height: 1px;
  top: 18px;
  width: 13px;
  margin-left: 1px;
  z-index: 8;
}

.tree-container
  /deep/
  .el-tree-node
  .el-tree-node__children
  .el-tree-node__content::after {
  border-top: 0px solid #e6e6e6;
}

.tree-container .el-tree-node .el-tree-node__content::before,
.tree-container .el-tree-node .el-tree-node__content::after {
  content: "";
  position: absolute;
  right: auto;
}

.MapArea{
  display: flex;
  width:100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.divItem{
  margin-bottom:22px;
  width:100%;
}


.fill-linkbtn{
  margin-top:13px;
}

.MapArea > div {
  width:49%;
}

/deep/ .el-textarea__inner{
  height:200px;
}
</style>