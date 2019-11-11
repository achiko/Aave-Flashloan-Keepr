const { web3, abi, addresses } = require("../CONFIG.DEV");
const BigNumber = require('bignumber.js');

const initContracts = async () => {

    const LendingPool_INSTANCE = await new web3.eth.Contract(abi.LendingPool, addresses.LendingPool);
    const LendingPoolCore_INSTANCE = await new web3.eth.Contract(abi.LendingPoolCore, addresses.LendingPoolCore);
    const addressProvider_INSTANCE = await new web3.eth.Contract(abi.LendingPoolAddressesProvider, addresses.LendingPoolAddressesProvider);
    
    return {
		LendingPool_INSTANCE : LendingPool_INSTANCE,
        LendingPoolCore_INSTANCE : LendingPoolCore_INSTANCE,
        addressProvider_INSTANCE : addressProvider_INSTANCE
	};
};


module.exports = {
    initContracts : initContracts
}
