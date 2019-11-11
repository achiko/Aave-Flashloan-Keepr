const myContract = artifacts.require("myContract");

module.exports = async (deployer, network, accounts) => {

    // console.log("--------------------");
    // console.log("Network :  ", network);
    // console.log("Accounts :  ", accounts);
    // console.log("Deployer :  ", deployer);
    // console.log("--------------------");
           
    await deployer.deploy(myContract, "0xB36017F5aafDE1a9462959f0e53866433D373404");
    const _myContract  = await myContract.deployed();
    console.log("Deployed: ", _myContract.address);
};

