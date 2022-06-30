//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Domains {

    mapping(string=>address) public domains;

    constructor() {
        console.log("Deploying the ENS Domains Smart Contract!");
    }
    function register(string calldata name) public {
        domains[name] = msg.sender;
    }
    function getAddress(string calldata name) public view returns(address) {
        return domains[name];
    }
}
