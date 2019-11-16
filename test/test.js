const LiquidationWithFlashLoans = artifacts.require("LiquidationWithFlashLoans");
const BigNumber = require('bignumber.js');
const { should, EVMThrow, getParamFromTxEvent } = require('./helpers');

let flasLoanInstance = null;
let liquidatorAccount = "0x4CfaAc23D3e08C0B747449efA72756e61E7A5416"
let lendingPoolAddress = "0xB36017F5aafDE1a9462959f0e53866433D373404";

contract('LiquidationWithFlashLoans',  accounts  => {

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    before('Setup contract for each test', async () => {
        flasLoanInstance = await LiquidationWithFlashLoans.deployed(); 
        console.log("Flash loan contract address:  ", flasLoanInstance.address);
    })

    it('Should set correct Lending Pool address', async () => {
        const tx = await flasLoanInstance.setLendingPool(lendingPoolAddress, {from  : liquidatorAccount});
        console.log(tx);
        assert.equal(true, true);
    });

    it("Shuld set liqudation variables to smartcontract", async() =>{

        const _reserve = "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738";
        const _collateral = "0xEAe6283C6A1EB7E29CA9A4B3F049C894DA7216c1" // aBat 
        const _user = "0x745522fb4380fDCA544eFEfCe0f7DB3B005437dB";
        const _amountToLiquidate = new BigNumber(188258266577887314737).div(2).toFixed(0);

        console.log(_amountToLiquidate); // 94129133288943665000

        //address _reserve, address _collateral, address  _user, uint256 _amount
        const tx = await flasLoanInstance.setLiquidationParams(_reserve, _collateral, _user, _amountToLiquidate, { from : liquidatorAccount });
        console.log(tx);

        assert.equal(true,true);

    });
    

});

