## Token Table 


## Load  reserve and aTokens Data 
```javascript 

    const { addressProvider_INSTANCE, LendingPoolCore_INSTANCE, LendingPool_INSTANCE } = await initContracts();
    const lendingPoolCoreMethods = LendingPoolCore_INSTANCE.methods; 
    const lendingPoolMethods = LendingPool_INSTANCE.methods;
    const addressProviderMethods  = addressProvider_INSTANCE.methods;
    
    const _data = [];
    //-- Get All reservers 
    const allreserves = await lendingPoolMethods.getReserves().call();

    allreserves.map( async (reserve, index) =>{
        let _reserveData =  await lendingPoolMethods.getReserveData(reserve).call();
        let aTokenName = await (await new web3.eth.Contract(abi.AToken, _reserveData.aTokenAddress)).methods.symbol().call(); 
        _data.push([ reserve, _reserveData.aTokenAddress, aTokenName ]);
    })
    
    await sleep(3000);

    console.log( table(_data) );
```

```
╔════════════════════════════════════════════╤════════════════════════════════════════════╤═══════╗
║ 0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD │ 0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A │ aDAI  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x1c4a937d171752e1313D70fb16Ae2ea02f86303e │ 0x3BE8B64104de5b809AAd0eC4514C97A58878eE14 │ aTUSD ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3 │ 0xdE460f92901185d24090BcF6cAc3B37308b2b98A │ aAMPL ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x13512979ADE267AB5100878E2e0f485B568328a4 │ 0xD0F559C8ed680e5666Acb7CB068a6964ee05122c │ aUSDT ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8 │ 0x67F548FC6831222b8565eA69589fd7dc56d2C3Ba │ aKNC  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738 │ 0xEAe6283C6A1EB7E29CA9A4B3F049C894DA7216c1 │ aBAT  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C │ 0x3b9743C458ae58c30069D14e98A2745aD3982480 │ aZRX  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0xD868790F57B39C9B2B51b12de046975f986675f9 │ 0x5537e2b41E6a1e6f72e28B93c48D9EA11caa5A94 │ aSUSD ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x260071C8D61DAf730758f8BD0d6370353956AE0E │ 0xA46d949aB1fc89c33C5CD8163482Eb84BE0A9a8c │ aREP  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x1BCe8A0757B7315b74bA1C7A731197295ca4747a │ 0x538e2C4Fc148f5483fDbb4f24A042B76111F3114 │ aLEND ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x804C0B38593796bD44126102C8b5e827Cf389D80 │ 0x436264Ac032f7f271934Fa920dcD655210193090 │ aETH  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA │ 0xf065FD0972a98D9F1c01AB3EE2D4efbbbb5bD1F7 │ aWBTC ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA │ 0x0697A93267f6c656023F8a5b489435591b849698 │ aMKR  ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789 │ 0x7d2a39c2A3a74d7570f487E203230D3aC00cea80 │ aLINK ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0x738Dc6380157429e957d223e6333Dc385c85Fec7 │ 0xaAc40ceEf68B662643fB9ec641E11a40b7c90B0a │ aMANA ║
╟────────────────────────────────────────────┼────────────────────────────────────────────┼───────╢
║ 0xe22da380ee6B445bb8273C81944ADEB6E8450422 │ 0x20AD264D06f0Cf265054589577c8c2297C26B6C4 │ aUSDC ║
╚════════════════════════════════════════════╧════════════════════════════════════════════╧═══════╝

```

## Fork existing contracts into ganache 
### IpriceOracle coban contract creator is : 0x4206925f7652a5af8a0F48aB714ABbd1EF27D916 
```
ganache-cli --fork https://kovan.infura.io/v3/716a47f6015f4235aa0b8b36e8280334
ganache-cli --fork https://kovan.infura.io/v3/716a47f6015f4235aa0b8b36e8280334@8890316

```