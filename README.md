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

## CharityDAO V2 APIs

The contracts are formed with three roles in mind:
- Admins
- Donors
- DAO Participants

And all a member can play two or more roles at the same time too. However, the Admin cannot contribute as freely as non-admins can by being a Donor or a Participant.

List of Methods and Functions

```

constructor(uint256 _globalBallotSeclusion, uint256 _globalProposalVotingDeadline)

wipeBalance()

fallback()
receive()
donate(bool _isAnonymous)
donateVotingRights(uint256 _votingRightsRequestProposalId, uint256 _amountOfRightsToDonate)

addAdmin(address _member)
removeAdmin(address _member)

setGlobalBallotSeclusion(uint256)
setBallotSeclusionById(uint256, uint256)

makeProposal(string, string, uint256, address)
makeRightsDonationProposal(string)
vote(uint256, bool)
```


## Contribute
Feel free to contribute to the template. It's the best coffee you could get me :)

