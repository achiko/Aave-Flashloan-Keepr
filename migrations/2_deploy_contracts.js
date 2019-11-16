const LiquidationWithFlashLoans = artifacts.require("LiquidationWithFlashLoans");

module.exports = async (deployer, network, accounts) => {
	        
    await deployer.deploy(LiquidationWithFlashLoans, "0x9C6C63aA0cD4557d7aE6D9306C06C093A2e35408");
    const _liquidationWithFlashLoans  = await LiquidationWithFlashLoans.deployed();
    console.log("Deployed: ", _liquidationWithFlashLoans.address);
};

