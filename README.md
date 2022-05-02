# CharityDAO

A simple charity DApp which allows users to randomly donate to the DAO, and the members (anyone actually) collectively decide what is to be done with the funds. It doesn't use OpenZeppelin libraries, and uses native currency as primary (ETH in Ethereum & MATIC in Polygon)

## Procedure

1. Install all dependencies

```
npm install 
```

2. Duplicate `secrets.example.json` and rename it to `secrets.json`
3. Insert your private key & api keys (DO NOT SHARE IT WITH ANYONE)
4. Run local frontend setup

```
ng serve
```

5. Test the contracts

```
npx hardhat test
```

6. Deploy to hardhat chain

```
npx hardhat deploy scripts/deploy.js
```

## Contribute
Feel free to contribute to the template. It's the best coffee you could get me :)

