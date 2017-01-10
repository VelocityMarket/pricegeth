// example.sol
// PriceGeth - Price API on Ethereum Blockchain
// Velocity.technology - Shayan Eskandari (shayan at bitaccess.co)
// https://github.com/VelocityMarket/pricegeth
pragma solidity ^0.4.1;

import "pricegeth.sol";
//import "github.com/VelocityMarket/pricegeth/contracts/pricegeth.sol";

contract Example {

  address public PriceGethAddress;

  function Example() {
    PriceGethAddress = 0x685c662cE0779ea3b6bBA84948CA08F04Fc877ff;
  }

  //get price at blockNumber's time
  //returns (USDBTC, BTCETH, BTCETC, BTCDOGE)
  function getPrices(uint blockNumber) constant returns(uint, uint, uint, uint){
    return Pricegeth(PriceGethAddress).getPrices(blockNumber);
  }

}
