
const Web3 = require('web3')
const ethers = require('ethers')
const fetch = require('node-fetch'); //通过fetch获取abi
const abiDecoder = require('abi-decoder');  // 通过abi解析inputdata
const InputDataDecoder = require('ethereum-input-data-decoder')

const apiKey = '32a5558b59064d709aee84f5c94084b4'
const etherScanKey = 'DV5JKNQVKTK2S4XFRBADZKY7EG3VAIN3CU'


resultRawTraces = [
    {
        "action": {
            "callType": "call",
            "from": "0xe556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36",
            "gas": "0x54f61",
            "input": "0x5ae401dc00000000000000000000000000000000000000000000000000000000628349dd000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000000c4f3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000001ad274800000000000000000000000000000000000000000000000000000000062834e2e000000000000000000000000000000000000000000000000000000000000001b4887dec0b0838712c65c5dd459433bb6c2551a61309467f9ef45c8f1e8c5ade8372071a57ec61154d9ff355f0dcb90660f8d7cb3ba42adf2a65026435b43b658000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124b858183f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000001ad2748000000000000000000000000000000000000000000000000002f0f9335ad0f98e0000000000000000000000000000000000000000000000000000000000000042a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f46b175474e89094c44da98b954eedeac495271d0f0001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004449404b7c00000000000000000000000000000000000000000000000002f0f9335ad0f98e000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed3600000000000000000000000000000000000000000000000000000000",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x4348f",
            "output": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000300b96d2c4151aa0000000000000000000000000000000000000000000000000000000000000000"
        },
        "subtraces": 3,
        "traceAddress": [],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x534c0",
            "input": "0xf3995c67000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000001ad274800000000000000000000000000000000000000000000000000000000062834e2e000000000000000000000000000000000000000000000000000000000000001b4887dec0b0838712c65c5dd459433bb6c2551a61309467f9ef45c8f1e8c5ade8372071a57ec61154d9ff355f0dcb90660f8d7cb3ba42adf2a65026435b43b658",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x11335",
            "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x5128b",
            "input": "0xd505accf000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed3600000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000001ad274800000000000000000000000000000000000000000000000000000000062834e2e000000000000000000000000000000000000000000000000000000000000001b4887dec0b0838712c65c5dd459433bb6c2551a61309467f9ef45c8f1e8c5ade8372071a57ec61154d9ff355f0dcb90660f8d7cb3ba42adf2a65026435b43b658",
            "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x10568",
            "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [
            0,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "gas": "0x4e248",
            "input": "0xd505accf000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed3600000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000001ad274800000000000000000000000000000000000000000000000000000000062834e2e000000000000000000000000000000000000000000000000000000000000001b4887dec0b0838712c65c5dd459433bb6c2551a61309467f9ef45c8f1e8c5ade8372071a57ec61154d9ff355f0dcb90660f8d7cb3ba42adf2a65026435b43b658",
            "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0xe8d4",
            "output": "0x"
        },
        "subtraces": 0,
        "traceAddress": [
            0,
            0,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x42346",
            "input": "0xb858183f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000001ad2748000000000000000000000000000000000000000000000000002f0f9335ad0f98e0000000000000000000000000000000000000000000000000000000000000042a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f46b175474e89094c44da98b954eedeac495271d0f0001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x2ca18",
            "output": "0x0000000000000000000000000000000000000000000000000300b96d2c4151aa"
        },
        "subtraces": 2,
        "traceAddress": [
            1
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x3f60e",
            "input": "0x128acb0800000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001ad27480000000000000000000000000fffd8963efd1fc6a506488495d951d5263988d2500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36000000000000000000000000000000000000000000000000000000000000002ba0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f46b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000",
            "to": "0x6c6bc977e13df9b0de53b251522280bb72383700",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x15c05",
            "output": "0xffffffffffffffffffffffffffffffffffffffffffffffe79e1cc336f6c7e7cb000000000000000000000000000000000000000000000000000000001ad27480"
        },
        "subtraces": 4,
        "traceAddress": [
            1,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x6c6bc977e13df9b0de53b251522280bb72383700",
            "gas": "0x3785d",
            "input": "0xa9059cbb00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc4500000000000000000000000000000000000000000000001861e33cc909381835",
            "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x75de",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            0,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x6c6bc977e13df9b0de53b251522280bb72383700",
            "gas": "0x300f0",
            "input": "0x70a082310000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700",
            "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0xcf3",
            "output": "0x0000000000000000000000000000000000000000000000000000115a02b44021"
        },
        "subtraces": 1,
        "traceAddress": [
            1,
            0,
            1
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "gas": "0x2f212",
            "input": "0x70a082310000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700",
            "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x9e1",
            "output": "0x0000000000000000000000000000000000000000000000000000115a02b44021"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            0,
            1,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x6c6bc977e13df9b0de53b251522280bb72383700",
            "gas": "0x2f11b",
            "input": "0xfa461e33ffffffffffffffffffffffffffffffffffffffffffffffe79e1cc336f6c7e7cb000000000000000000000000000000000000000000000000000000001ad27480000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36000000000000000000000000000000000000000000000000000000000000002ba0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f46b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x4cf3",
            "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [
            1,
            0,
            2
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x2d6c7",
            "input": "0x23b872dd000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed360000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700000000000000000000000000000000000000000000000000000000001ad27480",
            "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x3ce8",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 1,
        "traceAddress": [
            1,
            0,
            2,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "gas": "0x2c889",
            "input": "0x23b872dd000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed360000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700000000000000000000000000000000000000000000000000000000001ad27480",
            "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x39cd",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            0,
            2,
            0,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x6c6bc977e13df9b0de53b251522280bb72383700",
            "gas": "0x2a2e4",
            "input": "0x70a082310000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700",
            "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x523",
            "output": "0x0000000000000000000000000000000000000000000000000000115a1d86b4a1"
        },
        "subtraces": 1,
        "traceAddress": [
            1,
            0,
            3
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "gas": "0x2957f",
            "input": "0x70a082310000000000000000000000006c6bc977e13df9b0de53b251522280bb72383700",
            "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x211",
            "output": "0x0000000000000000000000000000000000000000000000000000115a1d86b4a1"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            0,
            3,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x28385",
            "input": "0x128acb0800000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000001861e33cc90938183500000000000000000000000000000000000000000000000000000001000276a400000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000000000002b6b175474e89094c44da98b954eedeac495271d0f0001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000",
            "to": "0x60594a405d53811d3bc4766596efd80fd545a270",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x132c6",
            "output": "0x00000000000000000000000000000000000000000000001861e33cc909381835fffffffffffffffffffffffffffffffffffffffffffffffffcff4692d3beae56"
        },
        "subtraces": 4,
        "traceAddress": [
            1,
            1
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x60594a405d53811d3bc4766596efd80fd545a270",
            "gas": "0x209a4",
            "input": "0xa9059cbb00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc450000000000000000000000000000000000000000000000000300b96d2c4151aa",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x750a",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            1,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x60594a405d53811d3bc4766596efd80fd545a270",
            "gas": "0x19307",
            "input": "0x70a0823100000000000000000000000060594a405d53811d3bc4766596efd80fd545a270",
            "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0xa2a",
            "output": "0x00000000000000000000000000000000000000000001050bbd13fb89714d3701"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            1,
            1
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x60594a405d53811d3bc4766596efd80fd545a270",
            "gas": "0x185f0",
            "input": "0xfa461e3300000000000000000000000000000000000000000000001861e33cc909381835fffffffffffffffffffffffffffffffffffffffffffffffffcff4692d3beae56000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000000000002b6b175474e89094c44da98b954eedeac495271d0f0001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x280b",
            "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [
            1,
            1,
            2
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x171d3",
            "input": "0xa9059cbb00000000000000000000000060594a405d53811d3bc4766596efd80fd545a27000000000000000000000000000000000000000000000001861e33cc909381835",
            "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x1882",
            "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            1,
            2,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x60594a405d53811d3bc4766596efd80fd545a270",
            "gas": "0x15c0c",
            "input": "0x70a0823100000000000000000000000060594a405d53811d3bc4766596efd80fd545a270",
            "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x25a",
            "output": "0x0000000000000000000000000000000000000000000105241ef738527a854f36"
        },
        "subtraces": 0,
        "traceAddress": [
            1,
            1,
            3
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "delegatecall",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x1619e",
            "input": "0x49404b7c00000000000000000000000000000000000000000000000002f0f9335ad0f98e000000000000000000000000e556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x46fe",
            "output": "0x"
        },
        "subtraces": 3,
        "traceAddress": [
            2
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "staticcall",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x15956",
            "input": "0x70a0823100000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x216",
            "output": "0x0000000000000000000000000000000000000000000000000300b96d2c4151aa"
        },
        "subtraces": 0,
        "traceAddress": [
            2,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x1558e",
            "input": "0x2e1a7d4d0000000000000000000000000000000000000000000000000300b96d2c4151aa",
            "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "value": "0x0"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x2407",
            "output": "0x"
        },
        "subtraces": 1,
        "traceAddress": [
            2,
            1
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "gas": "0x8fc",
            "input": "0x",
            "to": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "value": "0x300b96d2c4151aa"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x53",
            "output": "0x"
        },
        "subtraces": 0,
        "traceAddress": [
            2,
            1,
            0
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    },
    {
        "action": {
            "callType": "call",
            "from": "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            "gas": "0x116be",
            "input": "0x",
            "to": "0xe556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36",
            "value": "0x300b96d2c4151aa"
        },
        "blockHash": "0x77ece29f4b520fa792ed6aca6b26b90969520e601f980b661baedf70c39e0632",
        "blockNumber": 14791001,
        "result": {
            "gasUsed": "0x0",
            "output": "0x"
        },
        "subtraces": 0,
        "traceAddress": [
            2,
            2
        ],
        "transactionHash": "0x9bf0c87482cbdd4c28e61a14e1a60328e601c91eadda78a12d15825b75b6cb70",
        "transactionPosition": 227,
        "type": "call"
    }
]
resultAddressMap = {
    "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45": "Uniswap V3: Router 2",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "Uniswap V3: Router 2",
    "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf": "Uniswap V3: Router 2",
    "0x6c6bc977e13df9b0de53b251522280bb72383700": "Uniswap V3: Router 2",
    "0x6b175474e89094c44da98b954eedeac495271d0f": "Uniswap V3: Router 2",
    "0x60594a405d53811d3bc4766596efd80fd545a270": "Uniswap V3: Router 2",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "Uniswap V3: Router 2",
    "0xe556a6ddb21ce1c03e3ab132dfa8f57d95d4ed36": "Uniswap V3: Router 2"
}
resultFunctionMap = {
    "0xd0e30db0": "function deposit()",
    "0xa9059cbb": "function transfer(address dst,uint256 wad) returns (bool )",
    "0x70a08231": "function balanceOf(address ) returns (uint256 )",
    "0x0902f1ac": "function getReserves()",
    "0x022c0d9f": "function swap(uint256,uint256,address,bytes)",
    "0xb6f9de95": "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint256 amountOutMin,address[] path,address to,uint256 deadline)"
}


async function createConstructArr(resultRawTraces, resultAddressMap) {
    let rawTracesOne = []
    let rawTracesTwo = []
    for (let item = 0; item < resultRawTraces.length; item++) {
        //在数组中插入pid和calltype
        if (resultRawTraces[item].traceAddress.length == 0) {
            let ID = 'root'
            rawTracesOne.push({
                id: ID.toString(),
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        else if (resultRawTraces[item].traceAddress.length == 1) {
            let ID = resultRawTraces[item].traceAddress[0]
            rawTracesOne.push({
                id: ID.toString(),
                pid: 'root',
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        else if (resultRawTraces[item].traceAddress.length == 2) {
            let ID = resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1]
            rawTracesOne.push({
                id: ID.toString(),
                pid: resultRawTraces[item].traceAddress[0].toString(),
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        else if (resultRawTraces[item].traceAddress.length == 3) {
            let ID = resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1] + '-' + resultRawTraces[item].traceAddress[2]
            rawTracesOne.push({
                id: ID.toString(),
                pid: resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1],
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        else if (resultRawTraces[item].traceAddress.length == 4) {
            let ID = resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1] + '-' + resultRawTraces[item].traceAddress[2] + '-' + resultRawTraces[item].traceAddress[3]
            rawTracesOne.push({
                id: ID.toString(),
                pid: resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1] + '-' + resultRawTraces[item].traceAddress[2],
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        else {
            let ID = resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1] + '-' + resultRawTraces[item].traceAddress[2] + '-' + resultRawTraces[item].traceAddress[3] + '-' + resultRawTraces[item].traceAddress[4]
            rawTracesOne.push({
                id: ID.toString(),
                pid: resultRawTraces[item].traceAddress[0] + '-' + resultRawTraces[item].traceAddress[1] + '-' + resultRawTraces[item].traceAddress[2] + '-' + resultRawTraces[item].traceAddress[3],
                gasUsed: Number(resultRawTraces[item].result.gasUsed).toString(10),
                calltype: resultRawTraces[item].action.callType,
                output: resultRawTraces[item].result.output
            })
        }
        //在数组中插入contractAddress和functionName
        if(resultAddressMap != null) {
            if (resultAddressMap.hasOwnProperty(resultRawTraces[item].action.to)) {
                let contractAddress = resultRawTraces[item].action.to
                let functionName = resultRawTraces[item].action.input.substring(0, 10)
                let inputHash = resultRawTraces[item].action.input
                let functionCall = contractAddress + '-' + functionName + '-' + inputHash
                if (resultRawTraces[item].action.value != '0x0') {
                    transferETH = Number(resultRawTraces[item].action.value) / 10 ** 18
                }
                else {
                    transferETH = NaN
                }
                rawTracesTwo.push({
                    functioncall: functionCall,
                    transfereth: transferETH
                })
            }
        }
        
    }
    let rawTracesNew = rawTracesOne.map((item, index) => {
        return { ...item, ...rawTracesTwo[index] };
    });
    return rawTracesNew
}

async function changeToVisual(traceArray, resultRawTraces, resultAddressMap, resultFunctionMap) {
    var functionCallObj = []
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/` + apiKey));
    }

    let methodName;
    let inputResult;
    let outputResult;
    let inputArg = [];
    let addressName;
    for (let item = 0; item < resultRawTraces.length; item++) {
        let functionCallArr = traceArray[item].functioncall.split("-")
        if (resultAddressMap.hasOwnProperty(functionCallArr[0])) {
            addressName = resultAddressMap[functionCallArr[0]]
            functionName = resultFunctionMap[functionCallArr[1]]
            contractAddress = functionCallArr[0]
            inputResult = functionCallArr[2]

            // outputResult = Number(traceArray[item].output)
            try {
                url = 'https://api-cn.etherscan.com/api?module=contract&action=getabi&address=' + contractAddress + '&apikey=' + etherScanKey;
                let response = await fetch(url, { method: 'get' })
                let data = await response.json()
                abi = JSON.parse(data.result); //获取合约abi'
                let interface = new ethers.utils.Interface(abi)
                inputDecoder = new InputDataDecoder(abi).decodeData(inputResult)
                methodName = inputDecoder.method
                let paraNames = inputDecoder.names
                let paraInputs = inputDecoder.inputs
                for (let i = 0; i < paraInputs.length; i++) {
                    inputOne = ('0x' + paraInputs[i][0]).toLowerCase()
                    inputTwo = ('0x' + paraInputs[i][1]).toLowerCase()
                    if (typeof (paraInputs[i]) == 'object' && resultAddressMap.hasOwnProperty(inputOne) && resultAddressMap.hasOwnProperty(inputTwo)) {
                        paraInputs[i][0] = resultAddressMap[inputOne]
                        paraInputs[i][1] = resultAddressMap[inputTwo]
                    }
                    let newTemp = ('0x' + paraInputs[i]).toLowerCase()
                    if (resultAddressMap.hasOwnProperty(newTemp)) {
                        paraInputs[i] = resultAddressMap[newTemp]
                    }
                }
                if (!paraNames[0]) {
                    paraNames = inputDecoder.types
                }
                if (paraNames != null) {
                    inputArg = [];
                    var newArray = paraNames.map(function (value, index) {
                        inputArg.push([value, paraInputs[index]]);
                        return value + ':  ' + paraInputs[index];
                    });
                }
                inputData = addressName + '.' + methodName + '(' + newArray + ')'
                // 开始处理输出数据
                outputResult = traceArray[item].output
                if(outputResult != '0x'){
                    let decodeResult = interface.decodeFunctionResult(methodName, outputResult);
                    outputResult = []
                    for (let i = 0; i < decodeResult.length; i++) {
                        outputResult.push(decodeResult[i])
                    }
                    outputResult = outputResult.join(",  ")
                } else if(outputResult == '0x') {
                    outputResult = ""
                }
            } catch (e) {
                inputData = addressName + '.' + functionName
            }

        }
        functionCallObj.push({
            inputArg: inputArg,
            methodName: methodName,
            addressName: addressName,
            functioncall: inputData,
            output: outputResult
        })
    }
    let rawTracesVisual = traceArray.map((item, index) => {
        return { ...item, ...functionCallObj[index] };
    });
    //console.log(rawTracesVisual)
    return rawTracesVisual
};

async function changeToTree(list) {
    const tree = []
    for (const node of list) {
        // 如果没有pid就可以认为是根节点
        if (!node.pid) {
            let p = { ...node }
            p.children = getChildren(p.id, list)
            tree.push(p)
        }
    }
    function getChildren(id, list) {
        const children = []
        for (const node of list) {
            if (node.pid === id) {
                children.push(node)
            }
        }
        for (const node of children) {
            const children = getChildren(node.id, list)
            if (children.length) {
                node.children = children
            }
        }
        return children
    }
    return tree
}

//changeTreeToVisual()
async function handleTreeStructure(resultRawTraces, resultAddressMap, resultFunctionMap) {
    let rawTracesObj = await createConstructArr(resultRawTraces, resultAddressMap)
    let treeVisual = await changeToVisual(rawTracesObj, resultRawTraces, resultAddressMap, resultFunctionMap)
    let treeStructure = await changeToTree(treeVisual)
    console.log(treeStructure)
    return treeStructure
}
// handleTreeStructure(resultRawTraces, resultAddressMap, resultFunctionMap)

module.exports = {
    handleTreeStructure,
    createConstructArr,
    changeToVisual,
    changeToTree,
}

