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

Checkout `pricegeth.sol` for more functionalities such as get query price by timestamp, get only one price pair, etc...

__Note__ Fetching prices from PriceGeth is free and no gas is needed


## Historical Data

There are different ways to fetch all the data from PriceGeth. Although it's possible to do the same in Solidity within any smart-contract, Here's one example using [web3.py](https://github.com/pipermerriam/web3.py) is included in this repo under `Misc` directory.

All you need is to run an Ethereum testnet RPC server.

`geth --testnet --rpc`

When fully synced, you can run the following to get everything:

`python pricegeth_history.py`

```
...

{'BTCETH': 196600000, 'timestamp': 1472166558, 'BTCETC': 23938000, 'blockNumber': 1543233, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
{'BTCETH': 196600000, 'timestamp': 1472166576, 'BTCETC': 23938000, 'blockNumber': 1543234, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
{'BTCETH': 196580199, 'timestamp': 1472166603, 'BTCETC': 23938000, 'blockNumber': 1543235, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
{'BTCETH': 196460700, 'timestamp': 1472166618, 'BTCETC': 23938000, 'blockNumber': 1543236, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
{'BTCETH': 196460700, 'timestamp': 1472166620, 'BTCETC': 23938000, 'blockNumber': 1543237, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
{'BTCETH': 196425299, 'timestamp': 1472166650, 'BTCETC': 23900200, 'blockNumber': 1543238, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 196425299, 'timestamp': 1472166654, 'BTCETC': 23900400, 'blockNumber': 1543239, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 196800000, 'timestamp': 1472166685, 'BTCETC': 23900400, 'blockNumber': 1543240, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 196811900, 'timestamp': 1472166709, 'BTCETC': 23950300, 'blockNumber': 1543241, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 196811900, 'timestamp': 1472166713, 'BTCETC': 23950300, 'blockNumber': 1543242, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 196800000, 'timestamp': 1472166782, 'BTCETC': 23950300, 'blockNumber': 1543243, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 197239800, 'timestamp': 1472166797, 'BTCETC': 23950300, 'blockNumber': 1543244, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 197181700, 'timestamp': 1472166845, 'BTCETC': 23900200, 'blockNumber': 1543245, 'USDBTC': 5766500055000, 'BTCDOGE': 3900}
{'BTCETH': 197029799, 'timestamp': 1472166900, 'BTCETC': 23900100, 'blockNumber': 1543246, 'USDBTC': 5766500055000, 'BTCDOGE': 4000}
...

```


