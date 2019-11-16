const LiquidationWithFlashLoans = artifacts.require("LiquidationWithFlashLoans");
const { should, EVMThrow, getParamFromTxEvent } = require('./helpers');

let daiCaller = null;
let liquidatorAccount = "0x4CfaAc23D3e08C0B747449efA72756e61E7A5416"

contract('LiquidationWithFlashLoans',  accounts  => {

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    before('Setup contract for each test', async () => {
        _liquidationWithFlashLoans = await LiquidationWithFlashLoans.deployed(); 
        console.log(_liquidationWithFlashLoans.address)
    })

    it('Should set up correct flashloans', async () => {
        
        assert.equal(true, true);
    });

});

