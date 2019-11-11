import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../flashloan/base/FlashLoanReceiverBase.sol";
import "../configuration/LendingPoolAddressesProvider.sol";
import "../configuration/NetworkMetadataProvider.sol";

import "../ILendingPool.sol";

contract FlashLoanReceiverExample is FlashLoanReceiverBase {

    using SafeMath for uint256;
    
    // Storage 
    address collateral;
    address user;
    uint256 amount;
    address reserve;

    ILendingPool lendingpool;

    constructor(LendingPoolAddressesProvider _provider) FlashLoanReceiverBase(_provider) public {

    }
    
    // Not Sure if this wai is coorect
    // To Do Add OnlyOwner  
    function setLendingPool (address _lendingPoolAddress) public  {
        lendingpool =  ILendingPool(_lendingPoolAddress);
    }
    
    // Set parameters for liquidation // this version is for only for liquidation single Unsafe loan
    // To Do : Add OnlyOwner
    function setLiquidationParams(  address _collateral, 
                                    address  _user, 
                                    uint256 _amount, 
                                    address _reserve)  public 
    {   

        collateral = _collateral;
        user = _user;
        amount = _amount; // ALready calculated Purchase amount  ? 
        reserve = _reserve;
    }

    // Provide nessessary Amount for liquidation 
    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee) external returns(uint256 returnedAmount) {

        //check the contract has the specified balance
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance for the contract");


        /************************************************/

        // 1.  Call liquidationCall function in Lendingpool 

        //address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken
        lendingpool.liquidationCall(collateral, user, amount, true);
        /*******  *****************************************/       


        transferFundsBackToPoolInternal(_reserve, _amount.add(_fee));
        return _amount.add(_fee);
    }
}