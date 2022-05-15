# 1789 DAO

Named & Inspired by the voting model of Estate's General, 1789 allows users to create divisions or "Estates" and reserve a part of the ballot allocation for a group of participants. Once a proposal is put forward to vote upon, the members of various "estates" vote their decision. However, depending on the result of every estate, only one vote for or against is allocated for the final count to decide the fate of the proposal.

## Example

Assume the following estates with the total number of participants is as given:

| Estate | Number of Members | Votes For on proposal X | Votes Against on Proposal X | Estate decision |
|---|---|---|---|---|
| 1 | 100 | 69 | 31 | PASSED |
| 2 | 4000 | 3000 | 1000 | PASSED |
| 3 | 6000000 | 0 | 6000000 | FAILED |
| **Total** | **6004100** | **3069** | **6001031** | |

| Decision | Members in favour of Decision | Percentage in favour of Decision
|---|---|---|
| Total Memebrs For the Proposal 'X' | 3069 | 0.06%
| Total Members Against the Proposal 'X' | 6001031 | 99.94% 

| Democractic Decision | ```FAILED by 99.94%``` |
|---|---|
| DAO's Decision | ```PASSED by 66.67%``` |

#### Explanation
The DAO individually counts every estate's outcome as the final vote in the ballot:
| Estate | Decision |
| --- | --- |
| 1 | PASSED |
| 2 | PASSED |
| 3 | FAILED |

According to the DAO, ```66.67%``` are FOR, ```33.33%``` are AGAINST the decision. And hence, will conclude the proposal accordingly as ```PASSED```

## Use Cases
A corporate or semi-corporate DAO, where different class of members need to be treated equally within the class, but a class based division is a requirement, such an architecture can come into play. Here are a few fabricated requirements as examples:

1. DAO based DApps where VCs and Internal Team needs a leverage over decisions made by the community
2. DAO for organizations where all roles are treated equally, and the roles have the voice
3. Governmental initiatives, where citizens are given a sense of power over a vote, but government can hold a leverage.
4. Introducing DAOs to an unfamiliar environment. The unfamiliar members experience DAOs, but the control over a decision can be held with familiar classes

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

## 1789v2 APIs

The contracts are formed with three roles in mind:
- Admins
- Donors
- DAO Participants

And all a member can play two or more roles at the same time too. However, the Admin cannot contribute as freely as non-admins can by being a Donor or a Participant.

List of Methods and Functions

```
wipeBalance()
donate(bool)
donateVotingRights(uint256, uint256)
addAdmin(address)
removeAdmin(address)
setGlobalBallotSeclusion(uint256)
setBallotSeclusionById(uint256, uint256)
makeProposal(string, string, uint256, address)
makeRightsDonationProposal(string)
vote(uint256, bool)
```


## Contribute
Feel free to contribute to the template. It's the best coffee you could get me :)

