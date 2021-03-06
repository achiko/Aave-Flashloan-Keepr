const {
    web3,
    abi,
    addresses
} = require("../CONFIG.DEV");
const BigNumber = require('bignumber.js');
const { initContracts  } = require("./contractInstances");
const _ = require("lodash");

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const loadLoansAsync = async () => {

        console.log("---------------  START ------------------");
        const { LendingPool_INSTANCE } = await initContracts();        
        const {
            getUserAccountData
        } = LendingPool_INSTANCE.methods;

        // Get All Loans via GetPastEvents 
        const _loans = await LendingPool_INSTANCE.getPastEvents("Borrow", {
            filter: {},
            fromBlock: 0,
            toBlock: 'latest'
        });

        const _unsafeLoans = [];
        const _tableData = [];

        _.map(_loans, async (_borrowEvent, index) => {

                let {
                    _reserve,
                    _user,
                    _amount,
                    _referral,
                    timestamp
                } = _borrowEvent.returnValues;

                let _loanData = await getUserAccountData(_user).call(); // Call getUserAccountData function

                let {
                    healthFactor
                } = _loanData; // Get healthfactor 
                let healthFactorBN = new BigNumber(healthFactor).dividedBy(10 ** 18);

                if (healthFactorBN.isLessThanOrEqualTo(1)) {
                    console.log("Unsafe Loan !!! ");
                    console.log("Reserve : ", _reserve, "User: ", _user, " Amount : ", _amount, new Date(timestamp * 1000));
                    _unsafeLoans.push(_loanData);
                }
            })

        sleep(10000);

        return ( { _unsafeLoans, "count" :  _loans.length } )
}
    

const loadLoansSync = async () => {

    const { LendingPool_INSTANCE } = await initContracts();      
    const {
        getUserAccountData
    } = LendingPool_INSTANCE.methods;

    // Get All Loans via GetPastEvents 
    const _loans = await LendingPool_INSTANCE.getPastEvents("Borrow", {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    });

    for (let index = 0; index < _loans.length; index++) {

        let { _reserve, _user, _amount, _referral, timestamp } = _loans[index].returnValues;
        let _loanData = await getUserAccountData(_user).call();
        let { healthFactor } = _loanData;

        
        healthFactorBN = new BigNumber(healthFactor).dividedBy(10 ** 18);

        if( healthFactorBN.isLessThanOrEqualTo(1)) {
            console.log("Unsafe Loan !!! ");
            console.log("Reserve : ", _reserve, "User: ", _user, " Amount : ", _amount, new Date(timestamp*1000));
            _unsafeLoans.push(_loanData)
        }

        // // - My Account just for testing ... 
        // if(_user === "0x4CfaAc23D3e08C0B747449efA72756e61E7A5416") {
        //     //console.log(_loanData);
        //     console.log("HealthFactor : ", healthFactor, "BN : ", healthFactorBN.toString());
        // }
    }

    return (_unsafeLoans)
}


module.exports = {
    loadLoansAsync: loadLoansAsync,
    loadLoansSync: loadLoansSync
}