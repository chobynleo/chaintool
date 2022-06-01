

const json = require('json')
const logging = require('logging')
const re = require('re')
const sys = require('sys')
const time = require('time')
const requests = require('requests')
const normalize_event_input_types = require('web3/_utils/abi')
const w3 = require('web3/auto')

HEADERS = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.44' };

function crawl4byte(hex_signature, fourbytes_api = "https://www.4byte.directory/api/v1/signatures/?hex_signature=FLAG_SIG") {
    var res;
    console.log(hex_signature);
    try {
        res = requests.get(fourbytes_api.replace("FLAG_SIG", hex_signature), {
            "headers": HEADERS,
            "timeout": 60
        });
        if (_pj.in_es6("text_signature", res.text) && res.json()["results"].length > 0) {
            return res.json()["results"].slice(-1)[0]["text_signature"];
        }
    } catch (e) {
        logging.exception(e);
    }
}

function crawlExplorer(addrs, explorer_url) {
    var abis, addrs_len, blockscout_abi_pattern, blockscout_contractname_pattern, blockscout_token_pattern, etherscan_abi_pattern, etherscan_contractname_pattern, etherscan_lable_pattern, etherscan_token_pattern, index, lables, res, search_result;
    etherscan_lable_pattern = re.compile("title='Public Name Tag \\(viewable by anyone\\)'>(.*?)</span>");
    etherscan_token_pattern = re.compile("View Token Tracker Page\">(.*?)</a>");
    etherscan_contractname_pattern = re.compile("Contract Name:[\\s\\S]*?>(.*?)</span>");
    etherscan_abi_pattern = re.compile("js-copytextarea2.*?>(.*?)</");
    blockscout_token_pattern = re.compile("token_hash_link.*?>(.*?)</a>");
    blockscout_contractname_pattern = re.compile("Contract name:.*?>[\\s\\S].*?>(.*?)</dd>");
    blockscout_abi_pattern = re.compile("data-clipboard-text=\"(.*?)\"\\s*aria-label=\"Copy Contract ABI");
    addrs_len = addrs.length;
    index = 0;
    lables = {};
    abis = [];

    while (index < addrs_len) {
        console.log(addrs[index]);
        try {
            res = requests.get(explorer_url.replace("ADDRESSFLAG", addrs[index]), {
                "headers": HEADERS,
                "timeout": 60
            });
            search_result = re.search(etherscan_abi_pattern, res.text);

            if (search_result) {
                abis.append(search_result.group(1));
            } else {
                search_result = re.search(blockscout_abi_pattern, res.text);
                if (search_result) {
                    abis.append(search_result.group(1).replace("&quot;", "\""));
                }
            }
            search_result = re.search(etherscan_lable_pattern, res.text);

            if (search_result) {
                lables[addrs[index]] = search_result.group(1);
            } else {
                search_result = re.search(etherscan_token_pattern, res.text);

                if (search_result) {
                    lables[addrs[index]] = search_result.group(1);
                } else {
                    search_result = re.search(etherscan_contractname_pattern, res.text);

                    if (search_result && _pj.in_es6("Contract Creation Code", res.text)) {
                        lables[addrs[index]] = search_result.group(1);
                    } else {
                        search_result = re.search(blockscout_token_pattern, res.text);

                        if (search_result) {
                            lables[addrs[index]] = search_result.group(1);
                        } else {
                            search_result = re.search(blockscout_contractname_pattern, res.text);

                            if (search_result) {
                                lables[addrs[index]] = search_result.group(1);
                            }
                        }
                    }
                }
            }
            index += 1;
        } catch (e) {
            logging.exception(e);
            time.sleep(5);
        }
    }
    return [lables, abis];
}

// abi_to_interface该function暂时不可使用 
// function abi_to_interface(abi) {

//     interface = ("function" + {fn_name} +"(" + {fn_input} +")").format(
//         fn_name = [abi["name"]],
//         fn_input = [",".join(function () {
//           var _pj_a = [],
//               _pj_b = normalize_event_input_types(abi.get("inputs", []));
//           for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
//             var arg = _pj_b[_pj_c];
        
//             _pj_a.push(arg["type"] + " " + arg["name"]);
//           }
//           return _pj_a;
//         }.call(this))]
//     )

//     if (abi.get('outputs', []).length >0 ) {
//         interface += ("returns" + "(" + {fn_returns} + ")").format(
//             fn_returns = ",".join(function () {
//               var _pj_a = [],
//                   _pj_b = normalize_event_input_types(abi.get("outputs", []));
//               for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
//                 var arg = _pj_b[_pj_c];
//                 _pj_a.push(arg["type"] + " " + arg["name"])
//               }
//               return _pj_a
//             }.call(this))
//         )
//     }
//     return interface
// }


//
function main(explorer_url) {
    var abis, addr_lable, addr_lable_json, addrs, from_addr, func_interface, func_interface_json, funcsigs, raw_traces, temp_contrct, text_signature, to_addr;
    raw_traces = open("rawtraces.txt").read();
    raw_traces = raw_traces.startswith("[") && raw_traces || "[" + raw_traces;
    raw_traces = raw_traces.endswith("]") && raw_traces || raw_traces + "]";
    raw_traces = json.loads(raw_traces);
    addrs = [];
    funcsigs = [];
    func_interface = {};

    for (var trace, _pj_c = 0, _pj_a = raw_traces, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        trace = _pj_a[_pj_c];
        from_addr = trace["action"].get("from", "");
        to_addr = trace["action"].get("to", "");

        if (!to_addr && trace["action"].get("init", "")) {
            to_addr = trace["result"].get("address", "");
        }
        if (!_pj.in_es6(to_addr, addrs)) {
            addrs.append(to_addr);
        }

        if (!_pj.in_es6(from_addr, addrs)) {
            addrs.append(to_addr);
        }

        if (trace["action"].get("input", "").length >= 10) {
            if (!_pj.in_es6(trace["action"]["input"].slice(0, 10), funcsigs)) {
                funcsigs.append(trace["action"]["input"].slice(0, 10));
            }
        }
    }
    [addr_lable, abis] = crawlExplorer(addrs, explorer_url);

    for (var funcsig, _pj_c = 0, _pj_a = funcsigs, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        funcsig = _pj_a[_pj_c];

        for (var abi, _pj_f = 0, _pj_d = abis, _pj_e = _pj_d.length; _pj_f < _pj_e; _pj_f += 1) {
            abi = _pj_d[_pj_f];
            temp_contrct = w3.eth.contract({
                "address": "0x0000000000000000000000000000000000000000",
                "abi": abi
            });

            try {
                temp_contrct.get_function_by_selector(funcsig);
                func_interface[funcsig] = abi_to_interface(temp_contrct.get_function_by_selector(funcsig).abi);
            } catch (e) {
                if (e instanceof ValueError) { } else {
                    throw e;
                }
            }
        }

        if (!func_interface.get(funcsig, "")) {
            text_signature = crawl4byte(funcsig);

            if (text_signature) {
                func_interface[funcsig] = "function " + text_signature;
            }
        }
    }
    addr_lable_json = json.dumps(addr_lable, {
        "indent": 4
    });
    func_interface_json = json.dumps(func_interface, {
        "indent": 4
    });
    console.log("--------------------Address map--------------------");
    console.log(addr_lable_json);
    open("address_map.txt", "w").write(addr_lable_json);
    console.log("Save in file: address_map.txt");
    console.log("--------------------Function map--------------------");
    console.log(func_interface_json);
    open("function_map.txt", "w").write(func_interface_json);
    console.log("Save in file: function_map.txt");
}

if (__name__ === "__main__") {
    if (sys.argv.length !== 2) {
      console.log("Raw traces fill to rawtraces.txt");
      console.log("运行用例如下: ");
      console.log("python3 getMap.py 'https://etherscan.io/address/ADDRESSFLAG#code'");
      console.log("脚本参数提供了区块链Explorer的合约代码页的URL，通过该URL可以抓取所需的信息");
      console.log("ADDRESSFLAG ADDRESSFLAG 是一个表示地址的变量，类似于占位符，它将在运行时被实际地址替换");
    } else {
      main(sys.argv[1]);
    }
  }

