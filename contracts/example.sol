import "pricegeth.sol";

contract Example is Pricegeth {

  address public PriceGethAddress;
  //Pricegeth pricegeth;

  function Example() {
    PriceGethAddress = 0x47501afb173cf364cca758f892c1d193c4119a43;
  }

  //get price at blockNumber's time
  //returns (USDBTC, BTCETH, BTCETC, BTCDOGE)
  function getPrices(uint blockNumber) constant returns(uint, uint, uint, uint){
    return Pricegeth(PriceGethAddress).getPrices(blockNumber);
  }

  //returns (USDBTC, BTCETH, BTCETC, BTCDOGE, BlockTimestamp)
  /*function getPriceAtTime(uint40 timestamp) constant returns (uint, uint, uint, uint, uint){
    uint[] memory results;
    (results[0], results[1]) = Pricegeth(PriceGethAddress).queryTimestamp(timestamp);
    return (getPrices(results[0]), results[1]);
  }*/

}
