//const {table} = require('table');
const { web3, abi, addresses } = require("./CONFIG.DEV");
const BigNumber = require('bignumber.js');
const { loadLoansAsync, loadLoansSync  } = require("./lib/loans");
const {initContracts} = require("./lib/contractInstances");
const {table} = require("table");

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


(async() => {

    const {_unsafeLoans, count }  = await loadLoansAsync();
    console.log(`Total Loans ${count}`)
    console.log(`Usafe Loans : ${_unsafeLoans.length}`);

    if(_unsafeLoans.length > 0 ) {
        // Execute Liquidation Function 
    }
    

})();

