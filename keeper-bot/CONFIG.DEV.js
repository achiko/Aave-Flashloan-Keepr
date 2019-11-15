const Web3 = require("web3");
require('dotenv-flow').config();

const ETHEREUM_NODE_URL = "https://kovan.infura.io/v3/716a47f6015f4235aa0b8b36e8280334";
//const ETHEREUM_NODE_URL = "http://127.0.0.1:8545";
const web3 = new Web3(ETHEREUM_NODE_URL, null, {});

console.log("------  Web3 Instance Properties  ------ ");
console.log(
	web3.currentProvider.constructor.name,
	"version:", web3.version,
	"web3.eth.transactionConfirmationBlocks:", web3.eth.transactionConfirmationBlocks
);

const PriceOracle = require("./abi/PriceOracle.json");
const AaveOracle = require("./abi/AaveOracle.json");
const AToken = require("./abi/AToken.json");
const LendingPool = require("./abi/LendingPool.json");
const LendingPoolCore = require("./abi/LendingPoolCore.json");
const LendingPoolAddressesProvider = require("./abi/LendingPoolAddressesProvider.json");

const abi = {
	PriceOracle : PriceOracle,
	AaveOracle : AaveOracle, 
	AToken : AToken,
	LendingPool : LendingPool,
	LendingPoolAddressesProvider : LendingPoolAddressesProvider,
	LendingPoolCore : LendingPoolCore
}

const loggingEnabled = true;
const logger = (log, _forcePrint) => {
	const forcePrint = _forcePrint || false;
	if(loggingEnabled || forcePrint) {
		//console.log("------ logger ------");
		console.log(log); 
	}
};


// To Do : Move to .env file ? 
const addresses  = {
	LendingPoolAddressesProvider : "0x9C6C63aA0cD4557d7aE6D9306C06C093A2e35408",
	LendingPool : "0xB36017F5aafDE1a9462959f0e53866433D373404",
	LendingPoolCore	 : "0xAf4Ef1a755F05DD9D68E9e53F111eb63b05fB1FD",
	aETH : "0x436264Ac032f7f271934Fa920dcD655210193090",
	aDAI : "0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A",
	aUSDC : "0x20AD264D06f0Cf265054589577c8c2297C26B6C4"
}

module.exports =  {
	web3 : web3,
	addresses,
	abi : abi,
	logger : logger
}