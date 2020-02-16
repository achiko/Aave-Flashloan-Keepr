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




## Forking Block From Mainnet to Ganache 

```
https://medium.com/@samajammin/how-to-interact-with-ethereums-mainnet-in-a-development-environment-with-ganache-3d8649df0876

ganache-cli --fork https://mainnet.infura.io/v3/{infura_project_id}@{block_number}

ganache-cli --fork https://mainnet.infura.io/v3/716a47f6015f4235aa0b8b36e8280334@14310756  --u 0x4CfaAc23D3e08C0B747449efA72756e61E7A5416

ganache-cli --fork https://kovan.infura.io/v3/716a47f6015f4235aa0b8b36e8280334  --unlock 0x4CfaAc23D3e08C0B747449efA72756e61E7A5416 --debug --verbose

```
## Run Parity Node.
--light  Have a limitation , cant fetch logs more than 1000 blocks.
parity --chain=kovan --ws-apis="eth,net,web3,personal,web3,pubsub,parity,parity_pubsub" --jsonrpc-apis=all
