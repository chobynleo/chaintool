const Web3 = require('web3')
const ethers = require('ethers')
const fetch = require('node-fetch'); //通过fetch获取abi
const abiDecoder = require('abi-decoder');  // 通过abi解析inputdata
const InputDataDecoder = require('ethereum-input-data-decoder')

const apiKey = '32a5558b59064d709aee84f5c94084b4'
const etherScanKey = 'DV5JKNQVKTK2S4XFRBADZKY7EG3VAIN3CU'

var rawTraces = [
    {
        "action": {
            "callType": "call",
            "from": "0x4de8a8ac4342f8ff009650b42d01720870d9b64c",
            "gas": "0x3b6a6",
            "input": "0xb6f9de95000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000004de8a8ac4342f8ff009650b42d01720870d9b64c00000000000000000000000000000000000000000000000000000000683827b20000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000049428f057dd9d20a8e4c6873e98afd8cd7146e3b",
            "to": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "value": "0x16345785d8a0000"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x2530c",
            "output": "0x"
        },
        "subtraces": 7,
        "traceAddress": [],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x3813b",
            "input": "0xd0e30db0",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x16345785d8a0000"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x5da6",
            "output": "0x"
        },
        "subtraces": 0,
        "traceAddress": [
            0
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x32079",
            "input": "0xa9059cbb0000000000000000000000004eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f000000000000000000000000000000000000000000000000016345785d8a0000",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x1f7e",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            1
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x2f5fd",
            "input": "0x70a082310000000000000000000000004de8a8ac4342f8ff009650b42d01720870d9b64c",
            "to": "0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0xa40",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000000"
        },
        "subtraces": 0,
        "traceAddress": [
            2
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x2dc3f",
            "input": "0x0902f1ac",
            "to": "0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x9c8",
            "output": "0x0000000000000000000000000000000000000000000b85bd7c58733ca4704cbc0000000000000000000000000000000000000000000000007d54d5042c35fc1700000000000000000000000000000000000000000000000000000000626aa8ce"
        },
        "subtraces": 0,
        "traceAddress": [
            3
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x2d095",
            "input": "0x70a082310000000000000000000000004eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x216",
            "output": "0x0000000000000000000000000000000000000000000000007eb81a7c89bffc17"
        },
        "subtraces": 0,
        "traceAddress": [
            4
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x2c881",
            "input": "0x022c0d9f0000000000000000000000000000000000000000000020356381e190fc114fcb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000004de8a8ac4342f8ff009650b42d01720870d9b64c00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000",
            "to": "0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x16aef",
            "output": "0x"
        },
        "subtraces": 3,
        "traceAddress": [
            5
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "gas": "0x2938e",
            "input": "0xa9059cbb0000000000000000000000004de8a8ac4342f8ff009650b42d01720870d9b64c0000000000000000000000000000000000000000000020356381e190fc114fcb",
            "to": "0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x114be",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            5,
            0
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "gas": "0x180b6",
            "input": "0x70a082310000000000000000000000004eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "to": "0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x270",
            "output": "0x0000000000000000000000000000000000000000000b658818d691aba85efcf1"
        },
        "subtraces": 0,
        "traceAddress": [
            5,
            1
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "gas": "0x17cba",
            "input": "0x70a082310000000000000000000000004eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x216",
            "output": "0x0000000000000000000000000000000000000000000000007eb81a7c89bffc17"
        },
        "subtraces": 0,
        "traceAddress": [
            5,
            2
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
            "gas": "0x1612d",
            "input": "0x70a082310000000000000000000000004de8a8ac4342f8ff009650b42d01720870d9b64c",
            "to": "0x49428f057dd9d20a8e4c6873e98afd8cd7146e3b",
            "value": "0x0"
        },
        "blockHash": "0xadf0a32075248ab95d83c9ab60083fefb3637f7665a2715ab15a677b54821747",
        "blockNumber": 14673453,
        "result": {
            "gasUsed": "0x270",
            "output": "0x000000000000000000000000000000000000000000001fe2ef4ff13b0e06e653"
        },
        "subtraces": 0,
        "traceAddress": [
            6
        ],
        "transactionHash": "0x0b79e2d2140c21928417de4dce2358ee292627f381cc0a46738fb1ff99740ea1",
        "transactionPosition": 317,
        "type": "call"
    }
]
// console.log(await parsingRawTraces(rawTraces, "", "")) 
async function parsingRawTraces(rawTraces, 
    addressMapByUser, 
    functionMapByUser, 
    addressMapByCrawl, 
    functionMapByCrawl
) {
    let res = [];
    // 解析rawTraces结构，是一个对象数组，解析时插入tree id
    for (let i = 0; i < rawTraces.length; i++) {
        // 交易结构
        let tx = {
            id: "0", // tree id
            pid: "", // 父id
            children: [],
            calltype: "", //调用类型
            ETH: "", // value
            from: "", //  发送者的地址
            fromName: "", //  发送者地址的解析名称
            to: "", //  接收者的地址，一般是合约地址
            toName: "", //  接收者地址的解析名称
            function: "", // 调用的函数签名
            inputArg: "", // 函数的参数集合
            gasUsed: "", // 实际消耗的gas
            output: "", // 函数输出
            init: false, // 该交易是否是创建合约
        }
        // 解析合约调用深度
        let deep = rawTraces[i].traceAddress.length;
        if(deep) {
            // 处理子节点id
            for (let j = 0; j < deep; j++) {
                tx.pid = tx.id;
                tx.id += ("-" + rawTraces[i].traceAddress[j]);
            }
        }
        
        // 先判断该交易是创建合约还是普通调用
        if(rawTraces[i].action.init) {
            // 创建合约
            tx.calltype = "create";
            tx.function = "constructor()";
            tx.init = true;
            tx.ETH = await getETH(rawTraces[i].action.value);
            tx.gasUsed = await getGasUsed(rawTraces[i].result.gasUsed);
            tx.from = rawTraces[i].action.from;
            tx.fromName = await getAddressName(rawTraces[i].action.from, addressMapByUser, addressMapByCrawl);
            tx.output = rawTraces[i].result.address;
        } else {
            // 普通调用
            try {
                tx.calltype = rawTraces[i].action.callType;
                tx.ETH = await getETH(rawTraces[i].action.value);
                tx.from = rawTraces[i].action.from;
                tx.fromName = await getAddressName(rawTraces[i].action.from, addressMapByUser, addressMapByCrawl);
                tx.to = rawTraces[i].action.to;
                tx.toName = await getAddressName(rawTraces[i].action.to, addressMapByUser, addressMapByCrawl);
                tx.function = await getFunctionSig(rawTraces[i].action.input, functionMapByUser, functionMapByCrawl)
                tx.gasUsed = await getGasUsed(rawTraces[i].result.gasUsed);
                tx.inputArg = await getInputArg(rawTraces[i].action.input, addressMapByUser, addressMapByCrawl, functionMapByUser, functionMapByCrawl);
                tx.output = await getOuput(rawTraces[i].action.input, rawTraces[i].result.output, addressMapByUser, addressMapByCrawl, functionMapByUser, functionMapByCrawl);
            } catch (error) {
                console.log(error)
            }
        }
        
        res.push(tx);
    }

    return res;
}

// 处理input数据返回函数签名，如果有数据返回函数签名，如果为undefined则为空
async function getFunctionSig(inputData, functionMapByUser, functionMapByCrawl) {
    if(inputData) {
        return inputData.length >= 10? 
        await getFucntionName(inputData.substring(0, 10), functionMapByUser, functionMapByCrawl) : inputData;
    } else {
        return "";
    }        
}

// 将json结构生成tree结构
async function toTree(traceObj) {
    const tree = []
    for (const node of traceObj) {
        // 如果没有pid就可以认为是根节点
        if (!node.pid) {
            let root = node
            root.children = getChildren(root.id, traceObj)
            tree.push(root)
        }
    }
    function getChildren(parentID, traceObj) {
        let children = []
        for (const node of traceObj) {
            if (node.pid === parentID) {
                children.push(node)
            }
        }
        for (const node of children) {
            let children = getChildren(node.id, traceObj)
            node.children = children
        }
        return children
    }
    return tree
}

// 处理ETH数据
async function getETH(value) {
    return value != "0x0"?ethers.utils.formatUnits(value, 18) : "";
}

// 处理gasUsed数据
async function getGasUsed(value) {
    return value != "0x0"?ethers.BigNumber.from(value) : "";
}

// 处理input数据
/**
 * @return Array 返回值是一个数组，数据的每一个元素内有三个值
 *  eg."function transfer(address to,uint256 value) returns (bool )"
 *  Array[0][0]: to
 *  Array[0][1]: 0x4eeea05c9318d6bd9ddaa5a6a001f1916fbd4c9f
 *  Array[0][2]: address
 *  Array[1][0]: value
 *  Array[1][1]: 100000000000000000
 *  Array[1][2]: uint256
 *  Array[i][0] 每个元素第一个值该参数的类型,如果没有对应的abi用于解析，则为null 
 *  Array[i][1] 每个元素第二个值表示input arg解析出的arg name，如果map或者用户输入的function map无匹配的值则为null   
 *  Array[i][2] 每个元素第三个值表示该参数在trace result里解析出的值
 *  Array[i][3] 每个元素第四个值表示该参数未解析前的原始值
 * 
*/ 
async function getInputArg(
    inputData, 
    addressMapByUser, 
    addressMapByCrawl, 
    functionMapByUser, 
    functionMapByCrawl
) {
    // todo 这里需要通过abi去解析inputData，abi其实要么在爬取map时保存到本地，要么通过建造本地abi数据库，这样就不用通过接口去请求
    // let abi = getDataBase(); 请求数据库
    let functionSig = inputData.slice(0, 10);
    let abi = getMapAbi(functionSig, functionMapByUser);
    if(abi === undefined) abi = getMapAbi(functionSig, functionMapByCrawl);
    if(abi === undefined) return [[null, null, inputData, inputData]];

    let interface = new ethers.utils.Interface(abi);
    let input = interface.fragments[0].inputs;
    let len = input.length;
    if(!len) return [[null, null, "", ""]];

    let arg = [];
    let argData = interface.decodeFunctionData(functionSig, inputData);
    
    for (let i = 0; i < len; i++) {
        let type = input[i].type; //参数类型
        let temp = argData[i]; // 解析后的值
        let originValue = argData[i]; // 未解析的原始值

        // 处理uint类型
        if(input[i].type.indexOf("uint") != -1 ) {
            // temp = ethers.utils.formatUnits(argData[i], 18)
        }

        // 处理address类型
        if(input[i].type.indexOf("address") != -1 ) {
            if(Object.prototype.toString.call(argData[i]) === '[object Array]') {
                // address[]
                type = 'address[]';
                temp = [];
                originValue = [];
                
                for (let j = 0; j < argData[i].length; j++) {
                    originValue.push(argData[i][j]);
                    temp.push(await getAddressName(argData[i][j], addressMapByUser, addressMapByCrawl));
                }
            } else if(Object.prototype.toString.call(argData[i]) === '[object String]') {
                // address
                type = 'address';
                temp = await getAddressName(argData[i], addressMapByUser, addressMapByCrawl);
                originValue = argData[i];
            }
            
        }

        arg.push([type, input[i].name, temp, originValue]);

    }

    return arg;
}

// 处理output数据
async function getOuput(inputData, outputData, addressMapByUser, addressMapByCrawl, functionMapByUser, functionMapByCrawl) {
    if(outputData != '0x'){
        let functionSig = inputData.slice(0, 10);
        let abi = getMapAbi(functionSig, functionMapByUser);
        if(abi === undefined) abi = getMapAbi(functionSig, functionMapByCrawl);
        if(abi === undefined) return outputData;
    
        let interface = new ethers.utils.Interface(abi);
        let output = interface.fragments[0].outputs;
        let len = output.length;
        let decodeResult = interface.decodeFunctionResult(functionSig, outputData);
        outputData = []
        for (let i = 0; i < len; i++) {
            let temp = decodeResult[i];
            // 处理address类型
            if(output[i].type.indexOf("address") != -1 ) {
                if(Object.prototype.toString.call(decodeResult[i]) === '[object Array]') {
                    // address[]
                    temp = []
                    for (let j = 0; j < decodeResult[i].length; j++) {
                        // 地址要转小写
                        let addr = decodeResult[i][j].toLowerCase();
                        temp.push(await getAddressName(addr, addressMapByUser, addressMapByCrawl));
                    }
                } else if(Object.prototype.toString.call(decodeResult[i]) === '[object String]') {
                    // address
                    temp = await getAddressName(decodeResult[i], addressMapByUser, addressMapByCrawl);
                }
                
            }
            outputData.push(temp)
        }
        outputData = outputData.join(",  ")
    } else if(outputData == '0x') {
        outputData = ""
    }

    return outputData;
}

// todo: 以后从addressMap拿值会通过请求数据库的方式，加快处理速度
async function getAddressName(address, addressMapByUser, addressMapByCrawl) {
    // todo addressMapByUserk可以预处理后存入数据库中作为数据集
    // todo 以后修改成优先匹配数据库的addressMap，再匹配用户的addressMap和爬取的addressMap
    // let name = getDataBase(address); 请求数据库
    // 目前优先匹配用户的addressMap，再匹配爬取的addressMap
    let name = "";

    if(address) {
        address = address.toLowerCase();
        name = getMapName(address, addressMapByUser, addressMapByCrawl);
    }

    if(name != "") {
        return name;
    }
    //如果map都没有这个address的解析，则返回原address
    return address;
}

// todo: 以后从fucntionMap拿值会通过请求数据库的方式，加快处理速度
async function getFucntionName(functionSig, functionMapByUser, functionMapByCrawl) {
    // todo functionMapByUser可以预处理后存入数据库中作为数据集
    // todo 以后修改成优先匹配数据库的function sig，匹配用户的functionMap和爬取的functionMap
    // let name = getDataBase(functionSig); 请求数据库
    // 目前优先匹配用户的functionMap，再匹配爬取的functionMap

    let name = "";
    
    functionSig = functionSig.toLowerCase();

    name = getMapName(functionSig, functionMapByUser, functionMapByCrawl);

    if(name != "") {
        // 这里略微处理一下，只获取函数名
        // eg."function getReserves()"
        let start = 9;
        let end = name.indexOf("(");
        return name.slice(start, end);
    }

    return functionSig
}

// 获取Map的name
function getMapName(key, mapByUser, mapByCrawl) {
    let map = {};
    if(mapByUser) {
        try {
            map = JSON.parse(mapByUser);
        } catch (error) {}
    } else if(mapByCrawl) {
        try {
            map = JSON.parse(mapByCrawl);
        } catch (error) {}
    }

    if(map.hasOwnProperty(key)) {
        return map[key]
    }

    return "";
}

// 获取Map的abi
function getMapAbi(key, map) {
    try {
        map = JSON.parse(map);
        let abi = [map[key]];
        return abi;
    } catch (error) {
        if(map) {
            return map[key];
        } else {
            return undefined;
        }
        
    }
}

/**
 * @dev 生成树的结构，返回给前端显示
 * @param rawTraces trace log json
 * @param addressMapByUser 用户输入框中自定义的 address map
 * @param functionMapByUser 用户输入框中自定义的 function map
 * @param addressMapByCrawl 脚本爬取区块链浏览器开源合约的 address map
 * @param functionMapByCrawl 脚本爬取区块链浏览器开源合约的 function map
 */
async function generateTree(
    rawTraces, 
    addressMapByUser, 
    functionMapByUser, 
    addressMapByCrawl, 
    functionMapByCrawl
) {
    let tracesObj = await parsingRawTraces(
        rawTraces, 
        addressMapByUser, 
        functionMapByUser, 
        addressMapByCrawl, 
        functionMapByCrawl
    )

    return await toTree(tracesObj);
}
module.exports = {
    generateTree
}