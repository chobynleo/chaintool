# Contributing to the ChainTool 🥞

## Setup

1. Install the dependencies

```shell
yarn
```
- "交易分析工具"项目后台程序还需要python3的环境
```
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
$ python3 get-pip.py    # 运行安装脚本
pip3 install requests
pip3 install web3
```

2. Deploy contract
```
npx hardhat node
npx hardhat run scripts/deploy_buffer.js --network dev
```

3. Open serve
- 使用"交易分析工具"项目还需开启后台服务
```
node ./src/serve/index.js
```

4. Run start
- 开启项目
```
npm run start
```

## todo 
### 交易分析工具
- Raw Traces的错误的显示，如在堆栈中某个交易被revert了，需要在前端的展示树中用红色去标识出来，下面是一个带有revert的堆栈例子：
```
https://etherscan.io/vmtrace?txhash=0x7a8b5ac6a60a6339e9745044996c917eb39c695384b00189a65826cc2c27a0a6&type=parity#raw
```
- Call Traces前端展示树的兼容性调整，如果某个交易的参数字段信息过长，会超出浏览器的显示界面，这部分需要优化vue代码；还有前端可视化的按钮位置，颜色样式调整等等都需需要进一步优化
- 函数签名的显示，目前函数签名的解析是优先从爬去开源合约的abi -> function map中去匹配，如果不存在则从[4bytes](https://www.4byte.directory/signatures/?bytes4_signature=)的api中去匹配，但是有可能相同的函数签名有多个匹配的选项，这里要进行相应的逻辑处理
- address map 和 function map的信息都应存储到数据库里，目前已经考虑到这种场景编写了相应的函数(见`./src/scripts/generateTree.js`的getAddressName和getFucntionName函数)，因此后续对地址和函数签名的解析都优先从数据库中去匹配
