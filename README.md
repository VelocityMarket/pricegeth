# PriceGeth
Price API on Ethereum Blockchain


## How PriceGeth works
  - A server is saving Poloniex Prices (USDBTC, BTCETH, BTCETC, BTCDOGE) every 1 second
  - PriceGeth server is listening on geth (Tesnet Morden for now) for new blocks
  - When PriceGeth server sees a new block it fetches the price at Blocktime
  - PriceGeth server sends the data to PriceGeth smart-contract which can be used by other smart-contracts both as a price API and also a historical price ledger (Beta)


## Usage

```
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
```
__Note__ Fetching prices from PriceGeth is free and no gas is needed *Green*
