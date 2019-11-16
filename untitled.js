Hi 

 // Trying to query priceOracle instance 

// Get PriceOracle address 
let priceOracleAddress = addressProvider_INSTANCE.methods.getPriceOracle().call();

Result :  0x50913E8E1c650E790F8a1E741FF9B1B1bB251dfe

const priceOracleInstance = await new web3.eth.Contract(abi.AaveOracle, _priceOracleAddress);

let _address = "0x436264Ac032f7f271934Fa920dcD655210193090"; // aEth
const currentPrice = await priceOracleInstance.methods.getAssetPrice(_daiAddress).call();

Current price :  0

I've tested for all address 

    
Hi 
AaveOracle : https://github.com/aave/aave-protocol/blob/master/abi/AaveOracle.json
And 
IPriceOracle  https://github.com/aave/aave-protocol/blob/master/contracts/interfaces/IPriceOracle.sol

There are some differences, which one is workin deployed version ? 


