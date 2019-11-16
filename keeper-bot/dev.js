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
    
    
    const _reserve = "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738";
    const _collateral = "0xEAe6283C6A1EB7E29CA9A4B3F049C894DA7216c1" // aBat 
    const _amountToLiquidate = new BigNumber(188258266577887314737).div(2).toFixed(0);
    console.log(_amountToLiquidate); // 94129133288943665000

    const _flashloanAddress = "0xccabdf4c750d703853f3e0fe5d2021cbb032cd95";
    let liquidatorAccount = "0x4CfaAc23D3e08C0B747449efA72756e61E7A5416"
    const tx = await LendingPool_INSTANCE.methods.flashLoan( _flashloanAddress, _reserve, _amountToLiquidate ).call({ from : liquidatorAccount });

    console.log(tx);

    // Call FlashLoan Function 
    //address payable _receiver, address _reserve, uint _amount
    // let callFlashloanData = await LendingPool_INSTANCE.methods["flashLoan"](flashloanAddress, _reserve, _amountToLiquidate).encodeABI();
    
    // let _transactionData = {
    //     _from : process.env.LIQUIDATOR_ACCOUNT_OWNER,
	// 	_to : LendingPool_INSTANCE._address,
	// 	_data : encodedData,
	// 	_privateKey : process.env.LIQUIDATOR_ACCOUNT_OWNER_PRIVATE_KEY
    // };





    return;
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

