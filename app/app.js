// This is a simple NodeJS app to display triggered events on a smart contract
// you need your contract ABI and deployed address and also a synced geth running
// github.com/shayanb

var optionsABI = [{'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'timestamp', 'outputs': [{'name': '', 'type': 'uint40'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'timestamp', 'type': 'uint40'}], 'name': 'queryTimestamp', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'firstBlock', 'outputs': [{'name': '', 'type': 'uint40'}], 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'amount', 'type': 'uint256'}], 'name': 'recoverFunds', 'outputs': [{'name': '', 'type': 'bool'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'BTCETC', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'BTCDOGE', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'lastBlock', 'outputs': [{'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'getPrices', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'BTCETH', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'blockNumber', 'type': 'uint256'}], 'name': 'USDBTC', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'timestamp', 'type': 'uint40'}, {'name': 'blocknumber', 'type': 'uint40'}, {'name': 'USDBTC', 'type': 'uint256'}, {'name': 'BTCETH', 'type': 'uint40'}, {'name': 'BTCETC', 'type': 'uint40'}, {'name': 'BTCDOGE', 'type': 'uint40'}], 'name': 'setPrice', 'outputs': [], 'type': 'function'}, {'inputs': [], 'type': 'constructor'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'timestamp', 'type': 'uint256'}, {'indexed': false, 'name': 'blocknumber', 'type': 'uint256'}, {'indexed': false, 'name': 'USDBTC', 'type': 'uint256'}, {'indexed': false, 'name': 'BTCETH', 'type': 'uint256'}, {'indexed': false, 'name': 'BTCETC', 'type': 'uint256'}, {'indexed': false, 'name': 'BTCDOGE', 'type': 'uint256'}], 'name': 'PriceUpdated', 'type': 'event'}]
var contractAddress = '0x685c662cE0779ea3b6bBA84948CA08F04Fc877ff'

var Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

console.log('Eth Node Version: ', web3.version.node)
// console.log("Network: " ,web3.version.network, web3.version.ethereum);
console.log('Connected: ', web3.isConnected(), web3.currentProvider)
console.log('syncing: ', web3.eth.syncing, ', Latest Block: ', web3.eth.blockNumber)
console.log('Accounts[0]: ', web3.eth.accounts[0], ':', web3.eth.getBalance(web3.eth.accounts[0]).toNumber())

OptionsContract = initContract(optionsABI, contractAddress)

function initContract (contractAbi, contractAddress) {
  var MyContract = web3.eth.contract(contractAbi)
  var contractInstance = MyContract.at(contractAddress)
  var event = contractInstance.allEvents()
  console.log('listening for events on ', contractAddress)
  // watch for changes
  event.watch(function (error, result) { // This is where events can trigger changes in UI
    if (!error) {
      console.log(result)
    }
  })
  return contractInstance
}
