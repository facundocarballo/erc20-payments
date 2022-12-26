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

contract Faucet {

    // ERC20
    IERC20 public BUSD = IERC20(0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151);
    uint256 constant public AMOUNT_TO_TRANSFER = 15 * 10 ** 18;

    mapping(address => uint256) timestamp_mark;

    constructor() {}

    function claim() public 
    {
        require(block.timestamp > (timestamp_mark[msg.sender] + 1 days), "Try it later...");
        BUSD.transfer(msg.sender, AMOUNT_TO_TRANSFER);
        timestamp_mark[msg.sender] = block.timestamp + 1 days;
    }
}