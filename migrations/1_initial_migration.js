const Migrations = artifacts.require("Migrations");
//const DaiCaller = artifacts.require("DaiCaller");


module.exports = function(deployer) {
  deployer.deploy(Migrations);
  
  
};
