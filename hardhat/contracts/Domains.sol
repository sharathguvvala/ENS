//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract Domains {
    string public tld;
    mapping(string=>address) public domains;
    mapping(string=>string) public records;
    constructor(string memory _tld) {
        tld = _tld;
        console.log("Deploying the ENS Domains Smart Contract!", tld);
    }
    function price(string calldata name) private pure returns(uint256) {
        uint256 len = StringUtils.strlen(name);
        require(len > 0, "zero length names are not allowed");
        if(len == 3){
            return 0.05 * 10**18;
        }
        else {
            return 0.1 * 10**18;
        }
    }
    function register(string calldata name) public payable {
        uint256 _price = price(name);
        require(msg.value >= _price, "insufficient matic");
        domains[name] = msg.sender;
    }
    function getAddress(string calldata name) public view returns(address) {
        return domains[name];
    }
    function setRecord(string calldata name, string calldata record) public {
        require(domains[name]==msg.sender, "not the owner of the domain");
        records[name] = record;
    }
    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}
