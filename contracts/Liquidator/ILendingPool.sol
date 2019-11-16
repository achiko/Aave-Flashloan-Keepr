pragma solidity ^0.5.0;


interface ILendingPool {

function getUserReserveData(address _reserve, address _user)
        external
        view
        returns (
            uint256 currentATokenBalance
        );

    function getReserves() external view returns(address[] memory);
    
    
    function liquidationCall(address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken)
       external
        payable;
        

}