const CONFIG = require("../CONFIG.DEV");
const DEFAULT_INTERVAL = 3000;
const { logger } = CONFIG;

const getTransactionStatusByHash = (web3, txHash, options) => {
	const interval = options && options.interval ? options.interval : DEFAULT_INTERVAL;
	const getTransaction = async (txHash, resolve, reject) => {
		let receipt = await web3.eth.getTransactionReceipt(txHash); 
		if (!receipt) {
			logger("Fetch again in : " +  interval + " millisecconds ");
			setTimeout(() => {
				getTransaction(txHash, resolve, reject);
			}, interval);

		}else{
			resolve(receipt);
		}
	};
	return new Promise( (resolve, reject) => {
		getTransaction(txHash, resolve, reject);
	});
};

module.exports = {
	getTransactionStatusByHash : getTransactionStatusByHash
};