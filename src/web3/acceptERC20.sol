// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Src: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol
interface IERC20 {
 
   function totalSupply() external view returns (uint256);
 
   function balanceOf(address account) external view returns (uint256);
 
   function transfer(address to, uint256 amount) external returns (bool);
 
   function allowance(address owner, address spender) external view returns (uint256);
 
   function approve(address spender, uint256 amount) external returns (bool);
 
   function transferFrom(
       address from,
       address to,
       uint256 amount
   ) external returns (bool);
 
   event Transfer(address indexed from, address indexed to, uint256 value);
 
   event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract AcceptERC20 {

    // ERC20
    IERC20 public BUSD = IERC20(0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151);

    // Addresses
    address public dev1 = 0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;
    address public dev2 = 0x0b4e72a8f9920569cA880DA13B88B0210AB5Bf00;

    // Variables
    uint256 constant public PRICE_UNIQUE_PAY = 50 * 10**18;
    uint256 constant public PRICE_MONTHLY_PAY = 1 * 10**18;

    uint256 constant public PERIOD = 30 days;

    mapping(address => bool) public paid;

    mapping(address => uint256) public timestampClosePeriod;

    mapping(address => uint256) public amountToReceive;

    // Require Messages
    string constant MSG_PAID_ERROR = "The amount that you sent isn't enought to buy this product.";
    string constant MSG_FAIL_AUTH = "You are not qualified to call this function.";

    constructor() {}

    // Functions
    function singlePay(uint256 _amount) public 
    {
        // We have to receive: 
            //  the _amount on WEI
            //  the _amount with his respectival approvement already done.
        
        require(_amount >= PRICE_UNIQUE_PAY, MSG_PAID_ERROR);

        uint256 toReceiveDev2 = _amount / 3;

        BUSD.transfer(address(this), _amount);

        paid[msg.sender] = true;

        amountToReceive[dev1] += _amount - toReceiveDev2; // dev1 receives 66% of the sale
        amountToReceive[dev2] += toReceiveDev2; // dev2 receives 33% of the sale

    }

    function monthlyPay(uint256 _amount) public
    {
        require(_amount >= PRICE_MONTHLY_PAY, MSG_PAID_ERROR);

        timestampClosePeriod[msg.sender] = block.timestamp + PERIOD;

        uint256 toReceiveDev2 = _amount / 3;

        BUSD.transfer(address(this), _amount);

        paid[msg.sender] = true;

        amountToReceive[dev1] += _amount - toReceiveDev2; // dev1 receives 66% of the sale
        amountToReceive[dev2] += toReceiveDev2; // dev2 receives 33% of the sale
    }

    function claim() public 
    {
        require(msg.sender == dev1 || msg.sender == dev2, MSG_FAIL_AUTH);

        BUSD.transfer(msg.sender, amountToReceive[msg.sender]);

        amountToReceive[msg.sender] = 0;
    }

    function isActive(address _wallet) public view returns(bool)
    {
        return (paid[_wallet] || block.timestamp < timestampClosePeriod[_wallet]);
    }

}
