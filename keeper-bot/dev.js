//const {table} = require('table');
const { web3, abi, addresses } = require("./CONFIG.DEV");
const BigNumber = require('bignumber.js');
const {initContracts} = require("./lib/contractInstances");
const {table} = require("table");

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async() => {

    const { addressProvider_INSTANCE, LendingPoolCore_INSTANCE, LendingPool_INSTANCE } = await initContracts();
    const lendingPoolCoreMethods = LendingPoolCore_INSTANCE.methods; 
    const lendingPoolMethods = LendingPool_INSTANCE.methods;
    const addressProviderMethods  = addressProvider_INSTANCE.methods;
    
    const _priceOracleAddress = await addressProviderMethods.getPriceOracle().call();
    console.log(_priceOracleAddress);
    
    const priceOracleInstance = await new web3.eth.Contract(abi.PriceOracle, _priceOracleAddress);


    let _daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
    const currentPrice = await priceOracleInstance.methods.getAssetPrice(_daiAddress).call();    
    console.log("Current price :  ", currentPrice);

    // Set new asset price 
    const newPrice = new BigNumber(currentPrice).multipliedBy(1.3).toFixed(0);
    console.log("New Price : ", newPrice);

    const transaction = await priceOracleInstance.methods.setAssetPrice(_daiAddress, newPrice).call();
    console.log("Transaction : ", currentPrice);
    

    return;
    
    const _events = await addressProvider_INSTANCE.getPastEvents("PriceOracleUpdated", {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    });

    console.log(_events);

})();

