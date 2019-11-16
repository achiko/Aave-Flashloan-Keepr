pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../flashloan/base/FlashLoanReceiverBase.sol";
import "../flashloan/interfaces/IFlashLoanReceiver.sol";
import "../interfaces/ILendingPoolAddressesProvider.sol";
import "../interfaces/INetworkMetadataProvider.sol";

import "./ILendingPool.sol";

contract LiquidationWithFlashLoans is FlashLoanReceiverBase {

    using SafeMath for uint256;

    address public reserve;
    address public collateral;
    address public user;
    uint public amount;
    

    ILendingPoolAddressesProvider addressesProvider;
    ILendingPool lendingPool;

    constructor(ILendingPoolAddressesProvider _provider) FlashLoanReceiverBase(_provider) public {
        addressesProvider = _provider;
    }
    
    /** 
        Rewrite This parst as :  ILendingPoolAddressesProvider.getLendingPool() 
     */
    function setLendingPool (address _lendingPoolAddress) public  {
        lendingPool =  ILendingPool(_lendingPoolAddress);
    }
    
    /**
        * Set parameters for liquidation // this version is for only for liquidation single Unsafe loan
     */
    function setLiquidationParams(address _reserve, address _collateral, address  _user, uint _amount)  external  {   
        
        reserve = _reserve;
        collateral = _collateral;
        user = _user;
        amount = _amount;
        
    }


    /** Execute Operation  */

    function executeOperation( address _reserve, uint256 _amount, uint256 _fee) external returns(uint256 returnedAmount) {

        //check the contract has the specified balance
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance for the contract");
        
        /************************************************/
        /* 1.  Call liquidationCall function in Lendingpool  */
        lendingpool.liquidationCall(collateral, user, amount, true);


        transferFundsBackToPoolInternal(_reserve, _amount.add(_fee));
        return _amount.add(_fee);
    }
}