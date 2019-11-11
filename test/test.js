const myContract = artifacts.require("myContract");
const { should, EVMThrow, getParamFromTxEvent } = require('./helpers');

let daiCaller = null;

contract('myContract',  accounts  => {

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    before('Setup contract for each test', async () => {
        _myContract = await myContract.deployed(); 
        console.log(_myContract.address)
    })

    it('Should Get Correct Account balance from Token Instance', async () => {
 
        assert.equal(true, true);
    });

});

