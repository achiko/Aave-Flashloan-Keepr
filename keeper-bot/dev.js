//const {table} = require('table');
const { web3, abi, addresses } = require("./CONFIG.DEV");
const BigNumber = require('bignumber.js');
const {initContracts} = require("./lib/contractInstances");
const web3Utils = require("./utils/utils");
const {table} = require("table");
require('dotenv-flow').config();

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
    

    const transaction = await priceOracleInstance.methods.setAssetPrice(_daiAddress, newPrice).call({ from : "0x4206925f7652a5af8a0F48aB714ABbd1EF27D916" });
    console.log("Transaction : ", currentPrice);

    
    return;
    
    console.log("Modify DAI price");
	let encodedData = await priceOracleInstance.methods["setAssetPrice"](_daiAddress, newPrice).encodeABI();
    
    const transactionData = {
        _from : process.env.LIQUIDATOR_ACCOUNT_OWNER,
		_to : priceOracleInstance._address,
		_data : encodedData,
		_privateKey : process.env.LIQUIDATOR_ACCOUNT_OWNER_PRIVATE_KEY
    };

    console.log(transactionData);
    console.log("--------------");

	let serializedData = await web3Utils.SerializeTransaction(transactionData);
    console.log("seralized Data : ", serializedData);
    
    let transactionStatus = await web3Utils.SendAndConfirmTransaction(serializedData);
    console.log("--------------");
    //console.log(transactionStatus);
    
    return;

    const _events = await addressProvider_INSTANCE.getPastEvents("PriceOracleUpdated", {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    });

    console.log(_events);

})();

