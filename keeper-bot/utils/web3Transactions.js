const transactionStatus = require("./web3TransactionStatus");
const CONFIG = require("../CONFIG.DEV");
const { web3, logger } = CONFIG;


const SendAndConfirmTransaction = async (_seralisedTransaction) => {
	
	logger("1. SEND SIGNED TRANSACTION");
	const sendResponse = await SendSignedTransaction(_seralisedTransaction);
	logger(` Transaction hash :`, sendResponse);
	
	if(!sendResponse.hash) {
		return { success : false,  msg: sendResponse ,receipt : null };
	}
	
	logger("2. GET TRANSACTION STATUS");
	const minedTxReceipt = await transactionStatus.getTransactionStatusByHash(web3, sendResponse.hash);

	return { 
		success: minedTxReceipt.status , 
		receipt : minedTxReceipt 
	};
};

// Gas Estimation Calculation 
const estimateGas = () => {
	
}


const SendSignedTransaction = (_seralisedTransaction) => {
	return new Promise((resolve, reject) => {
		web3.eth.sendSignedTransaction(_seralisedTransaction, (err, hash) => {
			if(err) {
				logger("--- ERROR JSON ---");
				// parse Json from error response : Taken FROM :  https://regex101.com/r/yZ9fO6/1 
				// const regex = /\{(?:[^{}]|(R))*\}/g;
				// let m = regex.exec(err);
				// logger(m[0]);
				// const errorMessage = JSON.parse(m[0]);
				console.log( err );
				resolve({hash : null , error : null });
			}
			resolve({ hash : hash });
		});
	});
};

module.exports = {
	SendAndConfirmTransaction : SendAndConfirmTransaction
};