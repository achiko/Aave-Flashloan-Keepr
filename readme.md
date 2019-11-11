### AAVE Liquidation Bot & Flashloans.

1. Get all Loans via Borrow Events
```javascript
const _loans = await LendingPool.getPastEvents("Borrow", {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
});

// Get  _resrve , _user & _amount from every loans log
let {_reserve, _user,_amount,_referral, timestamp} = _borrowEvent.returnValues;
```
2. Call Lendingpool.getUserAccountData method with _user parameter

```javascript 
    let _loanData = await getUserAccountData(_user).call(); 
```

3. Get HealthFactor value
```javascript 
let healthFactorBN = new BigNumber(healthFactor).dividedBy(10 ** 18); 
if (healthFactorBN.isLessThanOrEqualTo(1)) {
    _unsafeLoans.push(_loanData); // Collect Unsafe loans 
}
```
4. Call LendingPool liquidationCall() function (if you have assets in your wallaet account)

Or

5. Call LendingPool flashLoan() get instant loanand liquidate without providing capital. // See contracts/LiquidationWithFlashLoans.sol





