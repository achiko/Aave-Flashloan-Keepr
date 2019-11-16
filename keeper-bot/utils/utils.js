const web3Transactions = require("./web3Transactions");
const web3SerializeTransaction = require("./web3SerializeTransaction");

module.exports = {
	SendAndConfirmTransaction : web3Transactions.SendAndConfirmTransaction,
	SerializeTransaction : web3SerializeTransaction.SerializeTransaction
};