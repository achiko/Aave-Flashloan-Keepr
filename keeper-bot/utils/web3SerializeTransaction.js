const CONFIG = require("../CONFIG.DEV");
const Tx = require("ethereumjs-tx");
const web3 = CONFIG.web3;

const SerializeTransaction = async ({_from, _to, _data, _privateKey }) => {

	// To Do Chek if without 0x ... hex 
	const privateKey =  _privateKey.substring(0,2) === "0x" ? Buffer.from(_privateKey.substring(2), "hex",) : Buffer.from(_privateKey, "hex",);
	const _chainId = await CONFIG.web3.eth.net.getId();

	const rawTx = {
		nonce: await web3.eth.getTransactionCount(_from),
		from: _from,
		to: _to,
		gasPrice: CONFIG.GAS_PRICE,
		gasLimit: CONFIG.GAS_LIMIT,
		data: _data,
		chainId: _chainId
	};

	let tx = new Tx(rawTx);
	tx.sign(privateKey);

	const serializedTx = tx.serialize();
	const seralisedTransaction = "0x" + serializedTx.toString("hex");

	return seralisedTransaction;
};

module.exports = {
	SerializeTransaction : SerializeTransaction
};