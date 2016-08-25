// example.sol
// PriceGeth - Price API on Ethereum Blockchain
// Velocity.technology - Shayan Eskandari (shayan at bitaccess.co)
// https://github.com/VelocityMarket/pricegeth


import "pricegeth.sol";
//import "github.com/VelocityMarket/pricegeth/contracts/pricegeth.sol";

contract Example {

  address public PriceGethAddress;

  function Example() {
    PriceGethAddress = 0x0731729bb6624343958d05be7b1d9257a8e802e7;
  }

  //get price at blockNumber's time
  //returns (USDBTC, BTCETH, BTCETC, BTCDOGE)
  function getPrices(uint blockNumber) constant returns(uint, uint, uint, uint){
    return Pricegeth(PriceGethAddress).getPrices(blockNumber);
  }

}
