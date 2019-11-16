pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../flashloan/base/FlashLoanReceiverBase.sol";
import "../flashloan/interfaces/IFlashLoanReceiver.sol";
import "../interfaces/ILendingPoolAddressesProvider.sol";
import "../interfaces/INetworkMetadataProvider.sol";


contract LiquidationWithFlashLoans is FlashLoanReceiverBase {

    using SafeMath for uint256;
    address collateral;
    address user;
    uint256 amount;
    address reserve;

    ILendingPoolAddressesProvider addressesProvider;


    constructor(ILendingPoolAddressesProvider _provider) public {
        addressesProvider = _provider;
    }
    /*
    function setLendingPool (address _lendingPoolAddress) public  {
         lendingpool =  ILendingPool(_lendingPoolAddress);
    }
    */
    /**
        * Set parameters for liquidation // this version is for only for liquidation single Unsafe loan
     */
    function setLiquidationParams( address _collateral, address  _user, uint256 _amount, address _reserve)  external  {   
        collateral = _collateral;
        user = _user;
        amount = _amount;
        reserve = _reserve;
    }


    /** Execute Operation  */

    function executeOperation( address _reserve, uint256 _amount, uint256 _fee) external returns(uint256 returnedAmount) {

        //check the contract has the specified balance
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance for the contract");


        /************************************************/

        /* 1.  Call liquidationCall function in Lendingpool  */

        /**
            address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken
        */
        
        /* lendingpool.liquidationCall(collateral, user, amount, true); */


        transferFundsBackToPoolInternal(_reserve, _amount.add(_fee));
        return _amount.add(_fee);
    }
}