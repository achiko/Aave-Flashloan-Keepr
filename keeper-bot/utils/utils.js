const web3Transactions = require("./web3Transactions");
const web3SerializeTransaction = require("./web3SerializeTransaction");
const web3Accounts = require("./web3Accounts");

module.exports = {
	SendAndConfirmTransaction : web3Transactions.SendAndConfirmTransaction,
	SerializeTransaction : web3SerializeTransaction.SerializeTransaction,
	AccountBalance : web3Accounts.getAccountBalance  
};