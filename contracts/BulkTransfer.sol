// SPDX-License-Identifier: MIT
pragma solidity ^ 0.4.0;

/**
 * @title 支持ETH和ERC20令牌，批量向多个地址发送ether或ERC20令牌
*/

library SafeMath {
    function mul(uint a, uint b) internal pure returns(uint) {
        uint c = a * b;
        require(a == 0 || c / a == b);
        return c;
    }
    function div(uint a, uint b) internal pure returns(uint) {
        require(b > 0);
        uint c = a / b;
        require(a == b * c + a % b);
        return c;
    }
    function sub(uint a, uint b) internal pure returns(uint) {
        require(b <= a);
        return a - b;
    }
    function add(uint a, uint b) internal pure returns(uint) {
        uint c = a + b;
        require(c >= a);
        return c;
    }
    function max64(uint64 a, uint64 b) internal pure returns(uint64) {
        return a >= b ? a: b;
    }
    function min64(uint64 a, uint64 b) internal pure returns(uint64) {
        return a < b ? a: b;
    }
    function max256(uint256 a, uint256 b) internal pure returns(uint256) {
        return a >= b ? a: b;
    }
    function min256(uint256 a, uint256 b) internal pure returns(uint256) {
        return a < b ? a: b;
    }
}

contract ERC20Basic {
    uint public totalSupply;
    function balanceOf(address who) public constant returns(uint);
    function transfer(address to, uint value) public;
    event Transfer(address indexed from, address indexed to, uint value);
}

contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) public constant returns(uint);
    function transferFrom(address from, address to, uint value) public;
    function approve(address spender, uint value) public;
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract BasicToken is ERC20Basic {

    using SafeMath for uint;
    mapping(address =>uint) balances;

    function transfer(address _to, uint _value) public {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
    }

    function balanceOf(address _owner) public constant returns(uint balance) {
        return balances[_owner];
    }
}

contract StandardToken is BasicToken,ERC20 {
    mapping(address => mapping(address =>uint)) allowed;

    function transferFrom(address _from, address _to, uint _value) public {
        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
    }

    function approve(address _spender, uint _value) public {
        require((_value == 0) || (allowed[msg.sender][_spender] == 0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    function allowance(address _owner, address _spender) public constant returns(uint remaining) {
        return allowed[_owner][_spender];
    }
}

contract Ownable {
    address public owner;

    function ownable() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    function transferOwnership(address newOwner) onlyOwner public {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}

// 批量发送的主要功能
contract BulkSender is Ownable {

    using SafeMath for uint;

    event LogTokenBulkSent(address token, uint256 total);
    event LogGetToken(address token, address receiver, uint256 balance);
    address public receiverAddress;
    //uint public txFee = 0.01 ether; //批量转账默认手续费
    //uint public VIPFee = 1 ether; //支付1个ETH，从DAPP中发起的所有交易将永久免手续

    /* VIP List */
    //mapping(address => bool) public vipList;

//     /*
//   *  查询余额
//   */
//     function getBalance(address _tokenAddress) onlyOwner public {
//         address _receiverAddress = getReceiverAddress();
//         if (_tokenAddress == address(0)) {
//             require(_receiverAddress.send(address(this).balance));
//             return;
//         }
//         StandardToken token = StandardToken(_tokenAddress);
//         uint256 balance = token.balanceOf(this);
//         token.transfer(_receiverAddress, balance);
//         emit LogGetToken(_tokenAddress, _receiverAddress, balance);
//     }

//     /*
//   *  VIP注册
//   */
//     function registerVIP() payable public {
//         require(msg.value >= VIPFee);
//         address _receiverAddress = getReceiverAddress();
//         require(_receiverAddress.send(msg.value));
//         vipList[msg.sender] = true;
//     }

//     /*
//   *  VIP_list
//   */
//     function addToVIPList(address[] _vipList) onlyOwner public {
//         for (uint i = 0; i < _vipList.length; i++) {
//             vipList[_vipList[i]] = true;
//         }
//     }

//     /*
//     * 删除VIP名单里的地址（By Owner)
//   */
//     function removeFromVIPList(address[] _vipList) onlyOwner public {
//         for (uint i = 0; i < _vipList.length; i++) {
//             vipList[_vipList[i]] = false;
//         }
//     }

//     /*
//         * 检查是否VIP 
//     */
//     function isVIP(address _addr) public view returns(bool) {
//         return _addr == owner || vipList[_addr];
//     }

    /*
        * 设置接受者地址
    */
    function setReceiverAddress(address _addr) onlyOwner public {
        require(_addr != address(0));
        receiverAddress = _addr;
    }

    /*
        * 得到接受者地址
    */
    function getReceiverAddress() public view returns(address) {
        if (receiverAddress == address(0)) {
            return owner;
        }
        return receiverAddress;
    }

    /*
        * 设置VIP费用
    */
    // function setVIPFee(uint _fee) onlyOwner public {
    //     VIPFee = _fee;
    // }

    /*
        * 设置Tx费用
    */
    // function setTxFee(uint _fee) onlyOwner public {
    //     txFee = _fee;
    // }

    function ethSendSameValue(address[] _to, uint _value) internal {

        //uint sendAmount = _to.length.sub(1).mul(_value);
        uint remainingValue = msg.value;
        require(remainingValue == msg.value,"what's the remaining value of account");
        // bool vip = isVIP(msg.sender);
        // if (vip) {
        //     require(remainingValue >= sendAmount);
        // } else {
        //     require(remainingValue >= sendAmount.add(txFee));
        // }
        require(_to.length <= 255);
        for (uint8 i = 0; i < _to.length; i++) {
            remainingValue = remainingValue.sub(_value);
            require(_to[i].send(_value));
        }

        //emit LogTokenBulkSent(0x000000000000000000000000000000000000bEEF, msg.value);
    }

    function ethSendDifferentValue(address[] _to, uint[] _value) internal {

        //uint sendAmount = _value[0];
        uint remainingValue = msg.value;

        // bool vip = isVIP(msg.sender);
        // if (vip) {
        //     require(remainingValue >= sendAmount);
        // } else {
        //     require(remainingValue >= sendAmount.add(txFee));
        // }

        require(_to.length == _value.length);
        require(_to.length <= 255);

        for (uint8 i = 0; i < _to.length; i++) {
            remainingValue = remainingValue.sub(_value[i]);
            require(_to[i].send(_value[i]));
        }
        //emit LogTokenBulkSent(0x000000000000000000000000000000000000bEEF, msg.value);

    }

    function coinSendSameValue(address _tokenAddress, address[] _to, uint _value) internal {

        //uint sendValue = msg.value;
        // bool vip = isVIP(msg.sender);
        // if (!vip) {
        //     require(sendValue >= txFee);
        // }
        require(_to.length <= 255,"Don't satisfied");

        address from = msg.sender;
        uint256 sendAmount = _to.length.sub(1).mul(_value);

        StandardToken token = StandardToken(_tokenAddress);

        require(token.allowance(msg.sender, this) > 0, "why not correct?");
        for (uint8 i = 0; i < _to.length; i++) {
            token.transferFrom(from, _to[i], _value);
        }

        emit LogTokenBulkSent(_tokenAddress, sendAmount);

    }

    function coinSendDifferentValue(address _tokenAddress, address[] _to, uint[] _value) internal {

        //uint sendValue = msg.value;
        // bool vip = isVIP(msg.sender);
        // if (!vip) {
        //     require(sendValue >= txFee);
        // }

        require(_to.length == _value.length);
        require(_to.length <= 255);

        uint256 sendAmount = _value[0];
        StandardToken token = StandardToken(_tokenAddress);

        for (uint8 i = 0; i < _to.length; i++) {
            token.transferFrom(msg.sender, _to[i], _value[i]);
        }
        emit LogTokenBulkSent(_tokenAddress, sendAmount);

    }


    // 1. 通过隐式调用方法发送具有不同值的ether
    function bulkSendETHWithDifferentValue(address[] _to, uint[] _value) payable public {
        ethSendDifferentValue(_to, _value);
    }


    // 2. 通过隐式调用方法发送具有相同值的ether
    function bulkSendETHWithSameValue(address[] _to, uint _value) payable public {
        ethSendSameValue(_to, _value);
    }

    // 3. 通过隐式调用方法发送相同值的token
    function bulkSendCoinWithSameValue(address _tokenAddress, address[] _to, uint _value) payable public {
        coinSendSameValue(_tokenAddress, _to, _value);
    }

    // 4. 通过隐式调用方法发送不同值的token
    function bulkSendCoinWithDifferentValue(address _tokenAddress, address[] _to, uint[] _value) payable public {
        coinSendDifferentValue(_tokenAddress, _to, _value);
    }

}
