pragma solidity ^0.4.2;
 contract DATAXToken{
    string  public name = "DATAX Token";
    string  public symbol = "DTX";
    string  public standard = "DATAX Token v1.0";
    string public ipfshash;
    uint256 public totalSupply;
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    function set(string memory _ipfshash) public 
    {
        ipfshash = _ipfshash;
    }
    
    function get() public view returns (string memory){
        return ipfshash;
    }

    function DTX (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
        get();
    }
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
} 

contract DATAXTokenSale{
    address user;
    DATAXToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    event Sell(address _consumer, uint256 _amount);
    function DTXSale(DATAXToken _tokenContract, uint256 _tokenPrice) public {
        user = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(this) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }
    function endSale() public {
        require(msg.sender == user);
        require(tokenContract.transfer(user, tokenContract.balanceOf(this)));
        user.transfer(address(this).balance);
    }
}

contract Migrations {
  address public user;
  uint public _last_completed_migration;

  constructor() public {
    user = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == user) _;
  }

  function setCompleted(uint completed) public restricted {
    _last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(_last_completed_migration);
  }
}