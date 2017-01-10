from web3 import Web3, RPCProvider
import json

from contract_details import contract_abi, contract_bytes
abi = contract_abi
contract_bytes = contract_bytes




web3rpc = Web3(RPCProvider(host="127.0.0.1", port="8545"))
contract_abi = json.loads(abi)


def init_contract(contract_address = None):
    '''
    if a contract address is passed it would initiate using that address
    if not, this would deploy a new contract based on contract details above and return the instance
    '''

    this_contract = web3rpc.eth.contract(contract_abi, address=contract_address)
    print ("Contract at %s" % contract_address)
    return this_contract


def get_all_data(this_contract, id = None):
    '''
    gets all data in the contract for id
            if id is None, it gets the last available data
    '''
    if id is None:
        id = this_contract.call().lastBlock()

    data = {}
    data["timestamp"] = this_contract.call().timestamp(id)
    data["blockNumber"] = id
    prices = this_contract.call().getPrices(id)
    data["USDBTC"] = prices[0]
    data["BTCETH"] = prices[1]
    data["BTCETC"] = prices[2]
    data["BTCDOGE"] = prices[3]
    return data


def get_everything(this_contract, last_id_to_fetch = None, first_id_to_fetch = 0):
    '''
    fetches all historical data from a contract
    '''
    if last_id_to_fetch is None:
        last_id_to_fetch = this_contract.call().lastBlock()
        first_id_to_fetch = this_contract.call().firstBlock()

    for id in xrange(first_id_to_fetch,last_id_to_fetch):
            print get_all_data(this_contract, id)






def fetch_all_historical_data(contract_address="0x685c662cE0779ea3b6bBA84948CA08F04Fc877ff"):
    this_contract = init_contract(contract_address=contract_address)
    get_everything(this_contract)



fetch_all_historical_data(contract_address="0x685c662cE0779ea3b6bBA84948CA08F04Fc877ff")
