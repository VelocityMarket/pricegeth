// example.sol
// PriceGeth - Price API on Ethereum Blockchain
// Velocity.technology - Shayan Eskandari (shayan at bitaccess.co)
// https://github.com/VelocityMarket/pricegeth


import "pricegeth.sol";
//import "github.com/VelocityMarket/pricegeth/contracts/pricegeth.sol";

contract Example {

  address public PriceGethAddress;

  function Example() {
    PriceGethAddress = 0x47501afb173cf364cca758f892c1d193c4119a43;
  }

  //get price at blockNumber's time
  //returns (USDBTC, BTCETH, BTCETC, BTCDOGE)
  function getPrices(uint blockNumber) constant returns(uint, uint, uint, uint){
    return Pricegeth(PriceGethAddress).getPrices(blockNumber);
  }

}
