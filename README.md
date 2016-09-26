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
    PriceGethAddress = 0x0731729bb6624343958d05be7b1d9257a8e802e7;
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

## Events / Real time price updates
On every price update PriceGeth smart contract would trigger an event called `PriceUpdated`. You can use these on UI on charts or any other application which needs (almost) real time data.

`node app/app.js`

example object:
```
{ address: '0x0731729bb6624343958d05be7b1d9257a8e802e7',
  blockHash: '0xee272a6048d9a583d610890de408981eacfe0cbd7bab107f00be9da51288ea60',
  blockNumber: 1667534,
  logIndex: 1,
  transactionHash: '0x596adc436fce0432fada47819203ab6835da3e73199e9db71083bf417a01d497',
  transactionIndex: 1,
  event: 'PriceUpdated',
  args:
   { timestamp: { [String: '1474324837'] s: 1, e: 9, c: [Object] },
     blocknumber: { [String: '1667532'] s: 1, e: 6, c: [Object] },
     USDBTC: { [String: '6100000076699'] s: 1, e: 12, c: [Object] },
     BTCETH: { [String: '211199900'] s: 1, e: 8, c: [Object] },
     BTCETC: { [String: '20989899'] s: 1, e: 7, c: [Object] },
     BTCDOGE: { [String: '3900'] s: 1, e: 3, c: [Object] } } }
```

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
